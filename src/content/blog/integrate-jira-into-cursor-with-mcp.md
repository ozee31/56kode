---
author: 56kode
pubDatetime: 2025-06-05T17:00:00+02:00
modDatetime: 2025-06-05T17:00:00+02:00
title: "Integrating Jira into Cursor with the Model Context Protocol"
slug: integrate-jira-into-cursor-with-mcp
featured: false
draft: false
tags:
  - cursor
  - ai
description: "Step-by-step guide to connect Jira to Cursor through the Model Context Protocol and streamline your workflow"
---

## Introduction

Task tracking and reading specifications are part of every developer's daily routine. With the **Model Context Protocol** (MCP), the **Cursor** IDE lets you link those external sources to its AI assistant without leaving the editor. This guide explains how to hook a **Jira / Confluence** space to Cursor using an Atlassian MCP server and shows several use cases that save precious time.

## What is the Model Context Protocol?

The MCP defines a standard interface that exposes _tools_ (functions) the Cursor assistant can call. An MCP server can communicate either:

- Via **`stdio`** (a local process started by Cursor)
- Via **HTTP / SSE** (local or remote service)

Once the server is running:

1. Cursor detects the list of tools it exposes (for example: JQL search, issue reading, attachment download).
2. During a chat session, the assistant suggests calling them with the right parameters.
3. You approve the run and the response appears directly in the chat.

The result is displayed. If you need further sorting or filtering, just issue another prompt (e.g. _"Sort these tickets by highest priority"_).

## Setting up an Atlassian MCP server

### Requirements

- Docker installed
- Atlassian Cloud account (Jira + Confluence) and their **API tokens**

### Step-by-step configuration

1. Open **File → Preferences → Cursor Settings**.
2. Select the **MCP** tab then click **Add new global MCP server**.
3. Paste the JSON below, replacing:
   - `ATLASIAN_EMAIL` with your Atlassian email;
   - `ATLASIAN_API_TOKEN` with the token generated for Jira and Confluence.

```jsonc
{
  "mcpServers": {
    "mcp-atlassian": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "CONFLUENCE_URL",
        "-e",
        "CONFLUENCE_USERNAME",
        "-e",
        "CONFLUENCE_API_TOKEN",
        "-e",
        "JIRA_URL",
        "-e",
        "JIRA_USERNAME",
        "-e",
        "JIRA_API_TOKEN",
        "ghcr.io/sooperset/mcp-atlassian:latest",
        "--read-only",
      ],
      "env": {
        "CONFLUENCE_URL": "https://your-instance.atlassian.net/wiki",
        "CONFLUENCE_USERNAME": "ATLASIAN_EMAIL",
        "CONFLUENCE_API_TOKEN": "ATLASIAN_API_TOKEN",
        "JIRA_URL": "https://your-instance.atlassian.net",
        "JIRA_USERNAME": "ATLASIAN_EMAIL",
        "JIRA_API_TOKEN": "ATLASIAN_API_TOKEN",
        "READ_ONLY_MODE": "true",
      },
    },
  },
}
```

> _💡 Environment variables stay on your machine; they are never sent to the LLM._

Save the file; Cursor automatically starts the container and shows the new tools (JQL search, issue reading, etc.).

## Use cases

### 1. Quickly list ongoing tickets

In the chat:

```
List all tickets assigned to me that are currently In Progress.
```

Cursor will trigger:

```json
{
  "tool": "mcp_mcp-atlassian_jira_search",
  "args": {
    "jql": "assignee = currentUser() AND status = 'In Progress'",
    "limit": 15,
    "fields": "summary,status"
  }
}
```

The tickets appear. Ask another prompt to change the sort order or add filters.

### 2. Check code against specifications

```
Compare file src/features/billing/InvoiceForm.ts with issue DEL-777 and highlight any mismatch.
```

Typical flow:

1. Issue fetched via `mcp_mcp-atlassian_jira_get_issue`.
2. Source file read and compared.
3. The assistant returns a concise report in the chat.

### 3. Scaffold a feature from a user story

```
Based on issue DEL-777, create the necessary files (UI component, tests, docs) in TypeScript.
```

The assistant:

- Reads the Jira description.
- Suggests a file structure.
- Generates code and tests with sensible data assumptions.

### 4. Generate an automated test plan

```
Generate a test plan from the acceptance criteria of issue DEL-777.
```

Cursor will:

1. Read the acceptance criteria via `mcp_mcp-atlassian_jira_get_issue`.
2. Extract key scenarios (happy path, edge cases, validations).
3. Propose a `DEL-777.spec.ts` unit test file and a commented E2E scenario (Playwright or Cypress).

Sample underlying call:

```json
{
  "tool": "mcp_mcp-atlassian_jira_get_issue",
  "args": {
    "issue_key": "DEL-777",
    "fields": "summary,description,acceptanceCriteria"
  }
}
```

## Best practices

1. **Tighten your JQL queries**: stay focused to avoid long responses and noise.
2. **Keep read-only mode** (`READ_ONLY_MODE=true`) unless you truly need to create or update issues.
3. **Format chat outputs**: ask the assistant to present lists or reports as Markdown tables for better readability (example: `format the response as a table`).

## Conclusion

Connecting Jira to Cursor through MCP removes countless context switches between IDE and browser—ticket lookup, spec verification, test plan generation. Once the Docker bridge is configured, the assistant becomes a powerful context engine to speed up reviews and development cycles.
