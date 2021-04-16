console.log('script loaded');

let ctrlPressed = false;
let ctrlPressedListener = (event) => {
  if(!event.ctrlKey){ return true; }

  if(ctrlPressed){
    // control pressed second time
    ctrlPressed = false;
    hideText();
  }else{
    ctrlPressed = true;
    // ctrl needed to be double pressed within one second
    setTimeout(() => ctrlPressed = false, 1000);
  }
};
document.addEventListener('keydown', ctrlPressedListener);

// FIXME: No selection error
//        when there isn't a selection, the script will add
//        an empty span.hidden_text to somewhere in the DOM.
// FIXME: Multiple occurrence
//        when there are more than one occurence of selected text of the same DOM node,
//        only the first one will get the intended effect
let hideText = () => {
  let selection = window.getSelection();
  console.assert(selection.focusNode == selection.anchorNode);
  let selectionText = selection.toString();
  let selectionNode = selection.anchorNode.parentElement;
  selectionNode.innerHTML = selectionNode.innerHTML.replace(selectionText,
    `<span class="hidden_text">
        ${selectionText}
     </span>`
    );
}

// Simple replacement of images.
// let all images be clickable
let shiftClickListener = (event) => {
  if(!event.shiftKey) { return true; }

  event.target.src = "https://picsum.photos/200";
  // some img tags come with srcset attribute
  if(event.target.srcset){
    event.target.srcset = "https://picsum.photos/200 1x"
  }
}
Array.from(document.querySelectorAll('img')).forEach(function(img){
  img.addEventListener('click', shiftClickListener);
})
