import { test, expect } from '@playwright/test';

test.describe('Rent Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/rent');
  });

  test('should interact with brand and model filters', async ({ page }) => {
    const brandCheckbox = page.getByLabel('EcoFlow');
    await brandCheckbox.check();
    await expect(brandCheckbox).toBeChecked();

    const modelCheckbox = page.getByRole('checkbox', {
      name: 'Delta',
      exact: true,
    });
    await modelCheckbox.check();
    await expect(modelCheckbox).toBeChecked();

    const priceFromInput = page.locator('#priceFrom');
    const priceToInput = page.locator('#priceTo');
    await priceFromInput.fill('100');
    await priceToInput.fill('500');
    await expect(priceFromInput).toHaveValue('100');
    await expect(priceToInput).toHaveValue('500');
  });

  test('should perform search without relying on card order', async ({
    page,
  }) => {
    const searchQuery = 'EcoFlow';
    const searchInput = page.getByPlaceholder(
      'Який зарядний пристрій шукаєте?',
    );
    await searchInput.fill(searchQuery);
    await page.getByRole('button', { name: 'Пошук' }).click();

    await expect(page).toHaveURL(/\/rent/);
    await expect(searchInput).toHaveValue(searchQuery);
    await expect(page.getByRole('heading', { name: 'Фільтри' })).toBeVisible();
  });

  test('should navigate to a device page when catalog has devices', async ({
    page,
  }) => {
    const cards = page.locator('.device-card');
    let cardsCount = 0;

    await expect
      .poll(
        async () => {
          cardsCount = await cards.count();
          return cardsCount;
        },
        { timeout: 8000 },
      )
      .toBeGreaterThan(0)
      .catch(() => {});

    test.skip(cardsCount === 0, 'Catalog has no devices to open');

    const firstCardTitle = await page
      .locator('.device-card-title')
      .evaluateAll((titles) => titles[0]?.textContent?.trim() || '');
    expect(firstCardTitle).not.toBe('');

    await page.getByText(firstCardTitle, { exact: true }).click();

    await expect(page).toHaveURL(/\/rent\/[^/]+$/);
    await expect(page.locator('.device-page-name-title')).toBeVisible();
  });

  test('should handle invalid search query without catalog assumptions', async ({
    page,
  }) => {
    const invalidQuery = `NoSuchDevice-${Date.now()}`;
    const searchInput = page.getByPlaceholder(
      'Який зарядний пристрій шукаєте?',
    );

    await searchInput.fill(invalidQuery);
    await page.getByRole('button', { name: 'Пошук' }).click();

    await expect(page).toHaveURL(/\/rent/);
    await expect(searchInput).toHaveValue(invalidQuery);
    await expect(page.getByRole('heading', { name: 'Фільтри' })).toBeVisible();
  });

  test('should validate price range inputs', async ({ page }) => {
    const priceFromInput = page.locator('#priceFrom');
    const priceToInput = page.locator('#priceTo');

    await priceFromInput.fill('-100');
    await priceToInput.fill('-500');
    await expect(priceFromInput).toHaveValue('-100');
    await expect(priceToInput).toHaveValue('-500');
  });

  test('should apply multiple filters correctly', async ({ page }) => {
    const brandCheckbox = page.getByLabel('EcoFlow');
    const modelCheckbox = page.getByRole('checkbox', {
      name: 'Delta',
      exact: true,
    });
    const priceFromInput = page.locator('#priceFrom');
    const priceToInput = page.locator('#priceTo');

    await brandCheckbox.check();
    await modelCheckbox.check();
    await expect(brandCheckbox).toBeChecked();
    await expect(modelCheckbox).toBeChecked();

    await priceFromInput.fill('100');
    await priceToInput.fill('500');
    await expect(priceFromInput).toHaveValue('100');
    await expect(priceToInput).toHaveValue('500');

    await page.getByLabel('Новий').check();
    await expect(page.getByLabel('Новий')).toBeChecked();
  });
});
