import { test, expect } from '@playwright/test';
import {
  generateRandomUser,
  registerAndLogin,
  login,
  deleteAccount,
} from '../e2e/test-helper';
import type { UserData } from '../e2e/test-helper';

test.describe('Main Page', () => {
  let userData: UserData;

  test.beforeEach(async () => {
    userData = generateRandomUser();
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
  });

  test('should display the main search input', async ({ page }) => {
    await page.waitForTimeout(500);
    const searchInput = page.locator('.main-search');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toHaveAttribute(
      'placeholder',
      'Який зарядний пристрій шукаєте?'
    );
  });

  test('should navigate to rent page with search query', async ({ page }) => {
    await page.waitForTimeout(500);
    const searchInput = page.locator('.main-search');
    const searchButton = page.locator('.search-button');

    await searchInput.fill('EcoFlow');
    await searchButton.click();
    await expect(page).toHaveURL('http://localhost:5173/rent');

    await page.waitForTimeout(1000);
    const deviceCards = page.locator('.device-card');
    const count = await deviceCards.count();
    expect(count).toBeGreaterThan(0);

    await expect(searchInput).toHaveValue('EcoFlow');
  });

  test('should display about us section', async ({ page }) => {
    await page.waitForTimeout(500);
    const aboutUsHeader = page.locator('.about-us-header-text');
    const aboutUsDetailed = page.locator('.about-us-detailed-text');
    const aboutUsService = page.locator('.about-us-service-text');

    await expect(aboutUsHeader).toBeVisible();
    await expect(aboutUsDetailed).toBeVisible();
    await expect(aboutUsService).toBeVisible();
  });

  test('should have rent and rent out buttons', async ({ page }) => {
    await page.waitForTimeout(500);
    const rentButton = page.locator('text=Хочу орендувати!');
    const rentOutButton = page.locator('text=Здати в оренду!');

    await expect(rentButton).toBeVisible();
    await expect(rentOutButton).toBeVisible();
  });

  test('should navigate to rent page on rent button click', async ({
    page,
  }) => {
    await page.waitForTimeout(500);
    const rentButton = page.locator('text=Хочу орендувати!');
    await rentButton.click();
    await expect(page).toHaveURL('http://localhost:5173/rent');
  });

  test('should navigate to personal devices page on rent out button click', async ({
    page,
  }) => {
    await page.waitForTimeout(500);
    const rentOutButton = page.locator('text=Здати в оренду!');
    await rentOutButton.click();

    await registerAndLogin(page, userData);

    await page.goto('http://localhost:5173/personal-page/my-devices');
    await expect(page).toHaveURL(
      'http://localhost:5173/personal-page/my-devices'
    );

    const addDeviceButton = page.locator('text=Додати пристрій');
    await expect(addDeviceButton).toBeVisible();

    await deleteAccount(page);
  });
});
