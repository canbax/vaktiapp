import { expect, chromium } from '@playwright/test';
import {
  expectVisiblePrayingTimesBanner,
  readTextFromClipboard,
  selectLocation,
  test,
} from './test-utils';

test('should share a valid URL to praying times', async ({ page }) => {
  await selectLocation(page);
  await expect(page.getByTestId('remaining-time')).toBeVisible();

  await page.getByTestId('share-btn').click();
  await page.getByTestId('copy-link-btn').click();

  const clipboardText = await readTextFromClipboard(page);
  const browser = await chromium.launch();
  // Create a new incognito browser context
  const context = await browser.newContext();
  // Create a new page inside context.
  const page2 = await context.newPage();
  await page2.goto(clipboardText);

  await expectVisiblePrayingTimesBanner(page2);
});

const skipTest = process.env.CI === 'true';

test('should be able to pop up share in app', async ({ page }) => {
  // eslint-disable-next-line playwright/no-skipped-test
  test.skip(skipTest, 'Cannot show share in apps because run in CI mode');
  await selectLocation(page);
  await expect(page.getByTestId('remaining-time')).toBeVisible();

  await page.getByTestId('share-btn').click();
  await page.getByTestId('share-in-app-btn').click();
});

test('should be able to embed times widget', async ({ page }) => {
  await selectLocation(page);
  await expect(page.getByTestId('remaining-time')).toBeVisible();

  await page.getByTestId('share-btn').click();
  await page.getByTestId('embed-btn').click();

  await expect(page.getByRole('alert').getByText('Embed to your website')).toBeVisible();

  await expect(page.locator('iframe')).toBeVisible();
  await page.getByRole('button', { name: 'Parameters' }).click();
  await page.getByText('Is show hijri date?').click();
  await page.getByTestId('copy-iframe-code-btn').click();

  const clipboardText = await readTextFromClipboard(page);
  expect(clipboardText).toContain('iframe');
  expect(clipboardText).toContain('isShowHijri=0');
});
