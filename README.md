[![Jane Ori - PropJockey.io](https://img.shields.io/badge/Jane%20Ori%20%F0%9F%91%BD-%F0%9F%A4%8D%20PropJockey.io-7300E6.svg?labelColor=FB04C2&style=plastic)](http://jane.propjockey.io/)

# augmented-ui from PropJockey

<img src="https://augmented-ui.com/img/v2intro.gif">

Resources:
* Home: http://augmented-ui.com/
* Docs: http://augmented-ui.com/docs/
* WYSIWYG Mixin Mixer: http://augmented-ui.com/mixinmixer/
* NPM: https://www.npmjs.com/package/augmented-ui
* GitHub: https://github.com/propjockey/augmented-ui
* Twitter: https://twitter.com/Jane0ri

Old v1 Links:
* Home: http://augmented-ui.com/v1/
* Docs: http://augmented-ui.com/v1/docs/
* Test: http://augmented-ui.com/v1/test.html
* unpkg: https://unpkg.com/augmented-ui@1/augmented.css

Install:
`$ npm install augmented-ui`
Then include the `/node_modules/augmented-ui/augmented-ui.min.css` file before any stylesheets that use it.

OR

Use your favorite NPM CDN and include it on your page before other stylesheets for small projects. Like so:
```html
<link rel="stylesheet" type="text/css" href="https://unpkg.com/augmented-ui@2/augmented-ui.min.css">
```

## Files

* **augmented-ui.css** - Everything, not minified (core, border and inlay mixins, individual-region mixins, all-region shape mixins)
* **augmented-ui.min.css** - Everything, minified (core, border and inlay mixins, individual-region mixins, all-region shape mixins)
* **aug-core.min.css** - core only, minified
* **border-inlay-mixins.min.css** - border and inlay mixins (and their delegate options) only, minified. Requires aug-core.min.css
* **region-mixins.min.css** - individual-region mixins only, minified. Requires aug-core.min.css
* **shape-mixins.min.css** - all-region mixins only, minified. Requires aug-core.min.css

## Support

http://augmented-ui.com/docs/#supporting-augmented-ui

## CHANGELOG:

v2.0.0 - August 30, 2020:
* Complete rewrite
* Over 200 aug mixins built on top of a new core feature set
* Mixin Mixer: http://augmented-ui.com/mixinmixer
* Properties that enable clip augs at any angle, not just 45deg
* Optionally equip augs dynamically from CSS using core, without DOM attribute mixins and without JavaScript (no more aug-attr-spliced.js!)
* Border size and Inlay (previously "Inset") distance gained individual top/right/bottom/left options
* Full support global user reach at 92.96%
* Automatic elliptical border-radius fallbacks removed to simplify adding augmented-ui to projects with legacy browser support

v1.1.2 - March 5th, 2020:
* Added data-augmented.css option for data- prefixed augmented-ui attribute.
* Added compatibility notes for specific frameworks/libraries at the bottom of this README

v1.1.0 - September 9th, 2019:
* Increased full support global user reach from ~70% to ~91% with -webkit-clip-path
* Bought an old iPhone to isolate and feature detect the iOS issue found before launch, enabling -webkit-clip-path to be used everywhere else
* Better docs: http://augmented-ui.com/docs/

v1.0.0 - August 31st, 2019:
* Initial release
* -webkit-clip-path support removed before release due to breaking issues on older iOS versions used by ~2% of global users
