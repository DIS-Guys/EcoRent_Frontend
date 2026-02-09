import { test, expect } from '@playwright/test';
import {
  generateRandomUser,
  registerAndLogin,
  login,
  deleteAccount,
  generatePassword,
  waitForToastToDisappear,
  tryDeleteAccount,
} from '../e2e/test-helper';
import type { UserData } from '../e2e/test-helper';

test.describe('Address page', () => {
  let userData: UserData;

  test.beforeEach(async () => {
    userData = generateRandomUser();
  });

  test.afterEach(async ({ page }) => {
    await tryDeleteAccount(page);
  });

  test('should edit and save address data successfully', async ({ page }) => {
    test.setTimeout(60000);
    await registerAndLogin(page, userData);
    await Promise.all([
      page.waitForResponse(
        (response) =>
          response.url().includes('/api/auth/getUser') && response.ok(),
      ),
      page.goto('http://localhost:5173/personal-page/cabinet/address'),
    ]);
    await expect(page.locator('#regionInput')).toBeVisible();

    const successToast = page.locator('.Toastify__toast--success');

    await page.locator('.edit-icon').nth(0).click();
    await expect(page.locator('#regionInput')).toBeFocused();
    await page.fill('#regionInput', 'Київська');
    await page.click('.save-button');

    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Адреса успішно оновлена.');

    await waitForToastToDisappear(page, successToast);
    await page.locator('.edit-icon').nth(1).click();
    await expect(page.locator('#townInput')).toBeFocused();
    await page.fill('#townInput', 'Київ');
    await page.click('.save-button');

    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Адреса успішно оновлена.');

    await waitForToastToDisappear(page, successToast);
    await page.locator('.edit-icon').nth(2).click();
    await expect(page.locator('#streetInput')).toBeFocused();
    await page.fill('#streetInput', 'Хрещатик');
    await page.click('.save-button');

    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Адреса успішно оновлена.');

    await waitForToastToDisappear(page, successToast);
    await page.locator('.edit-icon').nth(3).click();
    await expect(page.locator('#houseNumberInput')).toBeFocused();
    await page.fill('#houseNumberInput', '1');
    await page.click('.save-button');

    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Адреса успішно оновлена.');

    await waitForToastToDisappear(page, successToast);
    await page.locator('.edit-icon').nth(4).click();
    await expect(page.locator('#apartmentNumberInput')).toBeFocused();
    await page.fill('#apartmentNumberInput', '14');
    await page.click('.save-button');

    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Адреса успішно оновлена.');

    await waitForToastToDisappear(page, successToast);
    await page.locator('.edit-icon').nth(5).click();
    await expect(page.locator('#floorInput')).toBeFocused();
    await page.fill('#floorInput', '3');
    await page.click('.save-button');

    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Адреса успішно оновлена.');

    await deleteAccount(page);
  });

  test('should validate address fields', async ({ page }) => {
    test.setTimeout(60000);
    await registerAndLogin(page, userData);
    await Promise.all([
      page.waitForResponse(
        (response) =>
          response.url().includes('/api/auth/getUser') && response.ok(),
      ),
      page.goto('http://localhost:5173/personal-page/cabinet/address'),
    ]);
    await expect(page.locator('#regionInput')).toBeVisible();

    const errorToast = page.locator('.Toastify__toast--error');
    const cancelButton = page.locator('text=Скасувати');

    await page.locator('.edit-icon').nth(0).click();
    await expect(page.locator('#regionInput')).toBeFocused();
    await page.fill('#regionInput', '123Region');
    await expect(page.locator('#regionInput')).toHaveValue('123Region');
    await page.locator('#regionInput').blur();
    await page.click('.save-button');

    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText(
      'Помилка при завантаженні адреси: Поле "Область" не може містити чисел. - Поле "Область" не може починатися з цифри.',
    );
    await cancelButton.click();

    await waitForToastToDisappear(page, errorToast);
    await page.locator('.edit-icon').nth(1).click();
    await expect(page.locator('#townInput')).toBeFocused();
    await page.fill('#townInput', '123City');
    await expect(page.locator('#townInput')).toHaveValue('123City');
    await page.locator('#townInput').blur();
    await page.click('.save-button');

    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText(
      'Помилка при завантаженні адреси: Поле "Місто" не може починатися з цифри.',
    );
    await cancelButton.click();

    await waitForToastToDisappear(page, errorToast);
    await page.locator('.edit-icon').nth(2).click();
    await expect(page.locator('#streetInput')).toBeFocused();
    await page.fill('#streetInput', '3Street');
    await expect(page.locator('#streetInput')).toHaveValue('3Street');
    await page.locator('#streetInput').blur();
    await page.click('.save-button');

    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText(
      'Помилка при завантаженні адреси: Поле "Вулиця" не може починатися з цифри.',
    );
    await cancelButton.click();

    await waitForToastToDisappear(page, errorToast);
    await page.locator('.edit-icon').nth(3).click();
    await expect(page.locator('#houseNumberInput')).toBeFocused();
    await page.fill('#houseNumberInput', 'abc');
    await expect(page.locator('#houseNumberInput')).toHaveValue('abc');
    await page.locator('#houseNumberInput').blur();
    await page.click('.save-button');

    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText(
      'Помилка при завантаженні адреси: Поле "Номер будинку" повинно починатися з цифри.',
    );
    await cancelButton.click();

    await waitForToastToDisappear(page, errorToast);
    await page.locator('.edit-icon').nth(4).click();
    await expect(page.locator('#apartmentNumberInput')).toBeFocused();
    await page.fill('#apartmentNumberInput', 'a33');
    await expect(page.locator('#apartmentNumberInput')).toHaveValue('a33');
    await page.locator('#apartmentNumberInput').blur();
    await page.click('.save-button');

    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText(
      'Помилка при завантаженні адреси: Поле "Номер квартири" повинно починатися з цифри.',
    );
    await cancelButton.click();

    await deleteAccount(page);
  });

  test('should cancel address data editing', async ({ page }) => {
    await registerAndLogin(page, userData);
    await Promise.all([
      page.waitForResponse(
        (response) =>
          response.url().includes('/api/auth/getUser') && response.ok(),
      ),
      page.goto('http://localhost:5173/personal-page/cabinet/address'),
    ]);
    await expect(page.locator('#streetInput')).toBeVisible();

    const streetInput = page.locator('#streetInput');
    const originalStreet = await streetInput.inputValue();

    await page.locator('.edit-icon').nth(2).click();
    await expect(page.locator('#streetInput')).toBeFocused();
    await page.fill('#streetInput', 'NewRegion');

    const cancelButton = page.locator('text=Скасувати');
    await cancelButton.click();

    await expect(streetInput).toHaveValue(originalStreet);

    await deleteAccount(page);
  });
});
