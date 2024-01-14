const markdownFilter = require('./lib/filters/markdown.js');
const markdownLibrary = require('./lib/libraries/markdown.js');

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

  eleventyConfig.setLibrary('md', markdownLibrary({ options, plugins, preset, rules }));

  eleventyConfig.addFilter('markdown', markdownFilter);
};
