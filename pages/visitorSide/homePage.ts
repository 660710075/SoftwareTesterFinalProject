import { Page } from "@playwright/test";
export class HomePage {
  constructor(private page: Page) {}
  async goto() {
    await this.page.goto("/home");
  }
  getNewsSection() {
    return this.page
      .locator("div")
      .filter({
        hasText: "ข่าวประชาสัมพันธ์",
      })
      .first();
  }
  getFirstReadMoreButton() {
    return this.getNewsSection().getByRole("link", { name: "อ่านต่อ" }).first();
  }
  getCourseSection() {
    return this.page
      .locator("div")
      .filter({
        hasText: "หลักสูตรที่เปิดสอน",
      })
      .first();
  }
  getViewAllCoursesButton() {
    return this.getCourseSection()
      .getByRole("button", { name: "ดูทั้งหมด" })
      .first();
  }
}
