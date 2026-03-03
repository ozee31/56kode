---
author: Addy Osmani
pubDatetime: 2026-03-03T17:08:17.348Z
title: "My LLM coding workflow going into 2026"
slug: "my-llm-coding-workflow-going-into-2026"
description: "Discover a structured approach to AI-assisted coding for 2026. Learn how to plan, scope, and test with LLMs for efficient and accountable software development."
url: "https://addyo.substack.com/p/my-llm-coding-workflow-going-into"
tags:
  - llm
  - ai-assisted-development
  - coding-workflow
  - code-generation
  - claude
rating: 5
---

# LLM Coding Workflow for 2026

This article outlines a structured approach to using LLMs for coding, emphasizing the importance of planning, context, and human oversight. It's based on the author's experience and community best practices, focusing on "AI-assisted engineering" rather than full automation.

## Key Takeaways

*   **Plan First:** Don't jump straight into code generation. Start with a detailed specification and project plan created in collaboration with the LLM.
*   **Scope Management:** Break down projects into small, manageable tasks for the LLM to handle iteratively.
*   **Context is King:** Provide the LLM with all relevant code, documentation, and constraints.
*   **Model Selection:** Choose the right LLM for the task and don't hesitate to switch models if one isn't performing well.
*   **AI-Assisted SDLC:** Leverage AI tools across the entire software development lifecycle.
*   **Review and Test:** Never blindly trust LLM output. Always review and test thoroughly.
*   **Frequent Commits:** Use frequent commits as "save points" to undo AI missteps.
*   **Style Guides and Rules:** Steer the AI with style guides, examples, and rules files.
*   **CI/CD and Linters:** Use CI/CD, linters, and code review bots to catch mistakes automatically.
*   **Continuous Learning:** Treat every AI coding session as a learning opportunity.

## Detailed Breakdown

### Planning and Specification

*   Begin by brainstorming a detailed specification with the AI, outlining requirements, architecture decisions, data models, and testing strategies.
*   Use the spec to generate a project plan, breaking the implementation into logical tasks.
*   Iterate on the plan until it's coherent and complete.

### Scope Management and Iteration

*   Avoid asking the AI for large, monolithic outputs.
*   Break the project into iterative steps or tickets.
*   Focus on implementing one function, fixing one bug, or adding one feature at a time.
*   Use tools like Cursor to execute a sequence of prompts from a structured "prompt plan" file.

### Providing Context

*   Feed the AI all the information it needs, including code, technical constraints, and known pitfalls.
*   Use tools like Anthropic's Claude to import entire GitHub repos.
*   Manually copy important pieces of the codebase or API docs into the conversation.
*   Consider using tools like `gitingest` or `repo2txt` to dump relevant parts of your codebase into a text file for the LLM to read.
*   Guide the AI with comments and rules inside the prompt.

### Model Selection and Experimentation

*   Choose the model best suited to each task.
*   Try multiple LLMs in parallel to cross-check approaches.
*   Use the newest "pro" tier models for better quality.

### AI-Assisted SDLC and Automation

*   Use CLI tools like Claude Code, OpenAI’s Codex CLI, and Google’s Gemini CLI.
*   Explore asynchronous coding agents like Google’s Jules and GitHub’s Copilot Agent.
*   Use orchestration tools like Conductor to run multiple agents in parallel.

### Review, Testing, and Quality Assurance

*   Never blindly trust an LLM's output.
*   Treat every AI-generated snippet as if it came from a junior developer.
*   Weave testing into the workflow, including generating tests or a testing plan.
*   Do code reviews, both manual and AI-assisted.
*   Use tools like Chrome DevTools MCP for debugging and quality assurance.

### Version Control and Collaboration

*   Commit early and often.
*   Use branches or worktrees to isolate AI experiments.
*   Leverage commit history to brief the AI on changes.

### Tuning and Customization

*   Provide style guides, examples, and "rules files" to influence the AI's output.
*   Use custom instructions or system prompts to configure the AI's behavior.
*   Provide in-line examples of the desired output format or approach.

### Continuous Integration and Automation

*   Ensure a robust continuous integration setup with automated tests and code style checks.
*   Include linter output in the prompt.
*   Use code review bots as additional prompts for improvement.

### Learning and Skill Development

*   Treat every AI coding session as a learning opportunity.
*   Use AI as a research assistant to explore new languages, frameworks, and techniques.

### Conclusion

The author advocates for an "AI-augmented software engineering" approach, emphasizing the importance of classic software engineering disciplines in AI collaborations. The human engineer remains the director of the show, guiding the AIs, learning from them, and amplifying their productivity responsibly.

