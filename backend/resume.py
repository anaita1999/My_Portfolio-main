"""ATS-friendly single-column resume for Anaita Pal.

Design goals:
- Single column, standard section headings (SUMMARY / EXPERIENCE / PROJECTS /
  EDUCATION / CERTIFICATIONS / SKILLS) — parseable by any ATS.
- Skills rendered as inline comma-separated text (not pills / not a grid).
- Consistent spacing, no orphaned dates, no two-column education/skills split.
- Optional profile photo: if `/app/backend/assets/profile.jpg` (or .png) exists,
  it is placed in the top-right as a small, unobtrusive avatar that does not
  disrupt text extraction. If it is missing, the header simply flows without
  a photo — the resume stays fully usable.
"""

from io import BytesIO
from pathlib import Path

from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas


ROOT_DIR = Path(__file__).parent
ASSETS_DIR = ROOT_DIR / "assets"


PROFILE = {
    "name": "ANAITA PAL",
    "role": "Designer · Front-End Developer · Fraud & Risk Analyst",
    "email": "anaita.pal.cse@gmail.com",
    "phone": "+91 7980958364",
    "location": "49, Baidyanath Dutta Sarani, Howrah 113",
    "linkedin": "linkedin.com/in/anaitapal1999",
    "summary": (
        "B.Tech in Computer Science & Engineering (Adamas University, 2024) "
        "with an MBA in Information Technology in progress at Manipal University "
        "Jaipur. Cross-disciplinary professional working across UI/UX and front-end "
        "engineering (Lisica Tech, NIIT) and Fraud, Risk & Quality Assurance "
        "(Startek — Flipkart process; Netscribes). Comfortable moving between "
        "Figma, Adobe XD and React / Flutter code, and equally at home in process "
        "audits, transaction monitoring and quality reporting."
    ),
}

EXPERIENCE = [
    {
        "role": "Boom Operator",
        "org": "Fusion CX",
        "loc": "Howrah, India",
        "dates": "May 2026 – Present",
        "bullets": [
            "Current role — started May 2026.",
        ],
    },
    {
        "role": "Fraud Analyst",
        "org": "Startek India",
        "loc": "Kolkata, India",
        "dates": "Feb 2025 – Jan 2026",
        "bullets": [
            "Flipkart Fraud and Risk Analyst — 1 year on the Flipkart process.",
        ],
    },
    {
        "role": "Fraud Analyst",
        "org": "Netscribes",
        "loc": "Kolkata, India",
        "dates": "Jul 2024 – Feb 2025",
        "bullets": [
            "Fraud and Risk Management Analyst — 8 months.",
        ],
    },
    {
        "role": "Graphic Designer",
        "org": "Lisica Tech",
        "loc": "Kolkata, India",
        "dates": "Nov 2023 – Feb 2024",
        "bullets": [
            "Created a user-friendly UI for the company website.",
        ],
    },
    {
        "role": "Frontend Web Developer",
        "org": "Lisica Tech",
        "loc": "Kolkata, India",
        "dates": "May 2023 – Jul 2023",
        "bullets": [
            "Assisted in developing the company website.",
            "Implemented front-end technical solutions to meet project requirements.",
        ],
    },
    {
        "role": "Front-End Developer (Internship)",
        "org": "National Institute for Industrial Training",
        "loc": "Remote",
        "dates": "2023",
        "bullets": [
            "Built responsive web experiences with Node.js.",
            "Actively engaged in creative design and development.",
        ],
    },
]

PROJECTS = [
    ("AntiRaG (2024)", "Anti-Ragging mobile application with anonymous SOS, evidence upload and mentor pairing."),
    ("Fast Meal (2024)", "Food delivery UI — 27 frames covering onboarding, ordering and delivery tracking."),
    ("Cyberfiction (2023)", "Locomotive-Scroll front-end experiment exploring layered scroll storytelling."),
    ("AI Voice Assistant (2023)", "Python voice assistant blending conversational UX with functional code."),
]

EDUCATION = [
    ("MBA, Information Technology", "Manipal University Jaipur", "Jan 2026 – Jul 2028", "In progress"),
    ("B.Tech, Computer Science & Engineering", "Adamas University", "Aug 2021 – Aug 2024", "58%"),
    ("Diploma, Computer Science & Technology", "Kingston Polytechnic College", "Aug 2018 – Jun 2021", "88%"),
    ("Madhyamik (10th)", "Ichapur Boy's High School", "2015 – 2016", "66%"),
]

CERTIFICATIONS = [
    "AWS Academy Cloud Foundations — AWS Academy",
    "Introduction to Generative AI",
    "Technical Support Fundamentals",
    "Skills for Business Leadership",
    "UI/UX for Beginners — Great Learning Academy",
]

SKILLS = {
    "Design": "UI/UX Design, Product Thinking, Figma, Adobe XD, Prototyping, Motion Design",
    "Engineering": "React, JavaScript, Node.js, HTML, CSS, Flutter, Python, Java, MySQL",
    "Fraud, Risk & QA": "Transaction Monitoring, Fraud Detection, SOP Compliance, Quality Audits, Reporting",
    "Tools": "MS Excel, Google Sheets, Android Studio, VS Code, Git, Command Line",
}

INK = HexColor("#0A0A0A")
BODY = HexColor("#1F1F1F")
MUTED = HexColor("#5A5A5A")
RULE = HexColor("#C8C8C8")


def _find_photo() -> Path | None:
    for name in ("profile.jpg", "profile.jpeg", "profile.png", "profile.webp"):
        p = ASSETS_DIR / name
        if p.exists():
            return p
    return None


def _wrap(c, text, font, size, max_width):
    words = text.split(" ")
    lines, cur = [], ""
    for w in words:
        candidate = w if not cur else f"{cur} {w}"
        if c.stringWidth(candidate, font, size) <= max_width:
            cur = candidate
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def _rule(c, y, x0, x1, color=RULE, width=0.4):
    c.setStrokeColor(color)
    c.setLineWidth(width)
    c.line(x0, y, x1, y)


def _section(c, y, label, x0, x1):
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(x0, y, label)
    y -= 4
    _rule(c, y, x0, x1)
    return y - 12


def _ensure_room(c, y, needed, bottom_margin=0.6 * inch):
    """Start a new page if `needed` points won't fit above the bottom margin."""
    if y - needed < bottom_margin:
        c.showPage()
        return LETTER[1] - 0.7 * inch
    return y


def build_resume_pdf() -> bytes:
    buf = BytesIO()
    page_w, page_h = LETTER
    c = canvas.Canvas(buf, pagesize=LETTER)
    c.setTitle("Anaita Pal — Resume")
    c.setAuthor("Anaita Pal")
    c.setSubject("Resume")

    margin_l = 0.7 * inch
    margin_r = 0.7 * inch
    content_w = page_w - margin_l - margin_r
    x0 = margin_l
    x1 = page_w - margin_r

    y = page_h - 0.75 * inch

    # ------------------------------------------------------------------ header
    photo = _find_photo()
    photo_size = 0.85 * inch
    text_max_w = content_w - (photo_size + 12) if photo else content_w

    if photo:
        try:
            c.saveState()
            # Circular clip
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
            # Thin ring
            c.setStrokeColor(RULE)
            c.setLineWidth(0.5)
            c.circle(cx, cy, photo_size / 2, stroke=1, fill=0)
        except Exception:
            # If image fails to render, silently drop the photo — the resume
            # should still generate.
            pass

    # Name
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 22)
    c.drawString(x0, y, PROFILE["name"])
    y -= 18

    # Role
    c.setFillColor(BODY)
    c.setFont("Helvetica", 11)
    for line in _wrap(c, PROFILE["role"], "Helvetica", 11, text_max_w):
        c.drawString(x0, y, line)
        y -= 14

    y -= 4

    # Contact — plain single line, wraps if needed
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 9.5)
    contact = (
        f"{PROFILE['email']}  |  {PROFILE['phone']}  |  "
        f"{PROFILE['location']}  |  {PROFILE['linkedin']}"
    )
    for line in _wrap(c, contact, "Helvetica", 9.5, text_max_w):
        c.drawString(x0, y, line)
        y -= 12

    # If a photo was drawn, drop y below the photo before the first rule
    if photo:
        photo_bottom = (page_h - 0.75 * inch) - photo_size
        y = min(y, photo_bottom - 6)

    y -= 6
    _rule(c, y, x0, x1)
    y -= 16

    # ---------------------------------------------------------------- summary
    y = _section(c, y, "SUMMARY", x0, x1)
    c.setFillColor(BODY)
    c.setFont("Helvetica", 10)
    for line in _wrap(c, PROFILE["summary"], "Helvetica", 10, content_w):
        c.drawString(x0, y, line)
        y -= 13
    y -= 6

    # ------------------------------------------------------------- experience
    y = _ensure_room(c, y, 40)
    y = _section(c, y, "EXPERIENCE", x0, x1)

    for e in EXPERIENCE:
        y = _ensure_room(c, y, 60)

        # Row 1: role (bold left) — dates (right)
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 10.5)
        c.drawString(x0, y, e["role"])
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 9.5)
        c.drawRightString(x1, y, e["dates"])
        y -= 12

        # Row 2: org · location (italic left)
        c.setFillColor(BODY)
        c.setFont("Helvetica-Oblique", 10)
        c.drawString(x0, y, f"{e['org']} — {e['loc']}")
        y -= 12

        # Bullets
        c.setFillColor(BODY)
        c.setFont("Helvetica", 10)
        for b in e["bullets"]:
            for i, line in enumerate(_wrap(c, b, "Helvetica", 10, content_w - 14)):
                prefix = "•  " if i == 0 else "   "
                c.drawString(x0 + 4, y, prefix + line)
                y -= 12
        y -= 6

    y -= 2

    # ------------------------------------------------------------------ projects
    y = _ensure_room(c, y, 60)
    y = _section(c, y, "SELECTED PROJECTS", x0, x1)
    c.setFillColor(BODY)
    for title, desc in PROJECTS:
        y = _ensure_room(c, y, 26)
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(x0, y, title)
        y -= 12
        c.setFillColor(BODY)
        c.setFont("Helvetica", 10)
        for line in _wrap(c, desc, "Helvetica", 10, content_w):
            c.drawString(x0, y, line)
            y -= 12
        y -= 4

    # ------------------------------------------------------------------ education
    y = _ensure_room(c, y, 80)
    y = _section(c, y, "EDUCATION", x0, x1)
    for level, school, dates, score in EDUCATION:
        y = _ensure_room(c, y, 30)
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 10.5)
        c.drawString(x0, y, level)
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 9.5)
        c.drawRightString(x1, y, dates)
        y -= 12
        c.setFillColor(BODY)
        c.setFont("Helvetica", 10)
        c.drawString(x0, y, school)
        c.setFillColor(MUTED)
        c.drawRightString(x1, y, score)
        y -= 14

    # ------------------------------------------------------------------ certifications
    y = _ensure_room(c, y, 60)
    y = _section(c, y, "CERTIFICATIONS", x0, x1)
    c.setFillColor(BODY)
    c.setFont("Helvetica", 10)
    for cert in CERTIFICATIONS:
        y = _ensure_room(c, y, 14)
        for i, line in enumerate(_wrap(c, cert, "Helvetica", 10, content_w - 14)):
            prefix = "•  " if i == 0 else "   "
            c.drawString(x0 + 4, y, prefix + line)
            y -= 12
    y -= 4

    # ------------------------------------------------------------------ skills
    y = _ensure_room(c, y, 70)
    y = _section(c, y, "SKILLS", x0, x1)
    for group, skills_line in SKILLS.items():
        y = _ensure_room(c, y, 26)
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 10)
        label = f"{group}: "
        label_w = c.stringWidth(label, "Helvetica-Bold", 10)
        c.drawString(x0, y, label)

        # Wrap the values with a hanging indent under the label
        c.setFillColor(BODY)
        c.setFont("Helvetica", 10)
        max_w_first = content_w - label_w
        max_w_rest = content_w - label_w  # keep uniform, hanging indent
        first = True
        remaining = skills_line
        while remaining:
            width = max_w_first if first else max_w_rest
            # Find the max slice that fits
            words = remaining.split(" ")
            fit = ""
            for w in words:
                cand = w if not fit else f"{fit} {w}"
                if c.stringWidth(cand, "Helvetica", 10) <= width:
                    fit = cand
                else:
                    break
            if not fit:
                fit = words[0]
            c.drawString(x0 + label_w if first else x0 + label_w, y, fit)
            y -= 12
            remaining = remaining[len(fit):].lstrip(", ").lstrip()
            first = False
        y -= 4

    # (No footer — keeps the layout ATS-clean; nothing extraneous for parsers.)

    c.showPage()
    c.save()
    return buf.getvalue()
