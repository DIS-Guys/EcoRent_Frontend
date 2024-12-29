import { test, expect } from '@playwright/test';
import {
  generateRandomUser,
  registerAndLogin,
  login,
  deleteAccount,
  generatePassword,
} from '../e2e/test-helper';
import type { UserData } from '../e2e/test-helper';

test.describe('Address page', () => {
  let userData: UserData;

  test.beforeEach(async () => {
    userData = generateRandomUser();
  });

  test('should edit and save address data successfully', async ({ page }) => {
    test.setTimeout(60000);
    await registerAndLogin(page, userData);
    await page.goto('http://localhost:5173/personal-page/cabinet/address');
    await page.waitForTimeout(500);

    const successToast = page.locator('.Toastify__toast--success');

    await page.locator('.edit-icon').nth(0).click();
    await page.fill('#regionInput', 'Київська');
    await page.click('.save-button');

    await page.waitForTimeout(1000);
    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Адреса успішно оновлена.');

    await page.waitForTimeout(5500);
    await page.locator('.edit-icon').nth(1).click();
    await page.fill('#townInput', 'Київ');
    await page.click('.save-button');

    await page.waitForTimeout(1000);
    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Адреса успішно оновлена.');

    await page.waitForTimeout(5500);
    await page.locator('.edit-icon').nth(2).click();
    await page.fill('#streetInput', 'Хрещатик');
    await page.click('.save-button');

    await page.waitForTimeout(1000);
    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Адреса успішно оновлена.');

    await page.waitForTimeout(5500);
    await page.locator('.edit-icon').nth(3).click();
    await page.fill('#houseNumberInput', '1');
    await page.click('.save-button');

    await page.waitForTimeout(1000);
    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Адреса успішно оновлена.');

    await page.waitForTimeout(5500);
    await page.locator('.edit-icon').nth(4).click();
    await page.fill('#apartmentNumberInput', '14');
    await page.click('.save-button');

    await page.waitForTimeout(1000);
    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Адреса успішно оновлена.');

    await page.waitForTimeout(5500);
    await page.locator('.edit-icon').nth(5).click();
    await page.fill('#floorInput', '3');
    await page.click('.save-button');

    await page.waitForTimeout(1000);
    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Адреса успішно оновлена.');

    await deleteAccount(page);
  });

  test('should validate address fields', async ({ page }) => {
    test.setTimeout(60000);
    await registerAndLogin(page, userData);
    await page.goto('http://localhost:5173/personal-page/cabinet/address');
    await page.waitForTimeout(500);

    const errorToast = page.locator('.Toastify__toast--error');
    const cancelButton = page.locator('text=Скасувати');

    await page.locator('.edit-icon').nth(0).click();
    await page.fill('#regionInput', '123Region');
    await page.click('.save-button');

    await page.waitForTimeout(1000);
    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText(
      'Помилка при завантаженні адреси: Поле "Область" не може містити чисел. - Поле "Область" не може починатися з цифри.'
    );
    await cancelButton.click();

    await page.waitForTimeout(5500);
    await page.locator('.edit-icon').nth(1).click();
    await page.fill('#townInput', '123City');
    await page.click('.save-button');

    await page.waitForTimeout(1000);
    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText(
      'Помилка при завантаженні адреси: Поле "Місто" не може починатися з цифри.'
    );
    await cancelButton.click();

    await page.waitForTimeout(5500);
    await page.locator('.edit-icon').nth(2).click();
    await page.fill('#streetInput', '3Street');
    await page.click('.save-button');

    await page.waitForTimeout(1000);
    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText(
      'Помилка при завантаженні адреси: Поле "Вулиця" не може починатися з цифри.'
    );
    await cancelButton.click();

    await page.waitForTimeout(5500);
    await page.locator('.edit-icon').nth(3).click();
    await page.fill('#houseNumberInput', 'abc');
    await page.click('.save-button');

    await page.waitForTimeout(1000);
    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText(
      'Помилка при завантаженні адреси: Поле "Номер будинку" повинно починатися з цифри.'
    );
    await cancelButton.click();

    await page.waitForTimeout(5500);
    await page.locator('.edit-icon').nth(4).click();
    await page.fill('#apartmentNumberInput', 'a33');
    await page.click('.save-button');

    await page.waitForTimeout(1000);
    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText(
      'Помилка при завантаженні адреси: Поле "Номер квартири" повинно починатися з цифри.'
    );
    await cancelButton.click();

    await deleteAccount(page);
  });

  test('should cancel address data editing', async ({ page }) => {
    await registerAndLogin(page, userData);
    await page.goto('http://localhost:5173/personal-page/cabinet/address');
    await page.waitForTimeout(500);

    const streetInput = page.locator('#streetInput');
    const originalStreet = await streetInput.inputValue();

    await page.locator('.edit-icon').nth(2).click();
    await page.fill('#streetInput', 'NewRegion');

    const cancelButton = page.locator('text=Скасувати');
    await cancelButton.click();

    await expect(streetInput).toHaveValue(originalStreet);

    await deleteAccount(page);
  });
});
