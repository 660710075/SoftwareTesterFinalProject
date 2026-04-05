import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/adminSide/loginPage";
import { SubjectPage } from "../../pages/adminSide/subjectPage";

test.describe("Testing Access History. (by ปฏิพล ดำทอง)", () => {
  let loginPage: LoginPage;
  let subjectPage: SubjectPage;

  test.beforeEach(async ({ page, request }) => {
    loginPage = new LoginPage(page);
    subjectPage = new SubjectPage(page, request);
    await loginPage.goto();
  });

  test('AccessHistory-001|[การกำหนดสิทธิ์ผู้ใช้ส่วนแอดมิน][สำเร็จ] ตรวจสอบว่าหน้า "ประวัติการเข้าใช้งาน" เเสดงผลได้อย่างถูกต้อง', async ({
    page,
  }) => {
    await loginPage.login("admin@gmail.com", "password");
    await subjectPage.selectMenuTab("ประวัติการเข้าใช้งาน");
    await expect(page.getByRole("heading", { name: "ประวัติการเข้าใช้งานระบบ" }),).toBeVisible();});
});
