# Anaita Pal — 3D WebGL Portfolio

## Original problem
Build a 3D portfolio inspired by Active Theory / Hydra using WebGL + GSAP. Reference content from https://boylegend.my.canva.site/anaita-pal-portfolio

## Stack
- React 19 + CRA + Craco
- Three.js 0.160 + @react-three/fiber 9.0.4 (Hero WebGL particle field)
- GSAP + ScrollTrigger for scroll animations
- Lenis smooth scroll
- Tailwind + shadcn/ui
- FastAPI + Mongo (contact endpoint)

## Implemented (Feb 2026)
- Preloader with counter + gradient bar
- Custom cursor (GSAP quickTo, mix-blend difference)
- Fixed glass Navbar with time + Live pill CTA
- Hero: WebGL particle field with 4200 additive-blended points, orbital rings, mouse parallax
- About: Big italic headline, bio, bento stats (Education/Experience/Languages)
- Skills: 12 skills bento grid with neon border hover
- Projects: 4 project cards with CSS chromatic aberration + accent color wash on hover
- Experience: timeline with color-coded dots
- Testimonials: glass carousel with prev/next
- Contact: massive typography + underlined form + toast
- Footer
- Backend /api/contact POST + GET

## Personas
- Recruiters / studio leads
- Design agencies scouting freelance
- Clients evaluating UI/UX + dev capability

## P0 done
- Hero WebGL ✓
- All sections rendering ✓
- Contact submits to backend ✓

## Backlog / next
- Add 3D scroll-driven Z-axis project reveal
- Blog/Case study detail pages
- CMS-backed projects
- Downloadable resume (PDF)
- Analytics events


## Update — Feb 2026 (iteration 2)
- Case Study pages: /work/:slug with problem, approach, screens, outcomes, next-project CTA
- Resume PDF: reportlab-generated /api/resume — buttons in Navbar, Hero, Contact
- Hire Me widget: floating gradient FAB opens rate-card modal + brief form (name/email/budget/message) → /api/hire
- Share widget: floating share FAB with X, LinkedIn, WhatsApp, Email, copy-link
- Analytics: /api/analytics/events (batched POST) + /api/analytics/summary; auto-tracks page_view, section_view, case_study_view, resume_download, hire_submit, share_*
- Testing agent iteration 2: 10/10 backend + 100% frontend pass


## Update — Feb 2026 (LinkedIn enrichment)
- Added MBA (Manipal University Jaipur) to Education
- Added 3 experience entries (Fusion CX, Startek India, Netscribes) verbatim from LinkedIn
- New Certifications section (05) — Introduction to Generative AI, Technical Support Fundamentals, Skills for Business Leadership, AWS Academy Cloud Foundations
- Testimonials renumbered 05→06, Contact 06→07
- Conflicts flagged (see chat): hero role, bio direction, email, address, Lisica Tech role, Diploma school name, NIIT internship vs full role, LinkedIn Top Skills (Boom Operator/Sound Board/Life Insurance)
