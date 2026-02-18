import { test, expect } from '@playwright/test';
import {
  generateRandomUser,
  registerAndLogin,
  login,
  waitForToastToDisappear,
  tryDeleteAccount,
} from '../e2e/test-helper';
import type { UserData } from '../e2e/test-helper';

const MAX_CARDS = 9;

const getValidExpiryDate = (yearsAhead = 1) => {
  const now = new Date();
  const year = (now.getFullYear() + yearsAhead) % 100;
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${month}/${String(year).padStart(2, '0')}`;
};

const getUniqueVisaCardNumber = () => {
  const suffix = `${Date.now()}${Math.floor(Math.random() * 1000)}`
    .slice(-15)
    .padStart(15, '0');

  return `4${suffix}`;
};

test.describe('Payment page', () => {
  let userData: UserData;

  test.beforeEach(async () => {
    userData = generateRandomUser();
  });

  test.afterEach(async ({ page }) => {
    await tryDeleteAccount(page);
  });

  test('should add a new payment card successfully', async ({ page }) => {
    await registerAndLogin(page, userData);
    await page.goto('/personal-page/cabinet/payment');
    await expect(page.locator('.add-button')).toBeVisible();

    const validExpiryDate = getValidExpiryDate();
    const addCard = page.locator('.add-button');
    await addCard.click();
    await expect(page.locator('#cardNumberInput')).toBeVisible();

    await page.fill('#cardNumberInput', '4441803414882167');
    await page.fill('#ownerNameInput', 'Test User');
    await page.fill('#expirationDateInput', validExpiryDate);

    await page.click('button.save-button');
    await page.waitForURL(/\/personal-page\/cabinet\/payment$/);

    const cardElement = page.locator('.user-payment-card');
    await expect(cardElement).toBeVisible();
    await expect(cardElement.locator('.user-payment-card-text')).toContainText(
      'Visa **** 2167',
    );
  });

  test('should validate card input fields', async ({ page }) => {
    await registerAndLogin(page, userData);
    await page.goto('/personal-page/cabinet/payment');
    await expect(page.locator('.add-button')).toBeVisible();

    const validExpiryDate = getValidExpiryDate();
    const invalidExpiryDate = `13/${validExpiryDate.split('/')[1]}`;
    const addCard = page.locator('.add-button');
    await addCard.click();
    await expect(page.locator('#cardNumberInput')).toBeVisible();

    const errorToast = page.locator('.Toastify__toast--error');

    await page.fill('#cardNumberInput', '1234');
    await page.fill('#ownerNameInput', 'Test User');
    await page.fill('#expirationDateInput', validExpiryDate);
    await page.click('button.save-button');

    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText(
      'Номер картки повинен містити 16 цифр.',
    );

    await waitForToastToDisappear(page, errorToast);
    await page.fill('#cardNumberInput', '4441803414882167');
    await page.fill('#expirationDateInput', invalidExpiryDate);
    await page.click('button.save-button');

    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText(
      'Неправильний формат дати або термін картки минув.',
    );

    await waitForToastToDisappear(page, errorToast);
    await page.fill('#expirationDateInput', validExpiryDate);
    await page.fill('#ownerNameInput', '');
    await page.click('button.save-button');

    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText("Ім'я власника не може бути порожнім.");
  });

  test('should delete payment card', async ({ page }) => {
    await registerAndLogin(page, userData);
    await page.goto('/personal-page/cabinet/payment');
    await expect(page.locator('.add-button')).toBeVisible();

    const validExpiryDate = getValidExpiryDate();
    const uniqueCardNumber = getUniqueVisaCardNumber();
    const uniqueCardLast4 = uniqueCardNumber.slice(-4);
    const addCard = page.locator('.add-button');
    await addCard.click();
    await expect(page.locator('#cardNumberInput')).toBeVisible();

    await page.fill('#cardNumberInput', uniqueCardNumber);
    await page.fill('#ownerNameInput', 'Test User');
    await page.fill('#expirationDateInput', validExpiryDate);
    await page.click('.save-button');
    await page.waitForURL(/\/personal-page\/cabinet\/payment$/);

    const addedCard = page
      .locator('.user-payment-card')
      .filter({ hasText: `Visa **** ${uniqueCardLast4}` });
    await expect(addedCard).toHaveCount(1);

    await Promise.all([
      page.waitForResponse(
        (response) =>
          response.request().method() === 'DELETE' &&
          response.url().includes('/api/paymentCards/deletePaymentCard/') &&
          response.ok(),
      ),
      addedCard.locator('.delete-payment-card-button').click(),
    ]);

    const successToast = page.locator('.Toastify__toast--success');
    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Картку видалено успішно.');

    await expect(addedCard).toHaveCount(0);
  });

  test('should limit maximum number of cards to 9', async ({ page }) => {
    test.setTimeout(60000);

    await registerAndLogin(page, userData);
    await page.goto('/personal-page/cabinet/payment');
    await expect(page.locator('.add-button')).toBeVisible();

    const validExpiryDate = getValidExpiryDate();
    for (let i = 0; i < MAX_CARDS; i++) {
      const addCard = page.locator('.add-button');
      await addCard.click();
      await expect(page.locator('#cardNumberInput')).toBeVisible();

      await page.fill('#cardNumberInput', '4441803414882167');
      await page.fill('#ownerNameInput', `Test User ${i + 1}`);
      await page.fill('#expirationDateInput', validExpiryDate);
      await page.click('.save-button');

      await page.waitForURL(/\/personal-page\/cabinet\/payment$/);
      await expect(page.locator('.user-payment-card')).toHaveCount(i + 1);
    }

    const addCard = page.locator('.add-button');
    await addCard.click();
    await expect(page.locator('#cardNumberInput')).toBeVisible();

    await page.fill('#cardNumberInput', '4441803414882167');
    await page.fill('#ownerNameInput', 'Test User 10');
    await page.fill('#expirationDateInput', validExpiryDate);
    await page.click('.save-button');

    const errorToast = page.locator('.Toastify__toast--error');
    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText('Не можна додати більше 9 карток.');
  });

  test('should handle card type detection correctly', async ({ page }) => {
    await registerAndLogin(page, userData);
    await page.goto('/personal-page/cabinet/payment');
    await expect(page.locator('.add-button')).toBeVisible();

    const validExpiryDate = getValidExpiryDate();
    const addCard = page.locator('.add-button');
    await addCard.click();

    await expect(page.locator('#cardNumberInput')).toBeVisible();
    await page.fill('#cardNumberInput', '4441803414882167');
    await page.fill('#ownerNameInput', 'Test User');
    await page.fill('#expirationDateInput', validExpiryDate);
    await page.click('.save-button');

    await page.waitForURL(/\/personal-page\/cabinet\/payment$/);
    const visaCard = page.locator('.user-payment-card').first();
    await expect(visaCard.locator('img[alt="Payment system"]')).toHaveAttribute(
      'src',
      '/icons/visa.svg',
    );
    await expect(visaCard.locator('.user-payment-card-text')).toContainText(
      'Visa',
    );

    await page.click('.delete-payment-card-button');

    const successToast = page.locator('.Toastify__toast--success');
    await expect(successToast).toBeVisible();
    await expect(page.locator('.user-payment-card')).toHaveCount(0);
    await waitForToastToDisappear(page, successToast);

    await page.click('.add-button');
    await expect(page.locator('#cardNumberInput')).toBeVisible();
    await page.fill('#cardNumberInput', '5441803414882167');
    await page.fill('#ownerNameInput', 'Test User');
    await page.fill('#expirationDateInput', validExpiryDate);
    await page.click('.save-button');

    await page.waitForURL(/\/personal-page\/cabinet\/payment$/);
    const masterCard = page.locator('.user-payment-card').first();
    await expect(
      masterCard.locator('img[alt="Payment system"]'),
    ).toHaveAttribute('src', '/icons/master-card.svg');
    await expect(masterCard.locator('.user-payment-card-text')).toContainText(
      'MasterCard',
    );
  });
});
