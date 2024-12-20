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

test.describe('User Registration and Login', () => {
  let userData: {
    name: string;
    surname: string;
    email: string;
    password: string;
  };

  test.beforeAll(() => {
    userData = generateRandomUser();
  });

  test('should register a new user', async ({ page }) => {
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

    const logoutButton = page.locator('.logout-button');
    await logoutButton.click();

    await expect(page).toHaveURL('http://localhost:5173/login');
  });

  test('should login with the registered user', async ({ page }) => {
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

    await expect(page).toHaveURL('http://localhost:5173/login');

    const loginButton = page.locator('text=Log-in');
    await loginButton.click();

    await page.fill('input[type="email"]', userData.email);
    await page.fill('input[type="password"]', userData.password);

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(
      'http://localhost:5173/personal-page/cabinet/profile'
    );

    const logoutButton = page.locator('.logout-button');
    await logoutButton.click();

    await expect(page).toHaveURL('http://localhost:5173/login');
  });

  test('should show error for invalid email format during registration', async ({
    page,
  }) => {
    await page.goto('http://localhost:5173/personal-page/cabinet/profile');

    await page.fill('input[placeholder="Ім\'я"]', userData.name);
    await page.fill('input[placeholder="Прізвище"]', userData.surname);
    await page.fill('input[placeholder="E-mail"]', 'invalid-email');
    await page.fill('input[placeholder="Пароль"]', userData.password);
    await page.fill(
      'input[placeholder="Підтвердити пароль"]',
      userData.password
    );

    await page.click('button[type="submit"]');

    const errorToast = page.locator('.Toastify__toast--error');
    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText('Невірний формат e-mail.');
  });

  test('should show error for mismatched passwords during registration', async ({
    page,
  }) => {
    await page.goto('http://localhost:5173/personal-page/cabinet/profile');

    await page.fill('input[placeholder="Ім\'я"]', userData.name);
    await page.fill('input[placeholder="Прізвище"]', userData.surname);
    await page.fill('input[placeholder="E-mail"]', userData.email);
    await page.fill('input[placeholder="Пароль"]', userData.password);
    await page.fill(
      'input[placeholder="Підтвердити пароль"]',
      'differentPassword'
    );

    await page.click('button[type="submit"]');

    const errorToast = page.locator('.Toastify__toast--error');
    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText('Паролі не збігаються.');
  });

  test('should show error for short password during registration', async ({
    page,
  }) => {
    await page.goto('http://localhost:5173/personal-page/cabinet/profile');

    await page.fill('input[placeholder="Ім\'я"]', userData.name);
    await page.fill('input[placeholder="Прізвище"]', userData.surname);
    await page.fill('input[placeholder="E-mail"]', userData.email);
    await page.fill('input[placeholder="Пароль"]', 'short');
    await page.fill('input[placeholder="Підтвердити пароль"]', 'short');

    await page.click('button[type="submit"]');

    const errorToasts = page.locator('.Toastify__toast--error');
    await expect(errorToasts).toHaveCount(2);

    await expect(errorToasts.nth(0)).toHaveText(
      'Пароль має містити щонайменше 6 символів.'
    );
    await expect(errorToasts.nth(1)).toHaveText(
      'Пароль має містити щонайменше одну літеру та одну цифру.'
    );
  });
});
