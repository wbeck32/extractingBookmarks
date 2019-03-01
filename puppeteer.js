const puppeteer = require('puppeteer');
const myEmitter = new MyEmitter();

const urls = require('./deduped-small');
const urlsToCheck = urls.split(',');

// this works

puppeteer.launch().then(async (browser) => {
  myEmitter.once('newListener', (event, listener) => {
    if (event === 'event') {
      // Insert a new listener in front
      myEmitter.on('event', () => {
        console.log('B');
      });
    }
  });
  try {
    const page = await browser.newPage().then(async (page) => {
      page.once('load', () => console.log(1, url))
      for (let i = 0;i < urlsToCheck.length;i++) {
        const url = urlsToCheck[i];
        // console.log(url, i)
        await page.goto(`${url}`);
        await page.waitForResponse(res => {
          console.log(i, url, res.headers().status)
          return
        });
        return;
      }
    })
    // await page.close()
  } catch (e) {
    console.log(e)
  }
  await browser.close()
})

// async function loopUrls(urlsToCheck) {
//   await urlsToCheck.forEach(async (mainUrl) => {
//     console.log(1, mainUrl)
//     await run(mainUrl);
//   })
// }


// async function run(mainUrl) {
//   try {
//     const browser = await puppeteer.launch();
//     console.log(3, mainUrl)
//     const page = await browser.newPage();
//     // const mainUrl = "https://google.com"

//     await page.setRequestInterception(true);
//     let mainUrlStatus;
//     page.once("request", request => {
//       console.log(2, request)
//       // const url = request.url();
//       // console.log("request url:", url);
//       // request.continue();
//     });
//   } catch (e) {
//     console.log(3, e)
//   }
// page.once("requestfailed", request => {
//   const url = request.url();
//   console.log("request failed url:", url);
// });
// page.once("response", response => {
//   const request = response.request();
//   const url = request.url();
//   const status = response.status();
//   console.log("response url:", url, "status:", status);
//   if (url === mainUrl) {
//     mainUrlStatus = status;
//   }
// });
// await page.goto(mainUrl);
// console.log("status for main url:", mainUrlStatus);
// const html = await page.content();
// await browser.close();
// }

// loopUrls(urlsToCheck)
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
