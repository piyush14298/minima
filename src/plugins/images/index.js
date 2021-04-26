// Simple replacement of images.
// let all images be clickable

let name = 'Images'

let shiftClickListener = (event) => {
  if(!event.shiftKey) { return true; }

  event.target.src = "https://picsum.photos/200";
  // some img tags come with srcset attribute
  if(event.target.srcset){
    event.target.srcset = "https://picsum.photos/200 1x"
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
