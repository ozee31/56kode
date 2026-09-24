---
author: Addy Osmani
pubDatetime: 2026-09-24T08:02:52.302Z
title: "Getting the Most Out of Opus 5.5 in Claude and Claude Code"
slug: "getting-the-most-out-of-opus-5-5-in-claude-and-claude-code"
description: "Learn to prompt Opus 5.5 effectively for coding tasks, configure CLAUDE.md for long runs, manage subagents, and handle security flags in Claude Code."
url: "https://claude.dev/blog/getting-the-most-out-of-opus-5-5/#1-how-to-ask"
tags:
  - anthropic
  - claude-code
  - llm-prompting
  - ai-agents
rating: 4
---

The article outlines critical adjustments required to maximize the capabilities of Anthropic’s Opus 5.5 model within both standard chat interfaces and the specialized Claude Code environment. Unlike previous iterations, this model autonomously decides when to think before replying, which means developers should remove explicit instructions to reason step-by-step from their prompts to reduce latency without sacrificing quality. Instead, success relies on clearly defining completion criteria upfront, such as specifying that tests must pass, allowing the agent to execute multi-step workflows with minimal oversight while adhering to safety boundaries.

Furthermore, managing extended coding sessions requires strategic configuration through the CLAUDE.md file to dictate stop-and-go behaviors during complex migrations or audits. By instructing the agent to split large workloads across subagents and maintain persistent task lists in external files, developers can prevent context window saturation and ensure continuity throughout lengthy operations. This approach transforms the AI from a simple chatbot into a coordinated engineering partner capable of navigating large repositories while keeping the human in the loop for destructive actions.

Finally, verifying outputs involves shifting focus to reading the agent’s summary of needs first and utilizing built-in review mechanisms to catch logical errors before human intervention. The guide also addresses potential friction points like security flagging, explaining how to switch models or adjust settings to maintain workflow momentum when legitimate code analysis triggers safeguards. Ultimately, adopting these practices enables a more efficient integration of advanced reasoning models into daily development cycles.
