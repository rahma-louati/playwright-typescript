import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { Hooks } from '../utils/hooks';

const hooks = new Hooks();
test.beforeAll(async ({ browser }) => {
    await hooks.beforeAll(browser);
});

test.beforeEach(async () => {
    await hooks.beforeEach();
});

test.afterEach(async ({ }, testInfo) => {
    await hooks.afterEach(testInfo.title, testInfo.status!.toString());
});

test.afterAll(async () => {
    await hooks.afterAll();
});

test.describe('Automation Exercice Login', () => {

    test('Successful with valid credentials', async ({ page }) => {
        const login = new LoginPage(page);
        await login.goto();
        await login.login('Rahmalou@gmail.com', 'Rahma');
        await login.expectLoginSuccess();
    });

    test('login fails with invalid credentials', async ({ page }) => {
        const login = new LoginPage(page);
        await login.goto();
        await login.login('Rahma@gmail.com', 'Rahma');
        await login.expectLoginFailure();
    });


});
