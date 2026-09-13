const photo = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=85`;
const shared = { whatsapp: "919876543210", mapQuery: "Kolkata, India" };

export const sites = [
  {
    ...shared,
    slug: "restaurant-demo",
    name: "Spice Route Restaurant",
    type: "Restaurant",
    icon: "✦",
    brand: "#b54d2d",
    accent: "#f6e4c8",
    ink: "#251a15",
    tagline: "Indian kitchen · Kolkata",
    hero: "A journey through India, served one plate at a time.",
    description: "Warm hospitality, bold spices, and recipes that travel from the coast to the mountains.",
    cta: "Reserve a table",
    stat: "4.9 / 5",
    statLabel: "from 1,200+ happy diners",
    photoCaption: "Slow-cooked. Soulful. Unforgettable.",
    aboutTitle: "Rooted in tradition. Made for today.",
    about: "Spice Route is a neighbourhood table with a big appetite for India’s most memorable flavours. We cook with patience, seasonal ingredients, and a little bit of theatre.",
    miniStats: [["12", "regional kitchens"], ["8 yrs", "of good company"], ["100%", "made from scratch"]],
    services: [
      { title: "À la carte", text: "Comforting classics and spirited new favourites, all day long." },
      { title: "Private dining", text: "Celebrate the big moments around a table made just for you." },
      { title: "Catering", text: "Bring the Spice Route experience to your next gathering." }
    ],
    images: [
      photo("photo-1517248135467-4c7edcad34c4"),
      photo("photo-1515003197210-e0cd71810b5f"),
      photo("photo-1547592180-85f173990554"),
      photo("photo-1569058242253-92a9c755a0ec")
    ],
    galleryLabels: ["Dinner, unhurried", "Fresh from the tandoor", "A table worth gathering around"],
    testimonial: {
      quote: "The sort of meal you keep talking about on the drive home.",
      initials: "RS",
      name: "Rhea Sen",
      role: "Regular guest"
    },
    faq: [
      ["Do I need a reservation?", "Walk-ins are always welcome, though reservations are encouraged for evenings and weekends."],
      ["Do you have vegetarian options?", "Absolutely. A generous part of our menu is vegetarian, with vegan dishes available too."],
      ["Can you host group events?", "Yes — our private dining room seats up to 28 guests."]
    ],
    contactTitle: "Your table is waiting.",
    address: "18 Park Street, Kolkata 700016",
    hours: "Open daily · 12 pm – 11 pm",
    phone: "+91 98765 43210",
    email: "hello@spiceroute.in",
    formPlaceholder: "Tell us about your reservation or event…"
  },
  {
    ...shared,
    slug: "gym-demo",
    name: "Titan Fitness Club",
    type: "Fitness",
    icon: "◒",
    brand: "#de5c2c",
    accent: "#f7d8bf",
    ink: "#181a1b",
    tagline: "Strength · energy · community",
    hero: "Show up for yourself. We’ll handle the rest.",
    description: "A modern training club built around expert coaching, focused workouts, and real community.",
    cta: "Book a trial",
    stat: "1,850+",
    statLabel: "members getting stronger",
    photoCaption: "Your strongest chapter starts here.",
    aboutTitle: "Built for every version of strong.",
    about: "Whether you’re touching a barbell for the first time or chasing a new personal best, Titan is the room where effort becomes confidence.",
    miniStats: [["42", "weekly classes"], ["14", "expert coaches"], ["5 am", "doors open"]],
    services: [
      { title: "Strength training", text: "Small-group coaching that makes every rep count." },
      { title: "HIIT & conditioning", text: "High-energy sessions designed to move your whole body." },
      { title: "Personal coaching", text: "A focused plan, built around your goals and schedule." }
    ],
    images: [
      photo("photo-1534438327276-14e5300c3a48"),
      photo("photo-1571019613454-1cb2f99b2d8b"),
      photo("photo-1581009146145-b5ef050c2e1e"),
      photo("photo-1517963879433-6ad2b056d712")
    ],
    galleryLabels: ["Lift with purpose", "Find your pace", "Stronger together"],
    testimonial: {
      quote: "Titan made training feel like the best hour of my day.",
      initials: "AK",
      name: "Aarav Kapoor",
      role: "Member since 2021"
    },
    faq: [
      ["Is the first trial free?", "Yes. Come in for a complimentary session and meet the team."],
      ["Do you have beginner-friendly classes?", "Every class can be scaled. Our coaches are here to guide you."],
      ["What should I bring?", "Comfortable clothing, trainers, water, and a willingness to try."]
    ],
    contactTitle: "Your first session is on us.",
    address: "42 Ballygunge Circular Road, Kolkata 700019",
    hours: "Mon–Sat · 5 am – 10 pm",
    phone: "+91 98765 43210",
    email: "hello@titanfitness.in",
    formPlaceholder: "What are you hoping to achieve?"
  },
  {
    ...shared,
    slug: "clinic-demo",
    name: "CarePlus Clinic",
    type: "Healthcare",
    icon: "✚",
    brand: "#147f83",
    accent: "#d6f0ee",
    ink: "#132a30",
    tagline: "Thoughtful care, close to home",
    hero: "Healthcare that listens, cares, and stays with you.",
    description: "A warm, modern clinic bringing trusted family medicine and specialist care under one roof.",
    cta: "Book appointment",
    stat: "18,000+",
    statLabel: "patients cared for",
    photoCaption: "Care that feels personal.",
    aboutTitle: "Your wellbeing is our everyday work.",
    about: "CarePlus brings skilled physicians, clear communication, and genuinely kind support together — so every visit feels a little easier.",
    miniStats: [["25+", "care specialists"], ["7 days", "a week"], ["4.9/5", "patient rating"]],
    services: [
      { title: "Family medicine", text: "Everyday care for every age, from prevention to recovery." },
      { title: "Specialist care", text: "Trusted expertise across cardiology, dermatology, and more." },
      { title: "Health checks", text: "Simple, thorough screenings that keep you informed." }
    ],
    images: [
      photo("photo-1576091160399-112ba8d25d1d"),
      photo("photo-1579684385127-1ef15d508118"),
      photo("photo-1584982751601-97dcc096659c"),
      photo("photo-1551076805-e1869033e561")
    ],
    galleryLabels: ["A calm welcome", "Expert hands", "Care, made clear"],
    testimonial: {
      quote: "Everyone took the time to explain — I never felt rushed.",
      initials: "PM",
      name: "Priya Mukherjee",
      role: "CarePlus patient"
    },
    faq: [
      ["Do I need an appointment?", "Appointments are recommended, and same-day slots are often available."],
      ["Do you accept insurance?", "We work with major insurance providers. Call us to confirm your plan."],
      ["Are lab tests available?", "Yes, with convenient on-site sample collection."]
    ],
    contactTitle: "Let’s take care of this, together.",
    address: "7A Loudon Street, Kolkata 700017",
    hours: "Mon–Sun · 8 am – 8 pm",
    phone: "+91 98765 43210",
    email: "care@careplusclinic.in",
    formPlaceholder: "How can our care team help you?"
  },
  {
    ...shared,
    slug: "salon-demo",
    name: "Glow & Grace Salon",
    type: "Beauty",
    icon: "✿",
    brand: "#ae466b",
    accent: "#f7dfe7",
    ink: "#30151e",
    tagline: "A little time, beautifully yours",
    hero: "Come as you are. Leave feeling like yourself, amplified.",
    description: "A relaxed beauty studio for precise cuts, luminous colour, restorative treatments, and unhurried self-care.",
    cta: "Book your glow",
    stat: "10 yrs",
    statLabel: "of beautiful transformations",
    photoCaption: "Your glow, your way.",
    aboutTitle: "Beauty, with a softer touch.",
    about: "Glow & Grace is a studio where technique meets intuition. We listen closely, use beautiful products, and make space for you to simply unwind.",
    miniStats: [["18", "signature services"], ["6", "master stylists"], ["4.9/5", "guest rating"]],
    services: [
      { title: "Cut & styling", text: "Shape, movement, and a finish that feels effortless." },
      { title: "Colour studio", text: "Dimensional colour tailored to your skin tone and lifestyle." },
      { title: "Skin & spa", text: "Targeted rituals for a rested, luminous complexion." }
    ],
    images: [
      photo("photo-1562322140-8baeececf3df"),
      photo("photo-1522337360788-8b13dee7a37e"),
      photo("photo-1560066984-138dadb4c035"),
      photo("photo-1487412912498-0447578fcca8")
    ],
    galleryLabels: ["Made to shine", "The colour bar", "A pause for you"],
    testimonial: {
      quote: "They understood exactly what I wanted before I found the words.",
      initials: "NB",
      name: "Naina Bose",
      role: "Glow & Grace guest"
    },
    faq: [
      ["Should I book a consultation?", "A complimentary consultation is ideal for colour transformations and extensions."],
      ["Which products do you use?", "We use carefully selected professional products, including clean and cruelty-free options."],
      ["Can I bring a friend?", "Of course — our lounge is yours to enjoy."]
    ],
    contactTitle: "Ready for your next good hair day?",
    address: "9A Camac Street, Kolkata 700017",
    hours: "Tue–Sun · 10 am – 8 pm",
    phone: "+91 98765 43210",
    email: "hello@glowandgrace.in",
    formPlaceholder: "Which service are you interested in?"
  },
  {
    ...shared,
    slug: "realestate-demo",
    name: "Horizon Properties",
    type: "Real Estate",
    icon: "⌂",
    brand: "#315a78",
    accent: "#dbeaf2",
    ink: "#172a36",
    tagline: "Kolkata real estate, considered",
    hero: "Find a place that feels like the future.",
    description: "Thoughtful property advice for people looking to buy, sell, lease, or invest with confidence.",
    cta: "Talk to an advisor",
    stat: "₹850 Cr+",
    statLabel: "in property value managed",
    photoCaption: "A clearer view of what’s next.",
    aboutTitle: "Property decisions, made personal.",
    about: "Horizon blends local intelligence with a refreshingly human approach. We ask better questions, show better options, and stay useful long after the keys are handed over.",
    miniStats: [["18 yrs", "local expertise"], ["600+", "happy homeowners"], ["96%", "referral business"]],
    services: [
      { title: "Buy with confidence", text: "Find a home that meets today’s needs and tomorrow’s plans." },
      { title: "Sell smarter", text: "Strategic marketing and precise pricing for standout outcomes." },
      { title: "Invest wisely", text: "Clear-eyed guidance for building a resilient property portfolio." }
    ],
    images: [
      photo("photo-1600585154340-be6161a56a0c"),
      photo("photo-1600607687939-ce8a6c25118c"),
      photo("photo-1600566753190-17f0baa2a6c3"),
      photo("photo-1600585154526-990dced4db0d")
    ],
    galleryLabels: ["Space to exhale", "Details, considered", "The view from home"],
    testimonial: {
      quote: "Horizon made a complex decision feel surprisingly calm.",
      initials: "RD",
      name: "Rohit Dutta",
      role: "Homeowner, Alipore"
    },
    faq: [
      ["Which areas do you cover?", "We focus on Kolkata and its most sought-after neighbourhoods."],
      ["How do you value a property?", "Our valuations combine current data, property detail, and true local knowledge."],
      ["Can you help first-time buyers?", "Yes. We love guiding first-time buyers through every step."]
    ],
    contactTitle: "Let’s talk about your next move.",
    address: "21A Shakespeare Sarani, Kolkata 700017",
    hours: "Mon–Sat · 9 am – 7 pm",
    phone: "+91 98765 43210",
    email: "hello@horizonproperties.in",
    formPlaceholder: "Tell us what you’re looking for…"
  },
  {
    ...shared,
    slug: "coaching-demo",
    name: "Bright Future Academy",
    type: "Education",
    icon: "◈",
    brand: "#5e4ba9",
    accent: "#e5e0fa",
    ink: "#211d3d",
    tagline: "Learn with purpose",
    hero: "Big dreams deserve a brilliant foundation.",
    description: "Supportive, high-impact coaching that helps ambitious students learn deeply and achieve confidently.",
    cta: "Enrol today",
    stat: "96%",
    statLabel: "students improve their scores",
    photoCaption: "Learn today. Lead tomorrow.",
    aboutTitle: "More confidence in every chapter.",
    about: "Bright Future Academy is where curious learners become capable, self-assured achievers. We pair expert teaching with small groups and a lot of encouragement.",
    miniStats: [["12 yrs", "of teaching"], ["30", "students per batch"], ["98%", "parent approval"]],
    services: [
      { title: "Academic coaching", text: "Clear concepts and consistent support for grades 6 to 12." },
      { title: "Exam preparation", text: "Focused strategies for board, entrance, and competitive exams." },
      { title: "Mentoring", text: "Practical guidance for goals, habits, and academic direction." }
    ],
    images: [
      photo("photo-1523240795612-9a054b0db644"),
      photo("photo-1523580846011-d3a5bc25702b"),
      photo("photo-1509062522246-3755977927d7"),
      photo("photo-1503676260728-1c00da094a0b")
    ],
    galleryLabels: ["Better together", "Questions welcome", "The joy of progress"],
    testimonial: {
      quote: "My daughter stopped being afraid of maths — that changed everything.",
      initials: "SM",
      name: "Sonal Mehta",
      role: "Parent"
    },
    faq: [
      ["Which classes do you offer?", "We support students from grade 6 through grade 12 across core subjects."],
      ["Can my child attend a trial class?", "Yes, we offer a complimentary assessment and trial session."],
      ["How big are the batches?", "We keep batches intentionally small for individual attention."]
    ],
    contactTitle: "Let’s build a brighter next step.",
    address: "33 Sarat Bose Road, Kolkata 700020",
    hours: "Mon–Sat · 9 am – 7 pm",
    phone: "+91 98765 43210",
    email: "learn@brightfuture.in",
    formPlaceholder: "Tell us about your child and learning goals…"
  }
];
