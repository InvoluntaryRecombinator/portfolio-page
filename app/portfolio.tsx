"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, Project, siteContent } from "./content";
import FleetSyncLogo from "./fleetsync-logo";

gsap.registerPlugin(ScrollTrigger);

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={diagonal ? "arrow arrow-diagonal" : "arrow"}
      viewBox="0 0 24 24"
    >
      <path d="M4 12h15M13 5l7 7-7 7" />
    </svg>
  );
}

function ScrollArrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 64">
      <path d="M24 2v54M8 40l16 16 16-16" />
    </svg>
  );
}

function ProjectArtwork({ project, large = false }: { project: Project; large?: boolean }) {
  if (project.visual === "image") {
    return (
      <div className="artwork artwork-image">
        {/* The source artwork is already export-sized and must preserve its transparency. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.image} alt="GRVL project logo" />
      </div>
    );
  }

  if (project.visual === "fleetsync") {
    return <FleetSyncLogo animated={large} />;
  }

  if (project.visual === "type") {
    return (
      <div className="artwork artwork-type" aria-hidden="true">
        <span className="type-index">{project.number}</span>
        <div className="type-stack">
          <span>ADD YOUR</span>
          <span>ASSET HERE</span>
        </div>
        <span className="type-slash">/</span>
      </div>
    );
  }

  if (project.visual === "grid") {
    return (
      <div className="artwork artwork-grid" aria-hidden="true">
        <div className="grid-cross grid-cross-a" />
        <div className="grid-cross grid-cross-b" />
        <div className="grid-disc" />
        <div className="grid-block grid-block-a" />
        <div className="grid-block grid-block-b" />
      </div>
    );
  }

  return (
    <div className={`artwork artwork-orbit ${large ? "is-large" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 800 600">
        <ellipse cx="400" cy="300" rx="310" ry="150" />
        <ellipse cx="400" cy="300" rx="210" ry="260" transform="rotate(42 400 300)" />
        <circle cx="400" cy="300" r="63" />
        <circle className="orbit-dot" cx="704" cy="278" r="18" />
      </svg>
    </div>
  );
}

function IntroContent({ master = false }: { master?: boolean }) {
  return (
    <div className={`intro-grid ${master ? "intro-grid-master" : ""}`}>
      <span className="intro-kicker">PORTFOLIO / INDEX</span>
      <span className="intro-count">001—004</span>
      <div className="intro-title">
        <span className="intro-word"><span>YOUR</span></span>
        <span className="intro-word intro-word-right"><span>NAME</span></span>
      </div>
      <div className="intro-foot">
        <span>DESIGN + DEVELOPMENT</span>
        <span>ASSEMBLING INTERFACE</span>
      </div>
      <span className="intro-accent" />
    </div>
  );
}

function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro-panels">
        {[0, 1, 2, 3].map((column) => (
          <div
            className="intro-panel"
            key={column}
            style={{ "--intro-column": column } as React.CSSProperties}
          >
            <div className="intro-panel-content">
              <IntroContent />
            </div>
          </div>
        ))}
      </div>
      <IntroContent master />
    </div>
  );
}

type HeroPanel = "about" | "skills" | "working";

const heroPanelLabels: Array<{ id: HeroPanel; label: string }> = [
  { id: "about", label: "about me" },
  { id: "skills", label: "technical skills" },
  { id: "working", label: "working style" },
];

const skillGroups = [
  {
    id: "languages",
    label: "LANGUAGES & FRAMEWORKS",
    skills: ["PYTHON", "JAVASCRIPT", "REACT.JS / NODE.JS", "SQL", "JSON"],
  },
  {
    id: "systems",
    label: "DATA & AI SYSTEMS",
    skills: [
      "AGENTIC WORKFLOWS",
      "LLM EVALUATION & RED TEAMING",
      "PROMPT ENGINEERING",
      "STRUCTURED DATA EXTRACTION",
    ],
  },
  {
    id: "execution",
    label: "WORKFLOW & EXECUTION",
    skills: [
      "AI-ASSISTED DEVELOPMENT",
      "QUALITY AUDITING",
      "INFORMATION RETRIEVAL & SYNTHESIS",
      "PROJECT COORDINATION",
    ],
  },
] as const;

type AboutConnectorGeometry = {
  width: number;
  height: number;
  startX: number;
  startY: number;
  trunkX: number;
  portraitX: number;
  portraitY: number;
  copyX: number;
  copyY: number;
  locationX: number;
  locationY: number;
};

type SkillsConnectorGroupGeometry = {
  categoryStartX: number;
  categoryEndX: number;
  categoryY: number;
  leafTrunkX: number;
  leafTop: number;
  leafBottom: number;
  leaves: Array<{ x: number; y: number }>;
};

type SkillsConnectorGeometry = {
  width: number;
  height: number;
  startX: number;
  startY: number;
  trunkX: number;
  groups: SkillsConnectorGroupGeometry[];
};

function HeroExplorer({
  activePanel,
  onSelect,
}: {
  activePanel: HeroPanel | null;
  onSelect: (panel: HeroPanel) => void;
}) {
  const explorerRef = useRef<HTMLDivElement>(null);
  const aboutControlRef = useRef<HTMLButtonElement>(null);
  const skillsControlRef = useRef<HTMLButtonElement>(null);
  const skillsPanelRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const [aboutConnector, setAboutConnector] = useState<AboutConnectorGeometry | null>(null);
  const [skillsConnector, setSkillsConnector] = useState<SkillsConnectorGeometry | null>(null);
  const controlsOffset = 56;

  useLayoutEffect(() => {
    if (activePanel !== "about") return;

    const explorer = explorerRef.current;
    const control = aboutControlRef.current;
    const portrait = portraitRef.current;
    const copy = copyRef.current;
    const location = locationRef.current;
    if (!explorer || !control || !portrait || !copy || !location) return;

    let frame = 0;
    const measure = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const explorerRect = explorer.getBoundingClientRect();
        const controlRect = control.getBoundingClientRect();
        const portraitRect = portrait.getBoundingClientRect();
        const copyRect = copy.getBoundingClientRect();
        const locationRect = location.getBoundingClientRect();
        const relativeLeft = (rect: DOMRect) => Math.round(rect.left - explorerRect.left);
        const relativeCenterY = (rect: DOMRect) =>
          Math.round(rect.top + rect.height / 2 - explorerRect.top);
        const terminalGap = 22;
        const startX = Math.round(controlRect.right - explorerRect.left);
        const nearestTargetX = Math.min(
          relativeLeft(portraitRect),
          relativeLeft(copyRect),
          relativeLeft(locationRect),
        );
        const availableGap = nearestTargetX - startX;
        const trunkX = Math.round(startX + availableGap * 0.52);

        setAboutConnector({
          width: Math.round(explorerRect.width),
          height: Math.ceil(Math.max(explorerRect.height, locationRect.bottom - explorerRect.top)),
          startX,
          startY: relativeCenterY(controlRect),
          trunkX,
          portraitX: relativeLeft(portraitRect) - terminalGap,
          portraitY: relativeCenterY(portraitRect),
          copyX: relativeLeft(copyRect) - terminalGap,
          copyY: relativeCenterY(copyRect),
          locationX: relativeLeft(locationRect) - terminalGap,
          locationY: relativeCenterY(locationRect),
        });
      });
    };

    const resizeObserver = new ResizeObserver(measure);
    [explorer, control, portrait, copy, location].forEach((element) => resizeObserver.observe(element));
    window.addEventListener("resize", measure);
    measure();

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [activePanel, controlsOffset]);

  useLayoutEffect(() => {
    if (activePanel !== "skills") return;

    const explorer = explorerRef.current;
    const control = skillsControlRef.current;
    const panel = skillsPanelRef.current;
    if (!explorer || !control || !panel) return;

    const categories = skillGroups.map((group) =>
      panel.querySelector<HTMLElement>(`[data-skill-category="${group.id}"]`),
    );
    const leafGroups = skillGroups.map((group) =>
      Array.from(panel.querySelectorAll<HTMLElement>(`[data-skill-leaf="${group.id}"]`)),
    );
    if (categories.some((category) => !category) || leafGroups.some((leaves) => leaves.length === 0)) return;

    let frame = 0;
    const measure = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const explorerRect = explorer.getBoundingClientRect();
        const controlRect = control.getBoundingClientRect();
        const relativeLeft = (rect: DOMRect) => Math.round(rect.left - explorerRect.left);
        const relativeRight = (rect: DOMRect) => Math.round(rect.right - explorerRect.left);
        const relativeCenterY = (rect: DOMRect) =>
          Math.round(rect.top + rect.height / 2 - explorerRect.top);
        const labelGap = 14;
        const terminalGap = 16;

        const groups = skillGroups.map((_, index) => {
          const categoryRect = categories[index]!.getBoundingClientRect();
          const leafRects = leafGroups[index].map((leaf) => leaf.getBoundingClientRect());
          const leaves = leafRects.map((rect) => ({
            x: relativeLeft(rect) - terminalGap,
            y: relativeCenterY(rect),
          }));
          const categoryStartX = relativeLeft(categoryRect) - labelGap;
          const categoryEndX = relativeRight(categoryRect) + labelGap;
          const nearestLeafX = Math.min(...leaves.map((leaf) => leaf.x));

          return {
            categoryStartX,
            categoryEndX,
            categoryY: relativeCenterY(categoryRect),
            leafTrunkX: Math.round(categoryEndX + (nearestLeafX - categoryEndX) * 0.5),
            leafTop: Math.min(...leaves.map((leaf) => leaf.y)),
            leafBottom: Math.max(...leaves.map((leaf) => leaf.y)),
            leaves,
          };
        });

        const startX = Math.round(controlRect.right - explorerRect.left);
        const nearestCategoryX = Math.min(...groups.map((group) => group.categoryStartX));
        const trunkX = Math.round(startX + (nearestCategoryX - startX) * 0.5);
        const bottommostLeaf = Math.max(...leafGroups.flat().map((leaf) => leaf.getBoundingClientRect().bottom));

        setSkillsConnector({
          width: Math.round(explorerRect.width),
          height: Math.ceil(Math.max(explorerRect.height, bottommostLeaf - explorerRect.top)),
          startX,
          startY: relativeCenterY(controlRect),
          trunkX,
          groups,
        });
      });
    };

    const resizeObserver = new ResizeObserver(measure);
    [explorer, control, panel, ...categories, ...leafGroups.flat()].forEach((element) => {
      if (element) resizeObserver.observe(element);
    });
    window.addEventListener("resize", measure);
    measure();

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [activePanel, controlsOffset]);

  const connectorTop = aboutConnector
    ? Math.min(aboutConnector.startY, aboutConnector.portraitY, aboutConnector.copyY, aboutConnector.locationY)
    : 0;
  const connectorBottom = aboutConnector
    ? Math.max(aboutConnector.startY, aboutConnector.portraitY, aboutConnector.copyY, aboutConnector.locationY)
    : 0;
  const skillsConnectorTop = skillsConnector
    ? Math.min(skillsConnector.startY, ...skillsConnector.groups.map((group) => group.categoryY))
    : 0;
  const skillsConnectorBottom = skillsConnector
    ? Math.max(skillsConnector.startY, ...skillsConnector.groups.map((group) => group.categoryY))
    : 0;

  return (
    <div
      ref={explorerRef}
      className={`hero-explorer hero-reveal ${activePanel ? `is-${activePanel}-panel` : ""}`}
      style={{ "--hero-controls-offset": `${controlsOffset}px` } as React.CSSProperties}
    >
      {aboutConnector ? (
        <svg
          className={`about-connector ${activePanel === "about" ? "is-visible" : ""}`}
          viewBox={`0 0 ${aboutConnector.width} ${aboutConnector.height}`}
          width={aboutConnector.width}
          height={aboutConnector.height}
          aria-hidden="true"
        >
          <path d={`M${aboutConnector.startX} ${aboutConnector.startY}H${aboutConnector.trunkX}`} />
          <path d={`M${aboutConnector.trunkX} ${connectorTop}V${connectorBottom}`} />
          <path d={`M${aboutConnector.trunkX} ${aboutConnector.portraitY}H${aboutConnector.portraitX}`} />
          <path d={`M${aboutConnector.trunkX} ${aboutConnector.copyY}H${aboutConnector.copyX}`} />
          <path d={`M${aboutConnector.trunkX} ${aboutConnector.locationY}H${aboutConnector.locationX}`} />
        </svg>
      ) : null}

      {skillsConnector ? (
        <svg
          className={`skills-connector ${activePanel === "skills" ? "is-visible" : ""}`}
          viewBox={`0 0 ${skillsConnector.width} ${skillsConnector.height}`}
          width={skillsConnector.width}
          height={skillsConnector.height}
          aria-hidden="true"
        >
          <path d={`M${skillsConnector.startX} ${skillsConnector.startY}H${skillsConnector.trunkX}`} />
          <path d={`M${skillsConnector.trunkX} ${skillsConnectorTop}V${skillsConnectorBottom}`} />
          {skillsConnector.groups.map((group, groupIndex) => (
            <g key={skillGroups[groupIndex].id}>
              <path d={`M${skillsConnector.trunkX} ${group.categoryY}H${group.categoryStartX}`} />
              <path d={`M${group.categoryEndX} ${group.categoryY}H${group.leafTrunkX}`} />
              <path d={`M${group.leafTrunkX} ${group.leafTop}V${group.leafBottom}`} />
              {group.leaves.map((leaf, leafIndex) => (
                <path
                  key={`${skillGroups[groupIndex].id}-${leafIndex}`}
                  d={`M${group.leafTrunkX} ${leaf.y}H${leaf.x}`}
                />
              ))}
            </g>
          ))}
        </svg>
      ) : null}

      <div className="hero-controls" aria-label="Portfolio information">
        {heroPanelLabels.map((panel) => (
          <button
            key={panel.id}
            ref={
              panel.id === "about"
                ? aboutControlRef
                : panel.id === "skills"
                  ? skillsControlRef
                  : undefined
            }
            type="button"
            className={`hero-control ${activePanel === panel.id ? "is-active" : ""}`}
            aria-expanded={activePanel === panel.id}
            aria-controls={`hero-panel-${panel.id}`}
            onClick={() => onSelect(panel.id)}
          >
            <span className="hero-control-symbol" aria-hidden="true">
              {activePanel === panel.id ? "−" : "+"}
            </span>
            <span>[ {panel.label} ]</span>
          </button>
        ))}
      </div>

      <div
        className={`hero-diagram ${activePanel ? "has-active-panel" : ""} ${
          activePanel ? `is-${activePanel}-panel` : ""
        }`}
      >
        <div
          id="hero-panel-about"
          className={`hero-tree hero-tree-about ${activePanel === "about" ? "is-active" : ""}`}
          aria-hidden={activePanel !== "about"}
        >
          <div className="about-profile">
            <div ref={portraitRef} className="about-tree-portrait">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/portfolio-pic-color.png" alt={`${siteContent.name} portrait`} />
            </div>
            <div ref={copyRef} className="about-tree-copy">
              <p>{siteContent.introduction}</p>
            </div>
            <div ref={locationRef} className="about-tree-location">
              <span>CURRENTLY RESIDING IN</span>
              <strong>{siteContent.location}</strong>
            </div>
          </div>
        </div>

        <div
          ref={skillsPanelRef}
          id="hero-panel-skills"
          className={`hero-tree hero-tree-skills ${activePanel === "skills" ? "is-active" : ""}`}
          aria-hidden={activePanel !== "skills"}
        >
          <div className="skills-taxonomy">
            {skillGroups.map((group) => (
              <div className="skills-taxonomy-group" key={group.id}>
                <span className="skills-category-label" data-skill-category={group.id}>
                  [ {group.label} ]
                </span>
                <div className="skills-leaves">
                  {group.skills.map((skill) => (
                    <span className="skills-leaf-label" data-skill-leaf={group.id} key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="skills-mobile-list">
            {skillGroups.map((group) => (
              <div className="skills-mobile-group" key={group.id}>
                <strong>{group.label}</strong>
                <span>{group.skills.join(" / ")}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          id="hero-panel-working"
          className={`hero-tree hero-tree-working ${activePanel === "working" ? "is-active" : ""}`}
          aria-hidden={activePanel !== "working"}
        >
          <svg className="hero-tree-lines" viewBox="0 0 900 300" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 172H115V62" />
            <path d="M115 62H330" />
            <path d="M115 150H430" />
            <path d="M115 238H360" />
          </svg>
          <div className="working-node working-node-requirements">
            <span>01</span>
            <strong>CLEAR REQUIREMENTS</strong>
          </div>
          <div className="working-node working-node-execution">
            <span>02</span>
            <strong>INDEPENDENT EXECUTION</strong>
          </div>
          <div className="working-node working-node-delivery">
            <span>03</span>
            <strong>RELIABLE DELIVERY</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const root = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [activeHeroPanel, setActiveHeroPanel] = useState<HeroPanel | null>(null);

  const closeProject = useCallback(() => {
    if (!overlay.current || isClosing) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSelectedProject(null);
      window.history.replaceState({}, "", window.location.pathname);
      return;
    }

    setIsClosing(true);
    const titleWords = overlay.current.querySelectorAll(".case-title > .case-title-word > span");
    const closingTimeline = gsap.timeline({
      onComplete: () => {
        setSelectedProject(null);
        setIsClosing(false);
        window.history.replaceState({}, "", window.location.pathname);
      },
    });

    if (titleWords.length) {
      closingTimeline.to(titleWords, {
        yPercent: -120,
        duration: 0.42,
        stagger: 0.035,
        ease: "expo.in",
      });
    }

    closingTimeline.to(
      overlay.current,
      { clipPath: "inset(0 0 100% 0)", duration: 0.78, ease: "expo.inOut" },
      titleWords.length ? "-=0.12" : 0,
    );
  }, [isClosing]);

  useEffect(() => {
    const projectId = new URLSearchParams(window.location.search).get("project");
    const linkedProject = projects.find((project) => project.id === projectId);
    if (!linkedProject) return;
    const deepLinkTimer = window.setTimeout(() => setSelectedProject(linkedProject), 0);
    return () => window.clearTimeout(deepLinkTimer);
  }, []);

  useLayoutEffect(() => {
    let introSafetyTimer: number | undefined;
    let workHeading: HTMLElement | null = null;

    const finishIntro = () => {
      document.body.classList.remove("intro-running");
      gsap.set(".intro", { display: "none" });
      gsap.set(".header-reveal, .hero-statement, .hero-reveal", {
        clearProps: "opacity,visibility,transform,filter,--hero-bloom-position",
      });
      ScrollTrigger.refresh();
    };

    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      workHeading = document.querySelector<HTMLElement>(".work-heading");
      if (workHeading) {
        const setWorkHeadingFilled = (filled: boolean) => {
          workHeading?.classList.toggle("is-chroma-filled", filled);
        };

        ScrollTrigger.create({
          trigger: workHeading,
          start: "center center",
          end: "max",
          onEnter: () => setWorkHeadingFilled(true),
          onEnterBack: () => setWorkHeadingFilled(true),
          onLeaveBack: () => setWorkHeadingFilled(false),
          onRefresh: (self) => setWorkHeadingFilled(self.scroll() >= self.start),
        });
      }

      if (reduceMotion) {
        finishIntro();
        return;
      }

      document.body.classList.add("intro-running");
      introSafetyTimer = window.setTimeout(finishIntro, 8000);

      const introTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          if (introSafetyTimer) window.clearTimeout(introSafetyTimer);
          finishIntro();
        },
      });

      introTimeline
        .set(".intro", { autoAlpha: 1 })
        .from(".intro-grid-master .intro-kicker, .intro-grid-master .intro-count", {
          y: 18,
          autoAlpha: 0,
          duration: 0.45,
          stagger: 0.08,
        })
        .from(
          ".intro-grid-master .intro-word > span",
          {
            yPercent: 120,
            rotate: 2,
            duration: 0.75,
            stagger: 0.1,
            ease: "expo.out",
          },
          "-=0.18",
        )
        .from(
          ".intro-grid-master .intro-foot span",
          { y: 12, autoAlpha: 0, duration: 0.4, stagger: 0.08 },
          "-=0.3",
        )
        .fromTo(
          ".intro-grid-master .intro-accent",
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.5, ease: "expo.inOut" },
          "-=0.25",
        )
        .set(".intro-panel-content", { autoAlpha: 1 }, "+=1.3")
        .set(".intro-grid-master", { autoAlpha: 0 }, "<")
        .to(
          ".intro-panel",
          {
            yPercent: -100,
            duration: 1.24,
            stagger: 0.15,
            ease: "expo.inOut",
          },
          "<",
        )
        .from(
          ".header-reveal",
          { y: 16, autoAlpha: 0, duration: 0.55, stagger: 0.06 },
          "-=0.64",
        )
        .fromTo(
          ".hero-statement",
          {
            "--hero-bloom-position": "100%",
            autoAlpha: 0.7,
            filter: "blur(6px)",
          },
          {
            "--hero-bloom-position": "0%",
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 1.8,
            ease: "power2.inOut",
          },
          "-=0.62",
        )
        .from(
          ".hero-reveal",
          { y: 24, autoAlpha: 0, duration: 0.6, stagger: 0.08 },
          "-=0.58",
        );

      gsap.to(".scroll-arrow svg", {
        y: 9,
        duration: 0.95,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.utils.toArray<HTMLElement>(".project-row").forEach((row) => {
        const visual = row.querySelector(".project-visual");
        const artwork = row.querySelector(".artwork");
        const copy = row.querySelectorAll(".project-copy-reveal");

        gsap.from(visual, {
          clipPath: "inset(0 0 100% 0)",
          y: 56,
          duration: 1.15,
          ease: "expo.out",
          scrollTrigger: { trigger: row, start: "top 78%", once: true },
        });
        gsap.from(artwork, {
          scale: 1.12,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 78%", once: true },
        });
        gsap.from(copy, {
          y: 30,
          autoAlpha: 0,
          duration: 0.75,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 72%", once: true },
        });
      });
    }, root);

    return () => {
      if (introSafetyTimer) window.clearTimeout(introSafetyTimer);
      document.body.classList.remove("intro-running");
      workHeading?.classList.remove("is-chroma-filled");
      context.revert();
    };
  }, []);

  useLayoutEffect(() => {
    if (!selectedProject || !overlay.current) return;

    const detail = overlay.current;
    const context = gsap.context(() => {
      gsap.set(detail, { display: "block", autoAlpha: 1 });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(detail, { clipPath: "inset(0% 0 0 0)" });
        return;
      }

      const titleWords = detail.querySelectorAll(".case-title > .case-title-word > span");
      const entranceTimeline = gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo(
          detail,
          { clipPath: "inset(100% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", duration: 0.95 },
        )
        .from(detail.querySelector(".case-topline"), { scaleX: 0, transformOrigin: "left center", duration: 0.65 }, "-=0.48");

      if (titleWords.length) {
        entranceTimeline.from(
          titleWords,
          { yPercent: 115, duration: 0.78, stagger: 0.05 },
          "-=0.5",
        );
      }

      entranceTimeline
        .from(detail.querySelectorAll(".case-meta > *"), { y: 20, autoAlpha: 0, duration: 0.5, stagger: 0.06 }, "-=0.48")
        .from(detail.querySelector(".case-artwork"), { clipPath: "inset(0 0 100% 0)", y: 42, duration: 0.9 }, "-=0.44")
        .from(detail.querySelector(".case-artwork .artwork"), { scale: 1.1, duration: 1.1 }, "-=0.88");
    }, detail);

    window.setTimeout(() => closeButton.current?.focus(), 900);
    return () => context.revert();
  }, [selectedProject]);

  useEffect(() => {
    if (!selectedProject) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeProject();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProject, closeProject]);

  const openProject = (project: Project) => {
    if (selectedProject) return;
    window.history.replaceState({}, "", `${window.location.pathname}?project=${project.id}`);
    setSelectedProject(project);
  };

  const selectHeroPanel = (panel: HeroPanel) => {
    const nextPanel = activeHeroPanel === panel ? null : panel;
    setActiveHeroPanel(nextPanel);
  };

  return (
    <div ref={root} className="portfolio-root">
      <Intro />

      <header className="site-header">
        <div className="site-identity header-reveal">
          <span className="availability-status">
            <span className="availability-dot" aria-hidden="true" />
            {siteContent.availability}
          </span>
          <a className="site-name" href="#top" aria-label="Back to top">
            {siteContent.name}
          </a>
        </div>
        <nav className="site-nav header-reveal" aria-label="Primary navigation">
          <a href="#work">PROJECTS <Arrow diagonal /></a>
          <a href="#contact">CONTACT <Arrow diagonal /></a>
          <a href="#contact">LINKEDIN <Arrow diagonal /></a>
          <a href="#contact">GITHUB <Arrow diagonal /></a>
          <a href="#contact">RÉSUMÉ <Arrow diagonal /></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-grid">
            <div className="hero-index hero-reveal">
              <span>PORTFOLIO / 2026</span>
            </div>

            <h1 id="hero-title" className="hero-statement">
              <span className="hero-line"><span>BUILDING TECHNICAL</span></span>
              <span className="hero-line"><span>SYSTEMS THAT WORK.</span></span>
            </h1>

            <HeroExplorer
              activePanel={activeHeroPanel}
              onSelect={selectHeroPanel}
            />

            <a className="scroll-cue hero-reveal" href="#work">
              <span className="scroll-arrow"><ScrollArrow /></span>
              <span className="scroll-cue-copy">
                <strong>VIEW PROJECTS</strong>
                <small>SCROLL DOWN</small>
              </span>
            </a>
          </div>
        </section>

        <section id="work" className="work-section" aria-labelledby="work-title">
          <header className="work-heading">
            <h2 id="work-title" data-text="PROJECT INDEX">PROJECT INDEX</h2>
          </header>

          <div className="project-list">
            {projects.map((project) => (
              <article className="project-row" id={`project-${project.id}`} key={project.id}>
                <button className="project-trigger" onClick={() => openProject(project)}>
                  <div className="project-media">
                    <div
                      className="project-visual"
                      style={{
                        "--project-bg": project.background,
                        "--project-fg": project.foreground,
                        "--project-accent": project.accent,
                      } as React.CSSProperties}
                    >
                      <ProjectArtwork project={project} />
                    </div>
                    <span className="project-media-action project-copy-reveal">
                      LEARN MORE ABOUT THIS PROJECT <Arrow />
                    </span>
                  </div>

                  <div className="project-copy">
                    <div className="project-copy-top project-copy-reveal">
                      <h3>
                        PROJECT {project.number.padStart(3, "0")} / {project.title}
                      </h3>
                      <span>{project.year}</span>
                    </div>
                    <div className="project-copy-body project-copy-reveal">
                      <p>{project.summary}</p>
                    </div>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </section>

        <footer id="contact" className="site-footer">
          <div className="footer-top">
            <span>WANT TO GET IN TOUCH?</span>
          </div>
          <a
            href={`mailto:${siteContent.email}`}
            aria-label="Send me an email"
          >
            <span className="email-chroma-text" data-text="SEND ME AN EMAIL">
              SEND ME AN EMAIL
            </span>
            <span className="footer-email-arrow"><Arrow diagonal /></span>
          </a>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} {siteContent.name}</span>
            <a href="#top">BACK TO TOP ↑</a>
          </div>
        </footer>
      </main>

      {selectedProject && (
        <div
          ref={overlay}
          className="case-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedProject.title} case study`}
          style={{
            "--project-bg": selectedProject.background,
            "--project-fg": selectedProject.foreground,
            "--project-accent": selectedProject.accent,
          } as React.CSSProperties}
        >
          <div className="case-scroller">
            <header className="case-header">
              <span>{siteContent.name}</span>
              <span>CASE STUDY / {selectedProject.number}</span>
              <button ref={closeButton} onClick={closeProject} aria-label="Close project">
                CLOSE <span className="close-icon">×</span>
              </button>
              <span className="case-topline" />
            </header>

            <section className="case-hero">
              <div className="case-meta">
                <span>PROJECT / {selectedProject.number}</span>
                <span>{selectedProject.year}</span>
              </div>
              {selectedProject.visual !== "image" && selectedProject.visual !== "fleetsync" && (
                <h2 id="case-title" className="case-title">
                  {selectedProject.title.split(" ").map((word, index) => (
                    <span className="case-title-word" key={`${word}-${index}`}><span>{word}</span></span>
                  ))}
                </h2>
              )}
              <div className="case-artwork">
                <ProjectArtwork project={selectedProject} large />
              </div>
            </section>

            <section className={`case-body${selectedProject.id === "fleetsync" ? " case-body-empty" : ""}`}>
              {selectedProject.id === "fleetsync" ? (
                <div className="case-empty-space">
                  <span className="section-label">PROJECT DETAILS / 001</span>
                </div>
              ) : (
                <>
                  <div className="case-lead">
                    <span className="section-label">OVERVIEW / 001</span>
                    <p>{selectedProject.overview}</p>
                  </div>
                  <div className="case-placeholder">
                    <span>PROJECT IMAGE / 002</span>
                    <p>ONE STRONG PROJECT IMAGE CAN LIVE HERE.</p>
                  </div>
                </>
              )}
              <div className="case-end">
                <span>END OF PROJECT / {selectedProject.number}</span>
                <button onClick={closeProject}>BACK TO PROJECTS <Arrow /></button>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
