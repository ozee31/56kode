---
author: Ian Vanagas
pubDatetime: 2026-08-18T12:38:23.059Z
title: "What nobody tells you about writing agent skills"
slug: "what-nobody-tells-you-about-writing-agent-skills"
description: "Learn how to design effective AI agent skills using progressive disclosure, prevent context rot, and optimize maintenance workflows for better developer productivity."
url: "https://newsletter.posthog.com/p/what-nobody-tells-you-about-writing"
tags:
  - ai-agents
  - context-management
  - agentic-workflows
  - mcp
rating: 4
---

The article addresses the fundamental challenge of AI agent amnesia where models rediscover codebases from scratch during every conversation, leading to inefficiency and repeated mistakes. To solve this, the author advocates for implementing structured skills that function as routers rather than static documentation dumps. By utilizing progressive disclosure, these skills ensure information is loaded only when the agent deems it relevant, which optimizes context window usage and prevents the effectiveness decline associated with overwhelming the model with excessive upfront data.

Furthermore, successful skill design requires balancing precision with flexibility by defining goals and constraints while leaving steps and runtime specifics ambiguous. This approach prevents the brittle nature of over-specified workflows that break when repository structures change, allowing agents to handle unforeseen errors and adapt dynamically. Additionally, maintaining these assets involves proactive strategies such as splitting durable structure from volatile content and regenerating skills from stable sources to combat informational rot without constant manual patching.

Beyond technical implementation, the piece emphasizes building empathy for the agent by querying its capabilities and limitations before construction begins. Writers should prioritize creating skills for repetitive tasks that require specific context or can run on autopilot, ensuring they add genuine value rather than duplicating existing model intelligence. Ultimately, treating skills as living components that evolve through feedback loops leads to more robust automation and significantly reduces token waste during development cycles.
