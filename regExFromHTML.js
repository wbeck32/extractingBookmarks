const {
  StringDecoder
} = require('string_decoder');
const decoder = new StringDecoder('utf8');

const fs = require('fs');
const whitespaceRegEx = RegExp(/[\s\n\t]*/gm);
const subst = '';

let urlRegEx = RegExp(/((<a href=")[a-zA-Z./-\d\n\S\s]*(<\/a>))/gm);
let tmpArray = [];
let m;

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
    const decoded = decoder.write(d);
    const lowerCase = decoded.toLowerCase();
    const noWhitespace = lowerCase.replace(whitespaceRegEx, subst);
    console.log(noWhitespace);
    fs.writeFile('dedupedFromHTML.js', noWhitespace, (err) => {
      console.log(err);
    });
  });

});

// res.on('end', () => {
//   console.log(noWhitespace);
//   console.log('this is the end, my only friend, the end');
// });
// res.on('error', (e) => {
//   console.error(`Got error: ${e.message}`);
// });

// fs.readLink('https://ask.metafilter.com/331739/Songs-that-take-place-during-a-nuclear-blast', 'utf8', (err, linkString) => {
//     console.log(111);
//     console.log(linkString);
//     const lowerCase = linkString.toLowerCase();
//     const noWhitespace = whitespaceRegEx.exec(lowerCase);
//     console.log(noWhitespace);

//   });
