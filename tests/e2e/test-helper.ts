import { Page, Locator, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export interface UserData {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface DeviceDraft {
  title: string;
  manufacturer: string;
  deviceModel: string;
  condition: string;
  batteryCapacity: string;
  weight: string;
  typeC: string;
  typeA: string;
  sockets: string;
  remoteUse: string;
  length: string;
  width: string;
  height: string;
  batteryType: string;
  signalShape: string;
  price: string;
  minRentTerm: string;
  maxRentTerm: string;
}

export interface CreatedDeviceDraft extends DeviceDraft {
  id: string;
}

const DEVICE_IMAGE_PATH = 'tests/e2e/fixtures/device-image.svg';

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

export const generateDeviceDraft = (
  overrides: Partial<DeviceDraft> = {},
): DeviceDraft => ({
  title: `E2E Device ${Date.now()}`,
  manufacturer: 'S&O LAB',
  deviceModel: 'G1200',
  condition: 'Новий',
  batteryCapacity: '1000',
  weight: '5',
  typeC: '2',
  typeA: '2',
  sockets: '2',
  remoteUse: 'Wi-Fi',
  length: '30',
  width: '20',
  height: '15',
  batteryType: 'LiFePO4',
  signalShape: 'Чиста синусоїда',
  price: '777',
  minRentTerm: '1',
  maxRentTerm: '30',
  ...overrides,
});

export async function registerAndLogin(page: Page, userData: UserData) {
  await page.goto('/personal-page/cabinet/profile');

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

  await page.waitForURL(/\/personal-page\/cabinet\/profile$/);
}

export async function login(page: Page, email: string, password: string) {
  await page.goto('/personal-page/cabinet/profile');
  const loginButton = page.locator('text=Log-in');
  await loginButton.click();

  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);
  await page.click('button[type="submit"]');

  await page.waitForURL(/\/personal-page\/cabinet\/profile$/);
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
  if (page.isClosed()) {
    return;
  }

  await page.goto('/personal-page/cabinet/security', { timeout: 5000 });

  const currentUrl = page.url();
  const isSecurityPage = /\/personal-page\/cabinet\/security(?:$|[?#])/.test(
    currentUrl,
  );
  const isUnauthenticatedRedirect =
    /\/(?:login|personal-page(?:\/cabinet\/profile)?)(?:$|[?#])/.test(
      currentUrl,
    );

  // Cleanup should be a no-op only when there is no authenticated user.
  if (!isSecurityPage && isUnauthenticatedRedirect) {
    return;
  }

  if (!isSecurityPage) {
    throw new Error(
      `[tryDeleteAccount] Unexpected redirect during cleanup: ${currentUrl}`,
    );
  }

  const deleteUserButton = page.locator('.delete-user-button');
  const authButtons = page.getByRole('button', {
    name: /Sign-up|Log-in|Зареєструватись|Увійти/i,
  });

  await Promise.race([
    deleteUserButton.first().waitFor({ state: 'visible', timeout: 3000 }),
    authButtons.first().waitFor({ state: 'visible', timeout: 3000 }),
  ]).catch(() => {});

  const isAuthPage =
    (await authButtons
      .first()
      .isVisible()
      .catch(() => false)) ||
    (await page
      .getByRole('textbox', { name: 'E-mail' })
      .isVisible()
      .catch(() => false));

  if (isAuthPage) {
    return;
  }

  if (
    !(await deleteUserButton
      .first()
      .isVisible()
      .catch(() => false))
  ) {
    throw new Error(
      '[tryDeleteAccount] Security page is open but delete button is missing.',
    );
  }

  await expect(deleteUserButton).toBeVisible({ timeout: 3000 });
  await deleteUserButton.click({ timeout: 3000 });

  const modal = page.locator('.modal');
  await expect(modal).toBeVisible({ timeout: 3000 });

  const deleteButton = page.locator('.accept-delete-button');
  await deleteButton.click({ timeout: 3000 });
  await page.waitForURL(/\/login$/, { timeout: 5000 });
}

export async function deleteAccount(page: Page) {
  await page.goto('/personal-page/cabinet/security');

  const deleteUserButton = page.locator('.delete-user-button');
  await deleteUserButton.click();

  const modal = page.locator('.modal');
  await expect(modal).toBeVisible();

  const deleteButton = page.locator('.accept-delete-button');
  await deleteButton.click();

  const successToast = page.locator('.Toastify__toast--success');
  await expect(successToast).toBeVisible();
  await expect(successToast).toHaveText('Акаунт видалено успішно.');

  await page.waitForURL(/\/login$/);
}

export async function fillRentOutForm(page: Page, draft: DeviceDraft) {
  await page.locator('#fileInput').setInputFiles(DEVICE_IMAGE_PATH);

  await page.fill('#deviceTitleInput', draft.title);
  await page.selectOption('#manufacturerSelect', draft.manufacturer);

  await expect(page.locator('#modelSelect')).toContainText(draft.deviceModel);
  await page.selectOption('#modelSelect', draft.deviceModel);
  await page.selectOption('#conditionSelect', draft.condition);
  await page.fill('#batteryCapacityInput', draft.batteryCapacity);
  await page.fill('#weightInput', draft.weight);
  await page.selectOption('#usbTypeCSelect', draft.typeC);
  await page.selectOption('#usbTypeASelect', draft.typeA);
  await page.selectOption('#socketCountSelect', draft.sockets);
  await page.selectOption('#remoteControlSelect', draft.remoteUse);
  await page.fill('#dimensionsInput', draft.length);
  await page.fill('#dimensionsInput2', draft.width);
  await page.fill('#dimensionsInput3', draft.height);
  await page.selectOption('#batteryTypeSelect', draft.batteryType);
  await page.selectOption('#signalShapeSelect', draft.signalShape);
  await page.fill('#priceInput', draft.price);
  await page.fill('#minRentTermInput', draft.minRentTerm);
  await page.fill('#maxRentTermInput', draft.maxRentTerm);
  await page.check('input[name="policyAgreement"]');
}

export async function createDeviceListing(
  page: Page,
  overrides: Partial<DeviceDraft> = {},
): Promise<CreatedDeviceDraft> {
  const draft = generateDeviceDraft(overrides);

  await page.goto('/personal-page/my-devices');
  await page.getByRole('link', { name: 'Додати пристрій' }).click();
  await expect(page).toHaveURL(/\/rent-out$/);

  await fillRentOutForm(page, draft);
  await page.getByRole('button', { name: 'Розмістити оголошення' }).click();
  await expect(page).toHaveURL(/\/personal-page\/my-devices$/);

  const reviewLinks = page.getByRole('link', { name: 'Переглянути' });
  await expect(reviewLinks).toHaveCount(1);

  const href = await reviewLinks.first().getAttribute('href');
  const deviceIdMatch = href?.match(/\/rent\/([^/?#]+)/);

  if (!deviceIdMatch) {
    throw new Error('Could not extract created device id from review link.');
  }

  return {
    ...draft,
    id: deviceIdMatch[1],
  };
}
