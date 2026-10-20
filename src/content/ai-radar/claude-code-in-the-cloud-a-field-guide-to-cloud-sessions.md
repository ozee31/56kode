---
author: Addy Osmani
pubDatetime: 2026-10-20T10:15:42.720Z
title: "Claude Code in the cloud: a field guide to cloud sessions"
slug: "claude-code-in-the-cloud-a-field-guide-to-cloud-sessions"
description: "Learn to run AI coding agents on virtual machines for parallel tasks, secure GitHub integration, and automated CI workflows without affecting your local setup."
url: "https://claude.dev/blog/claude-code-in-the-cloud/"
tags:
  - claude-code
  - ai-coding
  - github-integration
  - ci-cd
rating: 5
---

The article introduces Anthropic’s cloud sessions for Claude Code, fundamentally shifting how developers interact with AI agents by moving execution off the local machine onto isolated virtual machines. Unlike traditional terminal sessions that share working trees and credentials, each cloud task spawns a fresh VM with its own branch, allowing multiple concurrent operations without port conflicts or file collisions. This architectural shift enables parallel processing of unrelated fixes, such as debugging flaky tests or updating documentation simultaneously, which would otherwise require complex manual worktree management on a single laptop.

Furthermore, the guide details critical security and integration patterns, emphasizing that GitHub tokens remain external proxies while sessions receive short-lived credentials scoped to specific branches. This design supports robust CI/CD workflows where agents can autonomously address failing checks or review comments via the GitHub App, effectively acting as a persistent bot within the pull request lifecycle. The author also outlines seven distinct workflows ranging from backlog clearing to untrusted code execution, highlighting how network policies and environment hooks ensure safety while maintaining necessary access to package registries and private repositories.

Finally, successful implementation relies on configuring session-specific environments through setup scripts and repository-local settings rather than user-level configurations. By committing plans locally before executing them in the cloud, developers can maintain control over the approach while leveraging the VM’s compute power for intensive verification loops like running test suites hundreds of times. Ultimately, this tool transforms AI assistance from a reactive pair programmer into a scalable backend service capable of handling asynchronous development tasks independently of the developer’s immediate availability.
