const {
  StringDecoder
} = require('string_decoder');
const decoder = new StringDecoder('utf8');

const fs = require('fs');
const whitespaceRegEx = RegExp(/[\s\n\t]*/gm);
const subst = '';

let urlRegEx = RegExp(/(<ahref="[a-z.-_"]*)(<\/a>)/gm);

const https = require('https');

const options = {
  host : 'ask.metafilter.com',
  path : '/331739/Songs-that-take-place-during-a-nuclear-blast',
  method : 'GET',
  encoding : 'utf8',
  headers : {
    'user-agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
    'accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  }
};

https.get(options, (res) => {
  let finalTotal = '';
  res.on('data', (d) => {
    const decoded = decoder.write(d);
    const lowerCase = decoded.toLowerCase();
    const noWhitespace = lowerCase.replace(whitespaceRegEx, subst);
    finalTotal = finalTotal.concat(noWhitespace);
    console.log('statusCode:', res.statusCode);
    const extractedUrls = finalTotal.match(urlRegEx);
    console.log(extractedUrls);
    //needs some cleanup before we write the file
    fs.writeFile('dedupedFromHTML.js', extractedUrls, (err) => {
      console.log(2, 'error: ', err);
    });
  });
});
