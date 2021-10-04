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

let setDefaults = (event: any) => {
    let style = window.getComputedStyle(event.target);
	stylesToCover.forEach(element => {
		document.getElementById(element[0]).setAttribute('value', style.getPropertyValue(element[1]))
	});
	document.getElementById('button-studio-text').setAttribute('value', event.target.innerHTML);
}

let addRealTimeUpdation = (event: any) => {
	stylesToCover.forEach(element => {
		document.getElementById(element[0]).addEventListener("keyup", ()=>{
			var x = document.getElementById(element[0]) as HTMLInputElement;
			event.target.style.setProperty(element[1], x.value);
		});
	})
	document.getElementById('button-studio-text').addEventListener("keyup", ()=>{
		var x = document.getElementById('button-studio-text') as HTMLInputElement;
		event.target.innerHTML = x.value;
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