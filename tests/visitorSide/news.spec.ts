import { test, expect } from "@playwright/test";
import { NewsPage } from "../../pages/visitorSide/newsPage";
test.describe("News page tests (by ชญานิศา ขุมเพ็ชร)", () => {
  test("NEWS-005 | เปลี่ยนหมวดข่าวแล้วแสดงผลถูกต้อง", async ({ page }) => {
    const news = new NewsPage(page);
    // เข้าเว็บไซต์และไปหน้า "ข่าวสาร"
    await news.goto();
    await news.goToNews();
    // ตรวจสอบว่าอยู่หน้าข่าว
    await expect(page).toHaveURL(/\/news$/);
    // เลือกหมวด "ข่าวประชาสัมพันธ์"
    const category = news.getCategoryButton("ข่าวประชาสัมพันธ์");
    await expect(category).toBeVisible();
    // เก็บข้อมูลข่าวก่อนเปลี่ยนหมวด (เพื่อใช้เปรียบเทียบ)
    const newsItems = news.getNewsItems();
    const firstBefore = await newsItems.first().textContent();
    // คลิกเปลี่ยนหมวดข่าว
    await category.click();
    // ตรวจสอบว่าหมวดที่เลือกมีการ highlight
    await expect(category).toHaveClass(/active|selected|btn/);
    // ตรวจสอบว่ามีรายการข่าวแสดง
    await expect(newsItems.first()).toBeVisible();
    // ตรวจสอบว่าข่าวมีการเปลี่ยนหลังเลือกหมวด (optional)
    const firstAfter = await newsItems.first().textContent();
    expect(firstBefore).not.toBe(firstAfter);
  });
});
