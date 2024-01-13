const markdown = require('markdown-it');

module.exports = function({ options, plugins, preset, rules }) {
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
};
