import { test, expect } from "@playwright/test";
test.describe("Visitor - Personnel page", () => {
  test("PERSONNEL-003 | เลือกหมวดบุคลากรแล้วแสดงผลถูกต้อง", async ({
    page,
  }) => {
    await page.goto("https://cpsu-website-beta.vercel.app/home");
    // ไปหน้า "บุคลากร"
    await page
      .locator("#navbar-component")
      .getByRole("link", { name: "บุคลากร" })
      .click();
    await expect(page).toHaveURL(/\/personnel$/);
    // เลือกหมวด
    const category = page.getByRole("button", { name: "สายสนับสนุนวิชาการ" });
    await expect(category).toBeVisible();
    await category.click();
    // เช็ค highlight
    await expect(category).toHaveClass(/active|selected/);
    // เช็คว่ามีบุคลากรแสดง (ใช้ชื่อบุคลากรแทน)
    const personnelItems = page.getByRole("heading", { level: 5 });
    await expect(personnelItems.first()).toBeVisible();
  });
});
