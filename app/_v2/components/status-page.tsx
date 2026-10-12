import type { ReactNode } from "react";
import Nav from "./nav";
import { Segment } from "./segment";
import { SegmentFooter } from "./ui";

/** 404 and error pages: one paper segment with the code, a line of help and the way out. */
export default function StatusPage({
  code,
  title,
  lead,
  actions,
}: {
  code: string;
  title: string;
  lead: string;
  actions: ReactNode;
}) {
  return (
    <>
      <Nav active={null} />
      <main className="screen container-v2">
        <Segment className="flex min-h-[560px] w-full flex-col justify-between bg-[var(--seg-paper)] px-7 pt-8 pb-8 text-black lg:px-14 lg:pt-12 lg:pb-12">
          <div className="flex flex-col gap-6">
            <p className="t-numeral text-[clamp(96px,16vw,220px)] leading-[0.85] tracking-[-0.05em]">{code}</p>
            <h1 className="font-display t-headline">{title}</h1>
            <p className="t-lead max-w-[620px] text-black/70">{lead}</p>
          </div>
          <SegmentFooter tone="light" className="mt-10 flex flex-wrap gap-2">
            {actions}
          </SegmentFooter>
        </Segment>
      </main>
    </>
  );
}
