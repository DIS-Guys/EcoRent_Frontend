import { test, expect } from '@playwright/test';
import {
  generateRandomUser,
  registerAndLogin,
  login,
  deleteAccount,
  waitForToastToDisappear,
  tryDeleteAccount,
} from '../e2e/test-helper';
import type { UserData } from '../e2e/test-helper';

test.describe('Profile page', () => {
  let userData: UserData;

  test.beforeEach(async () => {
    userData = generateRandomUser();
  });

  test.afterEach(async ({ page }) => {
    await tryDeleteAccount(page);
  });

  test('should validate profile fields', async ({ page }) => {
    await registerAndLogin(page, userData);
    await expect(page.locator('#profileNameInput')).toHaveValue(userData.name);

    const errorToast = page.locator('.Toastify__toast--error');

    await page.locator('.edit-icon').nth(0).click();
    await page.fill('#profileNameInput', '');
    await page.click('.save-button');

    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText(
      `Поля заповнені невірно: \n Ім'я є обов'язковим.`,
    );

    await waitForToastToDisappear(page, errorToast);
    await page.locator('.edit-icon').nth(1).click();
    await page.fill('#profileSurnameInput', '');
    await page.click('.save-button');

    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText(
      `Поля заповнені невірно: \n Ім'я є обов'язковим. \n Прізвище є обов'язковим.`,
    );

    await waitForToastToDisappear(page, errorToast);
    await page.locator('.edit-icon').nth(0).click();
    await page.fill('#profileNameInput', 'Testname');

    await page.locator('.edit-icon').nth(1).click();
    await page.fill('#profileSurnameInput', 'Testsurname');
    await page.click('.save-button');

    await waitForToastToDisappear(page, errorToast);
    await page.locator('.edit-icon').nth(2).click();
    await page.fill('#profileEmailInput', 'invalid-email');
    await page.click('.save-button');

    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText(
      `Поля заповнені невірно: \n Некоректний формат E-mail.`,
    );

    await page.locator('.edit-icon').nth(2).click();
    await page.fill('#profileEmailInput', `${userData.email}`);
    await page.click('.save-button');

    await waitForToastToDisappear(page, errorToast);
    await page.locator('.edit-icon').nth(3).click();
    await page.fill('#profilePhoneInput', '123');
    await page.click('.save-button');

    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText(
      `Поля заповнені невірно: \n Некоректний формат номера телефону.`,
    );

    await deleteAccount(page);
  });

  test('should cancel profile data editing', async ({ page }) => {
    await registerAndLogin(page, userData);

    const profileName = page.locator('#profileNameInput');
    await expect(profileName).toHaveValue(userData.name);

    const originalName = await profileName.inputValue();

    await page.locator('.edit-icon').nth(0).click();
    await page.fill('#profileNameInput', 'AnotherName');

    const cancelButton = page.locator('text=Скасувати');
    await cancelButton.click();
    await expect(profileName).toHaveValue(originalName);

    await deleteAccount(page);
  });

  test('should logout successfully', async ({ page }) => {
    await registerAndLogin(page, userData);

    const logoutButton = page.locator('.logout-button');
    await logoutButton.click();
    await expect(page).toHaveURL('http://localhost:5173/login');

    await login(page, userData.email, userData.password);
    await deleteAccount(page);
  });

  test('should edit and save profile data', async ({ page }) => {
    await registerAndLogin(page, userData);
    const successToast = page.locator('.Toastify__toast--success');
    await expect(page.locator('#profileNameInput')).toHaveValue(userData.name);

    await page.locator('.edit-icon').nth(0).click();
    await page.fill('#profileNameInput', 'NewTestName');
    await page.click('.save-button');

    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Профіль успішно оновлено.');

    await waitForToastToDisappear(page, successToast);
    await page.locator('.edit-icon').nth(1).click();
    await page.fill('#profileSurnameInput', 'NewTestSurname');
    await page.click('.save-button');

    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Профіль успішно оновлено.');

    await waitForToastToDisappear(page, successToast);
    await page.locator('.edit-icon').nth(2).click();
    const newEmail = `1` + `${userData.email}`;
    await page.fill('#profileEmailInput', newEmail);
    await page.click('.save-button');

    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Профіль успішно оновлено.');

    await waitForToastToDisappear(page, successToast);
    await page.locator('.edit-icon').nth(3).click();
    await page.fill('#profilePhoneInput', '+380123456789');
    await page.click('.save-button');

    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Профіль успішно оновлено.');

    await deleteAccount(page);
  });
});
