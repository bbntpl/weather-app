import './scss/reset.scss';
import './scss/styles.scss';

import DOM from './js/dom-collections';
import Weather from './js/weather';

import {
	displayWeatherData,
} from './js/view';

// EVENT LISTENERS
DOM.locationIcon.onclick = () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(Weather.fetchCoordinatesToGetArea);
		displayWeatherData();
	} else {
		throw new Error('Geolocation is not supported by this browser');
	}
};

window.onload = () => {
	displayWeatherData();
};

DOM.searchbar.addEventListener('submit', (e) => {
	if (!DOM.searchbar.value) return;
	e.preventDefault();
	Weather.setLocationName(DOM.searchbar.value);
});

DOM.searchbarIcon.addEventListener('click', (e) => {
	if (!DOM.searchbar.value) return;
	e.preventDefault();
	Weather.setLocationName(DOM.searchbar.value);
});
