<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:animation-architecture-rules -->

# Animation Architecture

## CSS vs. GSAP Decision Matrix

| Use CSS (`@utility` in `src/styles/animations.css`) | Use GSAP (`src/lib/gsap/animations.ts`)          |
| --------------------------------------------------- | ------------------------------------------------ |
| Single-property loops (glow, pulse, fade)           | Multi-property animations (Y + scale + rotation) |
| Infinite static loops                               | Complex easing curves (`sine.inOut`, `expo.out`) |
| No interaction needed                               | Pause / resume / reverse control needed          |
| Scroll-triggered via CSS only                       | ScrollTrigger or timeline sequences              |
| Simple `rotate` or `translate`                      | Choreographed sequences with delays              |

## File Structure

```
src/
  styles/animations.css       ← CSS keyframes + @utility
  lib/gsap/
    config.ts                 ← Plugin registration (ScrollTrigger)
    animations.ts             ← Reusable GSAP presets
```

## Rules

- **Simple animations stay in CSS** — performant, no JS overhead
- **Complex animations use GSAP** — fine-grained control, timeline orchestration
- **Never duplicate logic** — if an animation is reused, extract it to a preset
- **Always kill GSAP instances** on unmount to prevent memory leaks
- **Prefer `useRef` over `useState`** for GSAP targets to avoid re-renders

## When in Doubt

Ask: "Does this animation need to be paused, reversed, or sequenced?"

- **No** → CSS
- **Yes** → GSAP

<!-- END:animation-architecture-rules -->

<!-- BEGIN:code-review-agent -->

# Code Review Agent

When the user asks to review code (NOT in build/execution mode), act as a:

- **Software Architect** - Structure, patterns, scalability
- **Senior Fullstack Developer** - Best practices, DRY, maintainability
- **Security Expert** - Vulnerabilities, data protection, input validation

## Review Prioritization Order

When reviewing code, analyze and present issues in this strict priority order:

### 1. Logic & Correctness

- Bugs, broken functionality, incorrect API usage
- Race conditions, state management errors
- Logic that produces wrong results

### 2. Architecture & Patterns

- Violations of atomic design (atoms → molecules → organisms)
- Component composition anti-patterns
- Missing or incorrect TypeScript types
- Next.js App Router convention violations
- Improper data fetching patterns

### 3. Performance

- Unnecessary re-renders (missing React.memo, useMemo, useCallback)
- Missing `next/image` optimization
- Large bundle imports without lazy loading
- Client components used where server components suffice

### 4. Security

- Hardcoded secrets/credentials
- XSS vulnerabilities (dangerous HTML, unescaped user input)
- Missing input validation/sanitization
- Improper auth patterns

### 5. Maintainability & Principles

- **DRY** violations — duplicated logic, copy-paste code
- **Single Responsibility** — components doing too much
- **Meaningful naming** — unclear variable/function names
- **Magic numbers** — hardcoded values without constants
- **Inconsistent patterns** — mixing conventions across files

## Review Criteria

### Best Practices

- Follow atomic folder structure conventions
- Proper TypeScript typing (no `any`)
- Component composition (atoms → molecules → organisms)
- Proper React hooks usage
- Error handling patterns

### Clean Code

- Meaningful naming
- Single responsibility principle
- No code duplication (DRY)
- Small, focused functions/components

### Maintainability

- Clear component structure
- Proper props interface definitions
- Reusable atoms/molecules
- Consistent patterns across codebase

### Security

- No hardcoded secrets/credentials
- Input validation and sanitization
- XSS prevention
- Proper authentication/authorization patterns

### Performance

- Proper image optimization (next/image)
- Component re-rendering optimization (React.memo, useMemo, useCallback)
- Lazy loading where appropriate
- Efficient data fetching

## Review Triggers

The user is requesting a code review when they use phrases like:

- "review my code"
- "check my code"
- "analyze my code"
- "audit my code"
- "improve my code"
- "find problems"
- "security check"
- Any variation of the above

## Output Format

For each issue found, categorize:

| Priority   | Description                                                          |
| ---------- | -------------------------------------------------------------------- |
| **HIGH**   | Security vulnerabilities, breaking bugs, critical performance issues |
| **MEDIUM** | Code smells, minor security concerns, maintainability issues         |
| **LOW**    | Style improvements, minor optimizations, suggested enhancements      |

Provide for each issue:

- **File path + line number**
- **Issue description**
- **Current problematic code** (if applicable)
- **Recommended fix** (with code example)
- **Priority level**
- **Learning explanation** (why it's important)

## Output Structure

```
## Code Review Summary
Total Issues: X | HIGH: X | MEDIUM: X | LOW: X

### HIGH Priority Issues
...

### MEDIUM Priority Issues
...

### LOW Priority Issues
...

### Positive Observations
- List what the code does well
```

<!-- END:code-review-agent -->

<!-- BEGIN:package-manager-rules -->

# Package Manager Rules

- **Always use pnpm** for this project.
- **Never use npm or yarn** to install/manage dependencies.
- If `node_modules` or `package-lock.json` exist from npm, remove them and reinstall with pnpm.
- Use `pnpm install` for initial setup, `pnpm add <pkg>` for adding packages.
<!-- END:package-manager-rules -->
