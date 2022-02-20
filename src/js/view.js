import DOM from './dom-collections';
import {
	appendChildren, removeChildren, toggleElementClassName,
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
	getLocalHours,
} from './time';
import {
	convertMeterToKilometer,
	convertTemp,
	kelvinToFahrenheit,
	windDegToDir,
	windSpeedToMPH,
} from './units';
import { hideLoadingElement, unhideLoadingElement } from './UI';
import getAppropriateWeatherImg from './weather-indicator';

function beforeDisplayWeatherData() {
	toggleElementClassName(DOM.header, {
		rmv: 'nav-glassy',
		add: 'nav-dark',
	});
	unhideLoadingElement();
}

function afterDisplayWeatherData() {
	toggleElementClassName(DOM.header, {
		rmv: 'nav-dark',
		add: 'nav-glassy',
	});
	hideLoadingElement();
}

function displayWeatherDetails(currentEntries) {
	const weatherDetails = [];
	currentEntries.forEach((entry) => {
		weatherDetails.push(CurrentWeatherDetails.initialize(entry[0], entry[1]));
	});
	appendChildren(DOM.currentAdditionalInfo, weatherDetails);
}

function displayCurrentWeather(weatherData) {
	const {
		humidity,
		wind_speed,
		wind_deg,
		temp, pressure,
		feels_like,
		visibility,
		dew_point,
	} = weatherData;
	DOM.currentLocation.textContent = Weather.getAreaName();
	updateClock(DOM.currentTime);
	DOM.currentDate.textContent = formatFullDate(new Date());
	DOM.currentTemp.textContent = convertTemp(temp);
	const currentEntries = [
		['feels like', convertTemp(feels_like)],
		['humidity', `${humidity}%`],
		['wind speed', windSpeedToMPH(wind_speed)],
		['wind degree', windDegToDir(wind_deg)],
		['pressure', `${pressure}hPa`],
		['visibility', convertMeterToKilometer(visibility)],
		['dew point', kelvinToFahrenheit(dew_point)],
	];
	displayWeatherDetails(currentEntries);
}

function displayHourlyWeather(hourlyWeatherData) {
	const hourlyCards = [];
	hourlyWeatherData.forEach((hourly, i) => {
		const { feels_like, temp, timezone } = hourly;
		const date = convertTZ(new Date(), timezone);
		const weatherIcon = Weather.getWeatherIcon(hourly.weather[0].icon, '2x');

		const args = {
			hour: formatHourOnly(date, i + 1),
			feelsLike: convertTemp(feels_like),
			temp: convertTemp(temp),
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
		const weatherIcon = Weather.getWeatherIcon(daily.weather[0].icon, '2x');

		// passing arguments to component
		const args = {
			date: formatShortDate(localDate),
			feelsLike: convertTemp(feels_like.day),
			temp: convertTemp(temp.day),
			iconSrc: weatherIcon,
		};
		dailyCards.push(DailyCard.initialize(args));
	});

	appendChildren(DOM.dailyWeather, dailyCards);
}

const isWeatherDataDisplayed = (elNodes) => elNodes.every((el) => el.hasChildNodes());

function removeWeatherDetails() {
	const weatherDetailsElements = [
		DOM.currentAdditionalInfo,
		DOM.hourlyWeather,
		DOM.dailyWeather,
	];
	if (isWeatherDataDisplayed(weatherDetailsElements)) {
		removeChildren(weatherDetailsElements);
	}
}

function displayWeatherHeroImage(weatherData) {
	const { timezone } = weatherData;
	const { main } = weatherData.current.weather[0];
	const date = convertTZ(new Date(), timezone);
	const hours = getLocalHours(date);
	DOM.content.className = getAppropriateWeatherImg(hours, main);
}

function displayWeatherData(weatherData) {
	const { hourly, daily, current } = weatherData;
	removeWeatherDetails();
	displayCurrentWeather(current);
	displayHourlyWeather(hourly.slice(1, 25));
	displayDailyWeather(daily.slice(1));
}

function displayExistingWeatherData() {
	displayWeatherData(Weather.getWeatherData());
}

function displayFetchedWeatherData() {
	beforeDisplayWeatherData();
	Weather.fetchWeatherData().then((weatherData) => {
		displayWeatherHeroImage(weatherData);
		displayWeatherData(weatherData);
		setTimeout(() => {
			afterDisplayWeatherData();
		}, 1000);
	});
}

function showCurrentWeather() {
	if (typeof Weather.getWeatherData() !== 'undefined') {
		displayExistingWeatherData();
	} else {
		displayFetchedWeatherData();
	}
}

export {
	showCurrentWeather,
	beforeDisplayWeatherData,
	displayCurrentWeather,
	displayExistingWeatherData,
	displayFetchedWeatherData,
	displayHourlyWeather,
	displayDailyWeather,
	removeWeatherDetails,
};
