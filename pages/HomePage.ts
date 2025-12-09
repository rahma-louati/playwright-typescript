import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly productsButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productsButton = page.locator('//a[@href="/products"]');
    }

    async goto() {
        await this.page.goto('https://automationexercise.com/');
    }

    async clickProducts() {
        await this.productsButton.click();
    }



}