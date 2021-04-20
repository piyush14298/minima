import registerPlugins from './plugins';

console.log('script loaded');

let ctrlPressed = false;
let ctrlPressedListener = (event) => {
  if(!event.ctrlKey){ return true; }

  if(ctrlPressed){
    // control pressed second time
    ctrlPressed = false;
    const event = new Event('minima.ctrlDoublePressed');
    document.dispatchEvent(event);
  }else{
    ctrlPressed = true;
    // ctrl needed to be double pressed within one second
    setTimeout(() => ctrlPressed = false, 1000);
  }
};
document.addEventListener('keydown', ctrlPressedListener);

registerPlugins();
