import { expect, request, test } from "@playwright/test";
import { LoginPage } from "../../pages/adminSide/loginPage";
import { CoursePage } from "../../pages/adminSide/coursePage";

test.describe("Testing Course Page. (by นครินทร์ ว่องไวพิพัฒน์)", () => {
  let loginPage: LoginPage;
  let coursePage: CoursePage;

  test.beforeEach(async ({ page, request }) => {
    loginPage = new LoginPage(page);
    coursePage = new CoursePage(page , request);
    await loginPage.goto();
    await loginPage.login("admin@gmail.com", "password");
    await page.getByRole('link', { name: ' หลักสูตร' }).first().click();
  });

  test('CourseA-001 | [หลักสูตร][Success]เพิ่มหลักสูตรโดยซ่อนไว้', async ({
    page,
  }) => {
    await page.getByRole('link', { name: '+ เพิ่มหลักสูตร' }).click();
    await coursePage.addTestCourse();
    await page.waitForTimeout(5000);
    await page.goto('/admin/course');
    await expect(page.getByText('test000เทสดูรายละเอียด')).toBeVisible();
  });

  test('CourseA-002 | [หลักสูตร][Success]ลบหลักสูตร', async ({
    page,
  }) => {
    const course = page.locator('.card').filter({ has: page.locator('.card-title', { hasText: /^test000$/ }) });
    await course.locator('#btn-detailcourse').click();

    page.once('dialog', async dialog => {
        await dialog.accept();         // Clicks "OK"
    });
    
    await page.getByRole('button', { name: 'ลบ' }).click();
    await page.waitForTimeout(5000);
    await page.goto('/admin/course');
    await expect(page.getByText('test000เทสดูรายละเอียด')).toBeHidden();
  });

  test('CourseA-003 | [หลักสูตร][Success]แก้ไขหลักสูตร', async ({
    page,
  }) => {
    page.once('dialog', async dialog => {
            expect(dialog.message()).toBe('แก้ไขสำเร็จ');
            await dialog.accept();
        });

    await coursePage.changeCourse();
    
  });

  test('CourseA-004 | [หลักสูตร][Success]ดูรายละเอียดหลักสูตร', async ({
    page,
  }) => {
    await coursePage.gotoDetail();
    await expect(page.getByRole('heading', { name: 'ข้อมูลหลักสูตร' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'แก้ไข' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'ลบ' })).toBeVisible();
  });

  test('CourseA-005 | [หลักสูตร][Success]เพิ่มหลักสูตรโดยแสดง', async ({
    page,
  }) => {
    await coursePage.addVisibleTestCourse();
    await page.waitForTimeout(5000);
    await page.goto('/course');
    await expect(page.getByRole('link', { name: 'เทส10 (2569) test10' })).toBeVisible();
  });

});