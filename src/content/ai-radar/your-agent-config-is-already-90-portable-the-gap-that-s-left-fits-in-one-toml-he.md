---
author: Florian Bruniaux
pubDatetime: 2026-08-18T12:26:35.001Z
title: "Your agent config is already 90% portable. The gap that's left fits in one TOML header."
slug: "your-agent-config-is-already-90-portable-the-gap-that-s-left-fits-in-one-toml-he"
description: "Learn how to share AI agent configurations across Claude, Codex, and Cursor using portable standards while handling MCP secrets securely with a custom generator."
url: "https://www.florian.bruniaux.com/blog/articles/portable-agent-config/"
tags:
  - mcp
  - codex
  - claude-code
  - cursor
  - toml
rating: 5
---

This article examines the landscape of configuration portability across major AI coding agents, specifically Claude Code, Codex CLI, and Cursor. The author posits that roughly ninety percent of agent setup is already standardized through shared formats for skills, instructions, and Model Context Protocol servers, allowing developers to maintain a single source of truth rather than duplicating effort per tool. While hooks and sub agents present varying levels of compatibility, with Codex supporting generated equivalents and Cursor showing incomplete plumbing, the core infrastructure remains largely transferable if managed correctly.

Furthermore, the piece identifies a critical security gap within existing synchronization tools like rulesync, which inadvertently exposes secret HTTP headers in clear text when converting MCP configurations to Codex TOML format. To resolve this, the author details a deterministic conversion function that strictly routes environment variable references instead of literal values, ensuring sensitive credentials never land in plain text within generated files. This approach prioritizes safety over convenience, rejecting mixed placeholder strings that could compromise security during the fan out process.

Beyond the technical implementation, the analysis distinguishes between project scoped monorepo configurations and global machine level setups for solo developers, demonstrating how the same engine can serve both scales by redirecting output paths. The discussion concludes by noting the transient nature of these tools, advising readers to verify their local versions against documented behaviors since agent capabilities evolve rapidly. Ultimately, the guide serves as a pragmatic blueprint for maintaining secure, portable AI workflows without relying solely on third party sync utilities that may lack necessary validation logic.
