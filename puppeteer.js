const HCCrawler = require('headless-chrome-crawler');

const urls = require('./deduped');
const urlsToCheck = urls.split(',');
let validLinks = [];


(async () => {
  const crawler = await HCCrawler.launch({
    evaluatePage: (() => ({
      title: $('title').text(),
    })),
    onSuccess: (result => {
      if (result.response.status === 200) {
        console.log({ url: result.response.url, title: result.result.title, status: result.response.status });
        const urlToSave = { url: result.response.url, title: result.result.title, status: result.response.status };
        validLinks.push(urlToSave);
      }
    })
  });
  await crawler.queue(urlsToCheck);
  await crawler.onIdle(); // Resolved when no queue is left
  await crawler.close(); // Close the crawler
  console.log(50, validLinks);
})();