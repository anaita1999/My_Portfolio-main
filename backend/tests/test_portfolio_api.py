import os
import pytest
import requests
import pyotp

BASE_URL = os.environ['REACT_APP_BACKEND_URL'].rstrip('/') if os.environ.get('REACT_APP_BACKEND_URL') else 'http://127.0.0.1:8001'
ADMIN_EMAIL = "anaita.pal.cse@gmail.com"
ADMIN_PASSWORD = "Anaita@2026!SecureAdmin"
TOTP_SECRET = "JBSWY3DPEHPK3PXP"


@pytest.fixture
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


def get_admin_headers(api):
    r1 = api.post(f"{BASE_URL}/api/admin/login-step1", json={
        "email": ADMIN_EMAIL,
        "password": ADMIN_PASSWORD,
    })
    temp_token = r1.json()["temp_token"]
    totp = pyotp.TOTP(TOTP_SECRET)
    code = totp.now()
    r2 = api.post(f"{BASE_URL}/api/admin/login-step2", json={
        "temp_token": temp_token,
        "code": code,
    })
    return {"Authorization": f"Bearer {r2.json()['access_token']}"}


# --- root ---------------------------------------------------------------

def test_root_hello_world(api):
    r = api.get(f"{BASE_URL}/api/")
    assert r.status_code == 200
    assert r.json() == {"message": "Hello World"}


# --- contact (regression) -----------------------------------------------

def test_contact_post_success_and_persistence(api):
    payload = {"name": "TEST_QA Bot", "email": "qa@test.dev", "message": "Hello there from pytest"}
    r = api.post(f"{BASE_URL}/api/contact", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert "id" in data


def test_contact_invalid_email(api):
    r = api.post(f"{BASE_URL}/api/contact", json={"name": "x", "email": "bad", "message": "hi"})
    assert r.status_code in (400, 422)


# --- hire ---------------------------------------------------------------

def test_hire_post_empty_body_rejected(api):
    r = api.post(f"{BASE_URL}/api/hire", json={})
    assert r.status_code == 422


def test_hire_post_success(api):
    payload = {
        "name": "TEST_QA",
        "email": "qa@test.dev",
        "budget": "$3k-$7k",
        "message": "Need a landing in 3 weeks",
    }
    r = api.post(f"{BASE_URL}/api/hire", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert data["budget"] == payload["budget"]
    assert "id" in data

    # 1. Unauthenticated GET must be rejected for client privacy (401)
    r_unauth = api.get(f"{BASE_URL}/api/hire")
    assert r_unauth.status_code == 401

    # 2. Authenticated Admin GET returns leads
    headers = get_admin_headers(api)
    r2 = api.get(f"{BASE_URL}/api/hire", headers=headers)
    assert r2.status_code == 200
    assert any(l["id"] == data["id"] for l in r2.json())


def test_hire_invalid_email(api):
    r = api.post(f"{BASE_URL}/api/hire", json={"name": "x", "email": "bad", "budget": "$1k", "message": "hi"})
    assert r.status_code in (400, 422)


# --- analytics ----------------------------------------------------------

def test_analytics_events_batch(api):
    payload = {"events": [
        {"type": "section_view", "section": "hero", "session": "test-sess", "path": "/"},
        {"type": "section_view", "section": "about", "session": "test-sess", "path": "/"},
        {"type": "cta_click", "channel": "resume", "session": "test-sess"},
    ]}
    r = api.post(f"{BASE_URL}/api/analytics/events", json=payload)
    assert r.status_code == 200, r.text
    assert r.json()["accepted"] == 3


def test_analytics_events_empty_rejected(api):
    r = api.post(f"{BASE_URL}/api/analytics/events", json={"events": []})
    assert r.status_code in (400, 422)


def test_analytics_summary_shape(api):
    r = api.get(f"{BASE_URL}/api/analytics/summary")
    assert r.status_code == 200
    data = r.json()
    assert "total_events" in data
    assert "sections" in data
    assert "types" in data
    assert isinstance(data["total_events"], int)
    assert data["total_events"] > 0
    types_list = [t["type"] for t in data["types"]]
    assert "section_view" in types_list


# --- resume PDF ---------------------------------------------------------

def test_resume_pdf_download(api):
    r = api.get(f"{BASE_URL}/api/resume")
    assert r.status_code == 200
    assert r.headers.get("content-type", "").startswith("application/pdf")
    assert "Anaita_Pal_Resume.pdf" in r.headers.get("content-disposition", "")
    assert r.content[:4] == b"%PDF"
