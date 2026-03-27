import { Page, Locator, expect } from '@playwright/test';

export class addmissionPage {
  readonly page: Page;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.getByRole('button',{ name: 'Checkout' });
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }
}