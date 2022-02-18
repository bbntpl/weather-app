import DOM from './dom-collections';
import {
	appendChildren,
} from '../helpers';
import CurrentWeatherDetails from '../components/CurrentWeatherDetails';
import DailyCard from '../components/DailyCard';
import HourlyCard from '../components/HourlyCard';

import Weather from './weather';
import {
	formatHourOnly,
	formatShortDate,
	formatFullDate,
	convertTZ,
	updateClock,
	getLocalDate,
} from './time';
import {
	convertTemp,
	windDegToDir,
	windSpeedToMPH,
	toggleTemp,
	currentUnitIsCelcius,
} from './units';

function displayWeatherDetails(currentEntries) {
	const weatherDetails = [];
	currentEntries.forEach((entry) => {
		weatherDetails.push(CurrentWeatherDetails.initialize(entry[0], entry[1]));
	});
	appendChildren(DOM.currentAdditionalInfo, weatherDetails);
}

function displayCurrentWeather(weatherData) {
	const {
		humidity, wind_speed, wind_deg, temp, pressure, feels_like, timezone,
	} = weatherData;
	const localDate = getLocalDate(timezone, 0, 0);
	DOM.currentLocation.textContent = Weather.getAreaName();
	// updateClock(DOM.currentTime);
	DOM.currentDate.textContent = formatFullDate(getLocalDate(localDate));
	DOM.currentTemp.textContent = temp;

	const currentEntries = [
		['humidity', humidity],
		['wind speed', windSpeedToMPH(wind_speed)],
		['wind degree', windDegToDir(wind_deg)],
		['pressure', pressure],
		['feels like', convertTemp(feels_like)],
	];
	displayWeatherDetails(currentEntries);
}

function displayHourlyWeather(hourlyWeatherData) {
	const hourlyCards = [];
	hourlyWeatherData.forEach((hourly, i) => {
		const { feels_like, temp, timezone } = hourly;
		const date = convertTZ(new Date(), timezone);
		const weatherIcon = Weather.getWeatherIcon(hourly.weather[0].icon);

		const args = {
			hour: formatHourOnly(date, i + 1),
			feelsLike: feels_like,
			temp,
			iconSrc: weatherIcon,
		};
		hourlyCards.push(HourlyCard.initialize(args));
	});
	appendChildren(DOM.hourlyWeather, hourlyCards);
}

function displayDailyWeather(dailyWeatherData) {
	const dailyCards = [];
	dailyWeatherData.forEach((daily, i) => {
		const { feels_like, temp, timezone } = daily;
		const localDate = getLocalDate(timezone, i, 1);
		const weatherIcon = Weather.getWeatherIcon(daily.weather[0].icon);

		// passing arguments to component
		const args = {
			date: formatShortDate(localDate),
			feelsLike: feels_like,
			temp,
			iconSrc: weatherIcon,
		};
		dailyCards.push(DailyCard.initialize(args));
	});

	appendChildren(DOM.dailyWeather, dailyCards);
}

function displayWeatherData() {
	Weather.fetchWeatherData();
	Weather.getWeatherData().then((weatherData) => {
		const { hourly, daily, current } = weatherData;
		displayCurrentWeather(current);
		displayHourlyWeather(hourly.slice(1, 25));
		displayDailyWeather(daily.slice(1));
		console.log(weatherData);
	});
	// toggle between celcius and fahrenheit
	DOM.unitToggle.addEventListener('click', () => {
		toggleTemp();
		DOM.celInput.checked = currentUnitIsCelcius();
		DOM.fahInput.checked = !currentUnitIsCelcius();
	});
}

export {
	displayWeatherData,
	displayCurrentWeather,
	displayHourlyWeather,
	displayDailyWeather,
};
