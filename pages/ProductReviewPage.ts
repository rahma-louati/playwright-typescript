import { Page, Locator, expect } from '@playwright/test';

export class ProductReviewPage {
    readonly page: Page;
    readonly ViewProductButton: Locator;
    readonly reviewNameInput: Locator;
    readonly reviewEmailInput: Locator;
    readonly reviewText: Locator;
    readonly submitButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.ViewProductButton = page.locator('(//a[contains(text(),"View Product")])[1]');
        this.reviewNameInput = page.locator('#name');
        this.reviewEmailInput = page.locator('#email');
        this.reviewText = page.locator('#review');
        this.submitButton = page.locator('#button-review');
        this.successMessage = page.locator('//*[contains(text(), "Thank you for your review")]')
    }
    async clickViewProductButton() {
        await this.ViewProductButton.click();
    }

    async isWriteReviewVisible() {
        await expect(this.reviewNameInput).toBeVisible();
        await expect(this.reviewEmailInput).toBeVisible();
        await expect(this.reviewText).toBeVisible();
    }

    async submitReview(name: string, email: string, review: string) {
        await this.reviewNameInput.fill(name);
        await this.reviewEmailInput.fill(email);
        await this.reviewText.fill(review);
        await this.submitButton.click();
    }

    async expectReviewSuccess() {
        await expect(this.successMessage).toBeVisible();
    }

}