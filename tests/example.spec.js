// @ts-check
import { test, expect } from '@playwright/test';

test('Testing Initial Phase', async ({ page }) => {
  await page.goto('https://itms.gctp.in');

  // Expect a title "to contain" a substring.
  await page.locator("[type='email']").fill('test_saikhanith@lnttest.com');
  await page.locator("[type='password']").fill('Password@123');
  await page.click('button:has-text("Login")');
  await page.waitForTimeout(3000);
  await page.locator("[aria-label *= 'user']").click();
  await page.locator("text=Logout").click();
  await page.waitForTimeout(3000);
  console.log("Login and Logout functionality is working as expected");
});