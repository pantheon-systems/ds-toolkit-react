// @ts-check
const { devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
	testDir: 'src',
	/* Folder for test artifacts such as screenshots, videos, traces, etc. */
	outputDir: './__tests__/_test-results/artifacts',
	preserveOutput: 'failures-only',
	quiet: true,
	/* Maximum time one test can run for. */
	timeout: 30 * 1000,
	expect: {
		/**
		 * Maximum time expect() should wait for the condition to be met.
		 * For example in `await expect(locator).toHaveText();`
		 */
		timeout: 5000,
	},
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 10 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: process.env.CI
		? [
				[
					'junit',
					{ outputFile: './__tests__/_test-results/junit/ci-results.xml' },
				],
		  ]
		: [
				[
					'html',
					{
						open: process.env.CI ? 'never' : 'on-failure',
						outputFolder: './__tests__/_test-results/report',
					},
				],
		  ],
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
		actionTimeout: 0,
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: 'http://localhost:6006',

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',
	},

	/* Configure projects for major browsers */
	projects: [
		/* Visual regression tests */
		{
			name: 'vrt:chromium',
			testIgnore: ['*.spec.a11y.js', '*.spec.e2e.js', '*.spec.mobile-e2e.js'],
			use: {
				...devices['Desktop Chrome'],
			},
		},

		{
			name: 'vrt:firefox',
			testIgnore: ['*.spec.a11y.js', '*.spec.e2e.js', '*.spec.mobile-e2e.js'],
			use: {
				...devices['Desktop Firefox'],
			},
		},

		{
			name: 'vrt:webkit',
			testIgnore: ['*.spec.a11y.js', '*.spec.e2e.js', '*.spec.mobile-e2e.js'],
			use: {
				...devices['Desktop Safari'],
			},
		},

		/* Visual regression tests against mobile viewports. */
		{
			name: 'vrt:Mobile Chrome',
			testIgnore: ['*.spec.a11y.js', '*.spec.e2e.js', '*.spec.mobile-e2e.js'],
			use: {
				...devices['Pixel 5'],
			},
		},
		{
			name: 'vrt:Mobile Safari',
			testIgnore: ['*.spec.a11y.js', '*.spec.e2e.js', '*.spec.mobile-e2e.js'],
			use: {
				...devices['iPhone 12'],
			},
		},

		/* Accessibility tests */
		{
			name: 'a11y',
			testDir: '.',
			testMatch: [
				'__tests__/a11y/__testfiles__/**/*.spec.js',
				'src/components/**/*.spec.a11y.js',
			],
			use: {
				...devices['Desktop Chrome'],
			},
		},

		/* End-to-end tests */
		{
			name: 'e2e:chromium',
			testIgnore: ['*.spec.a11y.js', '*.spec.vrt.js', '*.spec.mobile-e2e.js'],
			use: {
				...devices['Desktop Chrome'],
			},
		},

		{
			name: 'e2e:firefox',
			testIgnore: ['*.spec.a11y.js', '*.spec.vrt.js', '*.spec.mobile-e2e.js'],
			use: {
				...devices['Desktop Firefox'],
			},
		},

		{
			name: 'e2e:webkit',
			testIgnore: ['*.spec.a11y.js', '*.spec.vrt.js', '*.spec.mobile-e2e.js'],
			use: {
				...devices['Desktop Safari'],
			},
		},

		/* End-to-end tests against mobile viewports. */
		{
			name: 'e2e:Mobile Chrome',
			testIgnore: ['*.spec.a11y.js', '*.spec.vrt.js', '*.spec.e2e.js'],
			use: {
				...devices['Pixel 5'],
			},
		},
		{
			name: 'e2e:Mobile Safari',
			testIgnore: ['*.spec.a11y.js', '*.spec.vrt.js', '*.spec.e2e.js'],
			use: {
				...devices['iPhone 12'],
			},
		},

		/* Test against branded browsers. */
		// {
		//   name: 'Microsoft Edge',
		//   use: {
		//     channel: 'msedge',
		//   },
		// },
		// {
		//   name: 'Google Chrome',
		//   use: {
		//     channel: 'chrome',
		//   },
		// },
	],

	/* Folder for test artifacts such as screenshots, videos, traces, etc. */
	// outputDir: 'test-results/',

	/* Run your local dev server before starting the tests */
	webServer: {
		command: 'npm run storybook',
		port: 6006,
		// start the server first when on CI
		reuseExistingServer: !process.env.CI,
	},
};

module.exports = config;
