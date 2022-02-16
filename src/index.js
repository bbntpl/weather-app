import './styles/main.scss';

// const LOCATION_API_KEY = 'pk.960bef9b58caf12f4d456466ec2a42f8';
const WEATHER_API_KEY = '0c73b72398c0bfc8c59ca8058faf1eb4';

// q = London, uk; APPID=API_KEY
function getWeatherApiUrl(query, apiKey) {
	return `http://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=${apiKey}`;
}

async function loadJson(url) {
	const response = await fetch(url);
	if (response.status === 200) {
		return response.json();
	}
	throw new Error(response);
}

loadJson(getWeatherApiUrl('niger', WEATHER_API_KEY)).then((result) => console.log(result));
