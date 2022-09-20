const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../libs/testing/vrt');

const { sampleSelectOptions } = require('./combobox-select-sample-data');

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

// Page screenshot clipping/cropping dimensions
const clipOptions = { x: 0, y: 0, width: 250, height: 400 };

test.describe('Components/Combobox select', () => {});
