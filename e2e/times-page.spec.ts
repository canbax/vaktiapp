import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { expectVisiblePrayingTimesBanner, selectLocation, test } from './test-utils';

async function getVisibleDate(page: Page): Promise<Date> {
  const text = await page.getByTestId('date-str').textContent();
  const arr = text.split(' ');
  arr.pop();
  return new Date(arr.join(' '));
}

function isNextDay(page: Page, date1: Date, date2: Date): boolean {
  const temp = new Date(date1);
  temp.setDate(temp.getDate() + 1);
  return date2.getDate() === temp.getDate();
}

test('should show todays times with remaining times', async ({ page }) => {
  await selectLocation(page);

  await page.getByRole('navigation').getByText('Praying Times').click(); // close navigation menu
  await expectVisiblePrayingTimesBanner(page);

  await expect(page.getByTestId('remaining-time')).toBeVisible();
  await expect(page.getByTestId('prev-btn')).toBeVisible();
  await expect(page.getByTestId('next-btn')).toBeVisible();
  await expect(page.getByTestId('today-btn')).toBeHidden();
  await expect(page.getByTestId('time-row')).toHaveCount(6);
});

test('should go to other days and come back to today with preserved UI state after page refresh', async ({
  page,
}) => {
  await selectLocation(page);
  await page.getByText('Settings').click();
  await page.getByText('Remember selected day').click();

  await page.getByTestId('main-menu-btn').click();
  await page.getByText('Praying Times').click();

  const today = await getVisibleDate(page);
  await page.getByTestId('next-btn').click();
  const next1day = await getVisibleDate(page);
  expect(isNextDay(page, today, next1day)).toBe(true);
  await expect(page.getByTestId('today-btn')).toBeVisible();
  await page.getByTestId('next-btn').click();
  const next2day = await getVisibleDate(page);
  await expect(page.getByTestId('today-btn')).toBeVisible();
  expect(isNextDay(page, next1day, next2day)).toBe(true);
  await page.reload();

  await expect(page.getByRole('navigation').getByText('Praying Times')).toBeVisible(); // assert menu stays open
  await expect(page.getByTestId('today-btn')).toBeVisible();
  await page.getByTestId('prev-btn').click();
  const next2prev1day = await getVisibleDate(page);
  expect(isNextDay(page, today, next2prev1day)).toBe(true);
  await page.getByTestId('today-btn').click();
  const today2 = await getVisibleDate(page);
  expect(isNextDay(page, today2, next1day)).toBe(true);
});

test('should be able to change location', async ({ page }) => {
  await selectLocation(page);
  await expect(page.getByTestId('remaining-time')).toBeVisible();
  await page.getByRole('button', { name: 'Keçiören' }).click();
  await selectLocation(page, false, 'İstanbul', 'İstanbul, İstanbul');
  await page.getByTestId('close-btn').click();
  await page.getByRole('button', { name: 'İstanbul' }).click();
});

test('should always open today by default', async ({ page }) => {
  await selectLocation(page);

  const today = await getVisibleDate(page);
  await page.getByTestId('next-btn').click();
  const next1day = await getVisibleDate(page);
  expect(isNextDay(page, today, next1day)).toBe(true);
  await expect(page.getByTestId('today-btn')).toBeVisible();
  await page.getByTestId('next-btn').click();
  const next2day = await getVisibleDate(page);
  await expect(page.getByTestId('today-btn')).toBeVisible();
  expect(isNextDay(page, next1day, next2day)).toBe(true);
  await page.reload();
  await expect(page.getByTestId('today-btn')).toBeHidden();
});
