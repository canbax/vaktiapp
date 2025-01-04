import { expect } from '@playwright/test';
import { selectLocation, test } from './test-utils';

test('should show todays times with remaining times', async ({ page }) => {
  await selectLocation(page);

  await page.getByText('Religious Days').click();

  expect(await page.locator('tr').count()).toBeGreaterThan(10);
  expect(await page.locator('td').count()).toBeGreaterThan(20);
});
