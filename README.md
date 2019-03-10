# dedupingBookmarks

This is a script I wrote to extract bookmarks from an exported HTML bookmarks file, dedupe them and then write a puppeteer test to eliminate sites that return a status of 404.

# TODOS
- instead of requiring a downloaded HTML file, go directly to a URL
- remove(?) query strings and header/footer/etc. specific to the domain URLs
- limit number of concurrent connections to avoid crippling machine performance
- save URLs and titles for URLs that return a status of 200
- generate a new bookmarks.html file and store it in the right place
- remove folders?
- how to organize?
- sort?