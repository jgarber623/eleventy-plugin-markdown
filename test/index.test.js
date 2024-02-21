const assert = require("node:assert");
const test = require("node:test");

const Eleventy = require("@11ty/eleventy");

test("default plugin configuration", async () => {
  const eleventy = new Eleventy("test/fixtures/default", null, { configPath: "index.js" });
  const results = await eleventy.toJSON();

  const expected = `<title>It’s a party!</title>\n<main><p>It’s <em>a</em><br>\nparty!</p>\n<p>Yay!</p>\n</main>\n`;

  assert.equal(results[0].content, expected);
});
