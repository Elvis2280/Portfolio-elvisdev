# Portfolio Website

A personal portfolio built with Next.js, Tailwind CSS, and designed with atomic architecture principles.

## Tech Stack

| Category            | Technology                                     |
| ------------------- | ---------------------------------------------- |
| **Framework**       | Next.js 16.2.4 (App Router)                    |
| **Language**        | TypeScript                                     |
| **UI Library**      | React 19.2.4                                   |
| **Styling**         | Tailwind CSS 4                                 |
| **UI Components**   | shadcn 4.3.0, Radix UI 1.4.3                   |
| **Icons**           | lucide-react                                   |
| **Animations**      | tw-animate-css                                 |
| **CSS Utilities**   | clsx, tailwind-merge, class-variance-authority |
| **Linting**         | ESLint 9                                       |
| **Package Manager** | pnpm                                           |
| **CMS**             | (To be decided)                                |

---

## Design System / Color Palette

The theme is a **dark-only** palette defined with CSS custom properties in `app/globals.css`. All colors are mapped to shadcn/ui semantic tokens and exposed as Tailwind utility classes.

### Semantic Colors

These map to Tailwind's `bg-*`, `text-*`, `border-*`, `ring-*` utilities directly:

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

A custom neon/cyan color scale for gradients, opacity overlays, and decorative use:

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

This project follows **Atomic Design** methodology to maintain scalable and reusable component architecture.

```
portfolio/
├── app/                         # Next.js App Router (pages live here)
│   ├── layout.tsx               # Root layout (wraps all pages)
│   ├── page.tsx                 # Home page (/)
│   └── globals.css             # Global styles + Tailwind v4 theme
│
├── src/
│   ├── atoms/                   # Smallest building blocks
│   │   └── ui/                  # shadcn/ui components
│   │       └── button.tsx
│   │
│   ├── molecules/               # Simple group of atoms (planned)
│   │
│   ├── organisms/               # Complex UI sections
│   │   └── Header.tsx
│   │
│   ├── templates/               # Page layouts (planned)
│   │
│   ├── lib/                     # Utilities & configs
│   │   ├── utils.ts             # cn() helper (clsx + tailwind-merge)
│   │   ├── cms/                 # CMS integration (planned)
│   │   └── hooks/               # Custom React hooks (planned)
│   │
│   ├── types/                   # TypeScript global types (planned)
│   │
│   ├── data/                    # Static data before CMS (planned)
│   │
│   └── styles/                  # Additional CSS modules (planned)
│
├── public/                      # Static assets
│   └── illustrations/
│
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs           # Tailwind CSS v4 PostCSS plugin
├── eslint.config.mjs            # ESLint 9 flat config
├── components.json              # shadcn/ui configuration
├── AGENTS.md                    # Agent behavior rules
└── CLAUDE.md                    # Operating modes (Build / Review)
```

### Atomic Design Levels

| Level         | Description                                | Examples                                 |
| ------------- | ------------------------------------------ | ---------------------------------------- |
| **Atoms**     | Basic building blocks with no dependencies | Button, Input, Badge, Typography         |
| **Molecules** | Simple group of atoms working together     | SearchBar, Card, FormField, SocialLink   |
| **Organisms** | Complex UI sections composed of molecules  | Header, Footer, ProjectCard, HeroSection |
| **Templates** | Page layouts defining structure            | BaseLayout, BlogLayout                   |
| **Pages**     | Next.js App Router pages                   | HomePage, AboutPage                      |

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

---

## CMS Integration

The CMS integration is planned but not yet implemented. The `lib/cms/` folder contains placeholder files for the future CMS client.

### Recommended Options (Pending Decision)

- **Sanity.io** - Great developer experience, real-time preview
- **Contentful** - Enterprise-ready, strong CDN
- **Strapi** - Self-hosted, open-source
- **Prismic** - Visual editing, slices

### When CMS is Decided

1. Install CMS SDK: `pnpm add @sanity/client` (or other)
2. Update `lib/cms/client.ts` with credentials
3. Define content types in `lib/cms/types.ts`
4. Create query functions in `lib/cms/queries.ts`
5. Replace static data in `data/` with CMS queries

---

## Conventions

### Component Naming

- Use PascalCase for component names
- Match filename to component name
- Use consistent prefixes (e.g., `ProjectCard`, `SocialLink`)

### Import Paths

```typescript
// shadcn/ui components (atoms level)
import { Button } from '@/atoms/ui/button';
import { Input } from '@/atoms/ui/input';

// Custom atoms
import Icon from '@/atoms/Icon';

// Molecules
import Card from '@/molecules/Card';
import SearchBar from '@/molecules/SearchBar';

// Organisms
import Header from '@/organisms/Header';
import Footer from '@/organisms/Footer';

// Templates
import BaseLayout from '@/templates/BaseLayout';

// Pages
import HomePage from '@/pages/HomePage';
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
  /* ... */
}
```

### Dark-Only Theme

The site has **no light mode**. All colors are set directly in the `:root` selector in `globals.css`. There is no `.dark { }` class block — the dark palette is the default.

### shadcn/ui Integration

shadcn/ui components reference CSS variables (e.g., `--primary`, `--border`) which are wired into Tailwind v4's `@theme inline` block. When adding new shadcn components via `pnpm dlx shadcn@latest add <component>`, they will pick up the palette automatically.

### Fonts

Geist Sans and Geist Mono are self-hosted via `next/font/google` in `app/layout.tsx`. They are exposed as CSS variables (`--font-geist-sans`, `--font-geist-mono`) and mapped to Tailwind's `font-sans` and `font-mono` utilities.

### Import Path Aliases

Configured in `tsconfig.json`:

```typescript
import { Button } from '@/atoms/ui/button'; // shadcn components
import Header from '@/organisms/Header'; // organisms
import { cn } from '@/lib/utils'; // utilities
```

### Agent Rules

Files `AGENTS.md` and `CLAUDE.md` define behavior rules for AI coding assistants working in this repo, including a code review mode triggered by phrases like "review my code."

---

## License

MIT
