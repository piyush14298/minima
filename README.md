# minima
A bunch of tools for futzing with the web so I can shoot videos of new features

## TexTok
### Hide Text
Activate by selecting text and double-tapping control. A class will be added to make the text visible only on hover, slowly.

Include in a page by copying the following text into the JavaScript console:
   var script = document.createElement('script');
   script.src = '//saurya.github.io/minima/textok/hide_text.css';
   script.type = 'text/javascript';
   document.getElementsByTagName('head')[0].appendChild(script);

