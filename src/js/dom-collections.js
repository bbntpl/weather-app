const DOM = (() => ({
	// DOM instances of header elements
	searchbarInput: document.getElementById('searchbar__input'),
	searchbarIcon: document.getElementById('search-icon'),

	// DOM instances of current weather component
	currentLocation: document.querySelector('.current__location'),
	currentTime: document.querySelector('.current__time'),
	currentDate: document.querySelector('.current__date'),
	unitToggle: document.querySelector('unit__toggle'),
	currentTemp: document.querySelector('unit'),
	currentAdditionalInfo: document.querySelector('current-additional-info'),

	// DOM instances of hourly weather component
	hourlyWeather: document.getElementById('weather-hourly-container'),

	// DOM instances of daily weather component
	dailyWeather: document.getElementById('weather-daily-container'),
}))();

export default DOM;
