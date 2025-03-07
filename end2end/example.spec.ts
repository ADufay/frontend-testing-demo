import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('https://randomuser.me/api/?results=10', async (route) => {
    const json = {
      results: [
        {
          gender: 'male',
          name: {
            first: 'Anthony',
            last: 'Dufay'
          },
          email: 'toto@gmail.com',
          picture: {
            thumbnail: ''
          }
        }
      ]
    };
    await route.fulfill({ json });
  });
  await page.goto('http://localhost:5173');
});

test.describe('Global tests', () => {
  test('should find clickable list', async ({ page }) => {
    await expect(page.getByTestId('select-user-toto@gmail.com')).toBeDefined();
  });
});
