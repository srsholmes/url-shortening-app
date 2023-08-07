import { test, expect } from '@playwright/test';

test('Can add a new url', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Get number of lis in data-test-id='url-entry-wrapper'
  const initialUrlCount = await page.$$eval(
    '[data-test-id="url-entry-wrapper"] li',
    (els) => els.length,
  );

  const randomString = Math.random().toString(36).substring(7).toLowerCase();

  await page.fill(
    '[data-test-id="url-input"]',
    `https://www.${randomString}.com`,
  );
  await page.click('[data-test-id="submit-url"]');
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('[data-test-id="url-entry-wrapper"]');
  const newUrlCount = await page.$$eval(
    '[data-test-id="url-entry-wrapper"] li',
    (els) => els.length,
  );
  console.log('newUrlCount', newUrlCount);
  expect(newUrlCount).toBe(initialUrlCount + 1);
});
