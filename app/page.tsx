"use client";
import { useState } from "react";
import {
  Activity,
  Code,
  Coffee,
  GraduationCap,
  Heart,
  LucideMail,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import SnakeGame from "./components/snake-game";
import { motion } from "framer-motion";
import GitHubCalendar from "react-github-calendar";
import Portfolio from "./components/portfolio";
import GitHubActivity from "./components/github-activity";
import Card from "./components/card";
import { FaFacebook } from "react-icons/fa";
import { BsDiscord } from "react-icons/bs";
import { LiaLinkedinIn } from "react-icons/lia";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { projects } from "./projects/projects";


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
          <h1 className="text-2xl font-semibold">
            Piotr Wittig<span style={{ color: "var(--accent)" }}>.</span>
          </h1>
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
      <div className="relative min-h-[100svh] flex items-center justify-center overflow-hidden py-20">
        {/* Self-playing snake in the background */}
        <SnakeGame />
        {/* Radial glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className="w-[900px] h-[900px] max-w-full rounded-full opacity-50"
            style={{
              background:
                "radial-gradient(circle, rgba(76,29,149,0.35) 0%, rgba(34,211,238,0.06) 42%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto flex flex-col items-center gap-8">
          {/* Availability badge */}
          <span
            className="inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em]"
            style={{
              color: "var(--accent)",
              borderColor: "rgba(34,211,238,0.55)",
              boxShadow: "0 0 20px rgba(34,211,238,0.15)",
            }}
          >
            Available for hire
          </span>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] text-wrap break-words">
            <span className="text-white">I build digital stuff </span>
            <span className="hero-accent">that actually works.</span>
          </h1>

          <p className="text-zinc-400 text-base md:text-lg max-w-xl">
            Pragmatic developer focused on building solid software without the
            unnecessary fluff.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#about"
              className="px-8 py-3 rounded-full font-bold text-black transition-transform hover:scale-105"
              style={{
                background: "var(--accent)",
                boxShadow: "0 0 30px rgba(34,211,238,0.4)",
              }}
            >
              About me
            </a>
            <a
              href="#projects"
              className="px-8 py-3 rounded-full font-bold text-white border border-zinc-600 transition-colors hover:border-cyan-400/70"
            >
              View projects
            </a>
          </div>

          {/* Divider + stats */}
          <div className="w-full max-w-lg mt-6">
            <div className="h-px w-full bg-zinc-700/60 mb-8" />
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "5+", label: "Projects shipped" },
                { value: "542", label: "GitHub commits" },
                { value: "3+", label: "Years coding" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-1"
                >
                  <span
                    className="text-3xl md:text-4xl font-bold"
                    style={{
                      color: "var(--accent)",
                      textShadow: "0 0 20px rgba(34,211,238,0.5)",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-zinc-500 text-xs sm:text-sm">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* About Me */}
      <section
        id="about"
        className="relative border-b border-zinc-800 px-4 sm:px-6 md:px-10 lg:px-16 py-16 md:py-24"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[340px_1fr] gap-12 lg:gap-16">
          {/* Sidebar */}
          <motion.aside
            className="flex flex-col items-center lg:items-start gap-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden ring-2 ring-offset-4 ring-offset-black ring-[#22d3ee]">
                <Image
                  src="/prof_square.webp"
                  alt="Piotr Wittig"
                  width={384}
                  height={384}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-zinc-900 border border-zinc-700 px-4 py-1.5 text-sm whitespace-nowrap">
                <span
                  className="w-2 h-2 rounded-full bg-green-400"
                  style={{ boxShadow: "0 0 8px #4ade80" }}
                />
                Open to work
              </div>
            </div>

            <div className="text-center lg:text-left mt-4">
              <h2 className="text-3xl font-bold">Piotr Wittig</h2>
              <p className="text-zinc-400 mt-1">
                Full-Stack Developer &amp; AI Specialist
              </p>
            </div>

            <div className="flex gap-3">
              <a
                href="https://github.com/Schoji"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/60 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-cyan-400/70"
              >
                <SiGithub size={18} /> GitHub
              </a>
              <a
                href="https://linkedin.com/in/piotr-wittig-357bb9369"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/60 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-cyan-400/70"
              >
                <SiLinkedin size={18} /> LinkedIn
              </a>
            </div>

            <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 flex flex-col gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                Quick Facts
              </p>
              <div className="flex items-center gap-3 text-zinc-300">
                <MapPin size={18} style={{ color: "var(--accent)" }} />
                Szczecin, Poland
              </div>
              <div className="flex items-center gap-3 text-zinc-300">
                <GraduationCap size={18} style={{ color: "var(--accent)" }} />
                Politechnika Morska
              </div>
              <div className="flex items-center gap-3 text-zinc-300">
                <Coffee size={18} style={{ color: "var(--accent)" }} />
                Coffee-powered dev
              </div>
            </div>
          </motion.aside>

          {/* Main */}
          <motion.div
            className="min-w-0"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p
              className="text-sm font-bold tracking-[0.2em]"
              style={{ color: "var(--accent)" }}
            >
              {"// ABOUT ME"}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mt-3">About Me</h1>
            <p
              className="text-2xl md:text-3xl italic mt-5"
              style={{ color: "var(--accent)" }}
            >
              &quot;I write code occasionally on purpose.&quot;
            </p>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed mt-6 max-w-2xl">
              I&apos;m a developer and AI specialist who values pragmatism. I cut
              through the visual noise to focus on what matters most:
              lightning-fast performance, solid UX, and architecture that
              won&apos;t break under pressure.
            </p>

            {/* Technologies */}
            <div className="mt-12">
              <h3 className="flex items-center gap-2 text-xl font-bold">
                <Code size={20} style={{ color: "var(--accent)" }} />
                Technologies
              </h3>
              <div className="flex flex-wrap gap-3 mt-5">
                {[
                  { name: "Flask", highlight: false },
                  { name: "Next.js", highlight: true },
                  { name: "React Native", highlight: false },
                  { name: "Flutter", highlight: true },
                  { name: "FastAPI", highlight: true },
                  { name: "Python", highlight: false },
                  { name: "Supabase", highlight: false },
                ].map((tech) => (
                  <span
                    key={tech.name}
                    className="rounded-full border px-4 py-1.5 text-sm font-medium transition-colors"
                    style={
                      tech.highlight
                        ? {
                            borderColor: "var(--accent)",
                            color: "var(--accent)",
                            boxShadow: "0 0 14px rgba(34,211,238,0.18)",
                          }
                        : { borderColor: "#3f3f46", color: "#d4d4d8" }
                    }
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Passions */}
            <div className="mt-10">
              <h3 className="flex items-center gap-2 text-xl font-bold">
                <Heart size={20} style={{ color: "var(--accent)" }} />
                Passions
              </h3>
              <div className="flex flex-wrap gap-3 mt-5">
                {[
                  "💻 Writing code",
                  "🖨️ 3D Printing",
                  "🔧 Tinkering",
                  "🤖 AI chatbot solutions",
                  "🏋️ Gym",
                  "🎮 100% game completion",
                ].map((passion) => (
                  <span
                    key={passion}
                    className="rounded-full border border-zinc-700 bg-zinc-900/40 px-4 py-1.5 text-sm font-medium text-zinc-300"
                  >
                    {passion}
                  </span>
                ))}
              </div>
            </div>

            {/* GitHub Contributions */}
            <div className="mt-10">
              <h3 className="flex items-center gap-2 text-xl font-bold">
                <SiGithub size={20} style={{ color: "var(--accent)" }} />
                GitHub Contributions
              </h3>
              <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 overflow-x-auto">
                <GitHubCalendar
                  username="Schoji"
                  blockSize={12}
                  blockMargin={4}
                  fontSize={13}
                  theme={{
                    // Cyan ramp from empty (dark) to the site accent (#22d3ee)
                    dark: ["#1b2530", "#0e5063", "#0891b2", "#06b6d4", "#22d3ee"],
                    light: ["#1b2530", "#0e5063", "#0891b2", "#06b6d4", "#22d3ee"],
                  }}
                  colorScheme="dark"
                />
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-10">
              <h3 className="flex items-center gap-2 text-xl font-bold">
                <Activity size={20} style={{ color: "var(--accent)" }} />
                Recent Activity
              </h3>
              <div className="mt-5">
                <GitHubActivity />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Portfolio 1 */}
      <div id="projects" className="relative">
        {projects.map((project, index) => (
          <Portfolio
            key={project.slug}
            {...project}
            id={`portfolio-${index}`}
            nextHref={
              index < projects.length - 1
                ? `#portfolio-${index + 1}`
                : "#getintouch"
            }
          />
        ))}
      </div>
      <div
        id="getintouch"
        className="px-4 md:px-5 py-20 min-h-[100svh] flex items-center justify-center flex-col gap-5"
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
