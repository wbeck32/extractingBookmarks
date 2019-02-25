const puppeteer = require('puppeteer');
const urls = require('./deduped');
console.log(typeof urls)
//urls is an object somehow
const urlsToCheck = urls.split(',');

puppeteer.launch().then(async (browser) => {
  urlsToCheck.forEach(async (url) => {
    browser.newPage().then(async (page) => {
      page.goto(url).then(async (res) => {
        const { status } = res.headers()
        console.log(222,status)
      })
    });
  });

  // puppeteer.launch().then(async browser => {
  //   const page = await browser.newPage();
  //   await page.goto('https://gauravsohoni.wordpress.com/2015/04/14/mac-osx-open-port/');
  //   await page.screenshot({ path: 'screenshot.png' });
  //   // other actions...
  //   await browser.close();
});
