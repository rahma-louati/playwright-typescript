import { Browser, BrowserContext, Page } from '@playwright/test';

export class Hooks {
    browser: Browser | undefined;
    context: BrowserContext | undefined;
    page: Page | undefined;

    /**
     * Initilization before all test
     */
    async beforeAll(browserInstance: Browser){
        this.browser = browserInstance;
        this.context = await this.browser.newContext({
            viewport: { width: 1366, height: 768 },
            ignoreHTTPSErrors: true,
            recordVideo: {dir: "test-results/videos"},
        });
        this.page = await this.context.newPage();
    }

    /**
     * Action executed before each test 
     */
    async beforeEach() {
        await this.page?.goto('/login');
    }

    /**
     * Action executed after each test
     */
    async afterEach(testName: string, testStatus: string) {
        if (testStatus === "failed") {
            await this.page?.screenshot({
                path: `test-results/screenshots/${testName}.png`,
         });
        }
    }

    /**
     * CleanUp after all test
     */
    async afterAll() {
        await this.context?.close();
        await this.browser?.close();
    }
}