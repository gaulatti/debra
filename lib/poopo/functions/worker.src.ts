import chromium from '@sparticuz/chromium';
import { execSync } from 'child_process';
import { navigation, Flags, OutputMode, RunnerResult } from 'lighthouse';
import { tmpdir } from 'os';
import { join } from 'path';
import puppeteer from 'puppeteer-core';

const main = async (event: any) => {
  console.log('event', { event });
  const url = 'https://clarin.com';

  const executablePath = await chromium.executablePath();
  const launchOptions = {
    executablePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--remote-debugging-port=9222'],
    headless: true,
  };
  const browser = await puppeteer.launch(launchOptions);
  const browserWSEndpoint = browser.wsEndpoint();
  console.log({ browserWSEndpoint });
  const outputPath = join(tmpdir(), 'lighthouse-report.json');
  const stdout = execSync(`node /opt/nodejs/node_modules/lighthouse/cli/index.js ${url} --output=json --output-path=${outputPath} --port=${9222}`);
  console.log({ outputPath, stdout });

  // console.log({ executablePath, outputPath })

  // console.log('Chrome launched');
  // const page = await browser.newPage();
  // await page.goto(url, { timeout: 0 });

  // console.log('title', await page.title());

  // const options: Flags = {
  //   logLevel: 'info',
  //   output: 'html',
  //   onlyCategories: ['performance'],
  //   port: 9222,
  // };

  // console.log({ options });

  // let runnerResult: RunnerResult | undefined;
  // console.log('navigation', navigation)
  // runnerResult = await lighthouse('https://clarin.com', options, undefined, page);

  // if (runnerResult) {
  //   console.log('Report is done for', runnerResult.lhr.finalDisplayedUrl);
  //   console.log('Performance score was', (runnerResult.lhr.categories.performance.score || 0) * 100);
  // }
};

export { main };
