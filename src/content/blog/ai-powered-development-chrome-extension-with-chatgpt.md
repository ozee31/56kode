---
author: 56kode
pubDatetime: 2024-08-29T18:00:00+02:00
modDatetime: 2024-08-29T18:00:00+02:00
title: "AI-powered development: Chrome extension with ChatGPT"
slug: ai-powered-development-chrome-extension-with-chatgpt
featured: false
draft: false
tags:
  - ai
  - js
description: "Ever wondered if AI could replace developers? I put ChatGPT to the test by asking it to create a simple Chrome extension. What seemed like a straightforward task turned into a curious journey with unexpected twists. Did the AI succeed, or did it fall short? Dive into this article to find out how well ChatGPT handled the challenge of coding in the real world."
---

Many people on the internet claim that developers are on the brink of extinction and that AI will soon do everything for us. But honestly, as a developer, I use AI daily as an assistant. It helps me find solutions, write tests... But you always need to stay vigilant and understand what it generates, because it’s far from infallible.

Today, I had an idea: to create a Chrome extension for a personal need. Small problem—I can’t quite remember how to create one (the last time I made an extension was about 4 years ago for a technical test). Of course, my first thought was to read the documentation, but a little voice in my head whispered: "Hey man, ask AI to develop your extension for you!" 🤔 Not a bad idea! But before asking it to create a full-fledged extension, let’s first see if AI can generate a simple extension.

## The Project of the Day 🎯

So, here we are. The project of the day is to develop a micro extension that, when you click on its icon, will display a good old window.alert to show the title present in the h1 tag. Nothing too complicated, so let’s get started: today, my developer will be ChatGPT 4o 🎉

## Let’s Get Started 🚀

Without further ado, I opened ChatGPT to put it to work with a rather basic prompt:

> Write a Google Chrome extension that, when clicked, displays a window.alert with the H1 title of the current tab.

![First response](/assets/posts/ai-powered-development-chrome-extension-with-chatgpt/chatgtp-response-1.png)

And there you have it—ChatGPT gives me a well-detailed extension with a tutorial on how to load it. Without wasting time, I load the extension, which, to my surprise, shows no errors (a good start 🎉). Excited, I open the site dev.to and click on the extension... and then... nothing happens. 😅

Undeterred, I ask our friend ChatGPT for an explanation:

> hey bro, when I click on the extension nothing happens, yet chrome didn't generate an error when I loaded the extension

![Second response](/assets/posts/ai-powered-development-chrome-extension-with-chatgpt/chatgtp-response-2.png)

The changes are minimal; it even asks me to modify `background.js` even though there’s no significant change. The only modifications are the removal of a permission (sure, why not) and the addition of a listener in `popup.js` to wait for the page to load.

Let’s give it another go... and still nothing. No errors, nothing happening. This is going to be fun...

> nothing happens, I have no errors in either the dev tool or the service worker.

![Third response](/assets/posts/ai-powered-development-chrome-extension-with-chatgpt/chatgtp-response-3.png)

This time, the changes are a bit more substantial, with a potentially decisive addition: ChatGPT asks me to add an icon to the extension. I think maybe this detail will make all the difference. So, I head off to find a beautiful royalty-free image, and we’re back at it.

![icon of extension](/assets/posts/ai-powered-development-chrome-extension-with-chatgpt/icon.png)

Well, it’s a bit of progress: I now have a popup with a button, which is already something. I click on it and... still nothing. 😅 But this time, the extension’s service worker throws an error (we’re making progress, slowly but surely).

![screeshot](/assets/posts/ai-powered-development-chrome-extension-with-chatgpt/extension.png)

> there was an error in the extension with your previous code when I click on the button :
> Error handling response: TypeError: Cannot read properties of undefined (reading 'executeScript')
> In popup.js, on the line chrome.scripting.executeScript({

![Fourth response](/assets/posts/ai-powered-development-chrome-extension-with-chatgpt/chatgtp-response-4.png)

Apart from adding a few comments, nothing really changes, and of course, unsurprisingly, it still doesn’t work. Same error as before. I think it’s time to stop here, otherwise, this article is going to be 250 pages long before it works, and inevitably, it’s going to end in insults (as it often does 😅).

## Conclusion

In short, this first experience wasn’t very conclusive, especially with a relatively simple request. We’ll try another AI solution later, but for now, I don’t think AI is yet capable of creating a complete application on its own. 🤷‍♂️
