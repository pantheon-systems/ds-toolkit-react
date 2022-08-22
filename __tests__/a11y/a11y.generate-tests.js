const fs = require("fs").promises;
const del = require("del");
const path = require("path");

// Slugify a string
function slugify(str) {
  str = str.replace(/^\s+|\s+$/g, "");

  // Make the string lowercase
  str = str.toLowerCase();

  // Remove accents, swap ñ for n, etc
  var from =
    "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
  var to =
    "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  // Remove invalid chars
  str = str
    .replace(/[^a-z0-9 -]/g, "")
    // Collapse whitespace and replace by -
    .replace(/\s+/g, "-")
    // Collapse dashes
    .replace(/-+/g, "-");

  return str;
}

// base content for tests file
let tests = `const { test, expect } = require("@playwright/test");
const { a11yTest } = require("../../../src/libs/testing/a11y");

// enable single file parallelism
test.describe.configure({ mode: "parallel" });
`;

// repeatable template for each test
function testTemplate(story) {
  return `
	test("${story.name}", async ({ page }) => {
		await page.goto(
			"/iframe.html?id=${story.id}&args=&viewMode=story"
		);
		
		const a11yNumViolations = await a11yTest(page, "${slugify(
      story.kind
    )}__${slugify(story.name)}");

		expect(
			a11yNumViolations,
			\`${"${a11yNumViolations} accessibility issues found."}\`
		).toBe(0);
	});
	`;
}

// asynchronously build the accessibility(a11y) test files using Storybook as the source of truth
(async () => {
  // do some cleanup
  await del(["./__tests__/a11y/__testfiles__/a11y.*.spec.js"]);
  await del(["./__tests__/a11y/results/"]);

  // use the Storybook generated `stories.json` file
  const rawStories = require(__dirname + "/../../storybook-static/stories.json").stories;
  const stories = new Object();

  // iterate over raw stories to filter to only component stories and remove pages
  Object.entries(rawStories).map((entry) => {
    const value = entry[1];
    const kind = value.kind.split("/").slice(1).join("/"); // remove the top level category name

    if (kind && !stories.hasOwnProperty(kind) && value.story !== "Page") {
      stories[kind] = new Array();
    }

    if (value.story !== "Page") {
      stories[kind].push(value);
    }
  });

  // create test files grouped by top level category/name
  for (let kind in stories) {
    // get the path to where the a11y.*.spec.js custom file might be
    const customA11yPath = path.dirname(stories[kind][0].importPath);

    // Check if the file exists
    let filesFound;
    await fs
      .readdir(customA11yPath)
      .then(
        (results) =>
          (filesFound = results.filter(
            (fn) => fn.startsWith("a11y.") && fn.endsWith(".spec.js")
          ))
      );

    // only generate a test file if we don't have a custom file that already exists
    if (filesFound.length === 0) {
      let fileTests = tests;

      fileTests += `
test.describe("${kind}", () => {`;

      stories[kind].map((story) => {
        const storyTest = testTemplate(story);
        fileTests += storyTest;
      });

      fileTests += `
});`;

      // write tests to file
      await fs.writeFile(
        `./__tests__/a11y/__testfiles__/a11y.${slugify(kind)}.spec.js`,
        fileTests
      );
    }
  }
})();
