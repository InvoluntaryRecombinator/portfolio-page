<p align="center">
  <img src="public/assets/favicon.svg" width="72" alt="Jordon Walsh portfolio mark" />
</p>

<h1 align="center">Jordon Walsh — Portfolio</h1>

<p align="center">
  An interactive, editorial portfolio built to put the useful information first:
  who I am, how I work, what I build, and the projects that prove it.
</p>

<p align="center">
  <code>React 19</code> · <code>TypeScript</code> · <code>GSAP</code> ·
  <code>vinext</code> · <code>Cloudflare Workers</code>
</p>

![Technical skills tree open inside the portfolio](public/screenshot.jpeg)

## The idea

This portfolio avoids hiding the important material behind a long biography or
several conventional pages. The opening screen behaves like a compact technical
map: **About Me**, **Technical Skills**, and **Working Style** can each be expanded
in place, while the project index begins immediately below them.

The result is intentionally direct. A visitor can understand the person, scan
the stack, see the working process, and enter a case study without hunting for
the relevant section.

## Interaction system

| Surface | Behavior |
| --- | --- |
| Opening sequence | A staggered column wipe reveals the page while the name remains anchored to the header. |
| Information trees | Orthogonal SVG branches build outward from the selected control, then reverse cleanly when collapsed. |
| Project index | Scroll-triggered reveals introduce each project while a restrained green-to-gold chroma treatment connects the index, header, and contact area. |
| Case studies | Each project opens in a full-screen detail layer with project-specific artwork and motion. |
| Reduced motion | Visitors who request reduced motion receive the same content without the choreographed transitions. |

### Project-specific motion

- **GRVL** opens with a delayed, chrome-free case-study film that plays once and
  rests on its final frame.
- **FleetSync** uses a custom nautilus SVG whose paths assemble from the center
  outward, with a replay control inside the case study.
- Project rows combine alternating editorial layouts with independent artwork,
  copy, and scroll-triggered entrance timing.

## How the animation works

The motion is structural rather than decorative:

- GSAP timelines coordinate the intro, expandable information panels, project
  reveals, case-study transitions, and reversible close states.
- SVG paths are drawn with `stroke-dasharray` and `stroke-dashoffset`, creating
  the effect of a diagram building itself in stages.
- `ResizeObserver` measurements keep the connectors attached to their labels as
  the viewport and typography change.
- `ScrollTrigger` controls project entrances and the persistent Project Index
  color state.
- CSS media queries and runtime checks respect `prefers-reduced-motion`.

## Tech stack

| Layer | Tools |
| --- | --- |
| Interface | React 19, TypeScript, semantic HTML |
| Motion | GSAP 3, ScrollTrigger, SVG path animation |
| Styling | Hand-authored responsive CSS, CSS masks, fluid typography |
| Application build | vinext, Next.js 16, Vite 8 |
| Deployment target | Cloudflare Workers-compatible ESM output |
| Quality | ESLint, TypeScript, production build validation |

## Project structure

```text
app/
├── content.ts             # project metadata and case-study content
├── fleetsync-logo.tsx     # animated FleetSync SVG component
├── globals.css            # layout, visual system, and responsive states
└── portfolio.tsx          # portfolio UI, geometry, and GSAP timelines

public/
├── screenshot.jpeg        # canonical repository preview
└── assets/
    ├── portfolio-pic-color.png
    └── projects/
        ├── fleetsync/
        ├── grvl/
        ├── project-three/
        └── project-four/

worker/
└── index.ts               # Cloudflare Worker entry point
```

Project media stays isolated by project so artwork and case-study assets can be
replaced without restructuring the application.

## Run locally

Requires Node.js `22.13.0` or newer.

```bash
git clone https://github.com/InvoluntaryRecombinator/portfolio-page.git
cd portfolio-page
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

An individual case study can also be opened directly:

```text
http://localhost:3000/?project=grvl
http://localhost:3000/?project=fleetsync
```

## Validation

```bash
npm run lint
npm run build
```

The portfolio is actively being developed. GRVL and FleetSync contain custom
media treatments; Projects 03 and 04 currently preserve the final interaction
and layout while their content is being prepared.
