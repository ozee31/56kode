---
author: 56kode
pubDatetime: 2025-01-6T11:00:00+01:00
modDatetime: 2025-01-6T11:00:00+01:00
title: "Level Up React : Declarative vs Imperative Programming"
slug: level-up-react-declarative-programming
featured: false
draft: false
tags:
  - react
  - level-up-react
  - basics
description: Discover how declarative programming transforms React development. Learn the key differences between imperative and declarative approaches through practical examples and understand why React embraces declarative programming for state, effects, lists, and conditional rendering.
---

To become a better React developer, it's essential to understand these two programming paradigms as they represent different ways of writing code.

## Imperative Programming

Imperative programming focuses on execution details. It describes step by step the actions needed to achieve a result. It's like giving detailed instructions to someone for cooking a meal.

Let's look at some concrete examples:

```js
// Example 1: Filter and transform an array
const numbers = [1, 2, 3, 4, 5, 6];
const result = [];
// We describe each step
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    result.push(numbers[i] * 2);
  }
}
// result = [4, 8, 12]

// Example 2: DOM Manipulation
const list = document.createElement("ul");
const items = ["Apple", "Banana", "Orange"];

items.forEach(item => {
  const li = document.createElement("li");
  li.textContent = item;
  li.className = "fruit-item";
  list.appendChild(li);
});

document.body.appendChild(list);
```

## Declarative Programming

Declarative programming focuses on "what" instead of "how". We describe the desired result and let the system handle the implementation details.

The same examples in declarative:

```jsx
// Example 1: Filter and transform an array
const numbers = [1, 2, 3, 4, 5, 6];
const result = numbers.filter(num => num % 2 === 0).map(num => num * 2);
// result = [4, 8, 12]

// Example 2: JSX (React)
function FruitList() {
  const items = ["Apple", "Banana", "Orange"];

  return (
    <ul>
      {items.map(item => (
        <li className="fruit-item" key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}
```

## React and Declarative Programming in Depth

As you can see, React uses declarative programming rather than imperative.

Let's look at different aspects of declarative programming in React through simple examples.

### State Management

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>Counter: {count}</button>;
}
```

In React, we declare our state with `useState` and describe how it should change. We don't need to worry about:

- DOM updates
- Event handling
- Variable lifecycle

### Conditional Rendering

```jsx
function Message({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <h1>Welcome to your account</h1> : <h1>Please log in</h1>}
    </div>
  );
}
```

Conditional rendering in React is declarative:

- We describe the possible states
- React handles showing the right content
- No need to manually handle the DOM

### List Management

```jsx
function TodoList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} className={item.completed ? "done" : ""}>
          {item.text}
        </li>
      ))}
    </ul>
  );
}
```

For lists in React:

- We declare how each item should be displayed
- The `key` prop helps React update efficiently
- CSS classes are applied declaratively

### Effects Management

```jsx
function ResizeMessage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <p>Window width: {windowWidth}px</p>;
}
```

The useEffect hook perfectly shows React's declarative approach:

- We declare what should happen (listen to resize)
- We declare how to clean up (remove event listener)
- React automatically manages the effect lifecycle

## Conclusion

Declarative programming is a key concept in React that changes how we write applications. This approach lets us focus on the final result instead of the steps to get there.

Through our examples, we've seen how React applies this paradigm at all levels:

- State management becomes a simple data declaration
- Conditional rendering is just describing each possible case
- List handling happens naturally with data transformations
- Side effects are managed in a predictable and controlled way

This declarative approach makes our code more predictable, easier to maintain and test. It helps us build complex interfaces while keeping our code clear and structured.
