import DOM from './dom-collections';
import { toggleElementClassName } from '../helpers';

export function toggleHeaderBgColor() {
	if (document.body.scrollTop > 80 || DOM.header.scrollTop > 80) {
		toggleElementClassName(DOM.header, { rmv: 'nav-glassy', add: 'nav-dark' });
	} else {
		toggleElementClassName(DOM.header, { rmv: 'nav-dark', add: 'nav-glassy' });
	}
}

export const hideLoadingElement = () => DOM.loading.classList.add('hide');
export const unhideLoadingElement = () => DOM.loading.classList.remove('hide');
