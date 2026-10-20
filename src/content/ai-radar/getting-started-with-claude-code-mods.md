---
author: Addy Osmani
pubDatetime: 2026-10-20T10:14:45.565Z
title: "Getting started with Claude Code mods"
slug: "getting-started-with-claude-code-mods"
description: "Learn how to build custom JavaScript mods for Claude Code to extend functionality, control UI, and intercept events without needing deep API knowledge initially."
url: "https://claude.dev/blog/getting-started-with-claude-code-mods/"
tags:
  - claude-code
  - typescript
  - plugin-system
  - ai-agents
rating: 4
---

This guide introduces Claude Code mods as lightweight JavaScript or TypeScript modules that run directly within the session to modify behavior or render custom UI. Unlike standard settings, these mods utilize a hook-based architecture where every event passes through a middleware chain, allowing developers to observe, rewrite, or answer requests before Claude processes them. The article emphasizes that while you can describe mods to the AI for rapid prototyping, understanding the underlying API enables deeper customization like persistent state management and dynamic terminal interfaces.

Furthermore, the technical walkthrough demonstrates how to construct a functional mod from scratch, starting with the necessary folder structure and manifest configuration. You will learn to leverage the $ object to access session data and UI components, ensuring that critical information persists across hot reloads by utilizing $.state rather than module variables. This approach allows for real-time feedback loops, such as the Token Weather example which visualizes context window usage without interrupting the workflow. Beyond basic observation, more advanced patterns like holding tool calls for safety checks or replaying file edits are explored through detailed code examples.

Finally, the post concludes with essential engineering habits for maintaining robust extensions, including validation commands and testing strategies against the runtime environment. Sharing your work involves packaging the mod as a marketplace plugin, which democratizes distribution among other users. Ultimately, this resource empowers engineers to tailor their AI coding assistant to specific workflows, transforming a generic tool into a specialized development partner through code-driven customization.
