import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const generatePassword = () => {
  let password = '';
  while (!/\d/.test(password)) {
    password = faker.internet.password({
      length: 10,
      pattern: /[A-Za-z0-9]/,
    });
  }
  return password;
};

const generateRandomUser = () => {
  return {
    name: faker.person.firstName(),
    surname: faker.person.lastName(),
    email: faker.internet.email(),
    password: generatePassword(),
  };
};

test.describe('Rent out page', () => {
  let userData: {
    name: string;
    surname: string;
    email: string;
    password: string;
  };

  test.beforeAll(() => {
    userData = generateRandomUser();
  });

  test('should register and login a new user', async ({ page }) => {
    await page.goto('http://localhost:5173/personal-page/cabinet/profile');
    await page.fill('input[placeholder="Ім\'я"]', userData.name);
    await page.fill('input[placeholder="Прізвище"]', userData.surname);
    await page.fill('input[placeholder="E-mail"]', userData.email);
    await page.fill('input[placeholder="Пароль"]', userData.password);
    await page.fill(
      'input[placeholder="Підтвердити пароль"]',
      userData.password
    );
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(
      'http://localhost:5173/personal-page/cabinet/profile'
    );
  });

  test('should display validation errors when submitting empty form', async ({
    page,
  }) => {
    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/personal-page/cabinet/profile');

    const loginButton = page.locator('text=Log-in');
    await loginButton.click();
    await page.waitForTimeout(1000);

    await page.fill('input[type="email"]', userData.email);
    await page.fill('input[type="password"]', userData.password);
    await page.click('button[type="submit"]');

    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/personal-page/my-devices');

    await page.waitForTimeout(1000);
    const addDevice = page.locator('.add-device-button');
    await addDevice.click();

    await page.waitForTimeout(1000);
    await expect(page).toHaveURL('http://localhost:5173/rent-out');
    await page.waitForTimeout(500);
    await page.click('button.put-on-rent-button');

    await page.waitForTimeout(500);
    const errorToast = page.locator('.Toastify__toast--error');
    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText("Заповніть обов'язкові поля!");
  });

  test('should display error when no images are uploaded', async ({ page }) => {
    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/personal-page/cabinet/profile');

    const loginButton = page.locator('text=Log-in');
    await loginButton.click();
    await page.waitForTimeout(1000);

    await page.fill('input[type="email"]', userData.email);
    await page.fill('input[type="password"]', userData.password);
    await page.click('button[type="submit"]');

    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/personal-page/my-devices');

    await page.waitForTimeout(1000);
    const addDevice = page.locator('.add-device-button');
    await addDevice.click();

    await page.waitForTimeout(1000);
    await expect(page).toHaveURL('http://localhost:5173/rent-out');

    await page.waitForTimeout(1000);
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

    await page.waitForTimeout(500);
    await expect(page.locator('.Toastify__toast--error')).toBeVisible();
    await expect(page.locator('.Toastify__toast--error')).toHaveText(
      'Додайте принаймні одне зображення.'
    );
  });

  test('should display error when title is empty', async ({ page }) => {
    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/personal-page/cabinet/profile');

    const loginButton = page.locator('text=Log-in');
    await loginButton.click();
    await page.waitForTimeout(1000);

    await page.fill('input[type="email"]', userData.email);
    await page.fill('input[type="password"]', userData.password);
    await page.click('button[type="submit"]');

    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/personal-page/my-devices');

    await page.waitForTimeout(1000);
    const addDevice = page.locator('.add-device-button');
    await addDevice.click();

    await page.waitForTimeout(1000);
    await expect(page).toHaveURL('http://localhost:5173/rent-out');

    await page.waitForTimeout(1000);
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(
      '../EcoRent_Frontend/tests/e2e/test-image/ecorent.png'
    );

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

    await page.waitForTimeout(500);
    await expect(page.locator('.Toastify__toast--error')).toBeVisible();
    await expect(page.locator('.Toastify__toast--error')).toHaveText(
      'Введіть назву оголошення.'
    );
  });

  test('should display error when price is invalid', async ({ page }) => {
    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/personal-page/cabinet/profile');

    const loginButton = page.locator('text=Log-in');
    await loginButton.click();
    await page.waitForTimeout(1000);

    await page.fill('input[type="email"]', userData.email);
    await page.fill('input[type="password"]', userData.password);
    await page.click('button[type="submit"]');

    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/personal-page/my-devices');

    await page.waitForTimeout(1000);
    const addDevice = page.locator('.add-device-button');
    await addDevice.click();

    await page.waitForTimeout(1000);
    await expect(page).toHaveURL('http://localhost:5173/rent-out');

    await page.waitForTimeout(1000);
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(
      '../EcoRent_Frontend/tests/e2e/test-image/ecorent.png'
    );
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

    await page.waitForTimeout(500);
    await expect(page.locator('.Toastify__toast--error')).toBeVisible();
    await expect(page.locator('.Toastify__toast--error')).toHaveText(
      'Введіть ціну за добу.'
    );
  });

  test('should display error when min rent term is greater than max rent term', async ({
    page,
  }) => {
    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/personal-page/cabinet/profile');

    const loginButton = page.locator('text=Log-in');
    await loginButton.click();
    await page.waitForTimeout(1000);

    await page.fill('input[type="email"]', userData.email);
    await page.fill('input[type="password"]', userData.password);
    await page.click('button[type="submit"]');

    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/personal-page/my-devices');

    await page.waitForTimeout(1000);
    const addDevice = page.locator('.add-device-button');
    await addDevice.click();

    await page.waitForTimeout(1000);
    await expect(page).toHaveURL('http://localhost:5173/rent-out');

    await page.waitForTimeout(1000);
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(
      '../EcoRent_Frontend/tests/e2e/test-image/ecorent.png'
    );

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

    await page.waitForTimeout(500);
    await expect(page.locator('.Toastify__toast--error')).toBeVisible();
    await expect(page.locator('.Toastify__toast--error')).toHaveText(
      'Мінімальна тривалість оренди не може бути більшою за максимальну.'
    );
  });

  test('should display error when policy agreement is not checked', async ({
    page,
  }) => {
    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/personal-page/cabinet/profile');

    const loginButton = page.locator('text=Log-in');
    await loginButton.click();
    await page.waitForTimeout(1000);

    await page.fill('input[type="email"]', userData.email);
    await page.fill('input[type="password"]', userData.password);
    await page.click('button[type="submit"]');

    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/personal-page/my-devices');

    await page.waitForTimeout(1000);
    const addDevice = page.locator('.add-device-button');
    await addDevice.click();

    await page.waitForTimeout(1000);
    await expect(page).toHaveURL('http://localhost:5173/rent-out');

    await page.waitForTimeout(1000);
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(
      '../EcoRent_Frontend/tests/e2e/test-image/ecorent.png'
    );

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

    await page.waitForTimeout(500);
    await expect(page.locator('.Toastify__toast--error')).toBeVisible();
    await expect(page.locator('.Toastify__toast--error')).toHaveText(
      'Необхідно погодитися з умовами надання послуг.'
    );
  });
});
