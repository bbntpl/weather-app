import DOM from './dom-collections';

export function toggleHeaderBgColor() {
	if (document.body.scrollTop > 80 || DOM.header.scrollTop > 80) {
		DOM.header.classList.remove('nav-glassy');
		DOM.header.classList.add('nav-dark');
	} else {
		DOM.header.classList.remove('nav-dark');
		DOM.header.classList.add('nav-glassy');
	}
}

export const hideLoadingElement = () => DOM.loading.classList.add('hide');

export const unhideLoadingElement = () => DOM.loading.classList.remove('hide');
