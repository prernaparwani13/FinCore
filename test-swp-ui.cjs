const puppeteer = require('puppeteer');

async function testSWPCalculatorUI() {
  console.log('Starting SWP Calculator UI Test...\n');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Navigate to the app
    await page.goto('http://localhost:5175/', { waitUntil: 'networkidle0' });
    console.log('✓ Page loaded successfully');
    
    // Look for the SWP Calculator link/button
    const swpLink = await page.$('text=SWP Calculator');
    if (swpLink) {
      await swpLink.click();
      await new Promise(r => setTimeout(r, 1000));
      console.log('✓ Navigated to SWP Calculator');
    } else {
      // Try to find calculators page
      const calculatorsLink = await page.$('text=Calculators');
      if (calculatorsLink) {
        await calculatorsLink.click();
        await new Promise(r => setTimeout(r, 1000));
        console.log('✓ Navigated to Calculators page');
        
        // Look for SWP Calculator again
        const swpLink2 = await page.$('text=SWP Calculator');
        if (swpLink2) {
          await swpLink2.click();
          await new Promise(r => setTimeout(r, 1000));
          console.log('✓ Navigated to SWP Calculator');
        }
      }
    }
    
    // Wait for the calculator to render
    await new Promise(r => setTimeout(r, 2000));
    
    // Get page content for debugging
    const content = await page.content();
    
    // Look for result card with Total Withdrawal
    const resultCards = await page.$$('.bg-white');
    console.log(`✓ Found ${resultCards.length} result cards/elements`);
    
    // Try to find the Total Withdrawal text
    const hasTotalWithdrawal = content.includes('Total Withdrawal') || content.includes('TOTAL WITHDRAWAL');
    console.log(`✓ Total Withdrawal label found: ${hasTotalWithdrawal}`);
    
    // Check for the extreme value pattern that was the bug
    const hasExtremeValue = content.includes('500,500,500') || content.includes('000,000,000');
    console.log(`✗ Extreme value bug present: ${hasExtremeValue}`);
    
    if (hasExtremeValue) {
      console.log('\n❌ TEST FAILED: The extreme value bug is still present!');
    } else {
      console.log('\n✅ TEST PASSED: SWP Calculator is displaying correct values!');
    }
    
    // Take a screenshot for debugging
    await page.screenshot({ path: 'test-swp-calculator.png' });
    console.log('✓ Screenshot saved to test-swp-calculator.png');
    
  } catch (error) {
    console.error('Error during test:', error);
  } finally {
    await browser.close();
  }
}

testSWPCalculatorUI().catch(console.error);
