import {
  Bell,
  CalendarDays,
  FolderOpen,
  User,
  Wifi,
  WifiOff,
} from "lucide-react";
import type { ElementType } from "react";

export type Feature =
  | string
  | { title: string; subtitle?: string; icon?: ElementType };

export type Project = {
  slug: string;
  imageSource: string | string[];
  title: string;
  /** SEO-optimized <title> (~50–60 chars, keyword-first, descriptive). Falls back to `title` if unset. */
  seoTitle?: string;
  description: string;
  /** SEO meta description (70–155 chars). Falls back to `description` if unset. */
  seoDescription?: string;
  features: Feature[];
  technologies: string[];
  invertOrder: boolean;
  phone: boolean;
  buttonText: string | null;
  buttonURL: string | null;
  icon?: ElementType | null;
  appStoreURL?: string | null;
  playStoreURL?: string | null;
};

export const projects: Project[] = [
  {
    slug: "plan-pm",
    imageSource: [
      "/plan_pm/1.webp",
      "/plan_pm/3.webp",
      "/plan_pm/4.webp",
      "/plan_pm/5.webp",
      "/plan_pm/6.webp",
    ],
    title: "Plan PM",
    seoTitle: "Plan PM — Student Timetable App",
    seoDescription:
      "Mobile app for Politechnika Morska students: live class timetables, lecture reminders, and coursework tracking — with full offline access.",
    description:
      "An intuitive mobile app designed for students of Politechnika Morska to efficiently manage their academic schedules. Plan PM provides real-time access to class timetables, personalized notifications for upcoming lectures, and tools to organize coursework.",
    features: [
      {
        title: "Class Schedule Viewer",
        subtitle: "Live timetables synced to your faculty",
        icon: CalendarDays,
      },
      {
        title: "Personalized Notifications",
        subtitle: "Smart reminders before every lecture",
        icon: Bell,
      },
      {
        title: "Coursework Organizer",
        subtitle: "Track assignments and deadlines",
        icon: FolderOpen,
      },
      {
        title: "Real-Time Updates",
        subtitle: "Room changes reflected instantly",
        icon: Wifi,
      },
      {
        title: "User Profiles",
        subtitle: "Per-student customization",
        icon: User,
      },
      {
        title: "Offline Access",
        subtitle: "Full schedule available without internet",
        icon: WifiOff,
      },
    ],
    technologies: ["Flutter", "Supabase", "Python", "Selenium"],
    invertOrder: false,
    phone: true,
    buttonText: "Github",
    buttonURL: "https://github.com/KNI-PM-Szczecin/plan_pm",
    appStoreURL: "https://apps.apple.com/pl/app/plan-pm/id6736966745",
    playStoreURL:
      "https://play.google.com/store/apps/details?id=com.knipm.plan_pm",
  },
  {
    slug: "until-done",
    imageSource: [
      "/until_done/1.webp",
      "/until_done/2.webp",
      "/until_done/3.webp",
      "/until_done/4.webp",
      "/until_done/5.webp",
    ],
    title: "Until Done",
    seoTitle: "Until Done — Anti-Procrastination Task App",
    seoDescription:
      "An anti-procrastination task manager that escalates notifications until you finish. No snooze, no dismiss — offline-first, in 6 languages.",
    description:
      "Until Done is an anti-procrastination task manager built for people who can't stop swiping away reminders. It doesn't ask nicely — it escalates. Miss a deadline and the app fires notifications with increasing frequency until you open it and check the task off. No snooze. No dismiss. No excuses.",
    features: [
      "No Snooze — Complete or Nothing",
      "Escalating Notification Spam",
      "Offline-First with SQLite",
      "Background Escalation Engine",
      "Grouped Timeline UI",
      "6 Languages Supported",
    ],
    technologies: [
      "Flutter",
      "SQLite",
      "flutter_local_notifications",
      "RxDart",
      "background_fetch",
    ],
    invertOrder: true,
    phone: true,
    buttonText: null,
    buttonURL: null,
    appStoreURL: "https://apps.apple.com/us/app/until-done/id6752790841",
    playStoreURL:
      "https://play.google.com/store/apps/details?id=com.piotrwittig.untildone",
  },
  {
    slug: "your-path",
    imageSource: [
      "/your_path/1.webp",
      "/your_path/2.webp",
      "/your_path/3.webp",
      "/your_path/4.webp",
    ],
    title: "Your Path",
    seoTitle: "Your Path — Immigrant Guidance Platform",
    seoDescription:
      "A free guidance platform helping young immigrants in Germany navigate education, careers, and language via clear step-by-step pathways.",
    description:
      "Your Path is a guidance platform for young immigrants navigating life in Germany. Built for Ukrainian refugees and others unfamiliar with the German system, it breaks down complex decisions — education, career, language learning — into clear, personalized step-by-step pathways. A non-commercial project by Piotr Wittig and Stephan Wittig.",
    features: [
      "Pathfinder Quiz (Decision Tree)",
      "Browsable Pathways Guide",
      "Curated External Resources",
      "4 Languages (EN, DE, UK, RU)",
      "Fully Localized Content",
      "No Account Required",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "DaisyUI",
      "Framer Motion",
      "next-intl",
    ],
    invertOrder: false,
    phone: false,
    buttonText: "Visit lifepath-zeta.vercel.app",
    buttonURL: "https://lifepath-zeta.vercel.app/en",
  },
  {
    slug: "kanarradar",
    imageSource: "/kanar_radar.webp",
    title: "KanarRadar",
    seoTitle: "KanarRadar — Ticket Inspection Alerts App",
    seoDescription:
      "Mobile app that warns public-transport riders about ticket inspections in real time, with a live control feed and an interactive map.",
    description:
      "A mobile app designed to help public transport users avoid fines by offering real-time alerts about ticket inspections. It provides tools like a control feed, map with inspection locations, and account settings for a seamless and worry-free travel experience.",
    features: [
      "Fine Avoidance",
      "User Accounts",
      "Interactive Map",
      "Real Time Feed",
      "Push Notifications",
      "Offline Mode",
    ],
    technologies: ["Flask", "Firebase", "OpenStreetMaps", "Flutter"],
    invertOrder: true,
    phone: true,
    buttonText: null,
    buttonURL: null,
  },
  {
    slug: "juan-note",
    imageSource: "/juan_note.webp",
    title: "Juan Note",
    seoTitle: "Juan Note — Collaborative Note-Taking App",
    seoDescription:
      "A clutter-free, real-time collaborative note app: share, edit, and organize notes together with tags, folders, and cross-platform sync.",
    description:
      "Juan Note is a user-friendly note-taking app designed to eliminate the clutter and bloatware found in traditional apps. Its primary focus is seamless collaboration, allowing users to easily share, edit, and organize notes together in real time without distractions.",
    features: [
      "Real-Time Collaboration",
      "Minimalist, Intuitive Interface",
      "Instant Sharing and Permissions",
      "No Bloatware or Unnecessary Features",
      "Organize Notes with Tags and Folders",
      "Cross-Platform Sync",
    ],
    technologies: ["Next.js", "Firebase", "Tailwind"],
    invertOrder: false,
    phone: false,
    buttonText: null,
    buttonURL: null,
  },
  {
    slug: "invest-me",
    imageSource: "/invest_me.webp",
    title: "Invest Me",
    seoTitle: "Invest Me — Crypto Market Tracker",
    seoDescription:
      "Track the crypto market with real-time prices, interactive charts, and analytics to support smarter, better-informed investment decisions.",
    description:
      "Invest Me is a comprehensive platform for tracking and analyzing the cryptocurrency market. It provides real-time price updates, interactive charts, and detailed analytics for a wide range of crypto coins, empowering users to make informed investment decisions.",
    features: [
      "Live Crypto Price Tracking",
      "Interactive Price Charts",
      "Historical Data Analysis",
      "Multi-Coin Support",
      "Customizable Watchlists",
      "Responsive Design",
    ],
    technologies: ["Flask", "Pandas", "yahooFinance", "HTML/CSS/JavaScript"],
    invertOrder: true,
    phone: false,
    buttonText: "Github",
    buttonURL: "https://github.com/grzjan5219/InvestMe",
  },
  {
    slug: "sortra",
    imageSource: "/sortra.webp",
    title: "Sortra",
    seoTitle: "Sortra — Cross-Platform File Organizer",
    seoDescription:
      "A cross-platform desktop app that sorts and organizes files via drag-and-drop and custom rules. Fully offline and completely private.",
    description:
      "Sortra is a modern, cross-platform file organizer that lets you quickly sort and categorize files using a clean and intuitive interface. Whether you're organizing documents, media, or downloads, Sortra simplifies the process with drag-and-drop functionality and customizable sorting rules.",
    features: [
      "Drag-and-Drop File Sorting",
      "Smart Grouping by Extension or File Type",
      "Real-Time UI Updates",
      "Cross-Platform Support (Windows, macOS, Linux)",
      "Fully Offline & Private",
      "Clean and Responsive Interface",
    ],
    technologies: ["Tauri", "React", "TypeScript", "Tailwind CSS", "DaisyUI"],
    invertOrder: false,
    phone: false,
    buttonText: "View on sortra.tech",
    buttonURL: "https://www.sortra.tech/",
    icon: FolderOpen,
  },
  {
    slug: "smart-doorbell",
    imageSource: "/doorbell.webp",
    title: "Smart doorbell",
    seoTitle: "Smart Doorbell — ESP32-CAM IoT Project",
    seoDescription:
      "An ESP32-CAM smart doorbell that snaps a photo and sends it to Discord on button press, using deep sleep for maximum power efficiency.",
    description:
      "This is a smart doorbell built upon the ESP32-CAM module, which instantly captures a photo and sends it as a notification to a Discord server when the button is pressed. The device is optimized for maximum power efficiency using deep sleep mode while also providing immediate, hardware-level feedback through light and sound.",
    features: [
      "Visual and audio feedback",
      "ESP32 Deep sleep feature",
      "Discord integration",
      "Sleek and modular design",
    ],
    technologies: ["ESP32-CAM", "Discord", "Arduino IDE", "C++ Embedded"],
    invertOrder: true,
    phone: false,
    buttonText: "Github",
    buttonURL: "https://github.com/Schoji/esp32cam-doorbell",
  },
];
