const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../libs/testing/vrt');

const storyID = 'components-inputs-obscured--input-obscured';

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

test.describe('Components/Inputs/Obscured', () => {
	test('Default', async ({ page }) => {
		await gotoFrame(page, storyID);

		expect(await page.screenshot()).toMatchSnapshot(
			'input-obscured__default.png',
		);
	});

	test('Enter text', async ({ page }) => {
		await gotoFrame(page, storyID);

		const input = page.locator('.pds-input-field__input');

		await input.type('Epsilon');

		expect(await page.screenshot()).toMatchSnapshot(
			'input-obscured__enter-text.png',
		);
	});

	test('Disabled', async ({ page }) => {
		await gotoFrame(page, storyID, 'disabled:true');

		expect(await page.screenshot()).toMatchSnapshot(
			'input-obscured__disabled.png',
		);
	});

	test('Required', async ({ page }) => {
		await gotoFrame(page, storyID, 'required:true');

		expect(await page.screenshot()).toMatchSnapshot(
			'input-obscured__required.png',
		);
	});

	test('With message', async ({ page }) => {
		await gotoFrame(
			page,
			storyID,
			'message:Please+enter+a+password+with+at+least+12+characters',
		);

		expect(await page.screenshot()).toMatchSnapshot(
			'input-obscured__with-message.png',
		);
	});

	test('Functions: counter', async ({ page }) => {
		await gotoFrame(page, 'components-inputs-obscured--with-counter-function');

		const input = page.locator('.pds-input-field__input');
		await input.type('Epsilon');

		expect(await page.screenshot()).toMatchSnapshot(
			'input-obscured__functions-counter.png',
		);
	});

	test('Functions: validation', async ({ page }) => {
		await gotoFrame(
			page,
			'components-inputs-obscured--with-validation-function',
		);

		const input = page.locator('.pds-input-field__input');
		await input.type('Epsilon-alpha-gamma');

		const clearButton = page.locator('.pds-input-field__clear');
		await clearButton.focus();

		expect(await page.screenshot()).toMatchSnapshot(
			'input-obscured__functions-validation.png',
		);
	});

	test('Toggle obfuscation', async ({ page }) => {
		await gotoFrame(page, storyID);

		const input = page.locator('.pds-input-field__input');
		await input.type('Epsilon');

		const toggleButton = page.locator('.pds-input-obscured__toggle');
		await toggleButton.click();

		expect(await page.screenshot()).toMatchSnapshot(
			'input-obscured__toggle-obfuscation.png',
		);
	});

	test('Enable obfuscation on blur', async ({ page, browserName }) => {
		await gotoFrame(page, storyID);

		const input = page.locator('.pds-input-field__input');
		await input.type('Epsilon');

		const toggleButton = page.locator('.pds-input-obscured__toggle');
		await toggleButton.click();

		await focusViaTab(page, browserName);

		expect(await page.screenshot()).toMatchSnapshot(
			'input-obscured__on-blur-obfuscation.png',
		);
	});
});
