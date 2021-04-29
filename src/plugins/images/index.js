// Simple replacement of images.
// let all images be clickable

let name = 'Images'

let shiftClickListener = (event) => {
  if(!event.shiftKey) { return true; }

  let img = event.target;
  let picsumUrl = `https://picsum.photos/${img.clientWidth}/${img.clientHeight}`;

  img.src = picsumUrl;
  // some img tags come with srcset attribute
  if(img.srcset){
    img.srcset = `${picsumUrl} 1x`
  }
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
