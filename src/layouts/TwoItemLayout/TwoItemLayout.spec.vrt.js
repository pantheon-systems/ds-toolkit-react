const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../libs/testing/vrt');

const storyID = 'layouts-within-page-two-item-layout--two-item-layout';
//
// // enable single file parallelism
// test.describe.configure({ mode: 'parallel' });

test.describe('Layouts/Within Page/Two Item Layout', () => {
	test('Default(equal)', async ({ page }) => {
		await gotoFrame(page, storyID);

		expect(await page.screenshot()).toMatchSnapshot(
			'two-item-layout__equal.png',
		);
	});

	test('one-third-start', async ({ page }) => {
		await gotoFrame(page, storyID, 'layoutVariant:one-third-start');

		expect(await page.screenshot()).toMatchSnapshot(
			'two-item-layout__one-third-start.png',
		);
	});

	test('one-third-end', async ({ page }) => {
		await gotoFrame(page, storyID, 'layoutVariant:one-third-end');

		expect(await page.screenshot()).toMatchSnapshot(
			'two-item-layout__one-third-end.png',
		);
	});
});
