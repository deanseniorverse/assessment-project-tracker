# Interviewer Guide

## Assessment Overview

**Target**: Senior Frontend Developer
**Duration**: 60-90 minutes
**Format**: Live coding with test-driven development

## Session Flow

### Setup (5 min)
1. Clone the repo and run `yarn install`
2. Run `yarn test` to show failing tests
3. Explain the structure: packages/ui (don't modify) vs packages/core (implement)

### Part 1: Implementation (45-50 min)

Guide candidates through modules A, B, C. They implement code to pass provided tests.

#### Module A: StatusBadge (15-20 min)
- **File**: `packages/core/src/components/StatusBadge.tsx`
- **Tests**: `tests/StatusBadge.test.tsx` (5 tests)
- **Key patterns**: `createVariants`, `cn()`, variant mapping

**Hints to give if stuck:**
- "Look at Button.tsx for the createVariants pattern"
- "Map status to a theme variant for colors"
- "Remember to use cn() for className composition"

**What to look for:**
- ✅ Correctly uses `createVariants({ styles, selected })`
- ✅ Maps status -> theme variant for colors
- ✅ Properly structures size variants
- ✅ Clean TypeScript types

#### Module B: ProjectExtend (15-20 min)
- **File**: `packages/core/src/stores/models/project.ts`
- **Tests**: `tests/project.test.ts` (10 tests)
- **Key patterns**: `makeAutoObservable`, computed getters, `computedFn`

**Hints to give if stuck:**
- "Access attributes via this.model.attr"
- "Use store.model.task.filter() to find related tasks"
- "Remember to exclude store and model from makeAutoObservable"

**What to look for:**
- ✅ Proper `makeAutoObservable(this, { store: false, model: false })`
- ✅ Computed getters for displayName, taskCount, progress
- ✅ Correctly filters tasks by projectId
- ✅ Handles edge cases (no tasks, all completed, etc.)

#### Module C: TaskCardState (15-20 min)
- **File**: `packages/core/src/components/TaskCardState.ts`
- **Tests**: `tests/TaskCardState.test.ts` (15 tests)
- **Key patterns**: ViewType interface, `inAttr`/`setAttr`/`save`/`load`

**Hints to give if stuck:**
- "Check if attr is in sendAttrs before propagating"
- "Use the save() utility from @packages/ui/src/utils/data"
- "The view getter should check data flags in priority order"

**What to look for:**
- ✅ Implements full ViewType interface
- ✅ Proper propagation logic (sendAttrs + sendAttr)
- ✅ Computed `view` with correct priority
- ✅ `json` returns toJS(this.data)

### Part 2: Test Writing + Implementation (30 min)

#### Module D: ProjectFormState
- **File**: `packages/core/src/forms/ProjectFormState.ts`
- **Tests**: `tests/ProjectFormState.test.ts`

**Instructions to candidate:**
1. "Write test cases for the features described in the TODO comments"
2. "Focus on action getter, initialValues, validates, and handleSubmit"
3. "Once you have tests, implement the class to pass them"

**What to look for:**
- ✅ Writes meaningful test cases covering edge cases
- ✅ Tests are isolated and descriptive
- ✅ Implementation matches test expectations
- ✅ Handles both create and edit modes

### Part 3: Discussion (10 min)

Questions to ask:
1. "Walk me through how the variant system works"
2. "Why do we exclude `store` and `model` from makeAutoObservable?"
3. "What's the difference between ViewType and DataType?"
4. "How would you add data fetching to this architecture?"
5. "What would you change or improve in this pattern?"

---

## Evaluation Rubric

### Part 1: Implementation (60 points)

| Module | Points | Criteria |
|--------|--------|----------|
| A: StatusBadge | 20 | createVariants usage (5), variant mapping (5), size variants (5), style overrides (5) |
| B: ProjectExtend | 20 | makeAutoObservable (4), displayName (4), tasks (4), taskCount (4), progress (4) |
| C: TaskCardState | 20 | ViewType interface (5), setAttr propagation (5), view getter (5), json/load (5) |

### Part 2: Test Writing + Implementation (30 points)

| Criteria | Points |
|----------|--------|
| Test coverage (edge cases) | 10 |
| Test quality (clear, isolated) | 10 |
| Implementation correctness | 10 |

### Part 3: Senior Signals (10 points)

| Signal | Points |
|--------|--------|
| Clean code, naming | 2 |
| TypeScript proficiency | 2 |
| Pattern recognition | 2 |
| Architecture discussion | 2 |
| Questions asked | 2 |

### Scoring Guide

| Score | Level |
|-------|-------|
| 90-100 | Strong hire - Deep understanding, clean code, great discussion |
| 75-89 | Hire - Solid implementation, good pattern recognition |
| 60-74 | Maybe - Completed basics but struggled with advanced concepts |
| < 60 | No hire - Significant gaps in understanding |

---

## Common Issues & Solutions

### Module A Issues
- **Forgets to call createVariants**: Point to Button.tsx line 52
- **Wrong className syntax**: Show the cn() pattern with variant objects

### Module B Issues
- **MobX not reactive**: Check makeAutoObservable is called correctly
- **Filter not working**: Ensure using this.store.model.task.filter()

### Module C Issues
- **Propagation broken**: Review checkAttrs logic
- **View order wrong**: Remind about priority (loading > editing > expanded)

### Module D Issues
- **Tests too simple**: Encourage edge case testing
- **Implementation doesn't match tests**: Review test assertions together

---

## Solution Reference

A solution branch is available at `solution` for comparison:
```bash
git checkout solution
```

Use this to verify candidate solutions or see reference implementations.
