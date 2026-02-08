import { test, expect } from '@playwright/test';
import {
  generateRandomUser,
  registerAndLogin,
  login,
  deleteAccount,
  generatePassword,
} from '../e2e/test-helper';
import type { UserData } from '../e2e/test-helper';

test.describe('Security page', () => {
  let userData: UserData;

  test.beforeEach(async () => {
    userData = generateRandomUser();
  });

  test('should update password successfully when passwords match and are valid', async ({
    page,
  }) => {
    await registerAndLogin(page, userData);
    await page.goto('http://localhost:5173/personal-page/cabinet/security');
    await expect(page.locator('#oldPasswordInput')).toBeVisible();

    await page.locator('.edit-icon').nth(0).click();
    await page.fill('#oldPasswordInput', userData.password);

    const newPassword = generatePassword();

    await page.locator('.edit-icon').nth(1).click();
    await page.fill('#newPasswordInput', newPassword);

    await page.locator('.edit-icon').nth(2).click();
    await page.fill('#repeatPasswordInput', newPassword);

    await page.click('button.save-button');
    const successToast = page.locator('.Toastify__toast--success');
    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Пароль успішно оновлено.');

    await deleteAccount(page);
  });

  test('should show error when passwords do not match', async ({ page }) => {
    await registerAndLogin(page, userData);
    await page.goto('http://localhost:5173/personal-page/cabinet/security');
    await expect(page.locator('#oldPasswordInput')).toBeVisible();

    await page.locator('.edit-icon').nth(0).click();
    await page.fill('#oldPasswordInput', userData.password);

    const newPassword = generatePassword();
    await page.locator('.edit-icon').nth(1).click();
    await page.fill('#newPasswordInput', newPassword);

    await page.locator('.edit-icon').nth(2).click();
    await page.fill('#repeatPasswordInput', 'differentPassword01');

    await page.click('button.save-button');
    const errorToast = page.locator('.Toastify__toast--error');
    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText('Паролі не збігаються.');

    await deleteAccount(page);
  });

  test('should show error when new password is invalid', async ({ page }) => {
    await registerAndLogin(page, userData);
    await page.goto('http://localhost:5173/personal-page/cabinet/security');
    await expect(page.locator('#oldPasswordInput')).toBeVisible();

    await page.locator('.edit-icon').nth(0).click();
    await page.fill('#oldPasswordInput', userData.password);

    await page.locator('.edit-icon').nth(1).click();
    await page.fill('#newPasswordInput', 'short');

    await page.locator('.edit-icon').nth(2).click();
    await page.fill('#repeatPasswordInput', 'short');

    await page.click('button.save-button');
    const errorToasts = page.locator('.Toastify__toast--error');
    await expect(errorToasts).toHaveCount(1);
    await expect(errorToasts.first()).toHaveText(
      'Пароль повинен містити від 6 символів.',
    );

    await deleteAccount(page);
  });

  test('should cancel account deletion', async ({ page }) => {
    await registerAndLogin(page, userData);
    await page.goto('http://localhost:5173/personal-page/cabinet/security');
    await expect(page.locator('.delete-user-button')).toBeVisible();

    const deleteUserButton = page.locator('.delete-user-button');
    await deleteUserButton.click();

    const modal = page.locator('.modal');
    await expect(modal).toBeVisible();

    const cancelButton = page.locator('.cancel-delete-button');
    await cancelButton.click();
    await expect(modal).toBeHidden();

    await deleteAccount(page);
  });

  test('should delete account successfully', async ({ page }) => {
    await registerAndLogin(page, userData);
    await page.goto('http://localhost:5173/personal-page/cabinet/security');
    await expect(page.locator('.delete-user-button')).toBeVisible();

    const deleteUserButton = page.locator('.delete-user-button');
    await deleteUserButton.click();

    const modal = page.locator('.modal');
    await expect(modal).toBeVisible();

    const deleteButton = page.locator('.accept-delete-button');
    await deleteButton.click();

    const successToast = page.locator('.Toastify__toast--success');
    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Акаунт видалено успішно.');
  });
});
