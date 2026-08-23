from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header, Request
from fastapi.responses import Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Dict, Any
import uuid
import copy
from datetime import datetime, timezone

from resume import build_resume_pdf
from cover_letter import build_cover_letter_pdf
from initial_content import INITIAL_CONTENT
import json
from admin_auth import (
    DEFAULT_ADMIN_EMAIL,
    DEFAULT_ADMIN_PASSWORD,
    DEFAULT_TOTP_SECRET,
    DEFAULT_BACKUP_CODES,
    AdminLoginStep1Request,
    AdminLoginStep2Request,
    ChangePasswordRequest,
    hash_password,
    verify_password,
    check_password_rate_limit,
    record_failed_password_attempt,
    clear_failed_password_attempts,
    create_temp_2fa_token,
    verify_temp_2fa_token,
    record_failed_2fa_attempt,
    clear_2fa_attempts,
    create_access_token,
    decode_access_token,
    verify_totp_code,
    get_totp_provisioning_uri,
    generate_backup_codes,
)


ROOT_DIR = Path(__file__).parent
DATA_DIR = ROOT_DIR / "data"
DATA_DIR.mkdir(exist_ok=True)
CONTENT_BACKUP_FILE = DATA_DIR / "cms_backup.json"
ADMIN_BACKUP_FILE = DATA_DIR / "admin_credentials.json"

load_dotenv(ROOT_DIR / '.env')

# MongoDB connection with safe fallback
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=800)
db = client[os.environ.get('DB_NAME', 'portfolio_db')]

# In-memory storage fallback for offline/local runtime
_mem_status = []
_mem_contacts = []
_mem_hire_leads = []
_mem_analytics = []

# In-memory Admin user state initialized with secure hash & disk cache fallback
_mem_admin = {
    "email": DEFAULT_ADMIN_EMAIL,
    "password_hash": hash_password(DEFAULT_ADMIN_PASSWORD),
    "totp_secret": DEFAULT_TOTP_SECRET,
    "backup_codes": list(DEFAULT_BACKUP_CODES),
    "token_version": 1,
    "last_totp_timestep": 0,
}

# In-memory dynamic portfolio content copy with disk cache fallback
_mem_content = copy.deepcopy(INITIAL_CONTENT)

# Load local disk backup if exists
try:
    if CONTENT_BACKUP_FILE.exists():
        with open(CONTENT_BACKUP_FILE, "r", encoding="utf-8") as f:
            _disk_c = json.load(f)
            if isinstance(_disk_c, dict) and "profile" in _disk_c:
                _mem_content = _disk_c
except Exception as _e:
    pass

try:
    if ADMIN_BACKUP_FILE.exists():
        with open(ADMIN_BACKUP_FILE, "r", encoding="utf-8") as f:
            _disk_a = json.load(f)
            if isinstance(_disk_a, dict) and "password_hash" in _disk_a:
                _mem_admin = _disk_a
except Exception as _e:
    pass

app = FastAPI(title="Anaita Pal Portfolio API", version="2.0.0")
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# --- Dependency: Admin JWT Authentication Guard ---------------------------

async def get_current_admin(authorization: Optional[str] = Header(None)) -> Dict[str, Any]:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid authentication token")
    token = authorization.split(" ")[1]
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Session expired or invalid token. Please log in again.")

    # Validate active token version for instant session revocation
    admin = await get_admin_doc()
    current_version = admin.get("token_version", 1)
    token_version = payload.get("token_version", 1)
    if token_version != current_version:
        raise HTTPException(
            status_code=401,
            detail="Session revoked due to a credential or password change. Please log in again.",
        )
    return payload


# --- Models ---------------------------------------------------------------

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class Contact(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    message: str = Field(min_length=1, max_length=5000)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    message: str = Field(min_length=1, max_length=5000)


class HireLead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    budget: str = Field(min_length=1, max_length=60)
    message: str = Field(min_length=1, max_length=5000)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class HireCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    budget: str = Field(min_length=1, max_length=60)
    message: str = Field(min_length=1, max_length=5000)


class AnalyticsEvent(BaseModel):
    type: str = Field(min_length=1, max_length=60)
    section: Optional[str] = None
    slug: Optional[str] = None
    channel: Optional[str] = None
    session: Optional[str] = None
    path: Optional[str] = None
    referrer: Optional[str] = None
    at: Optional[str] = None


class AnalyticsBatch(BaseModel):
    events: List[AnalyticsEvent] = Field(min_length=1, max_length=50)


class SectionUpdatePayload(BaseModel):
    data: Any


# --- Database Helper for Portfolio Content --------------------------------

async def get_stored_content() -> Dict[str, Any]:
    try:
        doc = await db.portfolio_content.find_one({"doc_type": "main_content"}, {"_id": 0})
        if doc and "content" in doc:
            return doc["content"]
    except Exception:
        pass
    return _mem_content


async def save_stored_content(content: Dict[str, Any]) -> None:
    global _mem_content
    _mem_content = content
    try:
        with open(CONTENT_BACKUP_FILE, "w", encoding="utf-8") as f:
            json.dump(content, f, indent=2, ensure_ascii=False)
    except Exception as _e:
        logger.warning(f"Could not write CMS backup to disk: {_e}")
    try:
        await db.portfolio_content.update_one(
            {"doc_type": "main_content"},
            {"$set": {"doc_type": "main_content", "content": content, "updated_at": datetime.now(timezone.utc).isoformat()}},
            upsert=True,
        )
    except Exception as exc:
        logger.warning(f"Could not persist content to MongoDB: {exc}")


async def get_admin_doc() -> Dict[str, Any]:
    try:
        doc = await db.admin_credentials.find_one({"doc_type": "admin_user"}, {"_id": 0})
        if doc:
            return doc
    except Exception:
        pass
    return _mem_admin


async def save_admin_doc(doc: Dict[str, Any]) -> None:
    global _mem_admin
    _mem_admin = doc
    try:
        with open(ADMIN_BACKUP_FILE, "w", encoding="utf-8") as f:
            json.dump(doc, f, indent=2, ensure_ascii=False)
    except Exception as _e:
        logger.warning(f"Could not write admin backup to disk: {_e}")
    try:
        await db.admin_credentials.update_one(
            {"doc_type": "admin_user"},
            {"$set": {"doc_type": "admin_user", **doc, "updated_at": datetime.now(timezone.utc).isoformat()}},
            upsert=True,
        )
    except Exception as exc:
        logger.warning(f"Could not persist admin doc to MongoDB: {exc}")


def normalize_project(proj: Dict[str, Any]) -> Dict[str, Any]:
    """Ensure both sets of legacy & dynamic project properties are kept synchronized."""
    norm = copy.deepcopy(proj)
    if "stack" in norm and not norm.get("tools"):
        norm["tools"] = norm["stack"]
    elif "tools" in norm and not norm.get("stack"):
        norm["stack"] = norm["tools"]

    if "category" in norm and not norm.get("tag"):
        norm["tag"] = norm["category"]
    elif "tag" in norm and not norm.get("category"):
        norm["category"] = norm["tag"]

    if "tagline" in norm and not norm.get("subtitle"):
        norm["subtitle"] = norm["tagline"]
    elif "subtitle" in norm and not norm.get("tagline"):
        norm["tagline"] = norm["subtitle"]

    if "year" in norm and not norm.get("duration"):
        norm["duration"] = str(norm["year"])

    sections = norm.get("sections")
    if isinstance(sections, dict):
        if "metrics" in sections and not norm.get("outcomes"):
            norm["outcomes"] = sections["metrics"]
        elif "outcomes" in norm and "metrics" not in sections:
            sections["metrics"] = norm["outcomes"]
            norm["sections"] = sections
        if not norm.get("approach") and any(k in sections for k in ["overview", "architecture", "solution"]):
            norm["approach"] = [
                sections.get("overview"),
                sections.get("architecture"),
                sections.get("solution"),
            ]
            norm["approach"] = [a for a in norm["approach"] if a]
    return norm


# --- Public Content Endpoint ----------------------------------------------

@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.get("/content")
async def get_portfolio_content():
    """Public endpoint returning dynamic portfolio sections."""
    content = await get_stored_content()
    return content


# --- Admin Authentication & 2FA Endpoints ---------------------------------

@api_router.post("/admin/login-step1")
async def admin_login_step1(req: AdminLoginStep1Request, request: Request):
    """
    Step 1: Validate Email Structure & Password.
    Guarded with IP-aware and Email brute-force rate-limiting (Max 5 attempts / 15 minutes).
    Returns short-lived 2FA temporary token if credentials match.
    """
    clean_email = req.email.lower().strip()
    client_ip = request.headers.get("x-forwarded-for", "").split(",")[0].strip() or (request.client.host if request.client else "127.0.0.1")
    ip_key = f"ip:{client_ip}"
    email_key = f"email:{clean_email}"

    # 1. Rate-limit check on both IP and Email identifier
    is_allowed_ip, _, retry_after_ip = check_password_rate_limit(ip_key)
    is_allowed_email, _, retry_after_email = check_password_rate_limit(email_key)
    if not is_allowed_ip or not is_allowed_email:
        retry_after = max(retry_after_ip, retry_after_email)
        raise HTTPException(
            status_code=429,
            detail=f"Too many failed login attempts. Account temporarily locked for security. Please try again in {retry_after // 60 + 1} minutes.",
        )

    admin = await get_admin_doc()

    if clean_email != admin["email"].lower().strip():
        record_failed_password_attempt(ip_key)
        record_failed_password_attempt(email_key)
        raise HTTPException(status_code=401, detail="Invalid admin email or password.")

    if not verify_password(req.password, admin["password_hash"]):
        record_failed_password_attempt(ip_key)
        remaining_attempts = record_failed_password_attempt(email_key)
        if remaining_attempts == 0:
            raise HTTPException(
                status_code=429,
                detail="Too many failed login attempts. Account temporarily locked for 15 minutes.",
            )
        raise HTTPException(
            status_code=401,
            detail=f"Invalid admin email or password. {remaining_attempts} attempt{'s' if remaining_attempts > 1 else ''} remaining.",
        )

    # Clear failed attempts upon successful password verification
    clear_failed_password_attempts(ip_key)
    clear_failed_password_attempts(email_key)

    # Credentials valid -> Issue 5-minute 2FA temporary handshake token
    temp_token = create_temp_2fa_token(clean_email)
    return {
        "success": True,
        "require_2fa": True,
        "temp_token": temp_token,
        "message": "Password verified. Please provide your 6-digit Authenticator 2FA code or backup code.",
    }


@api_router.post("/admin/login-step2")
async def admin_login_step2(req: AdminLoginStep2Request):
    """
    Step 2: Validate 2FA TOTP code or emergency backup recovery code.
    Enforces maximum 5 attempts lockout per handshake session and TOTP replay protection.
    Returns 7-day authenticated JWT session token with embedded token_version.
    """
    token_data = verify_temp_2fa_token(req.temp_token)
    if not token_data:
        raise HTTPException(
            status_code=401,
            detail="2FA handshake expired, invalid, or locked out due to excessive failed attempts. Please sign in again.",
        )
    email, jti = token_data

    admin = await get_admin_doc()
    totp_secret = admin.get("totp_secret", DEFAULT_TOTP_SECRET)
    backup_codes = admin.get("backup_codes", DEFAULT_BACKUP_CODES)

    is_valid, is_backup_used = verify_totp_code(totp_secret, req.code, backup_codes)
    if not is_valid:
        remaining = record_failed_2fa_attempt(jti)
        if remaining <= 0:
            raise HTTPException(
                status_code=401,
                detail="Maximum 2FA verification attempts exceeded. Session locked for security. Please sign in again.",
            )
        raise HTTPException(
            status_code=401,
            detail=f"Invalid 2FA code or recovery code. {remaining} attempt{'s' if remaining > 1 else ''} remaining.",
        )

    # Success: Clear failed attempt counter
    clear_2fa_attempts(jti)

    # If an emergency backup code was used, consume it
    if is_backup_used:
        clean_code = req.code.strip().upper()
        updated_codes = [c for c in backup_codes if c.upper() != clean_code and c.replace("-", "").upper() != clean_code.replace("-", "")]
        admin["backup_codes"] = updated_codes

    await save_admin_doc(admin)

    token_version = admin.get("token_version", 1)
    access_token = create_access_token(email, token_version=token_version)
    return {
        "success": True,
        "access_token": access_token,
        "token_type": "bearer",
        "email": email,
        "backup_code_used": is_backup_used,
        "message": "2-Factor Authentication successful. Welcome to your Admin Sanctuary.",
    }


@api_router.get("/admin/verify")
async def admin_verify_token(admin_payload: Dict[str, Any] = Depends(get_current_admin)):
    """Verifies that current Bearer session token is active."""
    return {
        "valid": True,
        "email": admin_payload.get("sub"),
        "role": "admin",
    }


@api_router.get("/admin/2fa-setup")
async def get_2fa_setup_details(admin_payload: Dict[str, Any] = Depends(get_current_admin)):
    """Returns 2FA secret key, Authenticator provisioning URI, and recovery codes for pairing."""
    admin = await get_admin_doc()
    secret = admin.get("totp_secret", DEFAULT_TOTP_SECRET)
    email = admin.get("email", DEFAULT_ADMIN_EMAIL)
    uri = get_totp_provisioning_uri(secret, email)
    backup_codes = admin.get("backup_codes", DEFAULT_BACKUP_CODES)
    return {
        "secret": secret,
        "otpauth_uri": uri,
        "email": email,
        "backup_codes": backup_codes,
    }


@api_router.post("/admin/regenerate-backup-codes")
async def regenerate_backup_codes_endpoint(admin_payload: Dict[str, Any] = Depends(get_current_admin)):
    """Generate 5 new emergency recovery codes for the authenticated admin."""
    admin = await get_admin_doc()
    new_codes = generate_backup_codes(5)
    admin["backup_codes"] = new_codes
    await save_admin_doc(admin)
    return {
        "success": True,
        "backup_codes": new_codes,
        "message": "Emergency backup recovery codes regenerated successfully.",
    }


@api_router.post("/admin/change-password")
async def admin_change_password(req: ChangePasswordRequest, admin_payload: Dict[str, Any] = Depends(get_current_admin)):
    """Change admin password securely and revoke all other existing active sessions."""
    admin = await get_admin_doc()
    if not verify_password(req.current_password, admin["password_hash"]):
        raise HTTPException(status_code=400, detail="Current password incorrect.")

    admin["password_hash"] = hash_password(req.new_password)
    # Increment token_version to immediately revoke all previous active tokens
    admin["token_version"] = admin.get("token_version", 1) + 1
    await save_admin_doc(admin)

    new_token = create_access_token(admin["email"], token_version=admin["token_version"])
    return {
        "success": True,
        "access_token": new_token,
        "message": "Admin password updated successfully. All other active sessions have been revoked.",
    }


# --- Admin Content CRUD Endpoints -----------------------------------------

@api_router.put("/admin/content/{section}")
async def update_content_section(
    section: str,
    payload: SectionUpdatePayload,
    admin_payload: Dict[str, Any] = Depends(get_current_admin),
):
    """Update a specific content section (pricing, profile, skills, experience, certifications, testimonials, education)."""
    allowed_sections = ["profile", "pricing", "skills", "experience", "certifications", "testimonials", "education"]
    if section not in allowed_sections:
        raise HTTPException(status_code=400, detail=f"Invalid section. Allowed: {allowed_sections}")

    content = await get_stored_content()
    content[section] = payload.data
    await save_stored_content(content)
    return {"success": True, "section": section, "message": f"{section.capitalize()} updated successfully."}


@api_router.post("/admin/projects")
async def create_project(
    payload: Dict[str, Any],
    admin_payload: Dict[str, Any] = Depends(get_current_admin),
):
    """Add a new project to Selected Works with dual schema normalization."""
    content = await get_stored_content()
    projects = content.get("projects", [])

    new_project = normalize_project(payload)
    if "id" not in new_project or not new_project["id"]:
        new_project["id"] = f"proj-{str(uuid.uuid4())[:8]}"
    if "slug" not in new_project or not new_project["slug"]:
        new_project["slug"] = new_project.get("title", "new-project").lower().replace(" ", "-")

    projects.insert(0, new_project)
    content["projects"] = projects
    await save_stored_content(content)
    return {"success": True, "project": new_project, "message": "Project added successfully."}


@api_router.put("/admin/projects/{project_id}")
async def update_project(
    project_id: str,
    payload: Dict[str, Any],
    admin_payload: Dict[str, Any] = Depends(get_current_admin),
):
    """Update an existing project with dual schema normalization."""
    content = await get_stored_content()
    projects = content.get("projects", [])

    idx = next((i for i, p in enumerate(projects) if p.get("id") == project_id or p.get("slug") == project_id), -1)
    if idx == -1:
        raise HTTPException(status_code=404, detail="Project not found.")

    merged = {**projects[idx], **payload, "id": projects[idx]["id"]}
    updated_proj = normalize_project(merged)
    projects[idx] = updated_proj
    content["projects"] = projects
    await save_stored_content(content)
    return {"success": True, "project": updated_proj, "message": "Project updated successfully."}
    return {"success": True, "project": updated_proj, "message": "Project updated successfully."}


@api_router.delete("/admin/projects/{project_id}")
async def delete_project(
    project_id: str,
    admin_payload: Dict[str, Any] = Depends(get_current_admin),
):
    """Delete a project."""
    content = await get_stored_content()
    projects = content.get("projects", [])

    filtered = [p for p in projects if p.get("id") != project_id and p.get("slug") != project_id]
    if len(filtered) == len(projects):
        raise HTTPException(status_code=404, detail="Project not found.")

    content["projects"] = filtered
    await save_stored_content(content)
    return {"success": True, "message": "Project deleted successfully."}


@api_router.get("/admin/contacts")
async def admin_list_contacts(admin_payload: Dict[str, Any] = Depends(get_current_admin)):
    """List contact inquiries for Admin Inbox."""
    try:
        contacts = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    except Exception:
        contacts = list(reversed(_mem_contacts))
    clean_contacts = []
    for c in contacts:
        doc = dict(c)
        doc.pop("_id", None)
        if isinstance(doc.get('created_at'), str):
            try:
                doc['created_at'] = datetime.fromisoformat(doc['created_at'])
            except Exception:
                pass
        clean_contacts.append(doc)
    return clean_contacts


@api_router.delete("/admin/contacts/{contact_id}")
async def admin_delete_contact(
    contact_id: str,
    admin_payload: Dict[str, Any] = Depends(get_current_admin),
):
    """Delete a contact message."""
    global _mem_contacts
    _mem_contacts = [c for c in _mem_contacts if c.get("id") != contact_id]
    try:
        await db.contacts.delete_one({"id": contact_id})
    except Exception:
        pass
    return {"success": True, "message": "Contact deleted."}


@api_router.get("/admin/leads")
async def admin_list_leads(admin_payload: Dict[str, Any] = Depends(get_current_admin)):
    """List hire project leads for Admin Inbox."""
    try:
        leads = await db.hire_leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    except Exception:
        leads = list(reversed(_mem_hire_leads))
    clean_leads = []
    for lead in leads:
        doc = dict(lead)
        doc.pop("_id", None)
        if isinstance(doc.get('created_at'), str):
            try:
                doc['created_at'] = datetime.fromisoformat(doc['created_at'])
            except Exception:
                pass
        clean_leads.append(doc)
    return clean_leads


@api_router.delete("/admin/leads/{lead_id}")
async def admin_delete_lead(
    lead_id: str,
    admin_payload: Dict[str, Any] = Depends(get_current_admin),
):
    """Delete a hire project lead."""
    global _mem_hire_leads
    _mem_hire_leads = [l for l in _mem_hire_leads if l.get("id") != lead_id]
    try:
        await db.hire_leads.delete_one({"id": lead_id})
    except Exception:
        pass
    return {"success": True, "message": "Hire lead deleted."}


# --- Standard Contact & Hire Endpoints ------------------------------------

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    try:
        await db.status_checks.insert_one(doc)
    except Exception:
        _mem_status.append(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    try:
        status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    except Exception:
        status_checks = list(_mem_status)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/contact", response_model=Contact)
async def create_contact(payload: ContactCreate):
    try:
        contact = Contact(**payload.model_dump())
        doc = contact.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        try:
            await db.contacts.insert_one(doc)
        except Exception:
            _mem_contacts.append(doc)
        return contact
    except HTTPException:
        raise
    except Exception as exc:
        logger.exception("contact submission failed")
        raise HTTPException(status_code=500, detail="Failed to save message") from exc


@api_router.get("/contact", response_model=List[Contact])
async def list_contacts(admin_payload: Dict[str, Any] = Depends(get_current_admin)):
    """Retrieve all received contact inquiries (Admin Only)."""
    try:
        contacts = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    except Exception:
        contacts = list(reversed(_mem_contacts))
    for c in contacts:
        if isinstance(c.get('created_at'), str):
            c['created_at'] = datetime.fromisoformat(c['created_at'])
    return contacts


@api_router.post("/hire", response_model=HireLead)
async def create_hire_lead(payload: HireCreate):
    try:
        lead = HireLead(**payload.model_dump())
        doc = lead.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        try:
            await db.hire_leads.insert_one(doc)
        except Exception:
            _mem_hire_leads.append(doc)
        return lead
    except HTTPException:
        raise
    except Exception as exc:
        logger.exception("hire submission failed")
        raise HTTPException(status_code=500, detail="Failed to save brief") from exc


@api_router.get("/hire", response_model=List[HireLead])
async def list_hire_leads(admin_payload: Dict[str, Any] = Depends(get_current_admin)):
    """Retrieve all project hire briefs (Admin Only)."""
    try:
        leads = await db.hire_leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    except Exception:
        leads = list(reversed(_mem_hire_leads))
    for lead in leads:
        if isinstance(lead.get('created_at'), str):
            lead['created_at'] = datetime.fromisoformat(lead['created_at'])
    return leads


@api_router.post("/analytics/events")
async def ingest_analytics(batch: AnalyticsBatch):
    now_iso = datetime.now(timezone.utc).isoformat()
    docs = []
    for ev in batch.events:
        d = ev.model_dump()
        d['id'] = str(uuid.uuid4())
        d['received_at'] = now_iso
        docs.append(d)
    if docs:
        try:
            await db.analytics_events.insert_many(docs)
        except Exception:
            _mem_analytics.extend(docs)
    return {"accepted": len(docs)}


@api_router.get("/analytics/summary")
async def analytics_summary():
    """Aggregate section-views & top events for a lightweight dashboard."""
    try:
        pipeline_sections = [
            {"$match": {"type": "section_view"}},
            {"$group": {"_id": "$section", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}},
        ]
        pipeline_types = [
            {"$group": {"_id": "$type", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}},
        ]
        sections = await db.analytics_events.aggregate(pipeline_sections).to_list(50)
        types = await db.analytics_events.aggregate(pipeline_types).to_list(50)
        total = await db.analytics_events.count_documents({})
        return {
            "total_events": total,
            "sections": [{"section": s["_id"], "count": s["count"]} for s in sections if s.get("_id")],
            "types": [{"type": t["_id"], "count": t["count"]} for t in types],
        }
    except Exception:
        sec_counts = {}
        type_counts = {}
        for ev in _mem_analytics:
            t = ev.get('type')
            if t:
                type_counts[t] = type_counts.get(t, 0) + 1
            if t == 'section_view' and ev.get('section'):
                s = ev.get('section')
                sec_counts[s] = sec_counts.get(s, 0) + 1
        return {
            "total_events": len(_mem_analytics),
            "sections": [{"section": k, "count": v} for k, v in sorted(sec_counts.items(), key=lambda x: -x[1])],
            "types": [{"type": k, "count": v} for k, v in sorted(type_counts.items(), key=lambda x: -x[1])],
        }


@api_router.get("/resume")
async def download_resume():
    pdf_bytes = build_resume_pdf()
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={
            "Content-Disposition": 'attachment; filename="Anaita_Pal_Resume.pdf"',
            "Cache-Control": "public, max-age=3600",
        },
    )


@api_router.get("/cover-letter")
async def download_cover_letter(
    role: str | None = None,
    company: str | None = None,
    tone: str | None = None,
):
    """Generate a cover-letter PDF tailored to role, company, and tone."""
    pdf_bytes = build_cover_letter_pdf(role=role, company=company, tone=tone)
    slug_parts = [(role or "role"), (company or ""), (tone or "warm")]
    slug = "_".join(
        "".join(ch if ch.isalnum() else "_" for ch in part.strip())
        for part in slug_parts
        if part
    )[:80] or "role"
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f'attachment; filename="Anaita_Pal_CoverLetter_{slug}.pdf"',
            "Cache-Control": "no-store",
        },
    )


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
