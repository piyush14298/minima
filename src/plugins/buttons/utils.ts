export function stringToMap(str: string) {
	let returnMap: Map<string,string> = new Map();
	const splitSrings: Array<string> = str.split('||');
	splitSrings.forEach((value: string) => {
		if (value!='') {
			const keyValPair: Array<string> = value.split('|');
			returnMap.set(keyValPair[0],keyValPair[1]);
		}
	})
	return returnMap;
}

export function mapToString(map: Map<string,string>) {
	let retString: string[] = [];

	map.forEach((value:string, key:string) => {
		retString.push(key);
		retString.push('|');
		retString.push(value);
		retString.push('||');
	});

	return retString.join('');
}

export const convertCamelCaseBack = (str: string) => {
	let ret = "";

	for (var i=0; i<str.length; i++) {
		if (str[i] >= 'A' && str[i] <= 'Z') {
			ret+="-"+str[i].toLowerCase();
		} else {
			ret+=str[i];
		}
	}
	return ret;
}

export const convertColor = (rgb: String) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`