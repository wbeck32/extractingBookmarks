// const HCCrawler = require('headless-chrome-crawler');
const Apify = require('apify');
// const urls = require('./deduped');
// const urlsToCheck = urls.split(',');
let validLinks = [];


Apify.main(async () => {
  const requestQueue = await Apify.openRequestQueue();
  await requestQueue.addRequest({ url: 'https://www.iana.org/' });
  const pseudoUrls = [new Apify.PseudoUrl('https://www.iana.org/[.*]')];

  const crawler = new Apify.PuppeteerCrawler({
    requestQueue,
    handlePageFunction: async ({ request, page }) => {
      const title = await page.title();
      console.log(`Title of ${request.url}: ${title}`);
      await Apify.utils.puppeteer.enqueueLinks({ page, selector: 'a', pseudoUrls, requestQueue });
    },
    maxRequestsPerCrawl: 100,
    maxConcurrency: 10,
  });
  await crawler.run();
});




// (async () => {
//   const crawler = await HCCrawler.launch({
//     evaluatePage: (() => {
//       return ({
//         title: $('title').text(),
//       });
//     }),
//     onSuccess: (result => {
//       if (result.response.status === 200) {
//         console.log({ url: result.response.url, title: result.result.title, status: result.response.status });
//         const urlToSave = { url: result.response.url, title: result.result.title, status: result.response.status };
//         validLinks.push(urlToSave);
//       }
//     })
//   });
//   await crawler.queue(urlsToCheck);
//   await crawler.onIdle(); // Resolved when no queue is left
//   await crawler.close(); // Close the crawler
//   console.log(50, validLinks);
// })();