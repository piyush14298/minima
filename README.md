# minima
A bunch of tools for futzing with the web so I can shoot videos of new features

## TexTok
### Hide Text
Activate by selecting text and double-tapping control. A class will be added to make the text visible only on hover, slowly.

Include in a page by copying the following text into the JavaScript console:
   var script = document.createElement('script');
   script.src = '//github.com/saurya/minima/blob/main/textok/hide_text.js';
   script.type = 'text/javascript';
   document.getElementsByTagName('head')[0].appendChild(script);

# Development

- Edit index.js.
- Run `yarn run webpack` to compile `src/index.js` to `dist/main.js`
- Edit configs in `bookmarklet.js` to reflect development configs.
- Run http-server by running `yarn run http-server`
- Compile bookmarklet by running `yarn run bookmarklet bookmarklet.js --demo bookmarklet.html`
- Open `http://localhost:8080/bookmarklet.html` and drag and drop minima button to the bookmark bar.
- Run bookmarklet on any webpage by pressing the bookmark.
