import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/adminSide/loginPage';
import { DashboardPage } from '../../pages/adminSide/dashboardPage';

test.describe('Testing the Dashboard and Card Links. (by นาขวัญ วิฑูรย์สถิตกุล)', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page)
        
        await loginPage.goto();
        await loginPage.login("admin@gmail.com", "password");
    });

    test('DB-001| [แดชบอร์ด][สำเร็จ] ตรวจสอบลิงก์ของการ์ด "ข่าวสาร" นำทางได้อย่างถูกต้อง', async ({ page }) => {
        await dashboardPage.clickNewsCard();
        await expect(page).toHaveURL('https://cpsu-website-beta.vercel.app/admin/news');

    });

    test('DB-002| [แดชบอร์ด][สำเร็จ] ตรวจสอบลิงก์ของการ์ด "บุคลากร" นำทางได้อย่างถูกต้อง', async ({ page }) => {
        await dashboardPage.clickPersonnelCard();
        await expect(page).toHaveURL('https://cpsu-website-beta.vercel.app/admin/personnel');

    });

    test('DB-003| [แดชบอร์ด][สำเร็จ] ตรวจสอบลิงก์ของการ์ด "รายวิชา" นำทางได้อย่างถูกต้อง', async ({ page }) => {
        await dashboardPage.clickSubjectCard();
        await expect(page).toHaveURL('https://cpsu-website-beta.vercel.app/admin/subject');

    });
});