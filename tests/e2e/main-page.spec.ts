import { test, expect } from '@playwright/test';
import { faker, ur } from '@faker-js/faker';
import { url } from 'inspector';

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

let userData: {
  name: string;
  surname: string;
  email: string;
  password: string;
};

test.beforeAll(() => {
  userData = generateRandomUser();
});

test.describe('Main Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
  });

  test('should display the main search input', async ({ page }) => {
    const searchInput = page.locator('.main-search');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toHaveAttribute(
      'placeholder',
      'Який зарядний пристрій шукаєте?'
    );
  });

  test('should navigate to rent page with search query', async ({ page }) => {
    const searchInput = page.locator('.main-search');
    const searchButton = page.locator('.search-button');

    await searchInput.fill('EcoFlow');
    await searchButton.click();
    await expect(page).toHaveURL('http://localhost:5173/rent');

    await page.waitForTimeout(1000);
    const deviceCards = page.locator('.device-card');
    const count = await deviceCards.count();
    expect(count).toBeGreaterThan(0);

    await expect(searchInput).toHaveValue('EcoFlow');
  });

  test('should display about us section', async ({ page }) => {
    const aboutUsHeader = page.locator('.about-us-header-text');
    const aboutUsDetailed = page.locator('.about-us-detailed-text');
    const aboutUsService = page.locator('.about-us-service-text');

    await expect(aboutUsHeader).toBeVisible();
    await expect(aboutUsDetailed).toBeVisible();
    await expect(aboutUsService).toBeVisible();
  });

  test('should have rent and rent out buttons', async ({ page }) => {
    const rentButton = page.locator('text=Хочу орендувати!');
    const rentOutButton = page.locator('text=Здати в оренду!');

    await expect(rentButton).toBeVisible();
    await expect(rentOutButton).toBeVisible();
  });

  test('should navigate to rent page on rent button click', async ({
    page,
  }) => {
    const rentButton = page.locator('text=Хочу орендувати!');
    await rentButton.click();
    await expect(page).toHaveURL('http://localhost:5173/rent');
  });

  test('should navigate to personal devices page on rent out button click', async ({
    page,
  }) => {
    const rentOutButton = page.locator('text=Здати в оренду!');
    await rentOutButton.click();

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
      'http://localhost:5173/personal-page/my-devices'
    );

    const addDeviceButton = page.locator('text=Додати пристрій');
    await expect(addDeviceButton).toBeVisible();
  });
});
