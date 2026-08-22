from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

from resume import build_resume_pdf
from cover_letter import build_cover_letter_pdf


ROOT_DIR = Path(__file__).parent
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

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


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


# --- Endpoints ------------------------------------------------------------

@api_router.get("/")
async def root():
    return {"message": "Hello World"}


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
async def list_contacts():
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
async def list_hire_leads():
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
    """Generate a cover-letter PDF tailored to `role` / `company` / `tone`.

    tone options: `warm` (default), `formal`, `bold`.
    Example: /api/cover-letter?role=Product+Designer&company=Linear&tone=bold
    """
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
