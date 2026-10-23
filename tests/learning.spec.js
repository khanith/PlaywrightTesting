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
  console.log("Login and Logout functionality is working with playwright");
});

test.only('Practiscing E2E flow of E-commerce website', async ({ page })=> {
 await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  await page.getByRole('textbox', { name: 'email@example.com' }).fill('khanithpolimera29@gmail.com');
  await page.getByRole('textbox', { name: 'enter your passsword' }).fill('Khanith29');
  await page.getByRole('textbox', { name: 'enter your passsword' }).press('Enter');
  await page.waitForLoadState('networkidle');
  await page.locator('.card-body').first().waitFor();
  const desiredproduct = 'ZARA COAT 3';
  const productsList = await page.locator('.card-body').allTextContents();
  const productlocator = await page.locator('.card-body');
  const count = await page.locator('.card-body').count();
  console.log(productsList);

  for(let i = 0; i < count; i++)
  {
  if(productsList[i].split('$')[0] === desiredproduct){
    await productlocator.nth(i).locator('text= Add To Cart').click();
   break;
  }
  }
 
  await page.locator("[routerlink *= cart]").click();
  await page.locator("//h3[text()='ZARA COAT 3']").waitFor();
  const bool = await page.locator("//h3[text()='ZARA COAT 3']").isVisible();
  await expect(bool).toBeTruthy();
  await page.locator("//button[text()='Checkout']").click();
  await page.locator(".input.ddl").first().waitFor();
  await page.locator(".input.ddl").first().selectOption('10');
  await page.locator(".input.ddl").last().selectOption('20');
await page.locator("//div[text()='CVV Code ']/following-sibling::input").fill('123');
await page.locator("//div[text()='Name on Card ']/following-sibling::input").fill('Khanith Polimera');
await page.locator("[placeholder]").pressSequentially('India',{ delay: 500});
await page.locator(".list-group").first().waitFor();
const dropdownloc = page.locator(".list-group");
const count1 = await dropdownloc.locator('button').count();
for(let i = 0; i < count1; i++){
 const countryname =  await dropdownloc.locator('button').nth(i).textContent();
 if (countryname?.trim() === 'India') {
  await dropdownloc.locator('button').nth(i).click();
  break;
}
}
 
  //if(await dropdownloc.nth(i).textContent() === 'India'){

//}
  await page.waitForTimeout(5000);


});