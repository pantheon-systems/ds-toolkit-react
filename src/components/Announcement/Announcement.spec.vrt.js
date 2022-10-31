const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../libs/testing/vrt');

const storyID = 'components-messaging-announcement--announcement';

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

test.describe('Components/Messaging/Announcement', () => {
	test('Type: info', async ({ page }) => {
		await gotoFrame(page, storyID);

		expect(await page.screenshot()).toMatchSnapshot(
			'announcement__type-info.png',
		);
	});

	test('Type: warning', async ({ page }) => {
		await gotoFrame(page, storyID, 'type:warning');

		expect(await page.screenshot()).toMatchSnapshot(
			'announcement__type-warning.png',
		);
	});

	test('Dismissible', async ({ page }) => {
		await gotoFrame(
			page,
			'components-messaging-announcement--announcement-dismissible',
		);

		expect(await page.screenshot()).toMatchSnapshot(
			'announcement__dismissible.png',
		);
	});
});
