import {
	createCustomElement,
	createDataList,
	appendChildren,
} from '../helpers';

const DailyCard = (() => ({
	dailyIcon(src) {
		const iconWrapper = createCustomElement('div');
		const dailyImg = createCustomElement('img', null, { src });
		iconWrapper.append(dailyImg);
		return iconWrapper;
	},
	initialize(params) {
		const {
			date, feelsLike, temp, iconSrc,
		} = params;
		const dailyCardClassNames = ['weather-data-section', 'weather-daily-card'];
		const dailyCard = createCustomElement('div', dailyCardClassNames);
		const dailyDate = createCustomElement('div', dailyCardClassNames, { textContent: date });
		const dailyFeelsLike = createDataList('feels like', feelsLike);
		const dailyTemp = createDataList('temp', temp);
		appendChildren(
			dailyCard,
			[dailyDate,
				dailyFeelsLike,
				dailyTemp,
				this.dailyIcon(iconSrc),
			],
		);
		return dailyCard;
	},
}))();

export default DailyCard;
