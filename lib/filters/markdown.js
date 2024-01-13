const markdown = require('../libraries/markdown.js');

module.exports = function(string = '', value) {
  if (value === 'inline') {
    return markdown.renderInline(string);
  }

  return markdown.render(string);
};
