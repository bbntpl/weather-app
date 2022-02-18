import Weather from './weather';

// convert dates by the appropriate local timezone
// object used to format dates
const OPTIONS = {
	weekday: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric',
};

const DAILY = {
	weekday: 'short',
	month: 'short',
	day: 'numeric',
};

function convertTZ(date, tzString) {
	return new Date((typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', { timeZone: tzString }));
}

function getLocalDate(timezone, dateIndex, skipDateIndex) {
	const date = new Date(); // get todays date
	date.setDate(date.getDate() + (dateIndex + skipDateIndex)); // accumulate date by one
	return convertTZ(date, timezone);
}
// format time to HH:MM:SS AM/PM
function formatHourMin(date) {
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();
	const ampm = hours >= 12 ? 'pm' : 'am';
	hours %= 12;

	// the hour '0' should be '12'
	if (!hours) {
		hours = '12';
	}

	minutes = (`0${minutes}`).slice(-2);
	seconds = (`0${seconds}`).slice(-2);
	const strTime = `${hours}:${minutes}:${seconds} ${ampm}`;
	return strTime;
}

// format time to HH AM/PM
function formatHourOnly(date, i) {
	let hours = date.getHours() + i;
	const hoursNextDay = (hours - 24);

	// change the variable if is passed 11pm
	if (hours > 23) {
		hours = 0 + hoursNextDay;
	}

	// dividing am and pm
	const ampm = hours >= 12 ? 'pm' : 'am';
	hours %= 12;

	if (!hours) {
		hours = '12';
	}

	const timeFormattedByString = `${hours} ${ampm}`;
	return timeFormattedByString;
}

const getLocalHours = (date) => date.getHours();
const formatFullDate = (date) => date.toLocaleDateString('en-US', OPTIONS);
const formatShortDate = (date) => date.toLocaleDateString('en-US', DAILY);

const updateClock = (el) => {
	const clockDisplay = el;
	const { timezone } = Weather.fetchWeatherData();
	const date = convertTZ(new Date(), timezone);
	clockDisplay.textContent = formatHourMin(date);
	setTimeout(() => {
		updateClock(el);
	}, 1000);
};

export {
	convertTZ,
	formatHourMin,
	formatHourOnly,
	formatFullDate,
	formatShortDate,
	getLocalHours,
	getLocalDate,
	updateClock,
};
