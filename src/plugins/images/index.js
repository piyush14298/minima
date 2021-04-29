// Simple replacement of images.
// let all images be clickable

let name = 'Images'

let createChooser = () => {
  let imagesChoiceTemplate = `<div id="minima-images-choice">
    <div class="minima-card">
      <div class="minima-card-title">
        <h6>Select Image</h6>
      </div>
      <div class="minima-card-body">
        <a href="#" id="minima-images-replacer">Replace</a>
      </div>
    </div>
  </div>`;

  let chooser = document.createElement('div');
  chooser.id = 'minima-images-container';
  chooser.innerHTML = imagesChoiceTemplate;
  return chooser;
}

let chooser = createChooser();

let positionChooser = (x, y) => {
  let div = document.getElementById('minima-images-choice');
  div.style.left = `${x}px`;
  div.style.top = `${y}px`;
}

let insertChooser = (event) => {
  document.getElementsByTagName('body')[0].appendChild(chooser);
  positionChooser(event.clientX, event.clientY);

  let replaceImage = (e) => {
    e.preventDefault();
    let img = event.target;
    let picsumUrl = `https://picsum.photos/${img.clientWidth}/${img.clientHeight}`;

    img.src = picsumUrl;
    // some img tags come with srcset attribute
    if(img.srcset){
      img.srcset = `${picsumUrl} 1x`
    }
    chooser.remove();
  };

  let replaceBtn = document.getElementById('minima-images-replacer');
  replaceBtn.addEventListener('click', replaceImage);
}

let shiftClickListener = (event) => {
  if(!event.shiftKey) { return true; }

  insertChooser(event);
}

let enable = () => {
  Array.from(document.querySelectorAll('img')).forEach(function(img){
    img.addEventListener('click', shiftClickListener);
  });
}

let disable = () => {
  Array.from(document.querySelectorAll('img')).forEach(function(img){
    img.removeEventListener('click', shiftClickListener);
  });
}

export default {
  name,
  enable,
  disable
};
