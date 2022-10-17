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

  await page.goto(`https://weather.yahoo.co.jp/weather/13/4410/13102.html`);

  await page.addStyleTag({ path: 'style.css' });

  const index2days = page.locator('#index2days');
  await index2days.evaluate((element) => {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  });
  await page.waitForTimeout(2000);

  const today = page.locator('#yjw_pinpoint_today');
  await today.evaluate((element) => {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  });
  await page.waitForTimeout(2000);

  const searchText = page.locator('#searchText');
  await searchText.evaluate((element) => {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  });
  await searchText.click();
  
  // css のアニメーション待ち
  await page.waitForTimeout(1500);

  await searchText.type('文字入力のテスト', { delay: 50 });
  await page.waitForTimeout(2000);

  // await context.close();

  await browser.close();
})();
