import { expect, test } from "@playwright/test";

test("homepage loads and download CTA exists", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("h1").first()).toContainText(/earning games/i, {
    timeout: 15_000,
  });
  await page.getByRole("link", { name: /browse games/i }).click();
  await expect(page).toHaveURL(/\/games/);
});

test("game detail has download section", async ({ page }) => {
  await page.goto("/games/p999-game-download-apk-pakistan", {
    waitUntil: "domcontentloaded",
  });
  await expect(page.locator("h1").first()).toContainText(/P999/i, {
    timeout: 15_000,
  });
  await page.getByRole("button", { name: /download apk/i }).click();
  await expect(page.locator("#download")).toBeVisible();
});
