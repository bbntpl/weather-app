// convert the values of the data to a different unit
const DIRECTIONS = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
	'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];

// starting range for each direction in 360 degree format
const RANGE = [349, 11, 34, 56, 78, 101, 124, 146,
	169, 191, 214, 235, 259, 281, 304, 326];

let isTempCelcius = true;

// validate the current temp unit
const checkTempUnit = () => {
	const tempUnit = isTempCelcius ? 'C' : 'F';
	return `${String.fromCharCode(176)}${tempUnit}`;
};

// toggle the temperature unit
const toggleTemp = () => {
	isTempCelcius = !isTempCelcius;
};

const currentUnitIsCelcius = () => isTempCelcius;

// translate from kelvin to celcius
const kelvinToCelcius = (K) => {
	const celcius = K - 273.15;
	return `${Math.round(celcius)}${String.fromCharCode(176)}C`;
};

// translate from kelvin to fahrenheit
const kelvinToFahrenheit = (K) => {
	const fah = 1.8 * (K - 273.15) + 32;
	return `${Math.round(fah)}${String.fromCharCode(176)}F`;
};
// converts all the temperature output when the temp is switched to a different unit
const convertTemp = (t) => (isTempCelcius === true ? kelvinToCelcius(t) : kelvinToFahrenheit(t));

// meter/second to meter per hour
const windSpeedToMPH = (n) => Math.round(n * 2.237);

// replace the 0 - 360 degree with N,E,W,S
const windDegToDir = (n) => {
	let directionNumber = n;
	if (directionNumber > 349) {
		directionNumber = 0;
	}
	const directionRange = (_, i) => {
		const newIndex = (i + DIRECTIONS.length) % DIRECTIONS.length;
		return directionNumber > RANGE[i] || directionNumber < RANGE[newIndex + 1];
	};
	const directionIndex = DIRECTIONS.findIndex(directionRange);
	return DIRECTIONS[directionIndex];
};

export {
	checkTempUnit,
	currentUnitIsCelcius,
	toggleTemp,
	convertTemp,
	windSpeedToMPH,
	windDegToDir,
};
