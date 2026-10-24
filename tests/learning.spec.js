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


 //await page.setViewportSize({ width: 2150, height: 1092 });
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
await page.locator("[placeholder]").pressSequentially('Ind',{ delay: 500});
await page.locator(".ta-results button").last().waitFor();
const dropdownloc = await page.locator(".ta-results button");
const count1 = await dropdownloc.count();
for(let i = 0; i < count1; i++){
 const countryname =  await dropdownloc.nth(i).innerText();
 //console.log(i + " Country Name is " + countryname);
 if (countryname.trim() === 'India') {
  await dropdownloc.nth(i).click();
  break;
  }
}
await page.waitForTimeout(3000);

await page.locator("//a[text()='Place Order ']").scrollIntoViewIfNeeded();
await page.locator("//a[text()='Place Order ']").click();
await page.waitForTimeout(3000);
await page.locator("label.ng-star-inserted").waitFor();
const order = await page.locator("label.ng-star-inserted").innerText();
console.log("Before Modification order id:" + order);
const orderid = order.split(' ');
const orderednumber = orderid[1];
await page.locator("//button[@routerlink='/dashboard/myorders']").waitFor();
await page.locator("//button[@routerlink='/dashboard/myorders']").click();
await page.locator("//tbody//th").first().waitFor();
const tableheadlocator = await page.locator("//tbody//th");
const tablecount = await tableheadlocator.count();
const tablerowloc = await page.locator("//tbody/tr");
for (let i = 0; i < tablecount; i++)
{
   const tableorderid = await tableheadlocator.nth(i).innerText();
  if (tableorderid === orderednumber){
    //console.log("i = " +i);
    await tablerowloc.nth(i).getByRole('button', { name: 'View' }).click();
    await page.waitForTimeout(3000);
   break;  
  }
}
await page.getByText(orderednumber).waitFor();
await expect(await page.getByText(orderednumber)).toBeVisible();
console.log("Order id is verified successfully in the order history page");
await expect(await page.getByText(desiredproduct)).toBeVisible();
console.log("Desired product is verified successfully in the order history page");

//await page.getByRole('button', { name: 'ORDERS'}).click();



});