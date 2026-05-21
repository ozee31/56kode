---
author: The T-Shaped Dev
pubDatetime: 2026-05-21T14:28:28.220Z
title: "20 Mistakes That Quietly Destroy JavaScript/TypeScript Codebases (Part 1)"
slug: "20-mistakes-that-quietly-destroy-javascript-typescript-codebases-part-1"
description: "Discover common JavaScript/TypeScript mistakes that degrade codebases. Learn about type safety, error handling, architecture, and design flaws, with practical fixes."
url: "https://thetshaped.dev/p/20-mistakes-that-quietly-destroy-javascript-typescript-codebases-common-code-smell-patterns"
tags:
  - typescript
  - javascript
  - error-handling
  - dependency-injection
  - eslint
rating: 4
---

# 20 Mistakes That Quietly Destroy JavaScript/TypeScript Codebases (Part 1)

This article identifies and addresses common mistakes in JavaScript and TypeScript codebases that gradually degrade code quality and increase maintenance costs. It's the first part of a two-part series, focusing on foundational aspects.

## Type Safety

*   **Lack of Strict Mode:** TypeScript's strict mode flags are crucial for preventing runtime errors. Enabling `strictNullChecks` and `noImplicitAny` is highly recommended.
*   **Abuse of `any`:** Using `any` disables type checking and can propagate unchecked types throughout the codebase. Use `unknown` and type guards instead.
*   **Improper Discriminated Unions:** Discriminated unions help represent impossible states, improving type safety and reducing the need for null checks.
*   **Missing Explicit Return Types:** Explicit return types on exported functions act as contracts, preventing silent breaking changes when the implementation is modified.

## Error Handling

*   **Swallowing Errors:** Catch blocks should either rethrow, recover, or transform errors. Logging and continuing without handling the error hides bugs.
*   **Unhandled Promise Rejections:** Promises should always be awaited or have a `.catch()` handler to prevent unhandled rejections that can crash the application.
*   **Ignoring the Result Pattern:** Use the Result pattern to encode success and failure in the return type, forcing callers to handle potential errors explicitly.

## Architecture & Design

*   **Lack of Dependency Injection:** Hardcoded dependencies make unit testing difficult. Use dependency injection to pass in fakes during testing.
*   **Premature Microservices:** Start with a modular monolith to establish clear boundaries before extracting services. Extract to services only when scaling bottlenecks are identified.
*   **Long Functions:** Extract blocks of code into named functions for readability, even if they are not reused.
*   **Business Logic in Controllers:** Controllers should only parse input, call a service, and format output. Business rules should be in separate services.
*   **Circular Dependencies:** Circular imports can lead to runtime errors and difficult-to-debug issues. Break circular dependencies by fixing the dependency direction or extracting shared contracts into a third module.

The article concludes by outlining the topics to be covered in Part 2, including runtime and quality mistakes related to code hygiene, async & performance, and testing & validation.
