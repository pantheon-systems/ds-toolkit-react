const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../libs/testing/vrt');

const storyID = 'components-{{ dashCase componentName }}--';

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

// Page screenshot clipping/cropping dimensions
const clipOptions = { x: 0, y: 0, width: 350, height: 500 };

test.describe('Components/{{ titleCase componentName }}', () => {
	test.describe('General <RENAME IF APPROPRIATE>', () => {
		test('Base <RENAME IF APPROPRIATE>', async ({ page }) => {
			await gotoFrame(page, storyID);

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'{{ dashCase componentName }}__general-base.png',
			);
		});
	});
});
