const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../../src/libs/testing/vrt');
const { a11yTest } = require('../../../src/libs/testing/a11y');

const storyID = 'components-inputs-obscured--input-obscured';

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

test.describe('Components/Inputs/Obscured', () => {
	test('Default', async ({ page }) => {
		await gotoFrame(page, storyID);

		const a11yNumViolations = await a11yTest(page, 'input-obscured__default');

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('Enter text', async ({ page }) => {
		await gotoFrame(page, storyID);

		const input = page.locator('.pds-input-obscured__input');

		await input.type('Epsilon');

		const a11yNumViolations = await a11yTest(
			page,
			'input-obscured__enter-text',
		);

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('Disabled', async ({ page }) => {
		await gotoFrame(page, storyID, 'disabled:true');

		const a11yNumViolations = await a11yTest(page, 'input-obscured__disabled');

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('Required', async ({ page }) => {
		await gotoFrame(page, storyID, 'required:true');

		const a11yNumViolations = await a11yTest(page, 'input-obscured__required');

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('With message', async ({ page }) => {
		await gotoFrame(
			page,
			storyID,
			'message:Please+enter+a+password+with+at+least+12+characters',
		);

		const a11yNumViolations = await a11yTest(
			page,
			'input-obscured__with-message',
		);

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('Functions: counter', async ({ page }) => {
		await gotoFrame(page, 'components-inputs-obscured--with-counter-function');

		const input = page.locator('.pds-input-obscured__input');
		await input.type('Epsilon');

		const a11yNumViolations = await a11yTest(
			page,
			'input-obscured__functions-counter',
		);

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('Functions: validation', async ({ page }) => {
		await gotoFrame(
			page,
			'components-inputs-obscured--with-validation-function',
		);

		const input = page.locator('.pds-input-obscured__input');
		await input.type('Epsilon');

		const clearButton = page.locator('.pds-input-obscured__clear');
		await clearButton.focus();

		const a11yNumViolations = await a11yTest(
			page,
			'input-obscured__functions-validation',
		);

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('Toggle obfuscation', async ({ page }) => {
		await gotoFrame(page, storyID);

		const input = page.locator('.pds-input-obscured__input');
		await input.type('Epsilon');

		const toggleButton = page.locator('.pds-input-obscured__toggle');
		await toggleButton.click();

		const a11yNumViolations = await a11yTest(
			page,
			'input-obscured__functions-validation',
		);

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});
});
