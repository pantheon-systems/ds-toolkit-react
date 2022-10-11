const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../../src/libs/testing/vrt');
const { a11yTest } = require('../../../src/libs/testing/a11y');

const storyID = 'components-inputs-text--input-text';

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

test.describe('Components/Inputs/Text', () => {
	test('Default', async ({ page }) => {
		await gotoFrame(page, storyID);

		const a11yNumViolations = await a11yTest(page, 'input-text__default');

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('Enter text', async ({ page }) => {
		await gotoFrame(page, storyID);

		const input = page.locator('.pds-input-text__input');

		await input.type('Epsilon');

		const a11yNumViolations = await a11yTest(page, 'input-text__enter-text');

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('Disabled', async ({ page }) => {
		await gotoFrame(page, storyID, 'disabled:true');

		const a11yNumViolations = await a11yTest(page, 'input-text__disabled');

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('Required', async ({ page }) => {
		await gotoFrame(page, storyID, 'required:true');

		const a11yNumViolations = await a11yTest(page, 'input-text__required');

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('With message', async ({ page }) => {
		await gotoFrame(page, storyID, 'message:Please+enter+your+full+name');

		const a11yNumViolations = await a11yTest(page, 'input-text__with-message');

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('Type: search', async ({ page }) => {
		await gotoFrame(page, storyID, 'type:search');

		const a11yNumViolations = await a11yTest(page, 'input-text__type-search');

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('Functions: counter', async ({ page }) => {
		await gotoFrame(page, 'components-inputs-text--input-text-example-counter');

		const input = page.locator('.pds-input-text__input');
		await input.type('Epsilon');

		const a11yNumViolations = await a11yTest(
			page,
			'input-text__functions-counter',
		);

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
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

		const a11yNumViolations = await a11yTest(
			page,
			'input-text__functions-validation',
		);

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});
});
