---
author: Unknown
pubDatetime: 2026-03-06T14:13:50.815Z
title: "MCP is dead. Long live the CLI"
slug: "mcp-is-dead-long-live-the-cli"
description: "This article argues that the Model Context Protocol (MCP) is unnecessary and that CLIs offer a superior, more practical approach for LLMs to interact with tools."
url: "https://ejholmes.github.io/2026/02/28/mcp-is-dead-long-live-the-cli.html"
tags:
  - llm
  - cli
  - mcp
  - automation
rating: 4
---

# MCP is dead. Long live the CLI

The author argues that the Model Context Protocol (MCP) is dying and that Command Line Interfaces (CLIs) offer a better alternative for Large Language Models (LLMs) to interact with tools. The article outlines several reasons for this claim:

*   **LLMs don't need a special protocol:** LLMs are proficient at using CLIs due to their training on vast amounts of documentation and code examples.
*   **CLIs are for humans too:** CLIs allow for easier debugging as humans can directly replicate the commands used by LLMs, unlike MCP which requires decoding JSON logs.
*   **Composability:** CLIs can be easily composed using tools like `jq` and `grep`, offering flexibility that MCP lacks.
*   **Auth already works:** CLIs leverage existing authentication mechanisms like `aws sso login` and `gh auth login`, eliminating the need for MCP-specific authentication.
*   **No moving parts:** CLIs are simple binaries, avoiding the complexity of managing MCP servers.
*   **Practical pain points of MCP:** The author highlights issues like flaky initialization, frequent re-authentication, and limited permission control in MCP.

The author concedes that MCP might be useful in cases where a CLI equivalent doesn't exist, or where a standardized interface is needed. However, for most tasks, CLIs are considered simpler, faster to debug, and more reliable.

The article concludes by advocating for companies to prioritize building good APIs and CLIs over investing in MCP servers, as agents can effectively utilize them.
