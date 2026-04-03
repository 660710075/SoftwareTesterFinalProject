import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/adminSide/loginPage';
import { SubjectPage } from '../../pages/adminSide/subjectPage';

test.describe('Testing Manage University Announce. (by ปฏิพล ดำทอง)', () => {
    let loginPage: LoginPage;
    let subjectPage: SubjectPage;

    test.beforeEach(async ({ page, request }) => {
        loginPage = new LoginPage(page);
        subjectPage = new SubjectPage(page, request);
        await loginPage.goto();
    });

    test('MU-002|[การจัดการรับสมัครส่วนผู้ดูแล][สำเร็จ] ตรวจสอบว่าหน้า "จัดการประกาศการรับสมัคร" เเสดงผลได้ถูกต้อง ในขณะที่มีข้อมูลอยู่ข้างใน', async ({ page }) => {
        await loginPage.login("admin@gmail.com", "password");
        await subjectPage.selectMenuTab("การรับสมัคร");
        await expect(page.getByRole('heading', { name: 'การรับสมัคร' })).toBeVisible();
    });
    //test
});