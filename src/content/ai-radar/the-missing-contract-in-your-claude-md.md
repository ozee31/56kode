---
author: TripleTree
pubDatetime: 2026-05-21T14:02:10.726Z
title: "The Missing Contract in Your CLAUDE.md"
slug: "the-missing-contract-in-your-claude-md"
description: "Discover how to enhance your CLAUDE.md file to include an acceptance contract, ensuring AI coding agents not only write code but also help verify its safety and readiness for merging."
url: "https://generativeai.pub/the-missing-contract-in-your-claude-md-0a2f73f79871"
tags:
  - claude
  - ai-coding-agents
  - claudemd
  - bdd
  - integration-tests
rating: 5
---

# The Missing Contract in Your CLAUDE.md

This article discusses how to improve the `CLAUDE.md` file, used to instruct AI coding agents like Claude, by adding an "acceptance contract." This contract focuses on helping users verify the safety and readiness of AI-generated code, rather than just specifying coding style and rules.

## Key Points

*   **The Problem:** Current `CLAUDE.md` files primarily focus on coding style and rules, neglecting the crucial aspect of verifying code correctness and safety before acceptance.
*   **The Solution:** Introduce an "acceptance contract" within `CLAUDE.md` to guide the AI agent in identifying affected behaviors, stating acceptance criteria, suggesting relevant safety nets (tests), and prompting the user to run verification checks.
*   **The Acceptance Contract:** A set of instructions that tells Claude how to help the user decide whether a feature is ready to accept. It includes steps like identifying behavior changes, stating acceptance criteria, identifying relevant safety nets (unit tests, integration tests, BDD scenarios), and prompting the user to run these checks.
*   **Benefits of an Acceptance Contract:**
    *   Moves the bottleneck from code generation to code verification.
    *   Ensures that AI-generated code satisfies acceptance criteria, not just coding rules.
    *   Keeps the human in control, with Claude acting as an agent that surfaces acceptance questions at the right time.
*   **Example `CLAUDE.md` with Acceptance Contract:**

    ```markdown
    # CLAUDE.md

    ## Behavioral Principles
    - The user is the decision-maker. Treat implementation as work submitted for acceptance, not automatically accepted.
    - Make the smallest change that solves the problem.
    - Touch only files needed for the task.
    - Do not claim a feature is accepted just because code was changed.

    ## Commands
    - Build: `npm run build`
    - Unit tests: `npm test`
    - Integration tests: `npm run test:integration`
    - BDD tests: `npm run test:bdd`
    - Lint: `npm run lint`

    ## Acceptance Contract
    For behavior-changing feature work:
    1. Identify the user or system behavior affected by the change.
    2. State the acceptance criteria in plain language.
    3. Identify the relevant safety net: unit tests, integration tests, BDD scenarios, manual checks, or CI validation.
    4. If no relevant integration or BDD test exists, propose one and explain the missing coverage.
    5. When implementation appears complete, ask the user whether to run the relevant safety checks.
    6. Do not mark the feature as accepted unless the requested verification has passed.
    7. If verification is not run, mark the work as “implemented but not verified.”

    ## BDD Rules
    When proposing or updating integration tests:
    - Prefer behavior-readable scenarios.
    - Scenario names should describe the protected behavior.
    - Each scenario should include clear Given / When / Then flow.
    - Avoid tests that only mirror implementation details.

    ## Completion States
    Use one of these states at the end of feature-level work:
    - Implemented: code changes are complete, but verification has not been requested or completed.
    - Verified: relevant safety checks were run and passed.
    - Blocked: tests failed, required context is missing, or acceptance criteria are unclear.

    ## Final Response Format
    End feature-level work with:
    - Status:
    - Behavior changed:
    - Acceptance criteria:
    - Safety net recommended:
    - Tests run:
    - Verification status:
    - Coverage gap:
    - Remaining risk:
    - Recommended next step:
    ```

*   **The Importance of Integration Tests:** Emphasizes that integration tests are crucial for verifying system behavior, especially in AI-generated code, as they execute behavior and act as an executable product contract.
*   **BDD (Behavior-Driven Development):** Advocates for using BDD-style scenarios to make integration tests more readable and understandable for both humans and AI agents.
*   **Separation of Concerns:** Suggests separating agent instructions (`CLAUDE.md`) from product behavior contracts (`SAFETY_NET.md`) for better organization and maintainability.
*   **The Real Goal:** The article concludes by emphasizing that the goal is not just better prompting, but to encode engineering processes to make it easier to accept or reject AI-generated code, ultimately improving the overall AI coding workflow.
