---
author: Boris Tane
pubDatetime: 2026-02-27T16:33:31.459Z
title: "The Software Development Lifecycle Is Dead"
slug: "the-software-development-lifecycle-is-dead"
description: "AI agents have collapsed the traditional SDLC. The new workflow is a tight loop of intent, build, and observe, with context engineering as the key skill."
url: "https://boristane.com/blog/the-software-development-lifecycle-is-dead/"
tags:
  - ai
  - sdlc
  - software-development
  - automation
  - devops
rating: 5
---

# The Software Development Lifecycle Is Dead

The author argues that the traditional Software Development Lifecycle (SDLC) is obsolete due to the rise of AI agents in software development. The core idea is that AI has not just made the SDLC faster but has fundamentally changed it, collapsing multiple stages into a single iterative loop.

## The Old SDLC

The classic SDLC consists of discrete, sequential stages:

1.  Requirements
2.  System Design
3.  Implementation
4.  Testing
5.  Code Review
6.  Deployment
7.  Monitoring

Each stage has its own tools and processes, such as Jira for requirements, Figma for design, VS Code for implementation, Jest for testing, GitHub for code review, AWS for deployment, and Datadog for monitoring.

## The New AI-Driven Workflow

With AI coding agents, the SDLC collapses into a simple loop:

```
Intent -> Agent (Code + Tests + Deployment) -> Does it work? -> Ship
```

This eliminates the discrete stages and handoffs of the traditional SDLC. Engineers who started their careers after the advent of AI coding tools often don't even know what the SDLC is because they've never needed it.

## The Collapsing Stages

The author breaks down how each stage of the SDLC is being transformed:

### Requirements Gathering

*   Traditional: PM writes a PRD, engineers estimate, spec is frozen.
*   New: Requirements are fluid and emerge from iteration. Agents generate versions quickly, allowing for experimentation and refinement.
*   Jira transforms from a project management tool to a context store, but a poor one.

### System Design

*   Traditional: Design is done upfront, with whiteboarding and debate.
*   New: Design is discovered through collaboration with AI agents, which can suggest architectures based on vast knowledge.

### Implementation

*   The agent writes the code, including error handling, types, and edge cases.
*   Engineers focus on reviewing, providing context, and addressing complex problems.

### Testing

*   Agents write tests alongside the code, making Test-Driven Development (TDD) the default.
*   The QA function as a separate stage is eliminated.

### Code Review

*   The pull request flow is becoming obsolete.
*   Agents can generate many PRs daily, overwhelming human reviewers.
*   The review process needs to be automated, with agents verifying their own work or a second agent reviewing the first.
*   Human review becomes exception-based.

### Deployment

*   Agents automate deployment pipelines with features like feature flags, canary releases, and automatic rollbacks.
*   Deployment is decoupled from release, with code deployed continuously behind a gate.
*   The deployment stage becomes a self-adjusting process.

### Monitoring

*   Monitoring becomes the foundation of the new lifecycle.
*   It serves as the primary safety mechanism, replacing other safeguards.
*   Observability platforms need to evolve to provide closed-loop systems where telemetry data becomes context for the agent.

## The New Lifecycle

The new lifecycle is a tight loop:

```
Human Intent + Context -> AI Agent (Build + Test + Deploy) -> Observe -> Next Intent
```

This eliminates tickets, sprints, story points, PRs, QA phases, and release trains.

## The Key Skill: Context Engineering

The quality of the output from AI agents depends on the quality of the context provided.

The SDLC is dead, and the new skill is context engineering. The new safety net is observability.
