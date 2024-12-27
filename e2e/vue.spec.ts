import { test, expect } from "@playwright/test";

// https://playwright.dev/docs/intro
test("should open location selector initially", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Add New Location")).toBeInViewport();
  await expect(page.getByLabel("Close")).not.toBeVisible();
});

test("should search and find results with Turkish and Chinese characters", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByText("Add New Location")).toBeInViewport();

  await page.getByPlaceholder("Type to search location").click();

  await page.getByPlaceholder("Type to search location").fill("Keçi");
  await expect(page.getByText("Keçiborlu, Isparta")).toBeInViewport();

  await page.getByPlaceholder("Type to search location").fill("黄河西");
  await expect(page.getByText("黄河西路街道, Inner Mongolia")).toBeInViewport();

  await page.pause();
});
