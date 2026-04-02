import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/adminSide/loginPage';
import { SubjectPage } from '../../pages/adminSide/subjectPage';

test.describe('Testing the course adding system. (by ชลธี เกิดก่อวงศ์)', () => {
    let loginPage: LoginPage;
    let subjectPage: SubjectPage;

    test.beforeEach(async ({ page, request }) => {
        loginPage = new LoginPage(page);
        subjectPage = new SubjectPage(page, request);
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
        await expect(await subjectPage.courseIdDropdown.evaluate(el => el.tagName)).toBe('SELECT');
        await expect(subjectPage.courseIdDropdown).toContainText('-- เลือกหลักสูตร --');
        //รหัสรายวิชา
        await expect(page.getByText('รหัสรายวิชา *')).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'เช่น XXXXXX , SUXXX' })).toBeVisible();
        await expect(page.getByPlaceholder('เช่น XXXXXX , SUXXX')).toBeEmpty();
        //ชื่อรายวิชา
        await expect(page.getByText('ชื่อรายวิชา (ภาษาไทย) *')).toBeVisible();
        await expect(subjectPage.thaiSubjectNameField).toBeVisible();
        await expect(subjectPage.thaiSubjectNameField).toBeEmpty();
        //หน่วยกิต
        await expect(page.getByText('หน่วยกิต *')).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'เช่น X , X(X-X-X)' })).toBeVisible();
        await expect(page.getByPlaceholder('เช่น X , X(X-X-X)')).toBeEmpty();
        //ชั้นปีเเละภาคการศึกษา
        await expect(page.getByText('ชั้นปีและภาคการศึกษา *')).toBeVisible();
        await expect(await subjectPage.semesterDropdown.evaluate(el => el.tagName)).toBe('SELECT');
        await expect(subjectPage.semesterDropdown).toContainText('-- เลือกภาคการศึกษา --');
        //ชั้นปีเเละภาคการศึกษา
        await expect(page.getByText('ชั้นปีและภาคการศึกษา *')).toBeVisible();
        await expect(await subjectPage.planTypeDropdown.evaluate(el => el.tagName)).toBe('SELECT');
        await expect(subjectPage.planTypeDropdown).toContainText('-- เลือกแผนการศึกษา --');

        //Non-Requried field
        //ชื่อรายวิชา (ภาษาอังกฤษ)
        await expect(page.getByText('ชื่อรายวิชา (ภาษาอังกฤษ)')).toBeVisible();
        await expect(subjectPage.engSubjectNameField).toBeVisible();
        await expect(subjectPage.engSubjectNameField).toBeEmpty();
        //วิชาบังคับ
        await expect(page.getByText('หน่วยกิต')).toBeVisible();
        await expect(subjectPage.compulsorySubjectField).toBeVisible();
        await expect(subjectPage.compulsorySubjectField).toBeEmpty();
        //เงื่อนไข
        await expect(page.getByText('เงื่อนไข')).toBeVisible();
        await expect(subjectPage.conditionField).toBeVisible();
        await expect(subjectPage.conditionField).toBeEmpty();
        //คำอธิบายรายวิชา (TH) 
        await expect(page.getByText('คำอธิบายรายวิชา (TH)')).toBeVisible();
        await expect(subjectPage.descriptionThaiField).toBeVisible();
        await expect(subjectPage.descriptionThaiField).toBeEmpty();
        //Course Description (EN)
        await expect(page.getByText('Course Description (EN)')).toBeVisible();
        await expect(subjectPage.descriptionEngField).toBeVisible();
        await expect(subjectPage.descriptionEngField).toBeEmpty();
        //CLOs
        await expect(page.getByText('CLOs')).toBeVisible();
        await expect(subjectPage.cloField).toBeVisible();
        await expect(subjectPage.cloField).toBeEmpty();

        await expect(page.getByRole('button', { name: 'บันทึกรายวิชา' })).toBeVisible();
    });

    test('AddSubject-005| [เพิ่มรายวิชา][สำเร็จ] ตรวจสอบว่า เมื่อกดปุ่ม "บันทึกรายวิชา" เเล้วระบบเเสดงผลได้ถูกต้อง เมื่อผู้ใช้งานใส่ข้อมูลครบถ้วน', async ({ page }) => {
        let SubjectId = "Auto";
        let ThaiSubjectName = "ทดสอบวิธีออโตเมชั่น";
        let EngSubjectName = "testautomation";
        let Credits = "3(3-6-9)";
        let CompulsorySubject = "CompulsorySubject";
        let Condition = "Conditions";
        let DescriptionThai = "คำอธิบายเพิ่มเติม";
        let DescriptionENG = "description";
        let CLOs = "clos"
        await loginPage.login("admin@gmail.com", "password");
        await subjectPage.selectMunuTab("รายวิชา");
        await subjectPage.clickAddSubjectButton();
        await subjectPage.selectOptionForCourseIdField(3);
        await subjectPage.fillSubjectIdField(SubjectId);
        await subjectPage.fillThaiSubjectNameField(ThaiSubjectName);
        await subjectPage.fillEngSubjectNameField(EngSubjectName);
        await subjectPage.fillCreditsFieldField(Credits);
        await subjectPage.selectOptionForSemesterField(7);
        await subjectPage.selectOptionForPlanTypeField(2);
        await subjectPage.fillCompulsorySubjectField(CompulsorySubject);
        await subjectPage.fillConditionField(Condition);
        await subjectPage.fillDescriptionThaiField(DescriptionThai);
        await subjectPage.fillDescriptionENGField(DescriptionENG);
        await subjectPage.fillCLOsField(CLOs);
        await expect(subjectPage.submitBTN).toBeVisible();
        page.once('dialog', async dialog => {
            expect(dialog.message()).toBe('เพิ่มรายวิชาสำเร็จ');
            await dialog.accept();
        });

        await subjectPage.clickSubmit();

        await expect(subjectPage.searchSubjectField).toBeVisible();
        await subjectPage.searchForSubject(SubjectId);
        await expect(page.getByRole('button', { name: `${SubjectId} - ${ThaiSubjectName}` }).first()).toBeVisible();
    });

    test('AddSubject-008| [เพิ่มรายวิชา][สำเร็จ] ตรวจสอบว่า ระบบเเสดงผลรายละเอียดรายวิชาได้ถูกต้อง', async ({ page }) => {
        await loginPage.login("admin@gmail.com", "password");
        await subjectPage.selectMunuTab("รายวิชา");
        await subjectPage.clickSubjectIDLink('SU101');
        await expect(page.getByRole('heading', { name: 'SU101 ศิลปะศิลปากร' })).toBeVisible();
        await expect(page.getByText('หลักสูตร : (วท.บ) หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์')).toBeVisible();
        await expect(page.getByText('ภาคการศึกษา : ปีที่ 1')).toBeVisible();
        await expect(page.getByText('หน่วยกิต : 3(3-0-6)')).toBeVisible();
        await expect(page.getByText('วิชาบังคับ : -')).toBeVisible();
        await expect(page.getByText('เงื่อนไข : -')).toBeVisible();
    });

    test('AddSubject-015| [เพิ่มรายวิชา][สำเร็จ] ตรวจสอบว่า ระบบเเสดงผลได้ถูกต้อง เมื่อผู้ใช้ "ลบรายการ" สำเร็จ', async ({ page }) => {
        await loginPage.login("admin@gmail.com", "password");
        await subjectPage.selectMunuTab("รายวิชา");
        await subjectPage.searchForSubject('TAuto');

        let found = await page.getByRole('button', { name: 'TAuto - ทดสอบวิธีออโตเมชั่น' }).isVisible().catch(() => false);
        if (!found) {
            await subjectPage.createNewSubject();
            console.log("Create Successful!");

            await new Promise(resolve => setTimeout(resolve, 5000));

            const timeoutMs = 30000;
            const intervalMs = 2000;
            const start = Date.now();
            found = false;

            while (Date.now() - start < timeoutMs) {
                await subjectPage.searchForSubject('TAuto');
                found = await page.getByRole('button', { name: 'TAuto - ทดสอบวิธีออโตเมชั่น' }).first().isVisible().catch(() => false);

                if (found) break;

                await page.reload();
                await new Promise(resolve => setTimeout(resolve, intervalMs));
            }
            if (!found) {
                throw new Error('Timeout: ไม่เจอปุ่ม TAuto - ทดสอบวิธีออโตเมชั่น หลังวนหาและ reload 30 วินาที');
            }
        }

        await subjectPage.searchForSubject('TAuto');
        await subjectPage.clickSubjectSearchResult('TAuto - ทดสอบวิธีออโตเมชั่น');
        await expect(page.getByRole('heading', { name: 'TAuto ทดสอบวิธีออโตเมชั่น' })).toBeVisible();

        page.once('dialog', async dialog => {
            expect(dialog.message()).toBe('คุณต้องการลบรายวิชา TAuto ใช่หรือไม่?');
            await dialog.accept();
        });
        await subjectPage.deleteSubject();

        page.once('dialog', async dialog => {
            expect(dialog.message()).toBe('ลบรายวิชาสำเร็จ');
            await dialog.accept();
        });

        await page.waitForEvent('dialog');
        await expect(page.getByRole('heading', { name: 'รายวิชาทั้งหมด' })).toBeVisible();
        await subjectPage.searchForSubject('TAuto');
        const isStillFound = await page.getByRole('button', { name: 'TAuto - ทดสอบวิธีออโตเมชั่น' }).isVisible().catch(() => false);
        expect(isStillFound).toBe(false);
    });
});