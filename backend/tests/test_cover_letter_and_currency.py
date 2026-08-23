"""Iteration 5 tests — cover-letter tones + hire budget strings (INR/USD)."""
import io
import os
import pytest
import requests
from pypdf import PdfReader

BASE_URL = os.environ['REACT_APP_BACKEND_URL'].rstrip('/') if os.environ.get('REACT_APP_BACKEND_URL') else 'http://127.0.0.1:8001'


@pytest.fixture
def api():
    s = requests.Session()
    return s


def _pdf_text(content: bytes) -> str:
    reader = PdfReader(io.BytesIO(content))
    return "\n".join(page.extract_text() or "" for page in reader.pages)


# --- cover letter tones -------------------------------------------------

def test_cover_letter_warm_default(api):
    r = api.get(f"{BASE_URL}/api/cover-letter", params={"role": "Product Designer", "tone": "warm"})
    assert r.status_code == 200
    assert r.headers.get("content-type", "").startswith("application/pdf")
    assert r.content[:4] == b"%PDF"
    text = _pdf_text(r.content)
    assert "Dear Hiring Manager," in text
    assert "Warm regards," in text


def test_cover_letter_formal_with_company(api):
    r = api.get(f"{BASE_URL}/api/cover-letter", params={"role": "Product Designer", "company": "Linear", "tone": "formal"})
    assert r.status_code == 200
    text = _pdf_text(r.content)
    assert "Dear Linear Hiring Team," in text
    assert "Sincerely," in text


def test_cover_letter_bold_with_company(api):
    r = api.get(f"{BASE_URL}/api/cover-letter", params={"role": "Product Designer", "company": "Linear", "tone": "bold"})
    assert r.status_code == 200
    text = _pdf_text(r.content)
    assert "Hi Linear team," in text
    assert "Talk soon," in text


def test_cover_letter_invalid_tone_falls_back_to_warm(api):
    r = api.get(f"{BASE_URL}/api/cover-letter", params={"role": "Product Designer", "tone": "invalidjunk"})
    assert r.status_code == 200
    text = _pdf_text(r.content)
    # Falls back to warm — greeting w/o company is "Dear Hiring Manager,"
    assert "Dear Hiring Manager," in text
    assert "Warm regards," in text


# --- resume regression --------------------------------------------------

def test_resume_pdf_still_ok(api):
    r = api.get(f"{BASE_URL}/api/resume")
    assert r.status_code == 200
    assert r.headers.get("content-type", "").startswith("application/pdf")
    assert r.content[:4] == b"%PDF"


# --- hire endpoint accepts localised budget strings ---------------------

@pytest.mark.parametrize("budget", ["< ₹1L", "₹1L – ₹3L", "₹3L – ₹6L", "₹6L+", "< $1.2k", "$1.2k – $3.5k", "$3.5k – $7k", "$7k+"])
def test_hire_accepts_localized_budget(api, budget):
    payload = {
        "name": "TEST_currency",
        "email": "qa@test.dev",
        "budget": budget,
        "message": "Localised budget flow test",
    }
    r = api.post(f"{BASE_URL}/api/hire", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["budget"] == budget
