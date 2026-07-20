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
        <span className="artwork-coordinate">ASSET / 001</span>
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
        <span className="grid-label">IMAGE / MARK / OBJECT</span>
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
      <span className="orbit-label">A FLEXIBLE PLACE FOR YOUR ARTWORK</span>
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

export default function Portfolio() {
  const root = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isClosing, setIsClosing] = useState(false);

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

    const finishIntro = () => {
      document.body.classList.remove("intro-running");
      gsap.set(".intro", { display: "none" });
      gsap.set(".site-rule, .header-reveal, .hero-line > span, .hero-reveal", {
        clearProps: "opacity,visibility,transform",
      });
      ScrollTrigger.refresh();
    };

    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
          ".site-rule",
          { scaleX: 0, transformOrigin: "left center", duration: 0.75, stagger: 0.05 },
          "-=0.65",
        )
        .from(
          ".header-reveal",
          { y: 16, autoAlpha: 0, duration: 0.55, stagger: 0.06 },
          "-=0.64",
        )
        .from(
          ".hero-line > span",
          { yPercent: 115, duration: 0.85, stagger: 0.08, ease: "expo.out" },
          "-=0.52",
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

      gsap.to(".hero-statement", {
        yPercent: -9,
        opacity: 0.58,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
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

  const animateEmail = (target: HTMLAnchorElement, entering: boolean) => {
    gsap.to(target.querySelector(".email-roll-track"), {
      yPercent: entering ? -50 : 0,
      duration: 0.65,
      ease: "expo.out",
    });
    gsap.to(target.querySelector(".footer-email-arrow"), {
      x: entering ? 8 : 0,
      y: entering ? -8 : 0,
      duration: 0.65,
      ease: "expo.out",
    });
  };

  return (
    <div ref={root} className="portfolio-root">
      <Intro />

      <header className="site-header">
        <a className="site-name header-reveal" href="#top" aria-label="Back to top">
          {siteContent.name}
        </a>
        <div className="header-status header-reveal">
          {siteContent.role}
        </div>
        <nav className="site-nav header-reveal" aria-label="Primary navigation">
          <a href="#work">WORK</a>
          <a href="#contact">CONTACT</a>
          <a href="#contact">LINKEDIN ↗</a>
        </nav>
        <span className="site-rule" />
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-grid">
            <div className="hero-index hero-reveal">
              <span>PORTFOLIO</span>
              <span>SELECTED PROJECTS / 04</span>
            </div>

            <h1 id="hero-title" className="hero-statement">
              <span className="hero-line"><span>PUT YOUR</span></span>
              <span className="hero-line hero-line-shift"><span>SHARPEST IDEA</span></span>
              <span className="hero-line"><span>HERE.</span></span>
            </h1>

            <div className="hero-side hero-reveal">
              <span className="side-label">INTRODUCTION / 001</span>
              <p>{siteContent.introduction}</p>
              <div className="hero-details">
                <span>{siteContent.role}</span>
                <span>{siteContent.location}</span>
              </div>
            </div>

            <a className="scroll-cue hero-reveal" href="#work">
              <span className="scroll-arrow"><ScrollArrow /></span>
              <span className="scroll-cue-copy">
                <strong>VIEW SELECTED WORK</strong>
                <small>SCROLL DOWN</small>
              </span>
            </a>
          </div>
          <span className="site-rule hero-bottom-rule" />
        </section>

        <section id="work" className="work-section" aria-labelledby="work-title">
          <header className="work-heading">
            <span className="section-label">SELECTED WORK / 004</span>
            <h2 id="work-title">
              <span>PROJECT</span>
              <span>INDEX</span>
            </h2>
            <p>
              Each project has a concise preview here. Open one for the complete,
              full-screen case study.
            </p>
          </header>

          <div className="project-list">
            {projects.map((project) => (
              <article className="project-row" id={`project-${project.id}`} key={project.id}>
                <button className="project-trigger" onClick={() => openProject(project)}>
                  <div
                    className="project-visual"
                    style={{
                      "--project-bg": project.background,
                      "--project-fg": project.foreground,
                      "--project-accent": project.accent,
                    } as React.CSSProperties}
                  >
                    <ProjectArtwork project={project} />
                    <span className="visual-index">{project.number} / 04</span>
                    <span className="visual-action">VIEW CASE STUDY <Arrow /></span>
                  </div>

                  <div className="project-copy">
                    <div className="project-copy-top project-copy-reveal">
                      <span>{project.number}</span>
                      <span>{project.year}</span>
                    </div>
                    <h3 className="project-copy-reveal">{project.title}</h3>
                    <div className="project-copy-bottom project-copy-reveal">
                      <p>{project.summary}</p>
                      <span className="open-label">OPEN PROJECT <Arrow diagonal /></span>
                    </div>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </section>

        <footer id="contact" className="site-footer">
          <div className="footer-top">
            <span className="section-label">NEXT STEP / CONTACT</span>
            <span>{siteContent.availability}</span>
          </div>
          <p>WANT TO REACH OUT?</p>
          <a
            href={`mailto:${siteContent.email}`}
            aria-label="Send me an email"
            onMouseEnter={(event) => animateEmail(event.currentTarget, true)}
            onMouseLeave={(event) => animateEmail(event.currentTarget, false)}
          >
            <span className="email-roll-window">
              <span className="email-roll-track">
                <span>SEND ME AN EMAIL</span>
                <span aria-hidden="true">SEND ME AN EMAIL</span>
              </span>
            </span>
            <span className="footer-email-arrow"><Arrow diagonal /></span>
          </a>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} {siteContent.name}</span>
            <div>
              <a href="#contact">LINKEDIN ↗</a>
              <a href="#contact">RÉSUMÉ ↗</a>
            </div>
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
