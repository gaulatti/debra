import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

/**
 * The main function that performs the desired actions.
 * @param _event - The event object.
 */
const main = async (_event: any) => {
  const url = 'https://clarin.com';

  /**
   * Represents the path to the Chromium executable.
   */
  const executablePath = await chromium.executablePath();
  const browser = await puppeteer.launch({
    args: [...chromium.args, '--remote-debugging-port=9222'],
    defaultViewport: chromium.defaultViewport,
    executablePath,
    headless: chromium.headless,
  });

  /**
   * Represents the page to be opened.
   */
  const page = await browser.newPage();
  await page.goto(url, { timeout: 0 });

  console.log('title', await page.title());

  if (browser) {
    await browser.close();
  }
};

export { main };
