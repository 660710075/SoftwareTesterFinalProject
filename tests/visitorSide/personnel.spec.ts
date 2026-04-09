import { test, expect } from "@playwright/test";
import { PersonnelPage } from "../../pages/visitorSide/personnelPage";

test.describe("Visitor - Personnel page (by ชญานิศา ขุมเพ็ชร)", () => {
  test("PERSONNEL-003 | เลือกหมวดบุคลากรแล้วแสดงผลถูกต้อง", async ({
    page,
  }) => {
    const personnel = new PersonnelPage(page);
    // เข้าเว็บไซต์และไปหน้าบุคลากร
    await personnel.goto();
    await personnel.goToPersonnel();
    // ตรวจสอบว่าอยู่หน้าบุคลากร
    await expect(page).toHaveURL(/\/personnel$/);
    // เลือกหมวด "สายสนับสนุนวิชาการ"
    const category = personnel.getCategoryButton("สายสนับสนุนวิชาการ");

    await expect(category).toBeVisible();
    await category.click();
    // ตรวจสอบว่าหมวดที่เลือกมีการ highlight
    await expect(category).toHaveClass(/active|selected/);
    // ตรวจสอบว่ามีรายการบุคลากรแสดง
    const personnelItems = personnel.getPersonnelItems();
    await expect(personnelItems.first()).toBeVisible();
  });
});
