import { Page, expect } from "@playwright/test";
import {
  expectVisiblePrayingTimesBanner,
  selectLocation,
  test,
} from "./test-utils";

async function openSettings(page: Page) {
  await selectLocation(page);
  await page.getByText("Settings").click();
}

test("should change show hijri date", async ({ page }) => {
  await openSettings(page);
  await page.getByRole("tab", { name: "Date & Time" }).click();
  await page.getByLabel("Is show hijri date?").uncheck();

  await page.getByTestId("main-menu-btn").click();
  await page.getByText("Praying Times").click();
  await expectVisiblePrayingTimesBanner(page);
  await expect(page.getByTestId("date-str")).toBeVisible();
  await expect(page.getByTestId("hijri-date-str")).not.toBeVisible();
});

function intToStr(n: number) {
  if (!Number.isInteger(n)) throw new Error(`${n} is not an integer`);
  if (n < 0 || n > 99)
    throw new Error(`${n} is less than 0 or greater than 99`);
  if (n < 10) return "0" + n;
  return "" + n;
}

test("should change date format", async ({ page }) => {
  await openSettings(page);
  await page.getByRole("tab", { name: "Date & Time" }).click();
  await page.getByText("YYYY").click();
  await page.getByText("YY", { exact: true }).click();
  await page.getByTestId("main-menu-btn").click();
  await page.getByText("Praying Times").click();
  const dateStr = await page.getByTestId("date-str").textContent();
  const now = new Date();
  const year = (now.getFullYear() + "").substring(2, 4);
  expect(dateStr.includes(year)).toBeTruthy();

  await page.getByTestId("main-menu-btn").click();
  await page.getByText("Settings").click();
  await page.getByText("DDDD").click();
  await page.getByRole("option", { name: "-" }).click();
  await page.getByText("MMMM").click();
  await page.getByText("MM", { exact: true }).click();
  await page.getByTestId("main-menu-btn").click();
  await page.getByText("Praying Times").click();
  const dateStr2 = await page.getByTestId("date-str").textContent();
  const monthStr = intToStr(now.getMonth() + 1);
  const dayStr = intToStr(now.getDate());
  expect(dateStr2.includes(dayStr + " " + monthStr)).toBeTruthy();
});

test("should change time format", async ({ page }) => {
  await openSettings(page);
  await page.getByRole("tab", { name: "Date & Time" }).click();

  await page.getByText("XX:YY:ZZ").click();
  await page.getByText("X hour Y minute Z second").click();
  await page.getByTestId("main-menu-btn").click();
  await page.getByText("Praying Times").click();

  await expect(page.getByTestId("remaining-time")).toContainText("hour");
  await expect(page.getByTestId("remaining-time")).toContainText("minute");
  await expect(page.getByTestId("remaining-time")).toContainText("second");
});
