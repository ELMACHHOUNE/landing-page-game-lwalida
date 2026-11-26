export const siteConfig = {
  name: "L’Walida",
  arabicName: "الوالدة",
  tagline: "Every street holds a memory.",
  description:
    "L’Walida is an emotional narrative adventure set in Rabat’s historic medina, created by PROJET_29 for Game Jam VGC. Explore the places, voices, and memories that made a mother’s world.",
  shortDescription:
    "A Moroccan narrative adventure by PROJET_29, inspired by Rabat’s historic medina.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://landing-page-game-lwalida.vercel.app",
  locale: "en_US",
  language: "en",
  author: "PROJET_29",
  location: "Rabat, Morocco",
  year: 2026,
  ogImage: "/og-image.jpg",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: "L’Walida — an open book above the illustrated rooftops of Rabat at dusk",
  links: {
    github: "https://github.com/ELMACHHOUNE/landing-page-game-lwalida",
  },
  keywords: [
    "L’Walida",
    "LWalida",
    "الوالدة",
    "Moroccan narrative adventure",
    "narrative adventure game",
    "Rabat medina game",
    "Rabat Morocco",
    "Game Jam VGC",
    "PROJET_29",
    "Moroccan indie game",
    "2D narrative adventure",
    "story-driven game",
    "Moroccan culture game",
    "memory and identity game",
  ],
} as const

export type TeamMember = readonly [name: string, role: string, work: string]

export const team: TeamMember[] = [
  ["Montassir BENTAHAR", "Graphic Designer", "Environment illustrations · Character artwork"],
  ["Mohamed EL MACHHOUNE", "UX/UI & Graphic Designer", "Visual identity · Logo · Game interfaces"],
  ["Saad abdoulmoulah", "Writer & Producer", "Screenwriting · Production coordination"],
  ["Salma MAHDAR", "Game Designer", "Game mechanics · Level design"],
  ["Nouhaila MAADI", "Sound Effects Designer", "Environmental soundscapes · Foley"],
  ["OUFFATA Fatima Ezzahrae", "Music Designer", "Original soundtrack · Musical identity"],
  ["EL-HILALY Yahya", "Game Narrative", "Interactive storytelling · Dialogue"],
  ["EL RHALLOUCH Mohamed Amine", "Game Developer", "Unity development · Gameplay"],
]
