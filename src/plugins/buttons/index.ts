import {
	updateButtonText,
	updateButtonDimensions,
	updateButtonTextColor,
	updateButtonBackgroundColor,
	updateButtonFontFamily,
	updateButtonFontSize,
	buttonDimensionSelector,
	buttonTextSelector,
	buttonTextColorSelector,
	buttonBackgroundColorSelector,
	buttonFontFamilySelector,
	buttonFontSizeSelector
} from './features/studioSlice';

import store from './store';

import {
	Dimension,
	ButtonStudioState
} from './features/studioSlice';

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
	['button-studio-font-size', 'font-size'],
	['button-studio-font-family', 'font-family']
];

let buttonChoices = [
	['updateButtonChoice1','/src/plugins/buttons/buttonChoice1.txt'],
	['updateButtonChoice2','/src/plugins/buttons/buttonChoice2.txt'],
	['updateButtonChoice3','/src/plugins/buttons/buttonChoice3.txt'],
	['updateButtonChoice4','/src/plugins/buttons/buttonChoice4.txt']
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

let positionChooser = (x: any, y: any) => {
    let div = document.getElementsByClassName('button-container')[0];
	div.setAttribute('style', `left:${x}px; top:${y}px`);
    // div.style.left = `${x}px`;
    // div.style.top = `${y}px`;
}

let updateButtonCssProperties = (event: any) => {
	const dimension: Dimension = buttonDimensionSelector(store.getState());
	event.target.style.width = dimension.width;
	event.target.style.height = dimension.height;

	event.target.innerHTML = buttonTextSelector(store.getState());
	event.target.style.color = buttonTextColorSelector(store.getState());
	event.target.style.backgroundColor = buttonBackgroundColorSelector(store.getState());
	event.target.style.fontFamily = buttonFontFamilySelector(store.getState());
	event.target.style.fontSize = buttonFontSizeSelector(store.getState());
}

const convertColor = (rgb: String) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

let setDefaults = (event: any) => {
    let style = window.getComputedStyle(event.target);

	//updating Dimensions
	const dimensions: Dimension = {
		width: style.width,
		height: style.height
	}
	store.dispatch(updateButtonDimensions(dimensions));

	//updating Button text
	store.dispatch(updateButtonText(event.target.innerHTML));

	//updating Button text color
	store.dispatch(updateButtonTextColor(style.color));

	//updating background color
	store.dispatch(updateButtonBackgroundColor(style.backgroundColor));

	//updating font family
	store.dispatch(updateButtonFontFamily(style.fontFamily));

	//updating font size
	store.dispatch(updateButtonFontSize(style.fontSize));

	stylesToCover.forEach(element => {
		document.getElementById(element[0]).setAttribute('value', style.getPropertyValue(element[1]))
	});
	document.getElementById('button-studio-color').setAttribute('value', convertColor(style.color));
	document.getElementById('button-studio-text').setAttribute('value', event.target.innerHTML);

	updateButtonCssProperties(event);
}

let addRealTimeUpdation = (event: any) => {

	document.getElementById("button-studio-width").addEventListener("change", ()=> {
		var x = document.getElementById("button-studio-width") as HTMLInputElement;
		const width = x.value;
		var y = document.getElementById("button-studio-height") as HTMLInputElement;
		const height = y.value;
		const dimensions: Dimension = {
			width: width,
			height: height
		};
		store.dispatch(updateButtonDimensions(dimensions));
		updateButtonCssProperties(event);
		console.log(store.getState());
	});

	document.getElementById("button-studio-height").addEventListener("change", ()=> {
		var x = document.getElementById("button-studio-width") as HTMLInputElement;
		const width = x.value;
		var y = document.getElementById("button-studio-height") as HTMLInputElement;
		const height = y.value;
		const dimensions: Dimension = {
			width: width,
			height: height
		};
		store.dispatch(updateButtonDimensions(dimensions));
		updateButtonCssProperties(event);
	});

	document.getElementById("button-studio-text").addEventListener("keyup", ()=>{
		var x = document.getElementById("button-studio-text") as HTMLInputElement;
		store.dispatch(updateButtonText(x.value));
		updateButtonCssProperties(event);
	});

	document.getElementById("button-studio-color").addEventListener("keyup", ()=>{
		var x = document.getElementById("button-studio-color") as HTMLInputElement;
		store.dispatch(updateButtonTextColor(x.value));
		updateButtonCssProperties(event);
	});

	document.getElementById("button-studio-background-color").addEventListener("keyup", ()=>{
		var x = document.getElementById("button-studio-background-color") as HTMLInputElement;
		store.dispatch(updateButtonBackgroundColor(x.value));
		updateButtonCssProperties(event);
	});

	document.getElementById("button-studio-font-size").addEventListener("keyup", ()=>{
		var x = document.getElementById("button-studio-font-size") as HTMLInputElement;
		store.dispatch(updateButtonFontSize(x.value));
		updateButtonCssProperties(event);
	});

	document.getElementById("button-studio-font-family").addEventListener("keyup", ()=>{
		var x = document.getElementById("button-studio-font-family") as HTMLInputElement;
		store.dispatch(updateButtonFontFamily(x.value));
		updateButtonCssProperties(event);
	});
}

let closeChooser = () => {
	chooser.remove();
}

let updateButtonChoices = (event: any) => {
	buttonChoices.forEach(buttonChoice => {
		document.getElementById(buttonChoice[0]).setAttribute('value', event.target.innerHTML);// = event.target.innerHTML;
		fetch(buttonChoice[1])
		.then(function (response) {
		return response.text();
		})
		.then(function (css) {
			document.getElementById(buttonChoice[0]).style.cssText = css;
		});
		
		document.getElementById(buttonChoice[0]).addEventListener('click', ()=>{
			event.target.style.cssText = document.getElementById(buttonChoice[0]).style.cssText;//document.getElementById(buttonChoice).style.color;
			closeChooser();
		});
	});
}

let insertChooser = (event: any) => {
    document.getElementsByTagName('body')[0].appendChild(chooser);

	updateButtonChoices(event);

    setDefaults(event);

    positionChooser(event.clientX, event.clientY);

    addRealTimeUpdation(event);

    document.getElementById("updateButtonClose").addEventListener('click',closeChooser);
}

let shiftClickListener = (event: MouseEvent) => {
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