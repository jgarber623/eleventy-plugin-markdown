const test = require('ava');

const Eleventy = require('@11ty/eleventy');

test('default plugin configuration', async t => {
  const eleventy = new Eleventy('test/fixtures/default', null, { configPath: 'index.js' });
  const results = await eleventy.toJSON();

  t.is(results[0].content, '<title>It’s a party!</title>\n<main><p>It’s <em>a</em><br>\nparty!</p>\n<p>Yay!</p>\n</main>\n');
});