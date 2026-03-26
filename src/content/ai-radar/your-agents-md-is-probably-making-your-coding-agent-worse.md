---
author: Morgan Linton
pubDatetime: 2026-03-26T13:29:51.312Z
title: "Your AGENTS.md is probably making your coding agent worse"
slug: "your-agents-md-is-probably-making-your-coding-agent-worse"
description: "Discover why a lengthy AGENTS.md file might hinder your coding agent's performance. Learn to optimize it by focusing on essential, project-specific details."
url: "https://generativeai.pub/your-agents-md-is-probably-making-your-coding-agent-worse-d63127f5807f"
tags:
  - agents.md
  - coding-agents
  - llm
  - openai
  - context-engineering
rating: 4
---

# AGENTS.md Optimization for Coding Agents

The article discusses the potential drawbacks of excessively detailed `AGENTS.md` files for coding agents, arguing that they can hinder performance rather than improve it. The author shares their experience and observations, suggesting a shift towards a more concise and focused approach.

## Key Takeaways

*   **Bloated `AGENTS.md` files can be detrimental:**  The author initially believed a comprehensive `AGENTS.md` would enhance agent performance but found it often led to inefficiencies.
*   **Agents need better state management, not more text:** Drawing from Anthropic's research, the article emphasizes the importance of effective context engineering, including summarization and compression of critical details, for long-running coding agents.
*   **Overhead Tax:** Large `AGENTS.md` files can create fixed overhead for every task, as the agent needs to process the entire file before starting work.
*   **Less is More:** The author advocates for a minimalist approach, focusing on project-specific setup steps, test commands, and deployment quirks that the agent cannot infer from the code or `README.md`.
*   **Remove Redundant Information:** The author recommends removing coding philosophy, architecture summaries already present in `README.md`, and any information the agent can derive from the codebase.
*   **`AGENTS.md` as an Exception File:** The author now treats `AGENTS.md` as a living exception file, containing only essential information not readily available elsewhere.

## Recommendations

*   **Prioritize State Management:** Focus on how the agent maintains and utilizes its state, rather than simply providing more textual instructions.
*   **Condense Critical Details:** Summarize and compress essential information to avoid overwhelming the agent with unnecessary details.
*   **Focus on Project-Specific Information:** Include only information that is unique to the project and cannot be inferred from the code or documentation.
*   **Regularly Review and Refine:** Treat `AGENTS.md` as a dynamic document, constantly reviewing and refining its contents to ensure it remains relevant and efficient.
