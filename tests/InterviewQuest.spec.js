import {test,expect} from '@playwright/test';

const positions = ['Accountant', 'Software Engineer', 'Sales Assistant'];

for (const position of positions) {
  test(`Retrieve data for ${position}`, async ({ page }) => {
    await page.goto('https://datatables.net/examples/core/data_sources/ajax.html');

    const rows = page.locator('table tbody tr');
    await expect(rows).toHaveCount(10);


    const opt = [];
    const rowsCount = await rows.count();

    for (let i = 0; i < rowsCount; i++) {
      const cells = rows.nth(i).locator('td');
      const rowPosition = (await cells.nth(1).innerText()).trim();

      if (rowPosition === position) {
        const name = (await cells.nth(0).innerText()).trim();
        const salary = (await cells.nth(5).innerText()).trim();
        opt.push(`${name} and ${salary}`);
      }
    }

    console.log(`For ${position}: `, opt);

  });
}