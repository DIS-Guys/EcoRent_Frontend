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
    await page.goto('/');
  });

  test('should display the main search input', async ({ page }) => {
    const searchInput = page.locator('.main-search');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toHaveAttribute(
      'placeholder',
      'Який зарядний пристрій шукаєте?',
    );
  });

  test('should navigate to rent page with search query', async ({ page }) => {
    const searchInput = page.locator('.main-search');
    const searchButton = page.locator('.search-button');
    await expect(searchInput).toBeVisible();

    await searchInput.fill('EcoFlow');
    await searchButton.click();
    await expect(page).toHaveURL(/\/rent$/);

    await expect(searchInput).toHaveValue('EcoFlow');
  });

  test('should display about us section', async ({ page }) => {
    const aboutUsHeader = page.locator('.about-us-header-text');
    const aboutUsDetailed = page.locator('.about-us-detailed-text');
    const aboutUsService = page.locator('.about-us-service-text');

    await expect(aboutUsHeader).toBeVisible();
    await expect(aboutUsDetailed).toBeVisible();
    await expect(aboutUsService).toBeVisible();
  });

  test('should have rent and rent out buttons', async ({ page }) => {
    const rentButton = page.locator('text=Хочу орендувати!');
    const rentOutButton = page.locator('text=Здати в оренду!');

    await expect(rentButton).toBeVisible();
    await expect(rentOutButton).toBeVisible();
  });

  test('should navigate to rent page on rent button click', async ({
    page,
  }) => {
    const rentButton = page.locator('text=Хочу орендувати!');
    await expect(rentButton).toBeVisible();
    await rentButton.click();
    await expect(page).toHaveURL(/\/rent$/);
  });

  test('should navigate to personal devices page on rent out button click', async ({
    page,
  }) => {
    const rentOutButton = page.locator('text=Здати в оренду!');
    await expect(rentOutButton).toBeVisible();
    await rentOutButton.click();

    await registerAndLogin(page, userData);

    await page.goto('/personal-page/my-devices');
    await expect(page).toHaveURL(/\/personal-page\/my-devices$/);

    const addDeviceButton = page.locator('text=Додати пристрій');
    await expect(addDeviceButton).toBeVisible();

    await deleteAccount(page);
  });
});
