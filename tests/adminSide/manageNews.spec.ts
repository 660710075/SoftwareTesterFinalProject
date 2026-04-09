import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/adminSide/loginPage';
import { AdminNewsPage } from '../../pages/adminSide/adminNewsPage';

test.describe.serial('Testing News Management. (by นาขวัญ วิฑูรย์สถิตกุล)', () => {
    let loginPage: LoginPage;
    let adminNewsPage: AdminNewsPage;
    let testTitle: string;
    
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        adminNewsPage = new AdminNewsPage(page)
        
        await loginPage.goto();
        await loginPage.login("admin@gmail.com", "password");
        await expect(page).toHaveURL('https://cpsu-website-beta.vercel.app/admin/dashboard');
    });

    test('ManageNews-001|  [จัดการข่าวสาร][สำเร็จ] ตรวจสอบการเพิ่มข่าวสารสำเร็จ', async ({ page }) => {
        testTitle = `ทดสอบหัวข้อข่าวสาร-${Date.now()}`;

        await adminNewsPage.goto();
        await expect(page).toHaveURL('https://cpsu-website-beta.vercel.app/admin/news');

        await adminNewsPage.clickAddNews();
        await adminNewsPage.filltitleInput(testTitle)
        await adminNewsPage.contentInput.click(); 
        await adminNewsPage.fillcontentInput('ทดสอบเนื้อหาข่าวสาร')
        await adminNewsPage.selectCategory('4')

        //รูป
        await adminNewsPage.uploadCoverImage('testData/testNewsImg.JPG');
        await adminNewsPage.confirmImageCropBtn.click();
        await adminNewsPage.uploadImage('testData/testNewsImg.JPG');

        page.once('dialog', async dialog => {
            expect(dialog.message()).toContain('เผยแพร่ข่าวสารสำเร็จ'); 
            await dialog.accept(); 
        });

        await adminNewsPage.publishNews();

        await expect(page).toHaveURL('https://cpsu-website-beta.vercel.app/admin/news');
        await expect(page.getByText(testTitle)).toBeVisible();
        await page.waitForTimeout(3000);

    });

    test('ManageNews-002|  [จัดการข่าวสาร][สำเร็จ] ตรวจสอบการลบข่าวสารสำเร็จ', async ({ page }) => {
        await adminNewsPage.goto();
        await page.waitForLoadState('networkidle');

        await page.getByText(testTitle).first().click();

        await page.waitForLoadState('networkidle');

        page.once('dialog', async dialog => { 
            expect(dialog.message()).toContain('คุณแน่ใจหรือไม่ว่าต้องการลบข่าวนี้?'); 
            await dialog.accept();
        });

        await adminNewsPage.clickDeleteNews();

        await page.waitForTimeout(3000);

        await adminNewsPage.goto();
        await page.reload();

        await expect(page.getByText(testTitle).first()).not.toBeVisible();

    });
});