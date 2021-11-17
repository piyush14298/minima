import {
	buttonCssSelector,
	updateButtonCss,
	stateInfo,
	ButtonStudioState
} from './features/studioSlice';

import store from './store';

import {
	stringToMap,
	mapToString,
	convertCamelCaseBack,
	convertColor
} from './utils';

let name = "Buttons";
let tooltip = "Shift click the buttons to activate"
let uniqueVal = 1;
const defaultState: Map<string, string> = new Map();

// Array of [elementID, elementCssProperty, valToFindInCssString, eventToBeListened]
let stylesToCover = [
	['button-studio-width', 'width', ';width:', 'change'],
	['button-studio-height', 'height', ';height:', 'change'],
	['button-studio-color', 'color', ';color:', 'change'],
	['button-studio-background-color','background-color:', ';background-color', 'keyup'],
	['button-studio-border', 'border', ';border:', 'keyup'],
	['button-studio-border-radius', 'border-radius', ';border-radius:', 'change'],
	['button-studio-font-size', 'font-size', ';font-size:', 'keyup'],
	['button-studio-font-family', 'font-family', ';font-family:', 'keyup']
];

let buttonChoices = [
	['updateButtonChoice1','/src/plugins/buttons/buttonChoice1.txt'],
	['updateButtonChoice2','/src/plugins/buttons/buttonChoice2.txt'],
	['updateButtonChoice3','/src/plugins/buttons/buttonChoice3.txt'],
	['updateButtonChoice4','/src/plugins/buttons/buttonChoice4.txt']
];

/**
 * get computed style for an element, excluding any default styles
 *
 * @param {DOM} element
 * @return {object} difference
 */

 function getStylesWithoutDefaults( element: HTMLElement ) {

	// creating an empty dummy object to compare with
	var dummy = document.createElement( 'element-' + ( new Date().getTime() ) );
	document.body.appendChild( dummy );
  
	// getting computed styles for both elements
	var defaultStyles = getComputedStyle( dummy );
	var elementStyles = getComputedStyle( element );
  
	// calculating the difference
	var diff = "";
	for( var key in elementStyles ) {
	  if(elementStyles.hasOwnProperty(key)
			&& defaultStyles[ key ] !== elementStyles[ key ] )
	  {
		diff+= convertCamelCaseBack(key) + ':' + elementStyles[ key ] + ';';
	  }
	}
  
	// clear dom
	dummy.remove();
  
	return diff;
  }

let updateCssString = (event: any, keyToUpdate: string, value: string) => {
	let currentCss = stringToMap(buttonCssSelector(store.getState())).get(event.target.getAttribute('minima-updated'));

	// If the key is new to the CSS, add it to the CSS, else
	// update the value
	if (currentCss.indexOf(keyToUpdate) == -1) {
		const splitCurrentCss = currentCss.split('');
		splitCurrentCss.splice(0,0,keyToUpdate+":"+value+';');
		const newCss = splitCurrentCss.join('');
		let newState = stringToMap(buttonCssSelector(store.getState()));
		newState.set(event.target.getAttribute('minima-updated'), newCss);
		store.dispatch(updateButtonCss(mapToString(newState)));
	} else {
		let indexOfKey = currentCss.indexOf(keyToUpdate);
		while (currentCss[indexOfKey++] != ':');
		let startIndexOfVal = indexOfKey;
		let endIndexOfVal = startIndexOfVal;
		while (currentCss[endIndexOfVal++] != ';');
		endIndexOfVal-=1;
		const newCss = currentCss.substr(0,indexOfKey) + value + currentCss.substr(endIndexOfVal);
		// console.log(newCss);
		let newState = stringToMap(buttonCssSelector(store.getState()));
		newState.set(event.target.getAttribute('minima-updated'), newCss);
		store.dispatch(updateButtonCss(mapToString(newState)));
	}
}

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
	const presentSate = stringToMap(buttonCssSelector(store.getState()));
	presentSate.forEach((css, elementId) => {
		const target = document.querySelector('[minima-updated="'+elementId+'"]');
		target.setAttribute("style", css);
	});
	// event.target.setAttribute("style", stringToMap(buttonCssSelector(store.getState())).get(event.target.id));
}

let setDefaults = (event: any) => {
	let style = window.getComputedStyle(event.target);
	stylesToCover.forEach(element => {
		document.getElementById(element[0]).setAttribute('value', style.getPropertyValue(element[1]))
	});
	document.getElementById('button-studio-color').setAttribute('value', convertColor(style.color));
	document.getElementById('button-studio-text').setAttribute('value', event.target.innerHTML);

	updateButtonCssProperties(event);
}

function realTimeUpdateHelper(event: any, element: Array<string>) {
	var x = document.getElementById(element[0]) as HTMLInputElement;
	var val = x.value;
	if (element[1] == 'border-radius') {
		val += 'px';
	}
	updateCssString(event, element[2], val);
	updateButtonCssProperties(event);
}

function addRealTimeUpdation(event: any) {

	stylesToCover.forEach(element => {
		document.getElementById(element[0]).replaceWith(document.getElementById(element[0]).cloneNode(true));
	})

	stylesToCover.forEach(element => {
		document.getElementById(element[0]).addEventListener(element[3], () => {
			realTimeUpdateHelper(event, element);
		})
	});
}

function sleep(ms: any) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function recordScreen() {
    return await navigator.mediaDevices.getDisplayMedia({
        audio: false, 
        video: true,
    });
}

function createRecorder (stream: MediaStream, mimeType: string) {
	// the stream data is stored in this array
	let recordedChunks: Array<BlobEvent["data"]> = []; 
  
	const mediaRecorder = new MediaRecorder(stream);
  
	mediaRecorder.ondataavailable = function (e) {
	  if (e.data.size > 0) {
		recordedChunks.push(e.data);
	  }  
	};
	mediaRecorder.onstop = function () {
	   saveFile(recordedChunks);
	   recordedChunks = [];
	};
	mediaRecorder.start(200); // For every 200ms the stream data will be stored in a separate chunk.
	return mediaRecorder;
}

function saveFile(recordedChunks: Array<BlobEvent["data"]>){

	const blob = new Blob(recordedChunks, {
	   type: 'video/webm'
	 });
	 let filename = document.getElementById("file-name") as HTMLInputElement,
		 downloadLink = document.createElement('a');
	 downloadLink.href = URL.createObjectURL(blob);
	 downloadLink.download = `${filename.value}.webm`;
 
	 document.body.appendChild(downloadLink);
	 downloadLink.click();
	//  URL.revokeObjectURL(blob); // clear from memory
	 document.body.removeChild(downloadLink);
}

async function customScript() {
	console.log(stateInfo);
	const startFrame = document.getElementById("start-frame") as HTMLInputElement;
	const endFrame = document.getElementById("end-frame") as HTMLInputElement;
	const timeDelay = document.getElementById("time-delay") as HTMLInputElement;

	const firstFrame = Number(startFrame.value);
	const lastFrame = Number(endFrame.value);
	const delay = Number(timeDelay.value);

	let stream = await recordScreen();
    let mimeType = 'video/webm';
    let mediaRecorder = createRecorder(stream, mimeType);

	const firstState = stringToMap(stateInfo[firstFrame].state);

	defaultState.forEach((css, id) => {
		if (firstState.has(id)) {
			var target = document.querySelector('[minima-updated="'+id+'"]');
			target.setAttribute("style", firstState.get(id));
		} else {
			var target = document.querySelector('[minima-updated="'+id+'"]');
			target.setAttribute("style", css);
		}
	});
	await sleep(delay);

	for(var i=firstFrame+1; i<=lastFrame && i<stateInfo.length; i++) {
		console.log(i);
		const presentState = stringToMap(stateInfo[i].state);
		presentState.forEach((css, elementId) => {
			var target = document.querySelector('[minima-updated="'+elementId+'"]');
			target.setAttribute("style", css);
		});
		await sleep(delay);
	}
	mediaRecorder.stop();
	const lastState = stringToMap(stateInfo[stateInfo.length-1].state);
	lastState.forEach((css, elementId) => {
		var target = document.querySelector('[minima-updated="'+elementId+'"]');
		target.setAttribute("style", css);
	})
	
}

let closeChooser = () => {
	chooser.remove();
}

// let updateButtonChoices = (event: any) => {
// 	buttonChoices.forEach(buttonChoice => {
// 		document.getElementById(buttonChoice[0]).setAttribute('value', event.target.innerHTML);
// 		fetch(buttonChoice[1])
// 		.then(function (response) {
// 		return response.text();
// 		})
// 		.then(function (css) {
// 			document.getElementById(buttonChoice[0]).style.cssText = css;
// 		});
		
// 		document.getElementById(buttonChoice[0]).addEventListener('click', ()=>{
// 			store.dispatch(updateButtonCss(document.getElementById(buttonChoice[0]).style.cssText));
// 			updateButtonCssProperties(event);
// 			closeChooser();
// 		});
// 	});
// }


let insertChooser = (event: any) => {
    document.getElementsByTagName('body')[0].appendChild(chooser);

	const minimaClassName = event.target.getAttribute('minima-updated');
	
	let css = getStylesWithoutDefaults(event.target);

	if (minimaClassName == null) {
		event.target.classList.add("minima-updated-"+uniqueVal.toString());
		event.target.setAttribute('minima-updated', uniqueVal);
		defaultState.set(event.target.getAttribute('minima-updated'), css);
		let newState: Map<string,string> = new Map();
		let currentState = stringToMap(buttonCssSelector(store.getState()));
		currentState.forEach((cssValue, elementId) => {
			newState.set(elementId,cssValue);
		});
		newState.set(event.target.getAttribute('minima-updated'), css);
		store.dispatch(updateButtonCss(mapToString(newState)));
		uniqueVal+=1;
	}

	// updateButtonChoices(event);

    setDefaults(event);

    positionChooser(event.clientX, event.clientY);

    addRealTimeUpdation(event);

    document.getElementById("updateButtonClose").addEventListener('click',() => {
		closeChooser();
	});
}

let shiftClickListener = (event: MouseEvent) => {
    if(!event.shiftKey) { return true; }

    insertChooser(event);
}

let enable = () => {
    Array.from(document.getElementsByTagName('button')).forEach(function(button){
        button.addEventListener('click', shiftClickListener);
    });
	document.getElementById("customScript").addEventListener('click', customScript);
}
let disable = () => {
    Array.from(document.getElementsByTagName('button')).forEach(function(button){
        button.removeEventListener('click', shiftClickListener);
    });
	document.getElementById("customScript").removeEventListener('click', customScript);
}

export default {
    name,
	tooltip,
    enable,
    disable
};