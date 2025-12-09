# 🎭 Playwright

[![npm version](https://img.shields.io/npm/v/playwright.svg)](https://www.npmjs.com/package/playwright) <!-- GEN:chromium-version-badge -->[![Chromium version](https://img.shields.io/badge/chromium-143.0.7499.25-blue.svg?logo=google-chrome)](https://www.chromium.org/Home)<!-- GEN:stop --> <!-- GEN:firefox-version-badge -->[![Firefox version](https://img.shields.io/badge/firefox-145.0.2-blue.svg?logo=firefoxbrowser)](https://www.mozilla.org/en-US/firefox/new/)

🎭 Présentation

Framework de tests end-to-end basé sur Playwright + TypeScript, structuré selon le modèle Page Object Model (POM).
Il gère :

-Hooks avant/après tests

-Screenshots et vidéos en cas d’échec

-Organisation claire par pages et tests

---

# 🧰 Structure du projet

```
```
project-root/
│
├── hooks/
│   └── Hooks.ts
│
├── pages/
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   └── ProductReviewPage.ts
│
├── tests/
│   ├── login.spec.ts
│   └── productReview.spec.ts
│
├── actions/
│   ├── PageActions.ts
│   └── PageAssertions.ts
│
├── playwright.config.ts
└── README.md
```

```

---

## 📥 Commandes utiles

1. Lancer les tests : :
<pre>
npx playwright test
</pre>

2. Lancer l’UI : :
<pre>
npx playwright test --ui
</pre>

3. Afficher le rapport :
<pre>
npx playwright show-report
</pre>

---

## 🔧 Hooks – Gestion du navigateur et des tests
<pre>
```
import { Browser, BrowserContext, Page } from '@playwright/test';

export class Hooks {
    browser: Browser | undefined;
    context: BrowserContext | undefined;
    page: Page | undefined;

    async beforeAll(browserInstance: Browser){
        this.browser = browserInstance;
        this.context = await this.browser.newContext({
            viewport: { width: 1366, height: 768 },
            ignoreHTTPSErrors: true,
            recordVideo: { dir: "test-results/videos" },
        });
        this.page = await this.context.newPage();
    }

    async beforeEach() {
        await this.page?.goto('/login');
    }

    async afterEach(testName: string, testStatus: string) {
        if (testStatus === "failed") {
            await this.page?.screenshot({
                path: `test-results/screenshots/${testName}.png`,
            });
        }
    }

    async afterAll() {
        await this.context?.close();
        await this.browser?.close();
    }
}
</pre>
------------
 ▶️Page Objects
 🔐 LoginPage
<pre>
export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loggedAsText: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('//input[@data-qa="login-email"]');
        this.passwordInput = page.locator('//input[@placeholder="Password"]');
        this.loginButton = page.locator('//button[normalize-space()="Login"]');
        this.loggedAsText = page.locator('//b[normalize-space()="Rahma"]');
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
        await expect(this.loggedAsText).toBeVisible();
    }

    async expectLoginFailure() {
        await expect(this.errorMessage).toBeVisible();
    }
}
</pre>
------------
▶️Résultats

Vidéos : test-results/videos/

Screenshots : test-results/screenshots/

 ------

👩‍💻 Auteur Rahma Louati |Software QA Engineer – Test manuel & automatisé|
