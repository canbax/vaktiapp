import { expect } from "@playwright/test";
import { selectLocation, test, readTextFromClipboard } from "./test-utils";

test("should redirect to github sponsors", async ({ page }) => {
  await selectLocation(page);
  await page.getByText("About").click();

  const page1Promise = page.waitForEvent("popup");
  await page.getByRole("button", { name: "GitHub" }).click();
  const page1 = await page1Promise;
  await page1.waitForLoadState();
  page1.waitForURL("https://github.com/sponsors/canbax");
});

test("should be able to copy banking details", async ({ page }) => {
  await selectLocation(page);
  await page.getByText("About").click();

  await page.getByTestId("copy-name-btn").click();
  const name = await readTextFromClipboard(page);
  expect(name).toEqual("Yusuf Sait Canbaz");

  await page.getByTestId("copy-iban-btn").click();
  const iban = await readTextFromClipboard(page);
  expect(iban).toContain("TR49");
});
