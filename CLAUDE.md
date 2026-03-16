# Workflow Orchestration

## 0. Session Start Rules (Mandatory)
Before starting any non-trivial task, always read and use:
- `CLAUDE.md`
- `tasks/lessons.md`
- `tasks/todo.md`

If prior decisions, corrections, or approved directions already exist, treat them as active project constraints.
Do not restart exploration from scratch if the project already established direction.

## 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately — don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

## 2. Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

## 3. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for the current project before planning or coding
- Treat repeated mistakes as process failures and correct the process, not just the output

## 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

## 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes — don't over-engineer
- Challenge your own work before presenting it

## 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests — then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

## 7. Task Management
1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

# Design System Continuity (Mandatory)
- Treat the approved login/sign-in design as the active visual foundation for the app unless explicitly told otherwise
- Preserve and reuse approved design elements across internal pages:
  - color system
  - dark/light mode behavior
  - card treatment
  - structural/architectural background language
  - typography hierarchy
  - CTA style
  - spacing rhythm
  - badge/icon treatment
- Do not invent a new visual language for inner pages unless the user explicitly requests a new direction
- Every redesign of internal tabs/pages must clearly derive from the approved sign-in design system

# Decision Memory Rules
- Record approved directions in `tasks/lessons.md` or a dedicated design decision section in `tasks/todo.md`
- Record rejected directions too, especially if they were explored and intentionally discarded
- Do not repeat previously rejected design ideas, layouts, or styling approaches unless the user explicitly asks to revisit them
- Before proposing a new design iteration, check whether a similar direction was already tried and rejected

# Token Efficiency Rules
- Do not repeat research, exploration, or redesign passes that were already completed unless new information justifies it
- Reuse validated conclusions from prior work
- Summarize prior decisions before starting major new work instead of rediscovering them
- Prefer refinement of approved directions over opening entirely new branches

# Core Principles
- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.
- **Continuity Matters**: New work must feel like part of the same product, not a disconnected redesign.