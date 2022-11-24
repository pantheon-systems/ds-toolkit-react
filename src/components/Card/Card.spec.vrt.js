const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../libs/testing/vrt');

const storyID = 'components-card--card';

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

// Page screenshot clipping/cropping dimensions
const clipOptions = { x: 0, y: 0, width: 1200, height: 400 };

test.describe('Components/Card', () => {
	test('Default', async ({ page }) => {
		await gotoFrame(page, storyID);

		expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
			'card__default.png',
		);
	});
});
