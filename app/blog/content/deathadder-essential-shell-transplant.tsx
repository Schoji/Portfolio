import { Bug, Skull, Wrench } from "lucide-react";
import ProjectGallery from "../../components/project-gallery";
import {
  A,
  C,
  Callout,
  Faq,
  Figure,
  H3,
  LI,
  Lead,
  P,
  Quote,
  Section,
  Steps,
  Table,
  UL,
  type FaqItem,
} from "../prose";

const PRINTABLES =
  "https://www.printables.com/model/1787540-deathadder-essential-custom-shell-transplant";
const ORIGINAL =
  "https://www.printables.com/model/950910-eos-a-barebones-mouse-shell-based-on-the-logitech";

export const toc = [
  { id: "inheritance", label: "The inheritance" },
  { id: "constraints", label: "What a shell must hold" },
  { id: "design", label: "Designing it" },
  { id: "assembly", label: "Parts and assembly" },
  { id: "crimes", label: "The crimes" },
  { id: "lessons", label: "What I would change" },
  { id: "why", label: "Why publish it broken" },
  { id: "faq", label: "FAQ" },
  { id: "files", label: "Get the files" },
];

export const faq: FaqItem[] = [
  {
    q: "Will this shell fit a DeathAdder Elite or a DeathAdder V2?",
    a: "No. Every mounting hole, the sensor cut-out and the switch positions are built around the DeathAdder Essential board. A different DeathAdder generation has a different PCB outline, so the parts would have to be reshaped. The Elite is in fact what killed the original attempt this project inherited.",
  },
  {
    q: "Which screws do I need for the build?",
    a: "Three sizes: 3 x M3x5 hold the PCB to the base plate, 4 x M2x4 hold the button spring plastics, and 4 x M2x8 join the base plate to the top shell.",
  },
  {
    q: "Does the model need supports?",
    a: "Yes, a lot of them. The shell was shaped for fit and not for printability, so it has overhangs that no sane slicer setting will save. Splitting the parts and reorienting them for the bed is the single most useful remix anyone could make.",
  },
  {
    q: "Does the middle click work?",
    a: "No. The replacement scroll encoder I used is a cheap clone with no middle-click switch inside, so there is physically nothing to press. The wheel itself scrolls.",
  },
  {
    q: "What files are included?",
    a: "STL for printing, STEP for editing in any parametric CAD, and the native Rhino 3DM file if you want the NURBS surfaces rather than a mesh. Assembly photos are included too.",
  },
  {
    q: "Can I remix the shell?",
    a: "Please do. The shell is itself a remix of the EOS barebones mouse shell, so keep that credit chain intact and check the original model's license before you republish.",
  },
];

const SCREWS = [
  ["M3x5", "3", "Hold the PCB down to the base plate"],
  ["M2x4", "4", "Hold the spring plastics that press the buttons"],
  ["M2x8", "4", "Join the base plate to the top shell"],
];

const GALLERY = [
  "/blog/deathadder/parts-exploded.webp",
  "/blog/deathadder/assembled-top.webp",
  "/blog/deathadder/assembled-angle.webp",
  "/blog/deathadder/baseplate-pcb.webp",
  "/blog/deathadder/bottom-plate.webp",
];

export default function Body() {
  return (
    <div className="flex flex-col gap-14">
      <Lead>
        A friend tried to move the internals of his Razer DeathAdder Elite into
        a printed shell. The operation failed and the project died. I inherited
        the electronics from a second mouse in that pile — a DeathAdder
        Essential — and built a new body around them. It works. It is also,
        by any reasonable standard, a design war crime. I published it anyway,
        and this is the honest write-up of why.
      </Lead>

      <Section id="inheritance" title="The inheritance">
        <P>
          What I received was the whole nervous system of a mouse and no body:
          the PCB with the sensor and the switches on it, the cable, the clear
          plastic sensor lens, and a scroll encoder. Everything that makes a
          mouse a mouse, apart from the part your hand touches.
        </P>
        <P>
          Buying a new mouse would have cost less than the filament and the
          screws. That was never the point. The point was that a working sensor
          and a working USB cable were sitting in a drawer, and the only thing
          between them and a usable mouse was a shape.
        </P>
        <Figure
          src="/blog/deathadder/parts-exploded.webp"
          alt="All the parts of the mouse laid out: printed top shell, base plate, buttons, PCB, scroll wheel, cable and screws"
          caption="Everything in the build. The shell parts are printed; the rest came out of a dead mouse."
          priority
        />
      </Section>

      <Section
        id="constraints"
        title="What a mouse shell actually has to hold"
      >
        <P>
          Before this I assumed a mouse shell was a plastic lid. It is not. It
          is a fixture that has to hold five different things in the right place
          relative to each other, and most of them have no tolerance to give:
        </P>
        <UL>
          <LI>
            <strong className="text-zinc-200">The sensor and its lens.</strong>{" "}
            The optical sensor reads the surface through a moulded clear lens,
            and the lens has to sit at the exact height and angle the original
            shell held it at. Get this wrong and the mouse tracks badly or not
            at all. This is the one part I did not dare redesign — the lens
            drops into a seat in the base plate and the geometry copies the
            donor.
          </LI>
          <LI>
            <strong className="text-zinc-200">The PCB mounting holes.</strong>{" "}
            Three M3 screws fix the board, and they set the position of
            everything else. Every other dimension in the shell is measured from
            these.
          </LI>
          <LI>
            <strong className="text-zinc-200">The switch plungers.</strong> The
            main buttons do not press the switches directly. A printed lever
            arm, held by a screw, transfers your finger onto the switch. Its
            pivot, its length and how far it travels decide whether the click
            feels crisp or like pressing a sponge.
          </LI>
          <LI>
            <strong className="text-zinc-200">The scroll encoder.</strong> The
            wheel has to be concentric with the encoder shaft and square to the
            shell opening. A degree of tilt is visible to the eye and annoying
            to the finger.
          </LI>
          <LI>
            <strong className="text-zinc-200">The cable exit.</strong> The
            strain relief has to be anchored so that pulling the cable moves the
            mouse instead of the board.
          </LI>
        </UL>
        <P>
          Four of those five I got acceptably right. You can guess from the list
          which one I did not.
        </P>
      </Section>

      <Section id="design" title="Designing it">
        <P>
          I did not start from a blank file. The shape is a remix of{" "}
          <A href={ORIGINAL}>EOS, a barebones mouse shell</A> — all credit for
          the base geometry goes to its author. I reshaped it until the
          Essential internals fitted, which in practice meant pushing surfaces
          around in Rhino until nothing collided, then checking again. The whole
          thing is NURBS surfaces — no SubD anywhere — and I now think that
          choice cost me more than it saved.
        </P>
        <P>
          That order of operations — fit first, worry about printing never — is
          exactly where the trouble started. Every decision optimised for
          &quot;does the board clear this wall&quot; and none for &quot;can a
          nozzle reach this&quot;. The result prints, but only under a forest of
          supports.
        </P>
        <Figure
          src="/blog/deathadder/baseplate-pcb.webp"
          alt="The printed base plate with the mouse PCB screwed into it and the cable routed underneath"
          caption="Base plate with the board in. The cable routes under the PCB — and must not lift it."
        />
        <Callout icon={Wrench} title="Why the Rhino file is in the download">
          Most mouse shells are published as STL only, which is a dead end for
          anyone who wants to change the shape. A mesh is a photograph of a
          surface. The 3DM keeps the NURBS surfaces I actually worked on, and the
          STEP travels into any parametric CAD. If you plan to fix my geometry,
          start from those, not from the STL.
        </Callout>
      </Section>

      <Section id="assembly" title="Parts and assembly">
        <P>
          Four printed parts, two optional printed side buttons, eleven screws
          in three sizes, and the donor electronics. The part names below match the
          STL filenames.
        </P>
        <Table head={["Screw", "Qty", "Job"]} rows={SCREWS} />
        <P>
          The full step-by-step, with a photo for every step, lives on the{" "}
          <A href={PRINTABLES}>Printables listing</A>. The short version:
        </P>
        <Steps
          items={[
            <>
              Drop the clear sensor lens into its seat in <C>01_BasePlate</C>.
            </>,
            <>
              Plug the USB cable into the PCB <em>before</em> anything else, then
              anchor the strain relief in the base plate. Doing this later means
              fighting the cable in a closed shell.
            </>,
            <>
              Lay the PCB in with the cable running underneath it, flat, not
              propping the board up. Fix it with the three M3x5.
            </>,
            <>Press the scroll wheel onto its posts — it is a friction fit.</>,
            <>
              Screw <C>03_Button_Left</C> and <C>04_Button_Right</C> into{" "}
              <C>02_TopPlate</C>, one M2x4 each. Add the side buttons only if
              you enjoy suffering.
            </>,
            <>
              Align the base plate to the top shell before you drive the four
              M2x8. Align first, screw second, or you will cross-thread it.
            </>,
          ]}
        />
        <div className="mt-2">
          <ProjectGallery
            images={GALLERY}
            phone={false}
            title="DeathAdder Essential shell transplant"
          />
        </div>
      </Section>

      <Section id="crimes" title="The crimes">
        <P>
          Full disclosure, because anyone who prints this deserves to know what
          they are getting:
        </P>
        <UL>
          <LI>
            <strong className="text-zinc-200">
              The scroll wheel is not centred
            </strong>{" "}
            and sits at a slight angle. Off by just enough to notice for ever.
          </LI>
          <LI>
            <strong className="text-zinc-200">The side buttons stick.</strong>{" "}
            They do not press cleanly and they jam. Step 9 of the assembly is
            optional for exactly this reason.
          </LI>
          <LI>
            <strong className="text-zinc-200">
              The middle click does not exist.
            </strong>{" "}
            Not a geometry problem — the clone encoder I ended up with has no
            middle switch inside it at all. There is nothing to press.
          </LI>
          <LI>
            <strong className="text-zinc-200">The main click is mushy</strong>{" "}
            and one press sometimes registers as several. My guess is the lever
            geometry. Either way it rules the mouse out for anything
            competitive.
          </LI>
          <LI>
            <strong className="text-zinc-200">
              There is no cable grommet.
            </strong>{" "}
            I forgot to model the cover for the cable exit, so the cable is not
            locked down and can work its way out over time.
          </LI>
        </UL>
        <Figure
          src="/blog/deathadder/assembled-top.webp"
          alt="The finished mouse seen from above, black printed shell with two red side buttons"
          caption="It clicks. Mostly. The scroll wheel angle is visible if you know to look."
        />
      </Section>

      <Section id="lessons" title="What I would change">
        <H3>Design for the bed, not only for the board</H3>
        <P>
          The single biggest mistake. Fit and printability are not competing
          goals if you think about both from the start — split the shell along a
          plane that leaves flat faces down, and most of the overhangs stop
          existing. I bolted printability on at the end, which is to say I did
          not.
        </P>
        <H3>NURBS was the wrong tool for an organic shell</H3>
        <P>
          A mouse shell is a hand-shaped blob with functional cut-outs in it. I
          built it entirely from trimmed NURBS surfaces, and closing that into a
          watertight solid is where most of the pain lived: surfaces that almost
          but not quite meet, tangency that goes wrong at the joins, naked edges
          small enough to miss and large enough to stop the thing joining into a
          closed polysurface. Then the mesh export inherits every one of those
          gaps.
        </P>
        <P>
          SubD is built for exactly this shape. One closed cage, push it around
          until the form is right, and it stays watertight by construction —
          convert to NURBS at the end if you need the trimmed detail. Next
          organic body I model starts as SubD, and the surfaces come later.
        </P>

        <H3>Test the moving parts before printing the whole thing</H3>
        <P>
          A button lever is a hinge with a spring, and it needs a couple of
          iterations on its own. Printing a 40 g shell to find out that a 2 g
          lever feels wrong is the slowest possible feedback loop. Print the
          lever, the switch mount and nothing else, ten times, and only then the
          body.
        </P>
        <H3>Buy the encoder from someone who ships the switch</H3>
        <P>
          A scroll encoder with no middle-click switch is not a scroll encoder
          with a defect, it is a different part. Check the datasheet, not the
          listing photo.
        </P>
        <H3>Model the closure parts you cannot see</H3>
        <P>
          The missing cable grommet is a five-minute part that I did not think
          about because it is not visible in any render. Everything that touches
          the cable belongs in the model from day one.
        </P>
      </Section>

      <Section id="why" title="Why publish it broken">
        <P>
          The obvious move is to sit on a model until it is good. I think that
          is usually the wrong one for a project like this.
        </P>
        <Quote>
          A polished model invites downloads. A broken one, documented honestly,
          invites a remix.
        </Quote>
        <P>
          A shell that works but clicks badly is a specific, bounded problem
          that somebody with more CAD hours than me can fix in an evening — but
          only if the failures are written down. Hiding the mushy click behind a
          nice photograph wastes their time and mine. So the listing names every
          fault, and the source files are there in an editable format rather
          than as a mesh.
        </P>
        <Callout icon={Skull} title="Consider it an open wound">
          If you print it, break it, or redesign it, I want to see the result.
          The best outcome for this project is that someone posts a remix that
          makes mine obsolete.
        </Callout>
      </Section>

      <Section
        id="faq"
        title="Questions about the DeathAdder shell"
      >
        <Faq items={faq} />
      </Section>

      <Section id="files" title="Get the files">
        <UL>
          <LI>
            <A href={PRINTABLES}>
              DeathAdder Essential — custom shell transplant
            </A>{" "}
            on Printables: STL, STEP and the Rhino 3DM, plus the photo assembly
            guide.
          </LI>
          <LI>
            <A href={ORIGINAL}>EOS, a barebones mouse shell</A> — the original
            model this one remixes. Check its license before you republish
            anything derived from it.
          </LI>
        </UL>
        <Callout icon={Bug} title="Found another crime?">
          Tell me and I will add it to the list. A known fault is more useful
          than a surprise.
        </Callout>
      </Section>
    </div>
  );
}
