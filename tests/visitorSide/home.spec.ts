import { test, expect } from "@playwright/test";
test.describe("Visitor - Home page", () => {
  test("HOME-002 | click news in PR section", async ({ page }) => {
    await page.goto("https://cpsu-website-beta.vercel.app/home");
    // หา section ข่าวประชาสัมพันธ์แบบตรง ๆ
    const newsSection = page
      .locator("div")
      .filter({
        hasText: "ข่าวประชาสัมพันธ์",
      })
      .first();
    await expect(newsSection).toBeVisible();
    // click "อ่านต่อ" ตัวแรกใน section นี้
    await newsSection.getByRole("link", { name: "อ่านต่อ" }).first().click();
    await expect(page).toHaveURL(/\/news\/.+/);
    await expect(page.getByRole("img", { name: "news" })).toBeVisible();
  });
  test("HOME-003 | click ดูทั้งหมด แล้วไปหน้าหลักสูตร", async ({ page }) => {
    await page.goto("https://cpsu-website-beta.vercel.app/home");
    // หา section หลักสูตร
    const courseSection = page
      .locator("div")
      .filter({
        hasText: "หลักสูตรที่เปิดสอน",
      })
      .first();
    await expect(courseSection).toBeVisible();
    // คลิก "ดูทั้งหมด" ใน section นี้
    await courseSection
      .getByRole("button", { name: "ดูทั้งหมด" })
      .first()
      .click();
    // ตรวจว่าไปหน้า course
    await expect(page).toHaveURL(/\/course$/);
  });
});
