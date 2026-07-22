import { CalendarDays, FolderOpen, User, Users, WifiOff } from "lucide-react";
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
  /** Short punchy one-liner shown under the title on the detail page hero. */
  tagline?: string;
  /** Year the project was built/released (e.g. "2025"). */
  year?: string;
  /** Narrative "The Story" / Backstory shown on the detail page. */
  story?: string;
  /** Who built it (e.g. "Solo" or "Team of 4 — lead & core developer"). */
  role?: string;
  /** Current status (e.g. "Live on the App Store & Google Play"). */
  status?: string;
  /** Optional image (in /public) used as the detail-page hero background. */
  heroBackground?: string;
  /** Downloadable binaries per OS — rendered as a download CTA on the detail page. */
  downloads?: { os: string; url: string }[];
  /** Optional donation link (e.g. PayPal) shown alongside the downloads. */
  donateURL?: string;
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
      "Personalized, offline class timetables for Politechnika Morska students and lecturers — skip the slow, impersonal university portal.",
    tagline: "The Politechnika Morska timetable — personalized, offline, and finally fast.",
    year: "2025",
    status: "Live on the App Store & Google Play",
    role: "Team of 4 — lead & core developer",
    description:
      "An intuitive mobile app for students and lecturers at Politechnika Morska. Instead of fighting a slow, impersonal university portal, Plan PM serves a personalized timetable that's saved on your device and fully available offline.",
    story:
      "Every semester meant the same ritual: open the university's scheduling portal, wait forever for anything to load, and re-enter the exact same details a first-time visitor would — zero personalization, every single time. And whenever the university server buckled, the site simply wouldn't load at all. So we built our own scraper for the schedule data, pushed it into Supabase, and served it through a personalized mobile app that remembers your plan, stores it on-device, and works fully offline. It caught on fast — around 1,000 downloads across iOS and Android, and thank-yous from both students and the university board.",
    features: [
      {
        title: "Class Schedule Viewer",
        subtitle: "Live timetables synced to your faculty",
        icon: CalendarDays,
      },
      {
        title: "Built for Students & Lecturers",
        subtitle: "Lecturers get a schedule tailored to them too",
        icon: Users,
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
    tagline: "Free, offline reminders that escalate until the task is actually done.",
    year: "2025",
    status: "Live on the App Store · Android in progress",
    role: "Solo project",
    heroBackground: "/until_done/background.webp",
    description:
      "Until Done is an anti-procrastination task manager built for people who can't stop swiping away reminders. It doesn't ask nicely — it escalates. Miss a deadline and the app fires notifications with increasing frequency until you open it and check the task off. No snooze. No dismiss. No excuses.",
    story:
      "I kept making tasks in different apps and then forgetting the apps even existed. What I needed was something that would nag me — reminders that wouldn't let a task quietly slip away. Paid apps did this, so I decided to build my own: fully free and fully offline. The first version leaned on a backend that acted as a notification manager, which was a bit silly — lose your connection and you'd lose your reminders. It only existed because iOS and Android cap how many notifications you can queue at once. So I replaced it with my own notification-queue engine, the feature I'm proudest of: reminders keep coming, thinning out over time but never really stopping, and every time you open the app the whole queue refreshes — so a single task can keep pinging you for a week. It's a solo project, currently live on the App Store; Google Play rejected it, so Android is still a work in progress.",
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
    // Google Play rejected the submission — Android not yet available.
    playStoreURL: null,
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
    tagline: "Clear, step-by-step guidance for young immigrants finding their footing in Germany.",
    year: "2026",
    status: "Live · non-commercial",
    role: "Sole developer — with Stephan Wittig on content & domain guidance",
    description:
      "Your Path is a guidance platform for young immigrants navigating life in Germany. Built for Ukrainian refugees and others unfamiliar with the German system, it breaks down complex decisions — education, career, language learning — into clear, personalized step-by-step pathways. A non-commercial project by Piotr Wittig and Stephan Wittig.",
    story:
      "Your Path began as a university project for my father: he needed something that demonstrated real, practical help for Ukrainian refugees, and the platform grew out of that goal. A few other people helped shape what the pathways themselves should look like, but at its core it was the two of us — my dad bringing the domain knowledge and substance, and me building the entire platform end to end. The hope is simple: that the site genuinely helps people find their footing in a system that's hard to navigate from the outside.",
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
    tagline: "Real-time warnings about ticket inspections for Szczecin transit riders.",
    year: "2024",
    status: "Abandoned — no longer maintained",
    role: "Built with a friend",
    story:
      "KanarRadar was the first app a friend and I set out to actually ship to the App Store, and my first serious project built on Firebase. The idea was local and practical: warn people in Szczecin about ticket inspections before they ran into one. We learned a lot getting it working, but it eventually got shelved — and honestly, I'm not sure we'll ever come back to it.",
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
    tagline: "Collaborative notes without OneNote's sync headaches.",
    year: "2025",
    status: "Abandoned — never finished",
    role: "Solo project",
    story:
      "Juan Note came straight out of my frustration with OneNote — its syncing was miserable and real-time collaboration constantly ended in conflicts. I wanted something similar but done right, so I started building my own clean, conflict-free take on collaborative notes. I got it moving, but eventually set it aside and never came back to finish it.",
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
    tagline: "A Python web app for crypto prices — interactive charts, tables, and buy/sell hints.",
    year: "2022",
    status: "Completed — GL training project",
    role: "Group project — built during a GL training program",
    story:
      "Invest Me was a group project built during a GL training program. The brief: a Python web app that pulls live and historical cryptocurrency prices from an open API and presents them as interactive charts and tables — then analyses the trends to hint at when to buy or sell. As a team we settled the key choices along the way: Yahoo Finance (via yfinance) for the data after testing several crypto APIs, Flask over Django for a lighter, easier stack, and Plotly for the charts because it was the one library that stayed genuinely interactive on hover.",
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
    technologies: ["Flask", "yfinance", "Pandas", "Plotly"],
    invertOrder: true,
    phone: false,
    buttonText: "Github",
    buttonURL: "https://github.com/grzjan5219/InvestMe",
  },
  {
    slug: "sortra",
    imageSource: [
      "/sortra/1.webp",
      "/sortra/2.webp",
      "/sortra/3.webp",
      "/sortra/4.webp",
      "/sortra/5.webp",
    ],
    title: "Sortra",
    seoTitle: "Sortra — Cross-Platform File Organizer",
    seoDescription:
      "A cross-platform desktop app that sorts and organizes files via drag-and-drop and custom rules. Fully offline and completely private.",
    tagline: "Sort any folder by file type — free, offline, and cross-platform.",
    year: "2025",
    status: "Free & open source · Windows, macOS, Linux",
    role: "Solo — with UI help from one contributor",
    description:
      "Sortra is a modern, cross-platform file organizer that lets you quickly sort and categorize files using a clean and intuitive interface. Whether you're organizing documents, media, or downloads, Sortra simplifies the process with drag-and-drop functionality and customizable sorting rules.",
    story:
      "Sortra is something I'd wanted to build forever — I just needed an app that could sort files by their extension without any fuss. So I made it: a clean, cross-platform desktop tool that groups and organizes any folder by file type. I wrote it solo, with one person lending a hand on the UI through a few commits. It's completely free and open source, and since the old sortra.tech domain has expired, the downloads now live right here.",
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
    buttonText: "Github",
    buttonURL: "https://github.com/Schoji/Sortra",
    icon: FolderOpen,
    downloads: [
      {
        os: "Windows",
        url: "https://github.com/Schoji/juan-note/releases/download/Release/Sortra.exe",
      },
      {
        os: "macOS",
        url: "https://github.com/Schoji/juan-note/releases/download/Release/Sortra_1.0.0_aarch64.dmg",
      },
      {
        os: "Linux",
        url: "https://github.com/Schoji/juan-note/releases/download/Release/Sortra_1.0.0_amd64.AppImage",
      },
    ],
    donateURL: "https://www.paypal.com/donate/?hosted_button_id=NS5B4E326KRYE",
  },
  {
    slug: "smart-doorbell",
    imageSource: "/doorbell.webp",
    title: "Smart doorbell",
    seoTitle: "Smart Doorbell — ESP32-CAM IoT Project",
    seoDescription:
      "An ESP32-CAM smart doorbell that snaps a photo and sends it to Discord on button press, using deep sleep for maximum power efficiency.",
    tagline: "A battery-powered ESP32-CAM doorbell that photographs visitors straight to Discord.",
    year: "2025",
    status: "Completed — personal hardware build",
    role: "Solo project",
    description:
      "This is a smart doorbell built upon the ESP32-CAM module, which instantly captures a photo and sends it as a notification to a Discord server when the button is pressed. The device is optimized for maximum power efficiency using deep sleep mode while also providing immediate, hardware-level feedback through light and sound.",
    story:
      "A battery-powered smart doorbell built around an ESP32-CAM. Press the button and the hardware instantly fires the LEDs and buzzer — no waiting for the chip to wake — while the ESP32 boots, connects to Wi-Fi, snaps a photo of whoever's at the door, and pushes it to a Discord channel via webhook before dropping back into deep sleep. The interesting part was the electronics around it: a transistor acting as an electronic relay so the tiny touch signal can safely switch the high-current LEDs, a resistor divider that scales the 4.2V battery down to safe ADC levels so the firmware can estimate remaining charge, and a hinged battery compartment so swapping the 18650 cell doesn't mean tearing the whole thing apart. Deep sleep keeps it going for a long time between presses.",
    features: [
      "Instant hardware feedback — LEDs & buzzer fire without waking the CPU",
      "Deep-sleep power optimization",
      "Photos pushed to Discord over Wi-Fi",
      "Battery level monitoring via voltage divider",
      "Tool-free 18650 swap (hinged compartment)",
    ],
    technologies: ["ESP32-CAM", "Discord", "Arduino IDE", "C++ Embedded"],
    invertOrder: true,
    phone: false,
    buttonText: "Github",
    buttonURL: "https://github.com/Schoji/esp32cam-doorbell",
  },
];
