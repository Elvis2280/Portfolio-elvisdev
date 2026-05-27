@AGENTS.md

## Mode Detection

The system operates in two modes:

### Build Mode

- Tasks requiring code execution (writing, editing, testing)
- Implementing features, fixing bugs, refactoring
- Any task that modifies or creates code files

### Review Mode

- User asks to analyze/audit/review existing code
- Triggered by phrases like:
  - "review my code"
  - "check my code"
  - "analyze my code"
  - "audit my code"
  - "improve my code"
  - "find problems"
  - "security check"
  - Any variation of the above

When in Review Mode, activate the Code Review Agent to provide:

- Software architecture feedback
- Best practices assessment
- Clean code evaluation
- Security vulnerability check
- Performance optimization suggestions
- DRY principle validation

Output should include prioritized issues (HIGH/MEDIUM/LOW) with code examples for learning purposes.
