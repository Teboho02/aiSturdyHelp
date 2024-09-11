jest.setTimeout(10000); // Set timeout to 10 seconds

const puppeteer = require('puppeteer');

describe('Simple Page Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto(`file://${__dirname}/a.html`);
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  test('Header should contain "Hello, World!"', async () => {
    const headerText = await page.$eval('#header', el => el.textContent);
    expect(headerText).toBe('Hello, World!');
  });

  test('Description should contain "This is a simple HTML page."', async () => {
    const descriptionText = await page.$eval('#description', el => el.textContent);
    expect(descriptionText).toBe('This is a simple HTML page.');
  });
});
