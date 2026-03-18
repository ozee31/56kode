---
author: Jim Clyde Monge
pubDatetime: 2026-03-18T09:12:32.556Z
title: "NVIDIA Releases NemoClaw to Improve OpenClaw's Security"
slug: "nvidia-releases-nemoclaw-to-improve-openclaw-s-security"
description: "Learn about NVIDIA's NemoClaw, a security-focused runtime layer for OpenClaw that enhances the safety of autonomous agents by enforcing strict policies."
url: "https://generativeai.pub/nvidia-releases-nemoclaw-to-improve-openclaws-security-f7bf6e0131e0"
tags:
  - nvidia
  - nemoclaw
  - openclaw
  - openshell
  - autonomous-agents
rating: 4
---

# NVIDIA NemoClaw: Enhancing OpenClaw Security

NVIDIA has released NemoClaw, a security-focused runtime layer designed to improve the security of OpenClaw. It aims to make autonomous agents safer to run by enforcing strict policies without limiting their capabilities.

## What is NemoClaw?

NemoClaw is a runtime layer that sits on top of OpenClaw, constraining agent behavior through a controlled environment with explicit rules for data access, network calls, and execution. It uses OpenShell as the secure execution layer, sandboxing each agent and enforcing policy checks for all actions.

### Key Features:

-   **Runtime Layer:** Enforces agent behavior.
-   **OpenShell Integration:** Provides a secure execution environment.
-   **Sandboxing:** Isolates agents to prevent direct system interaction.
-   **Policy Enforcement:** Controls file access, network traffic, and model inference.

### Workflow:

1.  Agent action triggers.
2.  Action passes through policy checks.
3.  OpenShell mediates the action.
4.  Action is executed within the sandbox.

## OpenShell: The Foundation of NemoClaw

OpenShell is a secure runtime that executes autonomous agents inside isolated environments. It acts as a control layer between the agent and the system.

### Key Aspects:

-   **Sandboxed Containers:** Each agent runs in a container with strict rules.
-   **Declarative Policies:** Rules are defined using declarative policies.
-   **Inference Routing:** Model requests are routed through a gateway for control.

## Setting Up NemoClaw

### Prerequisites:

-   Linux environment (Ubuntu 22.04 or newer).
-   Docker installed and running.
-   Node.js version 20 or higher.
-   OpenShell available.
-   Optional: NVIDIA GPU for local model execution.

### Installation:

```bash
curl -fsSL https://nvidia.com/nemoclaw.sh | bash
```

The script handles dependencies, integrates with OpenClaw, and launches an onboarding flow.

### Post-Installation:

-   Create a sandbox.
-   Configure inference.
-   Apply security policies.

### Interacting with NemoClaw:

```bash
nemoclaw my-assistant connect
openclaw tui
```

This opens an interactive interface to chat with the agent. The NemoClaw CLI and OpenShell provide debugging information.

### Alternative: NVIDIA Brev

NVIDIA offers a hosted environment via NVIDIA Brev for those without a Linux setup.

## NemoClaw vs. OpenClaw

-   **OpenClaw:** A platform for building agents, focusing on flexibility.
-   **NemoClaw:** Defines how agents are allowed to run, emphasizing security.

NemoClaw enforces boundaries, restricting file access, filtering network calls, and routing inference through a controlled gateway.

## Final Thoughts

NemoClaw addresses the security concerns associated with OpenClaw by providing proper isolation for autonomous agents. While early users may encounter installation issues, NVIDIA is expected to improve documentation and installation flows. NemoClaw is a significant step towards making autonomous agents safer, especially in enterprise settings.
