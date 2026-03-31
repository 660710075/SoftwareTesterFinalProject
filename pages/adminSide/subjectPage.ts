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

    constructor(page: Page) {
        this.page = page;
        this.tabMuen = page.locator('.list-group');
        this.addSubjectBTN = page.getByRole('link', { name: '+ เพิ่มรายวิชาใหม่' });
        this.courseIdDropdown = page.locator('[name="course_id"]');
        this.semesterDropdown = page.locator('[name="semester"]');
        this.planTypeDropdown = page.locator('[name="plan_type"]');
        this.subjectIdField = page.locator('[name="subject_id"]');
        this.thaiSubjectNameField = page.locator('[name="thai_subject"]');
        this.engSubjectNameField = page.locator('[name="eng"]');
        this.creditsField = page.locator('[name="credits"]');
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
}