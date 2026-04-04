import { Page } from "@playwright/test";
export class NewsPage {
  constructor(private page: Page) {}
  async goto() {
    await this.page.goto("/home");
  }
  async goToNews() {
    await this.page
      .locator("#navbar-component")
      .getByRole("link", { name: "ข่าวสาร" })
      .click();
  }
  getCategoryButton(name: string) {
    return this.page.getByRole("button", { name });
  }
  getNewsItems() {
    return this.page.locator('a[href^="/news/"]');
  }
}
