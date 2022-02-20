import './scss/reset.scss';
import './scss/styles.scss';
import DOM from './js/dom-collections';
import Weather from './js/weather';
import { showCurrentWeather, displayFetchedWeatherData } from './js/view';
import { currentUnitIsCelcius, toggleTemp } from './js/units';
import { toggleHeaderBgColor } from './js/UI';

window.onload = () => {
	showCurrentWeather();
};

window.onscroll = () => {
	toggleHeaderBgColor();
};

// EVENT LISTENERS
DOM.locationIcon.onclick = () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(Weather.fetchCoordinatesToGetArea);
		displayFetchedWeatherData();
	} else {
		throw new Error('Geolocation is not supported by this browser');
	}
};

DOM.searchbar.addEventListener('submit', (e) => {
	e.preventDefault();
	Weather.displayWeatherDataByInput();
	displayFetchedWeatherData();
});

DOM.searchbarBtn.addEventListener('click', (e) => {
	e.preventDefault();
	Weather.displayWeatherDataByInput();
	displayFetchedWeatherData();
});

// toggle between celcius and fahrenheit
DOM.unitToggle.addEventListener('click', () => {
	toggleTemp();
	DOM.celInput.checked = currentUnitIsCelcius();
	DOM.fahInput.checked = !currentUnitIsCelcius();
	showCurrentWeather();
});
