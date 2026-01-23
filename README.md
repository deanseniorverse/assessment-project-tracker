# Project Tracker - Technical Assessment

A technical assessment for senior frontend developers, testing proficiency in:
- React + TypeScript
- MobX state management (store and view state patterns)
- Tailwind CSS with variant systems
- Test-driven development

## Quick Start

```bash
# Install dependencies
yarn install

# Run failing tests (your goal is to make these pass)
yarn test

# Start the development server
yarn dev
```

## Assessment Structure

This assessment is divided into 4 modules. You'll find failing tests for each module - implement the code to make them pass.

### Part 1: Implementation (Modules A, B, C)

For these modules, tests are provided. Implement the code to pass all tests.

#### Module A: UI Components with Variants (15-20 min)
**File**: `packages/core/src/components/StatusBadge.tsx`
**Tests**: `tests/StatusBadge.test.tsx`

Implement a `StatusBadge` component using the `createVariants` pattern. Study `packages/ui/src/components/Button.tsx` for reference.

#### Module B: Store State - Model Extension (15-20 min)
**File**: `packages/core/src/stores/models/project.ts`
**Tests**: `tests/project.test.ts`

Implement `ProjectExtend` class with computed properties for `displayName`, `tasks`, `taskCount`, and `progress`.

#### Module C: View State Management (15-20 min)
**File**: `packages/core/src/components/TaskCardState.ts`
**Tests**: `tests/TaskCardState.test.ts`

Implement `TaskCardState` class following the `ViewType` interface pattern.

### Part 2: Write Tests + Implement (Module D)

#### Module D: Form State (30 min)
**File**: `packages/core/src/forms/ProjectFormState.ts`
**Tests**: `tests/ProjectFormState.test.ts`

1. First, write test cases in the test file (replace the `it.todo()` stubs)
2. Then implement the class to pass your tests

## Reference Files

These files in `packages/ui` demonstrate the patterns you should follow:

| File | Pattern |
|------|---------|
| `components/Button.tsx` | UI component with `createVariants` |
| `utils/variants.ts` | The `createVariants` and `cn()` utilities |
| `stores/StoreTypes.ts` | Type definitions (`ViewType`, `ModelExtend`, etc.) |
| `hooks/useStateFocus.tsx` | Hook for state instantiation |
| `utils/data.ts` | Utility functions (`save`, `checkAttrs`) |

## Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run specific test file
yarn test StatusBadge
```

## Project Structure

```
assessment-project-tracker/
├── packages/
│   ├── ui/                  # Pre-provided utilities (DO NOT MODIFY)
│   │   └── src/
│   │       ├── utils/       # variants.ts, data.ts
│   │       ├── stores/      # Store, Collection, Model base classes
│   │       ├── hooks/       # useStateFocus
│   │       └── components/  # Button (reference), ViewVariants
│   │
│   └── core/                # YOUR IMPLEMENTATION GOES HERE
│       └── src/
│           ├── stores/      # Module B: project.ts
│           ├── components/  # Module A: StatusBadge, Module C: TaskCardState
│           └── forms/       # Module D: ProjectFormState
│
├── tests/                   # Test files
└── apps/web/                # Demo application
```

## Key Concepts

### createVariants Pattern

```typescript
const { cn } = createVariants({
  styles,    // External style overrides
  selected,  // Selected variant values { theme: 'primary', size: 'lg' }
  overrides, // Conditional overrides (e.g., disabled state)
});

// Use cn() for className composition
<View className={cn(
  "base-classes",     // Always applied
  "style-hook-name",  // For external overrides
  {
    theme: {
      primary: "bg-blue-500",
      secondary: "bg-purple-500",
    },
    size: {
      sm: "h-8",
      lg: "h-12",
    }
  }
)} />
```

### ViewType Pattern

```typescript
class MyState implements ViewType {
  store: StoreType;
  data: MyData = {};
  sendAttrs: string[];
  sendAttr?: (attr: string, value: any) => void;

  // Required methods
  inAttr(attr, value) { set(this.data, attr, value); }
  setAttr(attr, value) { /* check sendAttrs, then inAttr */ }
  save(values) { /* update multiple attrs */ }
  load(values) { /* initialize data */ }

  // Required getter
  get json() { return toJS(this.data); }
}
```

### Model Extension Pattern

```typescript
class MyModelExtend implements ModelExtend {
  store: StoreType;
  model: ModelType;

  constructor(props: ModelExtendProps) {
    this.store = props.store;
    this.model = props.model;
    makeAutoObservable(this, { store: false, model: false });
  }

  // Computed properties
  get displayName() {
    return this.model.attr.name || "Untitled";
  }
}
```

## Tips

1. **Read the test files first** - They document exactly what's expected
2. **Study Button.tsx** - It's a complete example of the variant pattern
3. **Use makeAutoObservable** - Exclude `store` and `model` references
4. **Use computedFn for parameterized computed values** - e.g., `getByStatus(status)`

Good luck!
