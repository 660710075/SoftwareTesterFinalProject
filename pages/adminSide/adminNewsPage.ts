import { Page, Locator, expect } from '@playwright/test';

export class AdminNewsPage {
  readonly page: Page;
  readonly addNewsButton: Locator;

  readonly titleInput: Locator;
  readonly contentInput: Locator;
  readonly categoryDropdown: Locator;
  readonly coverImageInput: Locator;
  readonly imageInput: Locator;
  readonly confirmImageCropBtn: Locator;
  readonly publishBtn: Locator;
  readonly deleteNewsBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.addNewsButton = page.getByRole('link', { name: '+ เพิ่มข่าวสาร' });

    this.titleInput = page.getByRole('textbox').first(); //หัวข้อ
    this.contentInput = page.getByRole('textbox', { name: 'Editor editing area: main.' }); // เนื้อหา
    this.categoryDropdown = page.getByRole('combobox'); //ประเภทข่าว

    this.coverImageInput = this.coverImageInput = page.locator('input[type="file"][accept="image/*"]').first();
    // page
    //   .getByText('รูปภาพหน้าปกข่าว')
    //   .locator('..')
    //   .locator('input[type="file"]'); //ภาพหน้าปก
    this.confirmImageCropBtn = page.getByRole('button', { name: 'ตกลง' })

    this.imageInput = page
      .getByText('รูปภาพข่าว')
      .locator('..')
      .locator('input[type="file"]'); //ภาพข่าว
    this.publishBtn = page.getByRole('button', { name: 'เผยแพร่' })

    this.deleteNewsBtn = page.getByRole('button', { name: 'ลบ' });

  }

  async goto() {
    await this.page.goto('/admin/news');
  }

  async clickAddNews() {
    await this.addNewsButton.click();
  }

  async filltitleInput(title: string) {
    await this.titleInput.fill(title);
  }

  async fillcontentInput(content: string) {
    await this.contentInput.fill(content);
  }

  async selectCategory(category: string) {
    await this.categoryDropdown.selectOption(category);
  }

  async uploadCoverImage(filename: string) {
    await this.coverImageInput.waitFor({ state: 'attached' });
    await this.coverImageInput.setInputFiles(filename);
  }

  async uploadImage(filename: string) {
    await this.imageInput.setInputFiles(filename);
  }

  async publishNews() {
    await this.publishBtn.click();
  }

  async clickDeleteNews() {
    await this.deleteNewsBtn.click();
  }

}