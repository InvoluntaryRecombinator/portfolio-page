export type VisualKind = "image" | "fleetsync" | "type" | "grid" | "orbit";

export type Project = {
  id: string;
  number: string;
  title: string;
  year: string;
  summary: string;
  visual: VisualKind;
  image?: string;
  background: string;
  foreground: string;
  accent: string;
  overview: string;
};

export const siteContent = {
  name: "JORDON WALSH",
  role: "DESIGNER + DEVELOPER",
  location: "CALIFORNIA, USA",
  availability: "AVAILABLE FOR SELECTED WORK",
  statement: "BUILDING TECHNICAL SYSTEMS THAT WORK.",
  introduction:
    "I am a developer focused on building reliable web applications and structured data parsing systems. I prioritize clean database integrations and predictable execution over unnecessary complexity. Away from the keyboard, I am usually bouldering, snowboarding, or open-water diving.",
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
      "Replace this with a concise explanation of GRVL—what it is, what you made, and why the work matters.",
    visual: "image",
    image: "/assets/projects/grvl/paper-logo-dark.png",
    background: "#f0eee7",
    foreground: "#151512",
    accent: "#b8ff30",
    overview:
      "Use this space for the complete GRVL overview. Two or three focused paragraphs can explain the idea, the problem, and the finished experience without turning the case study into a wall of text.",
  },
  {
    id: "fleetsync",
    number: "02",
    title: "FLEETSYNC",
    year: "2026",
    summary:
      "Replace this with a concise explanation of FleetSync—what it does, what you designed, and why it matters.",
    visual: "fleetsync",
    background: "#000000",
    foreground: "#ffffff",
    accent: "#d45d31",
    overview: "",
  },
  {
    id: "project-three",
    number: "03",
    title: "PROJECT THREE",
    year: "2026",
    summary:
      "A short description of project three goes here. The visual system works even before final assets are available.",
    visual: "grid",
    background: "#ddd7ca",
    foreground: "#171713",
    accent: "#f0472e",
    overview:
      "Replace this with the complete project overview: the premise, the challenge, and the outcome in plain language.",
  },
  {
    id: "project-four",
    number: "04",
    title: "PROJECT FOUR",
    year: "2026",
    summary:
      "A short description of project four goes here. Later, replace only the content and artwork—not the interaction.",
    visual: "orbit",
    background: "#ef593d",
    foreground: "#171713",
    accent: "#f1eee5",
    overview:
      "Replace this with the complete project overview: the premise, the challenge, and the outcome in plain language.",
  },
];
