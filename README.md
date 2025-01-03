# eleventy-plugin-markdown

**An [Eleventy](https://www.11ty.dev) plugin for processing Markdown files with [markdown-it](https://markdown-it.github.io).**

[![npm](https://img.shields.io/npm/v/@jgarber/eleventy-plugin-markdown.svg?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@jgarber/eleventy-plugin-markdown)
[![Downloads](https://img.shields.io/npm/dt/@jgarber/eleventy-plugin-markdown.svg?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@jgarber/eleventy-plugin-markdown)
[![Build](https://img.shields.io/github/actions/workflow/status/jgarber623/eleventy-plugin-markdown/ci.yml?branch=main&logo=github&style=for-the-badge)](https://github.com/jgarber623/eleventy-plugin-markdown/actions/workflows/ci.yml)

## Usage

First, add the plugin as [a development dependency](https://docs.npmjs.com/cli/configuring-npm/package-json#devdependencies) to your project's `package.json` file:

```sh
npm install --save-dev @jgarber/eleventy-plugin-markdown
```

Next, add the plugin to your project's [Eleventy configuration file](https://www.11ty.dev/docs/config#default-filenames) (e.g. `eleventy.config.js`):

```js
import eleventyPluginMarkdown from "@jgarber/eleventy-plugin-markdown";

export default async function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyPluginMarkdown);
}
```

### Filters

With no additional configuration, eleventy-plugin-markdown will configure markdown-it and add a `markdown` [filter](https://www.11ty.dev/docs/filters) for use in your Eleventy project's templates.

In [a JavaScript template](https://www.11ty.dev/docs/languages/javascript) (e.g. `post.11ty.js`), you might use the `markdown` filter to process a post's title to properly render typographic quotes. The optional second argument, `'inline'`, instructs the filter to use [`MarkdownIt.renderInline`](https://markdown-it.github.io/markdown-it#MarkdownIt.renderInline) which will not wrap the output in a `<p>` element.

```js
export default class {
  render({ collections }) {
    const post = collections.post[0];

    return JSON.stringify({
      title: this.markdown(post.data.title, 'inline')
    });
  }
}
```

Or, in [a Liquid template](https://www.11ty.dev/docs/languages/liquid) (e.g. `post.liquid`):

```liquid
<title>{{ post.data.title | markdown: "inline" }}</title>
```

> [!TIP]
> Omit the `inline` argument/option to wrap the processed output in `<p>` elements. Using the examples above: `this.markdown(post.data.title)` and `{{ post.data.title | markdown }}`.

## Options

| Name      | Type(s)  | Default                                           |
|:----------|:---------|:--------------------------------------------------|
| `preset`  | `String` | `default`                                         |
| `options` | `Object` | `{ breaks: true, html: true, typographer: true }` |
| `plugins` | `Array`  | `[]`                                              |
| `rules`   | `Object` | `{}`                                              |

From v2.0.0, this package exports these options as `defaultMarkdownOptions`.

See [the `MarkdownIt.new` documentation](https://markdown-it.github.io/markdown-it#MarkdownIt.new) for details on additional `preset` and `options` values.

### Plugins

The `plugins` option accepts an Array whose elements may be plugin functions or an Array of a plugin function and an Object of options. Each element in the `plugins` Array is passed directly to [`MarkdownIt.use`](https://markdown-it.github.io/markdown-it#MarkdownIt.use).

```js
import eleventyPluginMarkdown from "@jgarber/eleventy-plugin-markdown";

import markdownItFootnote from "markdown-it-footnote";
import markdownItHandle from "markdown-it-handle";

export default async function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyPluginMarkdown, {
    plugins: [
      markdownItFootnote,
      [markdownItHandle, { attributes: false }]
    ]
  });
}
```

### Renderer Rules

The `rules` option accepts an Object whose keys are tokens and values are functions conforming to [markdown-it's `Renderer#rules` interface](https://markdown-it.github.io/markdown-it#Renderer.prototype.rules). Various plugins (like [markdown-it-footnote](https://www.npmjs.com/package/markdown-it-footnote)) support this kind of customization.

```js
import eleventyPluginMarkdown from "@jgarber/eleventy-plugin-markdown";

import markdownItFootnote from "markdown-it-footnote";

export default async function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyPluginMarkdown, {
    plugins: [markdownItFootnote],
    rules: {
      footnote_block_open: () => `<h2>Footnotes</h2>\n<ol class="footnotes">\n`,
      footnote_block_close: () => '</ol>\n'
    }
  });
}
```

## Acknowledgments

First and foremost, eleventy-plugin-markdown wouldn't be possible without [Zach Leatherman](https://www.zachleat.com)'s incredible work creating Eleventy and his stewardship of its community.

eleventy-plugin-markdown is written and maintained by [Jason Garber](https://sixtwothree.org).
