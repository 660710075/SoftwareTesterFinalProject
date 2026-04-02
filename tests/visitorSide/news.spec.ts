import { test, expect } from "@playwright/test";
test.describe("News page tests", () => {
  test("NEWS-005 | เปลี่ยนหมวดข่าวแล้วแสดงผลถูกต้อง", async ({ page }) => {
    await page.goto("https://cpsu-website-beta.vercel.app/home");
    // ไปหน้า "ข่าวสาร"
    await page
      .locator("#navbar-component")
      .getByRole("link", { name: "ข่าวสาร" })
      .click();
    await expect(page).toHaveURL(/\/news$/);
    // เลือกหมวด "ข่าวประชาสัมพันธ์"
    const category = page.getByRole("button", { name: "ข่าวประชาสัมพันธ์" });
    await expect(category).toBeVisible();
    // เก็บข่าวก่อนเปลี่ยน (optional)
    const newsItems = page.locator('a[href^="/news/"]');
    const firstBefore = await newsItems.first().textContent();
    // click เปลี่ยนหมวด
    await category.click();
    // เช็ค highlight
    await expect(category).toHaveClass(/active|selected|btn/);
    // เช็คว่ามีข่าว
    await expect(newsItems.first()).toBeVisible();
    // เช็คว่าข่าวเปลี่ยน (optional แต่ดี)
    const firstAfter = await newsItems.first().textContent();
    expect(firstBefore).not.toBe(firstAfter);
  });
});
