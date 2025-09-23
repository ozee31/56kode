---
author: 56kode
pubDatetime: 2025-09-23T10:11:00+02:00
modDatetime: 2025-09-23T10:11:00+02:00
title: "Connect Cursor to Your Browser with Browser-Tools MCP"
slug: connect-cursor-to-your-browser-with-browser-tools-mcp
featured: false
draft: false
tags:
  - cursor
  - mcp
  - browser
  - debugging
  - ai
  - tooling
description: "Learn how to integrate Browser-Tools MCP with Cursor IDE to debug web applications directly from your code editor using AI assistance"
---

## Introduction

[The Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro "Learn about the Model Context Protocol - a new standard for connecting AI assistants to external tools and data sources") transforms how we integrate external tools into IDEs. After exploring [Jira integration with Cursor](https://www.56kode.com/posts/integrate-jira-into-cursor-with-mcp/), we're now looking at Browser-Tools MCP. This server, developed by [@tedx_ai](https://x.com/tedx_ai), connects your Cursor IDE to Chrome or any Chromium-based browser (Edge, Brave, Opera, Vivaldi).

Browser-Tools MCP turns your AI assistant into a debugging partner that can read console logs, inspect network requests, examine selected DOM elements, and capture screenshots automatically. This setup removes the back-and-forth between your editor and browser, speeding up your workflow.

## Architecture and requirements

Browser-Tools MCP has three parts:

- **Browser extension**: Captures console logs, network activity, screenshots, and selected elements.
- **Node server**: Acts as middleware to process and forward data.
- **MCP server**: Implements the MCP protocol and offers debugging tools.

Most data stays on your machine, though cleaned logs and element metadata are sent to the language model. The Node server filters out cookies and sensitive headers before sending anything.

You need:

- Node.js installed
- Chrome or another Chromium-based browser
- A compatible MCP client (Cursor, Windsurf, Cline, Continue, Zed, Claude Desktop)

## Detailed installation

### Step 1: Install the browser extension

Since the extension isn’t yet in the Chrome store, install it manually.

1. Clone the repo:
   ```bash
   git clone https://github.com/AgentDeskAI/browser-tools-mcp.git
   ```
2. Open your browser’s extensions page (`chrome://extensions/`).
3. Enable Developer mode.
4. Click **Load unpacked**, select the `chrome-extension` folder.
5. Verify **BrowserToolsMCP** appears.

### Step 2: Configure the MCP server in Cursor

1. In Cursor, go to **File → Preferences → Cursor Settings**.
2. Click **MCP** in the sidebar.
3. Click **New MCP Server**.
4. Paste this JSON:
   ```json
   {
     "browser-tools": {
       "command": "npx",
       "args": ["@agentdeskai/browser-tools-mcp@1.2.0"]
     }
   }
   ```
5. Save. You should see **browser-tools** online.

### Step 3: Run the Browser-Tools server

In your terminal:

```bash
npx @agentdeskai/browser-tools-server@1.2.0
```

This server runs on port 3025. Open DevTools in the tab you want to monitor (right-click → Inspect) so logs can be captured.

💡 **For detailed documentation with screenshots and videos, visit the [official installation guide](https://browsertools.agentdesk.ai/installation).**

## Available tools

- **Get Console Logs**: Fetches console output, errors, and warnings, with smart truncation.
- **Get XHR Network Logs**: Gathers XHR requests and responses, stripping out cookies and tokens.
- **Capture Screenshot**: Takes a screenshot and can paste it into Cursor automatically.
- **Get Selected Element**: Inspects the DOM structure of the selected element.
- **Lighthouse Audit**: Runs SEO, performance, accessibility, and code-quality audits from the IDE.

## Practical examples

### Debugging JavaScript errors

Imagine a React component with hard-to-reproduce update errors:

```typescript
// Fetch users on mount
useEffect(() => {
  fetchUsers()
    .then(data => {
      setUsers(data);
    })
    .catch(err => {
      console.error("Fetch failed:", err);
    });
}, []);
```

Ask:

```
Analyze console logs to find user update errors.
```

The AI runs **Get Console Logs** and reports patterns.

### Finding network bottlenecks

For a product catalog loading too much data:

```typescript
useEffect(() => {
  fetch("/api/products?limit=1000")
    .then(res => res.json())
    .then(data => setProducts(data));
}, [filters]);
```

Ask:

```
Analyze network requests and point out performance bottlenecks.
```

The AI uses **Get XHR Network Logs** and suggests pagination or caching.

### Debugging UI interactions

For a form submission issue:

```typescript
const handleSubmit = async e => {
  e.preventDefault();
  try {
    await submitOrder(formData);
    window.location.href = `/order/${orderId}`;
  } catch (err) {
    console.error("Submit failed:", err);
  }
};
```

Select the submit button in the page and ask:

```
Analyze the selected element and check for related errors.
```

The AI uses **Get Selected Element** and **Get Console Logs** to find JavaScript errors linked to that button.

### Third-party API validation

For payment integration:

```typescript
fetch("/api/payments/process", {
  method: "POST",
  headers: { "X-API-Key": apiKey },
  body: JSON.stringify(paymentData),
}).then(res => {
  if (!res.ok) throw new Error(res.status);
});
```

Ask:

```
Analyze network logs for payment errors and check status codes.
```

The AI runs **Get XHR Network Logs** to identify 400/500 errors and suggests fixes.

### Responsive and cross-browser debugging

For CSS grid issues:

```css
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
```

Ask:

```
Capture a screenshot and identify layout problems.
```

The AI uses **Capture Screenshot** to generate an image for visual inspection.

### Automated quality audits

For accessibility checks:

```html
<div onClick="closeModal()">
  <button>Close</button>
</div>
```

Ask:

```
Run a Lighthouse audit for accessibility and performance.
```

The AI triggers **Lighthouse Audit** natively and returns practical recommendations.

## Advanced configuration

- **Screenshot Path**: Default `Downloads/mcp-screenshots`.
- **Truncation Limits**: Configure to avoid token limits.
- **Auto-cleanup**: Logs clear on each page refresh; use **Wipe Logs** in the panel to clear manually.

### Combining with other MCP servers

Use Browser-Tools MCP alongside [Jira integration](https://www.56kode.com/posts/integrate-jira-into-cursor-with-mcp/) to build a connected environment where AI can access bug tickets, browser logs, and source code simultaneously.

## Conclusion

Browser-Tools MCP is a major step forward for integrating AI into web debugging. By linking Cursor directly to your browser, it removes friction from debugging workflows and turns your AI assistant into a true development partner.

Immediate ROI comes from automated analysis of console logs, network requests, and DOM inspection. Native Lighthouse audits and automatic screenshot pasting make Browser-Tools MCP essential for any Cursor user using advanced language models.

This integration complements other MCP tools like Jira, creating a seamless, AI-powered development environment that points the future of web development toward ever-closer synergy between AI, business tools, and browsers.
