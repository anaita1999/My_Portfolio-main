"""Automated test suite for Admin CMS & 2-Factor Authentication (2FA) endpoints."""

import os
import pytest
import requests
import pyotp

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'http://127.0.0.1:8001').rstrip('/')
ADMIN_EMAIL = "anaita.pal.cse@gmail.com"
ADMIN_PASSWORD = "Anaita@2026!SecureAdmin"
TOTP_SECRET = "JBSWY3DPEHPK3PXP"


@pytest.fixture
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


def get_authenticated_token(api):
    # Step 1: login
    r1 = api.post(f"{BASE_URL}/api/admin/login-step1", json={
        "email": ADMIN_EMAIL,
        "password": ADMIN_PASSWORD,
    })
    assert r1.status_code == 200, r1.text
    temp_token = r1.json()["temp_token"]

    # Step 2: 2FA TOTP
    totp = pyotp.TOTP(TOTP_SECRET)
    code = totp.now()
    r2 = api.post(f"{BASE_URL}/api/admin/login-step2", json={
        "temp_token": temp_token,
        "code": code,
    })
    assert r2.status_code == 200, r2.text
    return r2.json()["access_token"]


# --- 1. Public Content Endpoint ------------------------------------------

def test_public_content_endpoint(api):
    r = api.get(f"{BASE_URL}/api/content")
    assert r.status_code == 200
    data = r.json()
    assert "profile" in data
    assert "pricing" in data
    assert "skills" in data
    assert "projects" in data
    assert "experience" in data
    assert "certifications" in data
    assert "testimonials" in data
    assert data["profile"]["name"] == "Anaita Pal"


# --- 2. 2FA Authentication Flow ------------------------------------------

def test_login_step1_invalid_email_rejected(api):
    r = api.post(f"{BASE_URL}/api/admin/login-step1", json={
        "email": "notanemail",
        "password": ADMIN_PASSWORD,
    })
    assert r.status_code in (400, 422)


def test_login_step1_wrong_password_rejected(api):
    r = api.post(f"{BASE_URL}/api/admin/login-step1", json={
        "email": ADMIN_EMAIL,
        "password": "WrongPassword123!",
    })
    assert r.status_code == 401


def test_login_step2_invalid_totp_code_rejected(api):
    r1 = api.post(f"{BASE_URL}/api/admin/login-step1", json={
        "email": ADMIN_EMAIL,
        "password": ADMIN_PASSWORD,
    })
    assert r1.status_code == 200
    temp_token = r1.json()["temp_token"]

    r2 = api.post(f"{BASE_URL}/api/admin/login-step2", json={
        "temp_token": temp_token,
        "code": "000000",
    })
    assert r2.status_code == 401


def test_login_step2_valid_totp_success(api):
    token = get_authenticated_token(api)
    assert isinstance(token, str)
    assert len(token) > 20


def test_login_step2_with_backup_recovery_code(api):
    # Obtain active setup info to get an unconsumed backup code
    token = get_authenticated_token(api)
    setup_res = api.get(f"{BASE_URL}/api/admin/2fa-setup", headers={"Authorization": f"Bearer {token}"})
    assert setup_res.status_code == 200
    backup_codes = setup_res.json().get("backup_codes", [])
    
    # If all backup codes were consumed, use default fallback
    test_code = backup_codes[0] if backup_codes else "KAGE-7734-9182"

    r1 = api.post(f"{BASE_URL}/api/admin/login-step1", json={
        "email": ADMIN_EMAIL,
        "password": ADMIN_PASSWORD,
    })
    temp_token = r1.json()["temp_token"]

    r2 = api.post(f"{BASE_URL}/api/admin/login-step2", json={
        "temp_token": temp_token,
        "code": test_code,
    })
    assert r2.status_code == 200
    data = r2.json()
    assert data["backup_code_used"] is True
    assert "access_token" in data


# --- 3. Protected Content Updates -----------------------------------------

def test_unauthorized_content_update_rejected(api):
    r = api.put(f"{BASE_URL}/api/admin/content/pricing", json={"data": {"hourly_rate_inr": "₹99,999"}})
    assert r.status_code == 401


def test_authorized_pricing_update(api):
    token = get_authenticated_token(api)
    headers = {"Authorization": f"Bearer {token}"}

    # Fetch current
    curr = api.get(f"{BASE_URL}/api/content").json()["pricing"]
    updated_pricing = {**curr, "hourly_rate_inr": "₹3,200 / hr", "hourly_rate_usd": "$45 / hr"}

    r = api.put(
        f"{BASE_URL}/api/admin/content/pricing",
        json={"data": updated_pricing},
        headers=headers,
    )
    assert r.status_code == 200
    assert r.json()["success"] is True

    # Verify public reflection
    r_check = api.get(f"{BASE_URL}/api/content")
    assert r_check.json()["pricing"]["hourly_rate_inr"] == "₹3,200 / hr"
    assert r_check.json()["pricing"]["hourly_rate_usd"] == "$45 / hr"


def test_authorized_profile_and_skills_update(api):
    token = get_authenticated_token(api)
    headers = {"Authorization": f"Bearer {token}"}

    # Update profile tagline
    curr_profile = api.get(f"{BASE_URL}/api/content").json()["profile"]
    curr_profile["tagline"] = "Architecting elite Agentic AI ecosystems."
    r1 = api.put(f"{BASE_URL}/api/admin/content/profile", json={"data": curr_profile}, headers=headers)
    assert r1.status_code == 200

    r_check = api.get(f"{BASE_URL}/api/content")
    assert r_check.json()["profile"]["tagline"] == "Architecting elite Agentic AI ecosystems."


# --- 4. Projects Full CRUD -----------------------------------------------

def test_project_crud_lifecycle(api):
    token = get_authenticated_token(api)
    headers = {"Authorization": f"Bearer {token}"}

    # 1. Create
    new_proj = {
        "title": "Quantum Neural Canvas",
        "slug": "quantum-neural-canvas",
        "category": "Agentic AI & WebGL",
        "year": "2026",
        "featured": True,
        "tagline": "Next-gen creative AI canvas engine.",
        "color": "#e0231c",
        "emoji": "⚡",
        "stack": ["Python", "FastAPI", "React", "Three.js"],
        "sections": {
            "overview": "Autonomous visual generation agent.",
            "metrics": ["50ms inference", "100k nodes"],
        },
    }
    r_create = api.post(f"{BASE_URL}/api/admin/projects", json=new_proj, headers=headers)
    assert r_create.status_code == 200
    created_id = r_create.json()["project"]["id"]

    # Verify in public list
    projs = api.get(f"{BASE_URL}/api/content").json()["projects"]
    assert any(p["id"] == created_id for p in projs)

    # 2. Update
    r_update = api.put(
        f"{BASE_URL}/api/admin/projects/{created_id}",
        json={"tagline": "Updated quantum engine tagline."},
        headers=headers,
    )
    assert r_update.status_code == 200

    # 3. Delete
    r_del = api.delete(f"{BASE_URL}/api/admin/projects/{created_id}", headers=headers)
    assert r_del.status_code == 200

    # Verify deleted
    projs_after = api.get(f"{BASE_URL}/api/content").json()["projects"]
    assert not any(p["id"] == created_id for p in projs_after)


# --- 5. 2FA Setup Query ---------------------------------------------------

def test_get_2fa_setup_info(api):
    token = get_authenticated_token(api)
    headers = {"Authorization": f"Bearer {token}"}
    r = api.get(f"{BASE_URL}/api/admin/2fa-setup", headers=headers)
    assert r.status_code == 200
    data = r.json()
    assert "secret" in data
    assert "otpauth_uri" in data
    assert "backup_codes" in data
    assert data["secret"] == TOTP_SECRET


def test_2fa_rate_limiting_lockout(api):
    r1 = api.post(f"{BASE_URL}/api/admin/login-step1", json={
        "email": ADMIN_EMAIL,
        "password": ADMIN_PASSWORD,
    })
    assert r1.status_code == 200
    temp_token = r1.json()["temp_token"]

    # Submit 5 invalid 2FA attempts
    for i in range(5):
        r_fail = api.post(f"{BASE_URL}/api/admin/login-step2", json={
            "temp_token": temp_token,
            "code": "111111",
        })
        assert r_fail.status_code == 401

    # 6th attempt should be locked out
    r_lockout = api.post(f"{BASE_URL}/api/admin/login-step2", json={
        "temp_token": temp_token,
        "code": "111111",
    })
    assert r_lockout.status_code == 401
    assert "locked out" in r_lockout.json()["detail"].lower() or "expired" in r_lockout.json()["detail"].lower()


def test_session_revocation_on_password_change(api):
    # 1. Get initial access token
    old_token = get_authenticated_token(api)
    old_headers = {"Authorization": f"Bearer {old_token}"}

    # Verify old token works
    r_check = api.get(f"{BASE_URL}/api/admin/verify", headers=old_headers)
    assert r_check.status_code == 200

    # 2. Change password to a temporary password
    temp_pass = "Anaita@2026!TemporaryChange"
    r_change = api.post(
        f"{BASE_URL}/api/admin/change-password",
        json={"current_password": ADMIN_PASSWORD, "new_password": temp_pass},
        headers=old_headers,
    )
    assert r_change.status_code == 200
    new_token = r_change.json()["access_token"]
    new_headers = {"Authorization": f"Bearer {new_token}"}

    # 3. Old token MUST now be revoked (401)
    r_old_revoked = api.get(f"{BASE_URL}/api/admin/verify", headers=old_headers)
    assert r_old_revoked.status_code == 401
    assert "revoked" in r_old_revoked.json()["detail"].lower()

    # 4. New token works
    r_new_works = api.get(f"{BASE_URL}/api/admin/verify", headers=new_headers)
    assert r_new_works.status_code == 200

    # 5. Restore original password
    r_restore = api.post(
        f"{BASE_URL}/api/admin/change-password",
        json={"current_password": temp_pass, "new_password": ADMIN_PASSWORD},
        headers=new_headers,
    )
    assert r_restore.status_code == 200


def test_regenerate_backup_codes(api):
    token = get_authenticated_token(api)
    headers = {"Authorization": f"Bearer {token}"}

    r = api.post(f"{BASE_URL}/api/admin/regenerate-backup-codes", headers=headers)
    assert r.status_code == 200
    data = r.json()
    assert data["success"] is True
    assert len(data["backup_codes"]) == 5
    assert all(isinstance(c, str) and "-" in c for c in data["backup_codes"])


def test_unauthorized_contact_and_hire_rejected(api):
    # Unauthenticated access to contact and hire listings MUST be blocked for client privacy
    r_c = api.get(f"{BASE_URL}/api/contact")
    assert r_c.status_code == 401

    r_h = api.get(f"{BASE_URL}/api/hire")
    assert r_h.status_code == 401

    # Authenticated access succeeds
    token = get_authenticated_token(api)
    headers = {"Authorization": f"Bearer {token}"}

    r_c_auth = api.get(f"{BASE_URL}/api/contact", headers=headers)
    assert r_c_auth.status_code == 200
    assert isinstance(r_c_auth.json(), list)

    r_h_auth = api.get(f"{BASE_URL}/api/hire", headers=headers)
    assert r_h_auth.status_code == 200
    assert isinstance(r_h_auth.json(), list)



