---
author: Nolan Lawson
pubDatetime: 2026-11-05T10:21:36.830Z
title: "The AI cost of JavaScript frameworks"
slug: "the-ai-cost-of-javascript-frameworks"
description: "A data-driven benchmark comparing JavaScript frameworks built by AI agents, analyzing development cost, token usage, and performance metrics to challenge vibes-based tech decisions."
url: "https://nolanlawson.com/2026/10/28/the-ai-cost-of-javascript-frameworks/"
tags:
  - ai-coding
  - javascript-frameworks
  - benchmarking
  - lighthouse
  - token-cost
rating: 5
---

The author challenges the web development community's reliance on unverified claims regarding framework performance in the age of AI coding agents. To address this, a controlled benchmark was established where an LLM built a Pokémon application across multiple JavaScript frameworks without human intervention. The experiment measured key variables including financial cost, wall-clock time, token consumption, and adherence to accessibility standards via Lighthouse audits.

The findings reveal significant variance in efficiency depending on the chosen stack, with static site generators and lightweight server-side options often outperforming heavy client-side frameworks in terms of token usage and build speed. While performance scores remained relatively consistent across most tools, the data highlights that larger frameworks incur higher maintenance costs due to increased code volume and token requirements for future edits. Furthermore, the stochastic nature of LLMs introduces noise, yet the median results provide actionable insights into which ecosystems currently offer the best ROI for agent-assisted development.

Ultimately, the article advocates for evidence-based decision-making rather than following trends or personal preferences when selecting technology stacks for agentic workflows. By publishing the methodology and encouraging replication, the author aims to shift industry culture toward rigorous testing before committing to new abstractions. This approach ensures that developers prioritize user experience and long-term maintainability over marketing narratives that lack empirical backing.
