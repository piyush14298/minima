// Simple replacement of images.
// let all images be clickable

let name = 'Images'

let getImages = () => {
  let imageIds = ['0', 1, 10, 100, 1000, 1001]
  let template = imageIds.reduce((product, id) => {
    product = product + `
    <a href="#" data-id="${id}" class="minima-images-replacer">
      <img src="https://picsum.photos/id/${id}/200/200" />
    </a>`;
    return product;
  }, '');
  return template;
}

let createChooser = () => {
  let imagesChoiceTemplate = `<div id="minima-images-choice">
    <div class="minima-card">
      <div class="minima-card-title">
        <h6>Select Image</h6>
      </div>
      <div class="minima-card-body">
        ${getImages()}
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
    let id = e.currentTarget.dataset.id;

    let picsumUrl = `https://picsum.photos/id/${id}/${img.clientWidth}/${img.clientHeight}`;

    img.src = picsumUrl;
    // some img tags come with srcset attribute
    if(img.srcset){
      img.srcset = `${picsumUrl} 1x`
    }
    chooser.remove();
  };

  let replacingImages = document.getElementsByClassName('minima-images-replacer');
  Array.from(replacingImages).forEach(function(img){
    img.addEventListener('click', replaceImage);
  })
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
