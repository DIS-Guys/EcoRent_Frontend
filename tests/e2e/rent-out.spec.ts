import { test, expect } from '@playwright/test';
import {
  generateRandomUser,
  registerAndLogin,
  login,
  deleteAccount,
} from '../e2e/test-helper';
import type { UserData } from '../e2e/test-helper';

test.describe('Rent out page', () => {
  let userData: UserData;

  test.beforeEach(async () => {
    userData = generateRandomUser();
  });

  test('should display validation errors when submitting empty form', async ({
    page,
  }) => {
    await registerAndLogin(page, userData);
    await page.goto('http://localhost:5173/personal-page/my-devices');

    const addDevice = page.locator('.add-device-button');
    await expect(addDevice).toBeVisible();
    await addDevice.click();

    await expect(page).toHaveURL('http://localhost:5173/rent-out');
    await expect(page.locator('button.put-on-rent-button')).toBeVisible();
    await page.click('button.put-on-rent-button');

    const errorToast = page.locator('.Toastify__toast--error');
    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText("Заповніть обов'язкові поля!");

    await deleteAccount(page);
  });

  test('should display error when no images are uploaded', async ({ page }) => {
    await registerAndLogin(page, userData);
    await page.goto('http://localhost:5173/personal-page/my-devices');

    const addDevice = page.locator('.add-device-button');
    await expect(addDevice).toBeVisible();
    await addDevice.click();

    await expect(page).toHaveURL('http://localhost:5173/rent-out');

    await expect(page.locator('input[name="title"]')).toBeVisible();
    await page.fill('input[name="title"]', 'Test Power Station');
    await page.selectOption('select[name="manufacturer"]', 'Jackery');
    await page.selectOption('select[name="deviceModel"]', { index: 1 });
    await page.selectOption('select[name="condition"]', 'Новий');
    await page.fill('input[name="batteryCapacity"]', '1000');
    await page.fill('input[name="weight"]', '5');
    await page.selectOption('select[name="typeC"]', '2');
    await page.selectOption('select[name="typeA"]', '2');
    await page.selectOption('select[name="sockets"]', '2');
    await page.selectOption('select[name="remoteUse"]', 'Wi-Fi');
    await page.fill('#dimensionsInput', '30');
    await page.fill('#dimensionsInput2', '20');
    await page.fill('#dimensionsInput3', '15');
    await page.selectOption('select[name="batteryType"]', 'LiFePO4');
    await page.selectOption('select[name="signalShape"]', 'Чиста синусоїда');
    await page.fill('input[name="price"]', '500');
    await page.fill('input[name="minRentTerm"]', '1');
    await page.fill('input[name="maxRentTerm"]', '30');
    await page.check('input[name="policyAgreement"]');
    await page.click('button.put-on-rent-button');

    await expect(page.locator('.Toastify__toast--error')).toBeVisible();
    await expect(page.locator('.Toastify__toast--error')).toHaveText(
      'Додайте принаймні одне зображення.',
    );

    await deleteAccount(page);
  });

  test('should display error when title is empty', async ({ page }) => {
    await registerAndLogin(page, userData);
    await page.goto('http://localhost:5173/personal-page/my-devices');

    const addDevice = page.locator('.add-device-button');
    await expect(addDevice).toBeVisible();
    await addDevice.click();

    await expect(page).toHaveURL('http://localhost:5173/rent-out');

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(
      '../EcoRent_Frontend/tests/e2e/test-image/ecorent.png',
    );
    await expect(page.locator('input[name="title"]')).toBeVisible();

    await page.selectOption('select[name="manufacturer"]', 'Jackery');
    await page.selectOption('select[name="deviceModel"]', { index: 1 });
    await page.selectOption('select[name="condition"]', 'Новий');
    await page.fill('input[name="batteryCapacity"]', '1000');
    await page.fill('input[name="weight"]', '5');
    await page.selectOption('select[name="typeC"]', '2');
    await page.selectOption('select[name="typeA"]', '2');
    await page.selectOption('select[name="sockets"]', '2');
    await page.selectOption('select[name="remoteUse"]', 'Wi-Fi');
    await page.fill('#dimensionsInput', '30');
    await page.fill('#dimensionsInput2', '20');
    await page.fill('#dimensionsInput3', '15');
    await page.selectOption('select[name="batteryType"]', 'LiFePO4');
    await page.selectOption('select[name="signalShape"]', 'Чиста синусоїда');
    await page.fill('input[name="price"]', '500');
    await page.fill('input[name="minRentTerm"]', '1');
    await page.fill('input[name="maxRentTerm"]', '30');
    await page.check('input[name="policyAgreement"]');
    await page.click('button.put-on-rent-button');

    await expect(page.locator('.Toastify__toast--error')).toBeVisible();
    await expect(page.locator('.Toastify__toast--error')).toHaveText(
      'Введіть назву оголошення.',
    );

    await deleteAccount(page);
  });

  test('should display error when price is invalid', async ({ page }) => {
    await registerAndLogin(page, userData);
    await page.goto('http://localhost:5173/personal-page/my-devices');

    const addDevice = page.locator('.add-device-button');
    await expect(addDevice).toBeVisible();
    await addDevice.click();

    await expect(page).toHaveURL('http://localhost:5173/rent-out');

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(
      '../EcoRent_Frontend/tests/e2e/test-image/ecorent.png',
    );
    await expect(page.locator('input[name="title"]')).toBeVisible();
    await page.fill('input[name="title"]', 'Test Power Station');
    await page.selectOption('select[name="manufacturer"]', 'Jackery');
    await page.selectOption('select[name="deviceModel"]', { index: 1 });
    await page.selectOption('select[name="condition"]', 'Новий');
    await page.fill('input[name="batteryCapacity"]', '1000');
    await page.fill('input[name="weight"]', '5');
    await page.selectOption('select[name="typeC"]', '2');
    await page.selectOption('select[name="typeA"]', '2');
    await page.selectOption('select[name="sockets"]', '2');
    await page.selectOption('select[name="remoteUse"]', 'Wi-Fi');
    await page.fill('#dimensionsInput', '30');
    await page.fill('#dimensionsInput2', '20');
    await page.fill('#dimensionsInput3', '15');
    await page.selectOption('select[name="batteryType"]', 'LiFePO4');
    await page.selectOption('select[name="signalShape"]', 'Чиста синусоїда');
    await page.fill('input[name="minRentTerm"]', '1');
    await page.fill('input[name="maxRentTerm"]', '30');
    await page.check('input[name="policyAgreement"]');
    await page.click('button.put-on-rent-button');

    await expect(page.locator('.Toastify__toast--error')).toBeVisible();
    await expect(page.locator('.Toastify__toast--error')).toHaveText(
      'Введіть ціну за добу.',
    );

    await deleteAccount(page);
  });

  test('should display error when min rent term is greater than max rent term', async ({
    page,
  }) => {
    await registerAndLogin(page, userData);
    await page.goto('http://localhost:5173/personal-page/my-devices');

    const addDevice = page.locator('.add-device-button');
    await expect(addDevice).toBeVisible();
    await addDevice.click();

    await expect(page).toHaveURL('http://localhost:5173/rent-out');

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(
      '../EcoRent_Frontend/tests/e2e/test-image/ecorent.png',
    );
    await expect(page.locator('input[name="title"]')).toBeVisible();

    await page.fill('input[name="title"]', 'Test Power Station');
    await page.selectOption('select[name="manufacturer"]', 'Jackery');
    await page.selectOption('select[name="deviceModel"]', { index: 1 });
    await page.selectOption('select[name="condition"]', 'Новий');
    await page.fill('input[name="batteryCapacity"]', '1000');
    await page.fill('input[name="weight"]', '5');
    await page.selectOption('select[name="typeC"]', '2');
    await page.selectOption('select[name="typeA"]', '2');
    await page.selectOption('select[name="sockets"]', '2');
    await page.selectOption('select[name="remoteUse"]', 'Wi-Fi');
    await page.fill('#dimensionsInput', '30');
    await page.fill('#dimensionsInput2', '20');
    await page.fill('#dimensionsInput3', '15');
    await page.selectOption('select[name="batteryType"]', 'LiFePO4');
    await page.selectOption('select[name="signalShape"]', 'Чиста синусоїда');
    await page.fill('input[name="price"]', '500');
    await page.fill('input[name="minRentTerm"]', '5');
    await page.fill('input[name="maxRentTerm"]', '1');
    await page.check('input[name="policyAgreement"]');
    await page.click('button.put-on-rent-button');

    await expect(page.locator('.Toastify__toast--error')).toBeVisible();
    await expect(page.locator('.Toastify__toast--error')).toHaveText(
      'Мінімальна тривалість оренди не може бути більшою за максимальну.',
    );

    await deleteAccount(page);
  });

  test('should display error when policy agreement is not checked', async ({
    page,
  }) => {
    await registerAndLogin(page, userData);
    await page.goto('http://localhost:5173/personal-page/my-devices');

    const addDevice = page.locator('.add-device-button');
    await expect(addDevice).toBeVisible();
    await addDevice.click();

    await expect(page).toHaveURL('http://localhost:5173/rent-out');

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(
      '../EcoRent_Frontend/tests/e2e/test-image/ecorent.png',
    );
    await expect(page.locator('input[name="title"]')).toBeVisible();

    await page.fill('input[name="title"]', 'Test Power Station');
    await page.selectOption('select[name="manufacturer"]', 'Jackery');
    await page.selectOption('select[name="deviceModel"]', { index: 1 });
    await page.selectOption('select[name="condition"]', 'Новий');
    await page.fill('input[name="batteryCapacity"]', '1000');
    await page.fill('input[name="weight"]', '5');
    await page.selectOption('select[name="typeC"]', '2');
    await page.selectOption('select[name="typeA"]', '2');
    await page.selectOption('select[name="sockets"]', '2');
    await page.selectOption('select[name="remoteUse"]', 'Wi-Fi');
    await page.fill('#dimensionsInput', '30');
    await page.fill('#dimensionsInput2', '20');
    await page.fill('#dimensionsInput3', '15');
    await page.selectOption('select[name="batteryType"]', 'LiFePO4');
    await page.selectOption('select[name="signalShape"]', 'Чиста синусоїда');
    await page.fill('input[name="price"]', '500');
    await page.fill('input[name="minRentTerm"]', '1');
    await page.fill('input[name="maxRentTerm"]', '30');
    await page.click('button.put-on-rent-button');

    await expect(page.locator('.Toastify__toast--error')).toBeVisible();
    await expect(page.locator('.Toastify__toast--error')).toHaveText(
      'Необхідно погодитися з умовами надання послуг.',
    );

    await deleteAccount(page);
  });
});
