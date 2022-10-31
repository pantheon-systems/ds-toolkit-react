/*
 * !!! DELETE THIS FILE
 * -> if no specific end-to-end/non-VRT tests are needed for the component
 */

const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../libs/testing/vrt');

const storyID = 'components-checkbox--';

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

// Page screenshot clipping/cropping dimensions
const clipOptions = { x: 0, y: 0, width: 350, height: 500 };

test.describe('Components/Checkbox', () => {
	test.describe('General <RENAME IF APPROPRIATE>', () => {
		test('<PROVIDE DESCRIPTIVE NAME HERE>', async ({ page, browserName }) => {
			await gotoFrame(page, storyID);

			expect('<VALUE FROM TEST>').toBe('<EXPECTED VALUE>');
		});
	});
});
