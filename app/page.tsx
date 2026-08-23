"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- Native navigations avoid a Firefox hang in Next's client router. */
import { useState } from "react";
import {
  Activity,
  ArrowRight,
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
import ScrollProgress from "./components/scroll-progress";
import { motion } from "framer-motion";
import GitHubCalendar from "react-github-calendar";
import Portfolio from "./components/portfolio";
import GitHubActivity from "./components/github-activity";
import ContactLink from "./components/contact-link";
import { FaFacebook } from "react-icons/fa";
import { BsDiscord } from "react-icons/bs";
import { LiaLinkedinIn } from "react-icons/lia";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { projects } from "./projects/projects";
import { formatDate, listedPosts } from "./blog/posts";


export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div
      className="w-full h-full grid grid-cols-1 gap-5"
      style={{
        background: "var(--page-gradient)",
        backgroundAttachment: "fixed",
      }}
    >
      <ScrollProgress />
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 backdrop-blur-md bg-black/70">
        <div className="flex items-center justify-between px-5 h-14">
          <span className="text-2xl font-semibold">
            Piotr Wittig<span style={{ color: "var(--accent)" }}>.</span>
          </span>
          {/* Desktop links */}
          <div className="hidden sm:flex gap-6">
            <a className="link link-hover text-sm" href="#">Home</a>
            <a className="link link-hover text-sm" href="#about">About</a>
            <a className="link link-hover text-sm" href="#projects">Projects</a>
            <a className="link link-hover text-sm" href="/blog">Blog</a>
            <a className="link link-hover text-sm" href="#getintouch">Contact</a>
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
              className="px-6 py-4 text-sm border-b border-zinc-800/50 hover:bg-zinc-800/50 transition-colors"
              href="/blog"
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </a>
            <a
              className="px-6 py-4 text-sm hover:bg-zinc-800/50 transition-colors"
              href="#getintouch"
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

        <div className="relative z-10 px-4 max-w-3xl mx-auto flex flex-col items-start gap-7">
          {/* The name is the thesis of a portfolio hero, so it is the h1 — not a
              full sentence set at display size. */}
          <h1 className="text-5xl sm:text-6xl font-semibold leading-[1.05] tracking-tight">
            <span className="text-white">Piotr </span>
            <span className="hero-accent">Wittig</span>
          </h1>

          <p className="text-zinc-300 text-lg md:text-xl leading-relaxed max-w-xl">
            I build mobile apps, web platforms and embedded systems — mostly
            Flutter, Next.js and Python.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="px-7 py-3 rounded-full font-semibold text-black transition-transform hover:scale-105"
              style={{ background: "var(--accent)" }}
            >
              View projects
            </a>
            <a
              href="#getintouch"
              className="px-7 py-3 rounded-full font-semibold text-white border border-zinc-600 transition-colors hover:border-[rgb(var(--accent-rgb)/0.7)]"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
      {/* About Me + GitHub — sticky profile, scrolling content */}
      <section
        id="about"
        className="relative border-b border-zinc-800 px-4 sm:px-6 md:px-10 lg:px-16 py-16 md:py-24"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[340px_1fr] gap-12 lg:gap-16 items-start">
          {/* Sticky profile card — pinned across the About + GitHub sections */}
          <motion.aside
            className="flex flex-col items-center lg:items-start gap-6 lg:sticky lg:top-24 lg:self-start"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden ring-2 ring-offset-4 ring-offset-black ring-[color:var(--accent)]">
              <Image
                src="/prof_square.webp"
                alt="Piotr Wittig"
                width={384}
                height={384}
                className="object-cover w-full h-full"
                priority
              />
            </div>

            <div className="text-center lg:text-left">
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
                className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/60 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-[rgb(var(--accent-rgb)/0.7)]"
              >
                <SiGithub size={18} /> GitHub
              </a>
              <a
                href="https://linkedin.com/in/piotr-wittig-357bb9369"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/60 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-[rgb(var(--accent-rgb)/0.7)]"
              >
                <SiLinkedin size={18} /> LinkedIn
              </a>
            </div>

            <div className="hover-glow w-full rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 flex flex-col gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
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

          {/* Scrolling content column: About Me, then GitHub Contributions */}
          <div className="min-w-0">
          {/* About Me */}
          <motion.div
            className="min-w-0"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mt-3">About Me</h2>
            <p
              className="text-2xl md:text-3xl italic leading-snug mt-5"
              style={{ color: "var(--accent)" }}
            >
              &quot;I write code occasionally on purpose.&quot;
            </p>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed mt-6 max-w-2xl">
              I&apos;m a developer and AI specialist who values pragmatism. I care
              about performance, interfaces people can actually use, and
              architecture that still makes sense a year later.
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
                    className="tech-pill rounded-full border px-4 py-1.5 text-sm font-medium"
                    style={
                      tech.highlight
                        ? {
                            borderColor: "var(--accent)",
                            color: "var(--accent)",
                            boxShadow: "0 0 14px rgb(var(--accent-rgb) / calc(0.18 * var(--glow-strength)))",
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

          </motion.div>

          {/* GitHub Contributions — second scrolling section */}
          <motion.div
            id="github"
            className="min-w-0 mt-20 md:mt-28 lg:mt-40 border-t border-zinc-800 pt-14 md:pt-20"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mt-3">
              GitHub Contributions
            </h2>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed mt-6 max-w-2xl">
              A snapshot of what I&apos;ve been building lately.
            </p>

            {/* Contribution calendar */}
            <div className="hover-glow mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 overflow-x-auto">
              <GitHubCalendar
                username="Schoji"
                blockSize={12}
                blockMargin={4}
                fontSize={12}
                theme={{
                  // Brass ramp from empty (dark) to the site accent (#e0a33e).
                  // Literals: the library takes an array, not CSS vars.
                  dark: ["#241c0c", "#5c4207", "#a87a11", "#c99327", "#e0a33e"],
                  light: ["#241c0c", "#5c4207", "#a87a11", "#c99327", "#e0a33e"],
                }}
                colorScheme="dark"
              />
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
      {/* From the blog — internal links into /blog for crawlers and readers */}
      {listedPosts.length > 0 && (
        <section
          id="writing"
          /* No border-t: the last project card's own border-b already draws the
             separator, and the root grid's gap-5 sits between them — a border on
             both sides renders two parallel rules 20px apart. */
          className="px-4 sm:px-6 md:px-10 lg:px-16 py-16 md:py-24"
        >
          <motion.div
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-4xl md:text-5xl font-bold">From the blog</h2>
              <a
                href="/blog"
                className="flex items-center gap-2 text-sm font-semibold transition-colors hover:text-white"
                style={{ color: "var(--accent)" }}
              >
                All posts
                <ArrowRight size={16} />
              </a>
            </div>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed mt-6 max-w-2xl">
              I write when I go looking for something and cannot find it.
            </p>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
              {listedPosts.slice(0, 2).map((post) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="hover-glow group flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6"
                >
                  <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h3 className="text-xl font-bold leading-snug group-hover:text-[var(--accent-light)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                  <span
                    className="mt-1 flex items-center gap-2 text-sm font-semibold"
                    style={{ color: "var(--accent)" }}
                  >
                    Read the post
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      <div
        id="getintouch"
        className="px-4 md:px-5 py-20 min-h-[100svh] flex items-center justify-center"
      >
        <div className="w-full max-w-3xl flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl md:text-4xl font-semibold">Get in Touch</h2>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
              Open to new opportunities and interesting projects, or just a
              conversation about what you are building. Email is the surest way
              to reach me and I answer within a day.
            </p>
          </div>

          {/* Email is the channel that actually gets used, so it gets the
              weight instead of being one of four matching tiles. */}
          <a
            href="mailto:piotr.wittig@gmail.com"
            className="hover-glow group flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6"
          >
            <span className="flex min-w-0 items-center gap-4">
              <LucideMail
                size={22}
                style={{ color: "var(--accent)" }}
                className="shrink-0"
              />
              <span className="flex min-w-0 flex-col">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Email
                </span>
                <span className="truncate text-lg font-medium text-zinc-100">
                  piotr.wittig@gmail.com
                </span>
              </span>
            </span>
            <span
              className="flex shrink-0 items-center gap-2 text-sm font-semibold"
              style={{ color: "var(--accent)" }}
            >
              Write to me
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </a>

          {/* The rest are a list, not a second grid of identical cards. */}
          <div className="flex flex-col border-t border-zinc-800 pt-4">
            <ContactLink
              icon={LiaLinkedinIn}
              label="LinkedIn"
              handle="linkedin.com/in/piotr-wittig-357bb9369"
              url="https://linkedin.com/in/piotr-wittig-357bb9369"
            />
            <ContactLink
              icon={BsDiscord}
              label="Discord"
              handle="schoji"
              url={null}
            />
            <ContactLink
              icon={FaFacebook}
              label="Facebook"
              handle="facebook.com/profile.php?id=100010308513992"
              url="https://www.facebook.com/profile.php?id=100010308513992&locale=pl_PL"
            />
          </div>
        </div>
      </div>

      <footer
        id="contact"
        className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-2 md:p-4 border-t-1 border-zinc-700"
      >
        <aside>
          <p className="text-[var(--text-muted)] text-xs md:text-base">
            © {new Date().getFullYear()} Piotr Wittig. All rights reserved.
          </p>
        </aside>
      </footer>
    </div>
  );
}
