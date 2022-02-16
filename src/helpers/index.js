function _addClassNames(el, clsNames) {
	Array.isArray(clsNames) ? el.classList.add(...clsNames) : el.classList.add(clsNames);
}

function appendChildren(parent, children) {
	return children.forEach((child) => parent.append(child));
}

function createEl(tag, className, txt = null) {
	const el = document.createElement(tag);

	// add classnames to the element
	_addClassNames(el, className);

	// set text content equal to passed text
	if (txt) {
		el.textContent = txt;
	}
	return el;
}

function createImg(tag, className, src) {
	const img = createEl(tag, className);
	img.src = src;
	return img;
}

function createCustomElement(tag, classNames, attributes) {
	const element = document.createElement(tag);
	_addClassNames(element, classNames);
	for (const name in attributes) {
		element[name] = attributes[name];
	}
	return element;
}

function removeChildren(parent) {
	parent.forEach((el) => {
		while (el.firstChild) {
			el.removeChild(el.firstChild);
		}
	});
}
function childrenMatches(elem, callback) {
	return Array.from(elem.children).filter(callback);
}

export {
	appendChildren,
	childrenMatches,
	createEl,
	createCustomElement,
	createImg,
	removeChildren,
};
