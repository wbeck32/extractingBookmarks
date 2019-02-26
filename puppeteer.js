const puppeteer = require('puppeteer');

const urls = require('./deduped');
const urlsToCheck = urls.split(',');

// this works
// puppeteer.launch().then(async (browser) => {
//   const page = await browser.newPage().then(async (page) => {
//     for (let i = 0;i < urlsToCheck.length;i++) {
//       const url = urlsToCheck[i];
//       console.log(url, i)
//       await page.goto(`${url}`);
//       await page.waitForResponse(res => {
//         console.log(res.headers().status)
//       });
//     }
//   })
//   await page.close()
// })


async function loopUrls(urlsToCheck) {
  await urlsToCheck.forEach(async (mainUrl) => {
    await run(mainUrl);
  })
}


async function run(mainUrl) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // const mainUrl = "https://google.com"

  let mainUrlStatus;
  await page.setRequestInterception(true);
  page.once("request", request => {
    const url = request.url();
    console.log("request url:", url);
    request.continue();
  });
  page.once("requestfailed", request => {
    const url = request.url();
    console.log("request failed url:", url);
  });
  page.on("response", response => {
    const request = response.request();
    const url = request.url();
    const status = response.status();
    console.log("response url:", url, "status:", status);
    if (url === mainUrl) {
      mainUrlStatus = status;
    }
  });
  await page.goto(mainUrl);
  console.log("status for main url:", mainUrlStatus);
  const html = await page.content();
  await browser.close();
}

loopUrls(urlsToCheck)
  // await browser.close();
// })
  // other actions...

// puppeteer.launch().then(async (browser) => {
//   try {
//     urlsToCheck.forEach(async (url) => {
//       try {
//         const page = await browser.newPage();
//         const res = await page.goto('https://www.google.com');
//         console.log(res.headers());
//         // await page.close();
//       } catch (e) {
//         console.log(1, e)
//       }
//       // await page.close()
//     })
//   } catch (e) {
//     console.log(2, e)
//   }
//   try {
//     await browser.close();
//   } catch (e) {
//     console.log(3, e)
//   }
// });

// return puppeteer.launch(() => {
//   .then((browser) => {
//   return browser.newPage();
// })
//     .then((page) => {
//       return urlsToCheck.forEach((url) => {
//         return page.goto(url);
//       })
//         .then((res) => {
//           const {
//             status
//           } = res.headers();
//           console.log(222, status);
//           // return status;
//         })
//         .then(() => {
//           page.close();
//         });
//     });

// })
//   return browser.newPage()
//     .then((page) => {
//         .then((res) => {
//         });
//     });
// });
