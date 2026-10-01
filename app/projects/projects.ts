import {
  Accessibility,
  ArrowLeftRight,
  AudioLines,
  Bluetooth,
  Bug,
  CalendarDays,
  ClipboardCheck,
  Cpu,
  Disc3,
  FileCode,
  Flag,
  Flashlight,
  FolderOpen,
  Heart,
  History,
  KeyRound,
  Landmark,
  Languages,
  Layers,
  LayoutGrid,
  Mic,
  Milestone,
  Newspaper,
  Palette,
  QrCode,
  Rotate3d,
  Route,
  Server,
  Settings,
  Shield,
  ShieldCheck,
  ShoppingCart,
  Shuffle,
  Smile,
  Sparkles,
  SunMoon,
  Swords,
  Timer,
  Trophy,
  User,
  Users,
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
  /** What went wrong — shown as "Problems along the way" on the detail page. */
  problems?: string[];
  /** Lessons learned — shown as "Takeaways" on the detail page. */
  takeaways?: string[];
  /** Optional YouTube demo embedded on the detail page. `vertical` for Shorts (9:16). */
  video?: { youtubeId: string; vertical?: boolean };
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
      "Warns public transport users in Szczecin about ticket inspections before they walk into one. A live feed of reported sightings, a map of where they were reported, and accounts so a report from one rider reaches the rest.",
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
      "A note-taking app built around collaboration that does not end in sync conflicts. Two people can edit the same note at the same time, share it with per-person permissions, and organise notes without fighting a sync queue.",
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
      "Tracks live and historical cryptocurrency prices and plots them as interactive charts and tables. Pulls its data from Yahoo Finance, then analyses the trend to mark possible buy and sell points.",
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
      "A battery-powered smart doorbell built around an ESP32-CAM. Press the button and the hardware fires the LEDs and buzzer immediately, without waiting for the chip to wake, while the ESP32 boots, connects to Wi-Fi, snaps a photo of whoever's at the door, and pushes it to a Discord channel via webhook before dropping back into deep sleep. The interesting part was the electronics around it: a transistor acting as an electronic relay so the tiny touch signal can safely switch the high-current LEDs, a resistor divider that scales the 4.2V battery down to safe ADC levels so the firmware can estimate remaining charge, and a hinged battery compartment so swapping the 18650 cell doesn't mean tearing the whole thing apart. Deep sleep keeps it going for a long time between presses.",
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
  {
    slug: "linuxinder",
    imageSource: ["/linuxinder/1.webp", "/linuxinder/2.webp", "/linuxinder/3.webp"],
    title: "Linder",
    seoTitle: "Linder — Tinder, but for Linux Distributions",
    seoDescription:
      "A satirical dating-app parody: swipe through 83 Linux distro profiles with in-character bios and tags, then match with a red flag revealed only afterward.",
    tagline: "Tinder, but for Linux distributions — 83 dating profiles, one red flag per match.",
    year: "2026",
    status: "Live · open source",
    role: "Solo project",
    description:
      "Linder is a satirical dating-app parody: swipe through a deck of 83 Linux distributions, each with a desktop screenshot, a tagline written in its own voice, a short bio, and personality tags. Like enough of them and you get a match — plus two runner-ups and a verdict on your taste, and a red flag your new distro only admits to once you're already committed.",
    story:
      "Linder started as a joke that wouldn't leave me alone: what if every Linux distro had a dating profile? So I built one for 83 of them, pulling base data from DistroWatch with a small scraper and rewriting each into its own voice, bio, and self-deprecating red flag. Swiping runs through a small scoring algorithm that tallies which tags you keep liking, so the eventual match reflects the taste you reveal one swipe at a time. It's a solo project, and it's traveled further than I expected — a post on r/DistroHopping, a share on LinkedIn, and a small but genuine trickle of GitHub stars.",
    features: [
      {
        title: "83 Distro Dating Profiles",
        subtitle: "Screenshot, in-character bio, and tags for each",
        icon: Users,
      },
      {
        title: "Swipe-to-Match Deck",
        subtitle: "Tinder-style drag gestures, built with Motion",
        icon: Heart,
      },
      {
        title: "Preference-Weighted Matching",
        subtitle: "Scores your match from every tag you liked",
        icon: Shuffle,
      },
      {
        title: "Red Flag Reveal",
        subtitle: "Every distro's dealbreaker, shown only after you match",
        icon: Flag,
      },
      {
        title: "Runner-Ups & Verdict",
        subtitle: "Two runner-up matches and a judgmental read on your taste",
        icon: Trophy,
      },
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion", "Vitest"],
    invertOrder: false,
    phone: false,
    buttonText: "Visit linuxinder.vercel.app",
    buttonURL: "https://linuxinder.vercel.app",
  },
  {
    slug: "aleksy-v2",
    imageSource: [
      "/aleksy_v2/1.webp",
      "/aleksy_v2/2.webp",
      "/aleksy_v2/3.webp",
      "/aleksy_v2/4.webp",
      "/aleksy_v2/5.webp",
    ],
    title: "A.L.E.K.S.Y v2",
    seoTitle: "A.L.E.K.S.Y v2 — Polish Voice Assistant on Raspberry Pi",
    seoDescription:
      "A Polish voice assistant on a Raspberry Pi 5 with an OLED face. It answers in a cloned voice, with speech and language models on a Mac mini.",
    tagline: "A Polish voice assistant that answers in the cloned voice of a real friend.",
    year: "2026",
    status: "Completed — built for a university event",
    role: "Solo project — case reprint by Scarlet",
    description:
      "A Polish-speaking voice assistant for the KNI science club stand at the Maritime University of Szczecin. Say \"Aleksy\", ask a question, and it answers out loud in the cloned voice of the real Aleksy. A Raspberry Pi 5 handles the wake word, audio and an OLED face, and a Mac mini runs the speech and language models over the network.",
    story:
      "The first version ran fully offline on an NVIDIA Jetson Xavier NX. It took 20 to 30 seconds to answer, the local model could barely hold a conversation, and the homemade amplifier picked up noise from the board. For v2 I split the work in two: the Pi only does what has to happen in the room, and everything heavy runs on a Mac mini M2 over a WebSocket. I had about a week before the university's adaptation days, so most of it was a race: an OLED that showed a single column until I swapped the power supply, an Audio HAT that took the whole GPIO header, and a 3D-printed case that went through several iterations before it fit. At the event the AI was fine. What failed was the room: the speakers were too quiet for a hall full of stands, and there was no internet. After I got home I added a Bluetooth speaker option and a fallback Wi-Fi hotspot, so the next venue cannot break it the same way.",
    features: [
      {
        title: "Cloned Voice",
        subtitle: "Answers in the voice of the real Aleksy (OmniVoice)",
        icon: AudioLines,
      },
      {
        title: "Wake Word & Filler Words",
        subtitle: "Says \"chwileczkę\" right away to cover the wait",
        icon: Mic,
      },
      {
        title: "OLED Face",
        subtitle: "Six states: idle, listening, thinking, talking, asleep, error",
        icon: Smile,
      },
      {
        title: "Own Wi-Fi Hotspot",
        subtitle: "Pick a network from the panel when no known one is around",
        icon: Wifi,
      },
      {
        title: "Bluetooth Speaker",
        subtitle: "Selected from the built-in web panel",
        icon: Bluetooth,
      },
    ],
    technologies: [
      "Python",
      "Raspberry Pi 5",
      "MLX",
      "Qwen3-ASR",
      "OpenAI API",
      "OmniVoice",
      "WebSockets",
      "Flask",
      "Jenkins",
    ],
    invertOrder: true,
    phone: false,
    buttonText: "Github",
    buttonURL: "https://github.com/Schoji/voice-assistant-v2",
    problems: [
      "The OLED showed a single column. It was not the display or the wiring but the power supply. With the official 27 W supply it worked on the first try.",
      "The Audio HAT takes the whole GPIO header, so the OLED had to share the I2C bus with the audio codec, and the standoffs between the boards had to go.",
      "The case took several iterations. The first did not fit the display or the speakers, the first full print was on bad filament with painful supports, and the M3 holes were too small.",
      "The Mac mini M2 is slow next to my M5 Pro laptop. To keep answers under a few seconds, TTS runs at 16 diffusion steps instead of 32 and answers are capped at 300 characters.",
      "Speaking sentence by sentence made it worse. It started sooner, but synthesis barely kept up with playback, so there were pauses. The whole answer is now synthesized at once.",
      "At the event the speakers were too quiet for a hall full of stands, and with no internet it could not reach the server at all.",
    ],
    takeaways: [
      "Splitting the device from the compute was the right call. The Pi stays cheap, small and cool, and the models can change without touching the hardware.",
      "Latency matters more than answer quality. A short filler word right after you stop talking does more for how it feels than a better model.",
      "A demo device has to work in the worst room, not on the desk at home. Volume and connectivity failed at the event, not the AI.",
      "Power problems look like software problems. Rule out the power supply first.",
      "Measure on the target hardware early, and give 3D-printed holes some slack: 3.5 mm for M3 screws, not 3.2 mm.",
    ],
  },
  {
    slug: "aleksy-v1",
    imageSource: [
      "/aleksy_v1/1.webp",
      "/aleksy_v1/2.webp",
      "/aleksy_v1/3.webp",
      "/aleksy_v1/4.webp",
    ],
    title: "A.L.E.K.S.Y v1",
    seoTitle: "A.L.E.K.S.Y v1 — Offline Polish Voice Assistant on Jetson",
    seoDescription:
      "A fully offline Polish voice assistant on an NVIDIA Jetson Xavier NX: wake word, Whisper, the Bielik LLM and Piper TTS, all running on-device.",
    tagline: "A fully offline Polish voice assistant. No cloud, no API keys, nothing leaves the device.",
    year: "2026",
    status: "Completed — university course project, succeeded by v2",
    role: "Team of 4 on paper — hardware, case and most of the code by me",
    description:
      "A Polish voice assistant where every stage runs on the device: wake word, speech recognition, the language model and speech synthesis. It runs on an NVIDIA Jetson Xavier NX inside an orange 3D-printed case with built-in speakers, powered from a USB-C power bank.",
    story:
      "A.L.E.K.S.Y started in a computer security course. The assignment was to design a secure system on paper, but I thought it was meant to be real, so we started building one. The idea was a voice assistant with a strong privacy guarantee: if nothing is ever sent anywhere, there is nothing to intercept. A Raspberry Pi 5 with an AI HAT was not enough, so we moved to an NVIDIA Jetson Xavier NX borrowed from the university. The name came from our friend Aleksy, because Amazon Alexa sounded like him. A teammate set up the first wake word code, and from there the build was mostly mine. The Jetson quickly turned out to be the weakest part of the whole build. It worked, we got top marks, and I happily gave the Jetson back. What went wrong is below, and it is the reason v2 moved the heavy work to a server.",
    features: [
      {
        title: "Fully Offline",
        subtitle: "Wake word, STT, LLM and TTS all run on the Jetson",
        icon: Shield,
      },
      {
        title: "Polish End to End",
        subtitle: "Bielik LLM through Ollama, Piper TTS with a Polish voice",
        icon: Mic,
      },
      {
        title: "Conversation Memory",
        subtitle: "Last five exchanges, kept in RAM only",
        icon: History,
      },
      {
        title: "Voice Timers & Self-Awareness",
        subtitle: "Sets timers and reports its own CPU temperature and RAM",
        icon: Timer,
      },
      {
        title: "Edge Hardware",
        subtitle: "Jetson Xavier NX in a custom case, on a power bank",
        icon: Cpu,
      },
    ],
    technologies: [
      "Python",
      "NVIDIA Jetson Xavier NX",
      "openWakeWord",
      "faster-whisper",
      "Ollama",
      "Bielik",
      "Piper TTS",
    ],
    invertOrder: false,
    phone: false,
    buttonText: "Github",
    buttonURL: "https://github.com/MiniowaPM/voice-assistant",
    problems: [
      "The Jetson Xavier NX is bad at LLMs. On a 7B model quantized to 3 bits it made 1 to 2 tokens per second, so a single answer took 20 to 30 seconds. My MacBook Air beat it at everything.",
      "JetPack 5 locks the board to an old software stack. Ollama was stuck at 0.1.46 without tool calling, onnxruntime had to be pinned, and newer Polish models like Bielik v3 did not run at all. The best working option was Bielik 7B v0.1 in Q3_K_M, which could barely hold a conversation or keep track of much context.",
      "Speech-to-text was just as slow. The GPU was reserved for the LLM, so Whisper ran on the CPU and needed 5 to 8 seconds to transcribe a 2-second sentence.",
      "The Raspberry Pi 5 with an AI HAT, the first plan, could not run an LLM at all. The HAT accelerates vision models, not language models.",
      "The audio was improvised. The lavalier microphone ran on batteries and was flat the morning after I left it on, and the speakers came from a seven-year-old project with an amplifier that hissed whenever the board worked hard.",
    ],
    takeaways: [
      "Check what software a board actually supports before you buy into it. Specs on paper meant nothing when the newest Ollama and models would not install.",
      "An edge board from 2019 is not an LLM machine. For a conversation that feels natural you need far faster inference than it can give.",
      "A fully offline device is a real privacy guarantee, but it caps the quality at what the local hardware can run. That trade-off is why v2 moved the heavy work to a server.",
      "Latency is the whole experience. A 20-second wait kills a voice assistant no matter how good the answer is.",
      "Audio hardware is not an afterthought. A cheap microphone and a noisy amplifier make even good answers sound bad.",
    ],
    video: { youtubeId: "V51wDqSVl7A", vertical: true },
  },
  {
    slug: "soundnest",
    imageSource: [
      "/soundnest/1.webp",
      "/soundnest/2.webp",
      "/soundnest/3.webp",
      "/soundnest/4.webp",
      "/soundnest/5.webp",
    ],
    title: "SoundNest",
    seoTitle: "SoundNest — Music Store Desktop App (Electron)",
    seoDescription:
      "A full-stack desktop music store: studios, albums and tracks, a shop with a wallet, trade offers between users and an admin panel. Electron, React, Flask.",
    tagline: "A full-stack desktop music store, built in half a semester with zero AI.",
    year: "2024",
    status: "Completed — university course project",
    role: "Team of 3 — wrote about 95% of the app",
    description:
      "A desktop application for buying albums and tracks from music studios. Users browse studios and a store, buy music with a built-in wallet, trade purchased items with other users, and manage their own studios and releases. Admins get a separate panel, and the full version is unlocked with a license key.",
    story:
      "SoundNest was the year-long project for the Object-Oriented Programming course in my third semester. The brief was a virtual album store with its own database and a front-end app. Plain HTML felt too easy, so we picked React with Electron for the client and a Flask REST API for the backend. We had one strict rule: no AI at all. That made Electron's IPC a wall I sat in front of for hours before it finally clicked. I came home every day and wrote code until the evening for two or three months, and we finished the whole thing by the middle of the semester, so we did not have to attend for the rest of the year. Builds were slow in development, so I added a loading screen with a small easter egg, and then the production build turned out so fast that the loading screen never showed up. We had never used Figma, so the UI was modelled on Spotify. It ended up as the best app of our year. During the final demo the trade mechanic threw an exception and took the database down with it, which is a lesson in itself.",
    problems: [
      "The team's motivation did not match mine. Tasks were split on \"trust me, I'll do it\", and most of them came back to me. The commit history shows who did what.",
      "React was still fairly new to me, and Electron's IPC between the main and renderer processes took hours of reading before it worked.",
      "No AI meant learning everything from documentation and examples, which was slower but taught me far more.",
      "The trade-offer feature crashed the database during the final presentation.",
    ],
    takeaways: [
      "Agree on ownership up front. A task without one clear owner is a task that ends up with whoever cares most.",
      "Measure the production build before optimizing for the development one. The loading screen solved a problem that only existed in dev.",
      "Test the exact demo path before a presentation, not only the features one by one.",
    ],
    features: [
      {
        title: "Studios, Albums & Tracks",
        subtitle: "Create and manage your own studio and releases",
        icon: Disc3,
      },
      {
        title: "Store & Wallet",
        subtitle: "Buy albums or single tracks with in-app funds",
        icon: ShoppingCart,
      },
      {
        title: "Trade Offers",
        subtitle: "Swap purchased music with other users",
        icon: ArrowLeftRight,
      },
      {
        title: "Admin Panel & Roles",
        subtitle: "The first user becomes admin and can promote others",
        icon: ShieldCheck,
      },
      {
        title: "License Key Activation",
        subtitle: "Demo mode until the full version is unlocked",
        icon: KeyRound,
      },
      {
        title: "Light & Dark Themes, 3 Languages",
        subtitle: "Polish, English and German",
        icon: Languages,
      },
    ],
    technologies: ["Electron", "React", "Material UI", "Flask", "SQLAlchemy", "JWT"],
    invertOrder: true,
    phone: false,
    buttonText: "Github",
    buttonURL: "https://github.com/Schoji/SoundNest",
  },
  {
    slug: "navigator-pm",
    imageSource: "/navigator_pm/1.webp",
    title: "NavigatorPM",
    seoTitle: "NavigatorPM — Indoor Navigation with QR Codes",
    seoDescription:
      "Indoor navigation for the Maritime University of Szczecin: scan a QR code in the hallway, pick a room, and the app draws the route on the floor map.",
    tagline: "Google Maps for the inside of a university building.",
    year: "2026",
    status: "In development",
    role: "Team of 3 at KNI — idea and co-developer",
    description:
      "Scan a QR code anywhere in the university building, choose where you want to go, and NavigatorPM draws the route on the floor map. Routing runs on the phone, and an admin panel lets the team add points and connect them into a graph.",
    story:
      "On my first day at university I was late for my first class even though I arrived thirty minutes early, because I could not find the room. The building is hard to navigate, and I have thought about fixing that ever since. When the KNI board asked for projects beyond Plan PM, I pitched it and two other members joined. The map data lives in JSON files instead of a database. We argued about that at first, but it won for a practical reason: JSON is versioned in Git, so everyone works on exactly the same map, while a database file is binary and cannot be diffed. The admin panel for adding points and connections, the floor map and the route drawing already work. The current work is drawing the remaining floors, and I have asked the university for its evacuation plans to trace them from.",
    features: [
      {
        title: "QR Code Positioning",
        subtitle: "A scan tells the app exactly where you are",
        icon: QrCode,
      },
      {
        title: "Client-Side Routing",
        subtitle: "Dijkstra runs in the browser on your phone",
        icon: Route,
      },
      {
        title: "Step-Free Routes",
        subtitle: "Avoids stairs for wheelchair users",
        icon: Accessibility,
      },
      {
        title: "Multi-Floor Maps",
        subtitle: "Switches floor maps along the route",
        icon: Layers,
      },
      {
        title: "Admin Panel",
        subtitle: "Add points and connect them into a graph",
        icon: Settings,
      },
      {
        title: "Polish, English & Ukrainian",
        subtitle: "Picked from the browser language",
        icon: Languages,
      },
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    invertOrder: false,
    phone: false,
    buttonText: "Github",
    buttonURL: "https://github.com/KNI-PM-Szczecin/NavigatorPM",
  },
  {
    slug: "latwa-ustawa",
    imageSource: [
      "/latwa_ustawa/1.webp",
      "/latwa_ustawa/2.webp",
      "/latwa_ustawa/3.webp",
    ],
    title: "ŁatwaUstawa",
    seoTitle: "ŁatwaUstawa — AI Summaries of Polish Bills (HackNation)",
    seoDescription:
      "Built in 24 hours at HackNation 2025: a Flutter app that turns Polish parliamentary bills into short, plain-language posts using AI.",
    tagline: "Polish bills as a social feed, summarized by AI. Built in 24 hours.",
    year: "2025",
    status: "Hackathon project — HackNation 2025",
    role: "Team of 4 — front-end and full-stack",
    description:
      "A mobile app that turns parliamentary bills into short, neutral posts anyone can read. Bills show up in a feed like on X, each with a category, an AI-written summary and the stage it has reached in parliament. A second tab lists every MP with their party and background.",
    story:
      "ŁatwaUstawa (EasyLaw) was built in 24 hours at HackNation 2025, the national public-sector hackathon organized by the Ministry of Digital Affairs in Bydgoszcz, with almost 1,500 participants and real problems submitted by ministries. Our idea was simple: the law should be readable by everyone, not just lawyers. I built the Flutter app and most of the glue around it, while the rest of the team handled the AI pipeline and the backend. The backend fetches the raw text of a bill and has a DeepSeek model through Hugging Face rewrite it in plain language. The summarization works as a standalone service; joining it to the app is the next step after the MVP.",
    features: [
      {
        title: "Legislative Feed",
        subtitle: "Bills as posts with a title, category and short summary",
        icon: Newspaper,
      },
      {
        title: "AI Summaries",
        subtitle: "DeepSeek through Hugging Face rewrites bills in plain Polish",
        icon: Sparkles,
      },
      {
        title: "Bill Timeline",
        subtitle: "Every stage, from submission to the final vote",
        icon: Milestone,
      },
      {
        title: "MPs Database",
        subtitle: "Party, region and profession of every member",
        icon: Landmark,
      },
    ],
    technologies: ["Flutter", "Dart", "FastAPI", "Python", "DeepSeek", "Hugging Face"],
    invertOrder: true,
    phone: true,
    buttonText: "Github",
    buttonURL: "https://github.com/Schoji/LatwaUstawa",
  },
  {
    slug: "horouge",
    imageSource: ["/horouge/1.webp", "/horouge/2.webp", "/horouge/3.webp"],
    title: "Horouge",
    seoTitle: "Horouge — Horror Roguelike Made in 24h (Godot)",
    seoDescription:
      "A 2D horror roguelike built in 24 hours at HackYeah 2025 in Godot 4.5: a dark forest, a flickering flashlight and spiders in the shadows.",
    tagline: "A horror roguelike made in 24 hours at HackYeah 2025.",
    year: "2025",
    status: "Hackathon project — HackYeah 2025",
    role: "Team of 3 — gameplay programming",
    description:
      "A 2D horror roguelike where you wander through a haunted forest with nothing but a flashlight. The light only reaches where you look, and the spiders come out of the dark. Pixel art meets PS1-style 3D renders, with an original soundtrack made in FL Studio.",
    story:
      "Horouge was made in 24 hours at HackYeah 2025 in Kraków. Godot was new to me, and my first commits are literally tutorial steps. I worked on the gameplay code: hitboxes and hurtboxes, player and enemy animations, the heart bar and the game over screen. The plan was much bigger than one day: procedurally generated floors in the spirit of The Binding of Isaac, a boss on every floor, and an enemy you can only beat by switching your flashlight off. None of that fit in 24 hours, but the core loop of walking, lighting, fighting and dying works.",
    features: [
      {
        title: "Directional Flashlight",
        subtitle: "Lights up only where the player is facing",
        icon: Flashlight,
      },
      {
        title: "4-Direction Combat",
        subtitle: "Attacks with their own animations and hitboxes",
        icon: Swords,
      },
      {
        title: "Spider Enemy AI",
        subtitle: "Chases the player with hit and hurt logic",
        icon: Bug,
      },
      {
        title: "Health & Game Over",
        subtitle: "Five hearts, then the run is over",
        icon: Heart,
      },
    ],
    technologies: ["Godot 4.5", "GDScript", "Blender", "FL Studio"],
    invertOrder: false,
    phone: false,
    buttonText: "Github",
    buttonURL: "https://github.com/Schoji/horouge",
  },
  {
    slug: "gcodec",
    imageSource: "/gcodec/1.webp",
    title: "gcodec",
    seoTitle: "gcodec — 3D G-code Viewer in C with raylib",
    seoDescription:
      "A tiny 3D G-code viewer written in C with raylib and a hand-written parser. Extrusion, travel and retraction moves in different colours.",
    tagline: "A tiny 3D G-code viewer in C, with a parser written by hand.",
    year: "2026",
    status: "Completed — open source (Unlicense)",
    role: "Solo project",
    description:
      "Opens a G-code file and draws the whole print path in 3D, centered on a grid. Extrusion moves are green, travel moves blue and retractions red. Hold the left mouse button to rotate and scroll to zoom.",
    story:
      "I print a lot in 3D and wanted to understand what a slicer actually sends to the printer. Instead of reading about it, I wrote a viewer: about 300 lines of C, raylib for the window and the 3D drawing, and a G-code parser of my own. It deliberately stays small. It reads G0 and G1 moves only, treats X, Y and Z as absolute, and draws the whole file at once without a layer view, which is enough to see a Benchy appear line by line.",
    features: [
      {
        title: "Hand-Written Parser",
        subtitle: "Reads G0 and G1 moves, no libraries",
        icon: FileCode,
      },
      {
        title: "Colour-Coded Moves",
        subtitle: "Extrusion green, travel blue, retraction red",
        icon: Palette,
      },
      {
        title: "Orbit Camera",
        subtitle: "Rotate with the mouse, scroll to zoom",
        icon: Rotate3d,
      },
    ],
    technologies: ["C", "raylib", "CMake"],
    invertOrder: true,
    phone: false,
    buttonText: "Github",
    buttonURL: "https://github.com/Schoji/gcodec",
  },
  {
    slug: "kni-website",
    imageSource: ["/kni_site/1.webp", "/kni_site/2.webp", "/kni_site/3.webp"],
    title: "KNI Website",
    seoTitle: "KNI Website — Science Club Site in Next.js 16",
    seoDescription:
      "The website of the Computer Science Club at the Maritime University of Szczecin: projects, hackathons, team and a membership form. Next.js 16 on a Mac mini.",
    tagline: "The website of my university's computer science club.",
    year: "2026",
    status: "Live at knipm.edu.pl",
    role: "Team of 3 — co-developer and deployment",
    description:
      "The website of KNI, the Computer Science Club at the Maritime University of Szczecin. It presents the club's projects with their own detail pages, the hackathons we went to with photo galleries and timelines, the team, events and a membership form.",
    story:
      "KNI needed a page that shows what the club actually builds, so new students know why they should join. I co-develop it with another member. My part covers the project and hackathon detail pages, image optimization, SEO and the membership form with server-side validation and tests. I also moved the deployment from a static export to a Node.js server in Docker, built by Jenkins on a Mac mini and served through Cloudflare, so the contact form and server code could run.",
    features: [
      {
        title: "Project & Hackathon Pages",
        subtitle: "Detail pages with galleries, timelines and links",
        icon: LayoutGrid,
      },
      {
        title: "Membership Form",
        subtitle: "Server-side validation and reCAPTCHA",
        icon: ClipboardCheck,
      },
      {
        title: "Self-Hosted CI/CD",
        subtitle: "Jenkins builds a Docker image on a Mac mini",
        icon: Server,
      },
      {
        title: "Light & Dark Mode",
        subtitle: "With a responsive layout down to phone width",
        icon: SunMoon,
      },
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion", "Docker", "Jenkins"],
    invertOrder: false,
    phone: false,
    buttonText: "Visit knipm.edu.pl",
    buttonURL: "https://knipm.edu.pl",
  },
];
