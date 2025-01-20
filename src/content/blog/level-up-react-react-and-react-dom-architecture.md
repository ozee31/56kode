---
author: 56kode
pubDatetime: 2025-01-20T15:45:00+01:00
modDatetime: 2025-01-20T15:45:00+01:00
title: "Level up React: React and React DOM architecture"
slug: level-up-react-react-and-react-dom-architecture
featured: false
draft: false
tags:
  - react
  - level-up-react
  - basics
description: "Discover why React is split into two packages. Learn how react and react-dom work together, their specific roles, and the benefits of this architecture. A clear explanation with practical examples."
---

## About Level Up React Series

Level Up React is a series of in-depth articles designed to help React developers enhance their skills. We explore React's internal mechanisms, best practices, design patterns, and advanced concepts. These articles are written for React developers who want to go beyond the basics and truly understand how React works under the hood.

## Previous Articles in the Series

1. [**Level Up React: Declarative vs Imperative Programming**](https://www.56kode.com/posts/level-up-react-declarative-programming/)
2. [**Level Up React: Deep Dive into React Elements**](https://www.56kode.com/posts/level-up-react-deep-dive-into-react-elements/)

## Introduction

React is split into two separate packages: `react` and `react-dom`. This separation isn't just a technical choice - it reflects a specific architectural vision. Let's look at these packages and their roles in detail.

## React: the core system

The `react` package contains the basic logic that defines what a React application is. It handles creating and managing components, elements, and the application state.

Specifically, this package manages:

- Creating React elements (the famous Virtual DOM)
- Managing the component system
- Hooks and their internal logic
- Component state management
- Context system
- References (refs)

The `react` package is platform-agnostic, meaning it contains no platform-specific code. This allows React to be used for web, mobile, or desktop applications.

## React DOM: the browser bridge

React DOM is specifically built for the web. Its job is to connect React's virtual world to the actual browser DOM. It turns React instructions into real DOM changes.

Its main responsibilities are:

- Managing initial DOM rendering
- Efficiently updating the DOM when state changes
- Handling browser events
- Optimizing render performance

React DOM uses a sophisticated DOM update system called the reconciler. This system compares the current DOM state with new React instructions to minimize needed changes.

## Why two packages?

This architectural split offers several major benefits:

1. **Portability**
   React's core can work with different renderers. Here's a practical example:

```javascript
// For web with React DOM
import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));
root.render(<App />);

// For mobile with React Native
import { AppRegistry } from "react-native";
AppRegistry.registerComponent("App", () => App);

// The same component can be used in both cases
function App() {
  return (
    <View>
      <Text>Hello World</Text>
    </View>
  );
}
```

2. **Maintenance and evolution**
   Each package can evolve independently. Here's how hooks are implemented in React:

```javascript
// In React package - State management
function useState(initialState) {
  // Internal state management logic
  return [state, setState];
}

// In React DOM - DOM updates
function commitRootImpl(root, renderPriorityLevel) {
  // DOM update logic
}
```

3. **Size and performance**
   This split helps optimize package sizes. On mobile platforms, you don't need React DOM's code.

## React without transpilation

One interesting feature is that you can use React without JSX. Here's how to write components using only createElement:

```javascript
const { createElement, useState } = React;

function Counter() {
  const [count, setCount] = useState(0);

  return createElement("div", null, [
    createElement("p", null, `Counter: ${count}`),
    createElement(
      "button",
      {
        onClick: () => setCount(count + 1),
      },
      "Increment"
    ),
    createElement(
      "button",
      {
        onClick: () => setCount(count - 1),
      },
      "Decrement"
    ),
  ]);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(createElement(Counter));
```

Let's be honest, that's a lot of verbose code to look at! 😅 Here's the same thing with JSX (ah, much easier on the eyes):

```javascript
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}
```

## Conclusion

This two-package architecture shows how good design can make code flexible and maintainable. It lets React work in different environments while keeping the code base consistent and optimized.

Key points:

- React is the brain that decides what to do
- React DOM is the hand that executes these decisions in the browser
- This split lets React work on different platforms
- It enables platform-specific optimizations
- In modern development, it supports advanced features like Server Components and Streaming

This architecture will continue to grow with React 19 and beyond, giving developers more possibilities while keeping the simplicity and flexibility that made React successful.
