// Test IDs for the 3D portfolio.

export const NAV = {
  root: 'nav-root',
  logo: 'nav-logo',
  linkHome: 'nav-link-home',
  linkAbout: 'nav-link-about',
  linkProjects: 'nav-link-projects',
  linkExperience: 'nav-link-experience',
  linkContact: 'nav-link-contact',
  menuToggle: 'nav-menu-toggle',
  resumeBtn: 'nav-resume-btn',
};

export const HERO = {
  root: 'hero-root',
  title: 'hero-title',
  scrollCue: 'hero-scroll-cue',
  ctaProjects: 'hero-cta-projects',
  ctaContact: 'hero-cta-contact',
  ctaResume: 'hero-cta-resume',
};

export const ABOUT = {
  root: 'about-root',
  bio: 'about-bio',
  statEducation: 'about-stat-education',
  statExperience: 'about-stat-experience',
  statLanguages: 'about-stat-languages',
};

export const SKILLS = {
  root: 'skills-root',
  item: (name) => `skills-item-${name}`,
  card: (name) => `skills-item-${name}`,
};

export const PROJECTS = {
  root: 'projects-root',
  card: (i) => `project-card-${i}`,
  title: (i) => `project-title-${i}`,
  cardLink: (slug) => `project-card-link-${slug}`,
  viewCaseStudy: (slug) => `project-card-link-${slug}`,
  marquee: 'projects-marquee',
};

export const EXPERIENCE = {
  root: 'experience-root',
  item: (i) => `experience-item-${i}`,
  filter: (key) => `experience-filter-${key}`,
  filterAll: 'experience-filter-all',
  filterDesignDev: 'experience-filter-design',
  filterRiskQa: 'experience-filter-risk',
  count: 'experience-count',
};

export const TESTIMONIALS = {
  root: 'testimonials-root',
  item: (i) => `testimonial-${i}`,
  card: (i) => `testimonial-${i}`,
  prev: 'testimonials-prev',
  next: 'testimonials-next',
  prevBtn: 'testimonials-prev',
  nextBtn: 'testimonials-next',
};

export const CONTACT = {
  root: 'contact-root',
  form: 'contact-form',
  name: 'contact-input-name',
  email: 'contact-input-email',
  message: 'contact-input-message',
  submit: 'contact-submit',
  nameInput: 'contact-input-name',
  emailInput: 'contact-input-email',
  msgInput: 'contact-input-message',
  submitBtn: 'contact-submit',
  toast: 'contact-toast',
  emailLink: 'contact-email-link',
  phoneLink: 'contact-phone-link',
  linkedinLink: 'contact-linkedin-link',
  ctaResume: 'contact-cta-resume',
  resumeBtn: 'contact-cta-resume',
};

export const CURSOR = {
  root: 'custom-cursor',
};

export const PRELOADER = {
  root: 'preloader-root',
  progress: 'preloader-progress',
};

export const CERTIFICATIONS = {
  root: 'certifications-root',
  item: (i) => `certification-${i}`,
  card: (i) => `certification-${i}`,
  link: (i) => `certification-link-${i}`,
};

export const CASESTUDY = {
  root: 'casestudy-root',
  title: 'casestudy-title',
  backLink: 'casestudy-back',
  nextLink: 'casestudy-next',
  section: (name) => `casestudy-section-${name}`,
};

export const HIRE = {
  fab: 'hire-fab',
  panel: 'hire-panel',
  close: 'hire-panel-close',
  card: (i) => `hire-card-${i}`,
  tier: (i) => `hire-tier-${i}`,
  tierPrice: (i) => `hire-tier-price-${i}`,
  submit: 'hire-submit',
  name: 'hire-input-name',
  inputName: 'hire-input-name',
  email: 'hire-input-email',
  inputEmail: 'hire-input-email',
  budget: 'hire-input-budget',
  budgetPill: (b) => `hire-budget-${b}`,
  message: 'hire-input-message',
  inputMsg: 'hire-input-message',
};

export const SHARE = {
  fab: 'share-fab',
  panel: 'share-panel',
  copy: 'share-copy',
  twitter: 'share-twitter',
  linkedin: 'share-linkedin',
  whatsapp: 'share-whatsapp',
  email: 'share-email',
};
