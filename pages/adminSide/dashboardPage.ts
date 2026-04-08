import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly newsCardLink: Locator; 
    readonly personnelCardLink: Locator;
    readonly subjectCardLink: Locator;


    constructor(page: Page) {
        this.page = page;
        this.newsCardLink = page.locator('a[href="/admin/news"]:has(.card)');
        this.personnelCardLink = page.locator('a[href="/admin/personnel"]:has(.card)')
        this.subjectCardLink = page.locator('a[href="/admin/subject"]:has(.card)')
    }
    async clickNewsCard() {
        await this.newsCardLink.click();
    }
    async clickPersonnelCard() {
        await this.personnelCardLink.click();
    }
    async clickSubjectCard() {
        await this.subjectCardLink.click();
    }
}