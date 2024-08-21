---
author: 56kode
pubDatetime: 2024-08-21T18:26:00Z
modDatetime: 2024-08-21T18:26:00Z
title: Example of Using useSyncExternalStore with LocalStorage
slug: using-usesyncexternalstore-with-localstorage
featured: false
draft: false
tags:
  - react
  - localstorage
description: Learn how to efficiently synchronize application state with external data sources like LocalStorage using React's useSyncExternalStore hook, with a practical example and detailed explanation.
---

In React development, it’s often necessary to synchronize the application state with an external data source, particularly with solutions like LocalStorage. Since React 18, a new hook called `useSyncExternalStore` has been introduced to facilitate this synchronization. I'll walk you through a concrete example of using this hook.

## Why use `useSyncExternalStore`?

`useSyncExternalStore` is designed to read and synchronize data from external sources that may be shared across multiple component instances. This enables the application to efficiently react to changes in these data sources, ensuring state consistency and providing a smooth user experience.

## Concrete example: Synchronizing an application theme with LocalStorage

In this example, we will create a React application that allows the user to toggle between light and dark themes. The chosen theme will be stored in LocalStorage to persist between sessions, and we will use `useSyncExternalStore` to manage the theme synchronization across the entire application, even across different browser tabs.

### `useThemeStore`

The first step is to create our custom hook that will handle listening to and updating our LocalStorage.

```ts
import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "app-theme";

const getThemeFromLocalStorage = (): Theme => {
  return (localStorage.getItem(THEME_STORAGE_KEY) as Theme) || "light";
};

const subscribe = (callback: () => void): (() => void) => {
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("storage", callback);
  };
};

const useThemeStore = (): [Theme, (newTheme: Theme) => void] => {
  const theme = useSyncExternalStore(subscribe, getThemeFromLocalStorage);

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    window.dispatchEvent(new Event("storage"));
  };

  return [theme, setTheme];
};

export default useThemeStore;
```

- The `getThemeFromLocalStorage` function is responsible for reading from LocalStorage to retrieve the current theme.
- The `subscribe` function uses the browser's storage event to listen for changes made to LocalStorage. This mechanism allows the theme state in our application to be updated, even if the change originates from another tab.
- Finally, `useThemeStore` is the hook that will be used in our application, allowing us to get the current theme value (`theme`) and to change it (`setTheme`). <br/>As we can see, `useSyncExternalStore` relies on our subscriber (`subscribe`) and our LocalStorage reading function (`getThemeFromLocalStorage`) to function correctly.

### Application

Here's a concrete example of how we can use our `useThemeStore` hook to toggle the theme via our `ThemeToggler` component. The advantage of this solution is that the theme will be changed across all browser tabs.

```tsx
// Header.tsx
import React from "react";
import useThemeStore from "./useThemeStore";
import styled from "styled-components";

const StyledHeader = styled.header<{ themeType: "light" | "dark" }>`
  padding: 1rem;
  text-align: center;
  background-color: ${({ themeType }) =>
    themeType === "light" ? "#f0f0f0" : "#222"};
  color: ${({ themeType }) => (themeType === "light" ? "#000" : "#fff")};
`;

const Header: React.FC = () => {
  const [theme] = useThemeStore();

  return (
    <StyledHeader themeType={theme}>
      <h1>Current Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}</h1>
    </StyledHeader>
  );
};

export default Header;
```

```tsx
//  Footer.tsx
import React from "react";
import useThemeStore from "./useThemeStore";
import styled from "styled-components";

const StyledFooter = styled.footer<{ themeType: "light" | "dark" }>`
  padding: 1rem;
  text-align: center;
  background-color: ${({ themeType }) =>
    themeType === "light" ? "#e0e0e0" : "#111"};
  color: ${({ themeType }) => (themeType === "light" ? "#000" : "#fff")};
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const Footer: React.FC = () => {
  const [theme] = useThemeStore();

  return (
    <StyledFooter themeType={theme}>
      <p>Footer Content - Theme is {theme}</p>
    </StyledFooter>
  );
};

export default Footer;
```

```tsx
// ThemeToggler.tsx
import React from "react";
import useThemeStore from "./useThemeStore";
import styled from "styled-components";

const ToggleButton = styled.button<{ themeType: "light" | "dark" }>`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  background-color: ${({ themeType }) =>
    themeType === "light" ? "#000" : "#fff"};
  color: ${({ themeType }) => (themeType === "light" ? "#fff" : "#000")};
  border: none;
  border-radius: 4px;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  &:hover {
    background-color: ${({ themeType }) =>
      themeType === "light" ? "#333" : "#ddd"};
  }
`;

const ThemeToggler: React.FC = () => {
  const [theme, setTheme] = useThemeStore();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ToggleButton themeType={theme} onClick={toggleTheme}>
      Switch to {theme === "light" ? "Dark" : "Light"} Theme
    </ToggleButton>
  );
};

export default ThemeToggler;
```

```tsx
// App.tsx
import React from "react";
import Header from "./Header";
import ThemeToggler from "./ThemeToggler";
import Footer from "./Footer";
import useThemeStore from "./useThemeStore";
import styled from "styled-components";

const AppContainer = styled.div<{ themeType: "light" | "dark" }>`
  min-height: 100vh;
  background-color: ${({ themeType }) =>
    themeType === "light" ? "#ffffff" : "#333333"};
  color: ${({ themeType }) => (themeType === "light" ? "#000000" : "#ffffff")};
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  position: relative;
  padding-bottom: 3rem; // To ensure footer is visible
`;

const App: React.FC = () => {
  const [theme] = useThemeStore();

  return (
    <AppContainer themeType={theme}>
      <Header />
      <ThemeToggler />
      <Footer />
    </AppContainer>
  );
};

export default App;
```

## Other Concrete Use Cases for `useSyncExternalStore`

- Tracking Connection Status: It can be used to track the user's connection status (logged in or logged out). For example, if the user logs out in one tab, this change can automatically be reflected in all other open tabs.
- Real-Time Data Synchronization: It can ensure that all data views are synchronized with the latest version of external data, whether through an API or a WebSocket.
- Notification Management: It can be used to synchronize global notifications across different components or browser tabs.
- Shopping Cart Synchronization in an E-commerce Application: It can synchronize the shopping cart contents across multiple components or browser tabs.
- ...and more.

## Conclusion

`useSyncExternalStore` is a powerful tool for synchronizing your application state with external data sources like LocalStorage. With this hook, you can create React applications capable of handling shared data across multiple components or even multiple instances of your application.

By using `useThemeStore`, we demonstrated how to store and synchronize an application theme with LocalStorage, ensuring a smooth and consistent user experience, even when reloading the page or switching between tabs.

## Sources and References

- [Source code](https://codesandbox.io/p/sandbox/usesyncexternalstore-l9ynyf?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522cm03uksml00062v6dje2wjs4s%2522%252C%2522sizes%2522%253A%255B100%252C0%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522cm03uksml00022v6dkoauqkjc%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522cm03uksml00032v6difyvkp7a%2522%257D%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522cm03uksml00052v6d4gecnln0%2522%257D%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522cm03uksml00022v6dkoauqkjc%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522cm03uksmk00012v6dh3m0qf73%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fsrc%252Findex.tsx%2522%257D%255D%252C%2522id%2522%253A%2522cm03uksml00022v6dkoauqkjc%2522%252C%2522activeTabId%2522%253A%2522cm03uksmk00012v6dh3m0qf73%2522%257D%252C%2522cm03uksml00052v6d4gecnln0%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522cm03uksml00042v6dgiodu60n%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522UNASSIGNED_PORT%2522%252C%2522port%2522%253A0%257D%255D%252C%2522id%2522%253A%2522cm03uksml00052v6d4gecnln0%2522%252C%2522activeTabId%2522%253A%2522cm03uksml00042v6dgiodu60n%2522%257D%252C%2522cm03uksml00032v6difyvkp7a%2522%253A%257B%2522tabs%2522%253A%255B%255D%252C%2522id%2522%253A%2522cm03uksml00032v6difyvkp7a%2522%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D)
- [React useSyncExternalStore Documentation](https://react.dev/reference/react/useSyncExternalStore#usesyncexternalstore)
- [MDN Web Docs - LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
