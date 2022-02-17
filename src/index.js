import './scss/reset.scss';
import './scss/styles.scss';
import DailyCard from './components/DailyCard';

console.log(DailyCard.initialize({
	date: 'Wed, Feb 17', feelsLike: '-35', temp: '-25', iconSrc: './images/logo.svg',
}));
// update clock every 1000ms = 1second
