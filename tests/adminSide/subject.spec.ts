import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/adminSide/loginPage';
import { SubjectPage } from '../../pages/adminSide/subjectPage';

test.describe('Testing the course adding system. (by ชลธี เกิดก่อวงศ์)', () => {
    let loginPage: LoginPage;
    let subjectPage: SubjectPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        subjectPage = new SubjectPage(page);
        await loginPage.goto();
    });

    test('AddSubject-001| [เพิ่มรายวิชา][สำเร็จ] ตรวจสอบว่า หน้า "รายวิชา" เเสดงผลได้ถูกต้อง', async ({ page }) => {
        await loginPage.login("admin@gmail.com", "password");
        await subjectPage.selectMunuTab("รายวิชา");
        await expect(page.getByRole('heading', { name: 'รายวิชาทั้งหมด' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'ค้นหารหัสวิชา หรือ ชื่อวิชา...' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'ค้นหารหัสวิชา หรือ ชื่อวิชา...' })).toBeEmpty();
        await expect(page.getByRole('heading', { name: /หลักสูตร/ }).first()).toBeVisible();
    });

    test('AddSubject-002| [เพิ่มรายวิชา][สำเร็จ] ตรวจสอบว่า เมื่อผู้ใช้คลิ๊ก "+เพิ่มรายวิชาใหม่" เเล้วระบบเเสดงผลได้ถูกต้อง', async ({ page }) => {
        await loginPage.login("admin@gmail.com", "password");
        await subjectPage.selectMunuTab("รายวิชา");
        await subjectPage.clickAddSubjectButton();
        await expect(page.getByRole('heading', { name: 'เพิ่มรายวิชาใหม่' })).toBeVisible();

        //Requried field
        //หลักสูตร (Course)
        await expect(page.getByText('หลักสูตร (Course) *')).toBeVisible();
        const CourseIDfield = await page.locator('[name="course_id"]');
        await expect(await CourseIDfield.evaluate(el => el.tagName)).toBe('SELECT');
        await expect(CourseIDfield).toContainText('-- เลือกหลักสูตร --');
        //รหัสรายวิชา
        await expect(page.getByText('รหัสรายวิชา *')).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'เช่น XXXXXX , SUXXX' })).toBeVisible();
        await expect(page.getByPlaceholder('เช่น XXXXXX , SUXXX')).toBeEmpty();
        //ชื่อรายวิชา
        await expect(page.getByText('ชื่อรายวิชา (ภาษาไทย) *')).toBeVisible();
        await expect(page.locator('[name="thai_subject"]')).toBeVisible();
        await expect(page.locator('[name="thai_subject"]')).toBeEmpty();
        //หน่วยกิต
        await expect(page.getByText('หน่วยกิต *')).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'เช่น X , X(X-X-X)' })).toBeVisible();
        await expect(page.getByPlaceholder('เช่น X , X(X-X-X)')).toBeEmpty();
        //ชั้นปีเเละภาคการศึกษา
        await expect(page.getByText('ชั้นปีและภาคการศึกษา *')).toBeVisible();
        const semester = await page.locator('[name="semester"]');
        await expect(await semester.evaluate(el => el.tagName)).toBe('SELECT');
        await expect(semester).toContainText('-- เลือกภาคการศึกษา --');
        //ชั้นปีเเละภาคการศึกษา
        await expect(page.getByText('ชั้นปีและภาคการศึกษา *')).toBeVisible();
        const planType = await page.locator('[name="plan_type"]');
        await expect(await planType.evaluate(el => el.tagName)).toBe('SELECT');
        await expect(planType).toContainText('-- เลือกแผนการศึกษา --');

        //Non-Requried field
        //ชื่อรายวิชา (ภาษาอังกฤษ)
        await expect(page.getByText('ชื่อรายวิชา (ภาษาอังกฤษ)')).toBeVisible();
        await expect(page.locator('[name="eng_subject"]')).toBeVisible();
        await expect(page.locator('[name="eng_subject"]')).toBeEmpty();
        //วิชาบังคับ
        await expect(page.getByText('หน่วยกิต')).toBeVisible();
        await expect(page.locator('[name="compulsory_subject"]')).toBeVisible();
        await expect(page.locator('[name="compulsory_subject"]')).toBeEmpty();
        //เงื่อนไข
        await expect(page.getByText('เงื่อนไข')).toBeVisible();
        await expect(page.locator('[name="condition"]')).toBeVisible();
        await expect(page.locator('[name="condition"]')).toBeEmpty();
        //คำอธิบายรายวิชา (TH) 
        await expect(page.getByText('คำอธิบายรายวิชา (TH)')).toBeVisible();
        await expect(page.locator('[name="description_thai"]')).toBeVisible();
        await expect(page.locator('[name="description_thai"]')).toBeEmpty();
        //Course Description (EN)
        await expect(page.getByText('Course Description (EN)')).toBeVisible();
        await expect(page.locator('[name="description_eng"]')).toBeVisible();
        await expect(page.locator('[name="description_eng"]')).toBeEmpty();
        //CLOs
        await expect(page.getByText('CLOs')).toBeVisible();
        await expect(page.locator('[name=clo]')).toBeVisible();
        await expect(page.locator('[name=clo]')).toBeEmpty();

        await expect(page.getByRole('button', { name: 'บันทึกรายวิชา' })).toBeVisible();
    });

    test('AddSubject-003| [เพิ่มรายวิชา][สำเร็จ] ตรวจสอบว่า Dropdown field เเสดงผลได้ถูกต้อง', async ({page}) =>{
        await loginPage.login("admin@gmail.com", "password");
        await subjectPage.selectMunuTab("รายวิชา");
        await subjectPage.clickAddSubjectButton();

        await subjectPage.clickCourseIDfield();
        await expect(page.locator('select[name="course_id"] option')).toHaveCount(8);

        await subjectPage.clickSemesterfield();
        await expect(page.locator('select[name="semester"] option')).toHaveCount(9);

        await subjectPage.clickOPlanTypefield();
        await expect(page.locator('select[name="plan_type"] option')).toHaveCount(3);
    });
});