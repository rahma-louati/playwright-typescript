import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductReviewPage } from '../pages/ProductReviewPage';

test('Add review on product', async ({ page }) => {
  const homePage = new HomePage(page);
  const productReviewPage = new ProductReviewPage(page);

  await homePage.goto();
  await homePage.clickProducts();
  await productReviewPage.clickViewProductButton();
  await productReviewPage.isWriteReviewVisible();

  
  await productReviewPage.submitReview('Test User','Test@yahoo.fr','Product OK');

  await productReviewPage.expectReviewSuccess();
});