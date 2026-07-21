---
author: Jean-François Lépine
pubDatetime: 2026-07-21T13:26:52.400Z
title: "When code complexity lives in the prompt"
slug: "when-code-complexity-lives-in-the-prompt"
description: "Discover why traditional code metrics fail for LLM apps and learn new ways to measure prompt complexity based on maintenance effort correlations from recent research."
url: "https://blog.lepine.pro/en/when-code-complexity-lives-in-the-prompt/"
tags:
  - llm
  - prompt-engineering
  - static-analysis
  - software-metrics
rating: 4
---

The article highlights a critical discrepancy between static analysis results and actual maintenance history in LLM components where the code appears simple but the prompt contains complex logic. Traditional metrics like cyclomatic complexity fail to detect this hidden burden because they ignore the natural-language instructions driving the application's behavior. This realization prompted an examination of recent research that evaluated fifty-two potential complexity metrics against real-world maintenance data extracted from open source repositories. The analysis demonstrated that most intuitive measures were merely proxies for file size, whereas specific counts of decision branches and memory references correlated strongly with long-term maintenance effort.

Furthermore, the study revealed counter-intuitive findings regarding prompt structure, showing that prompt volume itself holds little predictive power compared to the density of conditional instructions within the text. In contrast to common intuition, explicit guardrails and schema definitions actually reduced maintenance difficulty by clarifying intent rather than adding cognitive load. This leads to a broader reflection on the evolution of quality tools, suggesting that analyzers must evolve to treat prompts as first-class artifacts capable of being parsed for coupling and control flow.

Ultimately, the article challenges developers to reconsider how they define software quality as logic migrates from executable code to natural language specifications.
