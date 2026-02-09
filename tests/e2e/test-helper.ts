import { Page, Locator, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export interface UserData {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export const generatePassword = () => {
  let password = '';
  while (!/\d/.test(password)) {
    password = faker.internet.password({
      length: 10,
      pattern: /[A-Za-z0-9]/,
    });
  }
  return password;
};

export const generateRandomUser = (): UserData => ({
  name: faker.person.firstName(),
  surname: faker.person.lastName(),
  email: faker.internet.email(),
  password: generatePassword(),
});

export async function registerAndLogin(page: Page, userData: UserData) {
  await page.goto('http://localhost:5173/personal-page/cabinet/profile');

  await page.fill('input[placeholder="Ім\'я"]', userData.name);
  await page.fill('input[placeholder="Прізвище"]', userData.surname);
  await page.fill('input[placeholder="E-mail"]', userData.email);
  await page.fill('input[placeholder="Пароль"]', userData.password);
  await page.fill('input[placeholder="Підтвердити пароль"]', userData.password);

  const [response] = await Promise.all([
    page.waitForResponse((resp) => resp.url().includes('/api/auth/register'), {
      timeout: 15000,
    }),
    page.click('button[type="submit"]'),
  ]);

  if (!response.ok()) {
    const body = await response.json().catch(() => ({}));
    throw new Error(
      `Registration failed (${response.status()}): ${body.message || 'Unknown error'}`,
    );
  }

  await page.waitForURL('http://localhost:5173/personal-page/cabinet/profile');
}

export async function login(page: Page, email: string, password: string) {
  await page.goto('http://localhost:5173/personal-page/cabinet/profile');
  const loginButton = page.locator('text=Log-in');
  await loginButton.click();

  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);
  await page.click('button[type="submit"]');

  await page.waitForURL('http://localhost:5173/personal-page/cabinet/profile');
}

export async function waitForToastToDisappear(
  page: Page,
  toastLocator: Locator,
  timeout = 10000,
) {
  await page.mouse.move(0, 0);
  await expect(toastLocator).toHaveCount(0, { timeout });
}

export async function tryDeleteAccount(page: Page) {
  try {
    await page.goto('http://localhost:5173/personal-page/cabinet/security', {
      timeout: 5000,
    });
    const deleteUserButton = page.locator('.delete-user-button');
    await deleteUserButton.click({ timeout: 3000 });
    const modal = page.locator('.modal');
    await expect(modal).toBeVisible({ timeout: 3000 });
    const deleteButton = page.locator('.accept-delete-button');
    await deleteButton.click({ timeout: 3000 });
    await page.waitForURL('http://localhost:5173/login', { timeout: 5000 });
  } catch {
    // User may already be deleted or test didn't create one
  }
}

export async function deleteAccount(page: Page) {
  await page.goto('http://localhost:5173/personal-page/cabinet/security');

  const deleteUserButton = page.locator('.delete-user-button');
  await deleteUserButton.click();

  const modal = page.locator('.modal');
  await expect(modal).toBeVisible();

  const deleteButton = page.locator('.accept-delete-button');
  await deleteButton.click();

  const successToast = page.locator('.Toastify__toast--success');
  await expect(successToast).toBeVisible();
  await expect(successToast).toHaveText('Акаунт видалено успішно.');

  await page.waitForURL('http://localhost:5173/login');
}
