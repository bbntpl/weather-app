import { whitespaceReplacer, hasSpaces, loadJson } from '../helpers';
import DOM from './dom-collections';

// module pattern that arranges the fetched data using API in
// particular different uses
const Weather = (() => {
	const EXCLUDE = 'minutely';
	const API_KEY = {
		weather: 'fa65f5a4f35f8c9a4cd735a6794af915',
		location: 'pk.960bef9b58caf12f4d456466ec2a42f8',
	};

	// default location after window loaded
	let weatherData;
	let lat = 41.39; 	// latitude and langitude of Barcelona, Spain
	let lon = 2.15;
	let searchArea;
	let areaName = 'Barcelona, Spain';

	const setCoordinates = (nLat, nLon) => {
		lat = nLat;
		lon = nLon;
	};

	const setSearchArea = (v) => {
		searchArea = v;
	};

	const setAreaName = (v) => {
		areaName = v;
	};

	const setLocationName = (locationName) => {
		setSearchArea(whitespaceReplacer(locationName));
		setAreaName(locationName);
	};

	const setWeatherData = (data) => {
		weatherData = data;
	};

	const getWeatherData = () => weatherData;

	const getLat = () => lat;

	const getLon = () => lon;

	const getAreaName = () => areaName;

	const getWeatherURL = () => `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${EXCLUDE}&appid=${API_KEY.weather}`;

	const getLocationURL = () => `https://us1.locationiq.com/v1/search.php?key=${API_KEY.location}&q=${searchArea}&format=json`;

	const getGeocodeURL = () => `https://geocode.xyz/${lat},${lon}?json=1`;

	const getWeatherIcon = (icon, size) => `http://openweathermap.org/img/wn/${icon}@${size}.png`;

	const fetchWeatherData = async () => {
		const response = loadJson(getWeatherURL());
		response
			.then((openWeather) => setWeatherData(openWeather))
			.catch((error) => {
				throw new Error(error);
			});

		return response;
	};

	const assignUserLocation = (data) => {
		const isCityExists = data.city && hasSpaces(data.city);
		const isStateExists = data.state || typeof data.state !== 'object';
		// make sure city does not have any space and state is not an object
		if (isCityExists && isStateExists) {
			setAreaName(`${data.city}, ${data.state}`);
			if (typeof data.state === 'object' && data.prov) {
				setAreaName(`${data.city}, ${data.prov}`);
			}
		} else if (data.staddress && data.state) {
			setAreaName(`${data.staddress}, ${data.state}`);
		} else if (data.prov) {
			setAreaName(`${data.staddress}, ${data.prov}`);
		} else {
			setAreaName(data.region);
		}
	};

	const getAreaFromCoordinates = async () => {
		loadJson(getGeocodeURL())
			.then((location) => {
				assignUserLocation(location);
			})
			.catch((error) => {
				throw new Error(`Error: ${error}`);
			});
	};

	// using the coordinates to get the proper area
	const fetchCoordinatesToGetArea = (pos) => {
		const { latitude, longitude } = pos.coords;
		setCoordinates(latitude, longitude);
		getAreaFromCoordinates();
	};

	function displayWeatherDataByInput() {
		const locationName = DOM.searchbarInput.value;
		if (!locationName) return;
		fetchWeatherData();
	}

	return {
		displayWeatherDataByInput,
		fetchCoordinatesToGetArea,
		fetchWeatherData,
		getLat,
		getLon,
		getAreaName,
		getWeatherData,
		getWeatherIcon,
		getWeatherURL,
		getLocationURL,
		setLocationName,
		setCoordinates,
		setSearchArea,
		setAreaName,
	};
})();

export default Weather;