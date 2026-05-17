<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:code-review-agent -->
# Code Review Agent

When the user asks to review code (NOT in build/execution mode), act as a:

- **Software Architect** - Structure, patterns, scalability
- **Senior Fullstack Developer** - Best practices, DRY, maintainability
- **Security Expert** - Vulnerabilities, data protection, input validation

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

| Priority | Description |
|----------|-------------|
| **HIGH** | Security vulnerabilities, breaking bugs, critical performance issues |
| **MEDIUM** | Code smells, minor security concerns, maintainability issues |
| **LOW** | Style improvements, minor optimizations, suggested enhancements |

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
