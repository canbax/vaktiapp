import { expect, Page } from '@playwright/test';
import { expectVisiblePrayingTimesBanner, test } from './test-utils';

// https://playwright.dev/docs/intro
test('should open location selector initially', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Add New Location')).toBeInViewport();
  await expect(page.getByLabel('Close')).toBeHidden();
});

test('should search and find results with Turkish and Chinese characters', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Add New Location')).toBeInViewport();

  await page.getByTestId('search-place').locator('input').click();

  await page.getByTestId('search-place').locator('input').fill('Keçi');
  await expect(page.getByText('Keçiborlu, Isparta')).toBeInViewport();

  await page.getByTestId('search-place').locator('input').fill('黄河西');
  await expect(page.getByText('黄河西路街道, Inner Mongolia')).toBeInViewport();
  await page.getByText('黄河西路街道, Inner Mongolia').click();
  await expectVisiblePrayingTimesBanner(page);
  await page.getByRole('button', { name: '黄河西路街道' }).click();
  await page.getByLabel('Close').click();
  await expectVisiblePrayingTimesBanner(page);
  await assertSelectedPlacesCached(page, '黄河西路街道, Inner Mongolia');
});

test('should find places and select from GPS location', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Add New Location')).toBeInViewport();

  await page.getByRole('combobox').locator('button').click();

  await expect(page.getByText('Pursaklar, Ankara')).toBeInViewport();
  await expect(page.getByText('Mamak, Ankara')).toBeInViewport();

  await page.getByText('Keçiören, Ankara').click();
  await expectVisiblePrayingTimesBanner(page);
  await page.getByRole('button', { name: 'Keçiören' }).click();
  await expect(page.getByLabel('Close')).toBeVisible();
  await page.getByLabel('Close').click();
  await expectVisiblePrayingTimesBanner(page);
  await assertSelectedPlacesCached(page, 'Keçiören, Ankara');
});

async function assertSelectedPlacesCached(page: Page, clickedResult: string) {
  await page.getByRole('button', { name: clickedResult.split(',')[0] }).click();
  await page.getByRole('combobox').click();
  await expect(page.getByText(clickedResult)).toBeVisible();
}
