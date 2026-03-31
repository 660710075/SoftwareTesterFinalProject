import { Page, Locator, expect } from '@playwright/test';

export class SubjectPage {
    readonly page: Page;
    readonly tabMuen: Locator;
    readonly addSubjectBTN: Locator;
    readonly courseIdDropdown: Locator;
    readonly semester: Locator;
    readonly planType: Locator;

    constructor(page: Page) {
        this.page = page;
        this.tabMuen = page.locator('.list-group');
        this.addSubjectBTN = page.getByRole('link', { name: '+ เพิ่มรายวิชาใหม่' });
        this.courseIdDropdown = page.locator('[name="course_id"]');
        this.semester = page.locator('[name="semester"]');
        this.planType = page.locator('[name=plan_type]');
    }

    async selectMunuTab(tabname: string) {
        await this.tabMuen.filter({ hasText: tabname }).click();
    }

    async clickAddSubjectButton(){
        await this.addSubjectBTN.click();
    }

    async clickCourseIDfield(){
        await this.courseIdDropdown.click();
    }

    async clickSemesterfield(){
        await this.semester.click();
    }

    async clickOPlanTypefield(){
        await this.planType.click();
    }
}