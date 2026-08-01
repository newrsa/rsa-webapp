# Project Guidelines & Architecture Rules

## Architectural Rules

1. **Feature-Driven Modular Pattern (`src/modules/`)**:
   - Every major domain feature (e.g., `auth`, `dashboard`, `user-profile`) MUST reside inside `src/modules/`.
   - Each module contains its own co-located components, hooks, services, and types.

2. **Strict Encapsulation via Barrel Exports (`index.ts`)**:
   - Every feature module MUST have an `index.ts` file serving as its public API.
   - External layers (`src/app/`, other modules) MUST ONLY import from the module root (`@/modules/auth`), never from deep internal file paths (`@/modules/auth/components/LoginForm`).

3. **Strict Layer Separation**:
   - **`src/app/`**: Core application setup (providers, router configuration, layout rules, root `App.tsx`). No feature domain logic.
   - **`src/components/`**: Shared cross-module UI primitives (`ui/`) and global layouts (`layout/`). Must remain domain-agnostic.
   - **`src/services/`**: Global networking layer (HTTP API client instances, global endpoints).
   - **`src/store/`**: Root state management store configuration.
   - **`src/types/`**: Shared TypeScript types, API response schemas, and generic interfaces.
   - **`src/utils/`**: Shared helper functions and utility functions (`cn`, formatters).

4. **Path Aliases**:
   - Always use `@/` path alias for clean imports (e.g., `@/components`, `@/modules/auth`, `@/services`, `@/types`).
