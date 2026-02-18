import { test, expect, type Page } from '@playwright/test';
import {
  generateRandomUser,
  registerAndLogin,
  login,
  generatePassword,
  tryDeleteAccount,
} from '../e2e/test-helper';
import type { UserData } from '../e2e/test-helper';

test.describe('Security page', () => {
  let userData: UserData;

  test.beforeEach(async () => {
    userData = generateRandomUser();
  });

  test.afterEach(async ({ page }) => {
    await tryDeleteAccount(page);
  });

  const editButtonFor = (page: Page, inputSelector: string) =>
    page
      .locator('.profile-edit-block')
      .filter({ has: page.locator(inputSelector) })
      .locator('img[alt="Edit icon"]');

  test('should update password successfully when passwords match and are valid', async ({
    page,
  }) => {
    await registerAndLogin(page, userData);
    await page.goto('/personal-page/cabinet/security');
    await expect(page.locator('#oldPasswordInput')).toBeVisible();

    await editButtonFor(page, '#oldPasswordInput').click();
    await page.fill('#oldPasswordInput', userData.password);

    const newPassword = generatePassword();

    await editButtonFor(page, '#newPasswordInput').click();
    await page.fill('#newPasswordInput', newPassword);

    await editButtonFor(page, '#repeatPasswordInput').click();
    await page.fill('#repeatPasswordInput', newPassword);

    await page.click('button.save-button');
    const successToast = page.locator('.Toastify__toast--success');
    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Пароль успішно оновлено.');
  });

  test('should show error when passwords do not match', async ({ page }) => {
    await registerAndLogin(page, userData);
    await page.goto('/personal-page/cabinet/security');
    await expect(page.locator('#oldPasswordInput')).toBeVisible();

    await editButtonFor(page, '#oldPasswordInput').click();
    await page.fill('#oldPasswordInput', userData.password);

    const newPassword = generatePassword();
    await editButtonFor(page, '#newPasswordInput').click();
    await page.fill('#newPasswordInput', newPassword);

    await editButtonFor(page, '#repeatPasswordInput').click();
    await page.fill('#repeatPasswordInput', 'differentPassword01');

    await page.click('button.save-button');
    const errorToast = page.locator('.Toastify__toast--error');
    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText('Паролі не збігаються.');
  });

  test('should show error when new password is invalid', async ({ page }) => {
    await registerAndLogin(page, userData);
    await page.goto('/personal-page/cabinet/security');
    await expect(page.locator('#oldPasswordInput')).toBeVisible();

    await editButtonFor(page, '#oldPasswordInput').click();
    await page.fill('#oldPasswordInput', userData.password);

    await editButtonFor(page, '#newPasswordInput').click();
    await page.fill('#newPasswordInput', 'short');

    await editButtonFor(page, '#repeatPasswordInput').click();
    await page.fill('#repeatPasswordInput', 'short');

    await page.click('button.save-button');
    const errorToasts = page.locator('.Toastify__toast--error');
    await expect(errorToasts).toHaveCount(1);
    await expect(errorToasts.first()).toHaveText(
      'Пароль повинен містити від 6 символів.',
    );
  });

  test('should cancel account deletion', async ({ page }) => {
    await registerAndLogin(page, userData);
    await page.goto('/personal-page/cabinet/security');
    await expect(
      page.getByRole('button', { name: 'Видалити акаунт' }),
    ).toBeVisible();

    const deleteUserButton = page.getByRole('button', {
      name: 'Видалити акаунт',
    });
    await deleteUserButton.click();

    const modal = page.locator('.modal');
    await expect(modal).toBeVisible();

    const cancelButton = page.locator('.cancel-delete-button');
    await cancelButton.click();
    await expect(modal).toBeHidden();
  });

  test('should delete account successfully', async ({ page }) => {
    await registerAndLogin(page, userData);
    await page.goto('/personal-page/cabinet/security');
    await expect(
      page.getByRole('button', { name: 'Видалити акаунт' }),
    ).toBeVisible();

    const deleteUserButton = page.getByRole('button', {
      name: 'Видалити акаунт',
    });
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
