var script = document.createElement('script');
script.src = '//code.jquery.com/jquery-latest.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

var stylesheet = document.createElement('link');
stylesheet.rel = "stylesheet"
stylesheet.href= '//saurya.github.io/minima/textok/css/hide_text.css';
document.getElementsByTagName('head')[0].appendChild(stylesheet);

// TODO : Kind of a hacky way of doing it. I'm going to use require.js in the future.
function defer(method) {
    if (window.jQuery) {
        method();
    } else {
        setTimeout(function() { defer(method) }, 50);
    }
}
init_ctrl_listener = function() {
    var selectionScript = document.createElement('script');
        selectionScript.src = '//madapaja.github.io/jquery.selection/src/jquery.selection.js'
        selectionScript.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(selectionScript);


$(document).keydown(function(event) {
    console.log(event);
    if (!event.ctrlKey){ return true; }
    if (document.ctrlPressed) {
      // Get the active element + text selection
      animate();
      document.ctrlPressed = false;
    } else {
      document.ctrlPressed = true;
    }
    event.preventDefault();
});
};

defer(init_ctrl_listener);

animate = function() {
  var selection = window.getSelection();
  console.assert(selection.focusNode == selection.anchorNode);
  var $selectionNode = $(selection.anchorNode.parentElement);
  var selectionText = $.selection('text');

  // TODO: This looks like it will fail if there's no node above it. This might happen only in malformed HTML.
  $selectionNode.html($selectionNode.html().replace(selectionText, '<span class="animate_crazy">' + selectionText + '</span>'));
};

// Insert CSS for animate_crazy

// (Optional) Turn on Javascript context menu

// TODO: Split the text into spans and re-insert into the document and add transitions to slowly make the spans visible again (ideally from left to right)

// TODO: Use Web Audio to play Broken Coda

