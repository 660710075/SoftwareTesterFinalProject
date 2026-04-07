import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/adminSide/loginPage";
import { SubjectPage } from "../../pages/adminSide/subjectPage";

test.describe("Testing Manage University Announce. (by ปฏิพล ดำทอง)", () => {
  let loginPage: LoginPage;
  let subjectPage: SubjectPage;

  test.beforeEach(async ({ page, request }) => {
    loginPage = new LoginPage(page);
    subjectPage = new SubjectPage(page, request);
    await loginPage.goto();
  });

  test('ManageUniversityAnnounce-002|[การจัดการรับสมัครส่วนผู้ดูแล][สำเร็จ] ตรวจสอบว่าหน้า "จัดการประกาศการรับสมัคร" เเสดงผลได้ถูกต้อง ในขณะที่มีข้อมูลอยู่ข้างใน', async ({
    page,
  }) => {
    await loginPage.login("admin@gmail.com", "password");
    await subjectPage.selectMenuTab("การรับสมัคร");
    await expect(page.getByRole("heading", { name: "การรับสมัคร" })).toBeVisible();
  });

  test('ManageUniversityAnnounce-003|[การจัดการรับสมัครส่วนผู้ดูแล][สำเร็จ] ตรวจสอบว่าเมื่อกด "เพิ่มข้อมูล" จะเเสดงหน้าสร้างการรับสมัครได้อย่างถูกต้อง', async ({
    page,
  }) => {
    await loginPage.login("admin@gmail.com", "password");
    await subjectPage.selectMenuTab("การรับสมัคร");
    await page.getByRole("link", { name: "เพิ่มข้อมูล" }).click();
    await expect(page.getByRole('heading', { name: 'เพิ่มข้อมูลการรับสมัคร' })).toBeVisible();
    //Requried field
    //รอบการรับสมัคร
    await expect(page.getByText("รอบการรับสมัคร *")).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'เช่น รอบที่ 1' })).toBeVisible();
    await expect(page.getByPlaceholder('เช่น รอบที่ 1')).toBeEmpty();
    //รายละเอียดการรับสมัคร
    await expect(page.getByText("รายละเอียดการรับสมัคร *")).toBeVisible();
    await expect(page.getByRole('toolbar', { name: 'Editor toolbar' })).toBeVisible();
    await expect(page.locator('.ck-content')).toBeEmpty();
    //รูปภาพ
    await expect(page.getByText("รูปภาพ *")).toBeVisible();
    await expect(page.locator('input.form-control[type="file"]')).toBeVisible();
    
    //ปุ่มบันทึกข้อมูล
    await expect(page.getByRole("button", { name: "บันทึกข้อมูล" }),).toBeVisible();
    });
});
