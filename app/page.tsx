"use client";
import { useState } from "react";
import {
  ChevronDown,
  Code,
  Cpu,
  FolderOpen,
  LucideMail,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import CustomBadge from "./components/badge";
import SnakeGame from "./components/snake-game";
import { motion } from "framer-motion";
import GitHubCalendar from "react-github-calendar";
import Portfolio from "./components/portfolio";
import GitHubActivity from "./components/github-activity";
import Card from "./components/card";
import { FaFacebook } from "react-icons/fa";
import { BsDiscord } from "react-icons/bs";
import { LiaLinkedinIn } from "react-icons/lia";

const portfolioList = [
  {
    imageSource: [
      "/plan_pm/1.png",
      "/plan_pm/3.png",
      "/plan_pm/4.png",
      "/plan_pm/5.png",
      "/plan_pm/6.png",
    ],
    title: "Plan PM",
    description:
      "An intuitive mobile app designed for students of Politechnika Morska to efficiently manage their academic schedules. Plan PM provides real-time access to class timetables, personalized notifications for upcoming lectures, and tools to organize coursework, ensuring students stay on top of their studies.",
    features: [
      "Class Schedule Viewer",
      "Personalized Notifications",
      "Coursework Organizer",
      "Real-Time Updates",
      "User Profiles",
      "Offline Access",
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
    imageSource: [
      "/until_done/1.png",
      "/until_done/2.png",
      "/until_done/3.png",
      "/until_done/4.png",
      "/until_done/5.png",
    ],
    title: "Until Done",
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
    imageSource: [
      "/your_path/1.webp",
      "/your_path/2.webp",
      "/your_path/3.webp",
      "/your_path/4.webp",
    ],
    title: "Your Path",
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
    imageSource: "/kanar_radar.png",
    title: "KanarRadar",
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
    imageSource: "/juan_note.png",
    title: "Juan Note",
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
    imageSource: "/invest_me.png",
    title: "Invest Me",
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
    imageSource: "/sortra.png",
    title: "Sortra",
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
    imageSource: "/doorbell.jpeg",
    title: "Smart doorbell",
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

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div
      className="w-full h-full grid grid-cols-1 gap-5"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, #1c1c2e 0%, #0a0a0a 60%)",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 backdrop-blur-md bg-black/70">
        <div className="flex items-center justify-between px-5 h-14">
          <h1 className="text-2xl font-semibold">Piotr Wittig</h1>
          {/* Desktop links */}
          <div className="hidden sm:flex gap-6">
            <a className="link link-hover text-sm" href="#">Home</a>
            <a className="link link-hover text-sm" href="#about">About</a>
            <a className="link link-hover text-sm" href="#projects">Projects</a>
            <a className="link link-hover text-sm" href="#contact">Contact</a>
          </div>
          {/* Hamburger button - mobile only */}
          <button
            className="sm:hidden p-2 text-zinc-400 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="sm:hidden flex flex-col border-t border-zinc-800 bg-black/95">
            <a
              className="px-6 py-4 text-sm border-b border-zinc-800/50 hover:bg-zinc-800/50 transition-colors"
              href="#"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </a>
            <a
              className="px-6 py-4 text-sm border-b border-zinc-800/50 hover:bg-zinc-800/50 transition-colors"
              href="#about"
              onClick={() => setMenuOpen(false)}
            >
              About
            </a>
            <a
              className="px-6 py-4 text-sm border-b border-zinc-800/50 hover:bg-zinc-800/50 transition-colors"
              href="#projects"
              onClick={() => setMenuOpen(false)}
            >
              Projects
            </a>
            <a
              className="px-6 py-4 text-sm hover:bg-zinc-800/50 transition-colors"
              href="#contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        )}
      </div>
      {/* Dummy spacing for navbar */}
      <div className="h-12 w-full" />
      {/* Hero */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden pb-16">
        <SnakeGame />
        <div className="relative z-10 text-center px-4 sm:px-2 max-w-md mx-auto flex flex-col items-center">
          <h1 className="mb-5 text-5xl font-bold text-wrap break-words sm:text-4xl xs:text-3xl">
            I build digital stuff that actually works.
          </h1>
          <p className="mb-8 text-zinc-400 text-base sm:text-sm">
            Pragmatic developer focused on building solid software without the
            unnecessary fluff.
          </p>
          <a
            href="#about"
            className="btn btn-outline rounded-full px-6 border-zinc-600 text-zinc-300 hover:bg-white hover:text-black hover:border-white transition-all"
          >
            About me
          </a>
        </div>
        <a
          href="#about"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-zinc-600 hover:text-zinc-400 transition-colors animate-bounce z-10"
        >
          <ChevronDown size={24} />
        </a>
      </div>
      {/* About Me */}
      <div
        id="about"
        className="relative p-4 sm:p-6 md:p-10 min-h-screen justify-center grid lg:grid-cols-2 gap-3 border-b-1 border-zinc-600 overflow-hidden"
      >
        <motion.div
          className="avatar items-center justify-center"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="ring-primary ring-offset-base-300 w-60 h-60 md:w-96 md:h-96 rounded-full ring-2 ring-offset-2 mx-auto">
            <Image
              src="/prof_square.png"
              alt="Picture of the author"
              width={384}
              height={384}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </motion.div>
        <motion.div
          className="flex flex-col p-2 md:p-5 justify-center gap-9 text-center lg:text-left min-w-0 w-full"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col gap-5">
            <h1 className="text-2xl md:text-3xl font-bold">About Me</h1>
            <p className="text-xl md:text-2xl italic">
              &quot;I write code occasionally on purpose.&quot;
            </p>
            <p className="text-zinc-400 text-base md:text-lg">
              I&apos;m a developer who values pragmatism. I cut through the
              visual noise to focus on what matters most: lightning-fast
              performance, solid UX, and architecture that won&apos;t break
              under pressure.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center justify-center lg:justify-start">
              <Code size={18} />
              <p className="font-bold">Technologies</p>
            </div>
            <div className="flex flex-wrap gap-2 items-center justify-center lg:justify-start">
              <CustomBadge content="Flask" />
              <CustomBadge content="Next.js" />
              <CustomBadge content="React Native" />
              <CustomBadge content="Flutter" />
              <CustomBadge content="FastAPI" />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center justify-center lg:justify-start">
              <Cpu size={18} />
              <p className="font-bold">Passions</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <CustomBadge content="💻 Writing code" />
              <CustomBadge content="🖨️ 3D Printing" />
              <CustomBadge content="🔧 Tinkering" />
              <CustomBadge content="🤖 AI chatbot solutions" />
              <CustomBadge content="🏋️ Gym" />
              <CustomBadge content="🎮 100% game completion" />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center justify-center lg:justify-start">
              <Cpu size={18} />
              <p className="font-bold">Github Contributions</p>
            </div>
            <div className="w-full overflow-x-auto">
              <GitHubCalendar
                username="Schoji"
                blockSize={8}
                blockMargin={4}
                fontSize={11}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center justify-center lg:justify-start">
              <Cpu size={18} />
              <p className="font-bold">Recent Activity</p>
            </div>
            <GitHubActivity />
          </div>
        </motion.div>
        <a
          href="#projects"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-zinc-600 hover:text-zinc-400 transition-colors animate-bounce"
        >
          <ChevronDown size={24} />
        </a>
      </div>
      {/* Portfolio 1 */}
      <div id="projects" className="relative">
        {portfolioList.map((portfolio, index) => (
          <Portfolio
            key={index}
            {...portfolio}
            id={`portfolio-${index}`}
            nextHref={
              index < portfolioList.length - 1
                ? `#portfolio-${index + 1}`
                : "#getintouch"
            }
          />
        ))}
      </div>
      <div
        id="getintouch"
        className="p-4 md:p-5 min-h-screen flex items-center justify-center flex-col gap-5"
      >
        <h1 className="text-3xl md:text-4xl font-bold">Get in Touch</h1>
        <p className="text-zinc-400 text-base md:text-xl text-center w-full md:w-2/3">
          I&apos;m always open to discussing new opportunities, interesting
          projects, or just having a chat about technology and development. Feel
          free to reach out through any of these channels.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 p-2 md:p-5 w-full">
          <Card
            icon={LucideMail}
            title={"Email"}
            description={"Drop me a line anytime"}
            name={"piotr.wittig@gmail.com"}
            url={"mailto:piotr.wittig@gmail.com"}
          />
          <Card
            icon={BsDiscord}
            title={"Discord"}
            description={"Let's chat on Discord"}
            name={"schoji"}
            url={null}
          />
          <Card
            icon={LiaLinkedinIn}
            title={"LinkedIn"}
            description={"Connect professionally"}
            name={"linkedin.com/in/piotr-wittig-357bb9369"}
            url={"https://linkedin.com/in/piotr-wittig-357bb9369"}
          />
          <Card
            icon={FaFacebook}
            title={"Facebook"}
            description={"Follow my updates"}
            name={"facebook.com/profile.php?id=100010308513992"}
            url={
              "https://www.facebook.com/profile.php?id=100010308513992&locale=pl_PL"
            }
          />
        </div>
        <div></div>
        <p className="text-zinc-400 text-center">
          Prefer a more direct approach? Send me an email and I&apos;ll get back
          to you within 24 hours.
        </p>
        <a
          className="btn bg-white text-black rounded-3xl p-4 md:p-6 font-semibold hover:bg-gray-200"
          href="mailto:piotr.wittig@gmail.com"
        >
          <LucideMail size={16} />
          <span className="hidden sm:inline">Send Email</span>
        </a>
      </div>

      <footer
        id="contact"
        className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-2 md:p-4 border-t-1 border-zinc-700"
      >
        <aside>
          <p className="text-zinc-500 text-xs md:text-base">
            © {new Date().getFullYear()} Piotr Wittig. All rights reserved.
          </p>
        </aside>
      </footer>
    </div>
  );
}
