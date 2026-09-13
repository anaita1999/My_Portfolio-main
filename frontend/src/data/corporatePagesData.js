/**
 * Central Corporate Content Repository for Arisetek IT Solutions
 * Authentic corporate data strictly grounded in Arisetek's real-world offerings.
 */

export const SERVICES_DATA = {
  "applications": {
    slug: "applications",
    category: "Services",
    title: "Applications & Modern Front-End Engineering",
    tagline: "High-performance React 19, Next.js, Flutter, and 3D WebGL digital interfaces.",
    badge: "CORE CAPABILITY · FRONTEND & MOBILE",
    overview: "We architect and synthesize next-generation web and mobile applications with pixel-perfect craft, 120 FPS animation pipelines, and rock-solid state machines. From complex SaaS enterprise dashboards to cinematic consumer experiences, our applications are built for lightning-fast Core Web Vitals and seamless cross-platform consistency.",
    accent: "#FF6B00",
    stats: [
      { label: "Render Velocity", value: "120 FPS" },
      { label: "Core Web Vitals", value: "99+ Score" },
      { label: "Payload Optimization", value: "< 420 KB Gzip" },
      { label: "Architecture", value: "Modular React 19" }
    ],
    capabilities: [
      {
        title: "React 19 & Next.js App Router Architecture",
        desc: "Server components, streaming SSR, optimistically updated UI state, and custom hook architectures designed for instant interaction fidelity."
      },
      {
        title: "Cross-Platform Flutter Mobile Engineering",
        desc: "Unified single-codebase iOS and Android applications compiling to native ARM bytecode with 120 FPS motion physics and offline caching."
      },
      {
        title: "Cinematic Three.js & WebGL Visual Systems",
        desc: "Interactive 3D geometry, GPU fragment shaders, canvas particles, and physics-driven particle meshes that wow enterprise stakeholders."
      },
      {
        title: "Micro-Frontend & Component Design Systems",
        desc: "Atomic design tokens, Tailwind CSS / Vanilla CSS modules, accessibility compliance (WCAG 2.1 AA), and zero-runtime overhead styling."
      }
    ],
    deliverables: [
      "Production-ready responsive web application or mobile app",
      "Full TypeScript / React 19 component library with design system tokens",
      "Automated CI/CD build scripts & Lighthouse performance audits",
      "Cross-browser & cross-device compatibility verification suite"
    ],
    techStack: ["React 19", "Next.js", "Flutter", "Three.js / WebGL", "Tailwind CSS", "GSAP Motion", "TypeScript", "Vite"]
  },

  "cloud-infrastructure": {
    slug: "cloud-infrastructure",
    category: "Services",
    title: "Cloud & Edge Mesh Infrastructure",
    tagline: "Resilient, containerized cloud topologies across Cloudflare Edge, AWS, and GCP.",
    badge: "INFRASTRUCTURE · CLOUD & EDGE",
    overview: "Arisetek designs and deploys zero-maintenance, highly-available cloud topologies. We leverage Docker containerization, edge computing networks, automated SSL provisioning, and asynchronous message queues to ensure 99.9% uptime and sub-second global response times.",
    accent: "#00E5FF",
    stats: [
      { label: "Availability SLA", value: "99.9%" },
      { label: "Global Edge Latency", value: "< 45ms" },
      { label: "Container Engine", value: "Docker / OCI" },
      { label: "Edge Security", value: "Cloudflare SSL" }
    ],
    capabilities: [
      {
        title: "Edge Compute & CDN Acceleration",
        desc: "Deploying API proxies, geo-routed edge caching, and asset minification across global Cloudflare and edge clusters."
      },
      {
        title: "Containerized Microservices Architecture",
        desc: "Dockerized FastAPI, Node.js, and Python services with healthcheck probes, volume persistence, and environment isolation."
      },
      {
        title: "Automated Deployment & Rollback Pipelines",
        desc: "Zero-downtime blue/green deployment blueprints, GitHub Actions orchestration, and infrastructure-as-code scaffolding."
      },
      {
        title: "Database Cluster Architecture",
        desc: "Multi-region MongoDB Atlas replica sets, PostgreSQL relational pooling, and encrypted backups with automated point-in-time recovery."
      }
    ],
    deliverables: [
      "Production Docker compose / container configuration manifests",
      "Edge SSL, custom domain routing, and DNS configuration",
      "Automated database clustering, indexing, and backup rules",
      "Centralized logging, monitoring, and telemetry integration"
    ],
    techStack: ["Docker", "Cloudflare Edge", "AWS EC2/S3", "GCP", "MongoDB Atlas", "PostgreSQL", "Nginx", "GitHub Actions"]
  },

  "modernization": {
    slug: "modernization",
    category: "Services",
    title: "System Modernization & API Contracts",
    tagline: "Refactoring legacy codebases into modular, high-throughput service meshes.",
    badge: "ARCHITECTURE · SYSTEM EVOLUTION",
    overview: "Legacy systems slow down business velocity and accumulate technical debt. Arisetek transforms monolithic, brittle architectures into decoupled, high-speed API contracts with typed models, automated unit test coverage, and modern database schema synthesis.",
    accent: "#7C5CFF",
    stats: [
      { label: "Throughput Increase", value: "3.4x" },
      { label: "Test Coverage", value: "95%+" },
      { label: "API Spec", value: "OpenAPI 3.1" },
      { label: "Data Integrity", value: "100%" }
    ],
    capabilities: [
      {
        title: "Monolith to Microservices Decomposition",
        desc: "Systematically extracting domain boundaries into independently deployable Python FastAPI and Node.js microservices."
      },
      {
        title: "Strict REST & GraphQL API Contract Design",
        desc: "Pydantic V2 and TypeScript schema validation ensuring zero type drift between backend models and frontend clients."
      },
      {
        title: "Database Schema Normalization & Migration",
        desc: "Zero-downtime ETL data transformations migrating legacy SQL tables to modern structured documents or normalized relational schemas."
      },
      {
        title: "Comprehensive Automated Test Harnesses",
        desc: "Pytest and Jest regression testing suites guaranteeing zero feature regressions during architectural upgrades."
      }
    ],
    deliverables: [
      "Modular backend service codebase with interactive OpenAPI documentation",
      "Schema migration scripts with automated rollback protection",
      "Complete test suite with 90%+ branch coverage",
      "Architectural blueprint documentation and API handoff specs"
    ],
    techStack: ["Python 3.14", "FastAPI", "Pydantic V2", "Pytest", "Node.js", "REST / GraphQL", "MongoDB", "PostgreSQL"]
  },

  "security-compliance": {
    slug: "security-compliance",
    category: "Services",
    title: "Cyber Resilience & Security Standards",
    tagline: "Multi-factor authentication, cryptographic tokens, rate limiting, and zero-trust protection.",
    badge: "SECURITY · DEFENSE IN DEPTH",
    overview: "Security is non-negotiable for modern digital platforms. We integrate zero-trust authentication, TOTP 2FA multi-factor mechanisms, rate-limiting tripwires, bcrypt cryptographic hashing, and automated session revocation into every system we build.",
    accent: "#E0231C",
    stats: [
      { label: "Password Hashing", value: "Bcrypt (Work 12)" },
      { label: "Multi-Factor", value: "TOTP RFC 6238" },
      { label: "Token Crypto", value: "HMAC-SHA256" },
      { label: "Lockout Defense", value: "Adaptive Rate Limit" }
    ],
    capabilities: [
      {
        title: "Two-Factor TOTP & Backup Code Authentication",
        desc: "Time-based one-time password verification compatible with Google Authenticator and 1Password, paired with one-time emergency recovery codes."
      },
      {
        title: "Adaptive Rate-Limiting & Brute-Force Defense",
        desc: "Sliding-window IP and account rate limiters that automatically throttle suspicious telemetry and block automated attack bots."
      },
      {
        title: "Cryptographic Token & Session Lifecycle Management",
        desc: "Stateless JWT tokens with strict TTL expiration, instant session invalidation on password updates, and CSRF protection headers."
      },
      {
        title: "Data Encryption & Transport Security",
        desc: "End-to-end TLS 1.3 encryption, database field-level masking for sensitive PII, and strict Content Security Policies (CSP)."
      }
    ],
    deliverables: [
      "Hardened authentication & authorization module with 2FA",
      "Audit trail logging and rate-limiting tripwire middleware",
      "Automated security regression test suite",
      "Compliance verification report for data integrity and access control"
    ],
    techStack: ["PyOTP", "Bcrypt", "PyJWT", "FastAPI Security", "TLS 1.3", "RateLimiter", "CORS Headers"]
  },

  "ai-data-systems": {
    slug: "ai-data-systems",
    category: "Services",
    title: "Artificial Intelligence & Data Systems",
    tagline: "Autonomous LLM workflows, RAG knowledge retrieval, and intelligent predictive pipelines.",
    badge: "ARTIFICIAL INTELLIGENCE · AGENTIC RAG",
    overview: "We turn raw enterprise data into active intelligence. From custom Retrieval-Augmented Generation (RAG) vector pipelines to conversational customer assistants and automated data synthesis, we build AI solutions that deliver verifiable business impact without hallucination.",
    accent: "#FF00E5",
    stats: [
      { label: "Vector Search", value: "Sub-50ms" },
      { label: "RAG Accuracy", value: "99.2%" },
      { label: "Model Agnostic", value: "Gemini / Claude / OpenAI" },
      { label: "Pipeline Type", value: "Agentic Streaming" }
    ],
    capabilities: [
      {
        title: "Enterprise RAG & Vector Embeddings",
        desc: "Semantic search across unstructured company documentation, PDFs, and manuals using high-density vector indices."
      },
      {
        title: "Autonomous Agent Tool Calling & Workflows",
        desc: "Orchestrating autonomous LLM workflows capable of querying internal databases, triggering webhooks, and executing actions."
      },
      {
        title: "Conversational UX & Natural Voice Synthesis",
        desc: "Interactive conversational interfaces with markdown streaming, real-time typing physics, and voice recognition integrations."
      },
      {
        title: "Structured Data Extraction & Classification",
        desc: "Parsing high-volume inbound leads, invoices, and resumes into strongly-typed JSON schemas with automated validation."
      }
    ],
    deliverables: [
      "Custom RAG vector pipeline and automated document ingestion engine",
      "Interactive streaming chat / AI assistant frontend component",
      "API endpoints with rate limiting, token tracking, and safety guardrails",
      "Model evaluation benchmarks and performance logging dashboard"
    ],
    techStack: ["Python", "LangChain / LlamaIndex", "ChromaDB / Pinecone", "Gemini API", "FastAPI", "Pandas", "NumPy"]
  },

  "digital-workplace": {
    slug: "digital-workplace",
    category: "Services",
    title: "Digital Workplace & Custom Internal Tools",
    tagline: "Intuitive bespoke CMS, admin dashboards, and operations management portals.",
    badge: "OPERATIONS · BESPOKE INTERNAL TOOLS",
    overview: "Off-the-shelf software rarely fits proprietary business workflows. We build tailored digital workplaces, admin consoles, and CRM platforms that empower founders, product teams, and operators to control content, monitor telemetry, and manage customers in real time.",
    accent: "#00F3FF",
    stats: [
      { label: "Admin Response", value: "< 100ms" },
      { label: "Data Sync", value: "Real-time" },
      { label: "RBAC Security", value: "Role-Based" },
      { label: "Telemetry", value: "Live Stream" }
    ],
    capabilities: [
      {
        title: "Custom Headless CMS & Live Content Editing",
        desc: "Visual editor dashboards enabling marketing and executive teams to update site copy, pricing tiers, and case studies instantly."
      },
      {
        title: "Inbound Lead & CRM Management",
        desc: "Automated triage feeds, client inquiry timelines, proposal generator pipelines, and automated email confirmation dispatches."
      },
      {
        title: "Real-Time Telemetry & Event Analytics",
        desc: "Privacy-first event tracking collecting user interactions, conversion funnels, and performance metrics without third-party tracking bloat."
      },
      {
        title: "Automated PDF Report & Proposal Generation",
        desc: "Dynamic server-side PDF generation producing branded invoices, custom cover letters, and project proposals on demand."
      }
    ],
    deliverables: [
      "Full custom admin portal with responsive mobile and desktop layouts",
      "Role-based access control (RBAC) and activity audit logs",
      "Dynamic PDF generation engine (ReportLab / Weasyprint)",
      "Real-time event analytics dashboard"
    ],
    techStack: ["React 19", "FastAPI", "ReportLab", "Tailwind CSS", "Recharts", "MongoDB", "Bcrypt"]
  },

  "autonomous-swarm": {
    slug: "autonomous-swarm",
    category: "Services",
    title: "Autonomous Department Swarm",
    tagline: "Multi-agent coordination meshes for automated reconnaissance, architecture, dev, QA, and launch.",
    badge: "AUTONOMOUS AGENTS · MULTI-AGENT MESH",
    overview: "The Arisetek Department Swarm is our signature agentic orchestration architecture. A synchronized mesh of specialized AI agents collaborate across the software lifecycle: scouting RFPs, synthesizing database schemas, scaffolding frontend and backend code, running automated security audits, and validating deployments.",
    accent: "#FF6B00",
    stats: [
      { label: "Active Swarm Nodes", value: "5 Specialists" },
      { label: "Coordination Efficiency", value: "99.4%" },
      { label: "Assembly Velocity", value: "2.4s Build" },
      { label: "Mesh Protocol", value: "Event Driven" }
    ],
    capabilities: [
      {
        title: "AGENT_01 · Lead Reconnaissance & Scoring",
        desc: "Autonomous inbound qualification, RFP requirement extraction, scope scoring, and calendar routing."
      },
      {
        title: "AGENT_02 · Solution Architecture & Blueprinting",
        desc: "Automatic generation of database schemas, entity relationship diagrams, and OpenAPI contract specifications."
      },
      {
        title: "AGENT_03 · Autonomous Engineering & Dev",
        desc: "Scaffolding React 19 visual components, Flutter mobile clients, and FastAPI asynchronous backend endpoints."
      },
      {
        title: "AGENT_04 & 05 · QA Audit & Edge Deployment",
        desc: "End-to-end unit test execution, security vulnerability verification, and automated edge SSL deployment."
      }
    ],
    deliverables: [
      "End-to-end multi-agent orchestration architecture",
      "Event-driven messaging queue for inter-agent data exchange",
      "Live telemetry inspector and human-in-the-loop oversight UI",
      "Autonomous code synthesis and verification engine"
    ],
    techStack: ["Python", "FastAPI", "WebSockets", "Framer Motion", "Pydantic", "AsyncIO", "Docker"]
  },

  "consulting": {
    slug: "consulting",
    category: "Services",
    title: "Consulting & Solution Architecture",
    tagline: "Executive technical strategy, feasibility analysis, and rapid MVP design sprints.",
    badge: "STRATEGY · TECHNICAL ADVISORY",
    overview: "Before writing a single line of code, software success begins with rigorous architecture and user flow design. We partner with founders and enterprise leaders to evaluate technical feasibility, select optimal modern stacks, define delivery timelines, and craft high-fidelity interactive prototypes.",
    accent: "#FFA000",
    stats: [
      { label: "Sprint Duration", value: "1 – 2 Weeks" },
      { label: "Prototype Fidelity", value: "Interactive 4K" },
      { label: "Architecture Spec", value: "Full Stack" },
      { label: "Tech Stack ROI", value: "Maximized" }
    ],
    capabilities: [
      {
        title: "Product Discovery & Scope Qualification",
        desc: "Mapping business objectives into actionable engineering backlogs, technical user stories, and milestone roadmaps."
      },
      {
        title: "High-Fidelity Interactive Prototyping",
        desc: "Figma and code prototypes with real transition timings, motion physics, and user testing validation."
      },
      {
        title: "Tech Stack Evaluation & Cost Optimization",
        desc: "Benchmarking cloud hosting costs, database engines, and frontend frameworks to minimize operating expenditure."
      },
      {
        title: "Code Review & Technical Debt Audit",
        desc: "In-depth inspection of existing applications with actionable refactoring plans for performance, security, and scalability."
      }
    ],
    deliverables: [
      "Complete Solution Architecture Document (SAD)",
      "Interactive high-fidelity design prototype and component tokens",
      "Fixed-price, milestone-driven execution roadmap",
      "Detailed cloud infrastructure cost projection"
    ],
    techStack: ["Figma", "Architecture Diagrams", "OpenAPI", "Cost Modeling", "Loom Walkthroughs"]
  },

  "bridge": {
    slug: "bridge",
    category: "Services",
    title: "Arisetek Bridge & Integrations",
    tagline: "Seamless connectors for payment gateways, cloud providers, and enterprise SaaS APIs.",
    badge: "INTEGRATION · SAAS & PAYMENTS",
    overview: "Modern applications do not live in isolation. Arisetek Bridge connects your core software with critical payment processors, communications APIs, cloud storage buckets, and enterprise databases with webhook verification, automated retry queues, and idempotent transaction handling.",
    accent: "#00E5FF",
    stats: [
      { label: "Connector Reliability", value: "99.99%" },
      { label: "Retry Mechanism", value: "Exponential Backoff" },
      { label: "Currency Support", value: "INR (₹) & USD ($)" },
      { label: "Webhook Latency", value: "< 120ms" }
    ],
    capabilities: [
      {
        title: "Payment Gateway Integration (Stripe & Razorpay)",
        desc: "Dual-currency INR and USD billing, recurring subscription retainers, checkout sessions, and webhook signature verification."
      },
      {
        title: "Enterprise Notification & Email Webhooks",
        desc: "Automated transactional email dispatches, lead notifications, and SMS triggers via Resend, SendGrid, and Twilio."
      },
      {
        title: "Cloud Object Storage & Media Pipelines",
        desc: "Presigned URL uploads to AWS S3 / Cloudflare R2 with automatic image optimization and CDN caching."
      },
      {
        title: "Third-Party SaaS & CRM Connectors",
        desc: "Bi-directional synchronization with Google Sheets, Slack alerts, HubSpot, and custom REST webhook destinations."
      }
    ],
    deliverables: [
      "Secure payment and webhook processing endpoints",
      "Idempotent transaction handlers with automated error recovery",
      "Dual-currency pricing switcher and checkout components",
      "Integration testing sandbox and environment secrets guide"
    ],
    techStack: ["Stripe", "Razorpay", "AWS S3 / R2", "Resend", "FastAPI", "Webhooks", "HMAC Signatures"]
  },

  "vital": {
    slug: "vital",
    category: "Services",
    title: "Arisetek Vital & Performance Telemetry",
    tagline: "Real-time system health checks, latency monitoring, and SLA uptime tracking.",
    badge: "OBSERVABILITY · REAL-TIME TELEMETRY",
    overview: "Arisetek Vital provides continuous visibility into application health, API response latencies, database connection pools, and user traffic. Built into our core server architecture, Vital ensures issues are detected and mitigated before impacting end users.",
    accent: "#E0231C",
    stats: [
      { label: "Heartbeat Check", value: "Every 30s" },
      { label: "Status Route", value: "/api/health" },
      { label: "Telemetry Log", value: "Structured JSON" },
      { label: "Incident Alert", value: "Instant Webhook" }
    ],
    capabilities: [
      {
        title: "Automated API & Database Health Probes",
        desc: "Periodic heartbeat queries validating MongoDB Atlas latency, memory consumption, and process uptime."
      },
      {
        title: "Client-Side Core Web Vitals Tracking",
        desc: "Real-user monitoring (RUM) capturing Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS)."
      },
      {
        title: "Structured Audit Logs & Error Tracking",
        desc: "JSON-formatted error traces with sanitized request context for instant developer troubleshooting."
      },
      {
        title: "Performance Benchmarking & Optimization",
        desc: "Continuous load testing and profiling to eliminate database N+1 bottlenecks and uncompressed network payloads."
      }
    ],
    deliverables: [
      "Live health check endpoint (`/api/health`) and uptime status badge",
      "Client telemetry collector hook (`useTelemetry`)",
      "Admin performance analytics dashboard",
      "Automated alerting webhooks on SLA degradation"
    ],
    techStack: ["FastAPI Health", "Python Logging", "Core Web Vitals API", "MongoDB Stats", "Prometheus Metrics"]
  }
};

export const ABOUT_DATA = {
  "alliances": {
    slug: "alliances",
    category: "About us",
    title: "Alliances & Technology Ecosystem",
    tagline: "Collaborating with leading cloud, database, and open-source ecosystems.",
    badge: "ECOSYSTEM · STRATEGIC PARTNERSHIPS",
    overview: "Arisetek IT Solutions partners with industry-standard technology ecosystems to build and deploy robust, future-proof digital applications. We leverage verified developer tooling and cloud platforms to deliver unmatched velocity, security, and cost efficiency for our clients.",
    accent: "#00E5FF",
    stats: [
      { label: "Cloud Ecosystem", value: "AWS & GCP" },
      { label: "Database Tier", value: "MongoDB Atlas" },
      { label: "Edge Mesh", value: "Cloudflare" },
      { label: "Frontend Standard", value: "React & Flutter" }
    ],
    pillars: [
      {
        title: "Cloud & Edge Infrastructure Alliances",
        desc: "Building on Cloudflare's global edge network and AWS serverless primitives for maximum global uptime and sub-second CDN delivery."
      },
      {
        title: "Modern Database Ecosystem",
        desc: "Partnering with MongoDB Atlas and PostgreSQL managed instances to provide resilient, encrypted data persistence with automated backups."
      },
      {
        title: "Open Source Engineering Standards",
        desc: "Actively supporting and contributing to modern Python (FastAPI, Pydantic) and JavaScript/TypeScript (React, Vite, Tailwind CSS) open source tooling."
      },
      {
        title: "AI Foundation Models",
        desc: "Architecting model-agnostic pipelines integrating Gemini 2.5/Flash, Anthropic Claude, and OpenAI APIs with custom RAG vector stores."
      }
    ],
    highlights: [
      "Zero vendor lock-in with open-source foundation standards",
      "Production-verified integration blueprints for payment and cloud APIs",
      "Seamless interoperability across hybrid cloud environments"
    ]
  },

  "careers": {
    slug: "careers",
    category: "About us",
    title: "Careers & Opportunities at Arisetek",
    tagline: "Build the future of autonomous agentic AI, modern web architectures, and cinematic UI systems.",
    badge: "TALENT · JOIN THE SQUAD",
    overview: "At Arisetek, we value craftsmanship, deep technical curiosity, and extreme ownership. We are a fast-moving, remote-first team of engineers, designers, and AI creators who pride ourselves on building software that feels alive, fast, and remarkably intuitive.",
    accent: "#FF6B00",
    stats: [
      { label: "Work Model", value: "Remote-First" },
      { label: "Culture", value: "High Ownership" },
      { label: "Focus", value: "AI + Full-Stack" },
      { label: "Growth", value: "Continuous Learning" }
    ],
    pillars: [
      {
        title: "Agentic AI & LLM Systems Engineer",
        desc: "Architecting multi-agent coordination meshes, vector database RAG pipelines, and automated tool-calling workflows in Python and FastAPI."
      },
      {
        title: "Full-Stack Front-End Architect (React 19 & Three.js)",
        desc: "Crafting fluid, high-performance web applications with custom WebGL shaders, GSAP animations, and rock-solid state management."
      },
      {
        title: "Mobile Engineer (Flutter & Native Bridges)",
        desc: "Building cross-platform mobile apps for iOS and Android with 120 FPS motion physics and offline synchronization."
      },
      {
        title: "UI/UX Product Designer & Design Systems Lead",
        desc: "Designing cinematic design tokens, user journeys, responsive web wireframes, and interactive Figma prototypes."
      }
    ],
    highlights: [
      "Competitive compensation and project-based profit sharing",
      "Direct access to cutting-edge AI research and developer tooling",
      "Flexible, async-friendly working schedule and merit-based growth",
      "Send your portfolio to: contact@arisetek.in or founder@arisetek.in"
    ]
  },

  "contact": {
    slug: "contact",
    category: "About us",
    title: "Contact Us & Inbound Triage",
    tagline: "Start your digital transformation or schedule an executive architectural consultation.",
    badge: "GET IN TOUCH · INBOUND TRIAGE",
    overview: "Ready to launch an ambitious digital platform, modernize existing architecture, or deploy an autonomous AI swarm? Reach out directly to our engineering team for immediate requirement review and proposal turnaround.",
    accent: "#E0231C",
    stats: [
      { label: "Initial Response", value: "< 24 Hours" },
      { label: "Consultation Call", value: "30 Min Free" },
      { label: "Primary Inbound", value: "contact@arisetek.in" },
      { label: "Headquarters", value: "Kolkata / Howrah, IN" }
    ],
    pillars: [
      {
        title: "Executive Project Inquiry & Proposals",
        desc: "Submit your project requirements, scope estimates, and RFPs directly to sales@arisetek.in for technical scoping."
      },
      {
        title: "Direct Founder Consultation",
        desc: "Schedule a 30-minute discovery session with Founder Anaita Pal via founder@arisetek.in to explore software feasibility."
      },
      {
        title: "General Inquiries & Alliances",
        desc: "Connect with our team at info@arisetek.in to discuss technology partnerships and co-development opportunities."
      },
      {
        title: "Emergency Technical Support",
        desc: "Existing retainer clients receive 24/7 priority response via support@arisetek.in and dedicated Slack channels."
      }
    ],
    highlights: [
      "General Inbound: contact@arisetek.in",
      "Sales & Proposals: sales@arisetek.in",
      "Founder Direct: founder@arisetek.in",
      "Client Support: support@arisetek.in",
      "Invoicing & Billing: billing@arisetek.in",
      "Phone / WhatsApp: +91 7980958364",
      "Address: 49, Baidyanath Dutta Sarani, Howrah — 711113, West Bengal, India",
      "Interactive contact form available on homepage `#contact`"
    ]
  },

  "citizenship": {
    slug: "citizenship",
    category: "About us",
    title: "Corporate Citizenship & Ethical Governance",
    tagline: "Responsible AI development, student mentorship, and sustainable computing practices.",
    badge: "RESPONSIBILITY · ETHICAL GOVERNANCE",
    overview: "As creators of autonomous intelligence and digital infrastructure, Arisetek is committed to ethical technology stewardship. We believe software should elevate human capability, protect user privacy, promote campus safety, and maintain sustainable computing efficiency.",
    accent: "#00F3FF",
    stats: [
      { label: "Data Privacy", value: "Zero Unconsented Sharing" },
      { label: "Ethical AI", value: "Hallucination Guardrails" },
      { label: "Campus Safety", value: "Active Initiative" },
      { label: "Green Cloud", value: "Efficient Compute" }
    ],
    pillars: [
      {
        title: "Responsible & Guardrailed AI Engineering",
        desc: "Implementing strict content filtering, source citation requirements, and human-in-the-loop validation to prevent harmful or biased autonomous outputs."
      },
      {
        title: "Campus Respect & Student Empowerment",
        desc: "Supporting student initiatives and campuses free from coercion or harassment, creating opportunities for emerging engineers from all backgrounds."
      },
      {
        title: "Energy-Efficient Cloud Architecture",
        desc: "Designing lean code payloads, optimizing database queries, and leveraging edge compute to reduce unnecessary datacenter power consumption."
      },
      {
        title: "Open-Source Knowledge Sharing",
        desc: "Publishing architectural insights, performance best practices, and code scaffolding to help the global developer community."
      }
    ],
    highlights: [
      "100% adherence to digital privacy regulations and transparent data handling",
      "Ongoing mentorship programs for aspiring software and AI engineers",
      "Commitment to carbon-efficient serverless architectures"
    ]
  },

  "culture": {
    slug: "culture",
    category: "About us",
    title: "Kinship & Culture at Arisetek",
    tagline: "Where rigorous engineering discipline meets uncompromising visual craftsmanship.",
    badge: "CULTURE · THE SQUAD ETHOS",
    overview: "The culture at Arisetek is built around curiosity, mutual respect, and the relentless pursuit of craft. We believe great software is born at the intersection of deep technical logic and intuitive, human-centered design.",
    accent: "#FF00E5",
    stats: [
      { label: "Philosophy", value: "Craft + Intelligence" },
      { label: "Communication", value: "Async & Transparent" },
      { label: "Iteration Speed", value: "Rapid & Disciplined" },
      { label: "Standard", value: "Zero Shortcuts" }
    ],
    pillars: [
      {
        title: "Craftsmanship in Every Pixel & Function",
        desc: "We don't settle for 'good enough'. From micro-interaction physics to database index optimization, every detail is engineered with intention."
      },
      {
        title: "Radical Transparency & Psychological Safety",
        desc: "Open communication, honest feedback loops, and a blame-free post-mortem culture that treats challenges as opportunities to refine our systems."
      },
      {
        title: "Continuous Learning & Exploration",
        desc: "Dedicated time for experimenting with emerging AI models, 3D graphics algorithms, and modern framework architectures."
      },
      {
        title: "Client Partnership as Mutual Kinship",
        desc: "We treat client projects as our own products, providing transparent progress, honest advice, and steadfast commitment to business outcomes."
      }
    ],
    highlights: [
      "Small, high-caliber squads with zero middle-management bureaucracy",
      "Direct collaboration between designers and systems architects",
      "Celebration of shipping real, tangible business impact"
    ]
  },

  "locations": {
    slug: "locations",
    category: "About us",
    title: "Global Delivery & Engineering Hubs",
    tagline: "Headquartered in West Bengal, India with a worldwide client delivery reach.",
    badge: "FOOTPRINT · GLOBAL REACH",
    overview: "Arisetek IT Solutions operates a high-velocity engineering hub in Howrah / Kolkata, serving startups, founders, and enterprises across India, North America, Europe, and Southeast Asia. Our remote-first delivery model enables 24/7 execution cycles across time zones.",
    accent: "#FFA000",
    stats: [
      { label: "Headquarters", value: "Howrah / Kolkata, IN" },
      { label: "Client Footprint", value: "India, US, Global" },
      { label: "Delivery Model", value: "Remote-First" },
      { label: "Timezone Coverage", value: "IST / EST / PST / GMT" }
    ],
    pillars: [
      {
        title: "Primary Innovation Hub — Howrah / Kolkata",
        desc: "Located at 49, Baidyanath Dutta Sarani, Howrah — 711113. Core center for AI research, full-stack development, and architectural design."
      },
      {
        title: "Global Remote Delivery Matrix",
        desc: "Seamless collaboration with US and international founders through asynchronous Loom updates, GitHub Pull Requests, and structured sprints."
      },
      {
        title: "Multi-Currency Financial Compliance",
        desc: "Full support for localized billing in INR (₹) via GST-compliant invoicing and USD ($) via international Stripe wire transfers."
      },
      {
        title: "High-Availability Communication Rails",
        desc: "Dedicated client Slack channels, weekly video sprint reviews, and guaranteed SLA response windows."
      }
    ],
    highlights: [
      "Registered corporate entity: Arisetek IT Solutions Private Limited",
      "Secure global remote infrastructure with encrypted VPN access",
      "Fast onboarding for international project stakeholders"
    ]
  },

  "news": {
    slug: "news",
    category: "About us",
    title: "News, Releases & Technical Changelog",
    tagline: "Latest platform benchmarks, architectural breakthroughs, and company announcements.",
    badge: "CHANGELOG · TECHNICAL DISPATCHES",
    overview: "Stay up to date with the latest innovations from the Arisetek engineering lab. We regularly release technical changelogs, benchmark reports, case study breakdowns, and open-source updates.",
    accent: "#7C5CFF",
    stats: [
      { label: "Latest Platform", value: "Arisetek OS v2.4" },
      { label: "Core Upgrade", value: "React 19 & Python 3.14" },
      { label: "Security Level", value: "2FA TOTP Verified" },
      { label: "CMS Engine", value: "Live Dynamic" }
    ],
    pillars: [
      {
        title: "Arisetek Unified Platform v2.4 Release",
        desc: "Launched unified dual-mode platform integrating the Arisetek Corporate Mesh with the Founder Sanctuary portfolio in a single ultra-lean bundle."
      },
      {
        title: "Live Typography & Kinetic Shimmer Engine",
        desc: "Implemented GPU-accelerated gradient sweep animations, cyber scramble text decryption, and ambient glowing typography."
      },
      {
        title: "Two-Factor TOTP & Rate-Limiting Security Rollout",
        desc: "Hardened admin authentication with RFC 6238 TOTP validation, emergency one-time recovery codes, and brute-force lockout counters."
      },
      {
        title: "Autonomous Department Swarm Benchmark",
        desc: "Demonstrated 2.4-second end-to-end component synthesis and automated Docker deployment across 5 specialized agent nodes."
      }
    ],
    highlights: [
      "All release updates are continuously deployed to production",
      "Automated test coverage passing with 100% success rate",
      "Subscribe to technical announcements via info@arisetek.in"
    ]
  },

  "trust": {
    slug: "trust",
    category: "About us",
    title: "Trust, SLA & Security Center",
    tagline: "Transparent service level commitments, data privacy standards, and uptime verification.",
    badge: "TRUST · 99.9% UPTIME COMMITMENT",
    overview: "Trust is earned through transparency, rock-solid uptime, and uncompromising security standards. Arisetek provides formal Service Level Agreements (SLAs), transparent health metrics, and robust data protection for every deployment.",
    accent: "#00E5FF",
    stats: [
      { label: "Uptime SLA", value: "99.9%" },
      { label: "Data Encryption", value: "AES-256 / TLS 1.3" },
      { label: "Incident Response", value: "< 1 Hour" },
      { label: "Compliance", value: "GDPR & DPDP Ready" }
    ],
    pillars: [
      {
        title: "99.9% Production Availability Guarantee",
        desc: "Contractually backed uptime SLAs with automated multi-region failover and real-time health telemetry monitoring."
      },
      {
        title: "Zero-Trust Architecture & Least Privilege",
        desc: "Granular role-based access control, cryptographic session management, and automated revocation of compromised credentials."
      },
      {
        title: "Data Sovereignty & Compliance",
        desc: "Full alignment with global privacy frameworks (GDPR, India DPDP Act). Zero unauthorized selling, sharing, or tracking of user data."
      },
      {
        title: "Automated Backup & Disaster Recovery",
        desc: "Continuous encrypted database snapshots, automated point-in-time recovery, and verified disaster recovery playbooks."
      }
    ],
    highlights: [
      "Public real-time health telemetry available at `/api/health`",
      "Formal Non-Disclosure Agreements (NDAs) signed prior to discovery",
      "Clean source code ownership transferred 100% to client upon delivery"
    ]
  },

  "values": {
    slug: "values",
    category: "About us",
    title: "Our Core Values & Operating Principles",
    tagline: "The foundational beliefs that guide our engineering, design, and client partnerships.",
    badge: "ETHOS · GUIDING PRINCIPLES",
    overview: "Every decision at Arisetek—from how we structure a database schema to how we communicate project progress—is guided by a set of core operational values designed to deliver lasting value.",
    accent: "#FF6B00",
    stats: [
      { label: "Principle 1", value: "Craftsmanship" },
      { label: "Principle 2", value: "Extreme Ownership" },
      { label: "Principle 3", value: "Speed with Rigor" },
      { label: "Principle 4", value: "Human Intelligence" }
    ],
    pillars: [
      {
        title: "1. Craftsmanship Over Mediocrity",
        desc: "We take immense pride in the details. Fast page loads, elegant typography, clean code comments, and robust error handling are our baseline."
      },
      {
        title: "2. Extreme Ownership & Accountability",
        desc: "We own outcomes, not just tasks. When we commit to a milestone, we deliver on time and proactively address roadblocks."
      },
      {
        title: "3. Speed with Architectural Rigor",
        desc: "We move fast without cutting corners. Automated testing, CI/CD pipelines, and modular code allow us to ship rapidly without breaking things."
      },
      {
        title: "4. Empowering Human Intelligence with AI",
        desc: "AI is a force multiplier for human creativity and strategic thinking. We build autonomous systems that amplify human potential, not replace it."
      }
    ],
    highlights: [
      "Code written for maintainability and long-term business growth",
      "Transparent fixed-pricing and milestone accountability",
      "A founder-led culture that treats every project with personal care"
    ]
  }
};

export const LEGAL_DATA = {
  "privacy": {
    slug: "privacy",
    title: "Privacy Policy",
    lastUpdated: "August 30, 2026",
    sections: [
      {
        heading: "1. Introduction & Scope",
        content: "Arisetek IT Solutions Private Limited ('Arisetek', 'we', 'our', or 'us') respects your privacy. This Privacy Policy describes how we collect, use, and protect your personal information when you visit our unified corporate website, interact with our AI agents, or use our digital services."
      },
      {
        heading: "2. Information We Collect",
        content: "We collect only information necessary to deliver our services. This includes:\n• Contact details provided voluntarily via contact or consultation forms (name, email, phone number, company name, project budget).\n• Technical telemetry (IP address, browser type, device characteristics, pages visited, and interaction timestamps) collected via privacy-first analytics to maintain platform security and performance.\n• Communication records when you correspond with our team."
      },
      {
        heading: "3. How We Use Information",
        content: "Your information is used strictly to:\n• Respond to inbound project inquiries and schedule consultation calls.\n• Generate and deliver tailored project proposals, invoices, and contracts.\n• Maintain platform security, prevent brute-force attacks, and monitor system health.\n• Improve website performance, accessibility, and user experience."
      },
      {
        heading: "4. No Sale or Unauthorized Sharing of Personal Data",
        content: "We do not sell, rent, or trade your personal data to third parties for advertising or marketing. We only share information with trusted infrastructure providers (e.g. MongoDB Atlas for encrypted storage, Cloudflare for edge routing, Stripe/Razorpay for billing) under strict data processing agreements."
      },
      {
        heading: "5. Data Security & Retention",
        content: "All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Access to administrative systems is protected by Two-Factor Authentication (TOTP) and rate limiting. We retain contact data only as long as necessary to fulfill business engagements or comply with statutory requirements."
      },
      {
        heading: "6. Your Data Rights & Contact",
        content: "Under applicable data protection laws (including GDPR and the India Digital Personal Data Protection Act), you have the right to request access to, correction of, or deletion of your personal information. To exercise these rights, contact our Data Privacy & Compliance Desk at admin@arisetek.in or contact@arisetek.in."
      }
    ]
  },

  "terms": {
    slug: "terms",
    title: "Terms of Service",
    lastUpdated: "August 30, 2026",
    sections: [
      {
        heading: "1. Acceptance of Terms",
        content: "By accessing and using the Arisetek IT Solutions website and associated platforms, you agree to comply with and be bound by these Terms of Service. If you do not agree with these terms, please do not use our services."
      },
      {
        heading: "2. Professional Services & Statements of Work",
        content: "All custom software development, AI engineering, and consulting services provided by Arisetek are governed by individualized Statements of Work (SOW) or Service Level Agreements (SLA) agreed upon between Arisetek and the client. Project milestones, deliverables, timelines, and payment terms specified in an executed SOW supersede general website descriptions."
      },
      {
        heading: "3. Intellectual Property Rights",
        content: "Upon full settlement of agreed project fees, all bespoke source code, application assets, and deliverables created specifically for the client transfer 100% to the client. Arisetek retains rights to its pre-existing proprietary frameworks, reusable utility libraries, and generalized architectural patterns."
      },
      {
        heading: "4. Acceptable Use Policy",
        content: "You agree not to use our website or services to:\n• Conduct unauthorized vulnerability scanning, penetration testing, or denial-of-service attacks.\n• Interfere with server operation, brute-force admin authentication, or compromise user sessions.\n• Upload malicious code, scrapers, or automated bots that degrade platform availability for other users."
      },
      {
        heading: "5. Limitation of Liability & Warranty",
        content: "Arisetek provides its website and informational content 'as is'. While we strive for 100% accuracy and 99.9% uptime, we do not warrant that uninterrupted service is guaranteed. In no event shall Arisetek be liable for indirect, punitive, or consequential damages arising from website use."
      },
      {
        heading: "6. Governing Law & Jurisdiction",
        content: "These Terms of Service shall be governed by and construed in accordance with the laws of the State of West Bengal, India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in Kolkata/Howrah, India."
      }
    ]
  },

  "security": {
    slug: "security",
    title: "Security Statement & Policy",
    lastUpdated: "August 30, 2026",
    sections: [
      {
        heading: "1. Security Architecture Overview",
        content: "Arisetek IT Solutions enforces a zero-trust, defense-in-depth security paradigm across all infrastructure layers. From client-side authentication to backend database storage, every request is authenticated, sanitized, and monitored."
      },
      {
        heading: "2. Multi-Factor Authentication & Cryptography",
        content: "• Administrative access requires Time-Based One-Time Password (TOTP) 2FA (RFC 6238 compliant).\n• Passwords are encrypted using Bcrypt adaptive hashing (Work Factor 12).\n• Stateless authentication tokens use HMAC-SHA256 JWT signatures with short expiration windows and automated revocation on credential update.\n• Emergency single-use recovery codes are cryptographically hashed before storage."
      },
      {
        heading: "3. Network & Transport Security",
        content: "• All network traffic is strictly enforced over TLS 1.3 with HSTS (HTTP Strict Transport Security) headers.\n• Edge firewalls and Cloudflare proxies filter DDoS attempts, SQL injections, and malicious bot traffic.\n• Adaptive sliding-window rate limiters automatically throttle rapid authentication failures and abuse."
      },
      {
        heading: "4. Database & Storage Protection",
        content: "• MongoDB Atlas clusters are hosted in VPC-isolated networks with IP access whitelisting.\n• Sensitive fields are encrypted at rest with AES-256.\n• Automated point-in-time recovery and continuous encrypted snapshots ensure zero data loss."
      },
      {
        heading: "5. Responsible Vulnerability Disclosure",
        content: "If you discover a potential security vulnerability in our platform, please report it immediately to support@arisetek.in or admin@arisetek.in. We commit to acknowledging receipt within 24 hours, evaluating the issue promptly, and providing regular updates until resolution."
      }
    ]
  },

  "certifications": {
    slug: "certifications",
    title: "Accreditations & Verified Credentials",
    lastUpdated: "August 30, 2026",
    sections: [
      {
        heading: "1. Professional Accreditations",
        content: "Arisetek IT Solutions and Founder Anaita Pal maintain verified professional accreditations and technical certifications across cloud computing, AI, and software engineering."
      },
      {
        heading: "2. Cloud & Architecture Credentials",
        content: "• AWS Academy Graduate — Cloud Foundations (AWS Academy, Credly Verified).\n• Proven expertise in scalable cloud topology design, IAM access controls, containerization, and distributed computing models."
      },
      {
        heading: "3. UI/UX & Interaction Design Accreditations",
        content: "• UI / UX Design Professional Certification (Great Learning Academy).\n• Advanced Frontend Development with React (National Institute for Industrial Training).\n• System-level mastery of responsive typography, visual hierarchy, micro-interaction physics, and user experience workflows."
      },
      {
        heading: "4. Academic Foundation & Technical Degrees",
        content: "• Bachelor of Technology (B.Tech) in Computer Science & Engineering — Adamas University.\n• Diploma in Computer Science & Technology (CST) — Kingston Polytechnic College.\n• Master of Business Administration (MBA) in Information Technology — Manipal University Jaipur."
      }
    ]
  },

  "sitemap": {
    slug: "sitemap",
    title: "Platform Sitemap & Index",
    lastUpdated: "August 30, 2026",
    sections: [
      {
        heading: "1. Main Corporate Platform",
        content: "• Homepage & Core Mesh: `/#home`\n• Autonomous Department Swarm: `/#swarm`\n• Capabilities & Services: `/#services`\n• Industry Architecture: `/#industries`\n• Interactive AI Demos: `/#experience`\n• Selected Work: `/#portfolio`\n• Technology Wall: `/#tech`\n• Founder & Leadership: `/#founder`\n• Investment Packages & Pricing: `/#pricing`\n• Contact & Inbound: `/#contact`"
      },
      {
        heading: "2. Dedicated Service Solutions",
        content: "• Applications & React 19: `/services/applications`\n• Cloud & Edge Mesh: `/services/cloud-infrastructure`\n• System Modernization: `/services/modernization`\n• Cyber Resilience: `/services/security-compliance`\n• AI & Data Systems: `/services/ai-data-systems`\n• Digital Workplace: `/services/digital-workplace`\n• Autonomous Swarm: `/services/autonomous-swarm`\n• Consulting & Advisory: `/services/consulting`\n• Arisetek Bridge: `/services/bridge`\n• Arisetek Vital Telemetry: `/services/vital`"
      },
      {
        heading: "3. Company & Leadership Pages",
        content: "• Alliances & Partners: `/about/alliances`\n• Careers & Opportunities: `/about/careers`\n• Contact & Inbound Triage: `/about/contact`\n• Corporate Citizenship: `/about/citizenship`\n• Kinship & Culture: `/about/culture`\n• Founder Sanctuary Portfolio: `/portfolio`\n• Global Locations & Hubs: `/about/locations`\n• News & Changelog: `/about/news`\n• Trust, SLA & Security: `/about/trust`\n• Core Values: `/about/values`"
      },
      {
        heading: "4. Legal & Compliance Directory",
        content: "• Privacy Policy: `/legal/privacy`\n• Terms of Service: `/legal/terms`\n• Security Statement: `/legal/security`\n• Accreditations: `/legal/certifications`\n• Data Rights: `/legal/data-privacy`\n• Accessibility Statement: `/legal/accessibility`"
      }
    ]
  },

  "data-privacy": {
    slug: "data-privacy",
    title: "Do Not Sell or Share My Information",
    lastUpdated: "August 30, 2026",
    sections: [
      {
        heading: "1. Our Data Privacy Commitment",
        content: "Arisetek IT Solutions strictly respects your fundamental right to data privacy. We do not sell, rent, license, or share your personal information with third parties, data brokers, or advertising networks for financial gain or commercial profiling."
      },
      {
        heading: "2. Scope of Data Processing",
        content: "When you interact with our platform, we only process data strictly necessary to:\n• Deliver the requested technical services, proposals, or consultations.\n• Verify identity and prevent unauthorized access to administrative systems.\n• Comply with statutory tax and accounting requirements."
      },
      {
        heading: "3. Exercising Your Opt-Out & Deletion Rights",
        content: "You have the permanent right to request that Arisetek delete, correct, or export any personal information held about you. To submit a data privacy request, contact our privacy officer directly at admin@arisetek.in or contact@arisetek.in."
      }
    ]
  },

  "accessibility": {
    slug: "accessibility",
    title: "Accessibility Statement (WCAG 2.1)",
    lastUpdated: "August 30, 2026",
    sections: [
      {
        heading: "1. Commitment to Digital Accessibility",
        content: "Arisetek IT Solutions is committed to ensuring digital accessibility for people with disabilities. We continuously enhance our digital user experience by applying the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards across all web and mobile platforms."
      },
      {
        heading: "2. Accessible Design & Technical Measures",
        content: "• Semantic HTML5 markup with descriptive landmarks (header, main, nav, section, footer).\n• High-contrast color palettes meeting WCAG contrast ratio requirements in both dark and light modes.\n• Full keyboard navigability with visible focus indicators across all interactive links, buttons, and form inputs.\n• ARIA labels and roles for dynamic dialogs, tabs, and status badges.\n• Motion sensitivity consideration with support for prefers-reduced-motion media queries."
      },
      {
        heading: "3. Feedback & Accessibility Contact",
        content: "We welcome your feedback on the accessibility of the Arisetek platform. If you encounter accessibility barriers, please contact our team at support@arisetek.in or contact@arisetek.in so we can resolve the issue promptly."
      }
    ]
  }
};
