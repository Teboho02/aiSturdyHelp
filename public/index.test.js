const puppeteer = require('puppeteer');

describe('Learning Dashboard Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false }); // Set to 'true' to run in headless mode
    page = await browser.newPage();
    await page.goto('file://' + __dirname + '/index.html'); // Adjust the path to your HTML file
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  test('Page title should be "Learning Dashboard"', async () => {
    const title = await page.title();
    expect(title).toBe('Learning Dashboard');
  });

  test('Tiles should be clickable and log correct message', async () => {
    const tiles = await page.$$('.tile');
    const consoleMessages = [];

    page.on('console', (msg) => consoleMessages.push(msg.text()));

    for (let i = 0; i < tiles.length; i++) {
      await tiles[i].click();
      await page.waitForTimeout(500); // Wait to capture console log

      expect(consoleMessages[i]).toContain(['study-plan', 'marks', 'notes', 'quizzes'][i] + ' clicked');
    }
  });

  test('Clicking "notes" should navigate to "/search.html"', async () => {
    await page.click('#notes');
    await page.waitForNavigation({ waitUntil: 'load' });

    expect(page.url()).toContain('/search.html');
  });

  // Additional tests for the other tiles...
});
