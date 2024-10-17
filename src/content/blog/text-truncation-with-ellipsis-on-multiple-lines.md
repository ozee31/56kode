---
author: 56kode
pubDatetime: 2024-10-17T18:00:00+02:00
modDatetime: 2024-10-17T18:00:00+02:00
title: Text Truncation with Ellipsis on Multiple Lines
slug: text-truncation-with-ellipsis-on-multiple-lines
featured: false
draft: false
tags:
  - css
description: Learn effective CSS techniques for text truncation with ellipsis, covering both single-line and multi-line methods. This guide explains how to implement classic text overflow, use WebKit's line-clamp for multiple lines, and create fallback solutions for cross-browser compatibility. Ideal for web developers aiming to improve content display and user experience in limited spaces.
---

# Text Truncation with Ellipsis on Multiple Lines

Text truncation is a commonly used technique to manage the display of long text content in limited spaces. Adding an ellipsis (...) at the end of the text clearly indicates to the user that the content is truncated.

## Classic Method: Single-line Truncation

The most well-known method for truncating text with an ellipsis is done on a single line. Here's the corresponding HTML and CSS code:

```html
<div class="single-line-truncate">
  I'm going to make him an offer he can't refuse. I'm going to make him an offer
  he can't refuse.
</div>
```

```css
.single-line-truncate {
  width: 300px; /* Fixed width for the example */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="OJKgPVK" data-pen-title="Truncate text" data-user="56kode" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/56kode/pen/OJKgPVK">
  Truncate text</a> by 56kode (<a href="https://codepen.io/56kode">@56kode</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

This technique works perfectly for text that needs to fit on a single line. However, it shows its limitations when we want to keep multiple lines of text before applying the ellipsis.

## Truncation on Multiple Lines

To truncate text over multiple lines (for example, 3 lines) while adding an ellipsis, we need to use a different approach. Here's the recommended technique:

```html
<div class="multi-line-truncate">
  May the Force be with you. I'm going to make him an offer he can't refuse.
  Here's looking at you, kid. Frankly, my dear, I don't give a damn. You talking
  to me? E.T. phone home. I'll be back. You can't handle the truth! I see dead
  people. I'm the king of the world!
</div>
```

```css
.multi-line-truncate {
  width: 300px; /* Fixed width for the example */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="GRVEggL" data-pen-title="Truncate text (multilines)" data-user="56kode" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/56kode/pen/GRVEggL">
  Truncate text (multilines)</a> by 56kode (<a href="https://codepen.io/56kode">@56kode</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

In this example, `-webkit-line-clamp: 3;` indicates that we want to display 3 lines before truncation.

It's important to note that this method uses WebKit-specific properties, which may cause compatibility issues with some browsers, although compatibility is generally good.

![can i use](/assets/posts/text-truncation-with-ellipsis-on-multiple-lines/caniuse.png)

## Fallback Solution for Unsupported Browsers

For browsers that don't support WebKit properties, we can simulate the truncation effect (without the ellipsis) using `max-height`. Here's how to do it:

```html
<div class="fallback-truncate">
  I'll have what she's having. You can't handle the truth! I'm walking here! I'm
  walking here! I'll be back. Here's Johnny! Say hello to my little friend! I'm
  the king of the world! You talkin' to me? I love the smell of napalm in the
  morning.
</div>
```

```css
.fallback-truncate {
  width: 300px; /* Fixed width for the example */
  max-height: 4.5em; /* 3 lines * 1.5em (line height) */
  line-height: 1.5em;
  overflow: hidden;
}
```

This approach sets a maximum height based on the desired number of lines multiplied by the line height. Although the ellipsis won't be visible, the text will still be truncated.

By combining these techniques, you can create a robust solution for truncating text over multiple lines, suitable for different browsers and display situations.
