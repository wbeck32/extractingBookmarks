const {
  StringDecoder
} = require('string_decoder');
const decoder = new StringDecoder('utf8');

// const fs = require('fs');
// const whitespaceRegEx = RegExp(/\s/gm);
// let urlRegEx = RegExp(/((<a href=")[a-zA-Z./-\d\n\S\s]*(<\/a>))/gm);
// let tmpArray = [];
// let m;

const https = require('https');

const options = {
  host : 'ask.metafilter.com',
  path : '/',
  method : 'GET',
  encoding : 'utf8',
  headers : {
    'user-agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
    'accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  }
};

https.get(options, (res) => {
  console.log('statusCode:', res.statusCode);
  res.on('data', (d) => {
    console.log(decoder.write(d));
  });
  res.on('end', () => {
    console.log('this is the end, my only friend, the end');
  });
  res.on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
});

// fs.readLink('https://ask.metafilter.com/331739/Songs-that-take-place-during-a-nuclear-blast', 'utf8', (err, linkString) => {
//     console.log(111);
//     console.log(linkString);
//     const lowerCase = linkString.toLowerCase();
//     const noWhitespace = whitespaceRegEx.exec(lowerCase);
//     console.log(noWhitespace);

//     while ((m = urlRegEx.exec(noWhitespace)) !== null) {
//       if (m.index === urlRegEx.lastIndex) urlRegEx.lastIndex++;
//       m.reduce((acc, cV) => {
//         return typeof acc === 'string' && !tmpArray.includes(cV) ? tmpArray.push(acc) : console.log();
//       });
//     }
//     fs.writeFile('dedupedFromHTML.js', `[${tmpArray}]`, (err) => {
//       console.log(err);
//     });
//   });
