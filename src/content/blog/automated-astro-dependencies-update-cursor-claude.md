---
author: 56kode
pubDatetime: 2025-09-10T10:00:00+02:00
modDatetime: 2025-09-10T10:00:00+02:00
title: "Automated Astro dependencies update with Cursor and Claude"
slug: automated-astro-dependencies-update-cursor-claude
featured: false
draft: false
tags:
  - ai
  - cursor
  - migration
  - astro
description: "Complete migration from Astro 4 to Astro 5 with Content Layer automated by Claude 4 Sonnet. Detailed experience report on breaking changes, new rendering API, and migration of all dependencies like React 19."
---

# Automated Astro dependencies update with Cursor and Claude

## Introduction

Back from vacation, feeling motivated to write new technical articles. But before diving into writing, I thought I should first do some housekeeping on my blog. It had been a full year since I last touched the dependencies, and we all know how that ends: an `npm outdated` that's scary to look at.

Rather than doing this boring task manually as usual, I thought it was the perfect opportunity to test AI capabilities on a real technical task. Off to Cursor with Claude 4 Sonnet, with a simple challenge: let the AI handle the entire migration without me touching a single line of code.

My Astro blog with TypeScript seemed perfect for this test. Simple in appearance, but with the whole ecosystem, build tools, and Astro plugins that come with it. The `npm outdated` quickly dampened my enthusiasm: 22 outdated dependencies, including some pretty nice major migrations like React 18 → 19 and especially **Astro 4 → 5** with its new Content Layer architecture that changes everything.

## Methodology: a structured approach by AI

Claude started by doing what I should have done: analyze the dependencies and categorize them by risk level. No rushing, we break down the problem into logical steps:

**Safe updates** (13 packages): ESLint, Prettier, TypeScript and their plugins - minor or patch versions without major breaking changes.

**Moderate updates** (3 packages): The Astro ecosystem staying in version 4, with updates that could introduce slight behavioral changes.

**Major migrations** (6 packages): **Astro 5 with Content Layer**, React 19, Tailwind 4, and their associated dependencies - the real challenges of this migration.

The AI then set up a todo system to organize the work:

```markdown
✅ Safe updates: ESLint, Prettier, TypeScript, etc.
✅ TypeScript fixes: Buffer → Uint8Array compatibility issues
✅ Moderate updates: Astro sitemap, React types, Tailwind CSS
✅ Vulnerability fixes: Security flaw resolution
✅ Compilation tests: Everything works perfectly
```

The principle was simple but effective: after each step, an `npm run build` to verify everything compiles, then a test in development mode to ensure features remain operational. Each validated step was committed before moving to the next.

## Safe migrations: a promising start

The first phase went smoothly. The AI updated all risk-free packages in a single command:

```bash
npm update @astrojs/check @astrojs/rss @tailwindcss/typography @typescript-eslint/parser astro-eslint-parser eslint eslint-plugin-astro fuse.js prettier prettier-plugin-tailwindcss typescript typescript-eslint
```

Immediately after, it ran `npm audit` and `npm audit fix` to resolve detected vulnerabilities. This systematic approach eliminated several security flaws right at the beginning of the process.

The first compilation test revealed unexpected TypeScript errors in OG image generation. The AI quickly identified the problem: with the new versions, `new Response()` was stricter and no longer directly accepted `Buffer`. The solution was elegant:

```typescript
// Before
export const GET: APIRoute = async () =>
  new Response(await generateOgImageForSite(), {
    headers: { "Content-Type": "image/png" },
  });

// After
export const GET: APIRoute = async () => {
  const buffer = await generateOgImageForSite();
  return new Response(new Uint8Array(buffer), {
    headers: { "Content-Type": "image/png" },
  });
};
```

This first successful step gave confidence for what was to come.

## Moderate updates: the Astro ecosystem

The second step concerned moderate updates: mainly the Astro ecosystem staying in version 4, with plugin updates like `@astrojs/sitemap`, `@astrojs/tailwind`, and others. Nothing earth-shattering, but versions that could introduce some small behavioral changes.

Claude handled this cleanly, testing at each step that the plugins continued to work properly with the rest of the stack.

## The major challenge: Astro 5 and Content Layer

The migration to Astro 5 represented the real test of AI autonomy. This version introduced Content Layer, a complete redesign of content management with many breaking changes.

The AI first tried the direct approach:

```bash
npm install astro@^5.13.6
```

The first build failed with cryptic errors about obsolete experimental flags. The AI immediately identified the problem in `astro.config.ts`:

```typescript
// Obsolete configuration
experimental: {
  contentLayer: true,
},
```

This flag, experimental in Astro 4, had become the default standard in Astro 5. Its removal allowed progress, but the build then revealed the scope of the changes.

## Resolving Content Layer breaking changes

The errors were in the dozens. The Content Layer API had fundamentally changed, and the AI had to adapt the entire content rendering system.

**Problem 1: Content Layer collections adaptation**

```typescript
// Adapting the techwatch collection for Content Layer
const techwatch = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.md", base: "./src/content/techwatch" }),
  schema: z.object({
    title: z.string(),
    url: z.string(),
    description: z.string(),
    author: z.string().optional().nullable().default("Unknown"),
    pubDatetime: z.date(),
    tags: z.array(z.string()).default(["tech"]),
  }),
});
```

**Problem 2: Completely changed rendering API**

The most complex was the change in the rendering API. `post.render()` no longer existed, and the AI had to discover through trial and error that the new approach used `post.rendered.html`:

```typescript
// Old system (Astro 4)
const { Content } = await post.render();

// New system (Astro 5)
const renderedHTML = post.rendered?.html;
```

**Problem 3: Dynamic routing adaptation**

During the Content Layer migration, the AI encountered routing issues that required adapting from `slug` to `id` in certain contexts. This wasn't a universal Astro 5 requirement, but rather a specific solution for our routing configuration. The AI had to update several files accordingly:

```typescript
// Before
{featuredPosts.map(({ data, slug }) => (
  <Card href={`/posts/${slug}/`} frontmatter={data} />
))}

// After
{featuredPosts.map(({ data, id }) => (
  <Card href={`/posts/${id}/`} frontmatter={data} />
))}
```

The AI methodically processed each file: `index.astro`, `TagPosts.astro`, `Posts.astro`, `rss.xml.ts`, and all other affected components.

## Intelligent TypeScript error handling

A remarkable aspect was how the AI handled type incompatibilities between collections. The system mixed `blog` and `techwatch` objects with different schemas, creating complex TypeScript errors.

Instead of redesigning the entire architecture, the AI opted for a pragmatic solution with temporary type assertions:

```typescript
// Pragmatic solution for mixed types
const featuredPosts = sortedPosts.filter(({ data }) => (data as any).featured);
const postFilter = ({ data }: CollectionEntry<"blog" | "techwatch">) => {
  return !(data as any).draft && (import.meta.env.DEV || isPublishTimePassed);
};
```

This approach maintained functionality while managing the technical debt of mixed types.

## React 19: the major migration without surprise

Once Astro 5 was stabilized, Claude tackled the other big migration: React 18 → 19. Unlike Astro, this migration went smoothly:

```bash
npm install react@^19.1.1 react-dom@^19.1.1
```

One `npm run build` later, everything compiled perfectly. React 19 seems to have handled backward compatibility well on a project like mine. The AI then continued with `@astrojs/react` which was also updated to support React 19, and the associated types.

## Final adjustments: quality and polish

Once the big problems were solved, the AI focused on quality details. It detected and fixed React warnings:

```typescript
// Fixing missing key props
{tags.map(tag => (
  <li key={tag} className={`inline-block...`}>
    <Tag tag={slugifyStr(tag)} />
  </li>
))}
```

As a bonus, it also noticed that tag pages had generic SEO descriptions and improved them:

```typescript
<Layout
  title={`Tag: ${tagName} | ${SITE.title}`}
  description={`Browse all articles and tech watch posts tagged with "${tagName}". In-depth content about ${tagName} development, best practices, and insights.`}
>
```

This wasn't planned in the initial plan, but might as well take advantage of it!

## Performance and user testing

At each step, the AI performed comprehensive tests. It didn't just rely on `npm run build` but also asked to verify functionality in development mode. I tested the main pages (home, articles, tag pages) while it analyzed console logs and immediately proposed fixes if something was wrong.

The most striking example was the Content Layer rendering error. In development mode, accessing an article page caused:

```
TypeError: post.render is not a function
```

The AI immediately understood the problem, debugged the `post` object to discover its new structure, and adapted the code accordingly. This real-time debugging capability was particularly remarkable.

It should be noted that the autonomy was total: all error messages appeared directly in the development mode console, which the AI could consult without human intervention. Even copying and pasting error messages proved unnecessary since the AI had direct access to the logs.

## Compatibility strategies

The AI also showed pragmatism in its technical choices. For example, for Tailwind CSS, it first attempted migration to version 4, but faced with incompatibilities with `@astrojs/tailwind`, it opted for a conservative approach by staying on v3:

```bash
# Final conservative strategy
npm install @astrojs/tailwind@^6.0.2 tailwindcss@^3.4.17
```

This decision showed a fine understanding of the ecosystem and priorities: better a stable and compatible version than a risky bleeding-edge version.

## Difficult moments and autonomous resolution

While largely successful, the migration wasn't without hiccups. The AI encountered several blocking moments, particularly on Content Layer rendering management where it tested several approaches before finding the solution.

The most critical moment was the `post.render is not a function` error which required several iterations. The AI first tried `post.rendered`, then `post.rendered.Content`, and finally discovered that the right approach was `post.rendered.html`. This exploration phase, while time-consuming, demonstrated its ability to adapt to completely new APIs.

Access to official Astro documentation during migration proved decisive. The AI could consult migration guides and breaking changes to adapt its solutions, which partly explains the final success of this complex migration.

## Results and metrics

In the end, the migration affected:

- **22 dependencies** updated
- **6 major migrations** successful
- **Multiple files modified** across the codebase
- **Significant code changes** to adapt to new APIs
- **0 compilation** errors
- **0 security** vulnerabilities

The total time was a little less than an hour, split between updates, corrections, and validation tests. For a migration of this scope, with so many breaking changes, it was an excellent result and a pleasant surprise given the initial complexity.

## Lessons and limitations

This experience shows that AI can really handle technical maintenance tasks. The structured approach, error handling, and ability to debug in real time frankly surprised me.

However, some limitations appeared. The AI sometimes went in circles on certain problems, particularly Content Layer rendering management where it tested several approaches before finding the right one. In a professional context, this exploration phase could be optimized by better prior knowledge of the documentation.

The Astro migration turned out to be less straightforward than expected, but access to official migration guides allowed the AI to understand the breaking changes well and adapt its solutions accordingly.

## Conclusion

This experience convinced me of one thing: you shouldn't wait months before doing dependency migrations. Automation with AI becomes really effective, but only if you don't let things drag on too long.

My blog had been left without updates for a year, but it remained manageable: 22 dependencies on a relatively simple project. Imagine a SaaS with millions of lines of code and a complex stack left aside for a year... There, even Claude couldn't work miracles.

The ideal would be to automate these migrations quarterly, or even more often. The shorter the delay, the fewer accumulated breaking changes, and the more the AI can handle the migration autonomously. It's a virtuous circle that allows maintaining a sustained update rhythm without spending weekends on it.

For teams that always postpone their migrations: test this approach on a pilot project. You might be surprised by the result, and especially by the time saved on a chore we tend to avoid.
