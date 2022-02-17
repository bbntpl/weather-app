import { createDataList } from '../helpers';

const CurrentWeatherDetails = (() => ({
	initialize: (name, value) => createDataList(name, value),
}))();

export default CurrentWeatherDetails;
