import Home from "./_v2/home";
import Shell, { darkViewport } from "./_v2/shell";

// Rebuilt at most hourly so the GitHub numbers stay current without a request
// per visitor.
export const revalidate = 3600;
export const viewport = darkViewport;

export default function HomePage() {
  return (
    <Shell>
      <Home />
    </Shell>
  );
}
