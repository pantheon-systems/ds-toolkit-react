const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../libs/testing/vrt');

const storyID_creditCard =
	'components-inputs-formatted--input-formatted-credit-card';
const storyID_phoneUS = 'components-inputs-formatted--input-formatted-phone-us';
const storyID_localizedNumber =
	'components-inputs-formatted--input-formatted-localized-number';

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

test.describe('Components/Inputs/Formatted', () => {
	test('Default', async ({ page }) => {
		await gotoFrame(page, storyID_creditCard);

		expect(await page.screenshot()).toMatchSnapshot(
			'input-formatted__default.png',
		);
	});

	test('Format: credit card', async ({ page }) => {
		await gotoFrame(page, storyID_creditCard);

		const input = page.locator('.pds-input-field__input');

		await input.type('4141123456789999');

		expect(await page.screenshot()).toMatchSnapshot(
			'input-formatted__credit-card.png',
		);
	});

	test('Format: credit card (American Express)', async ({ page }) => {
		await gotoFrame(page, storyID_creditCard);

		const input = page.locator('.pds-input-field__input');

		await input.type('341234567800000');

		expect(await page.screenshot()).toMatchSnapshot(
			'input-formatted__credit-card-amex.png',
		);
	});

	test('Format: phone number (USA/CA)', async ({ page }) => {
		await gotoFrame(page, storyID_phoneUS);

		const input = page.locator('.pds-input-field__input');

		await input.type('5553231588');

		expect(await page.screenshot()).toMatchSnapshot(
			'input-formatted__phone-us.png',
		);
	});

	test('Format: localized number', async ({ page }) => {
		await gotoFrame(page, storyID_localizedNumber);

		const input = page.locator('.pds-input-field__input');

		await input.type('2568990.85');

		expect(await page.screenshot()).toMatchSnapshot(
			'input-formatted__localized-number.png',
		);
	});
});
