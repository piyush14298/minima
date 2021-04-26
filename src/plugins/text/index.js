// FIXME: No selection error
//        when there isn't a selection, the script will add
//        an empty span.hidden_text to somewhere in the DOM.
// FIXME: Multiple occurrence
//        when there are more than one occurence of selected text of the same DOM node,
//        only the first one will get the intended effect

let name = 'Text';

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
};

let enable = () => {
  document.addEventListener('minima.ctrlDoublePressed', hideText);
}
let disable = () => {
  document.removeEventListener('minima.ctrlDoublePressed', hideText);
}

export default {
  name,
  enable,
  disable
};
