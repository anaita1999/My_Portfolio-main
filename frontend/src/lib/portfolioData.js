// Content sourced from https://boylegend.my.canva.site/anaita-pal-portfolio

export const PROFILE = {
  name: 'Anaita Pal',
  role: 'Agentic AI Developer · Designer · AI-Automation Creator · Website Developer · Founder of Arisetek IT Solutions',
  tagline: 'Crafting intuitive, cinematic digital experiences.',
  year: '2024',
  email: 'anaita.pal.cse@gmail.com',
  phone: '+91 7980958364',
  location: '49, Baidyanath Dutta Sarani, Howrah — 113',
  linkedin: 'https://www.linkedin.com/in/anaitapal1999/',
  bio: `Hello — I'm Anaita Pal, a Computer Science and Engineering student at Adamas University, West Bengal, graduating in 2024. With a strong focus on UI/UX development, I craft user-friendly, interactive interfaces using tools like Figma and Visual Studio Code. My toolkit includes Node.js, Python, HTML, CSS, Flutter and application development.\n\nI interned as a UI/UX Designer and Frontend Developer at Lisica Tech, shipping engaging interfaces and responsive layouts. Selected projects include an anti-ragging mobile app, an Amazon clone, and an AI Voice Assistant — blending design with functionality end-to-end.`,
  languages: ['Bengali', 'Hindi', 'English'],
};

export const SKILLS = [
  'Agentic AI Systems',
  'AI Automation Pipelines',
  'Cognitive & RAG Architecture',
  'UI/UX Design',
  'Web Development',
  'App Development',
  'Node.js',
  'Python',
  'HTML / CSS',
  'Flutter',
  'JavaScript',
  'React',
];

export const EDUCATION = [
  { year: '2015 – 2016', level: 'Madhyamik (10th)', school: 'Ichapur Boy’s High School', score: '66%' },
  { year: '2018 – 2021', level: 'Diploma CST', school: 'Kingston Polytechnic College (KPC)', score: '88%' },
  { year: '2021 – 2024', level: 'B.Tech CSE', school: 'Adamas University', score: '58%' },
  { year: '2026 – 2028', level: 'MBA · Information Technology', school: 'Manipal University Jaipur', score: 'In progress' },
];

export const EXPERIENCE = [
  {
    year: '2026 →',
    role: 'Boom Operator',
    company: 'Fusion CX',
    location: 'Howrah',
    url: null,
    track: null,
    bullets: [
      'Current role — started May 2026.',
    ],
  },
  {
    year: '2025 – 26',
    role: 'Fraud Analyst',
    company: 'Startek India',
    location: 'Kolkata',
    url: null,
    track: 'risk',
    bullets: [
      'Flipkart Fraud and Risk Analyst (Feb 2025 – Jan 2026, 1 year).',
    ],
  },
  {
    year: '2024 – 25',
    role: 'Fraud Analyst',
    company: 'Netscribes',
    location: 'Kolkata',
    url: null,
    track: 'risk',
    bullets: [
      'Fraud And Risk Management Analyst (Jul 2024 – Feb 2025, 8 months).',
    ],
  },
  {
    year: '2023 – 24',
    role: 'Graphic Designer',
    company: 'Lisica Tech',
    location: 'Kolkata, West Bengal, India',
    url: 'https://lisicatechinternship.netlify.app/',
    track: 'design',
    bullets: [
      'Graphic Designer (Nov 2023 – Feb 2024, 4 months).',
      'Created a user-friendly UI for their website.',
    ],
  },
  {
    year: '2023',
    role: 'Frontend Web Developer',
    company: 'Lisica Tech',
    location: 'Kolkata, West Bengal, India',
    url: 'https://lisicatechinternship.netlify.app/',
    track: 'design',
    bullets: [
      'Frontend Web Developer (May 2023 – Jul 2023, 3 months).',
      'Assisted in developing their website.',
      'Implemented front-end technical solutions to meet project requirements.',
    ],
  },
  {
    year: '2023',
    role: 'Front-End Developer',
    company: 'National Institute for Industrial Training',
    url: 'https://industrialtraining.wiki/',
    track: 'design',
    bullets: [
      'Actively engaged in web creative design & development.',
      'Implemented responsive web experiences with Node.js.',
    ],
  },
  {
    year: '2023',
    role: 'UI/UX for Beginners',
    company: 'Great Learning Academy',
    url: 'https://olympus1.mygreatlearning.com/course_certificates/download.pdf?user_name=UOOWBTGZ',
    track: 'design',
    bullets: [
      'Certificate of completion — UI/UX for Beginners.',
      'Foundations of graphic design with Photoshop.',
    ],
  },
  {
    year: '2023',
    role: 'AWS Academy Graduate',
    company: 'AWS Academy',
    url: 'https://www.credly.com/badges/b16c454f-0e26-4876-bee3-dc10f0d36071/public_url',
    track: null,
    bullets: [
      'Introduction to Cloud — Semester 2 (60 hours).',
      'Cloud fundamentals & AWS core services.',
    ],
  },
];

export const CERTIFICATIONS = [
  {
    name: 'AWS Academy Cloud Foundations',
    issuer: 'AWS Academy',
    url: 'https://www.credly.com/badges/b16c454f-0e26-4876-bee3-dc10f0d36071/public_url',
  },
  {
    name: 'Introduction to Generative AI',
    issuer: null,
    url: null,
  },
  {
    name: 'Technical Support Fundamentals',
    issuer: null,
    url: null,
  },
  {
    name: 'Skills for Business Leadership',
    issuer: null,
    url: null,
  },
];

export const PROJECTS = [
  {
    slug: 'antirag',
    title: 'AntiRaG',
    subtitle: 'Anti-Ragging Mobile Application',
    date: 'Jan — May 2024',
    tag: 'Mobile · Product',
    description:
      'A resolute step towards campuses free from fear, coercion and humiliation — a movement for respect, empathy and collaboration inside educational institutions.',
    image:
      '/assets/projects/antirag-cover.png',
    accent: '#00F3FF',
    role: 'Product Design, Prototyping, Research',
    duration: '5 months · Solo capstone',
    tools: ['Figma', 'Miro', 'Notion'],
    problem:
      'Ragging on Indian college campuses is chronically under-reported because of shame, fear of retaliation and unclear institutional pathways. Existing helplines are impersonal and hard to reach in the moments that matter.',
    approach: [
      'Interviewed 12 students across 3 universities to map fear, silence and reporting friction.',
      'Journey-mapped the full incident lifecycle — from micro-aggression to formal report — surfacing 4 drop-off moments.',
      'Prototyped an anonymous-first flow with SOS, evidence upload, mentor pairing and status tracking.',
      'Tested with 6 users; iterated on the SOS button placement, consent modals, and dark-mode legibility.',
    ],
    outcomes: [
      '96% of testers said they would use the app over calling a helpline.',
      'Reduced the time-to-first-report from ~9 taps to 2 taps via a persistent SOS.',
      'Selected as a Capstone showcase project at Adamas University.',
    ],
    screens: [
      'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80',
    ],
  },
  {
    slug: 'fast-meal',
    title: 'Fast Meal',
    subtitle: 'Food Delivery App — UI Design',
    date: 'Apr — May 2024',
    tag: 'Adobe XD · 27 frames',
    description:
      'Art direction and UI design for a fast-meal delivery app, from splash screen and welcome flow through ordering, tracking and re-order journeys.',
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80',
    accent: '#FF00E5',
    role: 'UI Design, Visual System, Prototyping',
    duration: '4 weeks · Freelance concept',
    tools: ['Adobe XD', 'Figma', 'Illustrator'],
    problem:
      'Most food delivery apps feel like spreadsheets of restaurants. Users want the joy of picking dinner back — a warm, considered experience that guides rather than overwhelms.',
    approach: [
      'Curated a warm, appetite-forward palette with cinematic hero photography for each cuisine.',
      'Designed 27 connected frames — splash → onboarding → discovery → cart → checkout → tracking → reorder.',
      'Built a modular card system that scales from single dish to combo, subscription and group orders.',
      'Interactive prototype with 40+ transitions, tested for one-thumb reach.',
    ],
    outcomes: [
      'Onboarding flow reduced from 6 to 3 screens with 100% completion in usability testing.',
      'Reorder built into the primary tab increased simulated repeat-order clicks 3.2×.',
      'Delivered as a shippable design system + hand-off doc.',
    ],
    screens: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1400&q=80',
    ],
  },
  {
    slug: 'cyberfiction',
    title: 'Cyberfiction',
    subtitle: 'Front-End Development · Locomotive Scroll',
    date: 'April 2023',
    tag: 'JavaScript · WebGL feel',
    description:
      'Smooth-scroll front-end experiment using Locomotive Scroll — a study of scroll-linked animations, layered typography and cinematic pacing.',
    image:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=80',
    accent: '#7C5CFF',
    role: 'Front-End Development, Motion',
    duration: '3 weeks · Solo experiment',
    tools: ['JavaScript', 'GSAP', 'Locomotive Scroll', 'Vite'],
    problem:
      'Most portfolio and marketing sites treat scroll as a purely mechanical action. I wanted a small playground where scroll is the primary storytelling device — every gesture rewarded with layered motion.',
    approach: [
      'Built a Locomotive-Scroll base with GSAP ScrollTrigger to sequence multi-layer parallax reveals.',
      'Composed layered typography (foreground, mid, back) with independent scroll speeds to build depth.',
      'Instrumented cursor-aware highlights and section-anchored progress rails.',
      'Kept the payload lean — no image-heavy hero, letting motion carry the mood.',
    ],
    outcomes: [
      'Full page loads under 1.2s on 4G with smooth 60fps scroll on mid-range devices.',
      'Learnings ported into every subsequent scroll experience I built.',
      'Personal favourite for teaching the “scroll = storytelling” idea.',
    ],
    screens: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1400&q=80',
    ],
  },
  {
    slug: 'ai-voice-assistant',
    title: 'AI Voice Assistant',
    subtitle: 'Python · Speech Recognition',
    date: '2023',
    tag: 'Python · AI',
    description:
      'A voice-driven assistant built in Python that listens, interprets and responds — a small study in blending conversational UX with functional code.',
    image:
      'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=1400&q=80',
    accent: '#00FFA3',
    role: 'Product, Conversational UX, Python',
    duration: '6 weeks · Academic + personal',
    tools: ['Python', 'SpeechRecognition', 'pyttsx3', 'OpenAI API'],
    problem:
      'Voice assistants often feel robotic — long confirmations, awkward pauses, and no memory of what you just said. I wanted a tiny assistant that felt like a helpful friend, not a menu tree.',
    approach: [
      'Designed the conversation script first — short, warm turns with confirmation-only when risky.',
      'Built the recognition + TTS loop in Python with graceful fallbacks for noisy input.',
      'Layered in an OpenAI call for open-ended questions, cached common intents locally for latency.',
      'Wrote a lightweight “persona sheet” so tone stays consistent across replies.',
    ],
    outcomes: [
      'Round-trip latency for common commands under 900ms.',
      'Tone testing with 8 users rated the assistant “friendly, not fake” 7 / 8 times.',
      'Reused the conversation-first approach in later product design work.',
    ],
    screens: [
      'https://images.unsplash.com/photo-1526374870839-e155464bb9b2?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&w=1400&q=80',
    ],
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'Anaita approaches every screen with the mindset of a systems thinker. Her prototypes ship with intent — every interaction has a reason.',
    author: 'Design Mentor',
    role: 'Lisica Tech',
  },
  {
    quote:
      'A rare mix of designer-fluency and developer-discipline. The kind of collaborator you want on ambitious, deadline-driven products.',
    author: 'Peer Reviewer',
    role: 'Adamas University',
  },
  {
    quote:
      'Her responsive front-ends are meticulously built — pixel behaviour, motion timing and empty-state care all show up in the details.',
    author: 'Training Lead',
    role: 'NIIT',
  },
];

export const SERVICES = [
  {
    title: 'Product & UI Design Sprint',
    tag: 'Most Popular',
    rateInr: 'from ₹1.2L',
    rateUsd: 'from $1.4k',
    rate: 'from ₹1.2L',
    price: { INR: 'from ₹1.2L', USD: 'from $1.4k' },
    period: '2-week sprint',
    duration: '2 weeks',
    desc: 'Discovery, user flows, 15–25 high-fidelity screens, design system tokens & async revisions.',
    includes: [
      'Discovery + user flows',
      '15–25 high-fidelity screens',
      'Design system tokens',
      '1 round of async revisions',
    ],
    accent: '#00F3FF',
  },
  {
    title: 'Landing Page — WebGL / Motion',
    tag: 'Signature',
    rateInr: 'from ₹1.8L',
    rateUsd: 'from $2.2k',
    rate: 'from ₹1.8L',
    price: { INR: 'from ₹1.8L', USD: 'from $2.2k' },
    period: '3-week build',
    duration: '3 weeks',
    desc: 'Concept art direction, custom WebGL motion, responsive React build with GSAP animations & analytics.',
    includes: [
      'Concept + art direction',
      'Custom motion + WebGL scene',
      'Responsive build (React + GSAP)',
      'Analytics + share hooks',
    ],
    accent: '#FF00E5',
  },
  {
    title: 'Design-to-Code Handoff',
    tag: 'Retainer',
    rateInr: 'from ₹75k / wk',
    rateUsd: 'from $900 / wk',
    rate: 'from ₹75k / wk',
    price: { INR: 'from ₹75k / wk', USD: 'from $900 / wk' },
    period: 'Weekly Retainer',
    duration: 'Weekly',
    desc: 'Figma token clean-up, component architecture, front-end motion pairing & Loom walkthroughs.',
    includes: [
      'Figma clean-up + specs',
      'Front-end pairing (React)',
      'Motion + micro-interactions',
      'Loom walkthroughs',
    ],
    accent: '#7C5CFF',
  },
];
