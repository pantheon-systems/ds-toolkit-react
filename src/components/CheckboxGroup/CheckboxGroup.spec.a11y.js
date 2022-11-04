/*
 * !!! DELETE THIS FILE
 * -> if no specific accessibility/a11y tests are needed for the component
 */

const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../../src/libs/testing/vrt');
const { a11yTest } = require('../../../src/libs/testing/a11y');

const storyID = 'components-checkbox-group--';

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

test.describe('Components/Checkbox Group', () => {
	test('<PROVIDE DESCRIPTIVE NAME HERE>', async ({ page }) => {
		await gotoFrame(page, storyID);

		const a11yNumViolations = await a11yTest(
			page,
			'checkbox-group__default',
		);

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});
});
