const puppeteer = require('puppeteer');

async function testSliderFill() {
  console.log('Starting slider fill test...');

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    // Navigate to the app
    console.log('Navigating to localhost:5178...');
    await page.goto('http://localhost:5178', { waitUntil: 'networkidle2' });

    // Wait for the page to load
    await page.waitForSelector('.min-h-screen', { timeout: 10000 });

    // Navigate to a calculator (SIP Calculator)
    console.log('Looking for SIP Calculator...');
    const sipCalculatorLink = await page.$('a[href*="sip-calculator"]') ||
                              await page.$('a[href*="SIP"]') ||
                              await page.$('[data-title="SIP Calculator"]');

    if (sipCalculatorLink) {
      await sipCalculatorLink.click();
      await page.waitForSelector('.bg-white.dark\\:bg-slate-900', { timeout: 5000 });
    } else {
      // Try to find any calculator link
      const calculatorLinks = await page.$$('a[href*="-calculator"]');
      if (calculatorLinks.length > 0) {
        await calculatorLinks[0].click();
        await page.waitForSelector('.bg-white.dark\\:bg-slate-900', { timeout: 5000 });
      }
    }

    // Wait for sliders to load
    await page.waitForSelector('input[type="range"]', { timeout: 5000 });

    // Test slider fill functionality
    console.log('Testing slider fill functionality...');

    const sliders = await page.$$('input[type="range"]');
    console.log(`Found ${sliders.length} sliders`);

    for (let i = 0; i < Math.min(sliders.length, 3); i++) {
      console.log(`\nTesting Slider ${i + 1}:`);

      const slider = sliders[i];

      // Get initial background
      const initialStyle = await page.evaluate(el => getComputedStyle(el).background, slider);
      console.log(`Initial background: ${initialStyle.substring(0, 50)}...`);

      // Get slider properties
      const min = await page.evaluate(el => parseFloat(el.min), slider);
      const max = await page.evaluate(el => parseFloat(el.max), slider);
      const step = await page.evaluate(el => parseFloat(el.step), slider);

      console.log(`Min: ${min}, Max: ${max}, Step: ${step}`);

      // Test dragging to middle
      const middleValue = (min + max) / 2;
      await page.evaluate((el, val) => {
        el.value = val;
        el.dispatchEvent(new Event('input', { bubbles: true }));
      }, slider, middleValue);

      await page.waitForTimeout(100);

      const middleStyle = await page.evaluate(el => getComputedStyle(el).background, slider);
      console.log(`Middle value (${middleValue}) background: ${middleStyle.substring(0, 50)}...`);

      // Test dragging to max
      await page.evaluate((el, val) => {
        el.value = val;
        el.dispatchEvent(new Event('input', { bubbles: true }));
      }, slider, max);

      await page.waitForTimeout(100);

      const maxStyle = await page.evaluate(el => getComputedStyle(el).background, slider);
      console.log(`Max value (${max}) background: ${maxStyle.substring(0, 50)}...`);

      // Test input field change
      const inputFields = await page.$$('input[type="number"]');
      if (inputFields.length > i) {
        const inputField = inputFields[i];
        const testValue = min + (max - min) * 0.75;

        await page.evaluate((el, val) => {
          el.value = val;
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }, inputField, testValue);

        await page.waitForTimeout(100);

        const inputStyle = await page.evaluate(el => getComputedStyle(slider).background, slider);
        console.log(`Input change (${testValue}) background: ${inputStyle.substring(0, 50)}...`);
      }
    }

    // Test theme toggle
    console.log('\nTesting theme toggle...');
    const themeToggle = await page.$('button[aria-label*="theme"]') ||
                        await page.$('button:has-text("Toggle")') ||
                        await page.$('[data-theme-toggle]');

    if (themeToggle) {
      const initialTheme = await page.evaluate(() => document.documentElement.classList.contains('dark'));
      console.log(`Initial theme: ${initialTheme ? 'dark' : 'light'}`);

      await themeToggle.click();
      await page.waitForTimeout(500);

      const newTheme = await page.evaluate(() => document.documentElement.classList.contains('dark'));
      console.log(`After toggle: ${newTheme ? 'dark' : 'light'}`);

      // Check slider styles in new theme
      const slider = sliders[0];
      const themeStyle = await page.evaluate(el => getComputedStyle(el).background, slider);
      console.log(`Slider background in ${newTheme ? 'dark' : 'light'} theme: ${themeStyle.substring(0, 50)}...`);
    } else {
      console.log('Theme toggle not found, skipping theme test');
    }

    console.log('\nTest completed successfully!');

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
}

testSliderFill().catch(console.error);
