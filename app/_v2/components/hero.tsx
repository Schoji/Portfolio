import Image from "next/image";
import { projects } from "../../projects/projects";
import { Button, SegmentFooter } from "./ui";
import { Segment } from "./segment";

const FACTS = [
  { label: "Based in", value: "Szczecin, Poland" },
  { label: "Studying at", value: "Politechnika Morska" },
  { label: "Built since 2022", value: `${projects.length} projects` },
];

/**
 * Three bentos: the paper segment carries the one idea (name, lead, actions);
 * on the right a smaller portrait sits above a dark tile with the facts, so
 * the photo supports the headline instead of competing with it.
 */
export default function Hero() {
  return (
    <section id="top" data-nav="work" className="screen container-v2">
      <div className="flex h-full flex-col gap-2 lg:flex-row">
        <Segment className="flex min-w-0 flex-1 flex-col justify-between gap-16 bg-[var(--seg-paper)] px-7 pt-10 pb-8 text-black lg:px-14 lg:pt-8 lg:pb-8">
          <div className="flex flex-col gap-6">
            <h1 className="font-display t-display">Hi, I&apos;m Piotr.</h1>
            <p className="t-lead-hero max-w-[680px]">
              I build mobile apps, web platforms and embedded systems.{" "}
              <span className="text-black/56">Mostly Flutter, Next.js and Python.</span>
            </p>
          </div>
          <SegmentFooter tone="light" className="flex flex-wrap gap-2.5">
            <Button href="#work" variant="inverse">
              See my work
            </Button>
          </SegmentFooter>
        </Segment>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:w-[34.4%] lg:flex-col">
          <Segment delay={0.08} className="aspect-square bg-[var(--bg-elevated)] sm:flex-1 lg:aspect-auto lg:min-h-0 lg:flex-[1_1_58%]">
            <Image
              src="/v2/portrait.webp"
              alt="Piotr Wittig"
              fill
              priority
              sizes="(min-width: 1024px) 440px, (min-width: 640px) 50vw, 100vw"
              className="object-cover object-[50%_30%]"
            />
          </Segment>
          <Segment delay={0.16} className="flex flex-col justify-end bg-[var(--bg-elevated)] p-7 sm:flex-1 lg:flex-[1_1_42%] lg:p-10">
            <dl className="flex flex-col gap-5">
              {FACTS.map((f) => (
                <div key={f.label} className="flex flex-col gap-1">
                  <dt className="t-label text-[color:var(--text-secondary)]">{f.label}</dt>
                  <dd className="t-body font-[550]">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Segment>
        </div>
      </div>
    </section>
  );
}
