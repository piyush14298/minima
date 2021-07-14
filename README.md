# minima
A bunch of tools for futzing with the web so I can shoot videos of new features

## Plugins

### Hide Text

Activate by selecting text and double-tapping control. A class will be added to make the text visible only on hover, slowly.

### Replace Image 
Activate by holding shift and clicking on the image. A gallery of images will populate the screen and you can select a image that you'd like to replace the original image.

Include in a page by copying the following text into the JavaScript console:
   var script = document.createElement('script');
   script.src = '//github.com/saurya/minima/blob/main/textok/hide_text.js';
   script.type = 'text/javascript';
   document.getElementsByTagName('head')[0].appendChild(script);

## Adding new plugin

Create your plugin under `plugins` directory and register the plugin by editing `plugins/index.js`.
The plugin's `index.js` must export plugin `name` and `enable`/`disable` methods to be called by minima.

## Development

- Edit index.js.
- Run `yarn run webpack` to compile `src/index.js` to `dist/main.js`
- Edit configs in `bookmarklet.js` to reflect development configs.
- Run http-server by running `yarn run http-server`
- Compile bookmarklet by running `yarn run bookmarklet bookmarklet.js --demo bookmarklet.html`
- Open `http://localhost:8080/bookmarklet.html` and drag and drop minima button to the bookmark bar.
- Run bookmarklet on any webpage by pressing the bookmark.

## Going to production

- `bookmarklet.html` is compiled using the configurations between the two `==Bookmarklet==` anchors.
- Since `jsdelivr` caches the scripts, we'll need to use tags to deliver each versions.
- edit configs in `bookmarklet.js` so that the correct config and correct tag (e.g `@0.0.2`) is between `==Bookmarklet==` anchors
- Compile bookmarklet by running `yarn run bookmarklet bookmarklet.js --demo bookmarklet.html`
- Push to repo with git tag
