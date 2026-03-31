import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly loginButton: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginButton = page.getByRole('button', { name: 'เข้าสู่ระบบ' });
        this.emailField = page.getByRole('textbox', { name: 'กรอกอีเมล' });
        this.passwordField = page.getByRole('textbox', { name: 'กรอกรหัสผ่าน' });
    }

    async goto() {
        await this.page.goto('/login');
    }

    async login(email: string, password: string) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}