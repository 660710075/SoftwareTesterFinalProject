import { Page, Locator, expect } from '@playwright/test';

export class SubjectPage {
    readonly page: Page;
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

    constructor(page: Page) {
        this.page = page;
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
    }

    async selectMunuTab(tabname: string) {
        await this.tabMuen.filter({ hasText: tabname }).click();
    }

    async selectOptionForCourseIdField(id: number){
        await this.courseIdDropdown.selectOption({ index: id });
    }

    async clickAddSubjectButton(){
        await this.addSubjectBTN.click();
    }

    async fillSubjectIdField(subjectID: string){
        await this.subjectIdField.fill(subjectID);
    }

    async fillThaiSubjectNameField(subjectName: string){
        await this.thaiSubjectNameField.fill(subjectName);
    }

    async fillEngSubjectNameField(subjectName: string){
        await this.engSubjectNameField.fill(subjectName);
    }   

    async fillCreditsFieldField(creadit: string){
        await this.creditsField.fill(creadit);
    }

    async selectOptionForSemesterField(id: number){
        await this.semesterDropdown.selectOption({ index: id });
    }

    async selectOptionForPlanTypeField(id: number){
        await this.planTypeDropdown.selectOption({ index: id });
    }

    async fillCompulsorySubjectField(subject: string){
        await this.compulsorySubjectField.fill(subject);
    }

    async fillConditionField(condition: string){
        await this.conditionField.fill(condition);
    }

    async fillDescriptionThaiField(description: string){
        await this.descriptionThaiField.fill(description);
    }

    async fillDescriptionENGField(description: string){
        await this.descriptionEngField.fill(description);
    }

    async fillCLOsField(clos: string){
        await this.cloField.fill(clos);
    }

    async clickSubmit(){
        await this.submitBTN.scrollIntoViewIfNeeded();
        await this.submitBTN.click({ force: true });
    }

    async searchForSubject(subject: string){
        await this.searchSubjectField.fill(subject);
    }
}