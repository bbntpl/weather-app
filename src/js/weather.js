export async function getAreaFromCoordinates({ lat, lon }) {
	const URL = `https://geocode.xyz/${lat},${lon}?json=1`;
	try {
		const response = await fetch(URL, { mode: 'cors' });
		const data = await response.json();
		return data;
	} catch (error) {
		return alert(`Error: ${error}`);
	}
}

export async function defaultLocation() {
	// latitude and langitude of Barcelona, Spain
	const lat = 41.39;
	const lon = 2.15;

	fetchData.setCoordinates(lat, lon);
	fetchData.setAreaName('North Pole');
	const data = await fetchData.getWeatherURL();
	try {
		await fetchWeatherData(data);
	} catch (e) {
		console.log(`Error: ${e}`);
	}
}

function locationInput(areaInput) {
	const str = `${areaInput.value}`;

	// replace the whitespaces with '+' as a parameter for api call
	return str.split('').map((x) => (x === ' ' ? '+' : x)).join('');
};

// display default
window.onload = () => {
	defaultLocation();
};