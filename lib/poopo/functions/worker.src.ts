import chromeLambda from 'chrome-aws-lambda';
import lighthouse, { OutputMode } from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const main = async (event: any) => {
  console.log('event', { event });

  const executablePath = await chromeLambda.executablePath;
  if (!executablePath) {
    throw new Error('Chrome executable not found');
  }

  console.log('Launching Chrome with executablePath:', executablePath);

  const chrome = await chromeLauncher.launch({
    chromePath: executablePath,
    chromeFlags: chromeLambda.args,
  });
  console.log('Chrome launched');
  console.log('executablePath', { executablePath });
  // Your lighthouse code here
  const options = {
    // logLevel: "info",
    output: 'html' as OutputMode,
    onlyCategories: ['performance'],
    port: chrome.port,
  };

  // const runnerResult = await lighthouse('https://example.com', options);

  // if (runnerResult) {
  //   console.log('Report is done for', runnerResult.lhr.finalDisplayedUrl);
  //   console.log('Performance score was', (runnerResult.lhr.categories.performance.score || 0) * 100);
  // }

  chrome.kill();
};

export { main };
