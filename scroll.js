const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    // recordVideo: {
    //   dir: 'videos/',
    //   size: {
    //     width: 1280,
    //     height: 720
    //   }
    // }
  });

  const page = await context.newPage();

  await page.goto(`file://${__dirname}/index.html`);

  await page.addStyleTag({ path: 'style.css' });

  // .div4 へスクロール
  const div4 = page.locator('.div4');
  await div4.evaluate((element) => {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  });
  await page.waitForTimeout(2000);

  // #input1 へスクロール
  const input1 = page.locator('#input1');
  await input1.evaluate((element) => {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  });
  await input1.click();
  // css のアニメーション待ち
  await page.waitForTimeout(1500);
  await input1.type('文字入力のテスト', { delay: 50 });
  await page.waitForTimeout(2000);

  // .div3 へスクロール
  const div3 = page.locator('.div3');
  await div3.evaluate((element) => {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  });
  await page.waitForTimeout(2000);

  await context.close();
  await browser.close();
})();
