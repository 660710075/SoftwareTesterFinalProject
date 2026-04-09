import { Page, Locator, APIRequestContext, expect } from "@playwright/test";

export class CoursePage {
    readonly page: Page;
    readonly addCourse : Locator;
    readonly request: APIRequestContext;
    readonly detail : Locator;
    readonly status : Locator;
    readonly courseID : Locator;
    readonly level : Locator;
    readonly year : Locator;
    readonly major : Locator;
    readonly nameTH : Locator;
    readonly nameEN : Locator;
    readonly degreeTH : Locator;
    readonly degreeEN : Locator;
    readonly PLOs : Locator;
    readonly save : Locator;
    readonly change : Locator;

    constructor(page: Page , request: APIRequestContext ) {
        this.page = page;
        this.addCourse = page.getByRole('link', { name: '+ เพิ่มหลักสูตร' });
        this.request = request;
        this.detail = page.getByRole('link', { name: 'ดูรายละเอียด' });
        this.status = page.locator('select[name="status"]');
        this.courseID = page.locator('input[name="course_id"]');
        this.level = page.locator('select[name="degree"]');
        this.year = page.getByRole('spinbutton');
        this.major = page.locator('input[name="major"]');
        this.nameTH = page.locator('input[name="thai_course"]');
        this.nameEN = page.locator('input[name="eng_course"]');
        this.degreeTH = page.locator('input[name="thai_degree"]');
        this.degreeEN = page.locator('input[name="eng_degree"]');
        this.PLOs = page.locator('textarea[name="plo"]');
        this.save = page.getByRole('button', { name: 'บันทึก' });
        this.change = page.getByRole('link', { name: 'แก้ไข' });
    }

    async gotoAddCourse() {
        await this.addCourse.click();
    }

    async gotoDetail(){
      await this.detail.last().click();
    }

    async gotoChange(){
      await this.gotoDetail();
      await this.change.click();
    }

    async addTestCourse(){
      await this.status.selectOption('ไม่แสดง');
      await this.courseID.fill('test000');
      await this.level.selectOption('ปริญญาตรี');
      await this.year.fill('2569');
      await this.major.fill('วิทยาการคอมพิวเตอร์');
      await this.nameTH.fill('เทส');
      await this.nameEN.fill('test');
      await this.degreeEN.fill('test');
      await this.degreeTH.fill('เทส');
      await this.PLOs.fill('test');
      await this.save.click();
    }

    async addVisibleTestCourse(){
      await this.gotoAddCourse();
      await this.status.selectOption('แสดง');
      await this.courseID.fill('test10');
      await this.level.selectOption('ปริญญาตรี');
      await this.year.fill('2569');
      await this.major.fill('วิทยาการคอมพิวเตอร์');
      await this.nameTH.fill('เทส10');
      await this.nameEN.fill('test10');
      await this.degreeEN.fill('test10');
      await this.degreeTH.fill('เทส10');
      await this.PLOs.fill('test10');
      await this.save.click();
    }
    
    async changeCourse(){
      await this.gotoChange();
      await this.save.click();
    }
}