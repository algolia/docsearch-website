[![DocSearch][1]][2]

The easiest way to add search to your documentation. For free.

DocSearch will crawl your documentation website, push its content to an Algolia
index, and allow you to add a dropdown search menu for your users to find
relevant content in no time.

Check out our [website][2] for a complete explanation and documentation.

[![Bootstrap demo][3]][2]

## Related projects

DocSearch gathers 4 repositories:

- [algolia/docsearch][4] contains the `docsearch.js` code source.
- [algolia/docsearch-configs][5] contains the JSON files representing all the
  configs for all the documentations DocSearch is powering
- [algolia/docsearch-scraper][6] contains the crawler we use to extract data
  from your documentation. The code is open source and you can run it from a
  Docker image
- [algolia/docsearch-website][7] contains the documentation website built
  [thanks to docusaurus 2][8]

## Website

### Installation

1. `yarn install` in the root of this repository (one level above this
   directory).
1. In this directory, do `yarn start`.
1. A browser window will open up, pointing to the docs.

[1]: ./static/img/docsearch-logo.svg
[2]: https://docsearch.algolia.com/
[3]: ./static/img/demos/example-bootstrap.gif
[4]: https://github.com/algolia/docsearch
[5]: https://github.com/algolia/docsearch-configs
[6]: https://github.com/algolia/docsearch-scraper
[7]: https://github.com/algolia/docsearch-website
[8]: https://v2.docusaurus.io/
