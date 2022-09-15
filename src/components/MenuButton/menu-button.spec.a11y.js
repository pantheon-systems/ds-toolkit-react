const { test, expect } = require('@playwright/test');
const { gotoFrame } = require('../../../src/libs/testing/vrt');
const { a11yTest } = require('../../../src/libs/testing/a11y');

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

test.describe('Components/Menu Button', () => {});
