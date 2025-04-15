---
author: 56kode
pubDatetime: 2025-04-15T16:10:00+01:00
modDatetime: 2025-04-15T16:10:00+01:00
title: "Level Up React: Mastering useReducer for structured state management"
slug: level-up-react-mastering-use-reducer-for-structured-state-management
featured: false
draft: false
tags:
  - react
  - level-up-react
  - basics
description: "Complete guide to React's useReducer hook - from basic concepts to advanced implementation. Learn how to structure complex state logic, manage interdependent state, and create maintainable React applications with practical e-commerce cart examples, TypeScript integration, and testing strategies."
---

## About Level Up React Series

Level Up React is a series of in-depth articles designed to help React developers enhance their skills. We explore React's internal mechanisms, best practices, design patterns, and advanced concepts. These articles are written for React developers who want to go beyond the basics and truly understand how React works under the hood.

## Previous Articles in the Series

1. [**Declarative vs Imperative Programming**](https://www.56kode.com/posts/level-up-react-declarative-programming/)
2. [**Deep Dive into React Elements**](https://www.56kode.com/posts/level-up-react-deep-dive-into-react-elements/)
3. [**React and React DOM architecture**](https://www.56kode.com/posts/level-up-react-react-and-react-dom-architecture/)
4. [**Functional programming in React**](https://www.56kode.com/posts/level-up-react-functional-programming-in-react/)
5. [**Deep dive into state and useState**](https://www.56kode.com/posts/level-up-react-deep-dive-into-state-and-usestate/)
6. [**Mastering useEffect for performant React applications**](https://www.56kode.com/posts/level-up-react-mastering-useeffect-for-performant-applications/)

## Introduction

State management is one of the fundamental aspects of React application development. In a previous article in our "Level Up React" series, we explored the `useState` hook, the most basic method for managing local state in functional components. However, as our components become more complex and state logic gets more sophisticated, `useState` can quickly show its limitations.

This is precisely where the `useReducer` hook comes in. This hook offers a more structured approach to manage complex states, particularly when state updates depend on previous state or when different parts of the state are interdependent. Inspired by the Redux pattern, `useReducer` represents a powerful alternative to `useState` for scenarios where business logic requires more rigorous organization.

## The limitations of useState

To understand the value of `useReducer`, let's first examine the limitations of `useState` through a concrete example: managing an e-commerce shopping cart.

```tsx
function ShoppingCartWithUseState() {
  // Cart state
  const [items, setItems] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Add a product to the cart
  const addItem = (product: Product) => {
    const existingItemIndex = items.findIndex(item => item.id === product.id);

    let newItems;
    if (existingItemIndex >= 0) {
      // Update an existing product
      newItems = [...items];
      newItems[existingItemIndex] = {
        ...newItems[existingItemIndex],
        quantity: newItems[existingItemIndex].quantity + product.quantity,
      };
    } else {
      // Add a new product
      newItems = [...items, product];
    }

    // Update cart
    setItems(newItems);

    // Recalculate total and item count
    const newTotal = calculateTotal(newItems);
    const newItemCount = calculateItemCount(newItems);

    setTotal(newTotal);
    setItemCount(newItemCount);
  };

  // Remove a product from the cart
  const removeItem = (productId: string) => {
    const newItems = items.filter(item => item.id !== productId);
    setItems(newItems);

    // Recalculate total and item count
    const newTotal = calculateTotal(newItems);
    const newItemCount = calculateItemCount(newItems);

    setTotal(newTotal);
    setItemCount(newItemCount);
  };

  // Apply a promo code
  const applyPromoCode = (code: string) => {
    // In a real case, we would verify the code via an API
    if (code === "SUMMER20") {
      const discountPercent = 20;
      setDiscount(discountPercent);

      // Recalculate total with discount
      const discountedTotal = total * (1 - discountPercent / 100);
      setTotal(discountedTotal);
    }
  };

  // Process payment
  const checkout = async () => {
    setIsCheckingOut(true);
    setCheckoutError(null);

    try {
      // Simulate API call
      await processPayment(items, total);

      // Reset cart after successful payment
      setItems([]);
      setTotal(0);
      setItemCount(0);
      setDiscount(0);
      setIsCheckingOut(false);
    } catch (error) {
      setCheckoutError("Payment failed, please try again.");
      setIsCheckingOut(false);
    }
  };

  // Utility functions
  const calculateTotal = (cartItems: Product[]) => {
    const rawTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return rawTotal * (1 - discount / 100);
  };

  const calculateItemCount = (cartItems: Product[]) => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Component rendering...
}
```

This code presents several problems:

1. **Fragmented business logic**: Cart management is spread across different functions, with code duplication (recalculation of total and item count).

2. **Risk of omissions**: Each function must manually update multiple states (items, total, itemCount), which increases the risk of errors or omissions.

3. **Scattered update logic**: Calculation rules (such as applying discount) are distributed in multiple places.

4. **Lack of centralization**: It's difficult to visualize all possible state transitions as they are distributed across different functions.

5. **Testing difficulty**: With business logic mixed with event handling, tests become more complex.

## Understanding useReducer

The `useReducer` hook offers a solution to these problems by centralizing state logic in a pure function called a "reducer."

### What is useReducer?

The basic syntax of `useReducer` is as follows:

```tsx
const [state, dispatch] = useReducer(reducer, initialState);
```

Where:

- `state` is the current state, grouping all data in a single object.
- `dispatch` is a function to send actions to the reducer.
- `reducer` is a pure function that takes the current state and an action, and returns the new state.
- `initialState` is the initial state.

### The reducer pattern

The core of `useReducer` is the reducer function, which must respect the following signature:

```tsx
type Reducer<State, Action> = (state: State, action: Action) => State;
```

This function must be pure, meaning it should not:

- Modify the original state (immutability principle)
- Have side effects
- Depend on variable external elements

Actions are typically objects with a `type` property indicating the type of operation to perform, and possibly a `payload` property containing the necessary data.

## Refactoring with useReducer: e-commerce cart example

Let's see how to refactor our e-commerce cart with `useReducer`:

```tsx
// Type definitions
type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: Product[];
  total: number;
  itemCount: number;
  discount: number;
  isCheckingOut: boolean;
  checkoutError: string | null;
};

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "APPLY_DISCOUNT"; payload: { percent: number } }
  | { type: "CLEAR_CART" }
  | { type: "CHECKOUT_START" }
  | { type: "CHECKOUT_SUCCESS" }
  | { type: "CHECKOUT_FAILURE"; payload: { error: string } };

// Initial state
const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  discount: 0,
  isCheckingOut: false,
  checkoutError: null,
};

// Reducer function
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      // Check if product already exists
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );

      let updatedItems: Product[];

      if (existingItemIndex >= 0) {
        // Update quantity
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity:
            updatedItems[existingItemIndex].quantity + action.payload.quantity,
        };
      } else {
        // Add new item
        updatedItems = [...state.items, action.payload];
      }

      // Derived calculations
      const newItemCount = updatedItems.reduce(
        (count, item) => count + item.quantity,
        0
      );

      const subtotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const newTotal = subtotal * (1 - state.discount / 100);

      return {
        ...state,
        items: updatedItems,
        total: newTotal,
        itemCount: newItemCount,
      };
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter(
        item => item.id !== action.payload.id
      );

      // Automatic recalculation
      const newItemCount = updatedItems.reduce(
        (count, item) => count + item.quantity,
        0
      );

      const subtotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const newTotal = subtotal * (1 - state.discount / 100);

      return {
        ...state,
        items: updatedItems,
        total: newTotal,
        itemCount: newItemCount,
      };
    }

    case "APPLY_DISCOUNT": {
      const discount = action.payload.percent;

      // Recalculate total with discount
      const subtotal = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const newTotal = subtotal * (1 - discount / 100);

      return {
        ...state,
        discount,
        total: newTotal,
      };
    }

    case "CHECKOUT_START": {
      return {
        ...state,
        isCheckingOut: true,
        checkoutError: null,
      };
    }

    case "CHECKOUT_SUCCESS": {
      return initialState; // Reset cart
    }

    case "CHECKOUT_FAILURE": {
      return {
        ...state,
        isCheckingOut: false,
        checkoutError: action.payload.error,
      };
    }

    case "CLEAR_CART": {
      return initialState;
    }

    default:
      return state;
  }
}

// Component with useReducer
function ShoppingCartWithReducer() {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { items, total, itemCount, isCheckingOut, checkoutError } = state;

  // Add a product
  const addToCart = (product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  // Remove a product
  const removeFromCart = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  // Apply a promo code
  const applyPromoCode = (code: string) => {
    if (code === "SUMMER20") {
      dispatch({ type: "APPLY_DISCOUNT", payload: { percent: 20 } });
    }
  };

  // Process payment
  const checkout = async () => {
    dispatch({ type: "CHECKOUT_START" });

    try {
      await processPayment(items, total);
      dispatch({ type: "CHECKOUT_SUCCESS" });
    } catch (error) {
      dispatch({
        type: "CHECKOUT_FAILURE",
        payload: { error: "Payment failed, please try again." },
      });
    }
  };

  // Component rendering...
}
```

### Advantages of this approach

This implementation with `useReducer` presents several key advantages:

1. **Centralization of business logic**: All cart-related operations are grouped in a single reducer function, making it easier to understand the overall functioning.

2. **Explicit business actions**: Each operation is represented by an explicitly named action (`ADD_ITEM`, `REMOVE_ITEM`, `CHECKOUT_START`), making the code self-documented.

3. **Calculation consistency**: Derived calculations (cart total, item count) are always performed the same way, ensuring data consistency.

4. **Improved traceability**: Explicit actions facilitate debugging and allow precise tracking of operation flow and state transitions.

5. **Simplified testing**: Since the reducer function is pure, it can be tested independently from the component.

## Best practices with useReducer

### 1. Proper typing with TypeScript

Using TypeScript with `useReducer` helps secure the code:

```tsx
// Using discriminated unions for actions
type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: { id: string } };

// The reducer benefits from type inference
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM":
      // TypeScript knows that action.payload is of type Product
      return {
        /* ... */
      };
    case "REMOVE_ITEM":
      // TypeScript knows that action.payload is of type { id: string }
      return {
        /* ... */
      };
    default:
      return state;
  }
}
```

### 2. Creating action creators

To simplify code and improve maintainability, use action creators:

```tsx
// Action creators
const addItem = (product: Product) => ({
  type: "ADD_ITEM" as const,
  payload: product,
});

const removeItem = (id: string) => ({
  type: "REMOVE_ITEM" as const,
  payload: { id },
});

// Usage
function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // More readable and less error-prone
  const handleAddToCart = (product: Product) => {
    dispatch(addItem(product));
  };
}
```

### 3. Simplifying the reducer with utility functions

To prevent the reducer from becoming too bulky, extract processing logic into utility functions:

```tsx
// Reusable calculation functions
const calculateItemCount = (items: Product[]): number => {
  return items.reduce((count, item) => count + item.quantity, 0);
};

const calculateTotal = (items: Product[], discount: number): number => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return subtotal * (1 - discount / 100);
};

// Simplified reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      // Logic to add or update an item
      const updatedItems = updateCartItems(state.items, action.payload);

      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems, state.discount),
        itemCount: calculateItemCount(updatedItems),
      };
    }
    // Other cases...
  }
}
```

### 4. Lazy initialization

For expensive initial state calculations or retrieval from local storage, use lazy initialization:

```tsx
// Initialization function
function initCart(): CartState {
  // Retrieve cart from localStorage if it exists
  const savedCart = localStorage.getItem("cart");

  if (savedCart) {
    try {
      const parsedCart = JSON.parse(savedCart);
      // Validation or data transformation if needed
      return parsedCart;
    } catch (e) {
      // In case of error, revert to default initial state
      return initialState;
    }
  }

  return initialState;
}

// Using lazy initialization
function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, null, initCart);
  // ...
}
```

## Testing with React Testing Library and Vitest

Centralizing state logic in a reducer greatly facilitates testing:

```tsx
// cart-reducer.test.ts - Testing the reducer
import { describe, it, expect } from "vitest";
import { cartReducer, initialState } from "./cart-reducer";

describe("Cart reducer", () => {
  const testProduct = {
    id: "prod-1",
    name: "Test Product",
    price: 10,
    quantity: 1,
  };

  it("should add a new item to an empty cart", () => {
    const action = { type: "ADD_ITEM" as const, payload: testProduct };
    const newState = cartReducer(initialState, action);

    expect(newState.items).toHaveLength(1);
    expect(newState.items[0]).toEqual(testProduct);
    expect(newState.total).toBe(10);
    expect(newState.itemCount).toBe(1);
  });

  it("should apply a discount correctly", () => {
    // State with one product
    const stateWithItem = {
      ...initialState,
      items: [testProduct],
      total: 10,
      itemCount: 1,
    };

    const action = {
      type: "APPLY_DISCOUNT" as const,
      payload: { percent: 20 }, // 20% discount
    };
    const newState = cartReducer(stateWithItem, action);

    expect(newState.discount).toBe(20);
    expect(newState.total).toBe(8); // 10€ - 20% = 8€
  });

  // Other tests...
});

// ShoppingCart.test.tsx - Testing the component
import { render, screen, fireEvent } from "@testing-library/react";
import { ShoppingCart } from "./ShoppingCart";

describe("ShoppingCart component", () => {
  it("adds a product when the add button is clicked", () => {
    render(<ShoppingCart />);

    // Testing component interaction
    fireEvent.click(screen.getByTestId("add-product-button"));

    expect(screen.getByText(/total/i)).toHaveTextContent("10€");
    expect(screen.getByTestId("cart-item-count")).toHaveTextContent("1");
  });

  // Other interaction tests...
});
```

The clear separation between state logic (tested in the reducer) and user interactions (tested in the component) makes tests more readable and maintainable.

## useReducer vs useState: when to use one or the other?

### Use useState when:

- The state is simple (numbers, booleans, strings, simple objects)
- State updates are independent
- Update logic is straightforward
- You only have a few state variables

```tsx
// Example suitable for useState
function SimpleCounter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Use useReducer when:

- The state is complex (nested objects, arrays)
- Parts of the state are interdependent
- Update logic is complex
- State transitions follow specific patterns
- You have explicit business actions to model

```tsx
// Example suitable for useReducer
function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
    discount: 0,
    isCheckingOut: false,
    checkoutError: null,
  });

  const addItem = product => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  // ...
}
```

## useReducer and advanced architectures

### Combining with useContext

A powerful combination is to associate `useReducer` and `useContext` to create a global state management system:

```tsx
// 1. Create contexts
const CartStateContext = createContext<CartState | undefined>(undefined);
const CartDispatchContext = createContext<
  React.Dispatch<CartAction> | undefined
>(undefined);

// 2. Create a provider
function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}

// 3. Create custom hooks
function useCartState() {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error("useCartState must be used within a CartProvider");
  }
  return context;
}

function useCartDispatch() {
  const context = useContext(CartDispatchContext);
  if (context === undefined) {
    throw new Error("useCartDispatch must be used within a CartProvider");
  }
  return context;
}

// 4. Usage in components
function AddToCartButton({ product }: { product: Product }) {
  const dispatch = useCartDispatch();

  return (
    <button onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}>
      Add to cart
    </button>
  );
}

function CartSummary() {
  const { items, total } = useCartState();

  return (
    <div>
      <p>{items.length} items</p>
      <p>Total: {total}€</p>
    </div>
  );
}

// 5. Using the provider in the application
function App() {
  return (
    <CartProvider>
      <Header />
      <ProductList />
      <ShoppingCartPage />
    </CartProvider>
  );
}
```

This architecture allows sharing the cart state between different components without having to pass props through the entire hierarchy.

## Conclusion

The `useReducer` hook represents a powerful and structured approach to state management in React, particularly suited to situations where state logic becomes complex and business-oriented.

By centralizing state transitions in a pure reducer function, it offers several key advantages:

- Better organization of business logic
- Explicit actions that clearly describe intentions
- Guaranteed consistency between different parts of the state
- Improved testability of state logic
- Increased traceability of state transitions

While `useState` remains the preferred option for simple cases, `useReducer` emerges as the ideal solution when you need to model complex business processes like a shopping cart, a booking system, or any other logic where different parts of the state interact with each other.

Combined with TypeScript for robust typing, paired with well-designed tests using React Testing Library and Vitest, and potentially integrated with `useContext` for global state management, `useReducer` allows building more maintainable, predictable, and better-structured React applications.
