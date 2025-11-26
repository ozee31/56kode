---
author: 56kode
pubDatetime: 2025-11-26T10:00:00+01:00
modDatetime: 2025-11-26T10:00:00+01:00
title: "How Gemini 3 Pro cut our pipeline time in half"
slug: how-gemini-3-pro-cut-our-pipeline-time-in-half
featured: false
draft: false
tags:
  - testing
  - ai
  - tooling
  - ci
description: 'We cut our test pipeline time from 22s to 4s per file using Gemini 3 Pro. Learn how AI identified "God Modules" killing our Vitest performance and automated the architectural refactoring that saved us 15 minutes per CI run.'
---

## Introduction

When running a single unit test takes over 20 seconds before even executing the first line of code, it’s not just "slow"—it’s unusable. That was our daily reality on the frontend part of our project. We tried everything: optimizing the Vitest config, isolating threads, hacking the mocks... nothing worked. We were stuck.

Since conventional solutions weren't working, I decided to try a different approach: submitting the problem to an AI. I was skeptical after my previous attempts with Claude Sonnet, which had been disappointing for deep debugging or architectural analysis. But I wanted to give the new **Gemini 3 Pro** model a chance via Cursor, as a final test.

## The technical context

To set the scene, our repo hosts two distinct projects:

- **The Design System (DS)**: ~1000 tests that run like clockwork.
- **The React/TS App**: ~3700 tests, a classic stack.

The App was where things got stuck. Here is the reality of launching an isolated test on my machine:

```bash
Test Files 1 passed (1)
Tests 3 passed (3)
Start at 09:32:08
Duration 22.53s (transform 12.53s, collect 21.47s, tests 323ms)
```

Look closely at the numbers: **323ms** to execute the test, but **over 21s** for the `transform` and `collect` phases. Vitest was spending its time parsing useless code instead of testing.

## The AI analysis: Hunting "God Modules"

Instead of suggesting I change a flag in `vite.config.ts`, Gemini analyzed the logs and the import structure. Its diagnosis was radical: our architecture was suffering from what we call **"God Modules"** (or "God Objects" in OOP).

For those unfamiliar with the term, it is a classic anti-pattern. It is a file or class that knows "too much" and does "too much." In our case, these were files that, once imported, dragged the entire application dependency tree with them like an endless chain. Importing a small utility ended up loading all the project code.

### The two culprits identified

1.  **`src/store/index.ts`**: Importing the `rootReducer` initialized the Redux store and Sagas. The result? We were indirectly importing every service, every API, and every hook in the app for a simple unit test.
2.  **`GlobalModalContainer.tsx`**: To test a component using modals, we imported the provider. However, this file imported a `GLOBAL_MODALS` constant referencing **every** modal in the application (Billing, Planning, etc.). Testing a button meant loading the code for every page.

## The solution: Refactoring to isolate

This is where it gets impressive. I didn't just use it as a simple typing aid; it handled almost everything autonomously.

After identifying the problem, Gemini proposed and implemented the architectural redesign. Obviously, on a project of this size, the first draft broke some types and caused some tests to fail. I simply pointed out the errors, and it corrected course by itself, iterating on its own solution.

In the end, apart from two or three `any` types that I had to clean up manually, the code produced was clean, functional, and architecturally solid.

### 1. Cleaning up the store

The `rootReducer` was extracted into its own file (`src/store/rootReducer.ts`).
Now, unit tests import only the pure reducer, without triggering the heavy initialization of the store and Sagas.

### 2. Splitting the modals

This was the biggest chunk. The monolithic `GlobalModalContainer` file was exploded:

- `types.ts`: Just the types.
- `GlobalModalContext.tsx`: A Context and a "light" Provider containing **no** dependencies on modal components.
- `GlobalModalContainer.tsx`: The heavy component, used only at runtime by the application.

The AI also updated the test helpers (~90 impacted files) to use this new light provider.

## The result

The result is undeniable. For the same test as in the beginning:

```bash
Test Files  1 passed (1)
Tests  3 passed (3)
Start at  15:59:47
Duration  4.29s (transform 1.90s, setup 189ms, collect 3.44s, tests 223ms)
```

We went from **22s to 4s**. We divided the local wait time by 5.
On the CI, the impact is direct: **15 minutes saved** per pipeline run.

## Conclusion

This feedback shows two things:

1.  **Watch your imports**: The structure of your dependencies directly impacts the performance of your tools (Vitest, Jest, Webpack). A "God Module" can silently kill your DX (Developer Experience).
2.  **AI as a technical expert**: Gemini 3 Pro didn't just act as a "copilot." It acted like a senior developer capable of understanding a complex architecture, identifying a structural flaw, and leading the refactoring almost from start to finish. Formidably effective.
