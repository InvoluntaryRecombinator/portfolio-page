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

function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro-panels">
        <span className="intro-panel" />
        <span className="intro-panel" />
        <span className="intro-panel" />
        <span className="intro-panel" />
      </div>
      <div className="intro-grid">
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
    </div>
  );
}

type HeroPanel = "about" | "skills" | "working";

const heroPanelLabels: Array<{ id: HeroPanel; label: string }> = [
  { id: "about", label: "about me" },
  { id: "skills", label: "technical skills" },
  { id: "working", label: "working style" },
];

function HeroExplorer({
  activePanel,
  onSelect,
  skillsTreeRef,
}: {
  activePanel: HeroPanel | null;
  onSelect: (panel: HeroPanel) => void;
  skillsTreeRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="hero-explorer hero-reveal">
      <div className="hero-controls" aria-label="Portfolio information">
        {heroPanelLabels.map((panel) => (
          <button
            key={panel.id}
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
            <div className="about-tree-portrait">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/portfolio-pic-color.png" alt={`${siteContent.name} portrait`} />
            </div>
            <div className="about-tree-copy">
              <p>{siteContent.introduction}</p>
            </div>
            <div className="about-tree-location">
              <span>CURRENTLY RESIDING IN</span>
              <strong>{siteContent.location}</strong>
            </div>
          </div>
        </div>

        <div
          ref={skillsTreeRef}
          id="hero-panel-skills"
          className="hero-tree hero-tree-skills"
          aria-hidden={activePanel !== "skills"}
        >
          <svg className="hero-tree-lines" viewBox="0 0 900 300" preserveAspectRatio="none" aria-hidden="true">
            <path data-tree-level="0" pathLength="1" d="M0 99H100" />
            <path data-tree-level="0" pathLength="1" d="M100 36V230" />

            <path data-tree-level="1" pathLength="1" d="M100 36H245" />
            <path data-tree-level="1" pathLength="1" d="M100 130H245" />
            <path data-tree-level="1" pathLength="1" d="M100 230H245" />

            <path data-tree-level="2" pathLength="1" d="M405 36H535V18H675" />
            <path data-tree-level="2" pathLength="1" d="M535 36H675" />
            <path data-tree-level="2" pathLength="1" d="M535 36V68H675" />

            <path data-tree-level="2" pathLength="1" d="M405 130H535V106H675" />
            <path data-tree-level="2" pathLength="1" d="M535 130H675" />
            <path data-tree-level="2" pathLength="1" d="M535 130V154H675" />

            <path data-tree-level="2" pathLength="1" d="M405 230H535V206H675" />
            <path data-tree-level="2" pathLength="1" d="M535 230H675" />
            <path data-tree-level="2" pathLength="1" d="M535 230V254H675" />
          </svg>

          <span className="tree-node tree-node-category tree-category-languages">[ LANGUAGES ]</span>
          <span className="tree-node tree-node-category tree-category-systems">[ DATA + APIS ]</span>
          <span className="tree-node tree-node-category tree-category-workflow">[ WORKFLOW ]</span>

          <span className="tree-node tree-node-leaf tree-leaf-python">PYTHON</span>
          <span className="tree-node tree-node-leaf tree-leaf-javascript">JAVASCRIPT</span>
          <span className="tree-node tree-node-leaf tree-leaf-sql">SQL</span>

          <span className="tree-node tree-node-leaf tree-leaf-databases">RELATIONAL DATABASES</span>
          <span className="tree-node tree-node-leaf tree-leaf-apis">REST APIS</span>
          <span className="tree-node tree-node-leaf tree-leaf-extraction">STRUCTURED DATA EXTRACTION</span>

          <span className="tree-node tree-node-leaf tree-leaf-git">GIT</span>
          <span className="tree-node tree-node-leaf tree-leaf-terminal">TERMINAL</span>
          <span className="tree-node tree-node-leaf tree-leaf-ai">AI-ASSISTED DEVELOPMENT</span>

          <div className="skills-mobile-list">
            <div className="skills-mobile-group">
              <strong>LANGUAGES</strong>
              <span>Python / JavaScript / SQL</span>
            </div>
            <div className="skills-mobile-group">
              <strong>DATA + APIS</strong>
              <span>Relational databases / REST APIs / Structured data extraction</span>
            </div>
            <div className="skills-mobile-group">
              <strong>WORKFLOW</strong>
              <span>Git / Terminal / AI-assisted development</span>
            </div>
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
  const skillsTree = useRef<HTMLDivElement>(null);
  const skillsTimeline = useRef<gsap.core.Timeline | null>(null);
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

  useEffect(() => () => skillsTimeline.current?.kill(), []);

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
      introSafetyTimer = window.setTimeout(finishIntro, 6000);

      const introTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          if (introSafetyTimer) window.clearTimeout(introSafetyTimer);
          finishIntro();
        },
      });

      introTimeline
        .set(".intro", { autoAlpha: 1 })
        .from(".intro-kicker, .intro-count", {
          y: 18,
          autoAlpha: 0,
          duration: 0.45,
          stagger: 0.08,
        })
        .from(
          ".intro-word > span",
          {
            yPercent: 120,
            rotate: 2,
            duration: 0.75,
            stagger: 0.1,
            ease: "expo.out",
          },
          "-=0.18",
        )
        .from(".intro-foot span", { y: 12, autoAlpha: 0, duration: 0.4, stagger: 0.08 }, "-=0.3")
        .fromTo(
          ".intro-accent",
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.5, ease: "expo.inOut" },
          "-=0.25",
        )
        .to(
          ".intro-word > span",
          { yPercent: -125, duration: 0.55, stagger: 0.05, ease: "expo.in" },
          "+=0.3",
        )
        .to(".intro-grid", { autoAlpha: 0, duration: 0.22 }, "-=0.15")
        .to(
          ".intro-panel",
          {
            scaleY: 0,
            transformOrigin: "top center",
            duration: 0.95,
            stagger: 0.07,
            ease: "expo.inOut",
          },
          "-=0.02",
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

  const animateSkillsTree = (opening: boolean, onComplete?: () => void) => {
    const tree = skillsTree.current;
    if (!tree) {
      onComplete?.();
      return;
    }

    skillsTimeline.current?.kill();

    const levelZero = tree.querySelectorAll<SVGPathElement>('[data-tree-level="0"]');
    const levelOne = tree.querySelectorAll<SVGPathElement>('[data-tree-level="1"]');
    const levelTwo = tree.querySelectorAll<SVGPathElement>('[data-tree-level="2"]');
    const paths = tree.querySelectorAll<SVGPathElement>("[data-tree-level]");
    const categories = tree.querySelectorAll<HTMLElement>(".tree-node-category");
    const leaves = tree.querySelectorAll<HTMLElement>(".tree-node-leaf");
    const mobileGroups = tree.querySelectorAll<HTMLElement>(".skills-mobile-group");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compactLayout = window.matchMedia("(max-width: 840px)").matches;

    if (reduceMotion) {
      gsap.set(tree, { autoAlpha: opening ? 1 : 0 });
      gsap.set(paths, { strokeDasharray: 1, strokeDashoffset: opening ? 0 : 1 });
      gsap.set([...categories, ...leaves, ...mobileGroups], {
        autoAlpha: opening ? 1 : 0,
        y: 0,
      });
      onComplete?.();
      return;
    }

    if (compactLayout) {
      if (opening) {
        gsap.set(tree, { autoAlpha: 1 });
        gsap.set(mobileGroups, { autoAlpha: 0, y: 8 });
        skillsTimeline.current = gsap.timeline({ onComplete }).to(mobileGroups, {
          autoAlpha: 1,
          y: 0,
          duration: 0.38,
          stagger: 0.1,
          ease: "power3.out",
        });
        return;
      }

      skillsTimeline.current = gsap
        .timeline({ onComplete })
        .to(mobileGroups, {
          autoAlpha: 0,
          y: -6,
          duration: 0.22,
          stagger: { each: 0.05, from: "end" },
          ease: "power2.in",
        })
        .set(tree, { autoAlpha: 0 });
      return;
    }

    if (opening) {
      gsap.set(tree, { autoAlpha: 1 });
      gsap.set(paths, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set([...categories, ...leaves], { autoAlpha: 0, y: 8 });

      skillsTimeline.current = gsap
        .timeline({ onComplete })
        .to(levelZero, {
          strokeDashoffset: 0,
          duration: 0.34,
          stagger: 0.07,
          ease: "power2.inOut",
        })
        .to(levelOne, {
          strokeDashoffset: 0,
          duration: 0.38,
          stagger: 0.07,
          ease: "power2.inOut",
        }, "-=0.08")
        .to(categories, {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.08,
          ease: "power3.out",
        }, "-=0.24")
        .to(levelTwo, {
          strokeDashoffset: 0,
          duration: 0.48,
          stagger: 0.055,
          ease: "power2.inOut",
        }, "-=0.12")
        .to(leaves, {
          autoAlpha: 1,
          y: 0,
          duration: 0.28,
          stagger: 0.045,
          ease: "power3.out",
        }, "-=0.34");
      return;
    }

    skillsTimeline.current = gsap
      .timeline({ onComplete })
      .to([...leaves, ...categories], {
        autoAlpha: 0,
        y: -6,
        duration: 0.2,
        stagger: { each: 0.025, from: "end" },
        ease: "power2.in",
      })
      .to(paths, {
        strokeDashoffset: 1,
        duration: 0.4,
        stagger: { each: 0.025, from: "end" },
        ease: "power2.inOut",
      }, "-=0.08")
      .set(tree, { autoAlpha: 0 });
  };

  const selectHeroPanel = (panel: HeroPanel) => {
    const nextPanel = activeHeroPanel === panel ? null : panel;

    if (activeHeroPanel === "skills" && nextPanel !== "skills") {
      animateSkillsTree(false, () => setActiveHeroPanel(nextPanel));
      return;
    }

    setActiveHeroPanel(nextPanel);
    if (nextPanel === "skills") animateSkillsTree(true);
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
              skillsTreeRef={skillsTree}
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
