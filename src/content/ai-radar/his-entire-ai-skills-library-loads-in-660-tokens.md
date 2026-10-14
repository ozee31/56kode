---
author: Unknown
pubDatetime: 2026-10-14T07:29:36.303Z
title: "His entire AI skills library loads in 660 tokens."
slug: "his-entire-ai-skills-library-loads-in-660-tokens"
description: "Discover strategies to minimize token consumption in AI agent skills using Matt Pocock’s techniques like leading words, progressive disclosure, and modular invocation patterns."
url: "https://generativeai.pub/his-entire-ai-skills-library-loads-in-660-tokens-00c0b7aa7678"
tags:
  - llm
  - prompt-engineering
  - agent-development
  - token-efficiency
rating: 4
---

This article examines Matt Pocock’s methodology for constructing highly efficient AI agent skills, focusing on the critical constraint of context window budgets. The central thesis argues that every word added to a skill file incurs an attention tax on every turn, so the optimal strategy involves keeping descriptions short and invoking complex logic only when necessary rather than loading everything into memory simultaneously. By treating skills as plain files that drop directly into the model's context, the author demonstrates how shifting from always-loaded verbose instructions to user-invoked routers can reduce a library size from tens of thousands of tokens down to just 660 without sacrificing capability.

Furthermore, the analysis details specific linguistic techniques such as using leading words that leverage the model's pre-existing training data instead of defining concepts from scratch. The writer also highlights the importance of pruning no-ops and replacing negative prohibitions with positive instructions to prevent forbidden behaviors from entering the context. These principles are applied within a broader workflow that includes interviewing designs, freezing conversations into specs without stale code snippets, and slicing tasks into vertically demoable tickets before implementation begins in fresh sub-agents to ensure unbiased reviews.

Beyond the technical implementation, the piece concludes with a philosophical adjustment regarding the nature of these skill files, asserting they should function as active context rather than passive documentation. The author notes that while lighter skills suit stronger frontier models by allowing creative reasoning, heavier frameworks might still benefit weaker local instances. Ultimately, the goal is to recognize that shorter skills often behave better because they reduce the cognitive load on the model, ensuring that only relevant information rides in context during execution.
