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

test.describe('Address page', () => {
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

  test('should edit and save address data successfully', async ({ page }) => {
    test.setTimeout(60000);

    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/personal-page/cabinet/profile');

    const loginButton = page.locator('text=Log-in');
    await loginButton.click();
    await page.waitForTimeout(1000);

    await page.fill('input[type="email"]', userData.email);
    await page.fill('input[type="password"]', userData.password);

    await page.click('button[type="submit"]');

    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/personal-page/cabinet/address');

    const successToast = page.locator('.Toastify__toast--success');

    await page.waitForTimeout(1000);
    await page.locator('.edit-icon').nth(0).click();
    await page.fill('#regionInput', 'Київська');
    await page.click('.save-button');

    await page.waitForTimeout(500);
    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Адреса успішно оновлена.');

    await page.waitForTimeout(5500);
    await page.locator('.edit-icon').nth(1).click();
    await page.fill('#townInput', 'Київ');
    await page.click('.save-button');

    await page.waitForTimeout(500);
    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Адреса успішно оновлена.');

    await page.waitForTimeout(5500);
    await page.locator('.edit-icon').nth(2).click();
    await page.fill('#streetInput', 'Хрещатик');
    await page.click('.save-button');

    await page.waitForTimeout(500);
    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Адреса успішно оновлена.');

    await page.waitForTimeout(5500);
    await page.locator('.edit-icon').nth(3).click();
    await page.fill('#houseNumberInput', '1');
    await page.click('.save-button');

    await page.waitForTimeout(500);
    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Адреса успішно оновлена.');

    await page.waitForTimeout(5500);
    await page.locator('.edit-icon').nth(4).click();
    await page.fill('#apartmentNumberInput', '14');
    await page.click('.save-button');

    await page.waitForTimeout(500);
    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Адреса успішно оновлена.');

    await page.waitForTimeout(5500);
    await page.locator('.edit-icon').nth(5).click();
    await page.fill('#floorInput', '3');
    await page.click('.save-button');

    await page.waitForTimeout(500);
    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Адреса успішно оновлена.');
  });

  test('should validate address fields', async ({ page }) => {
    test.setTimeout(60000);

    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/personal-page/cabinet/profile');

    const loginButton = page.locator('text=Log-in');
    await loginButton.click();
    await page.waitForTimeout(1000);

    await page.fill('input[type="email"]', userData.email);
    await page.fill('input[type="password"]', userData.password);

    await page.click('button[type="submit"]');

    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/personal-page/cabinet/address');

    const errorToast = page.locator('.Toastify__toast--error');
    const cancelButton = page.locator('text=Скасувати');

    await page.waitForTimeout(1000);
    await page.locator('.edit-icon').nth(0).click();
    await page.fill('#regionInput', '123Region');
    await page.click('.save-button');

    await page.waitForTimeout(500);
    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText(
      'Помилка при завантаженні адреси: Поле "Область" не може містити чисел. - Поле "Область" не може починатися з цифри.'
    );
    await cancelButton.click();

    await page.waitForTimeout(5500);
    await page.locator('.edit-icon').nth(1).click();
    await page.fill('#townInput', '123City');
    await page.click('.save-button');

    await page.waitForTimeout(500);
    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText(
      'Помилка при завантаженні адреси: Поле "Місто" не може починатися з цифри.'
    );
    await cancelButton.click();

    await page.waitForTimeout(5500);
    await page.locator('.edit-icon').nth(2).click();
    await page.fill('#streetInput', '3Street');
    await page.click('.save-button');

    await page.waitForTimeout(500);
    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText(
      'Помилка при завантаженні адреси: Поле "Вулиця" не може починатися з цифри.'
    );
    await cancelButton.click();

    await page.waitForTimeout(5500);
    await page.locator('.edit-icon').nth(3).click();
    await page.fill('#houseNumberInput', 'abc');
    await page.click('.save-button');

    await page.waitForTimeout(500);
    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText(
      'Помилка при завантаженні адреси: Поле "Номер будинку" повинно починатися з цифри.'
    );
    await cancelButton.click();

    await page.waitForTimeout(5500);
    await page.locator('.edit-icon').nth(4).click();
    await page.fill('#apartmentNumberInput', 'a33');
    await page.click('.save-button');

    await page.waitForTimeout(500);
    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText(
      'Помилка при завантаженні адреси: Поле "Номер квартири" повинно починатися з цифри.'
    );
    await cancelButton.click();
  });

  test('should cancel address data editing', async ({ page }) => {
    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/personal-page/cabinet/profile');

    const loginButton = page.locator('text=Log-in');
    await loginButton.click();
    await page.waitForTimeout(1000);

    await page.fill('input[type="email"]', userData.email);
    await page.fill('input[type="password"]', userData.password);

    await page.click('button[type="submit"]');

    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/personal-page/cabinet/address');

    await page.waitForTimeout(1000);
    const streetInput = page.locator('#streetInput');
    const originalStreet = await streetInput.inputValue();

    await page.locator('.edit-icon').nth(2).click();
    await page.fill('#streetInput', 'NewRegion');

    const cancelButton = page.locator('text=Скасувати');
    await cancelButton.click();

    await expect(streetInput).toHaveValue(originalStreet);
  });
});
