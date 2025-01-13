---
author: 56kode
pubDatetime: 2025-01-13T12:30:00+01:00
modDatetime: 2025-01-13T12:30:00+01:00
title: "Level Up React : Deep Dive into React Elements"
slug: level-up-react-deep-dive-into-react-elements
featured: false
draft: false
tags:
  - react
  - level-up-react
  - basics
description: "Learn how React Elements work under the hood. Understand their structure, creation process, and the reconciliation mechanism. A comprehensive guide for React developers"
---

## About Level Up React Series

Level Up React is a series of in-depth articles designed to help React developers enhance their skills. We explore React's internal mechanisms, best practices, design patterns, and advanced concepts. These articles are written for React developers who want to go beyond the basics and truly understand how React works under the hood.

## Previous Articles in the Series

1. [**Level Up React: Declarative vs Imperative Programming**](https://www.56kode.com/posts/level-up-react-declarative-programming/)

## What is a React Element?

A React Element is simply a JavaScript object that describes a node in the user interface. It's the smallest building block in React. Let's look at its structure:

```javascript
// Basic structure of a React Element
{
  $$typeof: Symbol.for('react.element'),
  type: 'div',
  key: null,
  ref: null,
  props: {
    children: 'Hello World'
  }
}
```

Let's analyze each property:

### The $$typeof property

```javascript
$$typeof: Symbol.for("react.element");
```

This property is an internal signature that React uses to identify objects representing React elements from other JavaScript objects. It's an internal React mechanism that we typically don't need to handle directly in our code.

### The type property

The `type` determines the nature of the element:

```javascript
// 1. For native HTML elements
{
  type: "div"; // or 'span', 'p', etc.
}

// 2. For React components
{
  type: MyComponent; // direct reference to the function or class
}

// 3. For fragments
{
  type: Symbol.for("react.fragment");
}
```

### The props

The `props` contain all the data and content of the element:

```javascript
{
  type: 'button',
  props: {
    className: 'btn',
    onClick: () => console.log('click'),
    children: 'Click me'
  }
}
```

The special `children` property can take several forms:

```javascript
// 1. A simple string
{
  props: {
    children: 'Simple text'
  }
}

// 2. Another React Element
{
  props: {
    children: {
      $$typeof: Symbol.for('react.element'),
      type: 'span',
      props: { children: 'Text in span' }
    }
  }
}

// 3. An array of elements
{
  props: {
    children: [
      { $$typeof: Symbol.for('react.element'), type: 'li', props: { children: '1' } },
      { $$typeof: Symbol.for('react.element'), type: 'li', props: { children: '2' } }
    ]
  }
}
```

### The key and ref properties

```javascript
{
  key: 'unique-id', // Used for list reconciliation
  ref: null // Can contain a reference to the DOM element or component
}
```

## How React Creates These Elements?

When you write JSX:

```jsx
const element = <div className="container">Hello</div>;
```

Babel transforms it into:

```javascript
const element = React.createElement("div", { className: "container" }, "Hello");
```

`React.createElement` then builds the complete React Element object:

```javascript
// Simplified pseudo-code of React.createElement
function createElement(type, config, children) {
  // Extract special props
  let key = config?.key || null;
  let ref = config?.ref || null;

  // Build props
  const props = {};
  for (let propName in config) {
    if (
      hasOwnProperty.call(config, propName) &&
      propName !== "key" &&
      propName !== "ref"
    ) {
      props[propName] = config[propName];
    }
  }

  // Handle children
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    props.children = Array.prototype.slice.call(arguments, 2);
  }

  // Build the Element
  return {
    $$typeof: Symbol.for("react.element"),
    type,
    key,
    ref,
    props,
  };
}
```

## Nested Elements

Elements can form complex trees:

```javascript
// JSX
<div className="parent">
  <h1>Title</h1>
  <p>Paragraph</p>
</div>

// Becomes the object
{
  $$typeof: Symbol.for('react.element'),
  type: 'div',
  props: {
    className: 'parent',
    children: [
      {
        $$typeof: Symbol.for('react.element'),
        type: 'h1',
        props: { children: 'Title' }
      },
      {
        $$typeof: Symbol.for('react.element'),
        type: 'p',
        props: { children: 'Paragraph' }
      }
    ]
  }
}
```

## Element Reconciliation

Reconciliation is the process by which React determines what changes to apply to the DOM by comparing two React Element trees.

### The Comparison Process

React compares Elements recursively:

```javascript
// Old Element
const oldElement = {
  type: "div",
  props: {
    className: "old",
    children: [
      {
        type: "p",
        props: { children: "Text" },
      },
    ],
  },
};

// New Element
const newElement = {
  type: "div",
  props: {
    className: "new",
    children: [
      {
        type: "p",
        props: { children: "New text" },
      },
    ],
  },
};
```

### Reconciliation Rules

1. **If types are different**:

```javascript
// Old
{ type: 'div', props: { children: 'text' } }
// New
{ type: 'span', props: { children: 'text' } }
// → The old subtree is destroyed and a new one is created
```

2. **If the type stays the same**:

```javascript
// Old
{ type: 'div', props: { className: 'old', children: 'text' } }
// New
{ type: 'div', props: { className: 'new', children: 'text' } }
// → Only the attributes are updated
```

3. **For lists**:

```javascript
// Old
[
  { type: "li", key: "1", props: { children: "one" } },
  { type: "li", key: "2", props: { children: "two" } },
][
  // New
  ({ type: "li", key: "2", props: { children: "two" } },
  { type: "li", key: "1", props: { children: "one modified" } })
];
// → React uses keys to identify elements that have moved
```

### The Importance of Keys

Keys help React identify each element in a list:

```javascript
// Without keys, React can't know if elements were reordered
// or replaced
[
  { type: "li", props: { children: "A" } },
  { type: "li", props: { children: "B" } },
][
  // With keys, React can track movements
  ({ type: "li", key: "a", props: { children: "A" } },
  { type: "li", key: "b", props: { children: "B" } })
];
```

Smart reconciliation allows React to minimize DOM operations and provide good performance even with complex interfaces.

## Conclusion

Understanding React Elements is crucial for any React developer. These simple JavaScript objects are the foundation of everything in React. By knowing how they work and how React uses them, you can better understand:

- How JSX is transformed into these objects
- Why React needs unique keys for lists
- How React efficiently updates the DOM through reconciliation

Remember that even complex React applications are built from these basic building blocks. While you don't need to work directly with React Elements in most cases, understanding their structure helps you write better React code.

You can find all Level Up React articles at: https://www.56kode.com/tags/level-up-react/
