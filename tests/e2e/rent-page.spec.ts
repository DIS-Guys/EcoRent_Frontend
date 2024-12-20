import { test, expect } from '@playwright/test';

test.describe('Rent Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/rent');
  });

  test('should interact with filters', async ({ page }) => {
    const brandCheckbox = page.locator('input[type="checkbox"]').first();
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

    await searchInput.fill('EcoFlow');
    await searchButton.click();

    await expect(page).toHaveURL(/\/rent/);
    await page.waitForTimeout(1000);
    const deviceCards = page.locator('.device-card');
    const count = await deviceCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should navigate to a device page', async ({ page }) => {
    const deviceCard = page.locator('.device-card').first();
    await deviceCard.click();

    await expect(page).toHaveURL(/\/rent\/\d+/);
    const deviceTitle = page.locator('.device-page-name-title');
    await expect(deviceTitle).toBeVisible();
  });

  test('should handle invalid search gracefully', async ({ page }) => {
    const searchInput = page.locator('.main-search');
    const searchButton = page.locator('.search-button');
    await page.waitForTimeout(1000);
    await searchInput.fill('InvalidSearchQuery');
    await searchButton.click();

    const deviceCards = page.locator('.device-card');
    const count = await deviceCards.count();
    expect(count).toBe(0);
  });

  test('should validate price range inputs', async ({ page }) => {
    const priceFromInput = page.locator('#priceFrom');
    const priceToInput = page.locator('#priceTo');

    await priceFromInput.fill('-100');
    await priceToInput.fill('-500');

    await page.waitForTimeout(1000);
    const deviceCards = page.locator('.device-card');
    const count = await deviceCards.count();
    expect(count).toBe(0);
  });

  test('should apply multiple filters correctly', async ({ page }) => {
    const brandCheckbox = page.locator('input[type="checkbox"]').first();
    const modelCheckbox = page.locator('input[type="checkbox"]').nth(1);
    const priceFromInput = page.locator('#priceFrom');
    const priceToInput = page.locator('#priceTo');

    await brandCheckbox.check();
    await modelCheckbox.check();
    await priceFromInput.fill('100');
    await priceToInput.fill('500');

    await page.waitForTimeout(1000);
    const deviceCards = page.locator('.device-card');
    const count = await deviceCards.count();
    expect(count).toBeGreaterThan(0);
  });
});
