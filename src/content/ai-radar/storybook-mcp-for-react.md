---
author: Kyle Gach
pubDatetime: 2026-03-25T08:14:33.969Z
title: "Storybook MCP for React"
slug: "storybook-mcp-for-react"
description: "Learn how Storybook MCP enhances AI agents with component metadata, enabling them to reuse components, self-verify with tests, and generate UI faster."
url: "https://storybook.js.org/blog/storybook-mcp-for-react/"
tags:
  - storybook
  - react
  - mcp
  - ai-agents
  - component-testing
rating: 4
---

# Storybook MCP for React

This article introduces Storybook MCP (Machine Communication Protocol) and its benefits for AI agents interacting with React components.

## Key Features and Benefits

*   **Component Awareness:** MCP provides AI agents with context about existing components (stories, API, docs), enabling reuse and preventing the creation of new, inconsistent patterns.
*   **Faster UI Generation:** Using MCP allows agents to generate UI faster and with fewer tokens compared to working without it.
*   **Composition Support:** The MCP server supports composition, allowing agents to access components from multiple Storybooks without needing multiple endpoints.
*   **Remote MCP Publishing:** Storybook MCP servers can be published remotely, allowing team members to access component context without running Storybook locally. Chromatic offers built-in support for publishing with quality checks, versioning, and secure authorization.
*   **Story Previews:** MCP embeds live Storybook stories directly within the agent's chat UI, allowing developers to visually verify the generated UI and interactions.
*   **Self-Verification with Tests:** MCP equips agents with tools to run component and accessibility tests, providing focused and fast feedback. Agents can automatically apply fixes or alert developers when human intervention is needed.

## Getting Started

Storybook MCP is available in Storybook 10.3+ for React projects.

1.  **Upgrade Storybook:**

    ```bash
    npx storybook@latest upgrade
    ```
2.  **Install and Register the Addon:**

    ```bash
    npx storybook add @storybook/addon-mcp
    ```
3.  **Add the MCP Server to Your Client:**

    ```bash
    npx mcp-add --type http --url "http://localhost:6006/mcp" --scope project
    ```

MCP support for other frameworks is planned for later this year.
