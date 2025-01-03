import assert from "node:assert";
import test from "node:test";

import Eleventy from "@11ty/eleventy";

test("default plugin configuration", async () => {
  const eleventy = new Eleventy("test/fixtures/default", null, { configPath: "index.js" });
  const results = await eleventy.toJSON();

  const expected = `<title>It’s a party!</title>\n<main><p>It’s <em>a</em><br>\nparty!</p>\n<p>Yay!</p>\n</main>\n`;

  assert.strictEqual(results[0].content, expected);
});
