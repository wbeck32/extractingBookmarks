const fs = require('fs');

let urlRegEx = RegExp(/((http:\/\/|https:\/\/)[a-zA-Z./-\d#=]*)/gm);
let tmpArray = [];
let m;

fs.readFile('bookmarks_2_6_19.txt', 'utf8', (err, data) => {
  while ((m = urlRegEx.exec(data)) !== null) {
    if (m.index === urlRegEx.lastIndex) urlRegEx.lastIndex++;
    m.reduce((acc, cV) => {
      return typeof acc === 'string' && !tmpArray.includes(cV) ? tmpArray.push(acc) : console.log();
    });
  }
  fs.writeFile('deduped.txt', `[${tmpArray}]`, (err) => {
    console.log(err);
  });
});
