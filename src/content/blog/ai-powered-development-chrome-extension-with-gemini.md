---
author: 56kode
pubDatetime: 2024-09-19T18:00:00+02:00
modDatetime: 2024-09-19T18:00:00+02:00
title: "AI-powered development: Chrome extension with Gemini"
slug: ai-powered-development-chrome-extension-with-gemini
featured: false
draft: false
tags:
  - ai
  - js
description: "Ever wondered if AI could replace developers? I put Gemini to the test by asking it to create a simple Chrome extension. What seemed like a straightforward task turned into a curious journey with unexpected twists. Did the AI succeed, or did it fall short? Dive into this article to find out how well Gemini handled the challenge of coding in the real world."
---

Many people on the internet claim that developers are on the brink of extinction and that AI will soon do everything for us. But honestly, as a developer, I use AI daily as an assistant. It helps me find solutions, write tests... But you always need to stay vigilant and understand what it generates, because it’s far from infallible.

Today, I had an idea: to create a Chrome extension for a personal need. Small problem—I can’t quite remember how to create one (the last time I made an extension was about 4 years ago for a technical test). Of course, my first thought was to read the documentation, but a little voice in my head whispered: "Hey man, ask AI to develop your extension for you!" 🤔 Not a bad idea! But before asking it to create a full-fledged extension, let’s first see if AI can generate a simple extension.

This article is a follow-up to an earlier episode made with [ChatGPT](https://www.56kode.com/posts/ai-powered-development-chrome-extension-with-chatgpt/)

## The Project of the Day 🎯

So, here we are. The project of the day is to develop a micro extension that, when you click on its icon, will display a good old window.alert to show the title present in the h1 tag. Nothing too complicated, so let’s get started: today, my developer will be ChatGPT 4o 🎉

## Let’s Get Started 🚀

Without further ado, I opened ChatGPT to put it to work with a rather basic prompt:

> Write a Google Chrome extension that, when clicked, displays a window.alert with the H1 title of the current tab.

![First response](/assets/posts/ai-powered-development-chrome-extension-with-gemini/1-gemini.png)

I paste the code, load it into Chrome, open dev.to, and… no extension 😅. This is off to an even worse start than with ChatGPT. The extension only shows up on the `chrome://extensions/` page, which is super useful, of course. I tested it anyway, clicked on the button, and it opens a popup with a "Show h1 title" button, but when I click, nothing happens. I get an error, which makes sense because there’s no h1 tag on this page.

Alright, let’s try to figure out why the button isn’t showing up on websites.

> The extension seems to work, but the button only appears on the chrome://extensions page. On sites like https://dev.to/, the button isn’t there.

![Second response](/assets/posts/ai-powered-development-chrome-extension-with-gemini/2-gemini.png)

For some reason, Gemini goes off track and, instead of fixing the permissions, suggests completely changing how the extension works. Also, note the comments in a JSON file, which aren’t normally allowed. But let’s listen to the boss and make all the changes.

Well, it still doesn’t work. I get the button, but as soon as I click it, it turns gray, and nothing happens.

> I have the button, but nothing happens when I click on it. The button becomes grayed out, and I don’t get any error.

![Third response](/assets/posts/ai-powered-development-chrome-extension-with-gemini/3-gemini.png)

Unlike ChatGPT, which tends to loop, our friend Gemini asks us to debug, which isn’t a bad idea in itself.

But still, nothing works, no error, no logs, just another failure.

## Conclusion

It’s another failure. It seems that AI and browser extensions don’t get along. Next time, we’ll test with [Claude](https://claude.ai).
