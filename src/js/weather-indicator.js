const weatherStates = [
	'rain',
	'thunderstorm',
];
const weatherStatesByHours = [
	'cloud',
	'snow',
	'clear',
];
const allWeatherStates = weatherStates.concat(weatherStatesByHours);
function isWeatherExists(currentWeatherState) {
	return allWeatherStates.find((w) => currentWeatherState.includes(w));
}

// get weather name based on the current hours
function weatherByHours(hours, weather) {
	const weatherName = isWeatherExists(weather.toLowerCase());
	if (hours >= 5 && hours < 12) {
		return `morning-${weatherName}`;
	}
	if (hours >= 12 && hours < 18) {
		return `afternoon-${weatherName}`;
	}
	return `night-${weatherName}`;
}

// get the daytime and the name of the weather concatenated together
// then use it as a className for the hero element
export default function getAppropriateWeatherImg(hours, weather) {
	const currentWeatherState = weather.toLowerCase();
	if (isWeatherExists(currentWeatherState)) {
		if (weatherStatesByHours.find((w) => currentWeatherState.includes(w))) {
			return weatherByHours(hours, currentWeatherState);
		}
		return weatherStates.find((w) => currentWeatherState.includes(w));
	}
	return weatherByHours(hours, 'clear');
}
