---
author: Unknown
pubDatetime: 2026-03-06T14:03:24.540Z
title: "MCP is dead. Long live the CLI"
slug: "mcp-is-dead-long-live-the-cli"
description: "The Model Context Protocol (MCP) is losing relevance. Command-line interfaces (CLIs) offer a simpler, more reliable, and composable alternative for LLMs."
url: "https://ejholmes.github.io/2026/02/28/mcp-is-dead-long-live-the-cli.html"
tags:
  - cli
  - llm
  - mcp
  - command-line-tools
rating: 4
---

# MCP is dead, long live the CLI

The author argues that the Model Context Protocol (MCP) is dying and that CLIs are a better alternative for Large Language Models (LLMs).

## Key Points:

*   **LLMs don't need a special protocol:** LLMs are proficient at using command-line tools due to their extensive training on man pages, Stack Overflow, and GitHub repositories.
*   **CLIs are for humans too:** CLIs are debuggable by humans, unlike MCP, which requires decoding JSON transport logs.
*   **Composability:** CLIs are composable, allowing for piping through tools like `jq` and `grep`, which is more efficient than building custom filtering into MCP servers.
*   **Auth already works:** CLIs leverage existing authentication flows like `aws sso login` and `gh auth refresh`, eliminating the need for MCP-specific troubleshooting.
*   **No moving parts:** CLIs are simple binaries, avoiding the complexity of managing background processes and state associated with MCP servers.
*   **Practical pain points of MCP:**
    *   Flaky initialization.
    *   Constant re-authentication.
    *   Limited permission control.
*   **When MCP might make sense:** MCP could be suitable for tools lacking CLI equivalents or when a standardized interface is essential.
*   **The real lesson:** The best tools are those that work for both humans and machines. CLIs have evolved over decades and offer composability, debuggability, and integration with existing authentication systems.
*   **A plea to builders:** Companies should prioritize building good APIs and CLIs instead of investing in MCP servers.

