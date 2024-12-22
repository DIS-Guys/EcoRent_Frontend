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

test.describe('Profile page', () => {
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

  test('should validate profile fields', async ({ page }) => {
    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/personal-page/cabinet/profile');

    const errorToast = page.locator('.Toastify__toast--error');
    const loginButton = page.locator('text=Log-in');
    await loginButton.click();
    await page.waitForTimeout(1000);

    await page.fill('input[type="email"]', userData.email);
    await page.fill('input[type="password"]', userData.password);

    await page.click('button[type="submit"]');

    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(
      'http://localhost:5173/personal-page/cabinet/profile'
    );

    const toastError = page.locator('.Toastify__toast--error');

    await page.locator('.edit-icon').nth(0).click();
    await page.fill('#profileNameInput', '');
    await page.click('.save-button');

    await page.waitForTimeout(500);
    await expect(toastError).toBeVisible();
    await expect(toastError).toHaveText(
      `Поля заповнені невірно: \n Ім'я є обов'язковим.`
    );

    await page.waitForTimeout(5500);
    await page.locator('.edit-icon').nth(1).click();
    await page.fill('#profileSurnameInput', '');
    await page.click('.save-button');

    await page.waitForTimeout(500);
    await expect(toastError).toBeVisible();
    await expect(toastError).toHaveText(
      `Поля заповнені невірно: \n Ім'я є обов'язковим. \n Прізвище є обов'язковим.`
    );

    await page.waitForTimeout(1000);
    await page.locator('.edit-icon').nth(0).click();
    await page.fill('#profileNameInput', 'Testname');

    await page.waitForTimeout(500);
    await page.locator('.edit-icon').nth(1).click();
    await page.fill('#profileSurnameInput', 'Testsurname');
    await page.click('.save-button');

    await page.waitForTimeout(5500);
    await page.locator('.edit-icon').nth(2).click();
    await page.fill('#profileEmailInput', 'invalid-email');
    await page.click('.save-button');

    await page.waitForTimeout(500);
    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText(
      `Поля заповнені невірно: \n Некоректний формат E-mail.`
    );

    await page.locator('.edit-icon').nth(2).click();
    await page.fill('#profileEmailInput', `${userData.email}`);
    await page.click('.save-button');

    await page.waitForTimeout(5500);
    await page.locator('.edit-icon').nth(3).click();
    await page.fill('#profilePhoneInput', '123');
    await page.click('.save-button');

    await page.waitForTimeout(500);
    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText(
      `Поля заповнені невірно: \n Некоректний формат номера телефону.`
    );
  });

  test('should cancel profile data editing', async ({ page }) => {
    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/personal-page/cabinet/profile');

    const loginButton = page.locator('text=Log-in');
    await loginButton.click();
    await page.waitForTimeout(1000);

    await page.fill('input[type="email"]', userData.email);
    await page.fill('input[type="password"]', userData.password);

    await page.click('button[type="submit"]');

    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(
      'http://localhost:5173/personal-page/cabinet/profile'
    );

    const profileName = page.locator('#profileNameInput');

    const originalName = await profileName.inputValue();

    await page.locator('.edit-icon').nth(0).click();
    await page.fill('#profileNameInput', 'AnotherName');

    const cancelButton = page.locator('text=Скасувати');
    await cancelButton.click();
    await expect(profileName).toHaveValue(originalName);
  });

  test('should logout successfully', async ({ page }) => {
    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/personal-page/cabinet/profile');

    const loginButton = page.locator('text=Log-in');
    await loginButton.click();
    await page.waitForTimeout(1000);

    await page.fill('input[type="email"]', userData.email);
    await page.fill('input[type="password"]', userData.password);

    await page.click('button[type="submit"]');

    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(
      'http://localhost:5173/personal-page/cabinet/profile'
    );

    const logoutButton = page.locator('.logout-button');
    await logoutButton.click();
    await expect(page).toHaveURL('http://localhost:5173/login');
  });

  test('should edit and save profile data', async ({ page }) => {
    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/personal-page/cabinet/profile');

    const loginButton = page.locator('text=Log-in');
    await loginButton.click();
    await page.waitForTimeout(1000);

    await page.fill('input[type="email"]', userData.email);
    await page.fill('input[type="password"]', userData.password);

    await page.click('button[type="submit"]');

    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(
      'http://localhost:5173/personal-page/cabinet/profile'
    );

    const successToast = page.locator('.Toastify__toast--success');

    await page.locator('.edit-icon').nth(0).click();
    await page.fill('#profileNameInput', 'NewTestName');
    await page.click('.save-button');

    await page.waitForTimeout(500);
    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Профіль успішно оновлено.');

    await page.waitForTimeout(5500);
    await page.locator('.edit-icon').nth(1).click();
    await page.fill('#profileSurnameInput', 'NewTestSurname');
    await page.click('.save-button');

    await page.waitForTimeout(500);
    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Профіль успішно оновлено.');

    await page.waitForTimeout(5500);
    await page.locator('.edit-icon').nth(2).click();
    let newEmail = `1` + `${userData.email}`;
    await page.fill('#profileEmailInput', newEmail);
    await page.click('.save-button');

    await page.waitForTimeout(500);
    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Профіль успішно оновлено.');

    await page.waitForTimeout(5500);
    await page.locator('.edit-icon').nth(3).click();
    await page.fill('#profilePhoneInput', '+380123456789');
    await page.click('.save-button');

    await page.waitForTimeout(500);
    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Профіль успішно оновлено.');
  });
});
