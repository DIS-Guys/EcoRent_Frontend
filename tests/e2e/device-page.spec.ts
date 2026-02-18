import { test, expect, type Page } from '@playwright/test';
import {
  generateRandomUser,
  registerAndLogin,
  tryDeleteAccount,
  createDeviceListing,
} from '../e2e/test-helper';
import type { UserData } from '../e2e/test-helper';

test.describe('Device Page', () => {
  let userData: UserData;

  test.beforeEach(async () => {
    userData = generateRandomUser();
  });

  test.afterEach(async ({ page }) => {
    await tryDeleteAccount(page);
  });

  const openCreatedDevicePage = async (page: Page) => {
    await registerAndLogin(page, userData);
    const createdDevice = await createDeviceListing(page);

    await page.goto(`/rent/${createdDevice.id}`);
    await expect(page).toHaveURL(new RegExp(`/rent/${createdDevice.id}$`));

    return createdDevice;
  };

  test('should display device details for a created listing', async ({
    page,
  }) => {
    const createdDevice = await openCreatedDevicePage(page);

    await expect(page.locator('img[alt="Main device picture"]')).toBeVisible();
    await expect(
      page.getByRole('heading', { name: createdDevice.title }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Характеристики' }),
    ).toBeVisible();
  });

  test('should open lightbox on image click', async ({ page }) => {
    await openCreatedDevicePage(page);

    const mainImage = page.locator('img[alt="Main device picture"]');
    await expect(mainImage).toBeVisible();
    await mainImage.click();

    await expect(page.locator('.pswp__container')).toBeVisible();
  });

  test('should open and close rent modal', async ({ page }) => {
    await openCreatedDevicePage(page);

    await page.getByRole('button', { name: 'Орендувати' }).click();

    const modal = page.locator('.modal-content');
    await expect(modal).toBeVisible();

    await page.getByRole('button', { name: 'Закрити' }).click();
    await expect(modal).toBeHidden();
  });
});
