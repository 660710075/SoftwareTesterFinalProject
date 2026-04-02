import { Page } from "@playwright/test";
export class PersonnelPage {
  constructor(private page: Page) {}
  async goto() {
    await this.page.goto("/home");
  }
  async goToPersonnel() {
    await this.page
      .locator("#navbar-component")
      .getByRole("link", { name: "บุคลากร" })
      .click();
  }
  getCategoryButton(name: string) {
    return this.page.getByRole("button", { name });
  }
  getPersonnelItems() {
    return this.page.getByRole("heading", { level: 5 });
  }
}
