import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/adminSide/loginPage";
import { SubjectPage } from "../../pages/adminSide/subjectPage";

test.describe("Testing Manage Admin. (by ปฏิพล ดำทอง)", () => {
  let loginPage: LoginPage;
  let subjectPage: SubjectPage;

  test.beforeEach(async ({ page, request }) => {
    loginPage = new LoginPage(page);
    subjectPage = new SubjectPage(page, request);
    await loginPage.goto();
  });

  test('ManageAdmin-001|[การกำหนดสิทธิ์ผู้ใช้ส่วนแอดมิน][สำเร็จ] ตรวจสอบว่าหน้า "กำหนดสิทธิ์ผู้ใช้" เเสดงผลได้อย่างถูกต้อง', async ({
    page,
  }) => {
    await loginPage.login("admin@gmail.com", "password");
    await subjectPage.selectMenuTab("กำหนดสิทธิ์ผู้ใช้");
    await expect(page.getByRole("heading", { name: "กำหนดสิทธิ์ผู้ใช้" }),).toBeVisible();
  });
  test('ManageAdmin-002|[การกำหนดสิทธิ์ผู้ใช้ส่วนแอดมิน][สำเร็จ] ตรวจสอบว่าเมื่อกด "+เพิ่มผู้ใช้" จะเเสดงหน้าสร้างการกำหนดสิทธิ์ผู้ใช้ได้อย่างถูกต้อง', async ({page,}) => {
    await loginPage.login("admin@gmail.com", "password");
    await subjectPage.selectMenuTab("กำหนดสิทธิ์ผู้ใช้");
    await page.getByRole('button', { name: '+ เพิ่มผู้ใช้' }).click();
    await expect(page.getByRole("heading", { name: "เพิ่มผู้ใช้ใหม่" })).toBeVisible();
    //Requried field
    //Username
    await expect(page.locator('.modal-body input').first()).toBeVisible();
    //Email
    await expect(page.locator('.modal-body input').nth(1)).toBeVisible();

    //ปุ่มบันทึก
    await expect(page.getByRole("button", { name: "บันทึก" }),).toBeVisible();
    //ปุ่มยกเลิก
    await expect(page.getByRole("button", { name: "ยกเลิก" }),).toBeVisible();
  });
});
