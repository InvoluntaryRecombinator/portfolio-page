# Portfolio Concept

An editorial portfolio prototype built with React, vinext, and GSAP. It includes
a coordinated opening sequence, scroll-triggered project reveals, flexible
artwork treatments, and full-screen project case studies.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Replace the placeholders

All names, profile copy, project summaries, colors, and project details live in
`app/content.ts`. Assets follow one convention:

```text
public/assets/                         # site-wide assets such as the portrait
public/assets/projects/grvl/           # GRVL media
public/assets/projects/fleetsync/      # FleetSync media
public/assets/projects/project-three/  # Project 03 media
public/assets/projects/project-four/   # Project 04 media
```

Each project chooses one visual treatment:

- `image` for supplied artwork such as the GRVL logo
- `type` for a typography-led fallback
- `grid` for a modular graphic fallback
- `orbit` for a line-based graphic fallback

An individual case study can be opened directly with
`/?project=PROJECT_ID`, for example `/?project=grvl`.

## Validation

```bash
npm run lint
npm run build
```
