let name = "Buttons";
let tooltip = "Shift click the buttons to activate"

// Array of [elementID, elementCssProperty]
let stylesToCover = [
	['button-studio-width', 'width'],
	['button-studio-height', 'height'],
	['button-studio-color', 'color'],
	['button-studio-background-color','background-color'],
	['button-studio-border', 'border'],
	['button-studio-border-radius', 'border-radius'],
	['button-studio-font-size', 'font-size']
];

let createChooser = () => {
    let chooser = document.createElement('div');
    chooser.id = 'minima-images-container';
    
    fetch('/src/plugins/buttons/sideNav.html')
    .then(function (response) {
    return response.text();
    })
    .then(function (html) {
        chooser.innerHTML = html;
    });

    return chooser;
}
  
let chooser = createChooser();

let positionChooser = (x, y) => {
    let div = document.getElementsByClassName('button-container')[0];
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
}

let setDefaults = (event) => {
    let style = window.getComputedStyle(event.target);
	stylesToCover.forEach(element => {
		document.getElementById(element[0]).setAttribute('value', style.getPropertyValue(element[1]))
	});
	document.getElementById('button-studio-text').setAttribute('value', event.target.innerHTML);
}

let addRealTimeUpdation = (event) => {
	stylesToCover.forEach(element => {
		document.getElementById(element[0]).addEventListener("keyup", ()=>{
			var x = document.getElementById(element[0]);
			event.target.style.setProperty(element[1], x.value);
		});
	})
	document.getElementById('button-studio-text').addEventListener("keyup", ()=>{
		var x = document.getElementById('button-studio-text');
		event.target.innerHTML = x.value;
	});
}

let insertChooser = (event) => {
    document.getElementsByTagName('body')[0].appendChild(chooser);

    setDefaults(event);

    positionChooser(event.clientX, event.clientY);

    addRealTimeUpdation(event);
    
    let closeChooser = () => {
        chooser.remove();
    }

    document.getElementById("updateButtonClose").addEventListener('click',closeChooser);
}

let shiftClickListener = (event) => {
    if(!event.shiftKey) { return true; }
	// console.log(window.getComputedStyle(event.target));

    insertChooser(event);
}

let enable = () => {
    Array.from(document.querySelectorAll('button')).forEach(function(button){
        button.addEventListener('click', shiftClickListener);
    });
}
let disable = () => {
    Array.from(document.querySelectorAll('button')).forEach(function(button){
        button.removeEventListener('click', shiftClickListener);
    });
}

export default {
    name,
	tooltip,
    enable,
    disable
};