import { test, expect } from '@playwright/test';

test.describe('Rent Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/rent');
  });

  test('should interact with filters', async ({ page }) => {
    const brandCheckbox = page.locator('input[type="checkbox"]').first();
    await expect(brandCheckbox).toBeVisible();
    await brandCheckbox.check();
    await expect(brandCheckbox).toBeChecked();

    const modelCheckbox = page.locator('input[type="checkbox"]').nth(1);
    await modelCheckbox.check();
    await expect(modelCheckbox).toBeChecked();

    const priceFromInput = page.locator('#priceFrom');
    const priceToInput = page.locator('#priceTo');
    await priceFromInput.fill('100');
    await priceToInput.fill('500');
    await expect(priceFromInput).toHaveValue('100');
    await expect(priceToInput).toHaveValue('500');
  });

  test('should perform a search', async ({ page }) => {
    const searchInput = page.locator('.main-search');
    const searchButton = page.locator('.search-button');
    await expect(searchInput).toBeVisible();

    await searchInput.fill('EcoFlow');
    await searchButton.click();

    await expect(page).toHaveURL(/\/rent/);
    await expect(page.locator('.device-card').first()).toBeVisible();
  });

  test('should navigate to a device page', async ({ page }) => {
    const deviceCard = page.locator('.device-card').first();
    await expect(deviceCard).toBeVisible();
    await deviceCard.click();

    await expect(page).toHaveURL(/\/rent\/\d+/);
    const deviceTitle = page.locator('.device-page-name-title');
    await expect(deviceTitle).toBeVisible();
  });

  test('should handle invalid search gracefully', async ({ page }) => {
    const searchInput = page.locator('.main-search');
    const searchButton = page.locator('.search-button');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('InvalidSearchQuery');
    await searchButton.click();

    await expect(page.locator('.device-card')).toHaveCount(0);
  });

  test('should validate price range inputs', async ({ page }) => {
    const priceFromInput = page.locator('#priceFrom');
    const priceToInput = page.locator('#priceTo');
    await expect(priceFromInput).toBeVisible();

    await priceFromInput.fill('-100');
    await priceToInput.fill('-500');

    await expect(page.locator('.device-card')).toHaveCount(0);
  });

  test('should apply multiple filters correctly', async ({ page }) => {
    const brandCheckbox = page.locator('input[type="checkbox"]').first();
    const modelCheckbox = page.locator('input[type="checkbox"]').nth(1);
    const priceFromInput = page.locator('#priceFrom');
    const priceToInput = page.locator('#priceTo');
    await expect(brandCheckbox).toBeVisible();

    await brandCheckbox.check();
    await modelCheckbox.check();
    await priceFromInput.fill('100');
    await priceToInput.fill('500');

    await expect(page.locator('.device-card').first()).toBeVisible();
  });
});
