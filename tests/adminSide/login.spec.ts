import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/adminSide/loginPage';

test.describe('Testing the login system. (by นาขวัญ วิฑูรย์สถิตกุล)', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('Login-001| [เข้าสู่ระบบ][สำเร็จ] ตรวจสอบ การเข้าสู่ระบบสำเร็จด้วยสิทธิ์แอดมิน', async ({ page }) => {
        await loginPage.login("admin@gmail.com", "password");
        await expect(page).toHaveURL('https://cpsu-website-beta.vercel.app/admin/dashboard');
    });


    test('Login-002| [เข้าสู่ระบบ][ไม่สำเร็จ] ตรวจสอบ การเข้าสู่ระบบไม่สำเร็จเมื่อกรอกรหัสผ่านไม่ถูกต้อง', async ({ page }) => {
    
        page.once('dialog', async dialog => {
            expect(dialog.message()).toContain('อีเมลหรือรหัสผ่านไม่ถูกต้อง'); 
            await dialog.accept(); 
        });

        await loginPage.login("admin@gmail.com", "wrong_password");
        await expect(page).toHaveURL('https://cpsu-website-beta.vercel.app/login');
    
    });
});