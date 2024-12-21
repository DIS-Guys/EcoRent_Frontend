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

const MAX_CARDS = 8;

test.describe('Payment page', () => {
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

  test('should add a new payment card successfully', async ({ page }) => {
    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/personal-page/cabinet/profile');

    const loginButton = page.locator('text=Log-in');
    await loginButton.click();
    await page.waitForTimeout(1000);

    await page.fill('input[type="email"]', userData.email);
    await page.fill('input[type="password"]', userData.password);
    await page.click('button[type="submit"]');

    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/personal-page/cabinet/payment');

    await page.waitForTimeout(1000);
    const addCard = page.locator('.add-button');
    await addCard.click();

    await page.fill('#cardNumberInput', '4441803414882167');
    await page.fill('#ownerNameInput', 'Test User');
    await page.fill('#expirationDateInput', '12/25');

    await page.click('button.save-button');

    const cardElement = page.locator('.user-payment-card');
    await expect(cardElement).toBeVisible();
    await expect(cardElement.locator('.user-payment-card-text')).toContainText(
      'Visa **** 2167'
    );
  });

  test('should validate card input fields', async ({ page }) => {
    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/personal-page/cabinet/profile');

    const loginButton = page.locator('text=Log-in');
    await loginButton.click();
    await page.waitForTimeout(1000);

    await page.fill('input[type="email"]', userData.email);
    await page.fill('input[type="password"]', userData.password);
    await page.click('button[type="submit"]');

    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/personal-page/cabinet/payment');

    await page.waitForTimeout(1000);
    const addCard = page.locator('.add-button');
    await addCard.click();

    const errorToast = page.locator('.Toastify__toast--error');

    await page.fill('#cardNumberInput', '1234');
    await page.fill('#ownerNameInput', 'Test User');
    await page.fill('#expirationDateInput', '12/25');
    await page.click('button.save-button');

    await page.waitForTimeout(500);
    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText(
      'Номер картки повинен містити 16 цифр.'
    );

    await page.waitForTimeout(5500);
    await page.fill('#cardNumberInput', '4441803414882167');
    await page.fill('#expirationDateInput', '13/25');
    await page.click('button.save-button');

    await page.waitForTimeout(500);
    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText(
      'Неправильний формат дати або термін картки минув.'
    );

    await page.waitForTimeout(5500);
    await page.fill('#expirationDateInput', '12/25');
    await page.fill('#ownerNameInput', '');
    await page.click('button.save-button');

    await page.waitForTimeout(500);
    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText("Ім'я власника не може бути порожнім.");
  });

  test('should delete payment card', async ({ page }) => {
    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/personal-page/cabinet/profile');

    const loginButton = page.locator('text=Log-in');
    await loginButton.click();
    await page.waitForTimeout(1000);

    await page.fill('input[type="email"]', userData.email);
    await page.fill('input[type="password"]', userData.password);
    await page.click('button[type="submit"]');

    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/personal-page/cabinet/payment');

    await page.waitForTimeout(1000);
    const addCard = page.locator('.add-button');
    await addCard.click();

    await page.fill('#cardNumberInput', '4441803414882167');
    await page.fill('#ownerNameInput', 'Test User');
    await page.fill('#expirationDateInput', '12/25');
    await page.click('.save-button');

    await page.waitForTimeout(1000);
    await page.click('.delete-payment-card-button');

    await page.waitForTimeout(500);
    const successToast = page.locator('.Toastify__toast--success');
    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Картку видалено успішно.');

    await page.waitForTimeout(500);
    const cardElement = page.locator('.user-payment-card');
    await expect(cardElement).toHaveCount(1);
  });

  test('should limit maximum number of cards to 9', async ({ page }) => {
    test.setTimeout(60000);

    await page.goto('http://localhost:5173/personal-page/cabinet/profile');

    const loginButton = page.locator('text=Log-in');
    await loginButton.click();
    await page.waitForTimeout(1000);

    await page.fill('input[type="email"]', userData.email);
    await page.fill('input[type="password"]', userData.password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);

    await page.goto('http://localhost:5173/personal-page/cabinet/payment');
    await page.waitForTimeout(1000);

    for (let i = 0; i < MAX_CARDS; i++) {
      const addCard = page.locator('.add-button');
      await addCard.click();
      await page.waitForTimeout(500);

      await page.fill('#cardNumberInput', '4441803414882167');
      await page.fill('#ownerNameInput', `Test User ${i + 1}`);
      await page.fill('#expirationDateInput', '12/25');
      await page.click('.save-button');

      await page.waitForTimeout(1000);
    }

    const addCard = page.locator('.add-button');
    await addCard.click();
    await page.waitForTimeout(500);

    await page.fill('#cardNumberInput', '4441803414882167');
    await page.fill('#ownerNameInput', 'Test User 10');
    await page.fill('#expirationDateInput', '12/25');
    await page.click('.save-button');

    await page.waitForTimeout(500);
    const errorToast = page.locator('.Toastify__toast--error');
    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText('Не можна додати більше 9 карток.');
  });

  test('should handle card type detection correctly', async ({ page }) => {
    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/personal-page/cabinet/profile');

    const loginButton = page.locator('text=Log-in');
    await loginButton.click();
    await page.waitForTimeout(1000);

    await page.fill('input[type="email"]', userData.email);
    await page.fill('input[type="password"]', userData.password);
    await page.click('button[type="submit"]');

    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/personal-page/cabinet/payment');

    await page.waitForTimeout(1000);

    for (let i = 0; i < MAX_CARDS + 1; i++) {
      await page.click('.delete-payment-card-button');
      await page.waitForTimeout(500);
    }
    await page.waitForTimeout(5500);

    const addCard = page.locator('.add-button');
    await addCard.click();

    await page.waitForTimeout(500);
    await page.fill('#cardNumberInput', '4441803414882167');
    await page.fill('#ownerNameInput', 'Test User');
    await page.fill('#expirationDateInput', '12/25');
    await page.click('.save-button');

    await page.waitForTimeout(5000);
    const visaCard = page.locator('.user-payment-card').first();
    await expect(visaCard.locator('img[alt="Payment system"]')).toHaveAttribute(
      'src',
      '/icons/visa.svg'
    );
    await expect(visaCard.locator('.user-payment-card-text')).toContainText(
      'Visa'
    );

    await page.click('.delete-payment-card-button');

    await page.waitForTimeout(500);
    await page.click('.add-button');
    await page.fill('#cardNumberInput', '5441803414882167');
    await page.fill('#ownerNameInput', 'Test User');
    await page.fill('#expirationDateInput', '12/25');
    await page.click('.save-button');

    await page.waitForTimeout(5000);
    const masterCard = page.locator('.user-payment-card').first();
    await expect(
      masterCard.locator('img[alt="Payment system"]')
    ).toHaveAttribute('src', '/icons/master-card.svg');
    await expect(masterCard.locator('.user-payment-card-text')).toContainText(
      'MasterCard'
    );
  });
});
