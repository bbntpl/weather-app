function addClassNames(el, clsNames) {
	if (Array.isArray(clsNames)) {
		return el.classList.add(...clsNames);
	}
	return el.classList.add(clsNames);
}

function appendChildren(parent, children) {
	return children.forEach((child) => parent.append(child));
}

function createCustomElement(tag, classNames = null, attributes = null) {
	const element = document.createElement(tag);

	if (classNames) {
		addClassNames(element, classNames);
	}

	// iterate through the keys of the attribute object
	// then set the attribute of the element with the
	// value of the iterated attributes
	if (attributes) {
		const attributeProps = Object.keys(attributes);
		for (let i = 0; i < attributeProps.length; i += 1) {
			const name = attributeProps[i];
			element[name] = attributes[name];
		}
	}

	return element;
}

function createDataList(descTerm, descDetails) {
	const dl = createCustomElement('dl');
	const dt = createCustomElement('dt', null, { textContent: descTerm });
	const dd = createCustomElement('dd', null, { textContent: descDetails });
	appendChildren(dl, [dt, dd]);
	return dl;
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

async function loadJson(url) {
	const response = await fetch(url);
	if (response.status === 200) {
		return response.json();
	}
	throw new Error(response);
}

function whitespaceReplacer(string, char) {
	const newString = string;

	// replace the whitespaces with '+' as a parameter for api call
	return newString.split('').map((x) => (x === ' ' ? char : x)).join('');
};

export {
	appendChildren,
	childrenMatches,
	createCustomElement,
	createDataList,
	removeChildren,
	loadJson,
	whitespaceReplacer,
};
