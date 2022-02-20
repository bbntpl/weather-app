const DOM = (() => ({
	header: document.querySelector('.header'),
	content: document.getElementById('content'),
	loading: document.getElementById('loading'),

	// DOM instances of header elements
	locationIcon: document.getElementById('location-icon'),
	searchbar: document.querySelector('.searchbar'),
	searchbarInput: document.getElementById('searchbar__input'),
	searchbarBtn: document.querySelector('.search-btn'),

	// DOM instances of current weather component
	currentLocation: document.querySelector('.current__location'),
	currentTime: document.querySelector('.current__time'),
	currentDate: document.querySelector('.current__date'),
	currentTemp: document.querySelector('.current__temp'),
	currentAdditionalInfo: document.querySelector('.current-additional-info'),

	// DOM instances of unit toggle
	unitToggle: document.querySelector('[data-unit-toggle]'),
	celInput: document.getElementById('cel'),
	fahInput: document.getElementById('fah'),

	// DOM instances of hourly weather component
	hourlyWeather: document.getElementById('weather-hourly-container'),

	// DOM instances of daily weather component
	dailyWeather: document.getElementById('weather-daily-container'),
}))();

export default DOM;
