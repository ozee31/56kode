---
author: Giuseppe Cunsolo
pubDatetime: 2026-11-05T09:55:03.669Z
title: "The workflow is a product: a complete game in nine days with Claude Code"
slug: "the-workflow-is-a-product-a-complete-game-in-nine-days-with-claude-code"
description: "Learn how to build a sustainable AI coding workflow using Claude Code, including structured briefs, automated hooks, and persistent decision tracking for high-quality output."
url: "https://blog.eleven-labs.com/en/claude-code-workflow-kebab-roguelite/"
tags:
  - claude-code
  - typescript
  - react
  - ai-agents
  - ci-cd
rating: 4
---

In this detailed case study, Giuseppe Cunsolo demonstrates constructing a complete browser-based roguelite game within nine days by leveraging Claude Code as the primary engine while maintaining rigorous human oversight. Rather than focusing solely on code generation, the narrative emphasizes the critical infrastructure required to sustain AI collaboration, such as a centralized brief document, a glossary for terminology consistency, and folder-specific rules that guide the agent's behavior without inventorying existing code. Furthermore, the implementation relies heavily on automated guardrails, including pre-commit hooks that enforce linting standards and prevent direct pushes to main, ensuring that every change adheres to established quality gates before reaching the repository.

Beyond the technical setup, the author introduces a persistence ladder concept where decisions migrate from ephemeral chat prompts into permanent scripts and configuration files to prevent context loss between sessions. While the workflow achieved impressive metrics like 90% test coverage and rapid deployment, the analysis reveals significant limitations regarding user acceptance, noting that green tests did not guarantee mobile usability or production-ready styling until real-device validation occurred. Ultimately, the piece argues that while AI excels at writing code, the human role shifts to product ownership and acceptance testing, requiring early and frequent engagement with actual usage scenarios rather than relying purely on automated verification pipelines.
