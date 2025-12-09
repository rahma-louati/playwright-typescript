import { test, expect } from '@playwright/test';

test.describe('Login Page', () =>{
 
    const  baseURL = 'https://qatraining.fr/pages/features/login.html';

    test('Should login successfully with valid credentions',async({page})=>{

        await page.goto(baseURL);
        await page.fill('#username','Rahma');
        await page.fill('#password','Louati');
        await page.click('//button[normalize-space()="Se connecter"]');


    });


});
