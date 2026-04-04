import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/visitorSide/homePage";
test.describe("Visitor - Home page (by Chayanisa)", () => {
  test('HOME-002| [หน้าหลัก][สำเร็จ] ตรวจสอบการคลิกข่าวในส่วนข่าวประชาสัมพันธ์', async ({ page }) => {
    const home = new HomePage(page);
    // เข้าเว็บไซต์หน้า Home
    await home.goto();
    // ตรวจสอบว่า section ข่าวประชาสัมพันธ์แสดง
    const newsSection = home.getNewsSection();
    await expect(newsSection).toBeVisible();
    // คลิก "อ่านต่อ" ข่าวแรก
    await home.getFirstReadMoreButton().click();
    // ตรวจสอบว่าไปหน้ารายละเอียดข่าว
    await expect(page).toHaveURL(/\/news\/.+/);
    await expect(page.getByRole("img", { name: "news" })).toBeVisible();
  });
  test('HOME-003| [หน้าหลัก][สำเร็จ] ตรวจสอบการคลิกหลักสูตร', async ({ page }) => {
    const home = new HomePage(page);
    // เข้าเว็บไซต์หน้า Home
    await home.goto();
    // ตรวจสอบว่า section หลักสูตรแสดง
    const courseSection = home.getCourseSection();
    await expect(courseSection).toBeVisible();
    // คลิก "ดูทั้งหมด" ใน section หลักสูตร
    await home.getViewAllCoursesButton().click();
    // ตรวจสอบว่าไปหน้าหลักสูตร
    await expect(page).toHaveURL(/\/course$/);
  });
});
