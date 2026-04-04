import { Page } from "@playwright/test";
export class CoursePage {
  constructor(private page: Page) {}
  async goToCourse() {
    await this.page
      .locator("#navbar-component")
      .getByRole("link", { name: "หลักสูตร" })
      .click();
  }
  getFirstCourse() {
    return this.page.locator('a[href^="/course/"]').first();
  }
  getCourseDetailText() {
    return this.page.getByText(/ข้อมูลหลักสูตร/);
  }
}
