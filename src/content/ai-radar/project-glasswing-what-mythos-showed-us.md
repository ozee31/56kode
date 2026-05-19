---
author: Grant Bourzikas
pubDatetime: 2026-05-19T09:49:57.786Z
title: "Project Glasswing: what Mythos showed us"
slug: "project-glasswing-what-mythos-showed-us"
description: "Cloudflare's Project Glasswing uses Anthropic's Mythos Preview to find vulnerabilities. Learn about exploit chain construction, model limitations, and harness design."
url: "https://blog.cloudflare.com/cyber-frontier-models/?utm_campaign=cf_blog&utm_content=20260517&utm_medium=organic_social&utm_source=twitter"
tags:
  - llm
  - vulnerability-research
  - security
  - mythos
  - project-glasswing
rating: 4
---

# Project Glasswing: Insights from using Mythos Preview for Vulnerability Research

This article details Cloudflare's experience using Anthropic's Mythos Preview LLM as part of Project Glasswing to identify vulnerabilities in their systems. It covers the model's capabilities, limitations, and the architectural considerations for effectively using such tools at scale.

## Key Takeaways

*   **Mythos Preview's advancements:** The model excels at exploit chain construction and proof generation, surpassing previous general-purpose models.
*   **Model Refusals:** Despite lacking explicit safeguards, Mythos Preview exhibits inconsistent organic refusals to certain requests, highlighting the need for additional safety measures in publicly available models.
*   **Signal-to-Noise Problem:** The article discusses the challenges of distinguishing real vulnerabilities from false positives, influenced by programming language and model bias. Mythos Preview improves this by providing proof-of-concepts.
*   **Ineffectiveness of Generic Coding Agents:** The article explains why simply pointing a generic coding agent at a repository is insufficient for comprehensive vulnerability research due to context limitations and throughput issues.
*   **Importance of a Harness:** A harness is crucial for managing the execution of vulnerability research, enabling narrow scoping, adversarial review, split chains, and parallel tasks.

## Vulnerability Discovery Harness Stages

The article outlines Cloudflare's vulnerability discovery harness, detailing each stage:

1.  **Recon:** Agents analyze the repository to create an architecture document, defining trust boundaries and entry points.
2.  **Hunt:** Concurrent agents search for specific attack classes within defined scopes, using tools to compile and run proof-of-concept code.
3.  **Validate:** An independent agent attempts to disprove the initial findings.
4.  **Gapfill:** Areas with insufficient coverage are re-queued for further analysis.
5.  **Dedupe:** Duplicate findings with the same root cause are consolidated.
6.  **Trace:** Agents determine if attacker-controlled input can reach the vulnerability from outside the system.
7.  **Feedback:** Reachable traces become new hunt tasks in consumer repositories.
8.  **Report:** A structured report is generated and submitted to an ingest API.

## Implications for Security Teams

*   **Speed is not enough:**  Simply patching faster isn't sufficient; architectural changes are needed to make exploitation more difficult.
*   **Defense in Depth:** Implement defenses that block vulnerabilities from being reached and design applications to limit the impact of flaws.
*   **Rapid Deployment:** Ensure the ability to quickly deploy fixes across all running instances of the code.

The article concludes by acknowledging the dual-use nature of these capabilities and Cloudflare's commitment to protecting its customers.
