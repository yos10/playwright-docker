const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    recordVideo: {
      dir: 'videos/',
      size: {
        width: 800,
        height: 450
      }
    }
  });
  const page = await context.newPage();
  await page.setViewportSize({
    width: 1280,
    height: 720,
  });
  await page.goto('https://www.nnn.ed.nico/');

  const footer = page.locator('.global-footer_copyright');
  await footer.scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: 'screenshots/screenshot.jpg',
    type: 'jpeg',
    quality: 70,
    fullPage: true,
  });

  await context.close();
  await browser.close();
})();
