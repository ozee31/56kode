---
author: 56kode
pubDatetime: 2025-02-24T17:00:00+01:00
modDatetime: 2025-02-24T17:00:00+01:00
title: "Level Up React: Functional programming in React"
slug: level-up-react-functional-programming-in-react
featured: false
draft: false
tags:
  - react
  - level-up-react
  - basics
description: "Learn how functional programming principles power React development. This practical guide explores first-class functions, pure functions, immutability, currying and composition with clear examples. Discover how these concepts lead to more predictable, testable and maintainable React applications."
---

## About Level Up React Series

Level Up React is a series of in-depth articles designed to help React developers enhance their skills. We explore React's internal mechanisms, best practices, design patterns, and advanced concepts. These articles are written for React developers who want to go beyond the basics and truly understand how React works under the hood.

## Previous Articles in the Series

1. [**React: Declarative vs Imperative Programming**](https://www.56kode.com/posts/level-up-react-declarative-programming/)
2. [**React: Deep Dive into React Elements**](https://www.56kode.com/posts/level-up-react-deep-dive-into-react-elements/)
3. [**React: React and React DOM architecture**](https://www.56kode.com/posts/level-up-react-react-and-react-dom-architecture/)

## Introduction to functional programming

Functional programming is a programming approach that treats computation as the evaluation of mathematical functions and avoids changing state and mutable data. It differs greatly from traditional imperative programming that many developers are more familiar with.

Think of the difference between giving someone detailed step-by-step instructions to prepare a meal (imperative approach) versus giving them a recipe that describes the ingredients and transformations to apply (functional approach). In functional programming, we focus on data transformations rather than steps to follow.

### Differences from other paradigms

Before diving into React-specific functional concepts, let's understand how functional programming compares to other paradigms.

**Functional programming vs Imperative programming:**

Imperative programming is like a list of instructions to follow step by step. It focuses on "how" to accomplish a task by changing the program's state over time.

```javascript
// Imperative approach
let sum = 0;
for (let i = 1; i <= 5; i++) {
  sum += i;
}
console.log(sum); // 15
```

In contrast, functional programming focuses on "what" to accomplish by describing transformations to apply to data. It avoids changing state and favors pure transformations.

```javascript
// Functional approach
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, current) => acc + current, 0);
console.log(sum); // 15
```

**Functional programming vs Object-oriented programming:**

Object-oriented programming organizes code around objects that encapsulate data and behaviors. State is central to this paradigm.

```javascript
// Object-oriented approach
class Counter {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count += 1;
    return this.count;
  }
}

const counter = new Counter();
counter.increment(); // 1
counter.increment(); // 2
```

Functional programming, on the other hand, organizes code around functions that transform data without changing external state.

```javascript
// Functional approach
function increment(count) {
  return count + 1;
}

let count = 0;
count = increment(count); // 1
count = increment(count); // 2
```

### Why functional programming in React?

React uses many functional programming concepts for several important reasons.

First, **predictability**: pure functions always produce the same result for the same inputs, which makes component behavior more predictable and easier to debug.

Second, **testability**: functions without side effects are easier to test because they don't have hidden dependencies.

Third, **composition**: small functions can be combined to create complex behaviors, just as React components can be composed to create complete user interfaces.

Finally, **state management**: immutability and functional transformations allow React to efficiently detect changes and optimize rendering performance.

React leverages these functional principles to offer a more predictable and maintainable programming model, even if it doesn't strictly adhere to all aspects of pure functional programming.

## Functions as first-class values

In JavaScript, functions are "first-class values" (first-class objects), which means they can be treated like any other value in the language. This feature is fundamental to functional programming and is widely used in React.

In practical terms, this means that functions in JavaScript can be:

- Assigned to variables or stored in data structures
- Passed as arguments to other functions
- Returned by other functions
- Given properties and methods like any other object

This flexibility enables design patterns that would be difficult or impossible in languages where functions aren't first-class values.

Here's a simple example:

```jsx
// Function stored in a variable
const handleClick = () => {
  console.log("Button clicked");
};

// Function passed as a prop to a component
function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

// Using the component
function App() {
  return <Button onClick={handleClick}>Click here</Button>;
}
```

In this example, we define a `handleClick` function and pass it as an argument to another component. This capability is constantly used in React, particularly for event handlers and render props.

### Higher-Order Components (HOC)

Higher-Order Components (HOCs) are one of the most powerful applications of the first-class functions concept in React. An HOC is a function that takes a component as input and returns a new component with additional features.

Simply put, an HOC is a function that transforms one component into another. This technique allows for component logic reuse and separation of concerns.

Let's look at a concrete example:

```jsx
// HOC that adds a loading state
function withLoading(Component) {
  // Returns a new component
  return function WithLoadingComponent({ isLoading, ...props }) {
    // If isLoading is true, show a loading indicator
    if (isLoading) {
      return <div>Loading...</div>;
    }

    // Otherwise, render the original component with its props
    return <Component {...props} />;
  };
}

// Base component
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// Creating an enhanced component with loading state
const UserListWithLoading = withLoading(UserList);

// Usage
function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating an API request
    setTimeout(() => {
      setUsers([
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
      ]);
      setIsLoading(false);
    }, 2000);
  }, []);

  return <UserListWithLoading isLoading={isLoading} users={users} />;
}
```

In this example, our `withLoading` HOC adds a loading feature to any component. It checks if data is loading and displays an appropriate indicator or the original component, depending on the case.

HOCs offer several advantages:

- **Logic reuse**: The same functionality can be applied to multiple components.
- **Separation of concerns**: The loading logic is separated from the list rendering logic.
- **Composition**: Multiple HOCs can be combined to add different features to a component.

## Pure functions

Pure functions are a central concept in functional programming. A pure function is one that:

1. Always returns the same result when called with the same arguments
2. Has no observable side effects (no modification of external variables, no API requests, etc.)
3. Depends only on its arguments and not on external state

Think of a mathematical function like f(x) = x + 1. For a given x, it will always return the same result, without affecting anything else. That's the essence of a pure function.

### Why pure functions are important in React

Pure functions are fundamental to React for several reasons.

First, they make code more predictable. When a function is pure, you can be certain that its behavior depends only on its inputs, which makes reasoning about the code easier.

Second, they make testing easier. To test a pure function, you simply need to verify that for a given input, you get the expected output, without having to set up a complex environment.

Third, React can optimize the rendering of pure components. If a pure component's props haven't changed, React can skip the rendering process, as it knows the output will be identical.

### Examples of pure functions

Here's a simple example of a pure function:

```jsx
// Pure function: depends only on its parameters
function calculateTotal(items) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Pure React component
function OrderSummary({ items }) {
  const total = calculateTotal(items);

  return (
    <div className="order-summary">
      <h3>Order summary</h3>
      <p>Number of items: {items.length}</p>
      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
}
```

In this example, `calculateTotal` is a pure function that calculates an order's total. It depends only on its arguments and always returns the same result for the same inputs. Similarly, the `OrderSummary` component is pure with respect to its props - it always renders the same result for the same props.

### Examples of impure functions

In contrast, here's an example of an impure function:

```jsx
// Global variable
let taxRate = 0.2;

// Impure function: depends on an external variable
function calculateTotalWithTax(items) {
  return items.reduce((total, item) => {
    const itemTotal = item.price * item.quantity;
    return total + itemTotal + itemTotal * taxRate;
  }, 0);
}
```

This function is impure because it depends on the external `taxRate` variable. If this variable changes, the function can return different results even if the arguments remain the same.

To make this function pure, we could pass the tax rate as an argument:

```jsx
// Pure function
function calculateTotalWithTax(items, rate) {
  return items.reduce((total, item) => {
    const itemTotal = item.price * item.quantity;
    return total + itemTotal + itemTotal * rate;
  }, 0);
}
```

In React, we try to make our components as pure as possible with respect to their props, even if we use hooks like `useState` to manage internal state.

## Immutability

Immutability is a principle that involves never directly modifying existing data, but instead creating new copies with the desired changes. It's a fundamental concept in functional programming and particularly important in React.

Imagine you have a sheet of paper with a to-do list. With a mutable approach, you might cross out items directly on the sheet. With an immutable approach, you would create a new sheet each time, copying over the unmodified items and adding the necessary changes.

### Why immutability is crucial in React

Immutability is essential in React because it allows the framework to efficiently detect changes and decide when to update the DOM.

React compares object references to determine if something has changed. If you directly modify an object (mutation), the reference stays the same, and React won't know it needs to update the component. By creating a new copy (immutability), the reference changes, and React can easily detect that an update is needed.

Immutability also offers other advantages:

- It makes debugging easier by making state changes more explicit and traceable
- It enables features like "time-travel debugging" in development tools
- It makes code more predictable and easier to reason about

### Practical application of immutability

Let's see how to apply immutability in a typical React component:

```jsx
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Create an application", completed: false },
  ]);

  // Function to mark a task as completed
  const toggleTodo = id => {
    // Creating a new array with the modification
    setTodos(
      todos.map(
        todo =>
          todo.id === id
            ? { ...todo, completed: !todo.completed } // New object for the modified todo
            : todo // Other todos remain unchanged
      )
    );
  };

  return (
    <ul>
      {todos.map(todo => (
        <li
          key={todo.id}
          onClick={() => toggleTodo(todo.id)}
          style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        >
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

In this example, we never directly modify the existing state. Instead, we create a new array with `map` and a new object for the modified task using the spread operator (`...`). This immutable approach ensures that React will correctly detect the changes and update the user interface accordingly.

### The mutable approach (to avoid)

To understand why immutability is important, let's see what happens when we directly mutate state:

```jsx
function TodoListBad() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Create an application", completed: false },
  ]);

  // ❌ Bad approach (direct mutation)
  const toggleTodoBad = id => {
    // Find the index of the todo to modify
    const todoIndex = todos.findIndex(todo => todo.id === id);

    // Direct mutation of the existing object
    todos[todoIndex].completed = !todos[todoIndex].completed;

    // Even though we call setTodos, the array reference hasn't changed,
    // so React won't detect the change
    setTodos(todos);
  };

  // Rest of the component...
}
```

This mutable approach is problematic because, even though we call `setTodos`, React won't detect the change since the reference to the `todos` array remains the same.

## Currying

Currying is an advanced functional programming technique that involves transforming a function that takes multiple arguments into a sequence of functions that take a single argument at a time.

Named after mathematician Haskell Curry, this technique might seem abstract at first, but it offers great flexibility and allows creating specialized functions from more generic ones.

### How currying works

Let's take a simple function that adds two numbers:

```javascript
function add(a, b) {
  return a + b;
}
```

A "curried" version of this function would be:

```javascript
function addCurried(a) {
  return function (b) {
    return a + b;
  };
}

// Or in a more concise version with arrow functions
const addCurried = a => b => a + b;
```

The `addCurried` function takes a first argument `a` and returns a new function that takes a second argument `b` and returns the sum of both.

This transformation allows using the function in different ways:

```javascript
// Direct call with both arguments
console.log(addCurried(2)(3)); // 5

// Creating a specialized function
const add5 = addCurried(5); // A function that adds 5 to its argument
console.log(add5(3)); // 8
console.log(add5(10)); // 15
```

### Advantages of currying

Currying offers several advantages:

1. **Creating specialized functions**: You can create dedicated functions from more generic ones.
2. **Partial application**: You can pre-fill certain arguments and reuse the resulting function.
3. **Easier composition**: Curried functions are easier to compose.
4. **Better readability** in some cases, especially for data processing chains.

### Currying in React

In React, currying is particularly useful for event handlers that need to include additional data.

Here's a concrete example:

```jsx
function ProductList({ products, onProductAction }) {
  // Curried function: action => productId => event
  const handleProductAction = action => productId => event => {
    // Prevent the browser's default behavior
    event.preventDefault();

    // Call the handler function with the appropriate parameters
    onProductAction(action, productId);
  };

  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-item">
          <h3>{product.name}</h3>
          <div className="product-actions">
            {/* Using currying to pre-fill parameters */}
            <button onClick={handleProductAction("view")(product.id)}>
              View
            </button>
            <button onClick={handleProductAction("edit")(product.id)}>
              Edit
            </button>
            <button onClick={handleProductAction("delete")(product.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
```

In this example, our `handleProductAction` function is curried in three levels:

1. It first takes the action type (`'view'`, `'edit'`, `'delete'`)
2. Then it takes the product ID
3. Finally, it takes the click event

This approach allows us to create specific event handlers on the fly for each button and each product, while keeping DRY (Don't Repeat Yourself) code.

## Composition

Composition is one of the fundamental principles of functional programming. It involves combining simple functions to create more complex ones.

Imagine you have a set of Lego pieces. Each piece is simple, but by combining them in different ways, you can create complex structures. Composition works the same way with functions.

### The concept of composition

In mathematics, function composition is generally written as f ∘ g(x) = f(g(x)), which means "apply g to x, then apply f to the result."

In programming, this translates to creating new functions that chain existing operations.

```javascript
// Simple functions
const double = x => x * 2;
const increment = x => x + 1;

// Manual composition
const doubleAndIncrement = x => increment(double(x));

console.log(doubleAndIncrement(3)); // (3 * 2) + 1 = 7
```

To facilitate composition, we can create utility functions:

```javascript
// Composition utility function
const compose = (f, g) => x => f(g(x));

// Usage
const doubleAndIncrement = compose(increment, double);
console.log(doubleAndIncrement(3)); // 7
```

### Component composition in React

In React, composition is a powerful pattern for creating complex user interfaces from simple components.

```jsx
// Simple components
function UserAvatar({ user }) {
  return <img src={user.avatar} alt={user.name} className="avatar" />;
}

function UserInfo({ user }) {
  return (
    <div className="user-info">
      <UserAvatar user={user} />
      <div className="user-details">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    </div>
  );
}

function UserCard({ user }) {
  return (
    <div className="user-card">
      <UserInfo user={user} />
      <div className="user-bio">
        <h3>Bio</h3>
        <p>{user.bio}</p>
      </div>
    </div>
  );
}

// Usage
function App() {
  const user = {
    name: "Alice",
    email: "alice@example.com",
    avatar: "alice.jpg",
    bio: "Passionate React developer",
  };

  return <UserCard user={user} />;
}
```

In this example, we have several components that each focus on a specific responsibility:

- `UserAvatar` just displays the avatar
- `UserInfo` combines the avatar with basic information
- `UserCard` combines information with the biography

This compositional approach allows us to create complex interfaces while maintaining a clear separation of concerns.

### Advanced functional composition

For more complex cases, we can create components that accept other components as props, allowing for flexible composition:

```jsx
function Card({ title, children, footer }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

// Usage
function App() {
  return (
    <Card title="User profile" footer={<button>Edit profile</button>}>
      <UserInfo user={user} />
    </Card>
  );
}
```

This composition approach is more flexible than inheritance and is strongly encouraged in React. It allows creating highly reusable and modular components.

## Conclusion

Functional programming is more than just a coding style for React: it's a philosophy that guides its design and architecture. By adopting principles like first-class functions, pure functions, immutability, currying, and composition, we can create React applications that are more predictable, testable, and maintainable.

The advantages of this functional approach are numerous:

- **More predictable code** because pure functions always produce the same result
- **More testable code** because functions without side effects are easier to test
- **More modular code** because small functions can be combined to create complex behaviors
- **More robust code** because immutability reduces the risk of bugs related to state mutations
- **Better performance** because React can optimize the rendering of pure components and easily detect changes with immutability

By integrating these functional concepts into our daily React development, we can not only improve the quality of our code but also better understand why React works the way it does. Functional programming encourages us to think in terms of data transformations and composition, rather than state changes and sequential instructions.

This approach transforms not only our way of writing code but also our way of designing solutions. It pushes us to create smaller, more focused, and more reusable components, which translates into applications that are easier to maintain and evolve.

Ultimately, mastering functional programming concepts is an investment that will pay off well beyond React, as these principles are applicable to many other languages and frameworks.
