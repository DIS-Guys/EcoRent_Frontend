import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { log } from 'console';

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

  test('should update password successfully when passwords match and are valid', async ({
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
    await expect(page).toHaveURL(
      'http://localhost:5173/personal-page/cabinet/profile'
    );

    await page.goto('http://localhost:5173/personal-page/cabinet/security');
    await page.locator('.edit-icon').nth(0).click();
    await page.fill('#oldPasswordInput', userData.password);

    const newPassword = generatePassword();

    await page.locator('.edit-icon').nth(1).click();
    await page.fill('#newPasswordInput', newPassword);

    await page.locator('.edit-icon').nth(2).click();
    await page.fill('#repeatPasswordInput', newPassword);

    await page.click('button.save-button');
    const successToast = page.locator('.Toastify__toast--success');
    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Пароль успішно оновлено.');

    userData.password = newPassword;
  });

  test('should show error when passwords do not match', async ({ page }) => {
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

    await page.goto('http://localhost:5173/personal-page/cabinet/security');
    await page.locator('.edit-icon').nth(0).click();
    await page.fill('#oldPasswordInput', userData.password);

    const newPassword = generatePassword();
    await page.locator('.edit-icon').nth(1).click();
    await page.fill('#newPasswordInput', newPassword);

    await page.locator('.edit-icon').nth(2).click();
    await page.fill('#repeatPasswordInput', 'differentPassword01');

    await page.click('button.save-button');
    const errorToast = page.locator('.Toastify__toast--error');
    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText('Паролі не збігаються.');
  });

  test('should show error when new password is invalid', async ({ page }) => {
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

    await page.goto('http://localhost:5173/personal-page/cabinet/security');

    await page.locator('.edit-icon').nth(0).click();
    await page.fill('#oldPasswordInput', userData.password);

    await page.locator('.edit-icon').nth(1).click();
    await page.fill('#newPasswordInput', 'short');

    await page.locator('.edit-icon').nth(2).click();
    await page.fill('#repeatPasswordInput', 'short');

    await page.click('button.save-button');
    const errorToasts = page.locator('.Toastify__toast--error');
    await expect(errorToasts).toHaveCount(2);
    await expect(errorToasts.nth(0)).toHaveText(
      'Пароль повинен містити від 6 символів.'
    );
    await expect(errorToasts.nth(1)).toHaveText(
      'Пароль має містити щонайменше одну літеру та одну цифру.'
    );
  });

  test('should cancel account deletion', async ({ page }) => {
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

    await page.goto('http://localhost:5173/personal-page/cabinet/security');
    await page.waitForTimeout(500);

    const deleteUserButton = page.locator('.delete-user-button');
    await deleteUserButton.click();

    await page.waitForTimeout(500);
    const modal = page.locator('.modal');
    await expect(modal).toBeVisible();

    await page.waitForTimeout(500);
    const cancelButton = page.locator('.cancel-delete-button');
    await cancelButton.click();
    await expect(modal).toBeHidden();
  });

  test('should delete account successfully', async ({ page }) => {
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

    await page.goto('http://localhost:5173/personal-page/cabinet/security');
    await page.waitForTimeout(500);
    const deleteUserButton = page.locator('.delete-user-button');
    await deleteUserButton.click();

    await page.waitForTimeout(500);
    const modal = page.locator('.modal');
    await expect(modal).toBeVisible();

    await page.waitForTimeout(500);
    const deleteButton = page.locator('.accept-delete-button');
    await deleteButton.click();

    const successToast = page.locator('.Toastify__toast--success');
    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Акаунт видалено успішно.');
  });
});
