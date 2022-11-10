const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../libs/testing/vrt');

const storyID = 'components-inputs-checkbox--checkbox';

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

// Page screenshot clipping/cropping dimensions
const clipOptions = { x: 0, y: 0, width: 350, height: 500 };

test.describe('Components/Inputs/Checkbox', () => {
	test('Default', async ({ page }) => {
		await gotoFrame(page, storyID);

		expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
			'checkbox__default.png',
		);
	});

	test('Select checkbox: via mouse', async ({ page }) => {
		await gotoFrame(page, storyID);

		const checkbox = page.locator('#pds-sample-checkbox');

		await checkbox.click();

		expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
			'checkbox__select-via-mouse.png',
		);
	});

	test('Select checkbox: via keyboard', async ({ page, browserName }) => {
		await gotoFrame(page, storyID);

		await focusViaTab(page, browserName);

		await page.keyboard.press('Space');

		expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
			'checkbox__select-via-keyboard.png',
		);
	});
});
