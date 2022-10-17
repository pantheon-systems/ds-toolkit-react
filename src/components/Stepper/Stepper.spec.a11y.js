const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../../src/libs/testing/vrt');
const { a11yTest } = require('../../../src/libs/testing/a11y');

const storyID = 'components-stepper--stepper';

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

test.describe('Components/Stepper', () => {
	test('Base', async ({ page }) => {
		await gotoFrame(page, storyID);

		const a11yNumViolations = await a11yTest(
			page,
			'components-stepper__default',
		);

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('State: hover', async ({ page }) => {
		await gotoFrame(page, storyID);

		const button = page.locator('button.pds-stepper__step-content');

		await button.hover();

		const a11yNumViolations = await a11yTest(
			page,
			'components-stepper__default-hover',
		);

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('State: focused', async ({ page, browserName }) => {
		await gotoFrame(page, storyID);

		await focusViaTab(page, browserName);

		const a11yNumViolations = await a11yTest(
			page,
			'components-stepper__default-focused',
		);

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('State: active', async ({ page, browserName }) => {
		await gotoFrame(page, storyID);

		const button = page.locator('button.pds-stepper__step-content');

		await button.hover();
		await page.mouse.down();

		const a11yNumViolations = await a11yTest(
			page,
			'components-stepper__default-active',
		);

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('Activate button (via mouse) ', async ({ page }) => {
		await gotoFrame(page, storyID);

		const button = page.locator('button.pds-stepper__step-content');

		await button.click();

		const a11yNumViolations = await a11yTest(
			page,
			'components-stepper__default-activate-button-mouse',
		);

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('Activate button (via keyboard: enter) ', async ({
		page,
		browserName,
	}) => {
		await gotoFrame(page, storyID);

		await focusViaTab(page, browserName);

		await page.keyboard.press('Enter');

		const a11yNumViolations = await a11yTest(
			page,
			'components-stepper__default-activate-keyboard-enter',
		);

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('Activate button (via keyboard: space) ', async ({
		page,
		browserName,
	}) => {
		await gotoFrame(page, storyID);

		await focusViaTab(page, browserName);

		await page.keyboard.press('Space');

		const a11yNumViolations = await a11yTest(
			page,
			'components-stepper__default-activate-keyboard-space',
		);

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('Step with Error', async ({ page }) => {
		await gotoFrame(page, storyID, 'steps:threeStepsWithError');

		const a11yNumViolations = await a11yTest(
			page,
			'components-stepper__step-with-error',
		);

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});
});
