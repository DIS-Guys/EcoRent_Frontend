import { test, expect } from '@playwright/test';

test.describe('Support Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/support');
  });

  test('should display the support form', async ({ page }) => {
    await page.waitForTimeout(500);
    const emailInput = page.locator('#supportEmail');
    const messageTextarea = page.locator('#supportTextArea');
    const sendButton = page.locator('.support-send-button');

    await expect(emailInput).toBeVisible();
    await expect(messageTextarea).toBeVisible();
    await expect(sendButton).toBeVisible();
  });

  test('should show error for invalid email', async ({ page }) => {
    await page.waitForTimeout(500);
    await page.fill('#supportEmail', 'invalid-email');
    await page.fill('#supportTextArea', 'This is a test message.');
    await page.click('.support-send-button');

    const toastError = page.locator('.Toastify__toast--error');
    await page.waitForTimeout(1000);
    await expect(toastError).toBeVisible();
    await expect(toastError).toHaveText(
      'Введіть правильний email.'
    );
  });

  test('should show error for empty message', async ({ page }) => {
    await page.waitForTimeout(500);
    await page.fill('#supportEmail', 'user@example.com');
    await page.fill('#supportTextArea', '');
    await page.click('.support-send-button');

    const toastError = page.locator('.Toastify__toast--error');
    await page.waitForTimeout(1000);
    await expect(toastError).toBeVisible();
    await expect(toastError).toHaveText(
      'Помилка при відправленні повідомлення.'
    );
  });

  test('should send support request successfully', async ({ page }) => {
    await page.waitForTimeout(500);
    await page.fill('#supportEmail', 'user@example.com');
    await page.fill('#supportTextArea', 'This is a test message.');
    await page.click('.support-send-button');

    const toastSuccess = page.locator('.Toastify__toast--success');
    await page.waitForTimeout(1000);
    await expect(toastSuccess).toBeVisible();
    await expect(toastSuccess).toHaveText('Запит відправлено.');
  });

  test('should clear inputs after successful submission', async ({ page }) => {
    await page.waitForTimeout(500);
    await page.fill('#supportEmail', 'user@example.com');
    await page.fill('#supportTextArea', 'This is a test message.');
    await page.click('.support-send-button');

    await expect(page.locator('#supportEmail')).toHaveValue('');
    await expect(page.locator('#supportTextArea')).toHaveValue('');
  });
});
