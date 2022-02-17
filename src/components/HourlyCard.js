import {
	createCustomElement,
	createDataList,
	appendChildren,
} from '../helpers';

const HourlyCard = (() => ({
	hourlyDetails(feelsLike, temp) {
		const hourlyDetails = createCustomElement('div', 'hourly__details');
		const descListFeelsLike = createDataList('feels like', feelsLike);
		const descListTemp = createDataList('temp', temp);

		appendChildren(hourlyDetails, [descListFeelsLike, descListTemp]);

		return hourlyDetails;
	},
	hourlyIcon(src) {
		const iconWrapper = createCustomElement('div');
		const hourlyImg = createCustomElement('img', null, { src });
		iconWrapper.append(hourlyImg);
		return iconWrapper;
	},
	initialize(params) {
		const {
			hour, feelsLike, temp, iconSrc,
		} = params;
		const hourlyCardClassNames = ['weather-data-section', 'weather-hourly-card'];

		const hourlyCard = createCustomElement('div', hourlyCardClassNames);
		const hourlyHour = createCustomElement('div', 'hourly__hour', { textContent: hour });
		appendChildren(
			hourlyCard,
			[hourlyHour,
				this.hourlyDetails(feelsLike, temp),
				this.hourlyIcon(iconSrc),
			],
		);
		return hourlyCard;
	},
}))();

export default HourlyCard;
