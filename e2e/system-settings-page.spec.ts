/* eslint-disable playwright/expect-expect */
import type { Page } from '@playwright/test';
import { selectLocation, test } from './test-utils';

async function openSettings(page: Page) {
  await selectLocation(page);
  await page.getByText('Settings').click();
}
test('should change UI language', async ({ page }) => {
  await openSettings(page);
  await page.getByLabel('Select a language').click();
  await page.getByText('Türkçe').click();
  await page.getByLabel('Dil seçin').click();
  await page.getByRole('banner').getByText('Ayarlar').click();
});

test('should change UI theme', async ({ page }) => {
  await openSettings(page);

  await page.getByTestId('theme-select').click();
  await page.getByRole('option', { name: 'Dark' }).click();

  await page.waitForFunction(async () => {
    return document.body.style.color === 'rgba(0, 0, 0)';
  });

  await page.getByTestId('theme-select').click();
  await page.getByRole('option', { name: 'Light' }).click();
  await page.waitForFunction(async () => {
    return document.body.style.color === 'rgba(255, 255, 255)';
  });
});

async function waitForZoom(page: Page, value: string, isEqual: boolean) {
  await page.waitForFunction(
    ({ value, isEqual }) => {
      const zoom = window.getComputedStyle(document.getElementsByClassName('dynamic-zoom')[0])[
        'zoom'
      ];
      if (isEqual) return zoom === value;
      return zoom !== value;
    },
    { value, isEqual },
  );
}

test('should change UI zoom', async ({ page }) => {
  await openSettings(page);

  await page.getByTestId('zoom-in-btn').dblclick();
  await page.getByTestId('zoom-in-btn').click();
  await waitForZoom(page, '1', false);
  await waitForZoom(page, '1.3', true);

  await page.getByTestId('zoom-out-btn').dblclick();
  await waitForZoom(page, '1.3', false);
  await waitForZoom(page, '1.1', true);
});
