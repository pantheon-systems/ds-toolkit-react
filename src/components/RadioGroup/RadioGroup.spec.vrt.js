const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../libs/testing/vrt');

const storyID = 'components-inputs-radio-group--radio-group';

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

// Page screenshot clipping/cropping dimensions
const clipOptions = { x: 0, y: 0, width: 350, height: 500 };

test.describe('Components/Inputs/Radio Group', () => {
	test('Default', async ({ page }) => {
		await gotoFrame(page, storyID);

		expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
			'radio-group__default.png',
		);
	});

	test('Select option: via mouse', async ({ page }) => {
		await gotoFrame(page, storyID);

		// get the intended option
		const optionSecond = page.locator(
			'.pds-radio-group__options .pds-radio-group__option >> nth=1',
		);

		await optionSecond.click();

		// wait for animation to complete
		await page.waitForTimeout(250);

		expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
			'radio-group__selection-via-mouse.png',
		);
	});

	test('Select option: via keyboard', async ({ page, browserName }) => {
		await gotoFrame(page, storyID);

		await focusViaTab(page, browserName);

		await page.keyboard.press('ArrowDown');

		// wait for animation to complete
		await page.waitForTimeout(250);

		expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
			'radio-group__selection-via-keyboard.png',
		);
	});
});
