---
author: Unknown
pubDatetime: 2026-03-26T07:44:11.874Z
title: "Reduce hallucinations"
slug: "reduce-hallucinations"
description: "Learn how to minimize hallucinations in Claude, ensuring more accurate and trustworthy AI-driven solutions. Explore strategies like allowing 'I don't know' responses."
url: "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations"
tags:
  - claude
  - hallucination
  - prompt-engineering
  - llm
rating: 4
---

# Reducing Hallucinations in Claude

This article provides strategies to minimize hallucinations (factually incorrect or inconsistent text generation) in Claude, a large language model.

## Basic Hallucination Minimization Strategies

*   **Allowing "I don't know":** Explicitly instruct Claude to admit uncertainty when it lacks sufficient information. Example prompt:

    ```
    RoleContentUserAs our M&A advisor, analyze this report on the potential acquisition of AcmeCo by ExampleCorp.<report>{{REPORT}}</report>Focus on financial projections, integration risks, and regulatory hurdles. If you're unsure about any aspect or if the report lacks necessary information, say "I don't have enough information to confidently assess this."
    ```
*   **Using Direct Quotes for Factual Grounding:** For long documents, ask Claude to extract word-for-word quotes before performing a task. This grounds responses in the actual text. Example prompt:

    ```
    RoleContentUserAs our Data Protection Officer, review this updated privacy policy for GDPR and CCPA compliance.<policy>{{POLICY}}</policy>1. Extract exact quotes from the policy that are most relevant to GDPR and CCPA compliance. If you can't find relevant quotes, state "No relevant quotes found."2. Use the quotes to analyze the compliance of these policy sections, referencing the quotes by number. Only base your analysis on the extracted quotes.
    ```
*   **Verify with Citations:** Make Claude's responses auditable by having it cite quotes and sources for each claim. It can also verify each claim by finding a supporting quote after generating a response. If a quote cannot be found, the claim should be retracted. Example prompt:

    ```
    RoleContentUserDraft a press release for our new cybersecurity product, AcmeSecurity Pro, using only information from these product briefs and market reports.<documents>{{DOCUMENTS}}</documents>After drafting, review each claim in your press release. For each claim, find a direct quote from the documents that supports it. If you can't find a supporting quote for a claim, remove that claim from the press release and mark where it was removed with empty [] brackets.
    ```

## Advanced Techniques

*   **Chain-of-thought verification:** Ask Claude to explain its reasoning step-by-step before giving a final answer to reveal faulty logic.
*   **Best-of-N verification:** Run Claude through the same prompt multiple times and compare the outputs to identify inconsistencies.
*   **Iterative refinement:** Use Claude's outputs as inputs for follow-up prompts, asking it to verify or expand on previous statements to catch and correct inconsistencies.
*   **External knowledge restriction:** Explicitly instruct Claude to only use information from provided documents and not its general knowledge.

## Important Note

These techniques significantly reduce hallucinations, but they don't eliminate them entirely. Always validate critical information, especially for high-stakes decisions.
