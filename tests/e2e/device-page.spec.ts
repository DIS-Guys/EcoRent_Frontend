import { test, expect } from '@playwright/test';

test.describe('Device Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/rent/67608f0972272fe50c14c693');
  });

  test('should display device details', async ({ page }) => {
    const mainImage = page.locator('.main-device-picture');
    await expect(mainImage).toBeVisible();

    const deviceTitle = page.locator('.device-page-name-title');
    await expect(deviceTitle).toBeVisible();

    const characteristics = page.locator('.char-value-block');
    await expect(characteristics).toBeVisible();
  });

  test('should open lightbox on image click', async ({ page }) => {
    const mainImage = page.locator('.main-device-picture');
    await mainImage.click();

    const lightbox = page.locator('.pswp__container');
    await expect(lightbox).toBeVisible();
  });

  test('should open and close rent modal', async ({ page }) => {
    const rentButton = page.locator('.lessor-info-button');
    await rentButton.click();

    const modal = page.locator('.modal-content');
    await expect(modal).toBeVisible();

    const closeModalButton = page.locator('.close-modal-button');
    await closeModalButton.click();
    await expect(modal).toBeHidden();
  });
});
