import { test, expect } from "@playwright/test";
import { CoursePage } from "../../pages/visitorSide/coursePage";
test.describe("Visitor - Course page (by ชญานิศา ขุมเพ็ชร)", () => {
  test("COURSE-002 | คลิกหลักสูตรแล้วไปหน้ารายละเอียด", async ({ page }) => {
    const course = new CoursePage(page);
    // เข้าเว็บไซต์หน้า Home
    await page.goto("/home");
    // ไปหน้า "หลักสูตร"
    await course.goToCourse();
    // ตรวจสอบว่าอยู่หน้าหลักสูตร
    await expect(page).toHaveURL(/\/course$/);
    // เลือกหลักสูตรแรกในรายการ
    const firstCourse = course.getFirstCourse();
    await expect(firstCourse).toBeVisible();
    await firstCourse.click();
    // ตรวจสอบว่าไปหน้ารายละเอียดหลักสูตร
    await expect(page).toHaveURL(/\/course\/.+/);
    await expect(course.getCourseDetailText()).toBeVisible();
  });
});
