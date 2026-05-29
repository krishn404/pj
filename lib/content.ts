/**
 * Site copy — sourced from content.md
 * Update content.md first, then mirror changes here.
 */

export const site = {
  name: "Priyanka Joshi",
  title: "Video Editor & Visual Artist",
  tagline: "Video editor & visual artist",
  location: "Jalandhar, Punjab",
  locationShort: "Jalandhar, PB",
  availability: "Remote · Open to relocation",
  email: "priiyankaajoshii@gmail.com",
  phone: "+91 62831-31811",
  phoneDisplay: "+91 62831-31811",
  instagram: {
    handle: "@priyankaa.comm",
    url: "https://instagram.com/priyankaa.comm",
  },
} as const

export const hero = {
  introLabel: "hey, my name is",
  nameLine1: "PRIYANKA",
  nameLine2: "JOSHI",
  currentRole: "Freelance Video Editor",
  previousRole: "Previously at Tharun Speaks",
  roleBadge: "Video Editor",
  availabilityLine: "Available for thoughtful projects",
  tagline:
    "I craft outstanding visual stories as a video editor & visual artist.",
  contactCta: "Contact Me",
} as const

export const about = {
  cornerLabel: "about me!",
  whatsUpLabel: "what's up",
  paragraphs: [
    "I've worked in marketing, handled client briefs, and been part of campaigns from start to finish.",
    "And somewhere in every role, I'd find myself back in the timeline, nudging a cut by two frames because something wasn't quite landing yet.",
    "That's just where I feel most like myself.",
    "I've been on the client side too, so I know how to take a brief, ask the right questions, and actually deliver what was meant, not just what was said.",
  ],
  polaroidLeftCaption: "2026",
  polaroidRightCaption: "my workspace",
} as const

export const showreel = {
  label: "Featured",
  title: "SHOWREEL",
  period: "2024 — Present",
  placeholderCta: "Click to play",
  caption:
    "A collection of all the work I've done up until now — brand content, creative edits, and visual storytelling.",
  reelTag: "2024 Reel",
} as const

export const experimental = {
  label: "Playground",
  title: "TOUCHDESIGNER",
  description:
    "Currently exploring TouchDesigner — building audio-reactive and visual-reactive motion work. Early days, but it's where things are heading.",
  videoPlaceholders: ["Experiment 01", "Experiment 02"],
  footerNote: "More experiments coming soon",
} as const

export const services = {
  label: "Services",
  title: "WHAT I DO",
  intro:
    "Every project is retention-first — hook, pace, payoff. Full ownership from brief to delivery.",
  items: [
    {
      number: "01",
      title: "Short-Form & Reels",
      description:
        "For brands and creators who need content for Instagram, YouTube Shorts, or similar.",
      tags: ["Instagram", "YouTube Shorts", "Reels"],
      color: "var(--gold)",
    },
    {
      number: "02",
      title: "Long-Form & YouTube",
      description: "For creators who need full video edits.",
      tags: ["YouTube", "Long-form", "Storytelling"],
      color: "var(--mint)",
    },
    {
      number: "03",
      title: "Brand & Campaign Content",
      description:
        "For businesses. Ads, product videos, explainers. This is where my marketing background comes in — I understand what the content needs to do, not just look like.",
      tags: ["Ads", "Product Videos", "Explainers"],
      color: "var(--pink)",
    },
    {
      number: "04",
      title: "Creative & Artistic Edits",
      description:
        "Passion projects, motion graphics. For clients who want something that looks and feels like actual craft.",
      tags: ["Motion Graphics", "Creative", "Craft"],
      color: "var(--cream)",
    },
  ],
} as const

export const experience = {
  label: "Timeline",
  title: "JOURNEY",
  companiesTitle: "Companies I've Worked With",
  items: [
    {
      period: "Jan 2026 — Present",
      role: "Freelance Video Editor",
      company: "Remote",
      description:
        "Working independently with brands and creators. Every project is retention-first — hook, pace, payoff. Full ownership from brief to delivery.",
      color: "var(--gold)",
    },
    {
      period: "Nov 2025 — Jan 2026",
      role: "Video Editing Mentor",
      company: "Tharun Speaks, Bangalore",
      description:
        "Mentored 200+ students in Adobe Premiere Pro. Teaching made me a sharper editor — explaining why a cut works forces you to actually understand it.",
      color: "var(--mint)",
    },
    {
      period: "May — Aug 2025",
      role: "Strategic Partnerships & Innovations Executive",
      company: "Ellement Co., Mumbai",
      description:
        "End-to-end content for a Mumbai brand — Reels, product ads, influencer coordination, campaign execution, e-commerce content. Creative brain and business brain, working at the same time.",
      color: "var(--pink)",
    },
    {
      period: "Feb — May 2025",
      role: "Digital Marketing & Content Associate",
      company: "Napstack, Jalandhar",
      description:
        "Short-form content, social creatives, content calendars. Built the discipline for consistent, on-brand output under real deadlines.",
      color: "var(--cream)",
    },
    {
      period: "Jan — Mar 2024",
      role: "Junior Video Editing Intern",
      company: "Vibrantick",
      description:
        "Where it started. Pacing, transitions, storytelling fundamentals — the things that still shape every edit I make today.",
      color: "var(--cyan)",
    },
  ],
  companyLogos: ["Vibrantick", "Ellement Co.", "Tharun Speaks", "Napstack"],
} as const

export const skills = {
  label: "Capabilities",
  title: "SKILLS",
  categories: [
    {
      title: "Editing & Post-Production",
      skills: [
        "Adobe Premiere Pro",
        "After Effects",
        "CapCut",
        "Color Grading",
        "Motion Graphics",
        "Short-form Editing",
        "Storytelling",
        "Pacing",
      ],
      color: "var(--gold)",
    },
    {
      title: "Design & Visuals",
      skills: ["Adobe Illustrator", "Adobe Fresco", "Canva"],
      color: "var(--mint)",
    },
    {
      title: "Marketing & Strategy",
      skills: [
        "Social Media Management",
        "Content Strategy",
        "Client Communication",
        "E-commerce Content",
        "Basic SEO",
        "Content Planning",
      ],
      color: "var(--pink)",
    },
    {
      title: "Tools",
      skills: ["Notion", "Trello", "Slack"],
      color: "var(--cream)",
    },
  ],
} as const

export const contact = {
  connectLabel: "let's connect",
  heading: "Got a project? Let's make it unforgettable.",
  availabilityNote: "I'm available for new projects!",
  links: [
    {
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
    },
    {
      label: "Phone",
      value: site.phoneDisplay,
      href: `tel:+916283131811`,
    },
    {
      label: "Instagram",
      value: site.instagram.handle,
      href: site.instagram.url,
      external: true,
    },
  ],
  footer: {
    copyright: (year: number) => `© ${year} ${site.name}. All rights reserved.`,
    location: `Based in ${site.location}`,
    remote: site.availability,
  },
} as const
