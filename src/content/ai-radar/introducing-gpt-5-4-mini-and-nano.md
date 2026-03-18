---
author: Unknown
pubDatetime: 2026-03-18T08:53:55.392Z
title: "Introducing GPT-5.4 mini and nano"
slug: "introducing-gpt-5-4-mini-and-nano"
description: "Explore GPT-5.4 mini and nano, OpenAI's new small models designed for speed and efficiency. Learn about their capabilities in coding, reasoning, and tool use."
url: "https://openai.com/index/introducing-gpt-5-4-mini-and-nano/"
tags:
  - gpt-5.4
  - gpt-5.4 mini
  - gpt-5.4 nano
  - openai
  - large-language-model
rating: 4
---

# GPT-5.4 mini and nano Release

OpenAI has released GPT-5.4 mini and nano, two new smaller models designed for high-volume workloads where speed and cost are critical.

## Key Features and Improvements

*   **GPT-5.4 mini:**
    *   Significantly improves upon GPT-5 mini in coding, reasoning, multimodal understanding, and tool use.
    *   Runs more than 2x faster than GPT-5 mini.
    *   Approaches the performance of the larger GPT-5.4 model on evaluations like SWE-Bench Pro and OSWorld-Verified.
*   **GPT-5.4 nano:**
    *   The smallest and cheapest version of GPT-5.4.
    *   Suitable for tasks where speed and cost are paramount.
    *   Recommended for classification, data extraction, ranking, and coding subagents handling simpler tasks.

## Use Cases

These models are designed for applications where latency directly impacts the user experience, such as:

*   Coding assistants
*   Subagents
*   Computer-using systems interpreting screenshots
*   Real-time multimodal applications

The article emphasizes that the best model isn't always the largest, but the one that responds quickly, uses tools reliably, and performs well on complex tasks.

## Performance Benchmarks

The article includes performance benchmarks comparing GPT-5.4, GPT-5.4 mini, GPT-5.4 nano, and GPT-5 mini on various tasks, including:

*   SWE-Bench Pro
*   Terminal-Bench 2.0
*   Toolathlon
*   GPQA Diamond
*   OSWorld-Verified

These benchmarks demonstrate the improved performance of GPT-5.4 mini and nano compared to their predecessors.

## Customer Feedback

Early customer testing indicates that GPT-5.4 mini and nano are particularly effective in coding workflows that benefit from fast iteration, such as targeted edits, codebase navigation, front-end generation, and debugging.

## System Composition

The article suggests a system architecture where larger models like GPT-5.4 handle planning and coordination, while smaller models like GPT-5.4 mini execute subtasks in parallel.

## Multimodal Capabilities

GPT-5.4 mini is also strong in multimodal tasks, especially those related to computer use, such as interpreting screenshots.

## Availability and Pricing

*   **GPT-5.4 mini:** Available in the API, Codex, and ChatGPT.
    *   Supports text and image inputs, tool use, function calling, web search, file search, computer use, and skills.
    *   400k context window.
    *   Pricing: $0.75 per 1M input tokens and $4.50 per 1M output tokens.
*   **GPT-5.4 nano:** Available only in the API.
    *   Pricing: $0.20 per 1M input tokens and $1.25 per 1M output tokens.

## Performance Data

The article provides detailed performance data across various categories:

*   Coding
*   Tool-calling
*   Intelligence
*   MM / Vision / CUA
*   Long context

These tables compare the performance of GPT-5.4, GPT-5.4 mini, GPT-5.4 nano, and GPT-5 mini on specific benchmarks within each category.
