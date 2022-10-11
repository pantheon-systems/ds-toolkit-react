const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../libs/testing/vrt');

const storyID = 'components-inputs-text--input-text';

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

test.describe('Components/Inputs/Text', () => {
	test('Default', async ({ page }) => {
		await gotoFrame(page, storyID);

		expect(await page.screenshot()).toMatchSnapshot('input-text__default.png');
	});

	test('Enter text', async ({ page }) => {
		await gotoFrame(page, storyID);

		const input = page.locator('.pds-input-text__input');

		await input.type('Epsilon');

		expect(await page.screenshot()).toMatchSnapshot(
			'input-text__enter-text.png',
		);
	});

	test('Disabled', async ({ page }) => {
		await gotoFrame(page, storyID, 'disabled:true');

		expect(await page.screenshot()).toMatchSnapshot('input-text__disabled.png');
	});

	test('Required', async ({ page }) => {
		await gotoFrame(page, storyID, 'required:true');

		expect(await page.screenshot()).toMatchSnapshot('input-text__required.png');
	});

	test('With message', async ({ page }) => {
		await gotoFrame(page, storyID, 'message:Please+enter+your+full+name');

		expect(await page.screenshot()).toMatchSnapshot(
			'input-text__with-message.png',
		);
	});

	test('With placeholder', async ({ page }) => {
		await gotoFrame(page, storyID, 'placeholder:Please+enter+your+full+name');

		expect(await page.screenshot()).toMatchSnapshot(
			'input-text__with-placeholder.png',
		);
	});

	test('With initial value', async ({ page }) => {
		await gotoFrame(page, storyID, 'initialValue:Beta');

		expect(await page.screenshot()).toMatchSnapshot(
			'input-text__with-initial-value.png',
		);
	});

	test('Type: search', async ({ page }) => {
		await gotoFrame(page, storyID, 'type:search');

		expect(await page.screenshot()).toMatchSnapshot(
			'input-text__type-search.png',
		);
	});

	test('Type: search, enter text', async ({ page }) => {
		await gotoFrame(page, storyID, 'type:search');

		const input = page.locator('.pds-input-text__input');
		await input.type('Epsilon');

		expect(await page.screenshot()).toMatchSnapshot(
			'input-text__type-search_enter-text.png',
		);
	});

	test('Type: textarea', async ({ page }) => {
		await gotoFrame(page, storyID, 'type:textarea');

		expect(await page.screenshot()).toMatchSnapshot(
			'input-text__type-textarea.png',
		);
	});

	test('Type: textarea, enter text', async ({ page }) => {
		await gotoFrame(page, storyID, 'type:textarea');

		const input = page.locator('.pds-input-text__input');
		await input.type('Epsilon');

		expect(await page.screenshot()).toMatchSnapshot(
			'input-text__type-textarea_enter-text.png',
		);
	});

	test('Functions: counter', async ({ page }) => {
		await gotoFrame(page, 'components-inputs-text--input-text-example-counter');

		const input = page.locator('.pds-input-text__input');
		await input.type('Epsilon');

		expect(await page.screenshot()).toMatchSnapshot(
			'input-text__functions-counter.png',
		);
	});

	test('Functions: validation', async ({ page }) => {
		await gotoFrame(
			page,
			'components-inputs-text--input-text-example-validation',
		);

		const input = page.locator('.pds-input-text__input');
		await input.type('Epsilon');

		const clearButton = page.locator('.pds-input-text__clear');
		await clearButton.focus();

		expect(await page.screenshot()).toMatchSnapshot(
			'input-text__functions-validation.png',
		);
	});
});
