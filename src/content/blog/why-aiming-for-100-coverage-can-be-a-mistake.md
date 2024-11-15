---
author: 56kode
pubDatetime: 2024-11-15T14:34:00+01:00
modDatetime: 2024-11-15T14:34:00+01:00
title: Why aiming for 100% coverage can be a mistake
slug: why-aiming-for-100-coverage-can-be-a-mistake
featured: false
draft: false
tags:
  - testing
  - best-practice
description: Discover why aiming for 100% test coverage in software development can be counterproductive. Learn practical strategies to focus on core functionality, avoid unnecessary tests, and improve code quality without wasting resources.
---

The goal of 100% test coverage in automated testing might seem appealing. In theory, it ensures that every line of code is executed at least once, reducing the likelihood of bugs. However, in practice, this approach can quickly become a waste of time and effort for development teams.

## 100% coverage: the myth of perfection

Achieving perfect coverage does not guarantee bug-free code. Even if every line of code is executed by tests, it does not ensure that real-world scenarios or edge cases are properly accounted for. For instance, bugs caused by interactions between different modules or environment-specific issues can easily slip through.

A common example is a misconfigured production environment. Even with 100% coverage, such an issue is unlikely to be detected by unit tests, highlighting the limitations of focusing solely on metrics.

## The disproportionate effort for the last few percent

In most projects, reaching 80% coverage is achievable with reasonable effort. This typically covers critical paths, primary workflows, and common scenarios. However, achieving the last 20% often requires significantly more effort:

- **Complex mocks** to simulate rare or extreme cases.
- **Unusual scenarios** that occur only under exceptional conditions.

While these efforts may increase the coverage percentage, they often contribute little to the overall quality of the product. They can also burden developers, diverting time away from more valuable tasks.

## The pitfalls of unnecessary tests

Striving for 100% coverage often leads to redundant or unnecessary tests:

- **Getters and setters**: Testing these methods adds to coverage but provides no meaningful insight since they lack logic.
- **Excessive integration tests:** Checking every API call or external interaction can slow down the test suite without significant benefits.
- **Generated code:** Testing auto-generated code, such as models or configurations, is rarely justified.

To avoid these pitfalls, it’s essential to focus testing efforts where they truly matter.

## Prioritize core functionality

A more balanced approach involves concentrating testing efforts on the critical parts of the application:

- **Core business logic**: Any functionality directly tied to your business objectives should have maximum coverage.
- **High-risk areas**: Code segments that are prone to major failures or impact a large user base.

In contrast, secondary features or straightforward components, such as a news management system or static pages, can suffice with minimal coverage.

## A practical approach: test after bugs

When a bug is discovered, a practical strategy is to:

1. Write a test that reproduces the bug in a controlled environment.
2. Fix the bug and ensure the test passes.
3. Add the test to your suite to prevent regressions.

This method ensures testing focuses on real issues, while also safeguarding against similar bugs in the future.

## Conclusion

Rather than chasing an arbitrary metric, it’s better to consider the impact of your tests on the product:

- Which tests ensure your application behaves as expected?
- Where are the greatest risks?
- Which scenarios justify a significant testing effort?

Ultimately, the goal is not to achieve a perfect number but to ensure your tests genuinely contribute to the quality and reliability of your software.
