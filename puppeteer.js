const HCCrawler = require('headless-chrome-crawler');

const urls = require('./deduped-small');
const urlsToCheck = urls.split(',');


(async () => {
  const crawler = await HCCrawler.launch({
    // Function to be called with evaluated results from browsers
    onSuccess: (result => {
      console.log({ url: result.response.url, status: result.response.status });
      // if (result.response.status === 200) successfulLinks.push(result.response.url)
    })
  });
  await crawler.queue(urlsToCheck);
  await crawler.onIdle(); // Resolved when no queue is left
  await crawler.close(); // Close the crawler
})();