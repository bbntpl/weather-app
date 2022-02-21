/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 622:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", ""]);
// Exports
/* harmony default export */ __webpack_exports__["Z"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 439:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", ""]);
// Exports
/* harmony default export */ __webpack_exports__["Z"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 645:
/***/ (function(module) {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ 81:
/***/ (function(module) {



module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 379:
/***/ (function(module) {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 569:
/***/ (function(module) {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ 216:
/***/ (function(module) {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ 565:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 795:
/***/ (function(module) {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ 589:
/***/ (function(module) {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(379);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(795);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(569);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(565);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(216);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(589);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[2].use[2]!./node_modules/sass-loader/dist/cjs.js!./src/scss/reset.scss
var scss_reset = __webpack_require__(622);
;// CONCATENATED MODULE: ./src/scss/reset.scss

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(scss_reset/* default */.Z, options);




       /* harmony default export */ var src_scss_reset = (scss_reset/* default */.Z && scss_reset/* default.locals */.Z.locals ? scss_reset/* default.locals */.Z.locals : undefined);

// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[2].use[2]!./node_modules/sass-loader/dist/cjs.js!./src/scss/styles.scss
var styles = __webpack_require__(439);
;// CONCATENATED MODULE: ./src/scss/styles.scss

      
      
      
      
      
      
      
      
      

var styles_options = {};

styles_options.styleTagTransform = (styleTagTransform_default());
styles_options.setAttributes = (setAttributesWithoutAttributes_default());

      styles_options.insert = insertBySelector_default().bind(null, "head");
    
styles_options.domAPI = (styleDomAPI_default());
styles_options.insertStyleElement = (insertStyleElement_default());

var styles_update = injectStylesIntoStyleTag_default()(styles/* default */.Z, styles_options);




       /* harmony default export */ var scss_styles = (styles/* default */.Z && styles/* default.locals */.Z.locals ? styles/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ./src/js/dom-collections.js
const DOM = (() => ({
	header: document.querySelector('.header'),
	content: document.getElementById('content'),
	loading: document.getElementById('loading'),

	// DOM instances of header elements
	locationIcon: document.getElementById('location-icon'),
	searchbar: document.querySelector('.searchbar'),
	searchbarInput: document.getElementById('searchbar__input'),
	searchbarBtn: document.querySelector('.search-btn'),

	// DOM instances of current weather component
	currentLocation: document.querySelector('.current__location'),
	currentTime: document.querySelector('.current__time'),
	currentDate: document.querySelector('.current__date'),
	currentTemp: document.querySelector('.current__temp'),
	currentAdditionalInfo: document.querySelector('.current-additional-info'),

	// DOM instances of unit toggle
	unitToggle: document.querySelector('[data-unit-toggle]'),
	celInput: document.getElementById('cel'),
	fahInput: document.getElementById('fah'),

	// DOM instances of hourly weather component
	hourlyWeather: document.getElementById('weather-hourly-container'),

	// DOM instances of daily weather component
	dailyWeather: document.getElementById('weather-daily-container'),
}))();

/* harmony default export */ var dom_collections = (DOM);

;// CONCATENATED MODULE: ./src/helpers/index.js
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
	const response = await fetch(url, { mode: 'cors' });
	if (response.status === 200) {
		return response.json();
	}
	throw new Error(response);
}

function whitespaceReplacer(string, char) {
	const newString = string;

	// replace the whitespaces with '+' as a parameter for api call
	return newString.split('').map((x) => (x === ' ' ? char : x)).join('');
}

// disallow any spaces
const hasSpaces = (str) => !!str.indexOf(' ') !== -1;

const toggleElementClassName = (el, { rmv, add }) => {
	el.classList.remove(rmv);
	el.classList.add(add);
};



;// CONCATENATED MODULE: ./src/js/weather.js


// module pattern that arranges the fetched data using API in
// particular different uses
const Weather = (() => {
	const EXCLUDE = 'minutely';
	const API_KEY = {
		weather: '0c73b72398c0bfc8c59ca8058faf1eb4',
		location: 'pk.960bef9b58caf12f4d456466ec2a42f8',
	};
	const LOCATION_TYPE = [
		'continent',
		'city',
		'suburb',
		'administrative',
	];

	// default location after window loaded
	let weatherData;
	let lat = 41.39; 	// latitude and langitude of Barcelona, Spain
	let lon = 2.15;
	let searchArea;
	let areaName = 'Barcelona, Spain';
	const setCoordinates = (nLat, nLon) => {
		lat = nLat;
		lon = nLon;
	};

	const setSearchArea = (v) => {
		searchArea = v;
	};

	const setAreaName = (v) => {
		areaName = v;
	};

	const setLocationName = (locationName) => {
		setSearchArea(whitespaceReplacer(locationName, '+'));
		setAreaName(locationName);
	};

	const setWeatherData = (data) => {
		weatherData = data;
	};

	const getWeatherData = () => weatherData;

	const getLat = () => lat;

	const getLon = () => lon;

	const getAreaName = () => areaName;

	const getWeatherURL = () => `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${EXCLUDE}&appid=${API_KEY.weather}`;

	const getLocationURL = () => `https://us1.locationiq.com/v1/search.php?key=${API_KEY.location}&q=${searchArea}&format=json`;

	const getGeocodeURL = () => `https://geocode.xyz/${lat},${lon}?json=1`;

	const getWeatherIcon = (icon, size) => `http://openweathermap.org/img/wn/${icon}@${size}.png`;

	const fetchWeatherData = async () => {
		const response = loadJson(getWeatherURL());
		response
			.then((openWeather) => setWeatherData(openWeather))
			.catch((error) => {
				throw new Error(error);
			});
		return response;
	};

	const assignUserLocation = (data) => {
		const isCityExists = data.city && hasSpaces(data.city);
		const isStateExists = data.state || typeof data.state !== 'object';
		// make sure city does not have any space and state is not an object
		if (isCityExists && isStateExists) {
			setAreaName(`${data.city}, ${data.state}`);
			if (typeof data.state === 'object' && data.prov) {
				setAreaName(`${data.city}, ${data.prov}`);
			}
		} else if (data.staddress && data.state) {
			setAreaName(`${data.staddress}, ${data.state}`);
		} else if (data.prov) {
			setAreaName(`${data.staddress}, ${data.prov}`);
		} else {
			setAreaName(data.region);
		}
	};

	const displayWeatherWithCoordinates = (pos) => {
		const { latitude, longitude } = pos.coords;
		setCoordinates(latitude, longitude);
		try {
			const geocode = loadJson(getGeocodeURL());
			assignUserLocation(geocode);
		} catch (error) {
			throw new Error(`Error: ${error}`);
		}
	};

	const displayWeatherWithAreaName = () => loadJson(getLocationURL())
		.then((location) => {
			const idealLocation = location.find((place) => LOCATION_TYPE.includes(place.type));
			const { lat, lon, display_name } = idealLocation;
			setCoordinates(lat, lon);
			setAreaName(display_name);
			return fetchWeatherData();
		})
		.catch((error) => {
			throw new Error(`Error: ${error}`);
		});

	return {
		displayWeatherWithCoordinates,
		fetchWeatherData,
		getLat,
		getLon,
		getAreaName,
		displayWeatherWithAreaName,
		getWeatherData,
		getWeatherIcon,
		getWeatherURL,
		getLocationURL,
		setLocationName,
		setCoordinates,
		setSearchArea,
		setAreaName,
	};
})();

/* harmony default export */ var weather = (Weather);

;// CONCATENATED MODULE: ./src/components/CurrentWeatherDetails.js


const CurrentWeatherDetails = (() => ({
	initialize: (name, value) => createDataList(name, value),
}))();

/* harmony default export */ var components_CurrentWeatherDetails = (CurrentWeatherDetails);

;// CONCATENATED MODULE: ./src/components/DailyCard.js


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
		const dailyDate = createCustomElement('div', 'daily__date', { textContent: date });
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

/* harmony default export */ var components_DailyCard = (DailyCard);

;// CONCATENATED MODULE: ./src/components/HourlyCard.js


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

/* harmony default export */ var components_HourlyCard = (HourlyCard);

;// CONCATENATED MODULE: ./src/js/time.js
const Timer = (() => {
	let isTimerRunning = false;
	let _clock = null;
	const setClock = (passedClock) => {
		_clock = passedClock;
	};
	const clearClock = () => clearTimeout(_clock);
	const disableTimer = () => {
		clearClock();
		isTimerRunning = false;
	};
	return {
		isTimerRunning,
		setClock,
		clearClock,
		disableTimer,
	};
})();

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

const updateClock = (el, tz) => {
	Timer.isTimerRunning = true;
	const clockDisplay = el;
	const date = convertTZ(new Date(), tz);
	clockDisplay.textContent = formatHourMin(date);
	Timer.setClock(setTimeout(() => updateClock(el, tz), 1000));
};



;// CONCATENATED MODULE: ./src/js/units.js
// convert the values of the data to a different unit
const DIRECTIONS = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
	'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];

// starting range for each direction in 360 degree format
const RANGE = [349, 11, 34, 56, 78, 101, 124, 146,
	169, 191, 214, 235, 259, 281, 304, 326];

let isTempCelcius = true;

// validate the current temp unit
const checkTempUnit = () => {
	const tempUnit = isTempCelcius ? 'C' : 'F';
	return `${String.fromCharCode(176)}${tempUnit}`;
};

// toggle the temperature unit
const toggleTemp = () => {
	isTempCelcius = !isTempCelcius;
};

const currentUnitIsCelcius = () => isTempCelcius;

// translate from kelvin to celcius
const kelvinToCelcius = (K) => {
	const celcius = K - 273.15;
	return `${Math.round(celcius)}${String.fromCharCode(176)}C`;
};

// translate from kelvin to fahrenheit
const kelvinToFahrenheit = (K) => {
	const fah = 1.8 * (K - 273.15) + 32;
	return `${Math.round(fah)}${String.fromCharCode(176)}F`;
};
// converts all the temperature output when the temp is switched to a different unit
const convertTemp = (t) => (isTempCelcius === true ? kelvinToCelcius(t) : kelvinToFahrenheit(t));

// meter/second to meter per hour
const windSpeedToMPH = (n) => `${Math.round(n * 2.237)}mph`;
const convertMeterToKilometer = (m) => `${Math.round((m / 1000) * 10) / 10}km`;

// replace the 0 - 360 degree with N,E,W,S
const windDegToDir = (n) => {
	let dirNum = n;
	if (dirNum > 349) {
		dirNum = 0;
	}
	const directionRange = (_, i, arr) => {
		const wrappedIndex = (i + 1) % arr.length;
		return dirNum >= RANGE[i] || dirNum <= RANGE[wrappedIndex];
	};
	return DIRECTIONS.find(directionRange);
};


;// CONCATENATED MODULE: ./src/js/UI.js



function toggleHeaderBgColor() {
	const top = window.pageYOffset || dom_collections.header.scrollTop;
	if (top > 5) {
		toggleElementClassName(dom_collections.header, { rmv: 'nav-glassy', add: 'nav-dark' });
	} else {
		toggleElementClassName(dom_collections.header, { rmv: 'nav-dark', add: 'nav-glassy' });
	}
}

const hideLoadingElement = () => dom_collections.loading.classList.add('hide');
const unhideLoadingElement = () => dom_collections.loading.classList.remove('hide');

;// CONCATENATED MODULE: ./src/js/weather-indicator.js
const weatherStates = [
	'rain',
	'thunderstorm',
];
const weatherStatesByHours = [
	'cloud',
	'snow',
	'clear',
];
const allWeatherStates = weatherStates.concat(weatherStatesByHours);
function isWeatherExists(currentWeatherState) {
	return allWeatherStates.find((w) => currentWeatherState.includes(w));
}

// get weather name based on the current hours
function weatherByHours(hours, weather) {
	const weatherName = isWeatherExists(weather.toLowerCase());
	if (hours >= 5 && hours < 12) {
		return `morning-${weatherName}`;
	}
	if (hours >= 12 && hours < 18) {
		return `afternoon-${weatherName}`;
	}
	return `night-${weatherName}`;
}

// get the daytime and the name of the weather concatenated together
// then use it as a className for the hero element
function getAppropriateWeatherImg(hours, weather) {
	const currentWeatherState = weather.toLowerCase();
	if (isWeatherExists(currentWeatherState)) {
		if (weatherStatesByHours.find((w) => currentWeatherState.includes(w))) {
			return weatherByHours(hours, currentWeatherState);
		}
		return weatherStates.find((w) => currentWeatherState.includes(w));
	}
	return weatherByHours(hours, 'clear');
}

;// CONCATENATED MODULE: ./src/js/view.js















function beforeDisplayWeatherData() {
	toggleElementClassName(dom_collections.header, {
		rmv: 'nav-glassy',
		add: 'nav-dark',
	});
	unhideLoadingElement();
	document.body.style.overflow = 'hidden';
}

function afterDisplayWeatherData() {
	toggleElementClassName(dom_collections.header, {
		rmv: 'nav-dark',
		add: 'nav-glassy',
	});
	hideLoadingElement();
	document.body.style.overflow = 'auto';
}

function displayWeatherDetails(currentEntries) {
	const weatherDetails = [];
	currentEntries.forEach((entry) => {
		weatherDetails.push(components_CurrentWeatherDetails.initialize(entry[0], entry[1]));
	});
	appendChildren(dom_collections.currentAdditionalInfo, weatherDetails);
}

function displayCurrentWeather(weatherData, timezone) {
	const {
		humidity,
		wind_speed,
		wind_deg,
		temp, pressure,
		feels_like,
		visibility,
		dew_point,
		uvi,
	} = weatherData;
	const date = convertTZ(new Date(), timezone);
	if (Timer.isTimerRunning) {
		Timer.disableTimer();
	}
	updateClock(dom_collections.currentTime, timezone);
	dom_collections.currentLocation.textContent = weather.getAreaName();
	dom_collections.currentDate.textContent = formatFullDate(date);
	dom_collections.currentTemp.textContent = convertTemp(temp);

	const currentEntries = [
		['feels like', convertTemp(feels_like)],
		['humidity', `${humidity}%`],
		['wind speed', windSpeedToMPH(wind_speed)],
		['wind degree', windDegToDir(wind_deg)],
		['pressure', `${pressure}hPa`],
		['visibility', convertMeterToKilometer(visibility)],
		['dew point', kelvinToFahrenheit(dew_point)],
		['uv index', uvi],
	];
	displayWeatherDetails(currentEntries);
}

function displayHourlyWeather(hourlyWeatherData) {
	const hourlyCards = [];
	hourlyWeatherData.forEach((hourly, i) => {
		const { feels_like, temp, timezone } = hourly;
		const date = convertTZ(new Date(), timezone);
		const weatherIcon = weather.getWeatherIcon(hourly.weather[0].icon, '2x');

		const args = {
			hour: formatHourOnly(date, i + 1),
			feelsLike: convertTemp(feels_like),
			temp: convertTemp(temp),
			iconSrc: weatherIcon,
		};
		hourlyCards.push(components_HourlyCard.initialize(args));
	});
	appendChildren(dom_collections.hourlyWeather, hourlyCards);
}

function displayDailyWeather(dailyWeatherData) {
	const dailyCards = [];
	dailyWeatherData.forEach((daily, i) => {
		const { feels_like, temp, timezone } = daily;
		const localDate = getLocalDate(timezone, i, 1);
		const weatherIcon = weather.getWeatherIcon(daily.weather[0].icon, '2x');

		// passing arguments to component
		const args = {
			date: formatShortDate(localDate),
			feelsLike: convertTemp(feels_like.day),
			temp: convertTemp(temp.day),
			iconSrc: weatherIcon,
		};
		dailyCards.push(components_DailyCard.initialize(args));
	});

	appendChildren(dom_collections.dailyWeather, dailyCards);
}

const isWeatherDataDisplayed = (elNodes) => elNodes.every((el) => el.hasChildNodes());
function removeWeatherDetails() {
	const weatherDetailsElements = [
		dom_collections.currentAdditionalInfo,
		dom_collections.hourlyWeather,
		dom_collections.dailyWeather,
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
	dom_collections.content.className = getAppropriateWeatherImg(hours, main);
}

function displayWeatherData(weatherData) {
	const { hourly, daily, current } = weatherData;
	removeWeatherDetails();
	displayCurrentWeather(current, weatherData.timezone);
	displayHourlyWeather(hourly.slice(1, 25));
	displayDailyWeather(daily.slice(1));
}

function displayExistingWeatherData() {
	displayWeatherData(weather.getWeatherData());
}

function displayFetchedWeatherData(callback) {
	beforeDisplayWeatherData();
	callback().then((weatherData) => {
		displayWeatherHeroImage(weatherData);
		displayWeatherData(weatherData);
		setTimeout(() => afterDisplayWeatherData(), 500);
	});
}

function displayWeatherDataByInput(callback) {
	const locationName = dom_collections.searchbarInput.value;
	if (!locationName) return;
	weather.setLocationName(locationName);
	displayFetchedWeatherData(callback);
}

function showCurrentWeather() {
	if (typeof weather.getWeatherData() !== 'undefined') {
		displayExistingWeatherData();
	} else {
		displayFetchedWeatherData(weather.fetchWeatherData);
	}
}



;// CONCATENATED MODULE: ./src/index.js








window.onload = () => {
	showCurrentWeather();
};

window.onscroll = () => {
	toggleHeaderBgColor();
};

// EVENT LISTENERS
dom_collections.locationIcon.onclick = () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(weather.displayWeatherWithCoordinates);
		setTimeout(() => {
			displayFetchedWeatherData(weather.fetchWeatherData);
		}, 1000);
	} else {
		throw new Error('Geolocation is not supported by this browser');
	}
};

dom_collections.searchbar.addEventListener('submit', (e) => {
	e.preventDefault();
	displayWeatherDataByInput(weather.displayWeatherWithAreaName);
});

dom_collections.searchbarBtn.addEventListener('click', (e) => {
	e.preventDefault();
	displayWeatherDataByInput(weather.displayWeatherWithAreaName);
});

// toggle between celcius and fahrenheit
dom_collections.unitToggle.addEventListener('click', () => {
	toggleTemp();
	dom_collections.celInput.checked = currentUnitIsCelcius();
	dom_collections.fahInput.checked = !currentUnitIsCelcius();
	showCurrentWeather();
});

}();
/******/ })()
;