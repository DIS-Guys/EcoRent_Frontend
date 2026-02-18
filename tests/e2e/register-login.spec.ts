import { test, expect } from '@playwright/test';
import {
  generateRandomUser,
  registerAndLogin,
  deleteAccount,
} from '../e2e/test-helper';

test.describe('User Registration', () => {
  test('should register a new user', async ({ page }) => {
    const userData = generateRandomUser();
    await registerAndLogin(page, userData);
    await expect(page).toHaveURL(/\/personal-page\/cabinet\/profile$/);

    await deleteAccount(page);
  });

  test('should show error for invalid email format', async ({ page }) => {
    const userData = generateRandomUser();
    await page.goto('/personal-page/cabinet/profile');

    await page.fill('input[placeholder="Ім\'я"]', userData.name);
    await page.fill('input[placeholder="Прізвище"]', userData.surname);
    await page.fill('input[placeholder="E-mail"]', 'invalid-email');
    await page.fill('input[placeholder="Пароль"]', userData.password);
    await page.fill(
      'input[placeholder="Підтвердити пароль"]',
      userData.password,
    );

    await page.click('button[type="submit"]');

    const errorToast = page.locator('.Toastify__toast--error');
    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText('Невірний формат e-mail.');
  });

  test('should show error for mismatched passwords', async ({ page }) => {
    const userData = generateRandomUser();
    await page.goto('/personal-page/cabinet/profile');

    await page.fill('input[placeholder="Ім\'я"]', userData.name);
    await page.fill('input[placeholder="Прізвище"]', userData.surname);
    await page.fill('input[placeholder="E-mail"]', userData.email);
    await page.fill('input[placeholder="Пароль"]', userData.password);
    await page.fill('input[placeholder="Підтвердити пароль"]', 'different');

    await page.click('button[type="submit"]');

    const errorToast = page.locator('.Toastify__toast--error');
    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText('Паролі не збігаються.');
  });

  test('should show error for short password', async ({ page }) => {
    const userData = generateRandomUser();
    await page.goto('/personal-page/cabinet/profile');

    await page.fill('input[placeholder="Ім\'я"]', userData.name);
    await page.fill('input[placeholder="Прізвище"]', userData.surname);
    await page.fill('input[placeholder="E-mail"]', userData.email);
    await page.fill('input[placeholder="Пароль"]', 'short');
    await page.fill('input[placeholder="Підтвердити пароль"]', 'short');

    await page.click('button[type="submit"]');

    const errorToasts = page.locator('.Toastify__toast--error');
    await expect(errorToasts).toHaveCount(2);
    await expect(errorToasts.nth(0)).toHaveText(
      'Пароль має містити щонайменше 6 символів.',
    );
    await expect(errorToasts.nth(1)).toHaveText(
      'Пароль має містити щонайменше одну літеру та одну цифру.',
    );
  });
});
