---
author: Kyle Shevlin
pubDatetime: 2024-09-02T18:34:00+02:00
title: "Never Call new Date() Inside Your Components"
description: "The article explains why CSS-in-JS can be slow, primarily due to how it handles style generation and rendering. Traditional CSS is parsed directly by the browser, but CSS-in-JS solutions often require JavaScript to generate styles, leading to delays in rendering as the browser must parse and execute JavaScript before applying styles. Some modern tools like PandaCSS or Vanilla Extract mitigate this by compiling CSS ahead of time, reducing performance issues. The article also highlights the trade-offs between different CSS-in-JS approaches."
url: "https://kyleshevlin.com/never-call-new-date-inside-your-components/"
tags:
  - react
---
