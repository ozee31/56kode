---
author: 56kode
pubDatetime: 2026-01-21T16:00:00+01:00
modDatetime: 2026-01-21T16:00:00+01:00
title: "Efficiently cleaning a TypeScript project: Knip + AI agent workflow"
slug: clean-typescript-project-knip-ai-workflow
featured: false
draft: false
tags:
  - ai
  - cursor
  - tooling
  - ts
description: "Learn how to safely clean dead code in TypeScript projects using Knip and an AI Agent. A step-by-step workflow to automate cleanup without breaking production"
---

## Introduction

Technical debt is not just about architecture or library choices. It also builds up silently as orphaned files, unused exports, and ghost dependencies. In a React/TypeScript project that has lived for several years, this "noise" eventually slows down builds, complicates refactoring, and increases the mental load for the team.

Cleaning up this dead code is a thankless task. Doing it manually is risky and takes a long time. Using automatic tools is often too aggressive and causes regressions. This is where **Knip** comes in, not used for its auto-fix feature, but paired with an **AI agent** guided by strict rules. The goal is simple: delegate the tedious execution to the machine while keeping control over critical decisions.

## Knip: static analysis without installation

Knip is a static analysis tool that works where ESLint stops. It does not just look at syntax; it analyzes the complete dependency graph of your project to identify what is *really* unused.

Its main advantage is how easy it is to run via `npx`, without needing a heavy installation:

```bash
npx knip
```

Here is an example of what Knip outputs:

```
Unused files (2)
src/utils/deprecated-helper.ts
src/components/OldButton.tsx

Unused dependencies (2)
moment
lodash

Unused exports (2)
formatLegacyDate  src/utils/date.ts
calculateDiscount  src/services/pricing.ts

Unused types (2)
LegacyUser  src/types/user.ts
OldConfig  src/types/config.ts
```

However, for effective cleaning, the default configuration is not enough. You must configure a `knip.json` file to define the exact scope of your application.

### Why talk about "production" for cleaning?

The term "production mode" in Knip can be confusing. We are not talking about environment variables or deployment here, but about the **analysis scope**.

When we clean a project, our goal is to delete code that will never reach the final bundle sent to the user. If a utility function is imported only by a test file, it is technically "used" (by the test), but it is "dead" for the application in production. This is the distinction we want the tool to respect.

## The test trap and strict configuration

A common problem with Knip happens when it reports that a file is used, even though it is only used by your test suites (Vitest, Jest).

By default, Knip test plugins consider spec files (`*.test.ts`) as entry points. As a result, any code imported in a test is considered "alive." This prevents you from detecting the actual dead code in the application.

To fix this, you sometimes need to be explicit and disable the test plugin or refine the entries, even in production mode.

Here is a solid `knip.json` configuration for a React project (using Knip v5 at the time of writing):

```json
{
    "$schema": "https://unpkg.com/knip@5/schema.json",
    "vitest": false,
    "entry": ["src/index.tsx!"],
    "project": ["src/**/*.{js,ts,jsx,tsx}!"],
    "ignore": [
        "**/*.test.{js,jsx,ts,tsx}",
        "**/__tests__/**"
    ]
}
```

**Key points:**
*   **`"vitest": false`**: Disables the plugin that automatically adds tests as entries. This is radical but often necessary to see what is truly unused outside of tests.
*   **The `!` suffix**: Tells Knip that this pattern applies only to production mode.
*   **The `ignore` array**: Completely excludes test files from the dead code analysis.

## Managing test exports with `@internal`

When you apply the strict configuration above, you will face a new situation: **false positives on exports**.

Imagine a `calculateTotal` function used by your `Cart` component, but exported only so it can be unit tested. Knip, configured to ignore tests, will report: *"Unused export: calculateTotal"*.

If you remove the export, you break your tests. The solution is not to remove, but to mark.

Use the JSDoc `@internal` tag:

```typescript
/**
 * @internal Exported for unit testing only - used internally by Cart component
 */
export const calculateTotal = (items: Item[]) => {
  // ...
};
```

This approach has three benefits:
1.  The code remains testable.
2.  Knip will ignore this export in future runs.
3.  You explicitly document *why* this export exists, preventing another developer from using it elsewhere by mistake.

## Why native `--fix` is insufficient

Knip offers a `--fix` flag. While tempting, it is dangerous to use on a large project. It is a "blind" tool that applies deletions based on static analysis that may lack context.

Here is why a supervised approach is superior:

| Problem | `--fix` Behavior | Supervised Approach (AI/Human) |
| :--- | :--- | :--- |
| **False Positives** | Deletes code used dynamically or with unresolved TS aliases. | Verifies usage via `grep` or text analysis before deletion. |
| **Broken Tests** | Removes exports used only in tests (the case seen above). | Detects usage in tests and adds `@internal` instead of deleting. |
| **Broken Builds** | Can remove build dependencies (Webpack, Babel) not imported in the code. | Analyzes context (config files) before touching `package.json`. |
| **No Validation** | Modifies files and stops. | Runs `tsc` and tests after every change to validate there are no regressions. |

Automation should not mean a lack of control.

## Automating cleaning with an AI agent

Instead of doing the work by hand or letting `--fix` break the CI, the most effective strategy is to use an LLM as an executor.

The workflow is as follows:
1.  **Knip Identifies**: We generate the report of unused items using the production and strict flags:

```bash
npx knip --production --strict
```
2.  **AI Verifies**: The agent receives the report and, for each item, performs a text search (`grep`) to confirm it is not used (distinguishing between production vs. tests).
3.  **AI Corrects**: It deletes the dead code OR adds the `@internal` tag if it is a test export.
4.  **AI Validates**: After each batch of changes, it runs TypeScript and the tests.

### The prompt for the agent

I have provided a complete prompt designed to instruct an agent via an AI-powered IDE like Cursor or Claude Code. It forces the agent to work iteratively and safely.

You can find the prompt here: **[Prompt Knip Cleanup - GitHub](https://github.com/ozee31/ai-prompts/blob/main/code-quality/knip/prompt.md)**

**Advice for large projects:**
Do not give the whole report to the agent at once. Go step by step:
*   Start with **Unused files** (whole files). This brings the most value quickly.
*   Then process **Unused dependencies**.
*   Finish with **Unused exports**, file by file or in batches of 20, because this is where the risk of false positives is highest and requires the most verification.

## Conclusion

Cleaning a TypeScript project should no longer be a task we postpone indefinitely for fear of breaking production. By combining the precise analysis of Knip with the contextual execution capacity of an AI, we turn a risky chore into a smooth process.

The human keeps the role they should never have lost: that of supervisor and final validator during Code Review, leaving the machine to handle the repetitive complexity of the cleanup.