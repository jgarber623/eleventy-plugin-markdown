const markdown = require('markdown-it');

const package_ = require('./package.json');

module.exports = function(eleventyConfig, options_ = {}) {
  try {
    eleventyConfig.versionCheck(package_['11ty'].compatibility);
  } catch (error) {
    console.log(`WARN: Eleventy Plugin (${package_.name}) Compatibility: ${error.message}`);
  }

  let { options, preset = 'default', plugins = [], rules = {} } = options_;

  options = Object.assign({
    breaks: true,
    html: true,
    typographer: true
  }, options);

  plugins = plugins.filter(Boolean);

  const markdownLibrary = (() => {
    const parser = markdown(preset, options);

    for (const plugin of plugins) {
      if (Array.isArray(plugin)) {
        parser.use(...plugin);
      } else {
        parser.user(plugin);
      }
    }

    for (const rule in rules) {
      parser.renderer.rules[rule] = rules[rule];
    }

    return parser;
  })();

  eleventyConfig.setLibrary('md', markdownLibrary);

  eleventyConfig.addFilter('markdown', (string = '', value) => {
    if (value === 'inline') {
      return markdownLibrary.renderInline(string);
    }

    return markdownLibrary.render(string);
  });
};
