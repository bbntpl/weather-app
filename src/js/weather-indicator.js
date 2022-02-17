const WeatherIndicator = (() => {
	const WEATHER = {
		clearSky: '',
		cloudy: '',
		stormy: '',
		snowy: '',
		rainy: '',
	};

	const TIME = {
		sunlight: '',
		afternoon: '',
		night: '',
	};

	return {
		WEATHER,
		TIME,
	};
})();

export default WeatherIndicator;
