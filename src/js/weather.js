import { whitespaceReplacer, hasSpaces, loadJson } from '../helpers';

// module pattern that arranges the fetched data using API in
// particular different uses
const Weather = (() => {
	const EXCLUDE = 'minutely';
	const API_KEY = {
		weather: 'fa65f5a4f35f8c9a4cd735a6794af915',
		location: 'pk.960bef9b58caf12f4d456466ec2a42f8',
	};
	const LOCATION_TYPE = [
		'continent',
		'city',
		'suburb',
		'administrative',
	];

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
		setSearchArea(whitespaceReplacer(locationName, '+'));
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

	const displayWeatherWithCoordinates = async (pos) => {
		console.log(pos);
		const { latitude, longitude } = pos.coords;
		setCoordinates(latitude, longitude);
		try {
			const geocode = await loadJson(getGeocodeURL());
			assignUserLocation(geocode);
			return await fetchWeatherData();
		} catch (error) {
			throw new Error(`Error: ${error}`);
		}
	};

	const displayWeatherWithAreaName = () => loadJson(getLocationURL())
		.then((location) => {
			const idealLocation = location.find((place) => LOCATION_TYPE.includes(place.type));
			const { lat, lon, display_name } = idealLocation;
			setCoordinates(lat, lon);
			setAreaName(display_name);
			return fetchWeatherData();
		})
		.catch((error) => {
			throw new Error(`Error: ${error}`);
		});

	return {
		displayWeatherWithCoordinates,
		fetchWeatherData,
		getLat,
		getLon,
		getAreaName,
		displayWeatherWithAreaName,
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
