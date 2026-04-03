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

  test('AP-001|[หน้าการจัดการข้อมูลส่วนตัวของอาจารย์][สำเร็จ] ตรวจสอบว่าหน้า "ข้อมูลส่วนตัว" เเสดงผลได้ถูกต้อง ', async ({
    page,
  }) => {
    await loginPage.login("waijanya_s@su.ac.th", "password");
    await expect(page.getByRole("heading", { name: "ข้อมูลอาจารย์ของฉัน" }),).toBeVisible();});
});
