import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
import { join } from 'path';
import { tmpdir } from 'os';
import { Flags } from 'lighthouse';
const main = async (event: any) => {
  const url = 'https://clarin.com';

  const executablePath = await chromium.executablePath();
  const browser = await puppeteer.launch({
    args: [...chromium.args, '--remote-debugging-port=9222'],
    defaultViewport: chromium.defaultViewport,
    executablePath,
    headless: chromium.headless,
  });
  const page = await browser.newPage();
  await page.goto(url, { timeout: 0 });

  console.log('title', await page.title());

  const outputPath = join(tmpdir(), 'lighthouse-report.json');
  const options: Flags = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['performance'],
    port: 9222,
  };
  const { default: lighthouse } = await import('lighthouse');
  const runnerResult = await lighthouse('https://clarin.com', options, undefined, page);

  if (runnerResult) {
    console.log('Report is done for', runnerResult.lhr.finalDisplayedUrl);
    console.log('Performance score was', (runnerResult.lhr.categories.performance.score || 0) * 100);
  }

  if (browser) {
    await browser.close();
  }
};

export { main };
