import { test, expect } from '@playwright/test';
import {
  generateRandomUser,
  registerAndLogin,
  login,
  tryDeleteAccount,
} from '../e2e/test-helper';
import type { UserData } from '../e2e/test-helper';

test.describe('My devices page', () => {
  let userData: UserData;

  test.beforeEach(async () => {
    userData = generateRandomUser();
  });

  test.afterEach(async ({ page }) => {
    await tryDeleteAccount(page);
  });

  test('should display validation errors when submitting empty form', async ({
    page,
  }) => {
    await registerAndLogin(page, userData);
    await page.goto('/personal-page/my-devices');

    const addDevice = page.locator('.add-device-button');
    await expect(addDevice).toBeVisible();
    await addDevice.click();

    await expect(page).toHaveURL(/\/rent-out$/);
    await page.click('button.put-on-rent-button');

    const errorToast = page.locator('.Toastify__toast--error');
    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText("Заповніть обов'язкові поля!");
  });

  test('should successfully create device listing', async ({ page }) => {
    await registerAndLogin(page, userData);
    await page.goto('/personal-page/my-devices');

    const addDevice = page.locator('.add-device-button');
    await expect(addDevice).toBeVisible();
    await addDevice.click();

    await expect(page).toHaveURL(/\/rent-out$/);

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles('tests/e2e/fixtures/device-image.svg');

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

    await expect(page).toHaveURL(/\/personal-page\/my-devices$/);
  });

  test('should view device details with correct ID', async ({ page }) => {
    await registerAndLogin(page, userData);
    await page.goto('/personal-page/my-devices');

    const addDevice = page.locator('.add-device-button');
    await expect(addDevice).toBeVisible();
    await addDevice.click();

    await expect(page).toHaveURL(/\/rent-out$/);

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles('tests/e2e/fixtures/device-image.svg');

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

    await expect(page.locator('.review-device-button')).toBeVisible();
    const deviceLink = await page
      .locator('.review-device-button')
      .getAttribute('href');
    const deviceId = deviceLink?.split('/rent/')[1];
    await page.goto(`/rent/${deviceId}`);

    await expect(page.locator('.device-page-name-title')).toHaveText(
      'Test Power Station',
    );
    await expect(page).toHaveURL(new RegExp(`/rent/${deviceId}$`));
  });

  test('should delete device successfully', async ({ page }) => {
    await registerAndLogin(page, userData);
    await page.goto('/personal-page/my-devices');

    const addDevice = page.locator('.add-device-button');
    await expect(addDevice).toBeVisible();
    await addDevice.click();

    await expect(page).toHaveURL(/\/rent-out$/);

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles('tests/e2e/fixtures/device-image.svg');

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

    const deleteButton = page.locator('.delete-device-button');
    await expect(deleteButton).toBeVisible();
    await deleteButton.click();

    const successToast = page.locator('.Toastify__toast--success');
    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Пристрій видалено успішно.');
  });
});
