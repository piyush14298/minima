var script = document.createElement('script');
script.src = '//code.jquery.com/jquery-latest.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

var selectionScript = document.createElement('script');
selectionScript.src = '//madapaja.github.io/jquery.selection/src/jquery.selection.js'
selectionScript.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(selectionScript);

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
}

animate = function(htmlSelection) {
  $.selection('insert', {text: '<span class="animate_crazy">', mode: 'before'});
  $.selection('insert', {text: '</span>', mode: 'after'});
};

// Insert CSS for animate_crazy

// (Optional) Turn on Javascript context menu

// TODO: Split the text into spans and re-insert into the document and add transitions to slowly make the spans visible again (ideally from left to right)

// TODO: Use Web Audio to play Broken Coda

