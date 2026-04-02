import { test, expect } from "@playwright/test";
test.describe("Visitor - Course page", () => {
  test("COURSE-002 | คลิกหลักสูตรแล้วไปหน้ารายละเอียด", async ({ page }) => {
    await page.goto("https://cpsu-website-beta.vercel.app/home");
    // ไปหน้า course
    await page
      .locator("#navbar-component")
      .getByRole("link", { name: "หลักสูตร" })
      .click();
    await expect(page).toHaveURL(/\/course$/);
    // เลือกหลักสูตรแรก
    const firstCourse = page.locator('a[href^="/course/"]').first();
    await expect(firstCourse).toBeVisible();
    await firstCourse.click();
    // ตรวจผลลัพธ์
    await expect(page).toHaveURL(/\/course\/.+/);
    await expect(page.getByText(/ข้อมูลหลักสูตร/)).toBeVisible();
  });
});
