const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../libs/testing/vrt');

const storyID = 'layouts-page-global--layout-global';

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

test.describe('Layouts/Page/Global', () => {
	test('Default', async ({ page }) => {
		await gotoFrame(page, storyID);

		expect(await page.screenshot()).toMatchSnapshot(
			'layout-global__default.png',
		);
	});
});
