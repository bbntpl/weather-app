// module pattern that arranges the fetched data using API in
// particular different uses
const Weather = (() => {
	const EXCLUDE = 'minutely';
	const API_KEY = {
		weather: '0c73b72398c0bfc8c59ca8058faf1eb4',
		location: 'pk.960bef9b58caf12f4d456466ec2a42f8',
	};

	// default location after window loaded
	let _lat = 41.39; 	// latitude and langitude of Barcelona, Spain
	let _lon = 2.15;
	let _searchArea;
	let _areaName = 'Barcelona Area, Spain';

	const setCoordinates = (nLat, nLon) => {
		_lat = nLat;
		_lon = nLon;
	};
	const setSearchArea = (v) => {
		_searchArea = v;
	};
	const setAreaName = (v) => {
		_areaName = v;
	};
	const getLat = () => _lat;
	const getLon = () => _lon;
	const getAreaName = () => _areaName;
	const getWeatherURL = () => `https://api.openweathermap.org/data/2.5/onecall?lat=${_lat}&lon=${_lon}&exclude=${EXCLUDE}&appid=${API_KEY.weather}`;
	const getLocationURL = () => `https://us1.locationiq.com/v1/search.php?key=${API_KEY.location}&q=${_searchArea}&format=json`;
	const getWeatherIcon = (icon) => `http://openweathermap.org/img/wn/${icon}@4x.png`;
	const fetchWeatherData = async () => {
		try {
			const response = await fetch(getWeatherURL(), { mode: 'cors' });
			const weatherJson = await response.json();
			return weatherJson;
		} catch (error) {
			throw new Error(error);
		}
	};

	// // get the user's current location
	// async function getCoordinatesFromUser(pos) {
	// 	const lat = pos.coords.latitude;
	// 	const lon = pos.coords.longitude;
	// 	const data = await fetchCoordinatesToGetArea(lat, lon);
	// 	assignUserLocation(data);
	// }

	// // using the coordinates to get the proper area
	// function fetchCoordinatesToGetArea(lat, lon) {
	// 	fetchData.setCoordinates(lat, lon);
	// 	return getAreaFromCoordinates({ lat, lon });
	// }

	// // assign the user's location as current
	// async function assignUserLocation(data) {
	// 	const areaName = locationNameByAPI(data);
	// 	fetchData.setAreaName(areaName);
	// 	try {
	// 		await fetchWeatherData(fetchData.getWeatherURL());
	// 	} catch (e) {
	// 		console.log(`Error: ${e}`);
	// 	}
	// }

	return {
		setCoordinates,
		setSearchArea,
		setAreaName,
		getLat,
		getLon,
		getAreaName,
		getWeatherIcon,
		getWeatherURL,
		getLocationURL,
		fetchWeatherData,
	};
})();

export default Weather;
