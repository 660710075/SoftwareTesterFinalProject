import { Page, Locator, APIRequestContext, expect } from '@playwright/test';
import { LoginPage } from '../../pages/adminSide/loginPage';

export class SubjectPage {
    readonly loginPage: LoginPage;
    readonly page: Page;
    readonly request: APIRequestContext;
    readonly tabMuen: Locator;
    readonly addSubjectBTN: Locator;
    readonly courseIdDropdown: Locator;
    readonly semesterDropdown: Locator;
    readonly planTypeDropdown: Locator;
    readonly subjectIdField: Locator;
    readonly thaiSubjectNameField: Locator;
    readonly engSubjectNameField: Locator;
    readonly creditsField: Locator;
    readonly compulsorySubjectField: Locator;
    readonly conditionField: Locator;
    readonly descriptionThaiField: Locator;
    readonly descriptionEngField: Locator;
    readonly cloField: Locator;
    readonly submitBTN: Locator;
    readonly searchSubjectField: Locator;
    readonly deleteBTN: Locator;

    constructor(page: Page, request: APIRequestContext) {
        this.loginPage = new LoginPage(page);
        this.page = page;
        this.request = request;
        this.tabMuen = page.locator('.list-group');
        this.addSubjectBTN = page.getByRole('link', { name: '+ เพิ่มรายวิชาใหม่' });
        this.courseIdDropdown = page.locator('[name="course_id"]');
        this.semesterDropdown = page.locator('[name="semester"]');
        this.planTypeDropdown = page.locator('[name="plan_type"]');
        this.subjectIdField = page.locator('[name="subject_id"]');
        this.thaiSubjectNameField = page.locator('[name="thai_subject"]');
        this.engSubjectNameField = page.locator('[name="eng_subject"]');
        this.creditsField = page.locator('[name="credits"]');
        this.compulsorySubjectField = page.locator('[name="compulsory_subject"]');
        this.conditionField = page.locator('[name="condition"]');
        this.descriptionThaiField = page.locator('[name="description_thai"]');
        this.descriptionEngField = page.locator('[name="description_eng"]');
        this.cloField = page.locator('[name="clo"]');
        this.submitBTN = page.getByRole('button', { name: 'บันทึกรายวิชา' });
        this.searchSubjectField = page.getByRole('textbox', { name: 'ค้นหารหัสวิชา หรือ ชื่อวิชา...' });
        this.deleteBTN = page.getByRole('button', { name: 'ลบ' });
    }

    async selectMenuTab(tabname: string) {
        await this.tabMuen.filter({ hasText: tabname }).click();
    }

    async selectOptionForCourseIdField(id: number) {
        await this.courseIdDropdown.selectOption({ index: id });
    }

    async clickAddSubjectButton() {
        await this.addSubjectBTN.click();
    }

    async fillSubjectIdField(subjectID: string) {
        await this.subjectIdField.fill(subjectID);
    }

    async fillThaiSubjectNameField(subjectName: string) {
        await this.thaiSubjectNameField.fill(subjectName);
    }

    async fillEngSubjectNameField(subjectName: string) {
        await this.engSubjectNameField.fill(subjectName);
    }

    async fillCreditsFieldField(creadit: string) {
        await this.creditsField.fill(creadit);
    }

    async selectOptionForSemesterField(id: number) {
        await this.semesterDropdown.selectOption({ index: id });
    }

    async selectOptionForPlanTypeField(id: number) {
        await this.planTypeDropdown.selectOption({ index: id });
    }

    async fillCompulsorySubjectField(subject: string) {
        await this.compulsorySubjectField.fill(subject);
    }

    async fillConditionField(condition: string) {
        await this.conditionField.fill(condition);
    }

    async fillDescriptionThaiField(description: string) {
        await this.descriptionThaiField.fill(description);
    }

    async fillDescriptionENGField(description: string) {
        await this.descriptionEngField.fill(description);
    }

    async fillCLOsField(clos: string) {
        await this.cloField.fill(clos);
    }

    async clickSubmit() {
        await this.submitBTN.scrollIntoViewIfNeeded();
        await this.submitBTN.click({ force: true });
    }

    async searchForSubject(subject: string) {
        await this.searchSubjectField.fill(subject);
    }

    async clickSubjectIDLink(name: string) {
        await this.page.getByText(`${name}`, { exact: true }).first().click();
    }

    async clickSubjectSearchResult(name: string) {
        if (await this.page.getByRole('button', { name: `${name}` }).count() > 1){
            await this.page.getByRole('button', { name: `${name}` }).first().click();
        } else{
            await this.page.getByRole('button', { name: `${name}` }).click();
        }
    }

    async deleteSubject() {
        await this.deleteBTN.click();
    }

    async createNewSubject() {
        const response = await this.request.post(
            "https://victorious-alignment-production-352d.up.railway.app/api/v1/auth/login",
            {
                data: {
                    "email": "admin@gmail.com",
                    "password": "password"
                }
            }
        );
        var jsonData = await response.json();
 
        const token = jsonData.access_token;
        const res = await this.request.post(
            "https://victorious-alignment-production-352d.up.railway.app/api/v1/admin/subject",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    "subject_id": "TAuto",
                    "thai_subject": "ทดสอบวิธีออโตเมชั่น",
                    "eng_subject": "testautomation",
                    "credits": "3(3-6-9)",
                    "course_id": "BSIT65",
                    "semester": "ปีที่ 4 ภาคการศึกษาที่ 1",
                    "compulsory_subject": "CompulsorySubject",
                    "condition": "Conditions",
                    "description_thai": "คำอธิบายเพิ่มเติม",
                    "description_eng": "description",
                    "clo": "Clos",
                    "plan_type": "สหกิจศึกษา"
                }
            }
        );
        expect(res.status()).toBe(201);
    }
}