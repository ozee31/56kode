---
author: 56kode
pubDatetime: 2025-03-18T17:00:00+01:00
modDatetime: 2025-03-18T17:00:00+01:00
title: "Level Up React: Mastering useEffect for performant React applications"
slug: level-up-react-mastering-useeffect-for-performant-applications
featured: false
draft: false
tags:
  - react
  - level-up-react
  - basics
description: "Learn how to master React's useEffect hook with practical examples. Discover internal mechanisms, avoid common pitfalls, and build performant applications with proper synchronization techniques."
---

## About Level Up React Series

Level Up React is a series of in-depth articles designed to help React developers enhance their skills. We explore React's internal mechanisms, best practices, design patterns, and advanced concepts. These articles are written for React developers who want to go beyond the basics and truly understand how React works under the hood.

## Previous Articles in the Series

1. [**React: Declarative vs Imperative Programming**](https://www.56kode.com/posts/level-up-react-declarative-programming/)
2. [**React: Deep Dive into React Elements**](https://www.56kode.com/posts/level-up-react-deep-dive-into-react-elements/)
3. [**React: React and React DOM architecture**](https://www.56kode.com/posts/level-up-react-react-and-react-dom-architecture/)
4. [**Level Up React: Functional programming in React**](https://www.56kode.com/posts/level-up-react-functional-programming-in-react/)
5. [**Level Up React: Deep dive into state and useState**](https://www.56kode.com/posts/level-up-react-deep-dive-into-state-and-usestate/)

## Introduction

The `useEffect` hook is a fundamental pillar of modern React. More than just a simple function, it allows components to react to changes and perform asynchronous operations while maintaining UI consistency. However, its apparent simplicity hides complexity that can lead to subtle errors, affecting the performance and maintainability of your applications.

In this article from our "Level Up React" series, we'll explore in depth the internal mechanisms of `useEffect`, its often misunderstood subtleties, and the common pitfalls that await even experienced developers. We'll see how its correct usage can transform your code, making it more predictable and performant.

## The fundamentals of useEffect

### Why useEffect exists

React created `useEffect` to efficiently manage side effects in functional components. Before its introduction, these operations were reserved for lifecycle methods in class components like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.

A side effect refers to any operation that modifies something outside the React component, such as:

```typescript
// Example of a side effect: modifying the page title
useEffect(() => {
  document.title = `Profile of ${username}`;
}, [username]);
```

In this example, modifying the document title is a side effect because it affects the environment outside the React component. The `useEffect` hook allows us to execute this operation declaratively, specifying when it should occur.

### Anatomy of a useEffect

The `useEffect` hook accepts two arguments:

```typescript
useEffect(
  () => {
    // Effect body (code to execute)
    return () => {
      // Cleanup function (optional)
    };
  },
  [
    /* dependency array */
  ]
);
```

The first argument is a function containing the code to execute. This function can return a cleanup function, which will be called before the next execution of the effect or when the component is unmounted.

The second argument is a dependency array that determines when the effect should be executed. React compares the values in this array between renders to determine if the effect should be run again.

## The execution cycle of useEffect

### When does useEffect execute?

Contrary to common belief, `useEffect` doesn't execute during a component's rendering, but after React has updated the DOM. Here's the precise order of operations:

1. React executes the component body and calculates the JSX to display
2. React updates the DOM to reflect this JSX
3. React executes the effects defined with `useEffect`

This order is crucial for understanding effect behavior. Let's examine a simple example:

```typescript
function Timer() {
  const [count, setCount] = useState(0);

  // Effect executed after DOM update
  useEffect(() => {
    console.log("DOM updated with count =", count);
  });

  console.log("Component rendering with count =", count);

  return (
    <button onClick={() => setCount(count + 1)}>
      Increment ({count})
    </button>
  );
}
```

In this example, the console messages will appear in this order:

1. "Component rendering with count = 0"
2. "DOM updated with count = 0"
3. (after a click) "Component rendering with count = 1"
4. "DOM updated with count = 1"

This sequence clearly demonstrates that the effect executes after each DOM update, not during rendering.

### Controlling executions with the dependency array

The dependency array is the main mechanism for controlling when an effect should execute. React uses the `Object.is()` comparison algorithm to determine if a dependency has changed.

Three configurations are possible:

1. **Without dependency array**: the effect executes after every render

```typescript
useEffect(() => {
  console.log("This effect runs after every render");
});
```

This configuration is rarely appropriate as it can lead to unnecessary executions and performance issues.

2. **Empty dependency array**: the effect executes only after the first render

```typescript
useEffect(() => {
  console.log("This effect runs only after initial mounting");
}, []);
```

This configuration is useful for one-time initializations, such as establishing a WebSocket connection.

3. **Array with dependencies**: the effect executes after the first render and each time a dependency changes

```typescript
useEffect(() => {
  console.log(`The count value has changed: ${count}`);
}, [count]);
```

The effect will execute only when the value of `count` changes, avoiding unnecessary executions.

### The cleanup mechanism

The cleanup function is a crucial aspect of `useEffect` that is often overlooked. It allows cleaning up resources or canceling subscriptions before the effect executes again or the component unmounts.

```typescript
useEffect(() => {
  // Creating an interval
  const intervalId = setInterval(() => {
    console.log("Tick");
  }, 1000);

  // Cleanup function
  return () => {
    console.log("Cleaning up the interval");
    clearInterval(intervalId);
  };
}, []);
```

In this example, the cleanup function ensures that the interval is properly removed when the component unmounts, preventing memory leaks.

## Common pitfalls and how to avoid them

### Infinite loops

One of the most frequent problems with `useEffect` is the unintentional creation of infinite loops. This problem often occurs in data fetching scenarios where we update a state that is itself a dependency of the effect.

```typescript
// ❌ Creating an infinite loop in a real case
function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Fetching notifications from the API
    fetchNotifications().then(newNotifications => {
      // This update triggers a new render
      setNotifications([...notifications, ...newNotifications]);
    });
  }, [notifications]); // notifications is a dependency

  return (
    <div className="notification-center">
      {notifications.map(notification => (
        <NotificationItem key={notification.id} data={notification} />
      ))}
    </div>
  );
}
```

In this example, each time `fetchNotifications()` returns data, we update the `notifications` state. Since `notifications` is a dependency of our effect, this triggers a new execution of the effect, creating an infinite loop of API requests.

```typescript
// ✅ Solution: Using the functional updater
function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetchNotifications().then(newNotifications => {
      // This form of setState doesn't need to depend on the current state
      setNotifications(prevNotifications => [
        ...prevNotifications,
        ...newNotifications
      ]);
    });
  }, []); // One-time execution at mounting

  return (
    <div className="notification-center">
      {notifications.map(notification => (
        <NotificationItem key={notification.id} data={notification} />
      ))}
    </div>
  );
}
```

This solution uses the functional form of `setState` which receives the previous state as an argument. This eliminates the need to include `notifications` in the dependency array, as React guarantees that the function always receives the most recent state value, even if it's defined in a closure.

### Missing or superfluous dependencies

Another common pitfall is omitting necessary dependencies or including superfluous ones in the dependency array.

```typescript
// ❌ Missing dependency
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser(userId).then(data => setUser(data));
  }, []); // userId is missing from dependencies

  return <div>{user?.name}</div>;
}
```

In this example, the effect won't re-execute if `userId` changes, because it's not listed in the dependencies.

```typescript
// ✅ All dependencies are included
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser(userId).then(data => setUser(data));
  }, [userId]); // userId is correctly included

  return <div>{user?.name}</div>;
}
```

The ESLint tool with the `eslint-plugin-react-hooks` plugin is valuable for automatically detecting these issues.

### Objects and functions as dependencies

Objects and functions created during rendering pose a particular challenge because they are recreated with each render and are therefore considered new values.

```typescript
// ❌ Object recreated on each render
function SearchComponent({ term }: { term: string }) {
  // This object is recreated with each render
  const options = {
    caseSensitive: false
  };

  useEffect(() => {
    performSearch(term, options);
  }, [term, options]); // options changes with each render

  return <div>Results for: {term}</div>;
}
```

In this example, the effect will run with each render, even if `term` hasn't changed, because `options` is recreated and considered a new value.

Several solutions exist:

```typescript
// ✅ Solution 1: Move the object inside the effect
function SearchComponent({ term }: { term: string }) {
  useEffect(() => {
    const options = { caseSensitive: false };
    performSearch(term, options);
  }, [term]); // options is no longer a dependency

  return <div>Results for: {term}</div>;
}

// ✅ Solution 2: Use useMemo to memoize the object
function SearchComponent({ term }: { term: string }) {
  const options = useMemo(() => ({
    caseSensitive: false
  }), []); // options remains stable between renders

  useEffect(() => {
    performSearch(term, options);
  }, [term, options]);

  return <div>Results for: {term}</div>;
}
```

These solutions help avoid unnecessary effect executions.

## When not to use useEffect

The official React documentation provides an extremely useful guide titled [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect), which explains in detail situations where using `useEffect` is unnecessary or can be replaced with more appropriate alternatives.

### Calculating derived values

A common mistake is using `useEffect` to calculate values derived from existing state.

```typescript
// ❌ Incorrect usage to calculate a derived value
function OrderSummary({ items }: { items: CartItem[] }) {
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setTotal(items.reduce((sum, item) => sum + item.price, 0));
  }, [items]);

  return <div>Total: {total}€</div>;
}
```

This approach is unnecessarily complex and can lead to additional renders. A better solution is to calculate the derived value directly during rendering:

```typescript
// ✅ Direct calculation during rendering
function OrderSummary({ items }: { items: CartItem[] }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return <div>Total: {total}€</div>;
}
```

For expensive calculations, `useMemo` is preferable:

```typescript
// ✅ Using useMemo for expensive calculations
function OrderSummary({ items }: { items: CartItem[] }) {
  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);

  return <div>Total: {total}€</div>;
}
```

### Reacting to user events

Using `useEffect` to react to user events often leads to complex and difficult-to-maintain architectures.

```typescript
// ❌ Unnecessarily complex architecture
function SearchBar() {
  const [query, setQuery] = useState<string>("");
  const [searchTriggered, setSearchTriggered] = useState<boolean>(false);

  // Effect that reacts to a state change
  useEffect(() => {
    if (searchTriggered) {
      // Search logic
      performSearch(query);
      setSearchTriggered(false);
    }
  }, [searchTriggered, query]);

  // Function that triggers a state for the effect to execute
  const handleSearch = () => {
    setSearchTriggered(true);
  };

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
```

A simpler and more direct approach:

```typescript
// ✅ Direct handling without useEffect
function SearchBar() {
  const [query, setQuery] = useState<string>("");

  const handleSearch = () => {
    // Direct call to the search function
    performSearch(query);
  };

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
```

### Initializing state variables

Using `useEffect` to initialize state variables is often unnecessary:

```typescript
// ❌ Unnecessarily complex initialization
function UserPreferences() {
  const [preferences, setPreferences] = useState<UserPrefs>({});

  useEffect(() => {
    const savedPreferences = localStorage.getItem('preferences');
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  return <PreferencesForm preferences={preferences} />;
}
```

A simpler and more efficient approach:

```typescript
// ✅ Lazy initialization
function UserPreferences() {
  const [preferences, setPreferences] = useState<UserPrefs>(() => {
    const savedPreferences = localStorage.getItem('preferences');
    return savedPreferences ? JSON.parse(savedPreferences) : {};
  });

  return <PreferencesForm preferences={preferences} />;
}
```

## Appropriate use cases for useEffect

### Synchronization with external systems

`useEffect` is ideal for synchronizing your component with external systems, such as the DOM, third-party APIs, or data sources.

```typescript
function ThemeManager({ theme }: { theme: "light" | "dark" }) {
  useEffect(() => {
    // Applying the theme to the document
    document.documentElement.dataset.theme = theme;

    // Cleanup when unmounting
    return () => {
      // Reset if necessary
    };
  }, [theme]);

  return null; // Utility component with no rendering
}
```

### Subscribing to events

`useEffect` is also useful for managing subscriptions to system or custom events.

```typescript
function KeyboardShortcuts({
  shortcuts,
}: {
  shortcuts: Record<string, () => void>;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const callback = shortcuts[e.key];
      if (callback) callback();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts]);

  return null; // Utility component with no rendering
}
```

### Communication with message channels

`useEffect` allows efficient management of communication via channels such as WebSockets or BroadcastChannel.

```typescript
function BroadcastListener({ channel, onMessage }: Props) {
  useEffect(() => {
    const bc = new BroadcastChannel(channel);

    bc.onmessage = event => {
      onMessage(event.data);
    };

    return () => {
      bc.close();
    };
  }, [channel, onMessage]);

  return null;
}
```

## Unit testing components with useEffect

Testing components that use `useEffect` requires specific approaches to ensure that effects are properly applied and cleaned up.

```typescript
// Example test for a component with useEffect
import { render, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeManager } from './ThemeManager';

describe('ThemeManager', () => {
  it('applies the theme to the document', async () => {
    // Arrange
    document.documentElement.dataset.theme = '';

    // Act
    render(<ThemeManager theme="dark" />);

    // Wait
    await waitFor(() => {
      // Assert
      expect(document.documentElement.dataset.theme).toBe('dark');
    });
  });

  it('cleans up correctly when unmounting', async () => {
    // Mock the cleanup function
    const cleanupMock = vi.fn();
    vi.spyOn(React, 'useEffect').mockImplementation(fn => {
      const cleanup = fn();
      if (cleanup) cleanupMock.mockImplementation(cleanup);
      return undefined;
    });

    // Render the component
    const { unmount } = render(<ThemeManager theme="dark" />);

    // Unmount
    unmount();

    // Verify that the cleanup function was called
    expect(cleanupMock).toHaveBeenCalled();
  });
});
```

## Conclusion

The `useEffect` hook is a powerful but subtle tool that requires deep understanding to be used correctly. As we've seen, it allows synchronizing React components with external systems, but its excessive or incorrect use can lead to performance and maintainability issues.

Key points to remember are:

1. `useEffect` executes after rendering and DOM updating, not during.
2. The dependency array controls when the effect executes and must be rigorously maintained.
3. Cleanup functions are essential to avoid memory leaks and unwanted behaviors.
4. Many common use cases for `useEffect` can be replaced with simpler and more direct approaches.
5. Unit testing effects requires special attention to verify their proper functioning.

By adopting a thoughtful approach to using `useEffect` and knowing its alternatives, you can write more predictable, performant, and easier-to-maintain React code.

To explore this topic further, I recommend consulting the official React documentation on [effects and cleanup](https://react.dev/learn/synchronizing-with-effects) as well as the [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) guide that offers alternatives for many common use cases.
