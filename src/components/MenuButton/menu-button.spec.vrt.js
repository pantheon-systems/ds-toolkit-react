const { test, expect } = require('@playwright/test');
const { gotoFrame } = require('../../libs/testing/vrt');

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

// Page screenshot clipping/cropping dimensions
const clipOptions = { x: 0, y: 0, width: 150, height: 75 };

test.describe('Components/Menu Button', () => {});
