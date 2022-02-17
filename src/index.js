import './scss/reset.scss';
import './scss/styles.scss';

import DOM from './js/dom-collections';
import Weather from './js/weather';

import {
	displayWeatherData,
} from './js/view';

// EVENT LISTENERS
// DOM.locationIcon.onclick = () => {
// 	if (navigator.geolocation) {
// 		navigator.geolocation.getCurrentPosition(getCoordinatesFromUser);
// 	} else {
// 		throw new Error('Geolocation is not supported by this browser');
// 	}
// };

window.onload = () => {
	displayWeatherData();
};

// export async function getAreaFromCoordinates({ lat, lon }) {
// 	const URL = `https://geocode.xyz/${lat},${lon}?json=1`;
// 	try {
// 		const response = await fetch(URL, { mode: 'cors' });
// 		const data = await response.json();
// 		return data;
// 	} catch (error) {
// 		return alert(`Error: ${error}`);
// 	}
// }
