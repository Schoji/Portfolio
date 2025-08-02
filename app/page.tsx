"use client";
import { Code, Cpu, FolderOpen, LucideMail, Move3D } from "lucide-react";
import Image from "next/image";
import CustomBadge from "./components/badge";
import { motion } from "framer-motion";
import GitHubCalendar from "react-github-calendar";
import Portfolio from "./components/portfolio";
import Card from "./components/card";
import { FaFacebook } from "react-icons/fa";

import { BsDiscord } from "react-icons/bs";
import { LiaLinkedinIn } from "react-icons/lia";

const portfolioList = [
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
    invertOrder: false,
    phone: true,
    buttonText: null,
    buttonURL: null,
  },
  {
    imageSource: "/plan_pm.png",
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
    technologies: ["Flutter", "AppWrite.io", "Python", "Selenium"],
    invertOrder: true,
    phone: true,
    buttonText: "Github",
    buttonURL: "https://github.com/KNI-PM-Szczecin/plan_pm",
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
    buttonText: "Github",
    buttonURL: "https://github.com/Schoji/juan-note",
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
  return (
    <div className="w-full h-full grid grid-cols-1 gap-5">
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-sm border-zinc-800/100 border-b-1 fixed backdrop-blur-md bg-opacity-90 backdrop-brightness-75 z-50">
        <div className="navbar-start pl-5">
          <h1 className="p-2 text-3xl font-semibold">Portfolio</h1>
        </div>
        <div className="navbar-center"></div>
        <div className="navbar-end gap-5 pr-5">
          <a className="p-2 link link-hover" href="#about">
            About
          </a>
          <a className="p-2 link link-hover" href="#projects">
            Projects
          </a>
          <a className="p-2 link link-hover" href="#contact">
            Contact
          </a>
        </div>
      </div>
      {/* Dummy spacing for navbar */}
      <div className="h-12 w-full" />
      {/* Hero */}
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(kwiat.png)",
        }}
      >
        <div className="hero-overlay backdrop-blur-md bg-opacity-90 backdrop-brightness-75"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md mx-auto px-4 sm:px-2">
            <h1 className="mb-5 text-5xl font-bold text-wrap break-words sm:text-4xl xs:text-3xl">
              Creating digital experiences with precision
            </h1>
            <p className="mb-5 text-zinc-400 text-base sm:text-sm">
              Developer and designer focused on building elegant solutions to
              complex problems.
            </p>
          </div>
        </div>
      </div>
      {/* About Me */}
      <div
        id="about"
        className="p-4 sm:p-6 md:p-10 min-h-screen justify-center grid lg:grid-cols-2 gap-5 border-b-1 border-zinc-600"
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
          className="grid grid-cols-1 p-2 md:p-5 justify-center gap-5 text-center lg:text-left"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1 className="text-2xl md:text-3xl font-bold">About Me</h1>
          <p className="text-xl md:text-2xl italic">
            &quot;I write code occasionally on purpose.&quot;
          </p>
          <div></div>
          <p className="text-zinc-400 text-base md:text-lg">
            I&apos;m a passionate developer with a love for creating elegant,
            efficient, and user-friendly applications. When I&apos;m not coding,
            you can find me tinkering with my 3D printer, bringing digital
            designs into the physical world.
          </p>
          <div></div>
          <div className="flex gap-2 items-center justify-center lg:justify-start">
            <Code size={18} />
            <p className="font-bold">Technologies</p>
          </div>
          <div className="flex flex-wrap gap-2 items-center justify-center lg:justify-start">
            <CustomBadge content="Flask" />
            <CustomBadge content="Next.js" />
            <CustomBadge content="React Native" />
            <CustomBadge content="Flutter" />
          </div>
          <div></div>
          <div className="flex gap-2 items-center justify-center lg:justify-start">
            <Cpu size={18} />
            <p className="font-bold">Passions</p>
          </div>
          <div className="flex flex-wrap gap-2 items-center text-zinc-400 justify-center lg:justify-start">
            <Code size={18} />
            <p>Writing code</p>
            <Move3D size={18} />
            <p>3D Printing</p>
          </div>
          <div></div>
          <div className="flex gap-2 items-center justify-center lg:justify-start">
            <Cpu size={18} />
            <p className="font-bold">Github Contributions</p>
          </div>
          <div className="flex gap-2 items-center text-zinc-400 justify-center lg:justify-start overflow-x-auto">
            <GitHubCalendar
              username="Schoji"
              blockSize={10}
              blockMargin={5}
              fontSize={12}
            />
          </div>
        </motion.div>
      </div>
      {/* Portfolio 1 */}
      <div id="projects">
        {portfolioList.map((portfolio, index) => (
          <Portfolio key={index} {...portfolio} />
        ))}
      </div>
      <div className="p-4 md:p-5 min-h-screen flex items-center flex-col gap-5">
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
