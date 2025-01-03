import markdown from "markdown-it";

import pkg from "./package.json" with { type: "json" };

export const defaultMarkdownOptions = {
  breaks: true,
  html: true,
  typographer: true,
};

export default function eleventyPluginMarkdown(eleventyConfig, options_ = {}) {
  eleventyConfig.versionCheck(pkg["11ty"].compatibility);

  let { options, preset = "default", plugins = [], rules = {} } = options_;

  options = Object.assign(defaultMarkdownOptions, options);

  plugins = plugins.filter(Boolean);

  const markdownLibrary = (() => {
    const parser = markdown(preset, options);

    for (const plugin of plugins) {
      if (Array.isArray(plugin)) {
        parser.use(...plugin);
      } else {
        parser.use(plugin);
      }
    }

    for (const rule in rules) {
      parser.renderer.rules[rule] = rules[rule];
    }

    return parser;
  })();

  eleventyConfig.setLibrary("md", markdownLibrary);

  eleventyConfig.addFilter("markdown", (string = "", value) => {
    if (value === "inline") {
      return markdownLibrary.renderInline(string);
    }

    return markdownLibrary.render(string);
  });
}
