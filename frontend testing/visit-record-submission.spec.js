import { test, expect } from '@playwright/test';

test('test for successful visit record submission', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('textbox', { name: 'Enter your name:' }).click();
    await page.getByRole('textbox', { name: 'Enter your name:' }).fill('jen');
    await page.getByRole('textbox', { name: 'Enter your email:' }).fill('jen4@hotmail.com');
    await page.getByRole('textbox', { name: 'Enter your password:' }).fill('123321');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('combobox', { name: 'Enter country:' }).click();
    await page.getByRole('combobox', { name: 'Enter country:' }).fill('united');
    await page.getByRole('option', { name: 'Great Britain | UK | England' }).click();
    await page.getByRole('textbox', { name: 'Enter arrival time:' }).fill('2026-02-26T16:33:34');
    await page.getByRole('textbox', { name: 'Enter departure time:' }).fill('2026-02-26T16:33:34');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('visit created successfully')).toBeVisible();
});