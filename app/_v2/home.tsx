import About from "./components/about";
import Contact from "./components/contact";
import GitHubSection from "./components/github-section";
import Hero from "./components/hero";
import Nav from "./components/nav";
import Projects from "./components/projects";
import { getGitHubStats } from "./github";

export default async function Home() {
  const stats = await getGitHubStats();
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <GitHubSection stats={stats} />
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
