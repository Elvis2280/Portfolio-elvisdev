# Portfolio Website

A personal portfolio built with Next.js, Tailwind CSS, Sanity CMS, and Spotify integration. Designed with atomic architecture principles and space-themed animations.

## Tech Stack

| Category             | Technology                                     |
| -------------------- | ---------------------------------------------- |
| **Framework**        | Next.js 16.2.4 (App Router)                    |
| **Language**         | TypeScript                                     |
| **UI Library**       | React 19.2.4                                   |
| **Styling**          | Tailwind CSS 4 (CSS-first config)              |
| **UI Components**    | shadcn 4.3.0, Radix UI 1.4.3                   |
| **Icons**            | lucide-react, react-icons                      |
| **Animations**       | GSAP 3.15.0 (ScrollTrigger, MotionPathPlugin)  |
| **CSS Animations**   | tw-animate-css                                 |
| **CMS**              | Sanity 5.31.1 (next-sanity 13.1.1)             |
| **Forms**            | react-hook-form, yup, @hookform/resolvers      |
| **CSS Utilities**    | clsx, tailwind-merge, class-variance-authority |
| **Styling (Studio)** | styled-components                              |
| **Linting**          | ESLint 9 (flat config)                         |
| **Formatting**       | Prettier                                       |
| **Package Manager**  | pnpm                                           |
| **Git Hooks**        | Husky + lint-staged                            |

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Copy environment variables and fill them in
cp .env.example .env.local

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

### Sanity Studio

The Sanity Studio runs embedded at `/studio` during development:

```bash
pnpm dev
# Open http://localhost:3000/studio
```

Alternatively, run it standalone for faster hot-reload (defaults to localhost:3333):

```bash
npx sanity dev
```

---

## Sanity CMS

Content is managed through [Sanity](https://www.sanity.io/), a headless CMS with a real-time collaborative Studio.

### Configuration

| Setting       | Value                              |
| ------------- | ---------------------------------- |
| **Project**   | `dr96ktqk`                         |
| **Dataset**   | `production`                       |
| **API Vers.** | `2026-06-23`                       |
| **Studio**    | Embedded at `/studio` (App Router) |
| **CDN**       | Enabled (`useCdn: true`)           |

### Schema Types

#### `project`

| Field          | Type               | Validation                         |
| -------------- | ------------------ | ---------------------------------- |
| `title`        | `string`           | Required                           |
| `subtitle`     | `string`           | —                                  |
| `slug`         | `slug`             | Auto from title, required          |
| `status`       | `string` (radio)   | Required: `unfinished`, `finished` |
| `techStack`    | `array` of strings | Unique (tags layout)               |
| `projectLink`  | `url`              | http/https scheme                  |
| `previewImage` | `image` (hotspot)  | Required alt text                  |
| `heroImage`    | `image` (hotspot)  | Required alt text                  |
| `content`      | Portable Text      | Rich text (headings, lists, links) |

### Studio Plugins

- **Structure Tool** — Document list sidebar
- **Vision** — GROQ query playground

### Live Content API

Real-time content updates are set up via `sanity/lib/live.ts` using `defineLive` from `next-sanity/live`. Render `<SanityLive />` in the root layout to enable automatic cache invalidation.

---

## Spotify Integration

The portfolio displays the currently playing track from Spotify via an animated character widget in the About Me section.

### API Endpoint

**`GET /api/nowPlaying`** — Returns the currently playing track:

```typescript
{
  isPlaying: boolean;
  title: string; // Song name
  artist: string; // Comma-joined artist names
  albumImageUrl: string; // Album art URL
  songUrl: string; // Spotify track URL
}
```

### Authentication

Uses OAuth 2.0 Authorization Code with Refresh Token flow:

1. Base64-encodes `SPOTIFY_CLIENT_ID:SPOTIFY_CLIENT_SECRET`
2. Exchanges the refresh token for an access token via `accounts.spotify.com/api/token`
3. Calls `api.spotify.com/v1/me/player/currently-playing` with the access token

### Required Scopes

- `user-read-currently-playing`
- `user-read-playback-state`

### Required Environment Variables

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`

### Generating Tokens

To generate a refresh token, use the [Spotify Authorization Code Flow](https://developer.spotify.com/documentation/web-api/tutorials/code-flow):

1. Create an app at [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Add `http://localhost:3000` to Redirect URIs
3. Visit the authorization URL with scopes `user-read-currently-playing user-read-playback-state`
4. Exchange the returned code for an access + refresh token

---

## Environment Variables

| Variable                         | Public | Description                        |
| -------------------------------- | ------ | ---------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`  | Yes    | Sanity project ID                  |
| `NEXT_PUBLIC_SANITY_DATASET`     | Yes    | Sanity dataset name                |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Yes    | Sanity API version date            |
| `NEXT_PUBLIC_SITE_URL`           | Yes    | Base URL for metadata / Open Graph |
| `SPOTIFY_CLIENT_ID`              | No     | Spotify OAuth client ID            |
| `SPOTIFY_CLIENT_SECRET`          | No     | Spotify OAuth client secret        |
| `SPOTIFY_REFRESH_TOKEN`          | No     | Spotify OAuth refresh token        |

Copy `.env.example` and fill in the values:

```bash
cp .env.example .env.local
```

---

## Design System / Color Palette

The theme is a **dark-only** palette defined with CSS custom properties in `app/globals.css`. All colors are mapped to shadcn/ui semantic tokens and exposed as Tailwind utility classes.

### Semantic Colors

| Token                    | Hex       | Tailwind Utility            | Purpose                 |
| ------------------------ | --------- | --------------------------- | ----------------------- |
| `--background`           | `#09090B` | `bg-background`             | Page background         |
| `--foreground`           | `#FAFAFA` | `text-foreground`           | Primary text            |
| `--card`                 | `#18181B` | `bg-card`                   | Card / popover surfaces |
| `--card-foreground`      | `#FAFAFA` | `text-card-foreground`      | Text on cards           |
| `--border`               | `#27272A` | `border-border`             | Borders, dividers       |
| `--input`                | `#27272A` | `border-input`              | Input fields            |
| `--muted`                | `#18181B` | `bg-muted`                  | Subtle backgrounds      |
| `--muted-foreground`     | `#A1A1AA` | `text-muted-foreground`     | Secondary text          |
| `--primary`              | `#22D3EE` | `bg-primary`                | Accent / CTA buttons    |
| `--primary-foreground`   | `#09090B` | `text-primary-foreground`   | Text on neon surfaces   |
| `--secondary`            | `#27272A` | `bg-secondary`              | Secondary buttons       |
| `--secondary-foreground` | `#FAFAFA` | `text-secondary-foreground` | Text on secondary       |
| `--accent`               | `#22D3EE` | `bg-accent`                 | Highlights              |
| `--ring`                 | `#22D3EE` | `ring-ring`                 | Focus rings             |
| `--destructive`          | `#EF4444` | `bg-destructive`            | Errors / danger         |

### Neon Scale (`--color-neon-*`)

| Shade      | Hex       |
| ---------- | --------- |
| `neon-50`  | `#ECFEFF` |
| `neon-100` | `#CFFAFE` |
| `neon-200` | `#A5F3FC` |
| `neon-300` | `#67E8F9` |
| `neon-400` | `#22D3EE` |
| `neon-500` | `#06B6D4` |
| `neon-600` | `#0891B2` |
| `neon-700` | `#0E7490` |
| `neon-800` | `#155E75` |
| `neon-900` | `#164E63` |
| `neon-950` | `#083344` |

### Usage Examples

```html
<!-- Semantic: card with border and secondary text -->
<div class="bg-card border border-border rounded-lg p-4">
  <h3 class="text-foreground">Project Title</h3>
  <p class="text-muted-foreground">A short project description.</p>
</div>

<!-- Primary neon CTA button -->
<button
  class="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2"
>
  Get Started
</button>

<!-- Neon glow effect -->
<div class="ring-neon/30 ring-2 rounded-full">
  <!-- Active indicator -->
</div>

<!-- Neon gradient -->
<div class="bg-gradient-to-r from-neon-600 to-neon-400 text-primary-foreground">
  Feature Highlight
</div>
```

> All colors are defined under `@theme inline` in `app/globals.css`. Opacity modifiers (e.g. `bg-neon/20`, `text-primary/80`) work out of the box.

---

## Folder Structure (Atomic Design)

```
portfolio/
├── app/                         # Next.js App Router
│   ├── layout.tsx               # Root layout (Header + Footer + Geist fonts)
│   ├── page.tsx                 # Home page (single-page portfolio)
│   ├── globals.css              # Global styles + Tailwind v4 theme
│   ├── studio/
│   │   └── [[...tool]]/
│   │       └── page.tsx         # Sanity Studio (catch-all, force-static)
│   └── api/
│       └── nowPlaying/
│           └── route.ts         # GET /api/nowPlaying (Spotify)
│
├── sanity/                      # Sanity CMS configuration
│   ├── env.ts                   # Environment variable helpers
│   ├── config.ts                # Sanity CLI config
│   ├── structure.ts             # Studio structure builder
│   ├── lib/
│   │   ├── client.ts            # Sanity client
│   │   ├── live.ts              # Live Content API (sanityFetch + SanityLive)
│   │   └── image.ts             # Image URL builder
│   └── schemaTypes/
│       ├── index.ts             # Schema registry
│       └── project.ts           # Project document type
│
├── src/
│   ├── atoms/                   # Smallest building blocks
│   │   ├── ui/                  # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── pagination.tsx
│   │   │   ├── spinner.tsx
│   │   │   └── textarea.tsx
│   │   ├── ConchoAstronaut.tsx  # SVG astronaut character
│   │   ├── ConchoHelmet.tsx     # SVG helmet (experience stepper)
│   │   ├── ConchoMusic.tsx      # SVG character with iPod/headphones
│   │   ├── Estrella.tsx         # SVG star decoration
│   │   ├── NavLink.tsx          # Navigation link atom
│   │   ├── Observatorio.tsx     # SVG observatory decoration
│   │   ├── SistemaUnified.tsx   # SVG solar system
│   │   ├── StepConnector.tsx    # Experience stepper connector
│   │   └── StepNode.tsx         # Experience stepper node
│   │
│   ├── molecules/               # Simple group of atoms
│   │   ├── ConchoMusicAnimated.tsx  # Animated iPod character + Spotify
│   │   ├── ContactForm.tsx      # Email/message form
│   │   ├── ExperienceStep.tsx   # Single experience step
│   │   ├── ExperienceStepper.tsx# Full experience stepper
│   │   ├── MobileMenu.tsx       # Mobile hamburger menu
│   │   ├── MoonRing.tsx         # Orbiting tech stack ring
│   │   ├── SistemaUnifiedAnimated.tsx # Animated solar system with UFO
│   │   └── SpeechBubble.tsx     # Typewriter speech bubble
│   │
│   ├── organisms/               # Complex UI sections
│   │   ├── Header.tsx           # Sticky header with nav
│   │   ├── Footer.tsx           # Footer with GitHub link
│   │   ├── HeroSection.tsx      # Full-screen hero
│   │   ├── ExperienceSection.tsx# Experience timeline
│   │   ├── ProjectsSection.tsx  # Projects showcase
│   │   ├── AboutMeSection.tsx   # About + Spotify widget
│   │   └── ContactSection.tsx   # Contact form section
│   │
│   ├── lib/
│   │   ├── utils.ts             # cn() helper
│   │   ├── validations.ts       # yup contact schema
│   │   └── gsap/
│   │       ├── config.ts        # GSAP + ScrollTrigger + MotionPathPlugin
│   │       └── animations.ts    # ~20 reusable GSAP presets
│   │
│   ├── data/
│   │   ├── experience.ts        # 3 work experiences
│   │   ├── links.ts             # GitHub link
│   │   └── speech.ts            # Intro speech lines
│   │
│   ├── types/
│   │   └── spotify.ts           # Spotify API type definitions
│   │
│   └── styles/
│       ├── animations.css       # CSS keyframes + @utility classes
│       └── typography.css       # Responsive typography @utility classes
│
├── public/                      # Static assets
│   ├── favicon.webp
│   ├── preview.webp             # OG image
│   └── images/
│       ├── bg/
│       │   └── space-background.svg
│       ├── album_pictures/      # Bad Bunny album covers
│       └── decorations/
│           ├── planets/
│           └── objects/
│
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs           # Tailwind CSS v4 PostCSS plugin
├── eslint.config.mjs            # ESLint 9 flat config
├── components.json              # shadcn/ui configuration
├── .env.example                 # Environment variable template
├── AGENTS.md                    # Agent behavior rules
└── CLAUDE.md                    # Operating modes
```

### Atomic Design Levels

| Level         | Description                                | Examples                                     |
| ------------- | ------------------------------------------ | -------------------------------------------- |
| **Atoms**     | Basic building blocks with no dependencies | Button, Input, SVG character parts           |
| **Molecules** | Simple group of atoms working together     | ContactForm, SpeechBubble, MoonRing          |
| **Organisms** | Complex UI sections composed of molecules  | Header, Footer, HeroSection, ProjectsSection |

---

## Conventions

### Component Naming

- Use PascalCase for component names
- Match filename to component name

### Import Paths

```typescript
// shadcn/ui components (atoms level)
import { Button } from '@/atoms/ui/button';

// Custom atoms
import { ConchoAstronaut } from '@/atoms/ConchoAstronaut';

// Molecules
import { SpeechBubble } from '@/molecules/SpeechBubble';

// Organisms
import { Header } from '@/organisms/Header';
```

### CSS Classes

- Use Tailwind utility classes
- Use `cn()` from `lib/utils.ts` for conditional classes
- Keep custom styles in component files or `globals.css`

---

## Important Development Notes

### Tailwind CSS v4: CSS-First Config

Tailwind v4 configures themes in CSS, not JavaScript. There is **no `tailwind.config.ts`**. The theme lives in `app/globals.css` via `@theme inline`:

```css
@import 'tailwindcss';

@theme inline {
  --color-background: var(--background);
  --font-sans: var(--font-geist-sans);
}
```

### Dark-Only Theme

The site has **no light mode**. All colors are set directly in the `:root` selector in `globals.css`. There is no `.dark { }` class block.

### shadcn/ui Integration

shadcn/ui components reference CSS variables (e.g., `--primary`, `--border`) which are wired into Tailwind v4's `@theme inline` block.

### Fonts

Geist Sans and Geist Mono are self-hosted via `next/font/google` in `app/layout.tsx`. Exposed as CSS variables and mapped to Tailwind's `font-sans` and `font-mono`.

### Import Path Aliases

Configured in `tsconfig.json` with `@/*` mapping to `./src/*`.

### GSAP Animations

Complex animations use GSAP with ScrollTrigger and MotionPathPlugin. See `src/lib/gsap/animations.ts` for reusable presets. Simple animations stay in CSS (`src/styles/animations.css`).

---

## License

MIT
