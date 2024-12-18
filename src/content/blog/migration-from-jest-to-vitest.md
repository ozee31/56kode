---
author: 56kode
pubDatetime: 2024-12-18T17:00:00+01:00
modDatetime: 2024-12-18T17:00:00+01:00
title: "Migration from Jest to Vitest: Complete feedback on a React/TypeScript project"
slug: migration-from-jest-to-vitest
featured: false
draft: false
tags:
  - testing
  - react
description: Complete step-by-step guide to migrate from Jest to Vitest in a React/TypeScript project. Includes ESM handling, performance optimization, and real-world solutions from a 2900+ tests migration.
---

## Context

Our team maintains a React/TypeScript application with a large test base (2900 tests) including snapshots, rendering tests with React Testing Library, and standard unit tests. Due to recurring issues with Jest, we decided to migrate to Vitest, encouraged by its successful use in our design system (900+ tests).

## Why migrate from Jest to Vitest?

### Jest limitations

1. Performance and stability

   - Frequent freezes requiring the `--max-workers` flag
   - High memory consumption affecting development machines performance

2. Poor ESM compatibility
   - Complex and verbose configuration for ESM modules transpilation
   - Need to maintain a complete list of modules to transform and specific configuration:

```typescript
const modulesToTransformEsmToCommonJS = [
  "file-type",
  "ieee754",
  "token-types",
  "strtok3",
  "peek-readable",
  "swiper",
  "swiper/react",
  "swiper/modules",
  "ssr-window",
  "dom7",
  "react-chartjs-2",
  "react-dnd",
  "dnd-core",
  "@react-dnd",
  "@hookform",
  "nanoid",
  "uuid",
  "react-dnd-touch-backend",
  "react-dnd-html5-backend",
  "pretty-bytes",
  "@minoru/react-dnd-treeview",
];

const transformEsmToCommonJSPattern = `node_modules/(${modulesToTransformEsmToCommonJS.join("|")})/.+\\.(j|t)sx?$`;
const transformIgnoreEsmToCommonJSPattern = `/node_modules/(?!${modulesToTransformEsmToCommonJS.join("|")})`;

// Jest Configuration
transform: {
  // Convert ESM to Commonjs
  [transformEsmToCommonJSPattern]: [
    "ts-jest",
    {
      diagnostics: false,
      isolatedModules: true,
    },
  ],
  "^.+\\.js$": "babel-jest",
  "^.+.tsx?$": [
    "ts-jest",
    {
      diagnostics: false,
      isolatedModules: true,
    },
  ],
  ".+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|gif|wav)$": "jest-transform-stub",
},
transformIgnorePatterns: [transformIgnoreEsmToCommonJSPattern],
```

## Migration process

### 1. Cleanup and dependency installation

Packages to install:

- `vitest`
- `vitest-fetch-mock`
- `@vitest/eslint-plugin`
- `@vitest/browser`
- `@vitejs/plugin-react`

Packages kept because they are compatible:

- `@testing-library/jest-dom`
- `jest-styled-components` (needed to fix class names in styled-components)

### 2. Vitest Configuration

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/__tests__/vitest-setup.ts",
    include: ["src/**/*.{test,spec}.{js,jsx,ts,tsx}"],
    coverage: {
      include: ["src/**/*.{js,jsx,ts,tsx}"],
      exclude: ["src/**/*.d.ts", "src/services/**/*.{js,jsx,ts,tsx}"],
      reportsDirectory: "coverage",
      provider: "istanbul",
      lines: 51,
    },
    slowTestThreshold: 1000,
  },
  optimizeDeps: {
    include: [
      "react-dnd",
      "dnd-core",
      "@react-dnd",
      "react-dnd-touch-backend",
      "react-dnd-html5-backend",
      "@minoru/react-dnd-treeview",
      "react-dnd-multi-backend",
    ],
  },
  resolve: {
    alias: {
      "@/": `${__dirname}/src/`,
      "@obat/design-system-public/": `${__dirname}/libs/design-system/public/`,
      "@obat/design-system/": `${__dirname}/libs/design-system/src/`,
      assets: `${__dirname}/assets/`,
    },
  },
});
```

### 3. TypeScript Configuration Update

```diff
"baseUrl": "./",
"rootDirs": ["src", "stories"],
"outDir": "./dist/",
- "types": ["node", "jest", "google.maps"],
+ "types": ["node", "google.maps", "vitest/globals"],
"paths": {
  "@/*": ["src/*"],
  "assets/*": ["assets/*"],
@@ -13,7 +13,7 @@
  "@obat/design-system-public/*": ["libs/design-system/public/*"]
}
},
- "include": ["src", "jest.config.ts"],
+ "include": ["src", "vitest.config.ts"],
"path": {
  "react": ["./node_modules/react"],
  "react-dom": ["./node_modules/react-dom"],
```

### 4. Migration Surprises

#### Ghost Tests with Jest

Vitest is stricter than Jest, and that's good! We discovered that some snapshot tests were passing... without testing anything! The snapshot files were empty, mainly due to unhandled portal exceptions. That's what we call a false sense of security!

#### Portal Issues Resolution

To fix these problems, we needed a react-dom mock:

```typescript
vitest.mock("react-dom", () => ({
  default: {
    createPortal: (element: any) => element,
  },
  createPortal: (element: any) => element,
}));
```

#### Default Export Handling

Where Jest was more forgiving, Vitest requires explicit default specification in mocks:

```typescript
// No longer works
vitest.mock("@obat/design-system/hooks/useLegacyContainer", () =>
  vitest.fn(() => root)
);

// Now we need to write
vitest.mock("@obat/design-system/hooks/useLegacyContainer", () => ({
  default: vitest.fn(() => root),
}));
```

#### Modernizing spyOn

No more require with spyOn, time for import:

```typescript
// Before
vitest
  .spyOn(
    require("@/modules/callManagement/hooks/useConfigModalContext"),
    "useConfigModalContext"
  )
  .mockReturnValue(mockUseConfigModalContext);

// After
import * as useConfigModalContext from "@/modules/callManagement/hooks/useConfigModalContext";

vitest
  .spyOn(useConfigModalContext, "useConfigModalContext")
  .mockReturnValue(mockUseConfigModalContext);
```

#### RequireActual Migration

```typescript
// New format for requireActual
vitest.mock("@/modules/callManagement/hooks/useAgentContext", async () => {
  const actualModule = await vitest.importActual<
    typeof import("@/modules/callManagement/hooks/useAgentContext")
  >("@/modules/callManagement/hooks/useAgentContext");
});
```

### 5. Major Optimizations

#### The i18next Case

Test performance was heavily impacted by i18next. We decided to mock it completely (testing translations doesn't make much sense if another team manages them). It was a long process, but the result was worth it:

```typescript
vitest.mock("react-i18next", () => ({
  Trans: ({
    i18nKey,
    components,
  }: {
    i18nKey: string;
    components: Record<string, React.ReactElement>;
  }) => {
    if (!components) return i18nKey;
    const [firstComponent] = Object.values(components);
    if (!firstComponent) return i18nKey;
    const voidElements = [
      "br",
      "hr",
      "img",
      "input",
      "link",
      "meta",
      "area",
      "base",
      "col",
      "command",
      "embed",
      "keygen",
      "param",
      "source",
      "track",
      "wbr",
    ];
    if (voidElements.includes(firstComponent.type as string)) {
      return i18nKey;
    }
    return React.cloneElement(firstComponent, {}, i18nKey);
  },
  initReactI18next: {
    init: () => {},
    type: "3rdParty",
  },
  useTranslation: () => ({
    i18n: {
      addResourceBundle: () => {},
      changeLanguage: () => new Promise(() => {}),
      exists: () => true,
      hasResourceBundle: () => true,
      resolvedLanguage: "fr",
    },
    t: (key: string, options: any) => {
      if (key === "locale.fr.dateFormat") {
        return "dd/MM/yyyy";
      }
      if (key === "format.price") {
        const { value } = options;
        return new Intl.NumberFormat("fr-FR", {
          currency: "EUR",
          minimumFractionDigits: 2,
          style: "currency",
        }).format(value);
      }
      if (typeof options === "object") {
        return `${key}(${JSON.stringify(options)})`;
      }
      return key;
    },
  }),
}));

vitest.mock("i18next", () => ({
  default: {
    exists: () => true,
    init: () => ({
      then: (cb: any) => cb(),
    }),
    on: () => {},
    services: {
      formatter: {
        add: () => {},
      },
    },
    t: (key: string, options: any) => {
      if (key === "locale.fr.dateFormat") {
        return "dd/MM/yyyy";
      }
      if (key === "format.price") {
        const { value } = options;
        return new Intl.NumberFormat("fr-FR", {
          currency: "EUR",
          minimumFractionDigits: 2,
          style: "currency",
        }).format(value);
      }
      if (typeof options === "object") {
        return `${key}(${JSON.stringify(options)})`;
      }
      return key;
    },
    use: () => ({
      use: () => ({
        init: () => ({
          then: (cb: any) => cb(),
        }),
      }),
    }),
  },
}));
```

This mock isn't the most beautiful code (a small refactor wouldn't hurt), but it helped divide some test execution times by 3!

#### Migration to Happy DOM

After the pain of the i18next mock, moving to Happy DOM was a walk in the park. With almost a minute saved on all tests, it was worth the effort.

Required setup configuration:

```typescript
import { PropertySymbol } from "happy-dom";

// happy-dom configuration
const browserWindow =
  (global.document as any)[PropertySymbol.openerWindow] ||
  (global.document as any)[PropertySymbol.window];
global.setTimeout = browserWindow.setTimeout;
global.clearTimeout = browserWindow.clearTimeout;
global.setInterval = browserWindow.setInterval;
global.clearInterval = browserWindow.clearInterval;
global.requestAnimationFrame = browserWindow.requestAnimationFrame;
global.cancelAnimationFrame = browserWindow.cancelAnimationFrame;
global.queueMicrotask = browserWindow.queueMicrotask;
```

Some adjustments were needed:

1. Color format:

```diff
- expect(firstButtonColorScheme).toEqual("rgb(89, 171, 51)");
+ expect(firstButtonColorScheme).toEqual("#71C848");
```

2. DOM properties mock:

```typescript
Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
  configurable: true,
  get: vi.fn().mockReturnValue(40),
});
```

## Conclusions

### Good Points

- Stability restored locally (no more crashes!)
- Native ESM compatibility (goodbye nightmare configuration)
- Progressive migration possible
- Great compatibility with Jest ecosystem

### Surprising Points

- Speed promises not always met
- Execution times vary by machine (from 30 seconds to 5 minutes)
- Discovery of tests that weren't testing anything (thanks Vitest!)

### Watch Points

- i18next mock crucial for performance
- Happy DOM brings significant performance gain
- Be careful with default exports in mocks
- Keep an eye on portal handling

Despite some surprises and an i18next mock that made us sweat, the migration is a success. The restored stability and simple configuration more than make up for the few needed adjustments.
