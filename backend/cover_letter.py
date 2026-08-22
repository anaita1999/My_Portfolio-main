"""Cover-letter PDF generator — matches the resume's design tokens.

Single-column, ATS-friendly, uses the same margins, fonts (Helvetica family),
and colour tokens as resume.py so the cover letter and resume feel like a
matched pair when opened side by side.
"""

from datetime import datetime
from io import BytesIO
from pathlib import Path

from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas

from resume import PROFILE, ASSETS_DIR, _find_photo, _wrap  # reuse tokens & helpers


INK = HexColor("#0A0A0A")
BODY = HexColor("#1F1F1F")
MUTED = HexColor("#5A5A5A")
RULE = HexColor("#C8C8C8")


def _first_name() -> str:
    return PROFILE["name"].split(" ")[0].capitalize()


def _sanitize_role(role: str | None) -> str:
    role = (role or "").strip()
    if not role:
        return "the role you have open"
    # Keep it short & printable
    role = " ".join(role.split())
    return role[:120]


def _sanitize_company(company: str | None) -> str:
    company = (company or "").strip()
    return " ".join(company.split())[:120] if company else ""


def _body_paragraphs(role: str, company: str, tone: str) -> tuple[str, str, list[str], str]:
    """Return (greeting, sign_off, paragraphs, closing_name_prefix) for the tone."""
    company_bit = f" at {company}" if company else ""
    company_addr = company if company else "your team"

    if tone == "formal":
        greeting = f"Dear {company} Hiring Team," if company else "To the Hiring Manager,"
        sign_off = "Sincerely,"
        p1 = (
            f"I am writing to formally apply for the position of {role}{company_bit}. "
            "My background spans product and interface design, front-end engineering, "
            "and fraud and risk analysis — a combination I believe fits roles that "
            "require both design craft and analytical discipline."
        )
        p2 = (
            "Presently, I serve as a Fraud and Risk Analyst on the Flipkart process "
            "at Startek India, following an eight-month tenure in a similar capacity "
            "at Netscribes. Prior to that, I contributed to user interface and "
            "front-end development at Lisica Tech and the National Institute for "
            "Industrial Training. I hold a B.Tech in Computer Science and "
            "Engineering from Adamas University (2024) and am currently pursuing an "
            "MBA in Information Technology at Manipal University Jaipur."
        )
        p3 = (
            "My working toolkit includes Figma and Adobe XD on the design side, "
            "React and Flutter on the engineering side, and structured audit, "
            "monitoring and reporting practices on the operational side. I aim to "
            "bring the same discipline and attention to detail across each."
        )
        p4 = (
            f"I would be grateful for the opportunity to discuss how my experience "
            f"aligns with the needs of {company_addr}. Please feel free to reach "
            f"me at {PROFILE['email']} or on {PROFILE['phone']}. My portfolio and "
            f"case studies are available at {PROFILE['linkedin']}."
        )
        p5 = "Thank you for your consideration."
        return greeting, sign_off, [p1, p2, p3, p4, p5], ""

    if tone == "bold":
        greeting = f"Hi {company} team," if company else "Hi there,"
        sign_off = "Talk soon,"
        p1 = (
            f"I want in on {role}{company_bit}. Here is why in short: I design, "
            "I ship code, and I run tight fraud and risk operations — all three, "
            "with the receipts."
        )
        p2 = (
            "Right now I sit on the Flipkart process at Startek India as a Fraud "
            "and Risk Analyst. Before that, eight months in the same discipline "
            "at Netscribes. Before that, UI and front-end work at Lisica Tech and "
            "the National Institute for Industrial Training. B.Tech CSE from "
            "Adamas (2024), MBA in IT in progress at Manipal University Jaipur."
        )
        p3 = (
            "Figma, Adobe XD, React, Flutter, transaction monitoring, quality "
            "audits, process reporting. I move between the design table and the "
            "audit sheet without dropping standards on either side."
        )
        p4 = (
            f"If this profile is close to what {company_addr} is looking for, "
            f"let us have a quick conversation. Reach me on {PROFILE['email']} or "
            f"{PROFILE['phone']}. Full portfolio: {PROFILE['linkedin']}."
        )
        p5 = "Ready when you are."
        return greeting, sign_off, [p1, p2, p3, p4, p5], ""

    # default: warm
    greeting = f"Dear {company} team," if company else "Dear Hiring Manager,"
    sign_off = "Warm regards,"
    p1 = (
        f"I am writing to express my interest in {role}{company_bit}. My work "
        "sits at the intersection of design, front-end engineering and fraud "
        "and risk operations — a combination that has proven unusually useful "
        "in roles that reward both craft and analytical rigour."
    )
    p2 = (
        "Most recently, I have been embedded on the Flipkart process at Startek "
        "India as a Fraud and Risk Analyst, following an eight-month stint in "
        "the same discipline at Netscribes. Before that, I shipped user "
        "interfaces and front-end code at Lisica Tech and the National "
        "Institute for Industrial Training. I completed my B.Tech in Computer "
        "Science and Engineering at Adamas University in 2024, and I am "
        "currently pursuing an MBA in Information Technology at Manipal "
        "University Jaipur."
    )
    p3 = (
        "In practice this means I am comfortable moving between Figma and "
        "Adobe XD, React and Flutter code, and process audits, transaction "
        "monitoring and quality reporting. I care about the details that show "
        "up in both worlds — a considered empty state, an audit trail that "
        "explains itself, a micro-interaction that earns its keep."
    )
    p4 = (
        f"I would welcome the chance to discuss how this background might fit "
        f"{company_addr}. You can reach me at {PROFILE['email']} or on "
        f"{PROFILE['phone']}, and my full portfolio and case studies live at "
        f"{PROFILE['linkedin']}."
    )
    p5 = "Thank you for your time and consideration."
    return greeting, sign_off, [p1, p2, p3, p4, p5], ""


def build_cover_letter_pdf(
    role: str | None = None,
    company: str | None = None,
    tone: str | None = None,
) -> bytes:
    role_clean = _sanitize_role(role)
    company_clean = _sanitize_company(company)
    tone_key = (tone or "warm").strip().lower()
    if tone_key not in ("warm", "formal", "bold"):
        tone_key = "warm"

    buf = BytesIO()
    page_w, page_h = LETTER
    c = canvas.Canvas(buf, pagesize=LETTER)
    c.setTitle(f"Anaita Pal — Cover letter ({role_clean})")
    c.setAuthor("Anaita Pal")
    c.setSubject("Cover letter")

    margin_l = 0.7 * inch
    margin_r = 0.7 * inch
    content_w = page_w - margin_l - margin_r
    x0 = margin_l
    x1 = page_w - margin_r

    y = page_h - 0.75 * inch

    # Photo (top-right) — optional, same behaviour as the resume
    photo = _find_photo()
    photo_size = 0.85 * inch
    text_max_w = content_w - (photo_size + 12) if photo else content_w
    if photo:
        try:
            c.saveState()
            cx = x1 - photo_size / 2
            cy = y - photo_size / 2
            path = c.beginPath()
            path.circle(cx, cy, photo_size / 2)
            c.clipPath(path, stroke=0, fill=0)
            c.drawImage(
                str(photo),
                x1 - photo_size,
                y - photo_size,
                width=photo_size,
                height=photo_size,
                preserveAspectRatio=True,
                mask="auto",
            )
            c.restoreState()
            c.setStrokeColor(RULE)
            c.setLineWidth(0.5)
            c.circle(cx, cy, photo_size / 2, stroke=1, fill=0)
        except Exception:
            pass

    # Name & role band — identical to resume
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 22)
    c.drawString(x0, y, PROFILE["name"])
    y -= 18
    c.setFillColor(BODY)
    c.setFont("Helvetica", 11)
    for line in _wrap(c, PROFILE["role"], "Helvetica", 11, text_max_w):
        c.drawString(x0, y, line)
        y -= 14
    y -= 4
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 9.5)
    contact = (
        f"{PROFILE['email']}  |  {PROFILE['phone']}  |  "
        f"{PROFILE['location']}  |  {PROFILE['linkedin']}"
    )
    for line in _wrap(c, contact, "Helvetica", 9.5, text_max_w):
        c.drawString(x0, y, line)
        y -= 12

    if photo:
        photo_bottom = (page_h - 0.75 * inch) - photo_size
        y = min(y, photo_bottom - 6)

    y -= 6
    c.setStrokeColor(RULE)
    c.setLineWidth(0.4)
    c.line(x0, y, x1, y)
    y -= 24

    # Date
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 10)
    c.drawString(x0, y, datetime.utcnow().strftime("%d %B %Y"))
    y -= 22

    # Subject line
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 11)
    subject = f"Application — {role_clean}"
    if company_clean:
        subject += f", {company_clean}"
    for line in _wrap(c, subject, "Helvetica-Bold", 11, content_w):
        c.drawString(x0, y, line)
        y -= 14
    y -= 8

    # Salutation
    c.setFillColor(BODY)
    c.setFont("Helvetica", 10.5)
    greeting, sign_off, paragraphs, _ = _body_paragraphs(role_clean, company_clean, tone_key)
    c.drawString(x0, y, greeting)
    y -= 18

    # Body paragraphs
    for para in paragraphs:
        for line in _wrap(c, para, "Helvetica", 10.5, content_w):
            c.drawString(x0, y, line)
            y -= 14
        y -= 6

    # Sign-off
    y -= 4
    c.setFillColor(BODY)
    c.setFont("Helvetica", 10.5)
    c.drawString(x0, y, sign_off)
    y -= 30
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(x0, y, PROFILE["name"].title())

    c.showPage()
    c.save()
    return buf.getvalue()
