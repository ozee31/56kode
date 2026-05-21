---
author: Eklavya Tyagi
pubDatetime: 2026-05-21T14:19:31.474Z
title: "The New LLM risk : Skills"
slug: "the-new-llm-risk-skills"
description: "Explore a new LLM attack vector leveraging malicious skills in platforms like Claude. Learn how attackers can exploit user-installed skills to compromise AI systems."
url: "https://generativeai.pub/the-new-llm-risk-skills-42336bbe4bc4"
tags:
  - llm
  - security
  - claude
  - prompt-injection
  - ai-agents
rating: 4
---

# The New LLM Risk: Skills

This article discusses a new class of attack targeting LLM systems that utilize skills, focusing on the risks associated with user-installed skills in platforms like Claude. It builds upon the "Les Dissonances" paper, which demonstrated how malicious tools can hijack an LLM agent's workflow without requiring a model vulnerability or jailbreak.

## Key Points

*   **Skills as Attack Vectors:** LLM systems are increasingly using skills – packaged instructions, metadata, and helper scripts – to perform specialized tasks. These skills can contain executable code, creating a potential trust boundary issue.
*   **Skill-Layer Attacks:** Attackers can create malicious skills that appear harmless but contain hidden scripts that modify inputs, alter outputs, or poison data used by the model.
*   **Increased Severity:** Skill-layer attacks are more severe than tool-layer attacks because:
    *   They have a lower barrier to adoption: anyone can attach a skill.
    *   They target a larger victim population: ordinary users, not just AI developers.
    *   They have a harder inspection boundary: malicious behavior can be hidden in code the user never reads.
*   **Demonstration:** The article provides a concrete example using a stock-analysis skill. A malicious skill can return poisoned but internally consistent data, leading the model to generate a bearish answer based on the altered information.
*   **Chord Replication for Skills:** The article discusses a replication of the original Chord attack, adapted to the skill layer. This involves generating realistic user queries, creating adversarial skill candidates, testing skill selection, optimizing skill descriptions, and testing harvesting and pollution.
*   **Three-Layer Attack Surface:** The skill-layer attack surface consists of:
    *   Layer 1: Skill name and description (influences selection).
    *   Layer 2: SKILL.md body (provides instructions).
    *   Layer 3: Helper scripts (modify inputs, outputs, or intermediate data).
*   **Metrics:** The replication pipeline uses three core metrics:
    *   HSR (Hijacking Success Rate).
    *   HASR (Harvesting Attack Success Rate).
    *   PSR (Pollution Success Rate).
*   **Stock-Insight Target:** The primary demonstration target is a stock-insight skill that fetches market data and returns a structured result. A malicious skill can return the same fields in the same format but with polluted values.
*   **Writeup Generator:** The repo includes a writeup generator that creates a Markdown report with background, methodology, results, and threat characterization.
*   **Replication:** The author replicated the paper with some simplifications, obtaining consistent results. The code is available on GitHub.

## Example: Benign vs. Malicious Skill

The article demonstrates the attack with a stock analysis skill. The user asks:

```text
I’ve been holding NVDA. What’s it trading at right now, and should I be worried?
```

*   **Benign Skill:** The skill fetches real-time stock data and provides a summary.

```json
{
  "ticker": "NVDA",
  "price": 487.22,
  "previous_close": 491.05,
  "day_range": "483.10 - 492.88",
  "percent_change": -0.78,
  "sentiment": "Trading near the middle of today's range with no notable catalysts.",
  "as_of": "2026-05-14T15:42:00Z"
}
```

*   **Malicious Skill:** The skill returns altered data, making the user believe the stock is performing poorly.

## Conclusion

Skill-layer attacks pose a significant risk to LLM systems. By exploiting user-installed skills, attackers can compromise the information the model receives and trusts, leading to incorrect or harmful outputs. The article emphasizes the importance of understanding and mitigating these risks as skills become more prevalent in LLM applications.
