import { test, expect, Page, Locator } from '@playwright/test';

export class LoginPage {

    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly logguedAsText: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('//input[@data-qa="login-email"]');
        this.passwordInput = page.locator('//input[@placeholder="Password"]');
        this.loginButton = page.locator('//button[normalize-space()="Login"]');
        this.logguedAsText = page.locator('//b[normalize-space()="Rahma"]');
        this.errorMessage = page.locator('//*[contains(text(),"Your email or password is incorrect!")]');

    }

    async goto() {
        await this.page.goto('https://automationexercise.com/login');
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async expectLoginSuccess() {
        await expect(this.logguedAsText).toBeVisible();
    }

    async expectLoginFailure() {
        await expect(this.errorMessage).toBeVisible();
    }







}