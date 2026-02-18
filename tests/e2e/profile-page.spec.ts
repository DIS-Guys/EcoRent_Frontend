import { test, expect, type Locator, type Page } from '@playwright/test';
import {
  generateRandomUser,
  registerAndLogin,
  login,
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

  const editButtonFor = (page: Page, inputSelector: string) =>
    page
      .locator('.profile-edit-block')
      .filter({ has: page.locator(inputSelector) })
      .locator('img[alt="Edit icon"]');

  test('should validate profile fields', async ({ page }) => {
    await registerAndLogin(page, userData);
    await expect(page.locator('#profileNameInput')).toHaveValue(userData.name);

    const errorToast = page.locator('.Toastify__toast--error');
    const successToast = page.locator('.Toastify__toast--success');
    const dismissToast = async (toast: Locator) => {
      const currentToast = toast.first();
      await currentToast.getByRole('button', { name: 'close' }).click();
      await expect(toast).toHaveCount(0);
    };

    await editButtonFor(page, '#profileNameInput').click();
    await page.fill('#profileNameInput', '');
    await page.click('.save-button');

    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText(
      `Поля заповнені невірно: \n Ім'я є обов'язковим.`,
    );

    await dismissToast(errorToast);
    await editButtonFor(page, '#profileSurnameInput').click();
    await page.fill('#profileSurnameInput', '');
    await page.click('.save-button');

    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText(
      `Поля заповнені невірно: \n Ім'я є обов'язковим. \n Прізвище є обов'язковим.`,
    );

    await dismissToast(errorToast);
    await editButtonFor(page, '#profileNameInput').click();
    await page.fill('#profileNameInput', 'Testname');

    await editButtonFor(page, '#profileSurnameInput').click();
    await page.fill('#profileSurnameInput', 'Testsurname');
    await page.click('.save-button');

    await expect(successToast).toBeVisible();
    await dismissToast(successToast);

    await editButtonFor(page, '#profileEmailInput').click();
    await page.fill('#profileEmailInput', 'invalid-email');
    await page.click('.save-button');

    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText(
      `Поля заповнені невірно: \n Некоректний формат E-mail.`,
    );

    await dismissToast(errorToast);
    await editButtonFor(page, '#profileEmailInput').click();
    await page.fill('#profileEmailInput', `${userData.email}`);
    await page.click('.save-button');

    await expect(successToast).toBeVisible();
    await dismissToast(successToast);
    await editButtonFor(page, '#profilePhoneInput').click();
    await page.fill('#profilePhoneInput', '123');
    await page.click('.save-button');

    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText(
      `Поля заповнені невірно: \n Некоректний формат номера телефону.`,
    );
  });

  test('should cancel profile data editing', async ({ page }) => {
    await registerAndLogin(page, userData);

    const profileName = page.locator('#profileNameInput');
    await expect(profileName).toHaveValue(userData.name);

    const originalName = await profileName.inputValue();

    await editButtonFor(page, '#profileNameInput').click();
    await page.fill('#profileNameInput', 'AnotherName');

    const cancelButton = page.locator('text=Скасувати');
    await cancelButton.click();
    await expect(profileName).toHaveValue(originalName);
  });

  test('should logout successfully', async ({ page }) => {
    await registerAndLogin(page, userData);

    const logoutButton = page.getByRole('button', { name: 'Вийти' });
    await logoutButton.click();
    await expect(page).toHaveURL(/\/login$/);

    await login(page, userData.email, userData.password);
  });

  test('should edit and save profile data', async ({ page }) => {
    await registerAndLogin(page, userData);
    const successToast = page.locator('.Toastify__toast--success');
    await expect(page.locator('#profileNameInput')).toHaveValue(userData.name);

    await editButtonFor(page, '#profileNameInput').click();
    await page.fill('#profileNameInput', 'NewTestName');
    await page.click('.save-button');

    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Профіль успішно оновлено.');

    await waitForToastToDisappear(page, successToast);
    await editButtonFor(page, '#profileSurnameInput').click();
    await page.fill('#profileSurnameInput', 'NewTestSurname');
    await page.click('.save-button');

    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Профіль успішно оновлено.');

    await waitForToastToDisappear(page, successToast);
    await editButtonFor(page, '#profileEmailInput').click();
    const newEmail = `1` + `${userData.email}`;
    await page.fill('#profileEmailInput', newEmail);
    await page.click('.save-button');

    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Профіль успішно оновлено.');

    await waitForToastToDisappear(page, successToast);
    await editButtonFor(page, '#profilePhoneInput').click();
    await page.fill('#profilePhoneInput', '+380123456789');
    await page.click('.save-button');

    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Профіль успішно оновлено.');
  });
});
