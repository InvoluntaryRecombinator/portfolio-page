export type VisualKind = "image" | "fleetsync" | "type" | "grid" | "orbit";

export type CaseStudy = {
  liveUrl: string;
  sourceUrl?: string;
  context?: string;
  contextLabel?: string;
  problem: string[];
  architecture: Array<{
    label: string;
    value: string;
  }>;
  execution: Array<{
    title: string;
    description: string;
  }>;
};

export type Project = {
  id: string;
  number: string;
  title: string;
  year: string;
  summary: string;
  visual: VisualKind;
  image?: string;
  caseImage?: string;
  video?: string;
  videoPoster?: string;
  background: string;
  foreground: string;
  accent: string;
  overview: string;
  caseStudy?: CaseStudy;
};

export const siteContent = {
  name: "JORDON WALSH",
  role: "DESIGNER + DEVELOPER",
  location: "CALIFORNIA, USA",
  availability: "AVAILABLE FOR SELECTED WORK",
  statement: "BUILDING TECHNICAL SYSTEMS THAT WORK.",
  introduction:
    "I am a pragmatic developer focused on building lightweight web applications, data parsing pipelines, and automation systems. I prioritize efficient architecture and cost-control—whether that means leveraging LLMs for unstructured data, utilizing native browser APIs, or knowing when not to write expensive custom code. Away from the keyboard, I try to spend time swimming, snowboarding, or cooking.",
  email: "jwalb90@gmail.com",
  linkedin: "https://www.linkedin.com/in/jordan-walsh-dev",
  github: "https://github.com/InvoluntaryRecombinator",
};

export const projects: Project[] = [
  {
    id: "grvl",
    number: "01",
    title: "GRVL",
    year: "2026",
    summary:
      "A hands-free Chrome extension that routes speech through Gemini’s primary text interface, preserving its full intelligence, Workspace integrations, memory, and generation tools.",
    visual: "image",
    image: "/assets/projects/grvl/paper-logo-dark.png",
    video: "/assets/projects/grvl/GRVL-video.mp4",
    background: "#f0eee7",
    foreground: "#151512",
    accent: "#b8ff30",
    overview:
      "GRVL restores hands-free access to the full intelligence and toolset of a standard Gemini text conversation.",
    caseStudy: {
      liveUrl: "https://involuntaryrecombinator.github.io/GRVL-site/",
      sourceUrl: "https://github.com/InvoluntaryRecombinator/GRVL-OS",
      problem: [
        "The built-in hands-free/voice mode tools used by modern AI platforms force users to utilize simplified, dumbed-down models that sacrifice the complex analysis and high model intelligence of typical text-based LLM conversations.",
        "These restricted models actively block access to internal tools (Google Workspace, Gmail), ignore conversational memory and personalization features, and refuse to execute many reasonable requests—such as multimedia generation—that pose no problem for typical text-based conversations.",
      ],
      architecture: [
        { label: "Core Stack", value: "JavaScript (ES6+), HTML/CSS" },
        {
          label: "Infrastructure",
          value: "Chrome Extensions API (Manifest V3)",
        },
        { label: "Speech Processing", value: "Native Web Speech API" },
        {
          label: "State Management",
          value: "MutationObserver & Event Delegation",
        },
      ],
      execution: [
        {
          title: "Maintaining Model Intelligence via DOM Injection",
          description:
            "The tool translates speech to text client-side and injects it directly into the native UI as a standard text-based prompt. This bypasses the conversational model gate, forcing the prompt through Gemini's primary engine to retain full access to Workspace integrations, deep reasoning, and image generation.",
        },
        {
          title: "State-Aware Routing",
          description:
            "The extension uses MutationObserver to track the application's real-time state. This allows the tool to dynamically determine whether captured user speech should be injected into the prompt box as text or intercepted as a structural command.",
        },
        {
          title: "Trigger-Based Event Spoofing",
          description:
            "The application employs user-defined trigger phrases to programmatically mimic native UI button clicks. These triggers allow users to send prompts, erase dictated text, or pause and stop text-to-speech responses entirely hands-free.",
        },
        {
          title: "Zero-Dependency Integration",
          description:
            "The architecture relies entirely on native browser APIs and leverages Gemini's built-in text-to-speech functionality to read responses aloud. The extension remains lightweight and self-contained, requiring no third-party APIs or external data routing.",
        },
      ],
    },
  },
  {
    id: "fleetsync",
    number: "02",
    title: "FLEETSYNC",
    year: "2026",
    summary:
      "A low-code fleet maintenance workflow currently used by Nautilus Sportfishing in San Diego, routing ordinary crew text messages through LLM triage into a shared Airtable record.",
    visual: "fleetsync",
    background: "#000000",
    foreground: "#ffffff",
    accent: "#d45d31",
    overview:
      "FleetSync connects native carrier messaging, Zapier, the OpenAI API, and Airtable into an app-less maintenance reporting system for small fleets.",
    caseStudy: {
      liveUrl: "https://involuntaryrecombinator.github.io/fleetsync/",
      context: "Currently in use by Nautilus Sportfishing of San Diego, CA.",
      problem: [
        "On small fleets, maintenance reporting often lives in text threads on somebody's personal phone. Reports arrive across devices and email accounts, nothing is categorized, history is unsearchable, and visibility depends on who holds the phone.",
        "Traditional fleet-management software is expensive and bloated, requiring owner-operators to onboard reluctant crew members into apps they have no interest in using.",
      ],
      architecture: [
        { label: "Core Stack", value: "Zapier, Airtable, OpenAI API" },
        {
          label: "Intake",
          value: "Native carrier SMS-to-email gateways",
        },
        {
          label: "Data Processing",
          value: "LLM-driven entity extraction and severity triage",
        },
        {
          label: "Storage & Access",
          value: "Airtable records with media attachments and resolution tracking",
        },
      ],
      execution: [
        {
          title: "App-Less Data Entry",
          description:
            "Crew members send an ordinary text—with photos, video, or audio—to a saved contact backed by a carrier SMS-to-email gateway. The workflow requires no new app, training, dedicated phone number, or per-message service such as Twilio.",
        },
        {
          title: "Automated LLM Triage",
          description:
            "Zapier routes each free-form report through the OpenAI API to identify the sender by phone number, extract the vessel name and issue category, and assign a severity rating without requiring a fixed message format.",
        },
        {
          title: "Centralized Database",
          description:
            "The structured record and its media attachments are written to Airtable by vessel, issue type, and severity. Multiple admins can track tickets from reported to resolved while keeping the maintenance history off personal devices.",
        },
        {
          title: "Conditional Alert Routing",
          description:
            "Zapier routes notifications according to severity and operator preferences. Critical issues alert the owner-operator immediately, while routine maintenance notes are grouped into daily or weekly digests.",
        },
        {
          title: "Built-in Data Analysis",
          description:
            "Airtable's native AI lets non-technical operators query recurring issues, per-vessel trends, open tickets, and historical logs without a custom analytics dashboard to build or maintain.",
        },
      ],
    },
  },
  {
    id: "surepath",
    number: "03",
    title: "SUREPATH",
    year: "2026",
    summary:
      "A privacy-first web application that helps justice-impacted applicants assemble pre-licensing review packets without exposing identity fields or criminal-history documents to persistent infrastructure.",
    visual: "image",
    image: "/assets/projects/surepath/surepath-arrow-logo.svg",
    video: "/assets/projects/surepath/surepath-video.mp4",
    videoPoster: "/assets/projects/surepath/surepath-video-poster.jpg",
    background: "#f4f1e8",
    foreground: "#0b0b0b",
    accent: "#c9a227",
    overview:
      "SurePath uses a deliberately stateless, browser-first architecture to generate state licensing packets while minimizing the sensitive data that reaches the network.",
    caseStudy: {
      liveUrl: "https://www.asurepath.com",
      sourceUrl: "https://github.com/InvoluntaryRecombinator/surepath",
      contextLabel: "PRIVACY MODEL",
      context:
        "Purposefully stateless and browser-first: identifying fields remain client-side, while the single networked interview receives only minimized incident context. No accounts, authentication, or persistent database.",
      problem: [
        "Justice-impacted individuals pursuing licensed trades face a paradox: the licensing board won't review a criminal record until you apply, and you can't apply until you've already paid for the training. The answer arrives after the money is spent, so most people never start.",
        "Several states have created a way to ask first—but the process is paper. Texas requires a request form, a separate questionnaire for every conviction and deferred adjudication no matter how old, a hand-written personal account for each one, and a separate $10 money order per license type. The pathway exists. The paperwork is what stops people from using it.",
      ],
      architecture: [
        { label: "Core Stack", value: "React, TypeScript, Vite, Tailwind CSS" },
        {
          label: "Document Processing",
          value: "pdf-lib — client-side AcroForm fill, flatten, and packet assembly",
        },
        {
          label: "AI Integration",
          value: "OpenAI API — single-purpose LLM interview with structured output",
        },
        {
          label: "Infrastructure",
          value: "Vercel-hosted; one stateless function with no database, accounts, or authentication",
        },
      ],
      execution: [
        {
          title: "Deep Data Minimization, Not Claimed Anonymity",
          description:
            "Identity fields never reach the network—the context builder receives the incident, not the applicant, so the code cannot send what it never touches. County, court, and exact dates are stripped because that tuple resolves against public court records. A server-side guard rejects identifier-shaped payloads, a CI test checks the serialized wire for leaks, and the SSN is never collected at all.",
        },
        {
          title: "Constrained Narrative Generation",
          description:
            "A focused interview elicits what happened and what has changed, pressing once on thin answers rather than accepting them. The model reorganizes the user's words and raises register, but cannot soften facts into euphemism or write remorse that was never expressed. Because the user signs the result as a full and accurate account, invented text is a legal harm—not a style problem.",
        },
        {
          title: "Inconsistent Government AcroForm Mapping",
          description:
            "Two state forms use incompatible conventions: one exposes semantic export values; the other uses /Choice1, /Choice2, and /Choice3, with /Choice1 meaning yes on one question and no on another. Values were derived from a field-probe render and verified against widget rectangle geometry. The fill routine zeroes every field before writing because the official blank templates were not blank.",
        },
        {
          title: "State-Agnostic Packet Assembly",
          description:
            "One computed plan drives both the assembled packet and its cover sheet, preventing page counts, signature locations, and SSN fill points from drifting from the documents behind them. Output is one print-ready packet per license type. Adding a state requires a configuration file—its forms, field map, and license list—not a rewrite.",
        },
      ],
    },
  },
  {
    id: "cleargrant",
    number: "04",
    title: "CLEARGRANT",
    year: "2026",
    summary:
      "An AI-assisted grant evaluation workspace that converts dense NOFOs and foundation guidelines into structured eligibility data, deterministic match labels, and source-grounded analysis.",
    visual: "image",
    image: "/assets/projects/cleargrant/cleargrant-document-check.svg",
    caseImage: "/assets/projects/cleargrant/cleargrant-chat.jpg",
    background: "#eef2f4",
    foreground: "#2d3748",
    accent: "#4ade80",
    overview:
      "ClearGrant helps small nonprofit teams extract, compare, and interrogate grant requirements before committing scarce staff time to an application.",
    caseStudy: {
      liveUrl: "https://cleargrant-analyzer.vercel.app",
      sourceUrl: "https://github.com/InvoluntaryRecombinator/cleargrant-analyzer",
      contextLabel: "SECURITY MODEL",
      context:
        "A bring-your-own-key architecture keeps operating overhead low. OpenAI keys are encrypted at rest with AES-256-GCM and decrypted only in server memory during active extraction requests.",
      problem: [
        "Grassroots nonprofits can spend hundreds of staff hours manually parsing dense federal NOFOs and foundation guidelines—often documents approaching 90 pages—before they know whether an opportunity is viable.",
        "Baseline constraints such as tax status, geography, registration, and funding limits are buried across files and webpages. Teams need a fast way to establish eligibility, preserve the source evidence, and identify unresolved criteria before investing in a full application.",
      ],
      architecture: [
        {
          label: "Core Stack",
          value: "Next.js App Router, React, TypeScript, Tailwind CSS",
        },
        {
          label: "Data & Auth",
          value: "Supabase Auth, PostgreSQL, Prisma ORM",
        },
        {
          label: "Document Processing",
          value: "pdf2json, Mammoth, and multi-source text normalization",
        },
        {
          label: "AI & Infrastructure",
          value: "OpenAI API, Vercel AI SDK, server-side routes, Vitest, and Vercel",
        },
      ],
      execution: [
        {
          title: "Evidence Normalization Across Formats",
          description:
            "The intake accepts official PDFs, DOCX files, and pasted solicitation text. Each source is converted into readable evidence blocks with its name and boundaries preserved before the documents are aggregated for analysis.",
        },
        {
          title: "Structured Requirement Extraction",
          description:
            "The extraction pipeline converts unstructured grant language into typed requirement categories, normalized values, source quotes, confidence levels, award metadata, and review notes. Overlapping or conflicting evidence is reconciled into one grant record that drives every downstream view.",
        },
        {
          title: "Deterministic Match Evaluation",
          description:
            "Normalized constraints are compared against the nonprofit's stored profile instead of asking the model to make the final eligibility decision. Explicit conflicts produce hard-no reasons, supported overlaps are recorded as passes, and requirements that cannot be compared safely are surfaced as Needs Review with their source evidence intact.",
        },
        {
          title: "Encrypted BYOK Lifecycle",
          description:
            "Workspace API keys are encrypted with AES-256-GCM using a random initialization vector and authenticated payload. Decryption occurs only in server memory for the active extraction request, and users can remove the stored key from settings at any time.",
        },
        {
          title: "Context-Aware Grant Assistant",
          description:
            "Each grant detail page includes a chat assistant grounded in the extracted opportunity and the organization's profile. It can explain match reasoning, clarify source language, and identify concrete compliance gaps without losing the context of the underlying grant record.",
        },
      ],
    },
  },
];
