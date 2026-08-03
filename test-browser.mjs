import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    const type = msg.type();
    if (type === 'error' || type === 'warn') {
      console.log(`[${type.toUpperCase()}]`, msg.text());
    }
  });
  
  await page.goto('http://localhost:3000/en/advisor');
  await page.waitForLoadState('networkidle');
  
  const bodyText = await page.textContent('body');
  if (bodyText?.includes('Sign In') || bodyText?.includes('login')) {
    console.log('Redirected to login, aborting');
    await browser.close();
    return;
  }

  // Type in the input field directly
  const input = page.locator('input[placeholder]').first();
  await input.click();
  await input.type('ROI on Downtown?');
  await page.keyboard.press('Enter');
  
  console.log('Message sent, waiting for response...');
  await page.waitForTimeout(8000);

  // Capture output
  const chatContent = await page.textContent('[class*="ScrollArea"]').catch(() => 'not found');
  console.log('Chat area content:', chatContent?.slice(0, 500));
  
  await page.screenshot({ path: 'chat_test_final.png' });
  console.log('Screenshot saved to chat_test_final.png');
  await browser.close();
})();
