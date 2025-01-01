import { expect, Page, test as baseTest } from "@playwright/test";

export async function expectVisiblePrayingTimesBanner(page: Page) {
  const banner = page.getByRole("banner").getByText("Praying Times");
  await expect(banner).toBeInViewport();
}

export async function readTextFromClipboard(page: Page) {
  return await page.evaluate(() => navigator.clipboard.readText());
}

export async function selectLocation(
  page: Page,
  isGoTo = true,
  search = "Keçiören",
  location = "Keçiören, Ankara"
) {
  if (isGoTo) await page.goto("/");
  if (isGoTo) await expect(page.getByText("Add New Location")).toBeInViewport();
  else await expect(page.getByText("Change location")).toBeInViewport();

  await page.getByTestId("search-place").locator("input").click();
  await page.getByTestId("search-place").locator("input").fill(search);
  await page.getByText(location).click();
}

export const test = baseTest.extend({
  page: async ({ page }, use) => {
    // Listen for console errors
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        throw new Error(`Console error detected: ${msg.text()}`);
      }
    });

    // Listen for uncaught exceptions
    page.on("pageerror", (error) => {
      throw new Error(`Uncaught error in page: ${error.message}`);
    });

    await use(page);
  },
});
