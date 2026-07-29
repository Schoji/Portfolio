import { Link2, Plane, TriangleAlert } from "lucide-react";
import Comparison, { type ComparisonExample } from "../comparison";
import {
  A,
  C,
  Callout,
  Faq,
  H3,
  LI,
  Lead,
  P,
  Quote,
  RuleTable,
  Section,
  StatRow,
  Steps,
  UL,
  type FaqItem,
  type Rule,
} from "../prose";

export const toc = [
  { id: "why", label: "Why this comparison" },
  { id: "what", label: "What is ASD-STE100?" },
  { id: "not-plain-english", label: "Not plain language" },
  { id: "rules", label: "The rules that matter" },
  { id: "side-by-side", label: "Draft vs STE, side by side" },
  { id: "slop", label: "Why it removes AI tics" },
  { id: "wrong-tool", label: "Where STE is wrong" },
  { id: "checklist", label: "The 6-step check" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
];

/** Also rendered as `FAQPage` structured data — keep answers self-contained. */
export const faq: FaqItem[] = [
  {
    q: "Is ASD-STE100 the same thing as Plain English?",
    a: "No, and they are not even the same kind of thing. Plain language is a goal, defined in ISO 24495-1:2023 by whether the intended reader can find, understand and use the information; how you get there is your judgment. ASD-STE100 is a controlled language: a fixed dictionary of approved words plus 53 numbered writing rules. It can be required by contract and much of it can be checked mechanically. A text can be plain and not STE, or STE and still unclear.",
  },
  {
    q: "Is the ASD-STE100 standard free?",
    a: "Yes. Issue 9, dated 15 January 2025, is free to download from asd-ste100.org. The document stays copyrighted, so you can apply it freely but you cannot republish the dictionary or the rule text.",
  },
  {
    q: "Does ASD-STE100 ban the em dash?",
    a: "No. Rule 8.1 permits every standard English punctuation mark except the semicolon, so both dashes are allowed. The idea that an em dash marks AI writing is a separate internet convention, not part of the standard. If you want it gone, that is your own extra rule.",
  },
  {
    q: "How many rules and how many words does ASD-STE100 have?",
    a: "Issue 9 has 53 writing rules in nine sections, and a dictionary of roughly 900 approved general words. In general, each approved word has one meaning and one part of speech, although the dictionary contains exceptions. On top of the dictionary you may use the technical nouns and technical verbs of your own domain, so you are not limited to 900 words in total.",
  },
  {
    q: "Can I use ASD-STE100 outside aerospace?",
    a: "Yes. The writing rules are domain-neutral. Error messages, runbooks, procedures and API reference gain the most. Marketing pages, essays and anything with a personal voice lose more than they gain, because STE removes voice by design.",
  },
  {
    q: "Does writing in STE stop text from sounding AI-generated?",
    a: "It removes several of the mechanical markers people react to: hedge stacks, passive verbs, long compound sentences and contractions. It does not touch substance, so it cannot make a hollow claim true, and five short declaratives in a row read like a robot in their own way. Treat it as a fix for the form of the writing, not as a detector-beating trick.",
  },
  {
    q: "Is there an official ASD-STE100 checker?",
    a: "No. ASD and the STE Maintenance Group state that they do not endorse, certify or authorize any software tool, including AI-based ones, and that vendors cannot claim ASD approval. Commercial checkers exist and are widely used, but no tool can certify compliance. For everyday writing, a heuristic linter that flags long sentences, passive voice and unmeasurable adjectives catches the mechanical part; the judgment calls, such as choosing the right technical noun, still need a human.",
  },
];

/**
 * Rule numbers and the quoted examples for rules 1.2, 3.4 and 3.7 come from
 * ASD-STE100 Issue 9 (2025-01-15). The rule text is paraphrased because the
 * standard is copyrighted.
 */
const STE_RULES: Rule[] = [
  {
    group: "Rule 1.1",
    rule: "Use approved words, technical nouns and technical verbs only",
    avoid: "utilize, facilitate, prior to, subsequent to, obtain",
    use: "use, help, before, after, get",
  },
  {
    group: "Rule 1.2",
    rule: "Use an approved word only as its approved part of speech",
    avoid: "“Test the system for leaks.” (test is a noun, not a verb)",
    use: "“Do the leak test of the system.”",
  },
  {
    group: "Rule 1.11",
    rule: "Do not use two technical nouns for the same item",
    avoid: "login screen / sign-in page / auth view",
    use: "login screen, every time",
  },
  {
    group: "Rule 1.14",
    rule: "American spelling",
    avoid: "colour, fibre, centre",
    use: "color, fiber, center",
  },
  {
    group: "Rule 3.4",
    rule: "No complex verb constructions built from auxiliaries",
    avoid: "“The operator has adjusted the linkage.”",
    use: "“The operator adjusted the linkage.”",
  },
  {
    group: "Rule 3.6",
    rule: "Active voice — passive only in descriptive text with an unknown agent",
    avoid: "The file is read by the parser.",
    use: "The parser reads the file.",
  },
  {
    group: "Rule 3.7",
    rule: "Use an approved verb for an action, not a noun",
    avoid: "“The ohmmeter gives an indication of 450 ohms.”",
    use: "“The ohmmeter shows 450 ohms.”",
  },
  {
    group: "Rule 4.2",
    rule: "No contractions, no omitted words",
    avoid: "don’t, it’s, we’ll",
    use: "do not, it is, we will",
  },
  {
    group: "Rule 5.1",
    rule: "20 words maximum in an instruction",
    avoid: "one command with three subordinate clauses",
    use: "three sentences",
  },
  {
    group: "Rule 5.2",
    rule: "One instruction per sentence — unless the actions happen at the same time",
    avoid: "Disconnect the cable and wait, then open the cover.",
    use: "three numbered steps",
  },
  {
    group: "Rule 5.4",
    rule: "Condition first, when the reader must know it before acting",
    avoid: "Press RESET if the LED is red.",
    use: "If the LED is red, press RESET.",
  },
  {
    group: "Rule 6.3",
    rule: "25 words maximum in a descriptive sentence",
    avoid: "a 40-word explanation of the what, the why and the workaround",
    use: "two sentences, or a list",
  },
  {
    group: "Rules 6.5 + 6.6",
    rule: "One topic per paragraph, six sentences maximum",
    avoid: "a paragraph that changes subject halfway through",
    use: "a paragraph break at the turn",
  },
  {
    group: "Rule 8.1",
    rule: "Every standard punctuation mark is allowed except the semicolon",
    avoid: "The build failed; the cache was stale.",
    use: "The build failed. The cache was stale.",
  },
  {
    group: "Rule 9.3",
    rule: "No phrasal verbs",
    avoid: "spin up the server, tear down the stack",
    use: "start the server, remove the stack",
  },
];

/** Not in the standard. My own additions, kept separate on purpose. */
const MY_RULES: Rule[] = [
  {
    group: "Mine",
    rule: "Delete any adjective you cannot measure",
    avoid: "seamless, robust, powerful, effortless, cutting-edge",
    use: "the number the adjective was standing in for",
  },
  {
    group: "Mine",
    rule: "Find the agent instead of using the descriptive exception in Rule 3.6",
    avoid: "The requests are counted in a rolling window. (permitted only if the agent is genuinely unknown)",
    use: "The server counts your requests. (after you identify the agent)",
  },
  {
    group: "Mine",
    rule: "No hedge stacks",
    avoid: "It is important to note that this can potentially help.",
    use: "This helps. — or delete the sentence",
  },
  {
    group: "Mine",
    rule: "Prefer the plain verb when English has one",
    avoid: "Perform an analysis of the log.",
    use: "Read the log. (note: STE's own dictionary would say MAKE AN ANALYSIS OF)",
  },
  {
    group: "Mine",
    rule: "No em dash",
    avoid: "a sentence — like this one — with an aside in the middle",
    use: "two sentences, or parentheses (STE allows both dashes)",
  },
];

const EXAMPLES: ComparisonExample[] = [
  {
    id: "ex-readme",
    label: "README opening",
    context: "The first paragraph a stranger reads about your project.",
    plain: [
      "Sortra is a powerful, blazing-fast desktop utility that leverages smart heuristics to seamlessly bring order to your chaotic Downloads folder. No configuration is required, as sensible defaults are provided out of the box. Whether you are a developer drowning in build artifacts or a designer juggling hundreds of exports, Sortra is designed to slot into your existing workflow with minimal friction.",
    ],
    ste: [
      "Sortra sorts the files in a folder. It reads the name and the extension of each file, then moves the file into a folder for that file type. You do not have to write a configuration file. Sortra runs on Windows, macOS and Linux.",
    ],
    flags: [
      "powerful",
      "blazing-fast",
      "leverages",
      "seamlessly",
      "chaotic",
      "No configuration is required",
      "sensible defaults are provided",
      "out of the box",
      "Whether you are a developer",
      "is designed to slot into your existing workflow with minimal friction",
    ],
    note:
      "61 words become 44, and the reader finally learns three facts the first version never contained: what Sortra reads, where it puts the file, and which systems it runs on. Every adjective I deleted had to be replaced by something checkable — that trade is the whole method.",
  },
  {
    id: "ex-error",
    label: "Error message",
    context: "What the user sees when a background sync fails.",
    plain: [
      "Oops! Something went wrong while we were trying to sync your changes. Don’t worry — your data has not been lost, and we will keep retrying in the background. If the issue persists, please don’t hesitate to reach out to our support team, who will be happy to help.",
    ],
    ste: [
      "The app cannot connect to the server. Your changes are on this device. The app sends them again when the connection returns. If this message stays for more than one hour, send a report to support@example.com.",
    ],
    flags: [
      "Oops!",
      "Something went wrong",
      "Don’t worry",
      "has not been lost",
      "we will keep retrying",
      "If the issue persists",
      "please don’t hesitate to reach out",
      "who will be happy to help",
    ],
    note:
      "This is STE's cleanest win. “Something went wrong” names no actor and no failure, so the user cannot decide anything. The rewrite names the actor (the app), the state (your changes are on this device), the recovery (it sends them again), and the threshold for asking a human (one hour).",
  },
  {
    id: "ex-procedure",
    label: "Hardware procedure",
    context:
      "A maintenance step — the exact text ASD-STE100 was invented for in the first place.",
    plain: [
      "Before attempting to replace the battery, it should be noted that the device must first be disconnected from mains power and allowed to discharge, as failure to do so may result in electric shock or damage to the mainboard.",
    ],
    stePrefix:
      "WARNING: Electric shock can kill you. Do the steps in this order.",
    ste: [
      "Disconnect the power cable from the device.",
      "Wait 60 seconds. The capacitors discharge in this time.",
      "Remove the four screws from the battery cover.",
      "Remove the battery.",
    ],
    steAsSteps: true,
    flags: [
      "Before attempting to",
      "it should be noted that",
      "must first be disconnected",
      "allowed to discharge",
      "as failure to do so may result in",
    ],
    note:
      "The original buries two actions and one hazard inside a single 39-word sentence, and the warning arrives after the instruction. STE puts the warning first, one action per line, in the order your hands do them. A technician can follow the right column with gloves on and a torch in their mouth. That was the design brief.",
  },
  {
    id: "ex-pr",
    label: "Pull request description",
    context: "The body of a PR that another engineer has to review.",
    plain: [
      "This PR refactors the authentication layer to leverage a more robust token refresh mechanism, ensuring that users are no longer unexpectedly logged out during long-lived sessions. Additionally, the ad-hoc retry logic that was previously duplicated across call sites has been removed, which should improve maintainability going forward.",
    ],
    ste: [
      "The client now refreshes the access token 60 seconds before it expires. The user stays logged in during a long session. This change removes the retry code from useSession and from apiClient. One function, refreshToken, now does the retry.",
    ],
    flags: [
      "leverage",
      "a more robust",
      "ensuring that",
      "unexpectedly",
      "Additionally",
      "was previously duplicated",
      "has been removed",
      "should improve maintainability going forward",
    ],
    note:
      "Barely shorter — STE is not a compression tool, and on the rate-limit example below it is longer. What changes is reviewability, and note that I had to look up the 60 seconds and the two file names to write the right column. The rules removed the fog; finding the facts was my job.",
  },
  {
    id: "ex-docs",
    label: "API documentation",
    context: "The paragraph explaining a rate limit.",
    plain: [
      "Rate limiting is implemented in order to ensure fair access for all users of the platform. Requests are counted using a rolling window, and once the threshold has been exceeded, subsequent requests will be rejected until such time as the window has elapsed.",
    ],
    ste: [
      "The server counts your requests in a window of 60 seconds. The limit is 100 requests in this window. If you send more, the server rejects the extra requests and returns status 429. The response has a Retry-After header. Wait for this number of seconds, then send the request again.",
    ],
    flags: [
      "is implemented in order to ensure",
      "fair access for all users",
      "Requests are counted",
      "once the threshold has been exceeded",
      "subsequent requests will be rejected",
      "until such time as",
      "has elapsed",
    ],
    note:
      "Four passive verbs get an actor: the server counts, the server rejects. That part is Rule 3.6. The numbers are not — STE never asked for the window, the limit or the status code, and this rewrite is longer than the original (50 words against 43) because I added them. What the rules did was make the gap impossible to ignore.",
  },
];

export default function Body() {
  return (
    <div className="flex flex-col gap-14">
      <Lead>
        There is a lot of writing advice on the internet, and there is a full
        aerospace standard for controlled English. Almost nobody has put the two
        next to each other on real text. This post is the comparison I went
        looking for and could not find: an ordinary engineering draft on the
        left, its ASD-STE100 rewrite on the right, five kinds of text, with the
        rule numbers so you can check me.
      </Lead>

      <Section id="why" eyebrow="Why" title="Why I wrote this comparison">
        <P>
          I found ASD-STE100 through{" "}
          <A href="https://www.youtube.com/watch?v=uJblcC4lKYw">
            a video that calls it the cure for AI slop
          </A>
          . The claim is that the reason LLM output reads like LLM output is not
          the vocabulary — it is the shape. Stacked auxiliaries, 40-word
          sentences with three subordinate clauses, passive verbs with nobody
          doing the acting. The first aerospace guide appeared in 1986. Its
          current rules restrict those patterns because a mechanic in a hangar
          cannot afford to re-read a sentence. The standard says nothing about
          marketing adjectives or nominalizations as categories — those are my
          own additions, and I keep them in a separate table below for exactly
          that reason.
        </P>
        <P>
          What I could not find anywhere was the boring artifact: the same text,
          written both ways, so you can see what the standard actually costs and
          what it buys. Search results give you the spec, some consultancy
          pages, and a lot of posts about banning the em dash. So I wrote the
          comparison instead, with the standard open next to it.
        </P>
      </Section>

      <Section id="what" eyebrow="Background" title="What is ASD-STE100?">
        <P>
          ASD-STE100 is a controlled language: a fixed dictionary plus a set of
          writing rules. The European aerospace industry started work on it in
          the late 1970s and published the first release in 1986, as an AECMA
          document, because maintenance manuals written in fluent English were
          being read by technicians who did not speak it fluently. Ambiguity in
          that context is not a style problem. The standard is maintained today
          by ASD and its Simplified Technical English Maintenance Group, and the
          standard is free to download.
        </P>
        <StatRow
          stats={[
            { value: "1986", label: "First release, as an AECMA document" },
            { value: "53", label: "Writing rules, in 9 sections" },
            { value: "~900", label: "Approved words in the dictionary" },
            { value: "Issue 9", label: "Current, dated 15 January 2025" },
          ]}
        />
        <P>
          Two halves. The <strong className="text-zinc-200">dictionary</strong>{" "}
          approves roughly 900 general words. In general, each approved word has
          one meaning and one part of speech, although the dictionary contains
          exceptions. <C>fall</C> means to move down, so you cannot write that
          latency falls. Technical nouns and verbs for your own domain are
          allowed on top of that list — you are not limited to 900 words total.
          The{" "}
          <strong className="text-zinc-200">writing rules</strong> cover
          sentence length, voice, tense, punctuation and structure, and those
          are the part that does the work outside aerospace.
        </P>
        <Callout icon={Plane} title="Who actually uses it">
          Aircraft, defence and rail maintenance documentation, mostly under
          contract: a customer requires STE, so the manual is written in STE.
          Its second life is machine translation — controlled meanings and
          repeated wording make translation-memory matches more likely. Its
          third life, started about five minutes ago, is people using it as a
          style guide for LLMs.
        </Callout>
      </Section>

      <Section
        id="not-plain-english"
        eyebrow="Distinction"
        title="Plain language and STE are not the same thing"
      >
        <P>
          Worth settling before the examples, because the two get used
          interchangeably and they are different kinds of object. Plain language
          is defined by the outcome: ISO 24495-1:2023 calls writing plain when
          the intended reader can find what they need, understand it, and use
          it. It does not hand you a word list. How you get there is judgment.
        </P>
        <P>
          STE is defined by the input. A fixed dictionary, 53 numbered rules, a
          word cap you can count. It can be written into a contract and a large
          part of it can be checked by a machine. That checkability suits
          contractual workflows today and also makes the rules easier for an LLM
          to follow.
        </P>
        <P>
          The two overlap but neither contains the other. A text can be plain
          and fail STE — this paragraph does. A text can pass every STE rule and
          still leave the reader stuck, because no rule about sentence length
          can tell you that you documented the wrong thing.
        </P>
      </Section>

      <Section id="rules" eyebrow="Reference" title="The ASD-STE100 rules that matter most">
        <P>
          Issue 9 has 53 numbered writing rules in nine sections, plus the
          dictionary. Below are the ones that change how ordinary technical text
          reads, with the rule numbers so you can check me against the source.
          The rule wording is my paraphrase, because the standard is
          copyrighted. In the tables below, an example in quotation marks is the
          standard&apos;s own — that is Rules 1.2, 3.4 and 3.7, and nothing
          else. Everything unquoted I wrote to fit software, so hold me and not
          ASD responsible for those.
        </P>
        <RuleTable rules={STE_RULES} />
        <H3>And these are mine, not the standard&apos;s</H3>
        <P>
          Five habits I apply on top of STE, kept in a separate table so nobody
          quotes them back at me as aerospace rules. They are editorial choices,
          not compliance requirements.
        </P>
        <RuleTable rules={MY_RULES} />
        <Callout icon={TriangleAlert} title="The em dash is not banned">
          Rule 8.1 permits every standard English punctuation mark except the
          semicolon. So the em dash is fine by STE. Treating it as an AI tell is
          an internet convention, not an aerospace rule — if you want it gone,
          that is your rule to add, and it is worth knowing which of the two you
          are following.
        </Callout>
      </Section>

      <Section
        id="side-by-side"
        eyebrow="The comparison"
        title="A typical draft vs ASD-STE100, side by side"
      >
        <P>
          Five kinds of text an engineer actually writes. Be clear about what
          the left column is: an unedited first draft, the way I would have
          written it on a normal day or the way a chat model hands it to you. It
          is not a plain-language version — a careful plain-English writer would
          already have cut most of what is flagged. The comparison is
          draft-to-STE, not method-to-method.
        </P>
        <P>
          The flags are a mixed bag, and it matters which is which: some break a
          numbered rule (a passive with a known actor, a contraction, a
          40-word sentence), others are my own editorial calls (an adjective I
          cannot measure, stock warmth). Word counts and the longest sentence in
          each panel are counted at render time, so those numbers cannot drift
          from the text.
        </P>
        <Comparison examples={EXAMPLES} />
      </Section>

      <Section
        id="slop"
        eyebrow="The argument"
        title="Why STE removes the common AI-writing tics"
      >
        <P>
          Look at what got flagged. Almost none of it is vocabulary. It is
          hedging (<C>may help to improve</C>), passive verbs with a hidden
          actor (<C>requests are counted</C>), nominalizations (
          <C>perform an analysis</C>), stock warmth (
          <C>don’t hesitate to reach out</C>), and sentences that hold three
          ideas at once. That list is a fairly complete description of what
          people mean by slop.
        </P>
        <Quote>
          Banning words treats the symptom. A writing system removes the shape
          that produces the words.
        </Quote>
        <P>
          This is also why a banned-words list disappoints. Strike{" "}
          <C>seamless</C> and the model writes <C>frictionless</C>. Cap the
          sentence at the applicable 20- or 25-word limit, prefer a named actor,
          and demand one instruction per sentence in procedures, and there is
          nowhere left for a filler adjective to sit — the sentence has no room
          for anything but a subject, a verb and an object. The author of the
          video ran that comparison against several models and{" "}
          <A href="https://github.com/woosal1337/blog/tree/main/videos/ep01-the-cure-for-ai-slop">
            published the kit and the numbers
          </A>
          : a writing system beat a banned-words list on every model tested. I
          have not reproduced that experiment, so treat it as his result and not
          as mine. On this page the only evidence is five rewrites and the
          counters next to them.
        </P>
        <H3>The part I did not expect — with a caveat</H3>
        <P>
          My rewrites came out more specific, not just shorter. Be careful about
          what that proves. STE does not require a status code or a timeout
          value; the standard asks you to keep the meaning of the source. What
          happened is narrower and more interesting: once I could not lean on
          “subsequent requests will be rejected” or “a more robust refresh
          mechanism”, the sentence had nowhere to hide, and I had to go and find
          the numbers. The rewrite only became useful after I supplied the
          operational detail the original had omitted.
        </P>
        <P>
          So two separate things happen when you apply STE to a vague draft: the
          form gets fixed by the rules, and the content gets fixed by you,
          because the rules make the hole visible. Only the first half is the
          standard&apos;s doing. That is also the real cost — it makes writing
          slower in a useful way.
        </P>
      </Section>

      <Section
        id="wrong-tool"
        eyebrow="Limits"
        title="Where ASD-STE100 is the wrong tool"
      >
        <P>
          STE strips voice on purpose. That is a feature in a maintenance manual
          and a bug almost everywhere else. The hero line on this site reads:
        </P>
        <Quote>I build digital stuff that actually works.</Quote>
        <P>
          In STE that becomes something like “This person writes software. The
          software operates correctly.” Both sentences are clear. One of them is
          worth reading. Anything persuasive, funny or personal — landing pages,
          essays, cover letters, this paragraph — loses more than it gains.
        </P>
        <UL>
          <LI>
            <strong className="text-zinc-200">Short sentences can drone.</strong>{" "}
            Five 12-word declaratives in a row read like a robot. Vary the
            length inside the cap.
          </LI>
          <LI>
            <strong className="text-zinc-200">It can add words.</strong>{" "}
            Splitting a dense sentence into three costs you the connective
            tissue. STE optimizes for reading speed and accuracy, not word
            count.
          </LI>
          <LI>
            <strong className="text-zinc-200">
              It does not make anything true.
            </strong>{" "}
            A hollow paragraph rewritten in STE is a shorter hollow paragraph.
            It fixes form, never substance.
          </LI>
          <LI>
            <strong className="text-zinc-200">
              Full compliance needs a human.
            </strong>{" "}
            Whether a sentence “makes good sense” and whether you picked the
            right technical noun are judgment calls. A linter can only catch the
            mechanical part.
          </LI>
        </UL>
        <P>
          So I use it in two modes. Strict for procedures, error messages,
          runbooks and API reference — every rule, both length caps. Loose for
          READMEs, PR descriptions and commit messages — keep active voice, one
          idea per sentence and the length cap, drop the dictionary lockdown.
          For anything with a voice, ignore it entirely.
        </P>
      </Section>

      <Section id="checklist" eyebrow="Practice" title="A 6-step STE-inspired check">
        <P>
          This is my editing shortcut, not a compliance test. Procedures have a
          20-word limit, descriptions have a 25-word limit, and full compliance
          also requires the dictionary. Run this over a draft — yours or a
          model’s — and fix what it catches:
        </P>
        <Steps
          items={[
            <>
              Any procedural sentence over 20 words, or descriptive sentence
              over 25? Split it at the first <C>and</C> or <C>which</C>.
            </>,
            <>Any semicolon? Make it a period.</>,
            <>
              Any passive verb with a known actor? Put the actor in front:{" "}
              <C>the parser reads the file</C>.
            </>,
            <>
              Any nominalization or hedge — <C>perform an analysis</C>,{" "}
              <C>may help to improve</C>? Use one plain verb.
            </>,
            <>
              Any adjective that cannot be measured — <C>robust</C>,{" "}
              <C>seamless</C>, <C>powerful</C>? Delete it, then write the number
              it was standing in for.
            </>,
            <>
              Is one thing named two ways across the document? Pick one name and
              use it every time.
            </>,
          ]}
        />
        <P>
          Step 5 is where the work is, and it is the one that changes the
          content rather than the prose. Next in this series I want to build a
          small browser lint for this, and run my own before/after numbers
          instead of borrowing someone else’s.
        </P>
      </Section>

      <Section
        id="faq"
        eyebrow="FAQ"
        title="Questions people actually ask about ASD-STE100"
      >
        <Faq items={faq} />
      </Section>

      <Section id="sources" eyebrow="Sources" title="Sources">
        <UL>
          <LI>
            <A href="https://asd-ste100.org">asd-ste100.org</A> — the official
            standard. Every rule number comes from Issue 9, dated 15 January
            2025, as do the quoted examples for Rules 1.2, 3.4 and 3.7. The
            remaining examples and all five rewrites are mine. The document is
            copyrighted, so the rule wording here is my paraphrase.
          </LI>
          <LI>
            <A href="https://www.asd-ste100.org/STEsoftware.html">
              ASD on STE software
            </A>{" "}
            — ASD and the STE Maintenance Group do not endorse, certify or
            authorize any checker, AI-based or otherwise.
          </LI>
          <LI>
            <A href="https://www.iso.org/standard/78907.html">
              ISO 24495-1:2023
            </A>{" "}
            — the plain-language standard, for the distinction above.
          </LI>
          <LI>
            <A href="https://www.youtube.com/watch?v=uJblcC4lKYw">
              “The cure for AI slop is a 1986 aircraft manual”
            </A>{" "}
            — where I got the idea.
          </LI>
          <LI>
            <A href="https://github.com/woosal1337/blog/tree/main/videos/ep01-the-cure-for-ai-slop">
              The companion repository
            </A>{" "}
            — a distilled STE agent skill, a heuristic anti-slop linter, and the
            cross-model experiment data.
          </LI>
        </UL>
        <Callout icon={Link2} title="Corrections welcome">
          I am not an STE practitioner and this is a developer’s reading of the
          standard, not a certified one. Every rule number here was checked
          against Issue 9, and the second table exists so that my own editing
          habits never get mistaken for aerospace rules. If you find an error
          anyway, tell me and I will correct it on this page.
        </Callout>
      </Section>
    </div>
  );
}
