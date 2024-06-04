module.exports = {
  ci: {
    upload: { target: 'lhci', serverBaseUrl: process.env.URL_SECRET, token: process.env.API_KEY_SECRET },
    collect: { url: process.env.TARGET_SECRET, chromeDebuggingPort: 9222, numberOfRuns: 1, settings: { chromeFlags: '--no-sandbox --disable-dev-shm-usage' } },
  },
};
