var craft3;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/ansi-html-community/index.js":
/*!***************************************************!*\
  !*** ./node_modules/ansi-html-community/index.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


module.exports = ansiHTML

// Reference to https://github.com/sindresorhus/ansi-regex
var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/

var _defColors = {
  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
}
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
}
var _openTags = {
  '1': 'font-weight:bold', // bold
  '2': 'opacity:0.5', // dim
  '3': '<i>', // italic
  '4': '<u>', // underscore
  '8': 'display:none', // hidden
  '9': '<del>' // delete
}
var _closeTags = {
  '23': '</i>', // reset italic
  '24': '</u>', // reset underscore
  '29': '</del>' // reset delete
}

;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>'
})

/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */
function ansiHTML (text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text
  }

  // Cache opened sequence.
  var ansiCodes = []
  // Replace with markup.
  var ret = text.replace(/\033\[(\d+)m/g, function (match, seq) {
    var ot = _openTags[seq]
    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop()
        return '</span>'
      }
      // Open tag.
      ansiCodes.push(seq)
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
    }

    var ct = _closeTags[seq]
    if (ct) {
      // Pop sequence
      ansiCodes.pop()
      return ct
    }
    return ''
  })

  // Make sure tags are closed.
  var l = ansiCodes.length
  ;(l > 0) && (ret += Array(l + 1).join('</span>'))

  return ret
}

/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */
ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.')
  }

  var _finalColors = {}
  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null
    if (!hex) {
      _finalColors[key] = _defColors[key]
      continue
    }
    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex]
      }
      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string'
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
      }
      var defHexColor = _defColors[key]
      if (!hex[0]) {
        hex[0] = defHexColor[0]
      }
      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]]
        hex.push(defHexColor[1])
      }

      hex = hex.slice(0, 2)
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
    }
    _finalColors[key] = hex
  }
  _setTags(_finalColors)
}

/**
 * Reset colors.
 */
ansiHTML.reset = function () {
  _setTags(_defColors)
}

/**
 * Expose tags, including open and close.
 * @type {Object}
 */
ansiHTML.tags = {}

if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () { return _openTags }
  })
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () { return _closeTags }
  })
} else {
  ansiHTML.tags.open = _openTags
  ansiHTML.tags.close = _closeTags
}

function _setTags (colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
  // inverse
  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
  // dark grey
  _openTags['90'] = 'color:#' + colors.darkgrey

  for (var code in _styles) {
    var color = _styles[code]
    var oriColor = colors[color] || '000'
    _openTags[code] = 'color:#' + oriColor
    code = parseInt(code)
    _openTags[(code + 10).toString()] = 'background:#' + oriColor
  }
}

ansiHTML.reset()


/***/ }),

/***/ "./src/javascripts/app.js":
/*!********************************!*\
  !*** ./src/javascripts/app.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! svgxuse */ "./node_modules/svgxuse/svgxuse.js");
function domReady() {
  const components = [['.js-nav', __webpack_require__(/*! ./nav */ "./src/javascripts/nav.js")], ['.js-slider', __webpack_require__(/*! ./slider */ "./src/javascripts/slider.js")], ['.js-lightbox', __webpack_require__(/*! ./lightbox */ "./src/javascripts/lightbox.js")]];
  components && components.map(comp => {
    const fn = window || this;
    // Find all elements by class name with given class name i.e. first item in comp array
    let elements = document.querySelectorAll(`${comp[0]}`);

    // Map array of elements and init a new class
    Array.from(elements).map(el => new comp[1].default(el));
  });
  // inits.default(document)
}

window.addEventListener('load', domReady);

// Only used in dev
if (true) {
  module.hot.accept();
}

/***/ }),

/***/ "./src/javascripts/lightbox.js":
/*!*************************************!*\
  !*** ./src/javascripts/lightbox.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Lightbox)
/* harmony export */ });
__webpack_require__(/*! fslightbox */ "./node_modules/fslightbox/index.js");
const defaults = {
  gallery: ".js-gallery-item"
};
class Lightbox {
  constructor(wrap) {
    this.wrap = wrap;
    this.options = defaults;
    this.gallery = this.wrap.querySelectorAll(this.options.gallery);
    this.gallery.forEach(image => image.addEventListener('click', this.initLightbox));
  }
  initLightbox = evt => {
    evt.preventDefault();
    const lightbox = new FsLightbox();
    const images = this.wrap.querySelectorAll("img");
    const sources = [];
    images.forEach(image => sources.push(image.src));
    let index;
    sources.forEach((source, i) => {
      if (source === evt.currentTarget.href) index = i;
    });
    lightbox.props.sources = sources;
    lightbox.open(index ?? 0);
  };
}

/***/ }),

/***/ "./src/javascripts/nav.js":
/*!********************************!*\
  !*** ./src/javascripts/nav.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Nav)
/* harmony export */ });
const defaults = {
  navTrigger: ".js-nav-trigger",
  mobileNav: ".js-mobile-nav",
  dropdownTrigger: ".js-nav-dropdown-trigger",
  dropdown: ".js-nav-dropdown",
  dropdownOpenClass: "dropdown-is-open",
  navOpenClass: "nav-is-open"
};
class Nav {
  constructor(wrap) {
    this.wrap = wrap;
    this.options = defaults;
    this.navTrigger = document.querySelector(this.options.navTrigger);
    this.nav = document.querySelector(this.options.mobileNav);
    this.dropdownTrigger = this.wrap.querySelectorAll(this.options.dropdownTrigger);
    this.dropdown = this.wrap.querySelector(this.options.dropdown);
    this.minWidth = 1024;
    this.navTrigger.addEventListener("click", this.onNavTriggerClick);
    this.dropdownTrigger.forEach(trigger => trigger.addEventListener("click", this.onDropdownTriggerClick));
  }
  openNav = () => {
    if (this.isNavOpen) return;
    this.isNavOpen = true;
    this.nav.classList.add(this.options.navOpenClass);
    this.navTrigger.classList.add(this.options.navOpenClass);
  };
  closeNav = () => {
    if (!this.isNavOpen) return;
    this.isNavOpen = false;
    this.nav.classList.remove(this.options.navOpenClass);
    this.navTrigger.classList.remove(this.options.navOpenClass);
  };
  onNavTriggerClick = () => {
    this.isNavOpen ? this.closeNav() : this.openNav();
  };
  onDropdownTriggerClick = evt => {
    if (evt.target.classList.contains('js-nav-dropdown-trigger')) {
      evt.preventDefault();
      const trigger = evt.target;
      this.isDropdownOpen ? this.closeDropdown(trigger) : this.openDropdown(trigger);
    }
  };
  openDropdown = trigger => {
    if (this.isDropdownOpen) return;
    this.isDropdownOpen = true;
    trigger.classList.add(this.options.dropdownOpenClass);
  };
  closeDropdown = trigger => {
    if (!this.isDropdownOpen) return;
    this.isDropdownOpen = false;
    trigger.classList.remove(this.options.dropdownOpenClass);
  };
}

/***/ }),

/***/ "./src/javascripts/slider.js":
/*!***********************************!*\
  !*** ./src/javascripts/slider.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Slider)
/* harmony export */ });
const Flickity = __webpack_require__(/*! flickity */ "./node_modules/flickity/js/index.js");
const defaults = {
  thumbnails: ".js-thumbnails",
  sliderToggle: ".js-slider-toggle",
  flickityDataSettings: "data-flickity-settings",
  flickitySettings: {
    adaptiveHeight: false,
    pageDots: false,
    prevNextButtons: true,
    wrapAround: true,
    imagesLoaded: true,
    percentPosition: false
  },
  toggleOpenLabel: ".toggle-open",
  toggleCloseLabel: ".toggle-close",
  thumbnailsOpenClass: "thumbnails-open",
  noScrollClass: "no-scroll"
};
class Slider {
  constructor(wrap) {
    this.wrap = wrap;
    this.options = defaults;
    this.slider = this.wrap.querySelector(this.options.contentSelector);
    this.sliderToggle = document.querySelector(this.options.sliderToggle);
    this.thumbnails = document.querySelector(this.options.thumbnails);
    this.toggleOpenLabel = document.querySelector(this.options.toggleOpenLabel);
    this.toggleCloseLabel = document.querySelector(this.options.toggleCloseLabel);
    this.setupSlider();
    this.sliderToggle.addEventListener("click", this.toggleThumbnails);
    this.thumbnails.addEventListener("click", this.onThumbnailClick);
  }
  setupSlider = () => {
    let settings = this.wrap.getAttribute(this.options.flickityDataSettings);
    settings = JSON.parse(settings) ?? {};
    settings = {
      ...this.options.flickitySettings,
      ...settings
    };
    this.flickity = new Flickity(this.wrap, settings);
  };
  getIndex = selector => {
    let index;
    this.thumbnails.querySelectorAll(".thumbnail").forEach(function (thumb, i) {
      if (selector === thumb) index = i;
    });
    return index;
  };
  onThumbnailClick = evt => {
    evt.preventDefault();
    const thumb = evt.target.closest('.js-slider-thumb');
    let index = this.getIndex(thumb);
    this.flickity.select(index);
    this.closeThumbnails();
  };
  toggleThumbnails = () => {
    this.isOpen ? this.closeThumbnails() : this.openThmbnails();
  };
  openThmbnails = () => {
    if (!this.isOpen) {
      this.isOpen = true;
      this.top = window.scrollTo(0, 0);
      this.sliderToggle.classList.add(this.options.thumbnailsOpenClass);
      this.thumbnails.classList.add(this.options.thumbnailsOpenClass);
      document.body.classList.add(this.options.noScrollClass);
      document.body.style.top = -this.top;

      // Show correct aria label
      this.toggleOpenLabel.setAttribute("aria-hidden", true);
      this.toggleCloseLabel.setAttribute("aria-hidden", false);
    }
  };
  closeThumbnails = () => {
    if (this.isOpen) {
      this.isOpen = false;
      this.sliderToggle.classList.remove(this.options.thumbnailsOpenClass);
      this.thumbnails.classList.remove(this.options.thumbnailsOpenClass);
      document.body.classList.remove(this.options.noScrollClass);
      document.body.style.top = '';
      window.scrollTo(0, this.top);

      // Show correct aria label
      this.toggleCloseLabel.setAttribute("aria-hidden", true);
      this.toggleOpenLabel.setAttribute("aria-hidden", false);
      this.flickity.focus();
    }
  };
}

/***/ }),

/***/ "./node_modules/ev-emitter/ev-emitter.js":
/*!***********************************************!*\
  !*** ./node_modules/ev-emitter/ev-emitter.js ***!
  \***********************************************/
/***/ (function(module) {

/**
 * EvEmitter v2.1.1
 * Lil' event emitter
 * MIT License
 */

( function( global, factory ) {
  // universal module definition
  if (  true && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {

function EvEmitter() {}

let proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) return this;

  // set events hash
  let events = this._events = this._events || {};
  // set listeners array
  let listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( !listeners.includes( listener ) ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) return this;

  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  let onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  let onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  let listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) return this;

  let index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  let listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) return this;

  // copy over to avoid interference if .off() in listener
  listeners = listeners.slice( 0 );
  args = args || [];
  // once stuff
  let onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  for ( let listener of listeners ) {
    let isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
  }

  return this;
};

proto.allOff = function() {
  delete this._events;
  delete this._onceEvents;
  return this;
};

return EvEmitter;

} ) );


/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "./node_modules/fizzy-ui-utils/utils.js":
/*!**********************************************!*\
  !*** ./node_modules/fizzy-ui-utils/utils.js ***!
  \**********************************************/
/***/ (function(module) {

/**
 * Fizzy UI utils v3.0.0
 * MIT license
 */

( function( global, factory ) {
  // universal module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory( global );
  } else {
    // browser global
    global.fizzyUIUtils = factory( global );
  }

}( this, function factory( global ) {

let utils = {};

// ----- extend ----- //

// extends objects
utils.extend = function( a, b ) {
  return Object.assign( a, b );
};

// ----- modulo ----- //

utils.modulo = function( num, div ) {
  return ( ( num % div ) + div ) % div;
};

// ----- makeArray ----- //

// turn element or nodeList into an array
utils.makeArray = function( obj ) {
  // use object if already an array
  if ( Array.isArray( obj ) ) return obj;

  // return empty array if undefined or null. #6
  if ( obj === null || obj === undefined ) return [];

  let isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  // convert nodeList to array
  if ( isArrayLike ) return [ ...obj ];

  // array of single index
  return [ obj ];
};

// ----- removeFrom ----- //

utils.removeFrom = function( ary, obj ) {
  let index = ary.indexOf( obj );
  if ( index != -1 ) {
    ary.splice( index, 1 );
  }
};

// ----- getParent ----- //

utils.getParent = function( elem, selector ) {
  while ( elem.parentNode && elem != document.body ) {
    elem = elem.parentNode;
    if ( elem.matches( selector ) ) return elem;
  }
};

// ----- getQueryElement ----- //

// use element as selector string
utils.getQueryElement = function( elem ) {
  if ( typeof elem == 'string' ) {
    return document.querySelector( elem );
  }
  return elem;
};

// ----- handleEvent ----- //

// enable .ontype to trigger from .addEventListener( elem, 'type' )
utils.handleEvent = function( event ) {
  let method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// ----- filterFindElements ----- //

utils.filterFindElements = function( elems, selector ) {
  // make array of elems
  elems = utils.makeArray( elems );

  return elems
    // check that elem is an actual element
    .filter( ( elem ) => elem instanceof HTMLElement )
    .reduce( ( ffElems, elem ) => {
      // add elem if no selector
      if ( !selector ) {
        ffElems.push( elem );
        return ffElems;
      }
      // filter & find items if we have a selector
      // filter
      if ( elem.matches( selector ) ) {
        ffElems.push( elem );
      }
      // find children
      let childElems = elem.querySelectorAll( selector );
      // concat childElems to filterFound array
      ffElems = ffElems.concat( ...childElems );
      return ffElems;
    }, [] );
};

// ----- debounceMethod ----- //

utils.debounceMethod = function( _class, methodName, threshold ) {
  threshold = threshold || 100;
  // original method
  let method = _class.prototype[ methodName ];
  let timeoutName = methodName + 'Timeout';

  _class.prototype[ methodName ] = function() {
    clearTimeout( this[ timeoutName ] );

    let args = arguments;
    this[ timeoutName ] = setTimeout( () => {
      method.apply( this, args );
      delete this[ timeoutName ];
    }, threshold );
  };
};

// ----- docReady ----- //

utils.docReady = function( onDocReady ) {
  let readyState = document.readyState;
  if ( readyState == 'complete' || readyState == 'interactive' ) {
    // do async to allow for other scripts to run. metafizzy/flickity#441
    setTimeout( onDocReady );
  } else {
    document.addEventListener( 'DOMContentLoaded', onDocReady );
  }
};

// ----- htmlInit ----- //

// http://bit.ly/3oYLusc
utils.toDashed = function( str ) {
  return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
    return $1 + '-' + $2;
  } ).toLowerCase();
};

let console = global.console;

// allow user to initialize classes via [data-namespace] or .js-namespace class
// htmlInit( Widget, 'widgetName' )
// options are parsed from data-namespace-options
utils.htmlInit = function( WidgetClass, namespace ) {
  utils.docReady( function() {
    let dashedNamespace = utils.toDashed( namespace );
    let dataAttr = 'data-' + dashedNamespace;
    let dataAttrElems = document.querySelectorAll( `[${dataAttr}]` );
    let jQuery = global.jQuery;

    [ ...dataAttrElems ].forEach( ( elem ) => {
      let attr = elem.getAttribute( dataAttr );
      let options;
      try {
        options = attr && JSON.parse( attr );
      } catch ( error ) {
        // log error, do not initialize
        if ( console ) {
          console.error( `Error parsing ${dataAttr} on ${elem.className}: ${error}` );
        }
        return;
      }
      // initialize
      let instance = new WidgetClass( elem, options );
      // make available via $().data('namespace')
      if ( jQuery ) {
        jQuery.data( elem, namespace, instance );
      }
    } );

  } );
};

// -----  ----- //

return utils;

} ) );


/***/ }),

/***/ "./node_modules/flickity/js/add-remove-cell.js":
/*!*****************************************************!*\
  !*** ./node_modules/flickity/js/add-remove-cell.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// add, remove cell
( function( window, factory ) {
  // universal module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory(
        __webpack_require__(/*! ./core */ "./node_modules/flickity/js/core.js"),
        __webpack_require__(/*! fizzy-ui-utils */ "./node_modules/fizzy-ui-utils/utils.js"),
    );
  } else {
    // browser global
    factory(
        window.Flickity,
        window.fizzyUIUtils,
    );
  }

}( typeof window != 'undefined' ? window : this, function factory( Flickity, utils ) {

// append cells to a document fragment
function getCellsFragment( cells ) {
  let fragment = document.createDocumentFragment();
  cells.forEach( ( cell ) => fragment.appendChild( cell.element ) );
  return fragment;
}

// -------------------------- add/remove cell prototype -------------------------- //

let proto = Flickity.prototype;

/**
 * Insert, prepend, or append cells
 * @param {[Element, Array, NodeList]} elems - Elements to insert
 * @param {Integer} index - Zero-based number to insert
 */
proto.insert = function( elems, index ) {
  let cells = this._makeCells( elems );
  if ( !cells || !cells.length ) return;

  let len = this.cells.length;
  // default to append
  index = index === undefined ? len : index;
  // add cells with document fragment
  let fragment = getCellsFragment( cells );
  // append to slider
  let isAppend = index === len;
  if ( isAppend ) {
    this.slider.appendChild( fragment );
  } else {
    let insertCellElement = this.cells[ index ].element;
    this.slider.insertBefore( fragment, insertCellElement );
  }
  // add to this.cells
  if ( index === 0 ) {
    // prepend, add to start
    this.cells = cells.concat( this.cells );
  } else if ( isAppend ) {
    // append, add to end
    this.cells = this.cells.concat( cells );
  } else {
    // insert in this.cells
    let endCells = this.cells.splice( index, len - index );
    this.cells = this.cells.concat( cells ).concat( endCells );
  }

  this._sizeCells( cells );
  this.cellChange( index );
  this.positionSliderAtSelected();
};

proto.append = function( elems ) {
  this.insert( elems, this.cells.length );
};

proto.prepend = function( elems ) {
  this.insert( elems, 0 );
};

/**
 * Remove cells
 * @param {[Element, Array, NodeList]} elems - ELements to remove
 */
proto.remove = function( elems ) {
  let cells = this.getCells( elems );
  if ( !cells || !cells.length ) return;

  let minCellIndex = this.cells.length - 1;
  // remove cells from collection & DOM
  cells.forEach( ( cell ) => {
    cell.remove();
    let index = this.cells.indexOf( cell );
    minCellIndex = Math.min( index, minCellIndex );
    utils.removeFrom( this.cells, cell );
  } );

  this.cellChange( minCellIndex );
  this.positionSliderAtSelected();
};

/**
 * logic to be run after a cell's size changes
 * @param {Element} elem - cell's element
 */
proto.cellSizeChange = function( elem ) {
  let cell = this.getCell( elem );
  if ( !cell ) return;

  cell.getSize();

  let index = this.cells.indexOf( cell );
  this.cellChange( index );
  // do not position slider after lazy load
};

/**
 * logic any time a cell is changed: added, removed, or size changed
 * @param {Integer} changedCellIndex - index of the changed cell, optional
 */
proto.cellChange = function( changedCellIndex ) {
  let prevSelectedElem = this.selectedElement;
  this._positionCells( changedCellIndex );
  this._updateWrapShiftCells();
  this.setGallerySize();
  // update selectedIndex, try to maintain position & select previous selected element
  let cell = this.getCell( prevSelectedElem );
  if ( cell ) this.selectedIndex = this.getCellSlideIndex( cell );
  this.selectedIndex = Math.min( this.slides.length - 1, this.selectedIndex );

  this.emitEvent( 'cellChange', [ changedCellIndex ] );
  // position slider
  this.select( this.selectedIndex );
};

// -----  ----- //

return Flickity;

} ) );


/***/ }),

/***/ "./node_modules/flickity/js/animate.js":
/*!*********************************************!*\
  !*** ./node_modules/flickity/js/animate.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// animate
( function( window, factory ) {
  // universal module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory( __webpack_require__(/*! fizzy-ui-utils */ "./node_modules/fizzy-ui-utils/utils.js") );
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.animatePrototype = factory( window.fizzyUIUtils );
  }

}( typeof window != 'undefined' ? window : this, function factory( utils ) {

// -------------------------- animate -------------------------- //

let proto = {};

proto.startAnimation = function() {
  if ( this.isAnimating ) return;

  this.isAnimating = true;
  this.restingFrames = 0;
  this.animate();
};

proto.animate = function() {
  this.applyDragForce();
  this.applySelectedAttraction();

  let previousX = this.x;

  this.integratePhysics();
  this.positionSlider();
  this.settle( previousX );
  // animate next frame
  if ( this.isAnimating ) requestAnimationFrame( () => this.animate() );
};

proto.positionSlider = function() {
  let x = this.x;
  // wrap position around
  if ( this.isWrapping ) {
    x = utils.modulo( x, this.slideableWidth ) - this.slideableWidth;
    this.shiftWrapCells( x );
  }

  this.setTranslateX( x, this.isAnimating );
  this.dispatchScrollEvent();
};

proto.setTranslateX = function( x, is3d ) {
  x += this.cursorPosition;
  // reverse if right-to-left and using transform
  if ( this.options.rightToLeft ) x = -x;
  let translateX = this.getPositionValue( x );
  // use 3D transforms for hardware acceleration on iOS
  // but use 2D when settled, for better font-rendering
  this.slider.style.transform = is3d ?
    `translate3d(${translateX},0,0)` : `translateX(${translateX})`;
};

proto.dispatchScrollEvent = function() {
  let firstSlide = this.slides[0];
  if ( !firstSlide ) return;

  let positionX = -this.x - firstSlide.target;
  let progress = positionX / this.slidesWidth;
  this.dispatchEvent( 'scroll', null, [ progress, positionX ] );
};

proto.positionSliderAtSelected = function() {
  if ( !this.cells.length ) return;

  this.x = -this.selectedSlide.target;
  this.velocity = 0; // stop wobble
  this.positionSlider();
};

proto.getPositionValue = function( position ) {
  if ( this.options.percentPosition ) {
    // percent position, round to 2 digits, like 12.34%
    return ( Math.round( ( position / this.size.innerWidth ) * 10000 ) * 0.01 ) + '%';
  } else {
    // pixel positioning
    return Math.round( position ) + 'px';
  }
};

proto.settle = function( previousX ) {
  // keep track of frames where x hasn't moved
  let isResting = !this.isPointerDown &&
      Math.round( this.x * 100 ) === Math.round( previousX * 100 );
  if ( isResting ) this.restingFrames++;
  // stop animating if resting for 3 or more frames
  if ( this.restingFrames > 2 ) {
    this.isAnimating = false;
    delete this.isFreeScrolling;
    // render position with translateX when settled
    this.positionSlider();
    this.dispatchEvent( 'settle', null, [ this.selectedIndex ] );
  }
};

proto.shiftWrapCells = function( x ) {
  // shift before cells
  let beforeGap = this.cursorPosition + x;
  this._shiftCells( this.beforeShiftCells, beforeGap, -1 );
  // shift after cells
  let afterGap = this.size.innerWidth - ( x + this.slideableWidth + this.cursorPosition );
  this._shiftCells( this.afterShiftCells, afterGap, 1 );
};

proto._shiftCells = function( cells, gap, shift ) {
  cells.forEach( ( cell ) => {
    let cellShift = gap > 0 ? shift : 0;
    this._wrapShiftCell( cell, cellShift );
    gap -= cell.size.outerWidth;
  } );
};

proto._unshiftCells = function( cells ) {
  if ( !cells || !cells.length ) return;

  cells.forEach( ( cell ) => this._wrapShiftCell( cell, 0 ) );
};

// @param {Integer} shift - 0, 1, or -1
proto._wrapShiftCell = function( cell, shift ) {
  this._renderCellPosition( cell, cell.x + this.slideableWidth * shift );
};

// -------------------------- physics -------------------------- //

proto.integratePhysics = function() {
  this.x += this.velocity;
  this.velocity *= this.getFrictionFactor();
};

proto.applyForce = function( force ) {
  this.velocity += force;
};

proto.getFrictionFactor = function() {
  return 1 - this.options[ this.isFreeScrolling ? 'freeScrollFriction' : 'friction' ];
};

proto.getRestingPosition = function() {
  // my thanks to Steven Wittens, who simplified this math greatly
  return this.x + this.velocity / ( 1 - this.getFrictionFactor() );
};

proto.applyDragForce = function() {
  if ( !this.isDraggable || !this.isPointerDown ) return;

  // change the position to drag position by applying force
  let dragVelocity = this.dragX - this.x;
  let dragForce = dragVelocity - this.velocity;
  this.applyForce( dragForce );
};

proto.applySelectedAttraction = function() {
  // do not attract if pointer down or no slides
  let dragDown = this.isDraggable && this.isPointerDown;
  if ( dragDown || this.isFreeScrolling || !this.slides.length ) return;

  let distance = this.selectedSlide.target * -1 - this.x;
  let force = distance * this.options.selectedAttraction;
  this.applyForce( force );
};

return proto;

} ) );


/***/ }),

/***/ "./node_modules/flickity/js/cell.js":
/*!******************************************!*\
  !*** ./node_modules/flickity/js/cell.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Flickity.Cell
( function( window, factory ) {
  // universal module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory( __webpack_require__(/*! get-size */ "./node_modules/get-size/get-size.js") );
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.Cell = factory( window.getSize );
  }

}( typeof window != 'undefined' ? window : this, function factory( getSize ) {

const cellClassName = 'flickity-cell';

function Cell( elem ) {
  this.element = elem;
  this.element.classList.add( cellClassName );

  this.x = 0;
  this.unselect();
}

let proto = Cell.prototype;

proto.destroy = function() {
  // reset style
  this.unselect();
  this.element.classList.remove( cellClassName );
  this.element.style.transform = '';
  this.element.removeAttribute('aria-hidden');
};

proto.getSize = function() {
  this.size = getSize( this.element );
};

proto.select = function() {
  this.element.classList.add('is-selected');
  this.element.removeAttribute('aria-hidden');
};

proto.unselect = function() {
  this.element.classList.remove('is-selected');
  this.element.setAttribute( 'aria-hidden', 'true' );
};

proto.remove = function() {
  this.element.remove();
};

return Cell;

} ) );


/***/ }),

/***/ "./node_modules/flickity/js/core.js":
/*!******************************************!*\
  !*** ./node_modules/flickity/js/core.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Flickity main
/* eslint-disable max-params */
( function( window, factory ) {
  // universal module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory(
        window,
        __webpack_require__(/*! ev-emitter */ "./node_modules/ev-emitter/ev-emitter.js"),
        __webpack_require__(/*! get-size */ "./node_modules/get-size/get-size.js"),
        __webpack_require__(/*! fizzy-ui-utils */ "./node_modules/fizzy-ui-utils/utils.js"),
        __webpack_require__(/*! ./cell */ "./node_modules/flickity/js/cell.js"),
        __webpack_require__(/*! ./slide */ "./node_modules/flickity/js/slide.js"),
        __webpack_require__(/*! ./animate */ "./node_modules/flickity/js/animate.js"),
    );
  } else {
    // browser global
    let _Flickity = window.Flickity;

    window.Flickity = factory(
        window,
        window.EvEmitter,
        window.getSize,
        window.fizzyUIUtils,
        _Flickity.Cell,
        _Flickity.Slide,
        _Flickity.animatePrototype,
    );
  }

}( typeof window != 'undefined' ? window : this,
    function factory( window, EvEmitter, getSize, utils, Cell, Slide, animatePrototype ) {
/* eslint-enable max-params */

// vars
const { getComputedStyle, console } = window;
let { jQuery } = window;

// -------------------------- Flickity -------------------------- //

// globally unique identifiers
let GUID = 0;
// internal store of all Flickity intances
let instances = {};

function Flickity( element, options ) {
  let queryElement = utils.getQueryElement( element );
  if ( !queryElement ) {
    if ( console ) console.error(`Bad element for Flickity: ${queryElement || element}`);
    return;
  }
  this.element = queryElement;
  // do not initialize twice on same element
  if ( this.element.flickityGUID ) {
    let instance = instances[ this.element.flickityGUID ];
    if ( instance ) instance.option( options );
    return instance;
  }

  // add jQuery
  if ( jQuery ) {
    this.$element = jQuery( this.element );
  }
  // options
  this.options = { ...this.constructor.defaults };
  this.option( options );

  // kick things off
  this._create();
}

Flickity.defaults = {
  accessibility: true,
  // adaptiveHeight: false,
  cellAlign: 'center',
  // cellSelector: undefined,
  // contain: false,
  freeScrollFriction: 0.075, // friction when free-scrolling
  friction: 0.28, // friction when selecting
  namespaceJQueryEvents: true,
  // initialIndex: 0,
  percentPosition: true,
  resize: true,
  selectedAttraction: 0.025,
  setGallerySize: true,
  // watchCSS: false,
  // wrapAround: false
};

// hash of methods triggered on _create()
Flickity.create = {};

let proto = Flickity.prototype;
// inherit EventEmitter
Object.assign( proto, EvEmitter.prototype );

proto._create = function() {
  let { resize, watchCSS, rightToLeft } = this.options;
  // add id for Flickity.data
  let id = this.guid = ++GUID;
  this.element.flickityGUID = id; // expando
  instances[ id ] = this; // associate via id
  // initial properties
  this.selectedIndex = 0;
  // how many frames slider has been in same position
  this.restingFrames = 0;
  // initial physics properties
  this.x = 0;
  this.velocity = 0;
  this.beginMargin = rightToLeft ? 'marginRight' : 'marginLeft';
  this.endMargin = rightToLeft ? 'marginLeft' : 'marginRight';
  // create viewport & slider
  this.viewport = document.createElement('div');
  this.viewport.className = 'flickity-viewport';
  this._createSlider();
  // used for keyboard navigation
  this.focusableElems = [ this.element ];

  if ( resize || watchCSS ) {
    window.addEventListener( 'resize', this );
  }

  // add listeners from on option
  for ( let eventName in this.options.on ) {
    let listener = this.options.on[ eventName ];
    this.on( eventName, listener );
  }

  for ( let method in Flickity.create ) {
    Flickity.create[ method ].call( this );
  }

  if ( watchCSS ) {
    this.watchCSS();
  } else {
    this.activate();
  }
};

/**
 * set options
 * @param {Object} opts - options to extend
 */
proto.option = function( opts ) {
  Object.assign( this.options, opts );
};

proto.activate = function() {
  if ( this.isActive ) return;

  this.isActive = true;
  this.element.classList.add('flickity-enabled');
  if ( this.options.rightToLeft ) {
    this.element.classList.add('flickity-rtl');
  }

  this.getSize();
  // move initial cell elements so they can be loaded as cells
  let cellElems = this._filterFindCellElements( this.element.children );
  this.slider.append( ...cellElems );
  this.viewport.append( this.slider );
  this.element.append( this.viewport );
  // get cells from children
  this.reloadCells();

  if ( this.options.accessibility ) {
    // allow element to focusable
    this.element.tabIndex = 0;
    // listen for key presses
    this.element.addEventListener( 'keydown', this );
  }

  this.emitEvent('activate');
  this.selectInitialIndex();
  // flag for initial activation, for using initialIndex
  this.isInitActivated = true;
  // ready event. #493
  this.dispatchEvent('ready');
};

// slider positions the cells
proto._createSlider = function() {
  // slider element does all the positioning
  let slider = document.createElement('div');
  slider.className = 'flickity-slider';
  this.slider = slider;
};

proto._filterFindCellElements = function( elems ) {
  return utils.filterFindElements( elems, this.options.cellSelector );
};

// goes through all children
proto.reloadCells = function() {
  // collection of item elements
  this.cells = this._makeCells( this.slider.children );
  this.positionCells();
  this._updateWrapShiftCells();
  this.setGallerySize();
};

/**
 * turn elements into Flickity.Cells
 * @param {[Array, NodeList, HTMLElement]} elems - elements to make into cells
 * @returns {Array} items - collection of new Flickity Cells
 */
proto._makeCells = function( elems ) {
  let cellElems = this._filterFindCellElements( elems );

  // create new Cells for collection
  return cellElems.map( ( cellElem ) => new Cell( cellElem ) );
};

proto.getLastCell = function() {
  return this.cells[ this.cells.length - 1 ];
};

proto.getLastSlide = function() {
  return this.slides[ this.slides.length - 1 ];
};

// positions all cells
proto.positionCells = function() {
  // size all cells
  this._sizeCells( this.cells );
  // position all cells
  this._positionCells( 0 );
};

/**
 * position certain cells
 * @param {Integer} index - which cell to start with
 */
proto._positionCells = function( index ) {
  index = index || 0;
  // also measure maxCellHeight
  // start 0 if positioning all cells
  this.maxCellHeight = index ? this.maxCellHeight || 0 : 0;
  let cellX = 0;
  // get cellX
  if ( index > 0 ) {
    let startCell = this.cells[ index - 1 ];
    cellX = startCell.x + startCell.size.outerWidth;
  }

  this.cells.slice( index ).forEach( ( cell ) => {
    cell.x = cellX;
    this._renderCellPosition( cell, cellX );
    cellX += cell.size.outerWidth;
    this.maxCellHeight = Math.max( cell.size.outerHeight, this.maxCellHeight );
  } );
  // keep track of cellX for wrap-around
  this.slideableWidth = cellX;
  // slides
  this.updateSlides();
  // contain slides target
  this._containSlides();
  // update slidesWidth
  this.slidesWidth = this.cells.length ?
    this.getLastSlide().target - this.slides[0].target : 0;
};

proto._renderCellPosition = function( cell, x ) {
  // render position of cell with in slider
  let sideOffset = this.options.rightToLeft ? -1 : 1;
  let renderX = x * sideOffset;
  if ( this.options.percentPosition ) renderX *= this.size.innerWidth / cell.size.width;
  let positionValue = this.getPositionValue( renderX );
  cell.element.style.transform = `translateX( ${positionValue} )`;
};

/**
 * cell.getSize() on multiple cells
 * @param {Array} cells - cells to size
 */
proto._sizeCells = function( cells ) {
  cells.forEach( ( cell ) => cell.getSize() );
};

// --------------------------  -------------------------- //

proto.updateSlides = function() {
  this.slides = [];
  if ( !this.cells.length ) return;

  let { beginMargin, endMargin } = this;
  let slide = new Slide( beginMargin, endMargin, this.cellAlign );
  this.slides.push( slide );

  let canCellFit = this._getCanCellFit();

  this.cells.forEach( ( cell, i ) => {
    // just add cell if first cell in slide
    if ( !slide.cells.length ) {
      slide.addCell( cell );
      return;
    }

    let slideWidth = ( slide.outerWidth - slide.firstMargin ) +
      ( cell.size.outerWidth - cell.size[ endMargin ] );

    if ( canCellFit( i, slideWidth ) ) {
      slide.addCell( cell );
    } else {
      // doesn't fit, new slide
      slide.updateTarget();

      slide = new Slide( beginMargin, endMargin, this.cellAlign );
      this.slides.push( slide );
      slide.addCell( cell );
    }
  } );
  // last slide
  slide.updateTarget();
  // update .selectedSlide
  this.updateSelectedSlide();
};

proto._getCanCellFit = function() {
  let { groupCells } = this.options;
  if ( !groupCells ) return () => false;

  if ( typeof groupCells == 'number' ) {
    // group by number. 3 -> [0,1,2], [3,4,5], ...
    let number = parseInt( groupCells, 10 );
    return ( i ) => ( i % number ) !== 0;
  }
  // default, group by width of slide
  let percent = 1;
  // parse '75%
  let percentMatch = typeof groupCells == 'string' && groupCells.match( /^(\d+)%$/ );
  if ( percentMatch ) percent = parseInt( percentMatch[1], 10 ) / 100;
  let groupWidth = ( this.size.innerWidth + 1 ) * percent;
  return ( i, slideWidth ) => slideWidth <= groupWidth;
};

// alias _init for jQuery plugin .flickity()
proto._init =
proto.reposition = function() {
  this.positionCells();
  this.positionSliderAtSelected();
};

proto.getSize = function() {
  this.size = getSize( this.element );
  this.setCellAlign();
  this.cursorPosition = this.size.innerWidth * this.cellAlign;
};

let cellAlignShorthands = {
  left: 0,
  center: 0.5,
  right: 1,
};

proto.setCellAlign = function() {
  let { cellAlign, rightToLeft } = this.options;
  let shorthand = cellAlignShorthands[ cellAlign ];
  this.cellAlign = shorthand !== undefined ? shorthand : cellAlign;
  if ( rightToLeft ) this.cellAlign = 1 - this.cellAlign;
};

proto.setGallerySize = function() {
  if ( !this.options.setGallerySize ) return;

  let height = this.options.adaptiveHeight && this.selectedSlide ?
    this.selectedSlide.height : this.maxCellHeight;
  this.viewport.style.height = `${height}px`;
};

proto._updateWrapShiftCells = function() {
  // update isWrapping
  this.isWrapping = this.getIsWrapping();
  // only for wrap-around
  if ( !this.isWrapping ) return;

  // unshift previous cells
  this._unshiftCells( this.beforeShiftCells );
  this._unshiftCells( this.afterShiftCells );
  // get before cells
  // initial gap
  let beforeGapX = this.cursorPosition;
  let lastIndex = this.cells.length - 1;
  this.beforeShiftCells = this._getGapCells( beforeGapX, lastIndex, -1 );
  // get after cells
  // ending gap between last cell and end of gallery viewport
  let afterGapX = this.size.innerWidth - this.cursorPosition;
  // start cloning at first cell, working forwards
  this.afterShiftCells = this._getGapCells( afterGapX, 0, 1 );
};

proto.getIsWrapping = function() {
  let { wrapAround } = this.options;
  if ( !wrapAround || this.slides.length < 2 ) return false;

  if ( wrapAround !== 'fill' ) return true;
  // check that slides can fit

  let gapWidth = this.slideableWidth - this.size.innerWidth;
  if ( gapWidth > this.size.innerWidth ) return true; // gap * 2x big, all good
  // check that content width - shifting cell is bigger than viewport width
  for ( let cell of this.cells ) {
    if ( cell.size.outerWidth > gapWidth ) return false;
  }
  return true;
};

proto._getGapCells = function( gapX, cellIndex, increment ) {
  // keep adding cells until the cover the initial gap
  let cells = [];
  while ( gapX > 0 ) {
    let cell = this.cells[ cellIndex ];
    if ( !cell ) break;

    cells.push( cell );
    cellIndex += increment;
    gapX -= cell.size.outerWidth;
  }
  return cells;
};

// ----- contain & wrap ----- //

// contain cell targets so no excess sliding
proto._containSlides = function() {
  let isContaining = this.options.contain && !this.isWrapping &&
      this.cells.length;
  if ( !isContaining ) return;

  let contentWidth = this.slideableWidth - this.getLastCell().size[ this.endMargin ];
  // content is less than gallery size
  let isContentSmaller = contentWidth < this.size.innerWidth;
  if ( isContentSmaller ) {
    // all cells fit inside gallery
    this.slides.forEach( ( slide ) => {
      slide.target = contentWidth * this.cellAlign;
    } );
  } else {
    // contain to bounds
    let beginBound = this.cursorPosition + this.cells[0].size[ this.beginMargin ];
    let endBound = contentWidth - this.size.innerWidth * ( 1 - this.cellAlign );
    this.slides.forEach( ( slide ) => {
      slide.target = Math.max( slide.target, beginBound );
      slide.target = Math.min( slide.target, endBound );
    } );
  }
};

// ----- events ----- //

/**
 * emits events via eventEmitter and jQuery events
 * @param {String} type - name of event
 * @param {Event} event - original event
 * @param {Array} args - extra arguments
 */
proto.dispatchEvent = function( type, event, args ) {
  let emitArgs = event ? [ event ].concat( args ) : args;
  this.emitEvent( type, emitArgs );

  if ( jQuery && this.$element ) {
    // default trigger with type if no event
    type += this.options.namespaceJQueryEvents ? '.flickity' : '';
    let $event = type;
    if ( event ) {
      // create jQuery event
      let jQEvent = new jQuery.Event( event );
      jQEvent.type = type;
      $event = jQEvent;
    }
    this.$element.trigger( $event, args );
  }
};

const unidraggerEvents = [
  'dragStart',
  'dragMove',
  'dragEnd',
  'pointerDown',
  'pointerMove',
  'pointerEnd',
  'staticClick',
];

let _emitEvent = proto.emitEvent;
proto.emitEvent = function( eventName, args ) {
  if ( eventName === 'staticClick' ) {
    // add cellElem and cellIndex args to staticClick
    let clickedCell = this.getParentCell( args[0].target );
    let cellElem = clickedCell && clickedCell.element;
    let cellIndex = clickedCell && this.cells.indexOf( clickedCell );
    args = args.concat( cellElem, cellIndex );
  }
  // do regular thing
  _emitEvent.call( this, eventName, args );
  // duck-punch in jQuery events for Unidragger events
  let isUnidraggerEvent = unidraggerEvents.includes( eventName );
  if ( !isUnidraggerEvent || !jQuery || !this.$element ) return;

  eventName += this.options.namespaceJQueryEvents ? '.flickity' : '';
  let event = args.shift( 0 );
  let jQEvent = new jQuery.Event( event );
  jQEvent.type = eventName;
  this.$element.trigger( jQEvent, args );
};

// -------------------------- select -------------------------- //

/**
 * @param {Integer} index - index of the slide
 * @param {Boolean} isWrap - will wrap-around to last/first if at the end
 * @param {Boolean} isInstant - will immediately set position at selected cell
 */
proto.select = function( index, isWrap, isInstant ) {
  if ( !this.isActive ) return;

  index = parseInt( index, 10 );
  this._wrapSelect( index );

  if ( this.isWrapping || isWrap ) {
    index = utils.modulo( index, this.slides.length );
  }
  // bail if invalid index
  if ( !this.slides[ index ] ) return;

  let prevIndex = this.selectedIndex;
  this.selectedIndex = index;
  this.updateSelectedSlide();
  if ( isInstant ) {
    this.positionSliderAtSelected();
  } else {
    this.startAnimation();
  }
  if ( this.options.adaptiveHeight ) {
    this.setGallerySize();
  }
  // events
  this.dispatchEvent( 'select', null, [ index ] );
  // change event if new index
  if ( index !== prevIndex ) {
    this.dispatchEvent( 'change', null, [ index ] );
  }
};

// wraps position for wrapAround, to move to closest slide. #113
proto._wrapSelect = function( index ) {
  if ( !this.isWrapping ) return;

  const { selectedIndex, slideableWidth, slides: { length } } = this;
  // shift index for wrap, do not wrap dragSelect
  if ( !this.isDragSelect ) {
    let wrapIndex = utils.modulo( index, length );
    // go to shortest
    let delta = Math.abs( wrapIndex - selectedIndex );
    let backWrapDelta = Math.abs( ( wrapIndex + length ) - selectedIndex );
    let forewardWrapDelta = Math.abs( ( wrapIndex - length ) - selectedIndex );
    if ( backWrapDelta < delta ) {
      index += length;
    } else if ( forewardWrapDelta < delta ) {
      index -= length;
    }
  }

  // wrap position so slider is within normal area
  if ( index < 0 ) {
    this.x -= slideableWidth;
  } else if ( index >= length ) {
    this.x += slideableWidth;
  }
};

proto.previous = function( isWrap, isInstant ) {
  this.select( this.selectedIndex - 1, isWrap, isInstant );
};

proto.next = function( isWrap, isInstant ) {
  this.select( this.selectedIndex + 1, isWrap, isInstant );
};

proto.updateSelectedSlide = function() {
  let slide = this.slides[ this.selectedIndex ];
  // selectedIndex could be outside of slides, if triggered before resize()
  if ( !slide ) return;

  // unselect previous selected slide
  this.unselectSelectedSlide();
  // update new selected slide
  this.selectedSlide = slide;
  slide.select();
  this.selectedCells = slide.cells;
  this.selectedElements = slide.getCellElements();
  // HACK: selectedCell & selectedElement is first cell in slide, backwards compatibility
  this.selectedCell = slide.cells[0];
  this.selectedElement = this.selectedElements[0];
};

proto.unselectSelectedSlide = function() {
  if ( this.selectedSlide ) this.selectedSlide.unselect();
};

proto.selectInitialIndex = function() {
  let initialIndex = this.options.initialIndex;
  // already activated, select previous selectedIndex
  if ( this.isInitActivated ) {
    this.select( this.selectedIndex, false, true );
    return;
  }
  // select with selector string
  if ( initialIndex && typeof initialIndex == 'string' ) {
    let cell = this.queryCell( initialIndex );
    if ( cell ) {
      this.selectCell( initialIndex, false, true );
      return;
    }
  }

  let index = 0;
  // select with number
  if ( initialIndex && this.slides[ initialIndex ] ) {
    index = initialIndex;
  }
  // select instantly
  this.select( index, false, true );
};

/**
 * select slide from number or cell element
 * @param {[Element, Number]} value - zero-based index or element to select
 * @param {Boolean} isWrap - enables wrapping around for extra index
 * @param {Boolean} isInstant - disables slide animation
 */
proto.selectCell = function( value, isWrap, isInstant ) {
  // get cell
  let cell = this.queryCell( value );
  if ( !cell ) return;

  let index = this.getCellSlideIndex( cell );
  this.select( index, isWrap, isInstant );
};

proto.getCellSlideIndex = function( cell ) {
  // get index of slide that has cell
  let cellSlide = this.slides.find( ( slide ) => slide.cells.includes( cell ) );
  return this.slides.indexOf( cellSlide );
};

// -------------------------- get cells -------------------------- //

/**
 * get Flickity.Cell, given an Element
 * @param {Element} elem - matching cell element
 * @returns {Flickity.Cell} cell - matching cell
 */
proto.getCell = function( elem ) {
  // loop through cells to get the one that matches
  for ( let cell of this.cells ) {
    if ( cell.element === elem ) return cell;
  }
};

/**
 * get collection of Flickity.Cells, given Elements
 * @param {[Element, Array, NodeList]} elems - multiple elements
 * @returns {Array} cells - Flickity.Cells
 */
proto.getCells = function( elems ) {
  elems = utils.makeArray( elems );
  return elems.map( ( elem ) => this.getCell( elem ) ).filter( Boolean );
};

/**
 * get cell elements
 * @returns {Array} cellElems
 */
proto.getCellElements = function() {
  return this.cells.map( ( cell ) => cell.element );
};

/**
 * get parent cell from an element
 * @param {Element} elem - child element
 * @returns {Flickit.Cell} cell - parent cell
 */
proto.getParentCell = function( elem ) {
  // first check if elem is cell
  let cell = this.getCell( elem );
  if ( cell ) return cell;

  // try to get parent cell elem
  let closest = elem.closest('.flickity-slider > *');
  return this.getCell( closest );
};

/**
 * get cells adjacent to a slide
 * @param {Integer} adjCount - number of adjacent slides
 * @param {Integer} index - index of slide to start
 * @returns {Array} cells - array of Flickity.Cells
 */
proto.getAdjacentCellElements = function( adjCount, index ) {
  if ( !adjCount ) return this.selectedSlide.getCellElements();

  index = index === undefined ? this.selectedIndex : index;

  let len = this.slides.length;
  if ( 1 + ( adjCount * 2 ) >= len ) {
    return this.getCellElements(); // get all
  }

  let cellElems = [];
  for ( let i = index - adjCount; i <= index + adjCount; i++ ) {
    let slideIndex = this.isWrapping ? utils.modulo( i, len ) : i;
    let slide = this.slides[ slideIndex ];
    if ( slide ) {
      cellElems = cellElems.concat( slide.getCellElements() );
    }
  }
  return cellElems;
};

/**
 * select slide from number or cell element
 * @param {[Element, String, Number]} selector - element, selector string, or index
 * @returns {Flickity.Cell} - matching cell
 */
proto.queryCell = function( selector ) {
  if ( typeof selector == 'number' ) {
    // use number as index
    return this.cells[ selector ];
  }
  // do not select invalid selectors from hash: #123, #/. #791
  let isSelectorString = typeof selector == 'string' && !selector.match( /^[#.]?[\d/]/ );
  if ( isSelectorString ) {
    // use string as selector, get element
    selector = this.element.querySelector( selector );
  }
  // get cell from element
  return this.getCell( selector );
};

// -------------------------- events -------------------------- //

proto.uiChange = function() {
  this.emitEvent('uiChange');
};

// ----- resize ----- //

proto.onresize = function() {
  this.watchCSS();
  this.resize();
};

utils.debounceMethod( Flickity, 'onresize', 150 );

proto.resize = function() {
  // #1177 disable resize behavior when animating or dragging for iOS 15
  if ( !this.isActive || this.isAnimating || this.isDragging ) return;
  this.getSize();
  // wrap values
  if ( this.isWrapping ) {
    this.x = utils.modulo( this.x, this.slideableWidth );
  }
  this.positionCells();
  this._updateWrapShiftCells();
  this.setGallerySize();
  this.emitEvent('resize');
  // update selected index for group slides, instant
  // TODO: position can be lost between groups of various numbers
  let selectedElement = this.selectedElements && this.selectedElements[0];
  this.selectCell( selectedElement, false, true );
};

// watches the :after property, activates/deactivates
proto.watchCSS = function() {
  if ( !this.options.watchCSS ) return;

  let afterContent = getComputedStyle( this.element, ':after' ).content;
  // activate if :after { content: 'flickity' }
  if ( afterContent.includes('flickity') ) {
    this.activate();
  } else {
    this.deactivate();
  }
};

// ----- keydown ----- //

// go previous/next if left/right keys pressed
proto.onkeydown = function( event ) {
  let { activeElement } = document;
  let handler = Flickity.keyboardHandlers[ event.key ];
  // only work if element is in focus
  if ( !this.options.accessibility || !activeElement || !handler ) return;

  let isFocused = this.focusableElems.some( ( elem ) => activeElement === elem );
  if ( isFocused ) handler.call( this );
};

Flickity.keyboardHandlers = {
  ArrowLeft: function() {
    this.uiChange();
    let leftMethod = this.options.rightToLeft ? 'next' : 'previous';
    this[ leftMethod ]();
  },
  ArrowRight: function() {
    this.uiChange();
    let rightMethod = this.options.rightToLeft ? 'previous' : 'next';
    this[ rightMethod ]();
  },
};

// ----- focus ----- //

proto.focus = function() {
  this.element.focus({ preventScroll: true });
};

// -------------------------- destroy -------------------------- //

// deactivate all Flickity functionality, but keep stuff available
proto.deactivate = function() {
  if ( !this.isActive ) return;

  this.element.classList.remove('flickity-enabled');
  this.element.classList.remove('flickity-rtl');
  this.unselectSelectedSlide();
  // destroy cells
  this.cells.forEach( ( cell ) => cell.destroy() );
  this.viewport.remove();
  // move child elements back into element
  this.element.append( ...this.slider.children );
  if ( this.options.accessibility ) {
    this.element.removeAttribute('tabIndex');
    this.element.removeEventListener( 'keydown', this );
  }
  // set flags
  this.isActive = false;
  this.emitEvent('deactivate');
};

proto.destroy = function() {
  this.deactivate();
  window.removeEventListener( 'resize', this );
  this.allOff();
  this.emitEvent('destroy');
  if ( jQuery && this.$element ) {
    jQuery.removeData( this.element, 'flickity' );
  }
  delete this.element.flickityGUID;
  delete instances[ this.guid ];
};

// -------------------------- prototype -------------------------- //

Object.assign( proto, animatePrototype );

// -------------------------- extras -------------------------- //

/**
 * get Flickity instance from element
 * @param {[Element, String]} elem - element or selector string
 * @returns {Flickity} - Flickity instance
 */
Flickity.data = function( elem ) {
  elem = utils.getQueryElement( elem );
  if ( elem ) return instances[ elem.flickityGUID ];
};

utils.htmlInit( Flickity, 'flickity' );

let { jQueryBridget } = window;
if ( jQuery && jQueryBridget ) {
  jQueryBridget( 'flickity', Flickity, jQuery );
}

// set internal jQuery, for Webpack + jQuery v3, #478
Flickity.setJQuery = function( jq ) {
  jQuery = jq;
};

Flickity.Cell = Cell;
Flickity.Slide = Slide;

return Flickity;

} ) );


/***/ }),

/***/ "./node_modules/flickity/js/drag.js":
/*!******************************************!*\
  !*** ./node_modules/flickity/js/drag.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// drag
( function( window, factory ) {
  // universal module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory(
        window,
        __webpack_require__(/*! ./core */ "./node_modules/flickity/js/core.js"),
        __webpack_require__(/*! unidragger */ "./node_modules/unidragger/unidragger.js"),
        __webpack_require__(/*! fizzy-ui-utils */ "./node_modules/fizzy-ui-utils/utils.js"),
    );
  } else {
    // browser global
    window.Flickity = factory(
        window,
        window.Flickity,
        window.Unidragger,
        window.fizzyUIUtils,
    );
  }

}( typeof window != 'undefined' ? window : this,
    function factory( window, Flickity, Unidragger, utils ) {

// ----- defaults ----- //

Object.assign( Flickity.defaults, {
  draggable: '>1',
  dragThreshold: 3,
} );

// -------------------------- drag prototype -------------------------- //

let proto = Flickity.prototype;
Object.assign( proto, Unidragger.prototype ); // inherit Unidragger
proto.touchActionValue = '';

// --------------------------  -------------------------- //

Flickity.create.drag = function() {
  this.on( 'activate', this.onActivateDrag );
  this.on( 'uiChange', this._uiChangeDrag );
  this.on( 'deactivate', this.onDeactivateDrag );
  this.on( 'cellChange', this.updateDraggable );
  this.on( 'pointerDown', this.handlePointerDown );
  this.on( 'pointerUp', this.handlePointerUp );
  this.on( 'pointerDown', this.handlePointerDone );
  this.on( 'dragStart', this.handleDragStart );
  this.on( 'dragMove', this.handleDragMove );
  this.on( 'dragEnd', this.handleDragEnd );
  this.on( 'staticClick', this.handleStaticClick );
  // TODO updateDraggable on resize? if groupCells & slides change
};

proto.onActivateDrag = function() {
  this.handles = [ this.viewport ];
  this.bindHandles();
  this.updateDraggable();
};

proto.onDeactivateDrag = function() {
  this.unbindHandles();
  this.element.classList.remove('is-draggable');
};

proto.updateDraggable = function() {
  // disable dragging if less than 2 slides. #278
  if ( this.options.draggable === '>1' ) {
    this.isDraggable = this.slides.length > 1;
  } else {
    this.isDraggable = this.options.draggable;
  }
  this.element.classList.toggle( 'is-draggable', this.isDraggable );
};

proto._uiChangeDrag = function() {
  delete this.isFreeScrolling;
};

// -------------------------- pointer events -------------------------- //

proto.handlePointerDown = function( event ) {
  if ( !this.isDraggable ) {
    // proceed for staticClick
    this.bindActivePointerEvents( event );
    return;
  }

  let isTouchStart = event.type === 'touchstart';
  let isTouchPointer = event.pointerType === 'touch';
  let isFocusNode = event.target.matches('input, textarea, select');
  if ( !isTouchStart && !isTouchPointer && !isFocusNode ) event.preventDefault();
  if ( !isFocusNode ) this.focus();
  // blur
  if ( document.activeElement !== this.element ) document.activeElement.blur();
  // stop if it was moving
  this.dragX = this.x;
  this.viewport.classList.add('is-pointer-down');
  // track scrolling
  this.pointerDownScroll = getScrollPosition();
  window.addEventListener( 'scroll', this );
  this.bindActivePointerEvents( event );
};

// ----- move ----- //

proto.hasDragStarted = function( moveVector ) {
  return Math.abs( moveVector.x ) > this.options.dragThreshold;
};

// ----- up ----- //

proto.handlePointerUp = function() {
  delete this.isTouchScrolling;
  this.viewport.classList.remove('is-pointer-down');
};

proto.handlePointerDone = function() {
  window.removeEventListener( 'scroll', this );
  delete this.pointerDownScroll;
};

// -------------------------- dragging -------------------------- //

proto.handleDragStart = function() {
  if ( !this.isDraggable ) return;

  this.dragStartPosition = this.x;
  this.startAnimation();
  window.removeEventListener( 'scroll', this );
};

proto.handleDragMove = function( event, pointer, moveVector ) {
  if ( !this.isDraggable ) return;

  event.preventDefault();

  this.previousDragX = this.dragX;
  // reverse if right-to-left
  let direction = this.options.rightToLeft ? -1 : 1;
  // wrap around move. #589
  if ( this.isWrapping ) moveVector.x %= this.slideableWidth;
  let dragX = this.dragStartPosition + moveVector.x * direction;

  if ( !this.isWrapping ) {
    // slow drag
    let originBound = Math.max( -this.slides[0].target, this.dragStartPosition );
    dragX = dragX > originBound ? ( dragX + originBound ) * 0.5 : dragX;
    let endBound = Math.min( -this.getLastSlide().target, this.dragStartPosition );
    dragX = dragX < endBound ? ( dragX + endBound ) * 0.5 : dragX;
  }

  this.dragX = dragX;
  this.dragMoveTime = new Date();
};

proto.handleDragEnd = function() {
  if ( !this.isDraggable ) return;

  let { freeScroll } = this.options;
  if ( freeScroll ) this.isFreeScrolling = true;
  // set selectedIndex based on where flick will end up
  let index = this.dragEndRestingSelect();

  if ( freeScroll && !this.isWrapping ) {
    // if free-scroll & not wrap around
    // do not free-scroll if going outside of bounding slides
    // so bounding slides can attract slider, and keep it in bounds
    let restingX = this.getRestingPosition();
    this.isFreeScrolling = -restingX > this.slides[0].target &&
      -restingX < this.getLastSlide().target;
  } else if ( !freeScroll && index === this.selectedIndex ) {
    // boost selection if selected index has not changed
    index += this.dragEndBoostSelect();
  }
  delete this.previousDragX;
  // apply selection
  // HACK, set flag so dragging stays in correct direction
  this.isDragSelect = this.isWrapping;
  this.select( index );
  delete this.isDragSelect;
};

proto.dragEndRestingSelect = function() {
  let restingX = this.getRestingPosition();
  // how far away from selected slide
  let distance = Math.abs( this.getSlideDistance( -restingX, this.selectedIndex ) );
  // get closet resting going up and going down
  let positiveResting = this._getClosestResting( restingX, distance, 1 );
  let negativeResting = this._getClosestResting( restingX, distance, -1 );
  // use closer resting for wrap-around
  return positiveResting.distance < negativeResting.distance ?
    positiveResting.index : negativeResting.index;
};

/**
 * given resting X and distance to selected cell
 * get the distance and index of the closest cell
 * @param {Number} restingX - estimated post-flick resting position
 * @param {Number} distance - distance to selected cell
 * @param {Integer} increment - +1 or -1, going up or down
 * @returns {Object} - { distance: {Number}, index: {Integer} }
 */
proto._getClosestResting = function( restingX, distance, increment ) {
  let index = this.selectedIndex;
  let minDistance = Infinity;
  let condition = this.options.contain && !this.isWrapping ?
    // if containing, keep going if distance is equal to minDistance
    ( dist, minDist ) => dist <= minDist :
    ( dist, minDist ) => dist < minDist;

  while ( condition( distance, minDistance ) ) {
    // measure distance to next cell
    index += increment;
    minDistance = distance;
    distance = this.getSlideDistance( -restingX, index );
    if ( distance === null ) break;

    distance = Math.abs( distance );
  }
  return {
    distance: minDistance,
    // selected was previous index
    index: index - increment,
  };
};

/**
 * measure distance between x and a slide target
 * @param {Number} x - horizontal position
 * @param {Integer} index - slide index
 * @returns {Number} - slide distance
 */
proto.getSlideDistance = function( x, index ) {
  let len = this.slides.length;
  // wrap around if at least 2 slides
  let isWrapAround = this.options.wrapAround && len > 1;
  let slideIndex = isWrapAround ? utils.modulo( index, len ) : index;
  let slide = this.slides[ slideIndex ];
  if ( !slide ) return null;

  // add distance for wrap-around slides
  let wrap = isWrapAround ? this.slideableWidth * Math.floor( index/len ) : 0;
  return x - ( slide.target + wrap );
};

proto.dragEndBoostSelect = function() {
  // do not boost if no previousDragX or dragMoveTime
  if ( this.previousDragX === undefined || !this.dragMoveTime ||
    // or if drag was held for 100 ms
    new Date() - this.dragMoveTime > 100 ) {
    return 0;
  }

  let distance = this.getSlideDistance( -this.dragX, this.selectedIndex );
  let delta = this.previousDragX - this.dragX;
  if ( distance > 0 && delta > 0 ) {
    // boost to next if moving towards the right, and positive velocity
    return 1;
  } else if ( distance < 0 && delta < 0 ) {
    // boost to previous if moving towards the left, and negative velocity
    return -1;
  }
  return 0;
};

// ----- scroll ----- //

proto.onscroll = function() {
  let scroll = getScrollPosition();
  let scrollMoveX = this.pointerDownScroll.x - scroll.x;
  let scrollMoveY = this.pointerDownScroll.y - scroll.y;
  // cancel click/tap if scroll is too much
  if ( Math.abs( scrollMoveX ) > 3 || Math.abs( scrollMoveY ) > 3 ) {
    this.pointerDone();
  }
};

// ----- utils ----- //

function getScrollPosition() {
  return {
    x: window.pageXOffset,
    y: window.pageYOffset,
  };
}

// -----  ----- //

return Flickity;

} ) );


/***/ }),

/***/ "./node_modules/flickity/js/imagesloaded.js":
/*!**************************************************!*\
  !*** ./node_modules/flickity/js/imagesloaded.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// imagesloaded
( function( window, factory ) {
  // universal module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory(
        __webpack_require__(/*! ./core */ "./node_modules/flickity/js/core.js"),
        __webpack_require__(/*! imagesloaded */ "./node_modules/imagesloaded/imagesloaded.js"),
    );
  } else {
    // browser global
    factory(
        window.Flickity,
        window.imagesLoaded,
    );
  }

}( typeof window != 'undefined' ? window : this,
    function factory( Flickity, imagesLoaded ) {

Flickity.create.imagesLoaded = function() {
  this.on( 'activate', this.imagesLoaded );
};

Flickity.prototype.imagesLoaded = function() {
  if ( !this.options.imagesLoaded ) return;

  let onImagesLoadedProgress = ( instance, image ) => {
    let cell = this.getParentCell( image.img );
    this.cellSizeChange( cell && cell.element );
    if ( !this.options.freeScroll ) this.positionSliderAtSelected();
  };
  imagesLoaded( this.slider ).on( 'progress', onImagesLoadedProgress );
};

return Flickity;

} ) );


/***/ }),

/***/ "./node_modules/flickity/js/index.js":
/*!*******************************************!*\
  !*** ./node_modules/flickity/js/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*!
 * Flickity v3.0.0
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2022 Metafizzy
 */

if (  true && module.exports ) {
  const Flickity = __webpack_require__(/*! ./core */ "./node_modules/flickity/js/core.js");
  __webpack_require__(/*! ./drag */ "./node_modules/flickity/js/drag.js");
  __webpack_require__(/*! ./prev-next-button */ "./node_modules/flickity/js/prev-next-button.js");
  __webpack_require__(/*! ./page-dots */ "./node_modules/flickity/js/page-dots.js");
  __webpack_require__(/*! ./player */ "./node_modules/flickity/js/player.js");
  __webpack_require__(/*! ./add-remove-cell */ "./node_modules/flickity/js/add-remove-cell.js");
  __webpack_require__(/*! ./lazyload */ "./node_modules/flickity/js/lazyload.js");
  __webpack_require__(/*! ./imagesloaded */ "./node_modules/flickity/js/imagesloaded.js");

  module.exports = Flickity;
}


/***/ }),

/***/ "./node_modules/flickity/js/lazyload.js":
/*!**********************************************!*\
  !*** ./node_modules/flickity/js/lazyload.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// lazyload
( function( window, factory ) {
  // universal module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory(
        __webpack_require__(/*! ./core */ "./node_modules/flickity/js/core.js"),
        __webpack_require__(/*! fizzy-ui-utils */ "./node_modules/fizzy-ui-utils/utils.js"),
    );
  } else {
    // browser global
    factory(
        window.Flickity,
        window.fizzyUIUtils,
    );
  }

}( typeof window != 'undefined' ? window : this, function factory( Flickity, utils ) {

const lazyAttr = 'data-flickity-lazyload';
const lazySrcAttr = `${lazyAttr}-src`;
const lazySrcsetAttr = `${lazyAttr}-srcset`;
const imgSelector = `img[${lazyAttr}], img[${lazySrcAttr}], ` +
  `img[${lazySrcsetAttr}], source[${lazySrcsetAttr}]`;

Flickity.create.lazyLoad = function() {
  this.on( 'select', this.lazyLoad );

  this.handleLazyLoadComplete = this.onLazyLoadComplete.bind( this );
};

let proto = Flickity.prototype;

proto.lazyLoad = function() {
  let { lazyLoad } = this.options;
  if ( !lazyLoad ) return;

  // get adjacent cells, use lazyLoad option for adjacent count
  let adjCount = typeof lazyLoad == 'number' ? lazyLoad : 0;
  // lazy load images
  this.getAdjacentCellElements( adjCount )
    .map( getCellLazyImages )
    .flat()
    .forEach( ( img ) => new LazyLoader( img, this.handleLazyLoadComplete ) );
};

function getCellLazyImages( cellElem ) {
  // check if cell element is lazy image
  if ( cellElem.matches('img') ) {
    let cellAttr = cellElem.getAttribute( lazyAttr );
    let cellSrcAttr = cellElem.getAttribute( lazySrcAttr );
    let cellSrcsetAttr = cellElem.getAttribute( lazySrcsetAttr );
    if ( cellAttr || cellSrcAttr || cellSrcsetAttr ) {
      return cellElem;
    }
  }
  // select lazy images in cell
  return [ ...cellElem.querySelectorAll( imgSelector ) ];
}

proto.onLazyLoadComplete = function( img, event ) {
  let cell = this.getParentCell( img );
  let cellElem = cell && cell.element;
  this.cellSizeChange( cellElem );

  this.dispatchEvent( 'lazyLoad', event, cellElem );
};

// -------------------------- LazyLoader -------------------------- //

/**
 * class to handle loading images
 * @param {Image} img - Image element
 * @param {Function} onComplete - callback function
 */
function LazyLoader( img, onComplete ) {
  this.img = img;
  this.onComplete = onComplete;
  this.load();
}

LazyLoader.prototype.handleEvent = utils.handleEvent;

LazyLoader.prototype.load = function() {
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  // get src & srcset
  let src = this.img.getAttribute( lazyAttr ) ||
    this.img.getAttribute( lazySrcAttr );
  let srcset = this.img.getAttribute( lazySrcsetAttr );
  // set src & serset
  this.img.src = src;
  if ( srcset ) this.img.setAttribute( 'srcset', srcset );
  // remove attr
  this.img.removeAttribute( lazyAttr );
  this.img.removeAttribute( lazySrcAttr );
  this.img.removeAttribute( lazySrcsetAttr );
};

LazyLoader.prototype.onload = function( event ) {
  this.complete( event, 'flickity-lazyloaded' );
};

LazyLoader.prototype.onerror = function( event ) {
  this.complete( event, 'flickity-lazyerror' );
};

LazyLoader.prototype.complete = function( event, className ) {
  // unbind events
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
  let mediaElem = this.img.parentNode.matches('picture') ? this.img.parentNode : this.img;
  mediaElem.classList.add( className );

  this.onComplete( this.img, event );
};

// -----  ----- //

Flickity.LazyLoader = LazyLoader;

return Flickity;

} ) );


/***/ }),

/***/ "./node_modules/flickity/js/page-dots.js":
/*!***********************************************!*\
  !*** ./node_modules/flickity/js/page-dots.js ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// page dots
( function( window, factory ) {
  // universal module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory(
        __webpack_require__(/*! ./core */ "./node_modules/flickity/js/core.js"),
        __webpack_require__(/*! fizzy-ui-utils */ "./node_modules/fizzy-ui-utils/utils.js"),
    );
  } else {
    // browser global
    factory(
        window.Flickity,
        window.fizzyUIUtils,
    );
  }

}( typeof window != 'undefined' ? window : this, function factory( Flickity, utils ) {

// -------------------------- PageDots -------------------------- //

function PageDots() {
  // create holder element
  this.holder = document.createElement('div');
  this.holder.className = 'flickity-page-dots';
  // create dots, array of elements
  this.dots = [];
}

PageDots.prototype.setDots = function( slidesLength ) {
  // get difference between number of slides and number of dots
  let delta = slidesLength - this.dots.length;
  if ( delta > 0 ) {
    this.addDots( delta );
  } else if ( delta < 0 ) {
    this.removeDots( -delta );
  }
};

PageDots.prototype.addDots = function( count ) {
  let newDots = new Array( count ).fill()
    .map( ( item, i ) => {
      let dot = document.createElement('button');
      dot.setAttribute( 'type', 'button' );
      let num = i + 1 + this.dots.length;
      dot.className = 'flickity-page-dot';
      dot.textContent = `View slide ${num}`;
      return dot;
    } );

  this.holder.append( ...newDots );
  this.dots = this.dots.concat( newDots );
};

PageDots.prototype.removeDots = function( count ) {
  // remove from this.dots collection
  let removeDots = this.dots.splice( this.dots.length - count, count );
  // remove from DOM
  removeDots.forEach( ( dot ) => dot.remove() );
};

PageDots.prototype.updateSelected = function( index ) {
  // remove selected class on previous
  if ( this.selectedDot ) {
    this.selectedDot.classList.remove('is-selected');
    this.selectedDot.removeAttribute('aria-current');
  }
  // don't proceed if no dots
  if ( !this.dots.length ) return;

  this.selectedDot = this.dots[ index ];
  this.selectedDot.classList.add('is-selected');
  this.selectedDot.setAttribute( 'aria-current', 'step' );
};

Flickity.PageDots = PageDots;

// -------------------------- Flickity -------------------------- //

Object.assign( Flickity.defaults, {
  pageDots: true,
} );

Flickity.create.pageDots = function() {
  if ( !this.options.pageDots ) return;

  this.pageDots = new PageDots();
  this.handlePageDotsClick = this.onPageDotsClick.bind( this );
  // events
  this.on( 'activate', this.activatePageDots );
  this.on( 'select', this.updateSelectedPageDots );
  this.on( 'cellChange', this.updatePageDots );
  this.on( 'resize', this.updatePageDots );
  this.on( 'deactivate', this.deactivatePageDots );
};

let proto = Flickity.prototype;

proto.activatePageDots = function() {
  this.pageDots.setDots( this.slides.length );
  this.focusableElems.push( ...this.pageDots.dots );
  this.pageDots.holder.addEventListener( 'click', this.handlePageDotsClick );
  this.element.append( this.pageDots.holder );
};

proto.onPageDotsClick = function( event ) {
  let index = this.pageDots.dots.indexOf( event.target );
  if ( index === -1 ) return; // only dot clicks

  this.uiChange();
  this.select( index );
};

proto.updateSelectedPageDots = function() {
  this.pageDots.updateSelected( this.selectedIndex );
};

proto.updatePageDots = function() {
  this.pageDots.dots.forEach( ( dot ) => {
    utils.removeFrom( this.focusableElems, dot );
  } );
  this.pageDots.setDots( this.slides.length );
  this.focusableElems.push( ...this.pageDots.dots );
};

proto.deactivatePageDots = function() {
  this.pageDots.holder.remove();
  this.pageDots.holder.removeEventListener( 'click', this.handlePageDotsClick );
};

// -----  ----- //

Flickity.PageDots = PageDots;

return Flickity;

} ) );


/***/ }),

/***/ "./node_modules/flickity/js/player.js":
/*!********************************************!*\
  !*** ./node_modules/flickity/js/player.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// player & autoPlay
( function( window, factory ) {
  // universal module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory( __webpack_require__(/*! ./core */ "./node_modules/flickity/js/core.js") );
  } else {
    // browser global
    factory( window.Flickity );
  }

}( typeof window != 'undefined' ? window : this, function factory( Flickity ) {

// -------------------------- Player -------------------------- //

function Player( autoPlay, onTick ) {
  this.autoPlay = autoPlay;
  this.onTick = onTick;
  this.state = 'stopped';
  // visibility change event handler
  this.onVisibilityChange = this.visibilityChange.bind( this );
  this.onVisibilityPlay = this.visibilityPlay.bind( this );
}

// start play
Player.prototype.play = function() {
  if ( this.state === 'playing' ) return;

  // do not play if page is hidden, start playing when page is visible
  let isPageHidden = document.hidden;
  if ( isPageHidden ) {
    document.addEventListener( 'visibilitychange', this.onVisibilityPlay );
    return;
  }

  this.state = 'playing';
  // listen to visibility change
  document.addEventListener( 'visibilitychange', this.onVisibilityChange );
  // start ticking
  this.tick();
};

Player.prototype.tick = function() {
  // do not tick if not playing
  if ( this.state !== 'playing' ) return;

  // default to 3 seconds
  let time = typeof this.autoPlay == 'number' ? this.autoPlay : 3000;
  // HACK: reset ticks if stopped and started within interval
  this.clear();
  this.timeout = setTimeout( () => {
    this.onTick();
    this.tick();
  }, time );
};

Player.prototype.stop = function() {
  this.state = 'stopped';
  this.clear();
  // remove visibility change event
  document.removeEventListener( 'visibilitychange', this.onVisibilityChange );
};

Player.prototype.clear = function() {
  clearTimeout( this.timeout );
};

Player.prototype.pause = function() {
  if ( this.state === 'playing' ) {
    this.state = 'paused';
    this.clear();
  }
};

Player.prototype.unpause = function() {
  // re-start play if paused
  if ( this.state === 'paused' ) this.play();
};

// pause if page visibility is hidden, unpause if visible
Player.prototype.visibilityChange = function() {
  let isPageHidden = document.hidden;
  this[ isPageHidden ? 'pause' : 'unpause' ]();
};

Player.prototype.visibilityPlay = function() {
  this.play();
  document.removeEventListener( 'visibilitychange', this.onVisibilityPlay );
};

// -------------------------- Flickity -------------------------- //

Object.assign( Flickity.defaults, {
  pauseAutoPlayOnHover: true,
} );

Flickity.create.player = function() {
  this.player = new Player( this.options.autoPlay, () => {
    this.next( true );
  } );

  this.on( 'activate', this.activatePlayer );
  this.on( 'uiChange', this.stopPlayer );
  this.on( 'pointerDown', this.stopPlayer );
  this.on( 'deactivate', this.deactivatePlayer );
};

let proto = Flickity.prototype;

proto.activatePlayer = function() {
  if ( !this.options.autoPlay ) return;

  this.player.play();
  this.element.addEventListener( 'mouseenter', this );
};

// Player API, don't hate the ... thanks I know where the door is

proto.playPlayer = function() {
  this.player.play();
};

proto.stopPlayer = function() {
  this.player.stop();
};

proto.pausePlayer = function() {
  this.player.pause();
};

proto.unpausePlayer = function() {
  this.player.unpause();
};

proto.deactivatePlayer = function() {
  this.player.stop();
  this.element.removeEventListener( 'mouseenter', this );
};

// ----- mouseenter/leave ----- //

// pause auto-play on hover
proto.onmouseenter = function() {
  if ( !this.options.pauseAutoPlayOnHover ) return;

  this.player.pause();
  this.element.addEventListener( 'mouseleave', this );
};

// resume auto-play on hover off
proto.onmouseleave = function() {
  this.player.unpause();
  this.element.removeEventListener( 'mouseleave', this );
};

// -----  ----- //

Flickity.Player = Player;

return Flickity;

} ) );


/***/ }),

/***/ "./node_modules/flickity/js/prev-next-button.js":
/*!******************************************************!*\
  !*** ./node_modules/flickity/js/prev-next-button.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// prev/next buttons
( function( window, factory ) {
  // universal module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory( __webpack_require__(/*! ./core */ "./node_modules/flickity/js/core.js") );
  } else {
    // browser global
    factory( window.Flickity );
  }

}( typeof window != 'undefined' ? window : this, function factory( Flickity ) {

const svgURI = 'http://www.w3.org/2000/svg';

// -------------------------- PrevNextButton -------------------------- //

function PrevNextButton( increment, direction, arrowShape ) {
  this.increment = increment;
  this.direction = direction;
  this.isPrevious = increment === 'previous';
  this.isLeft = direction === 'left';
  this._create( arrowShape );
}

PrevNextButton.prototype._create = function( arrowShape ) {
  // properties
  let element = this.element = document.createElement('button');
  element.className = `flickity-button flickity-prev-next-button ${this.increment}`;
  let label = this.isPrevious ? 'Previous' : 'Next';
  // prevent button from submitting form https://stackoverflow.com/a/10836076/182183
  element.setAttribute( 'type', 'button' );
  element.setAttribute( 'aria-label', label );
  // init as disabled
  this.disable();
  // create arrow
  let svg = this.createSVG( label, arrowShape );
  element.append( svg );
};

PrevNextButton.prototype.createSVG = function( label, arrowShape ) {
  let svg = document.createElementNS( svgURI, 'svg' );
  svg.setAttribute( 'class', 'flickity-button-icon' );
  svg.setAttribute( 'viewBox', '0 0 100 100' );
  // add title #1189
  let title = document.createElementNS( svgURI, 'title' );
  title.append( label );
  // add path
  let path = document.createElementNS( svgURI, 'path' );
  let pathMovements = getArrowMovements( arrowShape );
  path.setAttribute( 'd', pathMovements );
  path.setAttribute( 'class', 'arrow' );
  // rotate arrow
  if ( !this.isLeft ) {
    path.setAttribute( 'transform', 'translate(100, 100) rotate(180)' );
  }
  svg.append( title, path );
  return svg;
};

// get SVG path movmement
function getArrowMovements( shape ) {
  // use shape as movement if string
  if ( typeof shape == 'string' ) return shape;

  let { x0, x1, x2, x3, y1, y2 } = shape;

  // create movement string
  return `M ${x0}, 50
    L ${x1}, ${y1 + 50}
    L ${x2}, ${y2 + 50}
    L ${x3}, 50
    L ${x2}, ${50 - y2}
    L ${x1}, ${50 - y1}
    Z`;
}

// -----  ----- //

PrevNextButton.prototype.enable = function() {
  this.element.removeAttribute('disabled');
};

PrevNextButton.prototype.disable = function() {
  this.element.setAttribute( 'disabled', true );
};

// -------------------------- Flickity prototype -------------------------- //

Object.assign( Flickity.defaults, {
  prevNextButtons: true,
  arrowShape: {
    x0: 10,
    x1: 60, y1: 50,
    x2: 70, y2: 40,
    x3: 30,
  },
} );

Flickity.create.prevNextButtons = function() {
  if ( !this.options.prevNextButtons ) return;

  let { rightToLeft, arrowShape } = this.options;
  let prevDirection = rightToLeft ? 'right' : 'left';
  let nextDirection = rightToLeft ? 'left' : 'right';
  this.prevButton = new PrevNextButton( 'previous', prevDirection, arrowShape );
  this.nextButton = new PrevNextButton( 'next', nextDirection, arrowShape );
  this.focusableElems.push( this.prevButton.element );
  this.focusableElems.push( this.nextButton.element );

  this.handlePrevButtonClick = () => {
    this.uiChange();
    this.previous();
  };

  this.handleNextButtonClick = () => {
    this.uiChange();
    this.next();
  };

  this.on( 'activate', this.activatePrevNextButtons );
  this.on( 'select', this.updatePrevNextButtons );
};

let proto = Flickity.prototype;

proto.updatePrevNextButtons = function() {
  let lastIndex = this.slides.length ? this.slides.length - 1 : 0;
  this.updatePrevNextButton( this.prevButton, 0 );
  this.updatePrevNextButton( this.nextButton, lastIndex );
};

proto.updatePrevNextButton = function( button, disabledIndex ) {
  // enable is wrapAround and at least 2 slides
  if ( this.isWrapping && this.slides.length > 1 ) {
    button.enable();
    return;
  }

  let isEnabled = this.selectedIndex !== disabledIndex;
  button[ isEnabled ? 'enable' : 'disable' ]();
  // if disabling button that is focused,
  // shift focus to element to maintain keyboard accessibility
  let isDisabledFocused = !isEnabled && document.activeElement === button.element;
  if ( isDisabledFocused ) this.focus();
};

proto.activatePrevNextButtons = function() {
  this.prevButton.element.addEventListener( 'click', this.handlePrevButtonClick );
  this.nextButton.element.addEventListener( 'click', this.handleNextButtonClick );
  this.element.append( this.prevButton.element, this.nextButton.element );
  this.on( 'deactivate', this.deactivatePrevNextButtons );
};

proto.deactivatePrevNextButtons = function() {
  this.prevButton.element.remove();
  this.nextButton.element.remove();
  this.prevButton.element.removeEventListener( 'click', this.handlePrevButtonClick );
  this.nextButton.element.removeEventListener( 'click', this.handleNextButtonClick );
  this.off( 'deactivate', this.deactivatePrevNextButtons );
};

// --------------------------  -------------------------- //

Flickity.PrevNextButton = PrevNextButton;

return Flickity;

} ) );


/***/ }),

/***/ "./node_modules/flickity/js/slide.js":
/*!*******************************************!*\
  !*** ./node_modules/flickity/js/slide.js ***!
  \*******************************************/
/***/ (function(module) {

// slide
( function( window, factory ) {
  // universal module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.Slide = factory();
  }

}( typeof window != 'undefined' ? window : this, function factory() {

function Slide( beginMargin, endMargin, cellAlign ) {
  this.beginMargin = beginMargin;
  this.endMargin = endMargin;
  this.cellAlign = cellAlign;
  this.cells = [];
  this.outerWidth = 0;
  this.height = 0;
}

let proto = Slide.prototype;

proto.addCell = function( cell ) {
  this.cells.push( cell );
  this.outerWidth += cell.size.outerWidth;
  this.height = Math.max( cell.size.outerHeight, this.height );
  // first cell stuff
  if ( this.cells.length === 1 ) {
    this.x = cell.x; // x comes from first cell
    this.firstMargin = cell.size[ this.beginMargin ];
  }
};

proto.updateTarget = function() {
  let lastCell = this.getLastCell();
  let lastMargin = lastCell ? lastCell.size[ this.endMargin ] : 0;
  let slideWidth = this.outerWidth - ( this.firstMargin + lastMargin );
  this.target = this.x + this.firstMargin + slideWidth * this.cellAlign;
};

proto.getLastCell = function() {
  return this.cells[ this.cells.length - 1 ];
};

proto.select = function() {
  this.cells.forEach( ( cell ) => cell.select() );
};

proto.unselect = function() {
  this.cells.forEach( ( cell ) => cell.unselect() );
};

proto.getCellElements = function() {
  return this.cells.map( ( cell ) => cell.element );
};

return Slide;

} ) );


/***/ }),

/***/ "./node_modules/fslightbox/index.js":
/*!******************************************!*\
  !*** ./node_modules/fslightbox/index.js ***!
  \******************************************/
/***/ ((module) => {

!function(e,t){if(true)module.exports=t();else { var o, n; }}(window,(function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var o,i="fslightbox-",r="".concat(i,"styles"),s="".concat(i,"cursor-grabbing"),a="".concat(i,"full-dimension"),c="".concat(i,"flex-centered"),l="".concat(i,"open"),u="".concat(i,"transform-transition"),d="".concat(i,"absoluted"),f="".concat(i,"slide-btn"),p="".concat(f,"-container"),h="".concat(i,"fade-in"),m="".concat(i,"fade-out"),g=h+"-strong",v=m+"-strong",b="".concat(i,"opacity-"),x="".concat(b,"1"),y="".concat(i,"source");function w(e){return(w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function S(e){var t=e.stageIndexes,n=e.core.stageManager,o=e.props.sources.length-1;n.getPreviousSlideIndex=function(){return 0===t.current?o:t.current-1},n.getNextSlideIndex=function(){return t.current===o?0:t.current+1},n.updateStageIndexes=0===o?function(){}:1===o?function(){0===t.current?(t.next=1,delete t.previous):(t.previous=0,delete t.next)}:function(){t.previous=n.getPreviousSlideIndex(),t.next=n.getNextSlideIndex()},n.i=o<=2?function(){return!0}:function(e){var n=t.current;if(0===n&&e===o||n===o&&0===e)return!0;var i=n-e;return-1===i||0===i||1===i}}"object"===("undefined"==typeof document?"undefined":w(document))&&((o=document.createElement("style")).className=r,o.appendChild(document.createTextNode(".fslightbox-absoluted{position:absolute;top:0;left:0}.fslightbox-fade-in{animation:fslightbox-fade-in .3s cubic-bezier(0,0,.7,1)}.fslightbox-fade-out{animation:fslightbox-fade-out .3s ease}.fslightbox-fade-in-strong{animation:fslightbox-fade-in-strong .3s cubic-bezier(0,0,.7,1)}.fslightbox-fade-out-strong{animation:fslightbox-fade-out-strong .3s ease}@keyframes fslightbox-fade-in{from{opacity:.65}to{opacity:1}}@keyframes fslightbox-fade-out{from{opacity:.35}to{opacity:0}}@keyframes fslightbox-fade-in-strong{from{opacity:.3}to{opacity:1}}@keyframes fslightbox-fade-out-strong{from{opacity:1}to{opacity:0}}.fslightbox-cursor-grabbing{cursor:grabbing}.fslightbox-full-dimension{width:100%;height:100%}.fslightbox-open{overflow:hidden;height:100%}.fslightbox-flex-centered{display:flex;justify-content:center;align-items:center}.fslightbox-opacity-0{opacity:0!important}.fslightbox-opacity-1{opacity:1!important}.fslightbox-scrollbarfix{padding-right:17px}.fslightbox-transform-transition{transition:transform .3s}.fslightbox-container{font-family:Arial,sans-serif;position:fixed;top:0;left:0;background:linear-gradient(rgba(30,30,30,.9),#000 1810%);touch-action:pinch-zoom;z-index:1000000000;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}.fslightbox-container *{box-sizing:border-box}.fslightbox-svg-path{transition:fill .15s ease;fill:#ddd}.fslightbox-nav{height:45px;width:100%;position:absolute;top:0;left:0}.fslightbox-slide-number-container{display:flex;justify-content:center;align-items:center;position:relative;height:100%;font-size:15px;color:#d7d7d7;z-index:0;max-width:55px;text-align:left}.fslightbox-slide-number-container .fslightbox-flex-centered{height:100%}.fslightbox-slash{display:block;margin:0 5px;width:1px;height:12px;transform:rotate(15deg);background:#fff}.fslightbox-toolbar{position:absolute;z-index:3;right:0;top:0;height:100%;display:flex;background:rgba(35,35,35,.65)}.fslightbox-toolbar-button{height:100%;width:45px;cursor:pointer}.fslightbox-toolbar-button:hover .fslightbox-svg-path{fill:#fff}.fslightbox-slide-btn-container{display:flex;align-items:center;padding:12px 12px 12px 6px;position:absolute;top:50%;cursor:pointer;z-index:3;transform:translateY(-50%)}@media (min-width:476px){.fslightbox-slide-btn-container{padding:22px 22px 22px 6px}}@media (min-width:768px){.fslightbox-slide-btn-container{padding:30px 30px 30px 6px}}.fslightbox-slide-btn-container:hover .fslightbox-svg-path{fill:#f1f1f1}.fslightbox-slide-btn{padding:9px;font-size:26px;background:rgba(35,35,35,.65)}@media (min-width:768px){.fslightbox-slide-btn{padding:10px}}@media (min-width:1600px){.fslightbox-slide-btn{padding:11px}}.fslightbox-slide-btn-container-previous{left:0}@media (max-width:475.99px){.fslightbox-slide-btn-container-previous{padding-left:3px}}.fslightbox-slide-btn-container-next{right:0;padding-left:12px;padding-right:3px}@media (min-width:476px){.fslightbox-slide-btn-container-next{padding-left:22px}}@media (min-width:768px){.fslightbox-slide-btn-container-next{padding-left:30px}}@media (min-width:476px){.fslightbox-slide-btn-container-next{padding-right:6px}}.fslightbox-down-event-detector{position:absolute;z-index:1}.fslightbox-slide-swiping-hoverer{z-index:4}.fslightbox-invalid-file-wrapper{font-size:22px;color:#eaebeb;margin:auto}.fslightbox-video{object-fit:cover}.fslightbox-youtube-iframe{border:0}.fslightboxl{display:block;margin:auto;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:67px;height:67px}.fslightboxl div{box-sizing:border-box;display:block;position:absolute;width:54px;height:54px;margin:6px;border:5px solid;border-color:#999 transparent transparent transparent;border-radius:50%;animation:fslightboxl 1.2s cubic-bezier(.5,0,.5,1) infinite}.fslightboxl div:nth-child(1){animation-delay:-.45s}.fslightboxl div:nth-child(2){animation-delay:-.3s}.fslightboxl div:nth-child(3){animation-delay:-.15s}@keyframes fslightboxl{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}.fslightbox-source{position:relative;z-index:2;opacity:0}")),document.head.appendChild(o));function L(e){var t,n=e.props,o=0,i={};this.getSourceTypeFromLocalStorageByUrl=function(e){return t[e]?t[e]:r(e)},this.handleReceivedSourceTypeForUrl=function(e,n){if(!1===i[n]&&(o--,"invalid"!==e?i[n]=e:delete i[n],0===o)){!function(e,t){for(var n in t)e[n]=t[n]}(t,i);try{localStorage.setItem("fslightbox-types",JSON.stringify(t))}catch(e){}}};var r=function(e){o++,i[e]=!1};if(n.disableLocalStorage)this.getSourceTypeFromLocalStorageByUrl=function(){},this.handleReceivedSourceTypeForUrl=function(){};else{try{t=JSON.parse(localStorage.getItem("fslightbox-types"))}catch(e){}t||(t={},this.getSourceTypeFromLocalStorageByUrl=r)}}function A(e,t,n,o){var i=e.data,r=e.elements.sources,s=n/o,a=0;this.adjustSize=function(){if((a=i.maxSourceWidth/s)<i.maxSourceHeight)return n<i.maxSourceWidth&&(a=o),c();a=o>i.maxSourceHeight?i.maxSourceHeight:o,c()};var c=function(){r[t].style.width=a*s+"px",r[t].style.height=a+"px"}}function C(e,t){var n=this,o=e.collections.sourceSizers,i=e.elements,r=i.sourceAnimationWrappers,s=i.sources,a=e.isl,c=e.resolve;function l(e,n){o[t]=c(A,[t,e,n]),o[t].adjustSize()}this.runActions=function(e,o){a[t]=!0,s[t].classList.add(x),r[t].classList.add(g),r[t].removeChild(r[t].firstChild),l(e,o),n.runActions=l}}function E(e,t){var n,o=this,i=e.elements.sources,r=e.props,s=(0,e.resolve)(C,[t]);this.handleImageLoad=function(e){var t=e.target,n=t.naturalWidth,o=t.naturalHeight;s.runActions(n,o)},this.handleVideoLoad=function(e){var t=e.target,o=t.videoWidth,i=t.videoHeight;n=!0,s.runActions(o,i)},this.handleNotMetaDatedVideoLoad=function(){n||o.handleYoutubeLoad()},this.handleYoutubeLoad=function(){var e=1920,t=1080;r.maxYoutubeDimensions&&(e=r.maxYoutubeDimensions.width,t=r.maxYoutubeDimensions.height),s.runActions(e,t)},this.handleCustomLoad=function(){var e=i[t],n=e.offsetWidth,r=e.offsetHeight;n&&r?s.runActions(n,r):setTimeout(o.handleCustomLoad)}}function F(e,t,n){var o=e.elements.sources,i=e.props.customClasses,r=i[t]?i[t]:"";o[t].className=n+" "+r}function I(e,t){var n=e.elements.sources,o=e.props.customAttributes;for(var i in o[t])n[t].setAttribute(i,o[t][i])}function T(e,t){var n=e.collections.sourceLoadHandlers,o=e.elements,i=o.sources,r=o.sourceAnimationWrappers,s=e.props.sources;i[t]=document.createElement("img"),F(e,t,y),i[t].src=s[t],i[t].onload=n[t].handleImageLoad,I(e,t),r[t].appendChild(i[t])}function N(e,t){var n=e.collections.sourceLoadHandlers,o=e.elements,i=o.sources,r=o.sourceAnimationWrappers,s=e.props,a=s.sources,c=s.videosPosters;i[t]=document.createElement("video"),F(e,t,y),i[t].src=a[t],i[t].onloadedmetadata=function(e){n[t].handleVideoLoad(e)},i[t].controls=!0,I(e,t),c[t]&&(i[t].poster=c[t]);var l=document.createElement("source");l.src=a[t],i[t].appendChild(l),setTimeout(n[t].handleNotMetaDatedVideoLoad,3e3),r[t].appendChild(i[t])}function z(e,t){var n=e.collections.sourceLoadHandlers,o=e.elements,r=o.sources,s=o.sourceAnimationWrappers,a=e.props.sources;r[t]=document.createElement("iframe"),F(e,t,"".concat(y," ").concat(i,"youtube-iframe"));var c=a[t],l=c.split("?")[1];r[t].src="https://www.youtube.com/embed/".concat(c.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)[2],"?").concat(l||""),r[t].allowFullscreen=!0,I(e,t),s[t].appendChild(r[t]),n[t].handleYoutubeLoad()}function P(e,t){var n=e.collections.sourceLoadHandlers,o=e.elements,i=o.sources,r=o.sourceAnimationWrappers,s=e.props.sources;i[t]=s[t],F(e,t,"".concat(i[t].className," ").concat(y)),r[t].appendChild(i[t]),n[t].handleCustomLoad()}function k(e,t){var n=e.elements,o=n.sources,r=n.sourceAnimationWrappers;e.props.sources;o[t]=document.createElement("div"),o[t].className="".concat(i,"invalid-file-wrapper ").concat(c),o[t].innerHTML="Invalid source",r[t].classList.add(g),r[t].removeChild(r[t].firstChild),r[t].appendChild(o[t])}function H(e){var t=e.collections,n=t.sourceLoadHandlers,o=t.sourcesRenderFunctions,i=e.core.sourceDisplayFacade,r=e.resolve;this.runActionsForSourceTypeAndIndex=function(t,s){var a;switch("invalid"!==t&&(n[s]=r(E,[s])),t){case"image":a=T;break;case"video":a=N;break;case"youtube":a=z;break;case"custom":a=P;break;default:a=k}o[s]=function(){return a(e,s)},i.displaySourcesWhichShouldBeDisplayed()}}function W(){var e,t,n,o={isUrlYoutubeOne:function(e){var t=document.createElement("a");return t.href=e,"www.youtube.com"===t.hostname||"youtu.be"===t.hostname},getTypeFromResponseContentType:function(e){return e.slice(0,e.indexOf("/"))}};function i(){if(4!==n.readyState){if(2===n.readyState){var e;switch(o.getTypeFromResponseContentType(n.getResponseHeader("content-type"))){case"image":e="image";break;case"video":e="video";break;default:e="invalid"}n.onreadystatechange=null,n.abort(),t(e)}}else t("invalid")}this.setUrlToCheck=function(t){e=t},this.getSourceType=function(r){if(o.isUrlYoutubeOne(e))return r("youtube");t=r,(n=new XMLHttpRequest).onreadystatechange=i,n.open("GET",e,!0),n.send()}}function R(e,t,n){var o=e.props,i=o.types,r=o.type,s=o.sources,a=e.resolve;this.getTypeSetByClientForIndex=function(e){var t;return i&&i[e]?t=i[e]:r&&(t=r),t},this.retrieveTypeWithXhrForIndex=function(e){var o=a(W);o.setUrlToCheck(s[e]),o.getSourceType((function(o){t.handleReceivedSourceTypeForUrl(o,s[e]),n.runActionsForSourceTypeAndIndex(o,e)}))}}function D(e,t){var n=e.core.stageManager,o=e.elements,i=o.smw,r=o.sourceWrappersContainer,s=e.props,l=0,f=document.createElement("div");function p(e){f.style.transform="translateX(".concat(e+l,"px)"),l=0}function h(){return(1+s.slideDistance)*innerWidth}f.className="".concat(d," ").concat(a," ").concat(c),f.s=function(){f.style.display="flex"},f.h=function(){f.style.display="none"},f.a=function(){f.classList.add(u)},f.d=function(){f.classList.remove(u)},f.n=function(){f.style.removeProperty("transform")},f.v=function(e){return l=e,f},f.ne=function(){p(-h())},f.z=function(){p(0)},f.p=function(){p(h())},n.i(t)||f.h(),i[t]=f,r.appendChild(f),function(e,t){var n=e.elements,o=n.smw,i=n.sourceAnimationWrappers,r=document.createElement("div"),s=document.createElement("div");s.className="fslightboxl";for(var a=0;a<3;a++){var c=document.createElement("div");s.appendChild(c)}r.appendChild(s),o[t].appendChild(r),i[t]=r}(e,t)}function O(e,t,n,o){var r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttributeNS(null,"width",t),r.setAttributeNS(null,"height",t),r.setAttributeNS(null,"viewBox",n);var s=document.createElementNS("http://www.w3.org/2000/svg","path");return s.setAttributeNS(null,"class","".concat(i,"svg-path")),s.setAttributeNS(null,"d",o),r.appendChild(s),e.appendChild(r),r}function M(e,t){var n=document.createElement("div");return n.className="".concat(i,"toolbar-button ").concat(c),n.title=t,e.appendChild(n),n}function j(e,t){var n=document.createElement("div");n.className="".concat(i,"toolbar"),t.appendChild(n),function(e,t){var n=e.componentsServices,o=e.data,i=e.fs,r="M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z",s=M(t);s.title="Enter fullscreen";var a=O(s,"20px","0 0 18 18",r);n.ofs=function(){o.ifs=!0,s.title="Exit fullscreen",a.setAttributeNS(null,"width","24px"),a.setAttributeNS(null,"height","24px"),a.setAttributeNS(null,"viewBox","0 0 950 1024"),a.firstChild.setAttributeNS(null,"d","M682 342h128v84h-212v-212h84v128zM598 810v-212h212v84h-128v128h-84zM342 342v-128h84v212h-212v-84h128zM214 682v-84h212v212h-84v-128h-128z")},n.xfs=function(){o.ifs=!1,s.title="Enter fullscreen",a.setAttributeNS(null,"width","20px"),a.setAttributeNS(null,"height","20px"),a.setAttributeNS(null,"viewBox","0 0 18 18"),a.firstChild.setAttributeNS(null,"d",r)},s.onclick=i.t}(e,n),function(e,t){var n=M(t,"Close");n.onclick=e.core.lightboxCloser.closeLightbox,O(n,"20px","0 0 24 24","M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z")}(e,n)}function X(e){var t=e.props.sources,n=e.elements.container,o=document.createElement("div");o.className="".concat(i,"nav"),n.appendChild(o),j(e,o),t.length>1&&function(e,t){var n=e.componentsServices,o=e.props.sources,r=(e.stageIndexes,document.createElement("div"));r.className="".concat(i,"slide-number-container");var s=document.createElement("div");s.className=c;var a=document.createElement("span");n.setSlideNumber=function(e){return a.innerHTML=e};var l=document.createElement("span");l.className="".concat(i,"slash");var u=document.createElement("div");u.innerHTML=o.length,r.appendChild(s),s.appendChild(a),s.appendChild(l),s.appendChild(u),t.appendChild(r),setTimeout((function(){s.offsetWidth>55&&(r.style.justifyContent="flex-start")}))}(e,o)}function B(e,t,n,o){var i=e.elements.container,r=n.charAt(0).toUpperCase()+n.slice(1),s=document.createElement("div");s.className="".concat(p," ").concat(p,"-").concat(n),s.title="".concat(r," slide"),s.onclick=t,function(e,t){var n=document.createElement("div");n.className="".concat(f," ").concat(c),O(n,"20px","0 0 20 20",t),e.appendChild(n)}(s,o),i.appendChild(s)}function U(e){var t=e.core,n=t.lightboxCloser,o=t.slideChangeFacade,i=e.fs;this.listener=function(e){switch(e.key){case"Escape":n.closeLightbox();break;case"ArrowLeft":o.changeToPrevious();break;case"ArrowRight":o.changeToNext();break;case"F11":e.preventDefault(),i.t()}}}function q(e){var t=e.elements,n=e.sourcePointerProps,o=e.stageIndexes;function i(e,o){t.smw[e].v(n.swipedX)[o]()}this.runActionsForEvent=function(e){var r,a,c;t.container.contains(t.slideSwipingHoverer)||t.container.appendChild(t.slideSwipingHoverer),r=t.container,a=s,(c=r.classList).contains(a)||c.add(a),n.swipedX=e.screenX-n.downScreenX;var l=o.previous,u=o.next;i(o.current,"z"),void 0!==l&&n.swipedX>0?i(l,"ne"):void 0!==u&&n.swipedX<0&&i(u,"p")}}function V(e){var t=e.props.sources,n=e.resolve,o=e.sourcePointerProps,i=n(q);1===t.length?this.listener=function(){o.swipedX=1}:this.listener=function(e){o.isPointering&&i.runActionsForEvent(e)}}function _(e){var t=e.core.slideIndexChanger,n=e.elements.smw,o=e.stageIndexes,i=e.sws;function r(e){var t=n[o.current];t.a(),t[e]()}function s(e,t){void 0!==e&&(n[e].s(),n[e][t]())}this.runPositiveSwipedXActions=function(){var e=o.previous;if(void 0===e)r("z");else{r("p");var n=o.next;t.changeTo(e);var a=o.previous;i.d(a),i.b(n),r("z"),s(a,"ne")}},this.runNegativeSwipedXActions=function(){var e=o.next;if(void 0===e)r("z");else{r("ne");var n=o.previous;t.changeTo(e);var a=o.next;i.d(a),i.b(n),r("z"),s(a,"p")}}}function Y(e,t){e.contains(t)&&e.removeChild(t)}function J(e){var t=e.core.lightboxCloser,n=e.elements,o=e.resolve,i=e.sourcePointerProps,r=o(_);this.runNoSwipeActions=function(){Y(n.container,n.slideSwipingHoverer),i.isSourceDownEventTarget||t.closeLightbox(),i.isPointering=!1},this.runActions=function(){i.swipedX>0?r.runPositiveSwipedXActions():r.runNegativeSwipedXActions(),Y(n.container,n.slideSwipingHoverer),n.container.classList.remove(s),i.isPointering=!1}}function G(e){var t=e.resolve,n=e.sourcePointerProps,o=t(J);this.listener=function(){n.isPointering&&(n.swipedX?o.runActions():o.runNoSwipeActions())}}function $(e){var t=this,n=e.core,o=n.eventsDispatcher,i=n.globalEventsController,r=n.scrollbarRecompensor,s=e.data,a=e.elements,c=e.fs,u=e.props,d=e.sourcePointerProps;this.isLightboxFadingOut=!1,this.runActions=function(){t.isLightboxFadingOut=!0,a.container.classList.add(v),i.removeListeners(),u.exitFullscreenOnClose&&s.ifs&&c.x(),setTimeout((function(){t.isLightboxFadingOut=!1,d.isPointering=!1,a.container.classList.remove(v),document.documentElement.classList.remove(l),r.removeRecompense(),document.body.removeChild(a.container),o.dispatch("onClose")}),270)}}function K(e,t){var n=e.classList;n.contains(t)&&n.remove(t)}function Q(e){var t,n,o;n=(t=e).core.eventsDispatcher,o=t.props,n.dispatch=function(e){o[e]&&o[e]()},function(e){var t=e.componentsServices,n=e.data,o=e.fs,i=["fullscreenchange","webkitfullscreenchange","mozfullscreenchange","MSFullscreenChange"];function r(e){for(var t=0;t<i.length;t++)document[e](i[t],s)}function s(){document.fullscreenElement||document.webkitIsFullScreen||document.mozFullScreen||document.msFullscreenElement?t.ofs():t.xfs()}o.o=function(){t.ofs();var e=document.documentElement;e.requestFullscreen?e.requestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.msRequestFullscreen&&e.msRequestFullscreen()},o.x=function(){t.xfs(),document.exitFullscreen?document.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.msExitFullscreen&&document.msExitFullscreen()},o.t=function(){n.ifs?o.x():o.o()},o.l=function(){r("addEventListener")},o.q=function(){r("removeEventListener")}}(e),function(e){var t=e.core,n=t.globalEventsController,o=t.windowResizeActioner,i=e.fs,r=e.resolve,s=r(U),a=r(V),c=r(G);n.attachListeners=function(){document.addEventListener("pointermove",a.listener),document.addEventListener("pointerup",c.listener),addEventListener("resize",o.runActions),document.addEventListener("keydown",s.listener),i.l()},n.removeListeners=function(){document.removeEventListener("pointermove",a.listener),document.removeEventListener("pointerup",c.listener),removeEventListener("resize",o.runActions),document.removeEventListener("keydown",s.listener),i.q()}}(e),function(e){var t=e.core.lightboxCloser,n=(0,e.resolve)($);t.closeLightbox=function(){n.isLightboxFadingOut||n.runActions()}}(e),function(e){var t=e.data,n=e.core.scrollbarRecompensor;function o(){document.body.offsetHeight>innerHeight&&(document.body.style.marginRight=t.scrollbarWidth+"px")}n.addRecompense=function(){"complete"===document.readyState?o():addEventListener("load",(function(){o(),n.addRecompense=o}))},n.removeRecompense=function(){document.body.style.removeProperty("margin-right")}}(e),function(e){var t=e.core,n=t.slideChangeFacade,o=t.slideIndexChanger,i=t.stageManager;e.props.sources.length>1?(n.changeToPrevious=function(){o.jumpTo(i.getPreviousSlideIndex())},n.changeToNext=function(){o.jumpTo(i.getNextSlideIndex())}):(n.changeToPrevious=function(){},n.changeToNext=function(){})}(e),function(e){var t=e.componentsServices,n=e.core,o=n.slideIndexChanger,i=n.sourceDisplayFacade,r=n.stageManager,s=e.elements,a=s.smw,c=s.sourceAnimationWrappers,l=e.isl,u=e.stageIndexes,d=e.sws;o.changeTo=function(e){u.current=e,r.updateStageIndexes(),t.setSlideNumber(e+1),i.displaySourcesWhichShouldBeDisplayed()},o.jumpTo=function(e){var t=u.previous,n=u.current,i=u.next,s=l[n],f=l[e];o.changeTo(e);for(var p=0;p<a.length;p++)a[p].d();d.d(n),d.c(),requestAnimationFrame((function(){requestAnimationFrame((function(){var e=u.previous,o=u.next;function p(){r.i(n)?n===u.previous?a[n].ne():n===u.next&&a[n].p():(a[n].h(),a[n].n())}s&&c[n].classList.add(m),f&&c[u.current].classList.add(h),d.a(),void 0!==e&&e!==n&&a[e].ne(),a[u.current].n(),void 0!==o&&o!==n&&a[o].p(),d.b(t),d.b(i),l[n]?setTimeout(p,260):p()}))}))}}(e),function(e){var t=e.core.sourcesPointerDown,n=e.elements,o=n.smw,i=n.sources,r=e.sourcePointerProps,s=e.stageIndexes;t.listener=function(e){"VIDEO"!==e.target.tagName&&e.preventDefault(),r.isPointering=!0,r.downScreenX=e.screenX,r.swipedX=0;var t=i[s.current];t&&t.contains(e.target)?r.isSourceDownEventTarget=!0:r.isSourceDownEventTarget=!1;for(var n=0;n<o.length;n++)o[n].d()}}(e),function(e){var t=e.collections.sourcesRenderFunctions,n=e.core.sourceDisplayFacade,o=e.props,i=e.stageIndexes;function r(e){t[e]&&(t[e](),delete t[e])}n.displaySourcesWhichShouldBeDisplayed=function(){if(o.loadOnlyCurrentSource)r(i.current);else for(var e in i)r(i[e])}}(e),function(e){var t=e.core.stageManager,n=e.elements,o=n.smw,i=n.sourceAnimationWrappers,r=e.isl,s=e.stageIndexes,a=e.sws;a.a=function(){for(var e in s)o[s[e]].s()},a.b=function(e){void 0===e||t.i(e)||(o[e].h(),o[e].n())},a.c=function(){for(var e in s)a.d(s[e])},a.d=function(e){if(r[e]){var t=i[e];K(t,g),K(t,h),K(t,m)}}}(e),function(e){var t=e.collections.sourceSizers,n=e.core.windowResizeActioner,o=e.data,i=e.elements.smw,r=e.stageIndexes;n.runActions=function(){innerWidth<992?o.maxSourceWidth=innerWidth:o.maxSourceWidth=.9*innerWidth,o.maxSourceHeight=.9*innerHeight;for(var e=0;e<i.length;e++)i[e].d(),t[e]&&t[e].adjustSize();var n=r.previous,s=r.next;void 0!==n&&i[n].ne(),void 0!==s&&i[s].p()}}(e)}function Z(e){var t=e.componentsServices,n=e.core,o=n.eventsDispatcher,r=n.globalEventsController,s=n.scrollbarRecompensor,c=n.sourceDisplayFacade,u=n.stageManager,f=n.windowResizeActioner,p=e.data,h=e.elements,m=(e.props,e.stageIndexes),v=e.sws;function b(){var t,n;p.i=!0,p.scrollbarWidth=function(){var e=document.createElement("div"),t=e.style,n=document.createElement("div");t.visibility="hidden",t.width="100px",t.msOverflowStyle="scrollbar",t.overflow="scroll",n.style.width="100%",document.body.appendChild(e);var o=e.offsetWidth;e.appendChild(n);var i=n.offsetWidth;return document.body.removeChild(e),o-i}(),Q(e),h.container=document.createElement("div"),h.container.className="".concat(i,"container ").concat(a," ").concat(g),function(e){var t=e.elements;t.slideSwipingHoverer=document.createElement("div"),t.slideSwipingHoverer.className="".concat(i,"slide-swiping-hoverer ").concat(a," ").concat(d)}(e),X(e),function(e){var t=e.core.sourcesPointerDown,n=e.elements,o=e.props.sources,i=document.createElement("div");i.className="".concat(d," ").concat(a),n.container.appendChild(i),i.addEventListener("pointerdown",t.listener),n.sourceWrappersContainer=i;for(var r=0;r<o.length;r++)D(e,r)}(e),e.props.sources.length>1&&(n=(t=e).core.slideChangeFacade,B(t,n.changeToPrevious,"previous","M18.271,9.212H3.615l4.184-4.184c0.306-0.306,0.306-0.801,0-1.107c-0.306-0.306-0.801-0.306-1.107,0L1.21,9.403C1.194,9.417,1.174,9.421,1.158,9.437c-0.181,0.181-0.242,0.425-0.209,0.66c0.005,0.038,0.012,0.071,0.022,0.109c0.028,0.098,0.075,0.188,0.142,0.271c0.021,0.026,0.021,0.061,0.045,0.085c0.015,0.016,0.034,0.02,0.05,0.033l5.484,5.483c0.306,0.307,0.801,0.307,1.107,0c0.306-0.305,0.306-0.801,0-1.105l-4.184-4.185h14.656c0.436,0,0.788-0.353,0.788-0.788S18.707,9.212,18.271,9.212z"),B(t,n.changeToNext,"next","M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788S1.293,9.212,1.729,9.212z")),function(e){for(var t=e.props.sources,n=e.resolve,o=n(L),i=n(H),r=n(R,[o,i]),s=0;s<t.length;s++)if("string"==typeof t[s]){var a=r.getTypeSetByClientForIndex(s);if(a)i.runActionsForSourceTypeAndIndex(a,s);else{var c=o.getSourceTypeFromLocalStorageByUrl(t[s]);c?i.runActionsForSourceTypeAndIndex(c,s):r.retrieveTypeWithXhrForIndex(s)}}else i.runActionsForSourceTypeAndIndex("custom",s)}(e),o.dispatch("onInit")}e.open=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,i=m.previous,a=m.current,d=m.next;m.current=n,p.i||S(e),u.updateStageIndexes(),p.i?(v.c(),v.a(),v.b(i),v.b(a),v.b(d),o.dispatch("onShow")):b(),c.displaySourcesWhichShouldBeDisplayed(),t.setSlideNumber(n+1),document.body.appendChild(h.container),document.documentElement.classList.add(l),s.addRecompense(),r.attachListeners(),f.runActions(),h.smw[m.current].n(),o.dispatch("onOpen")}}function ee(e,t,n){return(ee=te()?Reflect.construct.bind():function(e,t,n){var o=[null];o.push.apply(o,t);var i=new(Function.bind.apply(e,o));return n&&ne(i,n.prototype),i}).apply(null,arguments)}function te(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}function ne(e,t){return(ne=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function oe(e){return function(e){if(Array.isArray(e))return ie(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return ie(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return ie(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ie(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}function re(){for(var e=document.getElementsByTagName("a"),t=function(t){if(!e[t].hasAttribute("data-fslightbox"))return"continue";var n=e[t].hasAttribute("data-href")?e[t].getAttribute("data-href"):e[t].getAttribute("href");if(!n)return console.warn('The "data-fslightbox" attribute was set without the "href" attribute.'),"continue";var o=e[t].getAttribute("data-fslightbox");fsLightboxInstances[o]||(fsLightboxInstances[o]=new FsLightbox);var i=null;"#"===n.charAt(0)?(i=document.getElementById(n.substring(1)).cloneNode(!0)).removeAttribute("id"):i=n,fsLightboxInstances[o].props.sources.push(i),fsLightboxInstances[o].elements.a.push(e[t]);var r=fsLightboxInstances[o].props.sources.length-1;e[t].onclick=function(e){e.preventDefault(),fsLightboxInstances[o].open(r)},d("types","data-type"),d("videosPosters","data-video-poster"),d("customClasses","data-class"),d("customClasses","data-custom-class");for(var s=["href","data-fslightbox","data-href","data-type","data-video-poster","data-class","data-custom-class"],a=e[t].attributes,c=fsLightboxInstances[o].props.customAttributes,l=0;l<a.length;l++)if(-1===s.indexOf(a[l].name)&&"data-"===a[l].name.substr(0,5)){c[r]||(c[r]={});var u=a[l].name.substr(5);c[r][u]=a[l].value}function d(n,i){e[t].hasAttribute(i)&&(fsLightboxInstances[o].props[n][r]=e[t].getAttribute(i))}},n=0;n<e.length;n++)t(n);var o=Object.keys(fsLightboxInstances);window.fsLightbox=fsLightboxInstances[o[o.length-1]]}window.FsLightbox=function(){var e=this;this.props={sources:[],customAttributes:[],customClasses:[],types:[],videosPosters:[],slideDistance:.3},this.data={isFullscreenOpen:!1,maxSourceWidth:0,maxSourceHeight:0,scrollbarWidth:0},this.isl=[],this.sourcePointerProps={downScreenX:null,isPointering:!1,isSourceDownEventTarget:!1,swipedX:0},this.stageIndexes={},this.elements={a:[],container:null,slideSwipingHoverer:null,smw:[],sourceWrappersContainer:null,sources:[],sourceAnimationWrappers:[]},this.componentsServices={setSlideNumber:function(){}},this.resolve=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return n.unshift(e),ee(t,oe(n))},this.collections={sourceLoadHandlers:[],sourcesRenderFunctions:[],sourceSizers:[]},this.core={eventsDispatcher:{},globalEventsController:{},lightboxCloser:{},lightboxUpdater:{},scrollbarRecompensor:{},slideChangeFacade:{},slideIndexChanger:{},sourcesPointerDown:{},sourceDisplayFacade:{},stageManager:{},windowResizeActioner:{}},this.fs={},this.sws={},Z(this),this.close=function(){return e.core.lightboxCloser.closeLightbox()}},window.fsLightboxInstances={},re(),window.refreshFsLightbox=function(){for(var e in fsLightboxInstances){var t=fsLightboxInstances[e].props;fsLightboxInstances[e]=new FsLightbox,fsLightboxInstances[e].props=t,fsLightboxInstances[e].props.sources=[],fsLightboxInstances[e].elements.a=[]}re()}}])}));

/***/ }),

/***/ "./node_modules/get-size/get-size.js":
/*!*******************************************!*\
  !*** ./node_modules/get-size/get-size.js ***!
  \*******************************************/
/***/ ((module) => {

/*!
 * Infinite Scroll v2.0.4
 * measure size of elements
 * MIT license
 */

( function( window, factory ) {
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.getSize = factory();
  }

} )( window, function factory() {

// -------------------------- helpers -------------------------- //

// get a number from a string, not a percentage
function getStyleSize( value ) {
  let num = parseFloat( value );
  // not a percent like '100%', and a number
  let isValid = value.indexOf('%') == -1 && !isNaN( num );
  return isValid && num;
}

// -------------------------- measurements -------------------------- //

let measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth',
];

let measurementsLength = measurements.length;

function getZeroSize() {
  let size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0,
  };
  measurements.forEach( ( measurement ) => {
    size[ measurement ] = 0;
  } );
  return size;
}

// -------------------------- getSize -------------------------- //

function getSize( elem ) {
  // use querySeletor if elem is string
  if ( typeof elem == 'string' ) elem = document.querySelector( elem );

  // do not proceed on non-objects
  let isElement = elem && typeof elem == 'object' && elem.nodeType;
  if ( !isElement ) return;

  let style = getComputedStyle( elem );

  // if hidden, everything is 0
  if ( style.display == 'none' ) return getZeroSize();

  let size = {};
  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;

  let isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

  // get all measurements
  measurements.forEach( ( measurement ) => {
    let value = style[ measurement ];
    let num = parseFloat( value );
    // any 'auto', 'medium' value will be 0
    size[ measurement ] = !isNaN( num ) ? num : 0;
  } );

  let paddingWidth = size.paddingLeft + size.paddingRight;
  let paddingHeight = size.paddingTop + size.paddingBottom;
  let marginWidth = size.marginLeft + size.marginRight;
  let marginHeight = size.marginTop + size.marginBottom;
  let borderWidth = size.borderLeftWidth + size.borderRightWidth;
  let borderHeight = size.borderTopWidth + size.borderBottomWidth;

  // overwrite width and height if we can get it from style
  let styleWidth = getStyleSize( style.width );
  if ( styleWidth !== false ) {
    size.width = styleWidth +
      // add padding and border unless it's already including it
      ( isBorderBox ? 0 : paddingWidth + borderWidth );
  }

  let styleHeight = getStyleSize( style.height );
  if ( styleHeight !== false ) {
    size.height = styleHeight +
      // add padding and border unless it's already including it
      ( isBorderBox ? 0 : paddingHeight + borderHeight );
  }

  size.innerWidth = size.width - ( paddingWidth + borderWidth );
  size.innerHeight = size.height - ( paddingHeight + borderHeight );

  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;

  return size;
}

return getSize;

} );


/***/ }),

/***/ "./node_modules/html-entities/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/html-entities/lib/index.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var named_references_1 = __webpack_require__(/*! ./named-references */ "./node_modules/html-entities/lib/named-references.js");
var numeric_unicode_map_1 = __webpack_require__(/*! ./numeric-unicode-map */ "./node_modules/html-entities/lib/numeric-unicode-map.js");
var surrogate_pairs_1 = __webpack_require__(/*! ./surrogate-pairs */ "./node_modules/html-entities/lib/surrogate-pairs.js");
var allNamedReferences = __assign(__assign({}, named_references_1.namedReferences), { all: named_references_1.namedReferences.html5 });
var encodeRegExps = {
    specialChars: /[<>'"&]/g,
    nonAscii: /[<>'"&\u0080-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g,
    nonAsciiPrintable: /[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g,
    nonAsciiPrintableOnly: /[\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g,
    extensive: /[\x01-\x0c\x0e-\x1f\x21-\x2c\x2e-\x2f\x3a-\x40\x5b-\x60\x7b-\x7d\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g
};
var defaultEncodeOptions = {
    mode: 'specialChars',
    level: 'all',
    numeric: 'decimal'
};
/** Encodes all the necessary (specified by `level`) characters in the text */
function encode(text, _a) {
    var _b = _a === void 0 ? defaultEncodeOptions : _a, _c = _b.mode, mode = _c === void 0 ? 'specialChars' : _c, _d = _b.numeric, numeric = _d === void 0 ? 'decimal' : _d, _e = _b.level, level = _e === void 0 ? 'all' : _e;
    if (!text) {
        return '';
    }
    var encodeRegExp = encodeRegExps[mode];
    var references = allNamedReferences[level].characters;
    var isHex = numeric === 'hexadecimal';
    encodeRegExp.lastIndex = 0;
    var _b = encodeRegExp.exec(text);
    var _c;
    if (_b) {
        _c = '';
        var _d = 0;
        do {
            if (_d !== _b.index) {
                _c += text.substring(_d, _b.index);
            }
            var _e = _b[0];
            var result_1 = references[_e];
            if (!result_1) {
                var code_1 = _e.length > 1 ? surrogate_pairs_1.getCodePoint(_e, 0) : _e.charCodeAt(0);
                result_1 = (isHex ? '&#x' + code_1.toString(16) : '&#' + code_1) + ';';
            }
            _c += result_1;
            _d = _b.index + _e.length;
        } while ((_b = encodeRegExp.exec(text)));
        if (_d !== text.length) {
            _c += text.substring(_d);
        }
    }
    else {
        _c =
            text;
    }
    return _c;
}
exports.encode = encode;
var defaultDecodeOptions = {
    scope: 'body',
    level: 'all'
};
var strict = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g;
var attribute = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g;
var baseDecodeRegExps = {
    xml: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.xml
    },
    html4: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.html4
    },
    html5: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.html5
    }
};
var decodeRegExps = __assign(__assign({}, baseDecodeRegExps), { all: baseDecodeRegExps.html5 });
var fromCharCode = String.fromCharCode;
var outOfBoundsChar = fromCharCode(65533);
var defaultDecodeEntityOptions = {
    level: 'all'
};
/** Decodes a single entity */
function decodeEntity(entity, _a) {
    var _b = (_a === void 0 ? defaultDecodeEntityOptions : _a).level, level = _b === void 0 ? 'all' : _b;
    if (!entity) {
        return '';
    }
    var _b = entity;
    var decodeEntityLastChar_1 = entity[entity.length - 1];
    if (false) {}
    else if (false) {}
    else {
        var decodeResultByReference_1 = allNamedReferences[level].entities[entity];
        if (decodeResultByReference_1) {
            _b = decodeResultByReference_1;
        }
        else if (entity[0] === '&' && entity[1] === '#') {
            var decodeSecondChar_1 = entity[2];
            var decodeCode_1 = decodeSecondChar_1 == 'x' || decodeSecondChar_1 == 'X'
                ? parseInt(entity.substr(3), 16)
                : parseInt(entity.substr(2));
            _b =
                decodeCode_1 >= 0x10ffff
                    ? outOfBoundsChar
                    : decodeCode_1 > 65535
                        ? surrogate_pairs_1.fromCodePoint(decodeCode_1)
                        : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_1] || decodeCode_1);
        }
    }
    return _b;
}
exports.decodeEntity = decodeEntity;
/** Decodes all entities in the text */
function decode(text, _a) {
    var decodeSecondChar_1 = _a === void 0 ? defaultDecodeOptions : _a, decodeCode_1 = decodeSecondChar_1.level, level = decodeCode_1 === void 0 ? 'all' : decodeCode_1, _b = decodeSecondChar_1.scope, scope = _b === void 0 ? level === 'xml' ? 'strict' : 'body' : _b;
    if (!text) {
        return '';
    }
    var decodeRegExp = decodeRegExps[level][scope];
    var references = allNamedReferences[level].entities;
    var isAttribute = scope === 'attribute';
    var isStrict = scope === 'strict';
    decodeRegExp.lastIndex = 0;
    var replaceMatch_1 = decodeRegExp.exec(text);
    var replaceResult_1;
    if (replaceMatch_1) {
        replaceResult_1 = '';
        var replaceLastIndex_1 = 0;
        do {
            if (replaceLastIndex_1 !== replaceMatch_1.index) {
                replaceResult_1 += text.substring(replaceLastIndex_1, replaceMatch_1.index);
            }
            var replaceInput_1 = replaceMatch_1[0];
            var decodeResult_1 = replaceInput_1;
            var decodeEntityLastChar_2 = replaceInput_1[replaceInput_1.length - 1];
            if (isAttribute
                && decodeEntityLastChar_2 === '=') {
                decodeResult_1 = replaceInput_1;
            }
            else if (isStrict
                && decodeEntityLastChar_2 !== ';') {
                decodeResult_1 = replaceInput_1;
            }
            else {
                var decodeResultByReference_2 = references[replaceInput_1];
                if (decodeResultByReference_2) {
                    decodeResult_1 = decodeResultByReference_2;
                }
                else if (replaceInput_1[0] === '&' && replaceInput_1[1] === '#') {
                    var decodeSecondChar_2 = replaceInput_1[2];
                    var decodeCode_2 = decodeSecondChar_2 == 'x' || decodeSecondChar_2 == 'X'
                        ? parseInt(replaceInput_1.substr(3), 16)
                        : parseInt(replaceInput_1.substr(2));
                    decodeResult_1 =
                        decodeCode_2 >= 0x10ffff
                            ? outOfBoundsChar
                            : decodeCode_2 > 65535
                                ? surrogate_pairs_1.fromCodePoint(decodeCode_2)
                                : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_2] || decodeCode_2);
                }
            }
            replaceResult_1 += decodeResult_1;
            replaceLastIndex_1 = replaceMatch_1.index + replaceInput_1.length;
        } while ((replaceMatch_1 = decodeRegExp.exec(text)));
        if (replaceLastIndex_1 !== text.length) {
            replaceResult_1 += text.substring(replaceLastIndex_1);
        }
    }
    else {
        replaceResult_1 =
            text;
    }
    return replaceResult_1;
}
exports.decode = decode;


/***/ }),

/***/ "./node_modules/html-entities/lib/named-references.js":
/*!************************************************************!*\
  !*** ./node_modules/html-entities/lib/named-references.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.bodyRegExps={xml:/&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,html4:/&notin;|&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,html5:/&centerdot;|&copysr;|&divideontimes;|&gtcc;|&gtcir;|&gtdot;|&gtlPar;|&gtquest;|&gtrapprox;|&gtrarr;|&gtrdot;|&gtreqless;|&gtreqqless;|&gtrless;|&gtrsim;|&ltcc;|&ltcir;|&ltdot;|&lthree;|&ltimes;|&ltlarr;|&ltquest;|&ltrPar;|&ltri;|&ltrie;|&ltrif;|&notin;|&notinE;|&notindot;|&notinva;|&notinvb;|&notinvc;|&notni;|&notniva;|&notnivb;|&notnivc;|&parallel;|&timesb;|&timesbar;|&timesd;|&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g};exports.namedReferences={xml:{entities:{"&lt;":"<","&gt;":">","&quot;":'"',"&apos;":"'","&amp;":"&"},characters:{"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;","&":"&amp;"}},html4:{entities:{"&apos;":"'","&nbsp":" ","&nbsp;":" ","&iexcl":"¡","&iexcl;":"¡","&cent":"¢","&cent;":"¢","&pound":"£","&pound;":"£","&curren":"¤","&curren;":"¤","&yen":"¥","&yen;":"¥","&brvbar":"¦","&brvbar;":"¦","&sect":"§","&sect;":"§","&uml":"¨","&uml;":"¨","&copy":"©","&copy;":"©","&ordf":"ª","&ordf;":"ª","&laquo":"«","&laquo;":"«","&not":"¬","&not;":"¬","&shy":"­","&shy;":"­","&reg":"®","&reg;":"®","&macr":"¯","&macr;":"¯","&deg":"°","&deg;":"°","&plusmn":"±","&plusmn;":"±","&sup2":"²","&sup2;":"²","&sup3":"³","&sup3;":"³","&acute":"´","&acute;":"´","&micro":"µ","&micro;":"µ","&para":"¶","&para;":"¶","&middot":"·","&middot;":"·","&cedil":"¸","&cedil;":"¸","&sup1":"¹","&sup1;":"¹","&ordm":"º","&ordm;":"º","&raquo":"»","&raquo;":"»","&frac14":"¼","&frac14;":"¼","&frac12":"½","&frac12;":"½","&frac34":"¾","&frac34;":"¾","&iquest":"¿","&iquest;":"¿","&Agrave":"À","&Agrave;":"À","&Aacute":"Á","&Aacute;":"Á","&Acirc":"Â","&Acirc;":"Â","&Atilde":"Ã","&Atilde;":"Ã","&Auml":"Ä","&Auml;":"Ä","&Aring":"Å","&Aring;":"Å","&AElig":"Æ","&AElig;":"Æ","&Ccedil":"Ç","&Ccedil;":"Ç","&Egrave":"È","&Egrave;":"È","&Eacute":"É","&Eacute;":"É","&Ecirc":"Ê","&Ecirc;":"Ê","&Euml":"Ë","&Euml;":"Ë","&Igrave":"Ì","&Igrave;":"Ì","&Iacute":"Í","&Iacute;":"Í","&Icirc":"Î","&Icirc;":"Î","&Iuml":"Ï","&Iuml;":"Ï","&ETH":"Ð","&ETH;":"Ð","&Ntilde":"Ñ","&Ntilde;":"Ñ","&Ograve":"Ò","&Ograve;":"Ò","&Oacute":"Ó","&Oacute;":"Ó","&Ocirc":"Ô","&Ocirc;":"Ô","&Otilde":"Õ","&Otilde;":"Õ","&Ouml":"Ö","&Ouml;":"Ö","&times":"×","&times;":"×","&Oslash":"Ø","&Oslash;":"Ø","&Ugrave":"Ù","&Ugrave;":"Ù","&Uacute":"Ú","&Uacute;":"Ú","&Ucirc":"Û","&Ucirc;":"Û","&Uuml":"Ü","&Uuml;":"Ü","&Yacute":"Ý","&Yacute;":"Ý","&THORN":"Þ","&THORN;":"Þ","&szlig":"ß","&szlig;":"ß","&agrave":"à","&agrave;":"à","&aacute":"á","&aacute;":"á","&acirc":"â","&acirc;":"â","&atilde":"ã","&atilde;":"ã","&auml":"ä","&auml;":"ä","&aring":"å","&aring;":"å","&aelig":"æ","&aelig;":"æ","&ccedil":"ç","&ccedil;":"ç","&egrave":"è","&egrave;":"è","&eacute":"é","&eacute;":"é","&ecirc":"ê","&ecirc;":"ê","&euml":"ë","&euml;":"ë","&igrave":"ì","&igrave;":"ì","&iacute":"í","&iacute;":"í","&icirc":"î","&icirc;":"î","&iuml":"ï","&iuml;":"ï","&eth":"ð","&eth;":"ð","&ntilde":"ñ","&ntilde;":"ñ","&ograve":"ò","&ograve;":"ò","&oacute":"ó","&oacute;":"ó","&ocirc":"ô","&ocirc;":"ô","&otilde":"õ","&otilde;":"õ","&ouml":"ö","&ouml;":"ö","&divide":"÷","&divide;":"÷","&oslash":"ø","&oslash;":"ø","&ugrave":"ù","&ugrave;":"ù","&uacute":"ú","&uacute;":"ú","&ucirc":"û","&ucirc;":"û","&uuml":"ü","&uuml;":"ü","&yacute":"ý","&yacute;":"ý","&thorn":"þ","&thorn;":"þ","&yuml":"ÿ","&yuml;":"ÿ","&quot":'"',"&quot;":'"',"&amp":"&","&amp;":"&","&lt":"<","&lt;":"<","&gt":">","&gt;":">","&OElig;":"Œ","&oelig;":"œ","&Scaron;":"Š","&scaron;":"š","&Yuml;":"Ÿ","&circ;":"ˆ","&tilde;":"˜","&ensp;":" ","&emsp;":" ","&thinsp;":" ","&zwnj;":"‌","&zwj;":"‍","&lrm;":"‎","&rlm;":"‏","&ndash;":"–","&mdash;":"—","&lsquo;":"‘","&rsquo;":"’","&sbquo;":"‚","&ldquo;":"“","&rdquo;":"”","&bdquo;":"„","&dagger;":"†","&Dagger;":"‡","&permil;":"‰","&lsaquo;":"‹","&rsaquo;":"›","&euro;":"€","&fnof;":"ƒ","&Alpha;":"Α","&Beta;":"Β","&Gamma;":"Γ","&Delta;":"Δ","&Epsilon;":"Ε","&Zeta;":"Ζ","&Eta;":"Η","&Theta;":"Θ","&Iota;":"Ι","&Kappa;":"Κ","&Lambda;":"Λ","&Mu;":"Μ","&Nu;":"Ν","&Xi;":"Ξ","&Omicron;":"Ο","&Pi;":"Π","&Rho;":"Ρ","&Sigma;":"Σ","&Tau;":"Τ","&Upsilon;":"Υ","&Phi;":"Φ","&Chi;":"Χ","&Psi;":"Ψ","&Omega;":"Ω","&alpha;":"α","&beta;":"β","&gamma;":"γ","&delta;":"δ","&epsilon;":"ε","&zeta;":"ζ","&eta;":"η","&theta;":"θ","&iota;":"ι","&kappa;":"κ","&lambda;":"λ","&mu;":"μ","&nu;":"ν","&xi;":"ξ","&omicron;":"ο","&pi;":"π","&rho;":"ρ","&sigmaf;":"ς","&sigma;":"σ","&tau;":"τ","&upsilon;":"υ","&phi;":"φ","&chi;":"χ","&psi;":"ψ","&omega;":"ω","&thetasym;":"ϑ","&upsih;":"ϒ","&piv;":"ϖ","&bull;":"•","&hellip;":"…","&prime;":"′","&Prime;":"″","&oline;":"‾","&frasl;":"⁄","&weierp;":"℘","&image;":"ℑ","&real;":"ℜ","&trade;":"™","&alefsym;":"ℵ","&larr;":"←","&uarr;":"↑","&rarr;":"→","&darr;":"↓","&harr;":"↔","&crarr;":"↵","&lArr;":"⇐","&uArr;":"⇑","&rArr;":"⇒","&dArr;":"⇓","&hArr;":"⇔","&forall;":"∀","&part;":"∂","&exist;":"∃","&empty;":"∅","&nabla;":"∇","&isin;":"∈","&notin;":"∉","&ni;":"∋","&prod;":"∏","&sum;":"∑","&minus;":"−","&lowast;":"∗","&radic;":"√","&prop;":"∝","&infin;":"∞","&ang;":"∠","&and;":"∧","&or;":"∨","&cap;":"∩","&cup;":"∪","&int;":"∫","&there4;":"∴","&sim;":"∼","&cong;":"≅","&asymp;":"≈","&ne;":"≠","&equiv;":"≡","&le;":"≤","&ge;":"≥","&sub;":"⊂","&sup;":"⊃","&nsub;":"⊄","&sube;":"⊆","&supe;":"⊇","&oplus;":"⊕","&otimes;":"⊗","&perp;":"⊥","&sdot;":"⋅","&lceil;":"⌈","&rceil;":"⌉","&lfloor;":"⌊","&rfloor;":"⌋","&lang;":"〈","&rang;":"〉","&loz;":"◊","&spades;":"♠","&clubs;":"♣","&hearts;":"♥","&diams;":"♦"},characters:{"'":"&apos;"," ":"&nbsp;","¡":"&iexcl;","¢":"&cent;","£":"&pound;","¤":"&curren;","¥":"&yen;","¦":"&brvbar;","§":"&sect;","¨":"&uml;","©":"&copy;","ª":"&ordf;","«":"&laquo;","¬":"&not;","­":"&shy;","®":"&reg;","¯":"&macr;","°":"&deg;","±":"&plusmn;","²":"&sup2;","³":"&sup3;","´":"&acute;","µ":"&micro;","¶":"&para;","·":"&middot;","¸":"&cedil;","¹":"&sup1;","º":"&ordm;","»":"&raquo;","¼":"&frac14;","½":"&frac12;","¾":"&frac34;","¿":"&iquest;","À":"&Agrave;","Á":"&Aacute;","Â":"&Acirc;","Ã":"&Atilde;","Ä":"&Auml;","Å":"&Aring;","Æ":"&AElig;","Ç":"&Ccedil;","È":"&Egrave;","É":"&Eacute;","Ê":"&Ecirc;","Ë":"&Euml;","Ì":"&Igrave;","Í":"&Iacute;","Î":"&Icirc;","Ï":"&Iuml;","Ð":"&ETH;","Ñ":"&Ntilde;","Ò":"&Ograve;","Ó":"&Oacute;","Ô":"&Ocirc;","Õ":"&Otilde;","Ö":"&Ouml;","×":"&times;","Ø":"&Oslash;","Ù":"&Ugrave;","Ú":"&Uacute;","Û":"&Ucirc;","Ü":"&Uuml;","Ý":"&Yacute;","Þ":"&THORN;","ß":"&szlig;","à":"&agrave;","á":"&aacute;","â":"&acirc;","ã":"&atilde;","ä":"&auml;","å":"&aring;","æ":"&aelig;","ç":"&ccedil;","è":"&egrave;","é":"&eacute;","ê":"&ecirc;","ë":"&euml;","ì":"&igrave;","í":"&iacute;","î":"&icirc;","ï":"&iuml;","ð":"&eth;","ñ":"&ntilde;","ò":"&ograve;","ó":"&oacute;","ô":"&ocirc;","õ":"&otilde;","ö":"&ouml;","÷":"&divide;","ø":"&oslash;","ù":"&ugrave;","ú":"&uacute;","û":"&ucirc;","ü":"&uuml;","ý":"&yacute;","þ":"&thorn;","ÿ":"&yuml;",'"':"&quot;","&":"&amp;","<":"&lt;",">":"&gt;","Œ":"&OElig;","œ":"&oelig;","Š":"&Scaron;","š":"&scaron;","Ÿ":"&Yuml;","ˆ":"&circ;","˜":"&tilde;"," ":"&ensp;"," ":"&emsp;"," ":"&thinsp;","‌":"&zwnj;","‍":"&zwj;","‎":"&lrm;","‏":"&rlm;","–":"&ndash;","—":"&mdash;","‘":"&lsquo;","’":"&rsquo;","‚":"&sbquo;","“":"&ldquo;","”":"&rdquo;","„":"&bdquo;","†":"&dagger;","‡":"&Dagger;","‰":"&permil;","‹":"&lsaquo;","›":"&rsaquo;","€":"&euro;","ƒ":"&fnof;","Α":"&Alpha;","Β":"&Beta;","Γ":"&Gamma;","Δ":"&Delta;","Ε":"&Epsilon;","Ζ":"&Zeta;","Η":"&Eta;","Θ":"&Theta;","Ι":"&Iota;","Κ":"&Kappa;","Λ":"&Lambda;","Μ":"&Mu;","Ν":"&Nu;","Ξ":"&Xi;","Ο":"&Omicron;","Π":"&Pi;","Ρ":"&Rho;","Σ":"&Sigma;","Τ":"&Tau;","Υ":"&Upsilon;","Φ":"&Phi;","Χ":"&Chi;","Ψ":"&Psi;","Ω":"&Omega;","α":"&alpha;","β":"&beta;","γ":"&gamma;","δ":"&delta;","ε":"&epsilon;","ζ":"&zeta;","η":"&eta;","θ":"&theta;","ι":"&iota;","κ":"&kappa;","λ":"&lambda;","μ":"&mu;","ν":"&nu;","ξ":"&xi;","ο":"&omicron;","π":"&pi;","ρ":"&rho;","ς":"&sigmaf;","σ":"&sigma;","τ":"&tau;","υ":"&upsilon;","φ":"&phi;","χ":"&chi;","ψ":"&psi;","ω":"&omega;","ϑ":"&thetasym;","ϒ":"&upsih;","ϖ":"&piv;","•":"&bull;","…":"&hellip;","′":"&prime;","″":"&Prime;","‾":"&oline;","⁄":"&frasl;","℘":"&weierp;","ℑ":"&image;","ℜ":"&real;","™":"&trade;","ℵ":"&alefsym;","←":"&larr;","↑":"&uarr;","→":"&rarr;","↓":"&darr;","↔":"&harr;","↵":"&crarr;","⇐":"&lArr;","⇑":"&uArr;","⇒":"&rArr;","⇓":"&dArr;","⇔":"&hArr;","∀":"&forall;","∂":"&part;","∃":"&exist;","∅":"&empty;","∇":"&nabla;","∈":"&isin;","∉":"&notin;","∋":"&ni;","∏":"&prod;","∑":"&sum;","−":"&minus;","∗":"&lowast;","√":"&radic;","∝":"&prop;","∞":"&infin;","∠":"&ang;","∧":"&and;","∨":"&or;","∩":"&cap;","∪":"&cup;","∫":"&int;","∴":"&there4;","∼":"&sim;","≅":"&cong;","≈":"&asymp;","≠":"&ne;","≡":"&equiv;","≤":"&le;","≥":"&ge;","⊂":"&sub;","⊃":"&sup;","⊄":"&nsub;","⊆":"&sube;","⊇":"&supe;","⊕":"&oplus;","⊗":"&otimes;","⊥":"&perp;","⋅":"&sdot;","⌈":"&lceil;","⌉":"&rceil;","⌊":"&lfloor;","⌋":"&rfloor;","〈":"&lang;","〉":"&rang;","◊":"&loz;","♠":"&spades;","♣":"&clubs;","♥":"&hearts;","♦":"&diams;"}},html5:{entities:{"&AElig":"Æ","&AElig;":"Æ","&AMP":"&","&AMP;":"&","&Aacute":"Á","&Aacute;":"Á","&Abreve;":"Ă","&Acirc":"Â","&Acirc;":"Â","&Acy;":"А","&Afr;":"𝔄","&Agrave":"À","&Agrave;":"À","&Alpha;":"Α","&Amacr;":"Ā","&And;":"⩓","&Aogon;":"Ą","&Aopf;":"𝔸","&ApplyFunction;":"⁡","&Aring":"Å","&Aring;":"Å","&Ascr;":"𝒜","&Assign;":"≔","&Atilde":"Ã","&Atilde;":"Ã","&Auml":"Ä","&Auml;":"Ä","&Backslash;":"∖","&Barv;":"⫧","&Barwed;":"⌆","&Bcy;":"Б","&Because;":"∵","&Bernoullis;":"ℬ","&Beta;":"Β","&Bfr;":"𝔅","&Bopf;":"𝔹","&Breve;":"˘","&Bscr;":"ℬ","&Bumpeq;":"≎","&CHcy;":"Ч","&COPY":"©","&COPY;":"©","&Cacute;":"Ć","&Cap;":"⋒","&CapitalDifferentialD;":"ⅅ","&Cayleys;":"ℭ","&Ccaron;":"Č","&Ccedil":"Ç","&Ccedil;":"Ç","&Ccirc;":"Ĉ","&Cconint;":"∰","&Cdot;":"Ċ","&Cedilla;":"¸","&CenterDot;":"·","&Cfr;":"ℭ","&Chi;":"Χ","&CircleDot;":"⊙","&CircleMinus;":"⊖","&CirclePlus;":"⊕","&CircleTimes;":"⊗","&ClockwiseContourIntegral;":"∲","&CloseCurlyDoubleQuote;":"”","&CloseCurlyQuote;":"’","&Colon;":"∷","&Colone;":"⩴","&Congruent;":"≡","&Conint;":"∯","&ContourIntegral;":"∮","&Copf;":"ℂ","&Coproduct;":"∐","&CounterClockwiseContourIntegral;":"∳","&Cross;":"⨯","&Cscr;":"𝒞","&Cup;":"⋓","&CupCap;":"≍","&DD;":"ⅅ","&DDotrahd;":"⤑","&DJcy;":"Ђ","&DScy;":"Ѕ","&DZcy;":"Џ","&Dagger;":"‡","&Darr;":"↡","&Dashv;":"⫤","&Dcaron;":"Ď","&Dcy;":"Д","&Del;":"∇","&Delta;":"Δ","&Dfr;":"𝔇","&DiacriticalAcute;":"´","&DiacriticalDot;":"˙","&DiacriticalDoubleAcute;":"˝","&DiacriticalGrave;":"`","&DiacriticalTilde;":"˜","&Diamond;":"⋄","&DifferentialD;":"ⅆ","&Dopf;":"𝔻","&Dot;":"¨","&DotDot;":"⃜","&DotEqual;":"≐","&DoubleContourIntegral;":"∯","&DoubleDot;":"¨","&DoubleDownArrow;":"⇓","&DoubleLeftArrow;":"⇐","&DoubleLeftRightArrow;":"⇔","&DoubleLeftTee;":"⫤","&DoubleLongLeftArrow;":"⟸","&DoubleLongLeftRightArrow;":"⟺","&DoubleLongRightArrow;":"⟹","&DoubleRightArrow;":"⇒","&DoubleRightTee;":"⊨","&DoubleUpArrow;":"⇑","&DoubleUpDownArrow;":"⇕","&DoubleVerticalBar;":"∥","&DownArrow;":"↓","&DownArrowBar;":"⤓","&DownArrowUpArrow;":"⇵","&DownBreve;":"̑","&DownLeftRightVector;":"⥐","&DownLeftTeeVector;":"⥞","&DownLeftVector;":"↽","&DownLeftVectorBar;":"⥖","&DownRightTeeVector;":"⥟","&DownRightVector;":"⇁","&DownRightVectorBar;":"⥗","&DownTee;":"⊤","&DownTeeArrow;":"↧","&Downarrow;":"⇓","&Dscr;":"𝒟","&Dstrok;":"Đ","&ENG;":"Ŋ","&ETH":"Ð","&ETH;":"Ð","&Eacute":"É","&Eacute;":"É","&Ecaron;":"Ě","&Ecirc":"Ê","&Ecirc;":"Ê","&Ecy;":"Э","&Edot;":"Ė","&Efr;":"𝔈","&Egrave":"È","&Egrave;":"È","&Element;":"∈","&Emacr;":"Ē","&EmptySmallSquare;":"◻","&EmptyVerySmallSquare;":"▫","&Eogon;":"Ę","&Eopf;":"𝔼","&Epsilon;":"Ε","&Equal;":"⩵","&EqualTilde;":"≂","&Equilibrium;":"⇌","&Escr;":"ℰ","&Esim;":"⩳","&Eta;":"Η","&Euml":"Ë","&Euml;":"Ë","&Exists;":"∃","&ExponentialE;":"ⅇ","&Fcy;":"Ф","&Ffr;":"𝔉","&FilledSmallSquare;":"◼","&FilledVerySmallSquare;":"▪","&Fopf;":"𝔽","&ForAll;":"∀","&Fouriertrf;":"ℱ","&Fscr;":"ℱ","&GJcy;":"Ѓ","&GT":">","&GT;":">","&Gamma;":"Γ","&Gammad;":"Ϝ","&Gbreve;":"Ğ","&Gcedil;":"Ģ","&Gcirc;":"Ĝ","&Gcy;":"Г","&Gdot;":"Ġ","&Gfr;":"𝔊","&Gg;":"⋙","&Gopf;":"𝔾","&GreaterEqual;":"≥","&GreaterEqualLess;":"⋛","&GreaterFullEqual;":"≧","&GreaterGreater;":"⪢","&GreaterLess;":"≷","&GreaterSlantEqual;":"⩾","&GreaterTilde;":"≳","&Gscr;":"𝒢","&Gt;":"≫","&HARDcy;":"Ъ","&Hacek;":"ˇ","&Hat;":"^","&Hcirc;":"Ĥ","&Hfr;":"ℌ","&HilbertSpace;":"ℋ","&Hopf;":"ℍ","&HorizontalLine;":"─","&Hscr;":"ℋ","&Hstrok;":"Ħ","&HumpDownHump;":"≎","&HumpEqual;":"≏","&IEcy;":"Е","&IJlig;":"Ĳ","&IOcy;":"Ё","&Iacute":"Í","&Iacute;":"Í","&Icirc":"Î","&Icirc;":"Î","&Icy;":"И","&Idot;":"İ","&Ifr;":"ℑ","&Igrave":"Ì","&Igrave;":"Ì","&Im;":"ℑ","&Imacr;":"Ī","&ImaginaryI;":"ⅈ","&Implies;":"⇒","&Int;":"∬","&Integral;":"∫","&Intersection;":"⋂","&InvisibleComma;":"⁣","&InvisibleTimes;":"⁢","&Iogon;":"Į","&Iopf;":"𝕀","&Iota;":"Ι","&Iscr;":"ℐ","&Itilde;":"Ĩ","&Iukcy;":"І","&Iuml":"Ï","&Iuml;":"Ï","&Jcirc;":"Ĵ","&Jcy;":"Й","&Jfr;":"𝔍","&Jopf;":"𝕁","&Jscr;":"𝒥","&Jsercy;":"Ј","&Jukcy;":"Є","&KHcy;":"Х","&KJcy;":"Ќ","&Kappa;":"Κ","&Kcedil;":"Ķ","&Kcy;":"К","&Kfr;":"𝔎","&Kopf;":"𝕂","&Kscr;":"𝒦","&LJcy;":"Љ","&LT":"<","&LT;":"<","&Lacute;":"Ĺ","&Lambda;":"Λ","&Lang;":"⟪","&Laplacetrf;":"ℒ","&Larr;":"↞","&Lcaron;":"Ľ","&Lcedil;":"Ļ","&Lcy;":"Л","&LeftAngleBracket;":"⟨","&LeftArrow;":"←","&LeftArrowBar;":"⇤","&LeftArrowRightArrow;":"⇆","&LeftCeiling;":"⌈","&LeftDoubleBracket;":"⟦","&LeftDownTeeVector;":"⥡","&LeftDownVector;":"⇃","&LeftDownVectorBar;":"⥙","&LeftFloor;":"⌊","&LeftRightArrow;":"↔","&LeftRightVector;":"⥎","&LeftTee;":"⊣","&LeftTeeArrow;":"↤","&LeftTeeVector;":"⥚","&LeftTriangle;":"⊲","&LeftTriangleBar;":"⧏","&LeftTriangleEqual;":"⊴","&LeftUpDownVector;":"⥑","&LeftUpTeeVector;":"⥠","&LeftUpVector;":"↿","&LeftUpVectorBar;":"⥘","&LeftVector;":"↼","&LeftVectorBar;":"⥒","&Leftarrow;":"⇐","&Leftrightarrow;":"⇔","&LessEqualGreater;":"⋚","&LessFullEqual;":"≦","&LessGreater;":"≶","&LessLess;":"⪡","&LessSlantEqual;":"⩽","&LessTilde;":"≲","&Lfr;":"𝔏","&Ll;":"⋘","&Lleftarrow;":"⇚","&Lmidot;":"Ŀ","&LongLeftArrow;":"⟵","&LongLeftRightArrow;":"⟷","&LongRightArrow;":"⟶","&Longleftarrow;":"⟸","&Longleftrightarrow;":"⟺","&Longrightarrow;":"⟹","&Lopf;":"𝕃","&LowerLeftArrow;":"↙","&LowerRightArrow;":"↘","&Lscr;":"ℒ","&Lsh;":"↰","&Lstrok;":"Ł","&Lt;":"≪","&Map;":"⤅","&Mcy;":"М","&MediumSpace;":" ","&Mellintrf;":"ℳ","&Mfr;":"𝔐","&MinusPlus;":"∓","&Mopf;":"𝕄","&Mscr;":"ℳ","&Mu;":"Μ","&NJcy;":"Њ","&Nacute;":"Ń","&Ncaron;":"Ň","&Ncedil;":"Ņ","&Ncy;":"Н","&NegativeMediumSpace;":"​","&NegativeThickSpace;":"​","&NegativeThinSpace;":"​","&NegativeVeryThinSpace;":"​","&NestedGreaterGreater;":"≫","&NestedLessLess;":"≪","&NewLine;":"\n","&Nfr;":"𝔑","&NoBreak;":"⁠","&NonBreakingSpace;":" ","&Nopf;":"ℕ","&Not;":"⫬","&NotCongruent;":"≢","&NotCupCap;":"≭","&NotDoubleVerticalBar;":"∦","&NotElement;":"∉","&NotEqual;":"≠","&NotEqualTilde;":"≂̸","&NotExists;":"∄","&NotGreater;":"≯","&NotGreaterEqual;":"≱","&NotGreaterFullEqual;":"≧̸","&NotGreaterGreater;":"≫̸","&NotGreaterLess;":"≹","&NotGreaterSlantEqual;":"⩾̸","&NotGreaterTilde;":"≵","&NotHumpDownHump;":"≎̸","&NotHumpEqual;":"≏̸","&NotLeftTriangle;":"⋪","&NotLeftTriangleBar;":"⧏̸","&NotLeftTriangleEqual;":"⋬","&NotLess;":"≮","&NotLessEqual;":"≰","&NotLessGreater;":"≸","&NotLessLess;":"≪̸","&NotLessSlantEqual;":"⩽̸","&NotLessTilde;":"≴","&NotNestedGreaterGreater;":"⪢̸","&NotNestedLessLess;":"⪡̸","&NotPrecedes;":"⊀","&NotPrecedesEqual;":"⪯̸","&NotPrecedesSlantEqual;":"⋠","&NotReverseElement;":"∌","&NotRightTriangle;":"⋫","&NotRightTriangleBar;":"⧐̸","&NotRightTriangleEqual;":"⋭","&NotSquareSubset;":"⊏̸","&NotSquareSubsetEqual;":"⋢","&NotSquareSuperset;":"⊐̸","&NotSquareSupersetEqual;":"⋣","&NotSubset;":"⊂⃒","&NotSubsetEqual;":"⊈","&NotSucceeds;":"⊁","&NotSucceedsEqual;":"⪰̸","&NotSucceedsSlantEqual;":"⋡","&NotSucceedsTilde;":"≿̸","&NotSuperset;":"⊃⃒","&NotSupersetEqual;":"⊉","&NotTilde;":"≁","&NotTildeEqual;":"≄","&NotTildeFullEqual;":"≇","&NotTildeTilde;":"≉","&NotVerticalBar;":"∤","&Nscr;":"𝒩","&Ntilde":"Ñ","&Ntilde;":"Ñ","&Nu;":"Ν","&OElig;":"Œ","&Oacute":"Ó","&Oacute;":"Ó","&Ocirc":"Ô","&Ocirc;":"Ô","&Ocy;":"О","&Odblac;":"Ő","&Ofr;":"𝔒","&Ograve":"Ò","&Ograve;":"Ò","&Omacr;":"Ō","&Omega;":"Ω","&Omicron;":"Ο","&Oopf;":"𝕆","&OpenCurlyDoubleQuote;":"“","&OpenCurlyQuote;":"‘","&Or;":"⩔","&Oscr;":"𝒪","&Oslash":"Ø","&Oslash;":"Ø","&Otilde":"Õ","&Otilde;":"Õ","&Otimes;":"⨷","&Ouml":"Ö","&Ouml;":"Ö","&OverBar;":"‾","&OverBrace;":"⏞","&OverBracket;":"⎴","&OverParenthesis;":"⏜","&PartialD;":"∂","&Pcy;":"П","&Pfr;":"𝔓","&Phi;":"Φ","&Pi;":"Π","&PlusMinus;":"±","&Poincareplane;":"ℌ","&Popf;":"ℙ","&Pr;":"⪻","&Precedes;":"≺","&PrecedesEqual;":"⪯","&PrecedesSlantEqual;":"≼","&PrecedesTilde;":"≾","&Prime;":"″","&Product;":"∏","&Proportion;":"∷","&Proportional;":"∝","&Pscr;":"𝒫","&Psi;":"Ψ","&QUOT":'"',"&QUOT;":'"',"&Qfr;":"𝔔","&Qopf;":"ℚ","&Qscr;":"𝒬","&RBarr;":"⤐","&REG":"®","&REG;":"®","&Racute;":"Ŕ","&Rang;":"⟫","&Rarr;":"↠","&Rarrtl;":"⤖","&Rcaron;":"Ř","&Rcedil;":"Ŗ","&Rcy;":"Р","&Re;":"ℜ","&ReverseElement;":"∋","&ReverseEquilibrium;":"⇋","&ReverseUpEquilibrium;":"⥯","&Rfr;":"ℜ","&Rho;":"Ρ","&RightAngleBracket;":"⟩","&RightArrow;":"→","&RightArrowBar;":"⇥","&RightArrowLeftArrow;":"⇄","&RightCeiling;":"⌉","&RightDoubleBracket;":"⟧","&RightDownTeeVector;":"⥝","&RightDownVector;":"⇂","&RightDownVectorBar;":"⥕","&RightFloor;":"⌋","&RightTee;":"⊢","&RightTeeArrow;":"↦","&RightTeeVector;":"⥛","&RightTriangle;":"⊳","&RightTriangleBar;":"⧐","&RightTriangleEqual;":"⊵","&RightUpDownVector;":"⥏","&RightUpTeeVector;":"⥜","&RightUpVector;":"↾","&RightUpVectorBar;":"⥔","&RightVector;":"⇀","&RightVectorBar;":"⥓","&Rightarrow;":"⇒","&Ropf;":"ℝ","&RoundImplies;":"⥰","&Rrightarrow;":"⇛","&Rscr;":"ℛ","&Rsh;":"↱","&RuleDelayed;":"⧴","&SHCHcy;":"Щ","&SHcy;":"Ш","&SOFTcy;":"Ь","&Sacute;":"Ś","&Sc;":"⪼","&Scaron;":"Š","&Scedil;":"Ş","&Scirc;":"Ŝ","&Scy;":"С","&Sfr;":"𝔖","&ShortDownArrow;":"↓","&ShortLeftArrow;":"←","&ShortRightArrow;":"→","&ShortUpArrow;":"↑","&Sigma;":"Σ","&SmallCircle;":"∘","&Sopf;":"𝕊","&Sqrt;":"√","&Square;":"□","&SquareIntersection;":"⊓","&SquareSubset;":"⊏","&SquareSubsetEqual;":"⊑","&SquareSuperset;":"⊐","&SquareSupersetEqual;":"⊒","&SquareUnion;":"⊔","&Sscr;":"𝒮","&Star;":"⋆","&Sub;":"⋐","&Subset;":"⋐","&SubsetEqual;":"⊆","&Succeeds;":"≻","&SucceedsEqual;":"⪰","&SucceedsSlantEqual;":"≽","&SucceedsTilde;":"≿","&SuchThat;":"∋","&Sum;":"∑","&Sup;":"⋑","&Superset;":"⊃","&SupersetEqual;":"⊇","&Supset;":"⋑","&THORN":"Þ","&THORN;":"Þ","&TRADE;":"™","&TSHcy;":"Ћ","&TScy;":"Ц","&Tab;":"\t","&Tau;":"Τ","&Tcaron;":"Ť","&Tcedil;":"Ţ","&Tcy;":"Т","&Tfr;":"𝔗","&Therefore;":"∴","&Theta;":"Θ","&ThickSpace;":"  ","&ThinSpace;":" ","&Tilde;":"∼","&TildeEqual;":"≃","&TildeFullEqual;":"≅","&TildeTilde;":"≈","&Topf;":"𝕋","&TripleDot;":"⃛","&Tscr;":"𝒯","&Tstrok;":"Ŧ","&Uacute":"Ú","&Uacute;":"Ú","&Uarr;":"↟","&Uarrocir;":"⥉","&Ubrcy;":"Ў","&Ubreve;":"Ŭ","&Ucirc":"Û","&Ucirc;":"Û","&Ucy;":"У","&Udblac;":"Ű","&Ufr;":"𝔘","&Ugrave":"Ù","&Ugrave;":"Ù","&Umacr;":"Ū","&UnderBar;":"_","&UnderBrace;":"⏟","&UnderBracket;":"⎵","&UnderParenthesis;":"⏝","&Union;":"⋃","&UnionPlus;":"⊎","&Uogon;":"Ų","&Uopf;":"𝕌","&UpArrow;":"↑","&UpArrowBar;":"⤒","&UpArrowDownArrow;":"⇅","&UpDownArrow;":"↕","&UpEquilibrium;":"⥮","&UpTee;":"⊥","&UpTeeArrow;":"↥","&Uparrow;":"⇑","&Updownarrow;":"⇕","&UpperLeftArrow;":"↖","&UpperRightArrow;":"↗","&Upsi;":"ϒ","&Upsilon;":"Υ","&Uring;":"Ů","&Uscr;":"𝒰","&Utilde;":"Ũ","&Uuml":"Ü","&Uuml;":"Ü","&VDash;":"⊫","&Vbar;":"⫫","&Vcy;":"В","&Vdash;":"⊩","&Vdashl;":"⫦","&Vee;":"⋁","&Verbar;":"‖","&Vert;":"‖","&VerticalBar;":"∣","&VerticalLine;":"|","&VerticalSeparator;":"❘","&VerticalTilde;":"≀","&VeryThinSpace;":" ","&Vfr;":"𝔙","&Vopf;":"𝕍","&Vscr;":"𝒱","&Vvdash;":"⊪","&Wcirc;":"Ŵ","&Wedge;":"⋀","&Wfr;":"𝔚","&Wopf;":"𝕎","&Wscr;":"𝒲","&Xfr;":"𝔛","&Xi;":"Ξ","&Xopf;":"𝕏","&Xscr;":"𝒳","&YAcy;":"Я","&YIcy;":"Ї","&YUcy;":"Ю","&Yacute":"Ý","&Yacute;":"Ý","&Ycirc;":"Ŷ","&Ycy;":"Ы","&Yfr;":"𝔜","&Yopf;":"𝕐","&Yscr;":"𝒴","&Yuml;":"Ÿ","&ZHcy;":"Ж","&Zacute;":"Ź","&Zcaron;":"Ž","&Zcy;":"З","&Zdot;":"Ż","&ZeroWidthSpace;":"​","&Zeta;":"Ζ","&Zfr;":"ℨ","&Zopf;":"ℤ","&Zscr;":"𝒵","&aacute":"á","&aacute;":"á","&abreve;":"ă","&ac;":"∾","&acE;":"∾̳","&acd;":"∿","&acirc":"â","&acirc;":"â","&acute":"´","&acute;":"´","&acy;":"а","&aelig":"æ","&aelig;":"æ","&af;":"⁡","&afr;":"𝔞","&agrave":"à","&agrave;":"à","&alefsym;":"ℵ","&aleph;":"ℵ","&alpha;":"α","&amacr;":"ā","&amalg;":"⨿","&amp":"&","&amp;":"&","&and;":"∧","&andand;":"⩕","&andd;":"⩜","&andslope;":"⩘","&andv;":"⩚","&ang;":"∠","&ange;":"⦤","&angle;":"∠","&angmsd;":"∡","&angmsdaa;":"⦨","&angmsdab;":"⦩","&angmsdac;":"⦪","&angmsdad;":"⦫","&angmsdae;":"⦬","&angmsdaf;":"⦭","&angmsdag;":"⦮","&angmsdah;":"⦯","&angrt;":"∟","&angrtvb;":"⊾","&angrtvbd;":"⦝","&angsph;":"∢","&angst;":"Å","&angzarr;":"⍼","&aogon;":"ą","&aopf;":"𝕒","&ap;":"≈","&apE;":"⩰","&apacir;":"⩯","&ape;":"≊","&apid;":"≋","&apos;":"'","&approx;":"≈","&approxeq;":"≊","&aring":"å","&aring;":"å","&ascr;":"𝒶","&ast;":"*","&asymp;":"≈","&asympeq;":"≍","&atilde":"ã","&atilde;":"ã","&auml":"ä","&auml;":"ä","&awconint;":"∳","&awint;":"⨑","&bNot;":"⫭","&backcong;":"≌","&backepsilon;":"϶","&backprime;":"‵","&backsim;":"∽","&backsimeq;":"⋍","&barvee;":"⊽","&barwed;":"⌅","&barwedge;":"⌅","&bbrk;":"⎵","&bbrktbrk;":"⎶","&bcong;":"≌","&bcy;":"б","&bdquo;":"„","&becaus;":"∵","&because;":"∵","&bemptyv;":"⦰","&bepsi;":"϶","&bernou;":"ℬ","&beta;":"β","&beth;":"ℶ","&between;":"≬","&bfr;":"𝔟","&bigcap;":"⋂","&bigcirc;":"◯","&bigcup;":"⋃","&bigodot;":"⨀","&bigoplus;":"⨁","&bigotimes;":"⨂","&bigsqcup;":"⨆","&bigstar;":"★","&bigtriangledown;":"▽","&bigtriangleup;":"△","&biguplus;":"⨄","&bigvee;":"⋁","&bigwedge;":"⋀","&bkarow;":"⤍","&blacklozenge;":"⧫","&blacksquare;":"▪","&blacktriangle;":"▴","&blacktriangledown;":"▾","&blacktriangleleft;":"◂","&blacktriangleright;":"▸","&blank;":"␣","&blk12;":"▒","&blk14;":"░","&blk34;":"▓","&block;":"█","&bne;":"=⃥","&bnequiv;":"≡⃥","&bnot;":"⌐","&bopf;":"𝕓","&bot;":"⊥","&bottom;":"⊥","&bowtie;":"⋈","&boxDL;":"╗","&boxDR;":"╔","&boxDl;":"╖","&boxDr;":"╓","&boxH;":"═","&boxHD;":"╦","&boxHU;":"╩","&boxHd;":"╤","&boxHu;":"╧","&boxUL;":"╝","&boxUR;":"╚","&boxUl;":"╜","&boxUr;":"╙","&boxV;":"║","&boxVH;":"╬","&boxVL;":"╣","&boxVR;":"╠","&boxVh;":"╫","&boxVl;":"╢","&boxVr;":"╟","&boxbox;":"⧉","&boxdL;":"╕","&boxdR;":"╒","&boxdl;":"┐","&boxdr;":"┌","&boxh;":"─","&boxhD;":"╥","&boxhU;":"╨","&boxhd;":"┬","&boxhu;":"┴","&boxminus;":"⊟","&boxplus;":"⊞","&boxtimes;":"⊠","&boxuL;":"╛","&boxuR;":"╘","&boxul;":"┘","&boxur;":"└","&boxv;":"│","&boxvH;":"╪","&boxvL;":"╡","&boxvR;":"╞","&boxvh;":"┼","&boxvl;":"┤","&boxvr;":"├","&bprime;":"‵","&breve;":"˘","&brvbar":"¦","&brvbar;":"¦","&bscr;":"𝒷","&bsemi;":"⁏","&bsim;":"∽","&bsime;":"⋍","&bsol;":"\\","&bsolb;":"⧅","&bsolhsub;":"⟈","&bull;":"•","&bullet;":"•","&bump;":"≎","&bumpE;":"⪮","&bumpe;":"≏","&bumpeq;":"≏","&cacute;":"ć","&cap;":"∩","&capand;":"⩄","&capbrcup;":"⩉","&capcap;":"⩋","&capcup;":"⩇","&capdot;":"⩀","&caps;":"∩︀","&caret;":"⁁","&caron;":"ˇ","&ccaps;":"⩍","&ccaron;":"č","&ccedil":"ç","&ccedil;":"ç","&ccirc;":"ĉ","&ccups;":"⩌","&ccupssm;":"⩐","&cdot;":"ċ","&cedil":"¸","&cedil;":"¸","&cemptyv;":"⦲","&cent":"¢","&cent;":"¢","&centerdot;":"·","&cfr;":"𝔠","&chcy;":"ч","&check;":"✓","&checkmark;":"✓","&chi;":"χ","&cir;":"○","&cirE;":"⧃","&circ;":"ˆ","&circeq;":"≗","&circlearrowleft;":"↺","&circlearrowright;":"↻","&circledR;":"®","&circledS;":"Ⓢ","&circledast;":"⊛","&circledcirc;":"⊚","&circleddash;":"⊝","&cire;":"≗","&cirfnint;":"⨐","&cirmid;":"⫯","&cirscir;":"⧂","&clubs;":"♣","&clubsuit;":"♣","&colon;":":","&colone;":"≔","&coloneq;":"≔","&comma;":",","&commat;":"@","&comp;":"∁","&compfn;":"∘","&complement;":"∁","&complexes;":"ℂ","&cong;":"≅","&congdot;":"⩭","&conint;":"∮","&copf;":"𝕔","&coprod;":"∐","&copy":"©","&copy;":"©","&copysr;":"℗","&crarr;":"↵","&cross;":"✗","&cscr;":"𝒸","&csub;":"⫏","&csube;":"⫑","&csup;":"⫐","&csupe;":"⫒","&ctdot;":"⋯","&cudarrl;":"⤸","&cudarrr;":"⤵","&cuepr;":"⋞","&cuesc;":"⋟","&cularr;":"↶","&cularrp;":"⤽","&cup;":"∪","&cupbrcap;":"⩈","&cupcap;":"⩆","&cupcup;":"⩊","&cupdot;":"⊍","&cupor;":"⩅","&cups;":"∪︀","&curarr;":"↷","&curarrm;":"⤼","&curlyeqprec;":"⋞","&curlyeqsucc;":"⋟","&curlyvee;":"⋎","&curlywedge;":"⋏","&curren":"¤","&curren;":"¤","&curvearrowleft;":"↶","&curvearrowright;":"↷","&cuvee;":"⋎","&cuwed;":"⋏","&cwconint;":"∲","&cwint;":"∱","&cylcty;":"⌭","&dArr;":"⇓","&dHar;":"⥥","&dagger;":"†","&daleth;":"ℸ","&darr;":"↓","&dash;":"‐","&dashv;":"⊣","&dbkarow;":"⤏","&dblac;":"˝","&dcaron;":"ď","&dcy;":"д","&dd;":"ⅆ","&ddagger;":"‡","&ddarr;":"⇊","&ddotseq;":"⩷","&deg":"°","&deg;":"°","&delta;":"δ","&demptyv;":"⦱","&dfisht;":"⥿","&dfr;":"𝔡","&dharl;":"⇃","&dharr;":"⇂","&diam;":"⋄","&diamond;":"⋄","&diamondsuit;":"♦","&diams;":"♦","&die;":"¨","&digamma;":"ϝ","&disin;":"⋲","&div;":"÷","&divide":"÷","&divide;":"÷","&divideontimes;":"⋇","&divonx;":"⋇","&djcy;":"ђ","&dlcorn;":"⌞","&dlcrop;":"⌍","&dollar;":"$","&dopf;":"𝕕","&dot;":"˙","&doteq;":"≐","&doteqdot;":"≑","&dotminus;":"∸","&dotplus;":"∔","&dotsquare;":"⊡","&doublebarwedge;":"⌆","&downarrow;":"↓","&downdownarrows;":"⇊","&downharpoonleft;":"⇃","&downharpoonright;":"⇂","&drbkarow;":"⤐","&drcorn;":"⌟","&drcrop;":"⌌","&dscr;":"𝒹","&dscy;":"ѕ","&dsol;":"⧶","&dstrok;":"đ","&dtdot;":"⋱","&dtri;":"▿","&dtrif;":"▾","&duarr;":"⇵","&duhar;":"⥯","&dwangle;":"⦦","&dzcy;":"џ","&dzigrarr;":"⟿","&eDDot;":"⩷","&eDot;":"≑","&eacute":"é","&eacute;":"é","&easter;":"⩮","&ecaron;":"ě","&ecir;":"≖","&ecirc":"ê","&ecirc;":"ê","&ecolon;":"≕","&ecy;":"э","&edot;":"ė","&ee;":"ⅇ","&efDot;":"≒","&efr;":"𝔢","&eg;":"⪚","&egrave":"è","&egrave;":"è","&egs;":"⪖","&egsdot;":"⪘","&el;":"⪙","&elinters;":"⏧","&ell;":"ℓ","&els;":"⪕","&elsdot;":"⪗","&emacr;":"ē","&empty;":"∅","&emptyset;":"∅","&emptyv;":"∅","&emsp13;":" ","&emsp14;":" ","&emsp;":" ","&eng;":"ŋ","&ensp;":" ","&eogon;":"ę","&eopf;":"𝕖","&epar;":"⋕","&eparsl;":"⧣","&eplus;":"⩱","&epsi;":"ε","&epsilon;":"ε","&epsiv;":"ϵ","&eqcirc;":"≖","&eqcolon;":"≕","&eqsim;":"≂","&eqslantgtr;":"⪖","&eqslantless;":"⪕","&equals;":"=","&equest;":"≟","&equiv;":"≡","&equivDD;":"⩸","&eqvparsl;":"⧥","&erDot;":"≓","&erarr;":"⥱","&escr;":"ℯ","&esdot;":"≐","&esim;":"≂","&eta;":"η","&eth":"ð","&eth;":"ð","&euml":"ë","&euml;":"ë","&euro;":"€","&excl;":"!","&exist;":"∃","&expectation;":"ℰ","&exponentiale;":"ⅇ","&fallingdotseq;":"≒","&fcy;":"ф","&female;":"♀","&ffilig;":"ﬃ","&fflig;":"ﬀ","&ffllig;":"ﬄ","&ffr;":"𝔣","&filig;":"ﬁ","&fjlig;":"fj","&flat;":"♭","&fllig;":"ﬂ","&fltns;":"▱","&fnof;":"ƒ","&fopf;":"𝕗","&forall;":"∀","&fork;":"⋔","&forkv;":"⫙","&fpartint;":"⨍","&frac12":"½","&frac12;":"½","&frac13;":"⅓","&frac14":"¼","&frac14;":"¼","&frac15;":"⅕","&frac16;":"⅙","&frac18;":"⅛","&frac23;":"⅔","&frac25;":"⅖","&frac34":"¾","&frac34;":"¾","&frac35;":"⅗","&frac38;":"⅜","&frac45;":"⅘","&frac56;":"⅚","&frac58;":"⅝","&frac78;":"⅞","&frasl;":"⁄","&frown;":"⌢","&fscr;":"𝒻","&gE;":"≧","&gEl;":"⪌","&gacute;":"ǵ","&gamma;":"γ","&gammad;":"ϝ","&gap;":"⪆","&gbreve;":"ğ","&gcirc;":"ĝ","&gcy;":"г","&gdot;":"ġ","&ge;":"≥","&gel;":"⋛","&geq;":"≥","&geqq;":"≧","&geqslant;":"⩾","&ges;":"⩾","&gescc;":"⪩","&gesdot;":"⪀","&gesdoto;":"⪂","&gesdotol;":"⪄","&gesl;":"⋛︀","&gesles;":"⪔","&gfr;":"𝔤","&gg;":"≫","&ggg;":"⋙","&gimel;":"ℷ","&gjcy;":"ѓ","&gl;":"≷","&glE;":"⪒","&gla;":"⪥","&glj;":"⪤","&gnE;":"≩","&gnap;":"⪊","&gnapprox;":"⪊","&gne;":"⪈","&gneq;":"⪈","&gneqq;":"≩","&gnsim;":"⋧","&gopf;":"𝕘","&grave;":"`","&gscr;":"ℊ","&gsim;":"≳","&gsime;":"⪎","&gsiml;":"⪐","&gt":">","&gt;":">","&gtcc;":"⪧","&gtcir;":"⩺","&gtdot;":"⋗","&gtlPar;":"⦕","&gtquest;":"⩼","&gtrapprox;":"⪆","&gtrarr;":"⥸","&gtrdot;":"⋗","&gtreqless;":"⋛","&gtreqqless;":"⪌","&gtrless;":"≷","&gtrsim;":"≳","&gvertneqq;":"≩︀","&gvnE;":"≩︀","&hArr;":"⇔","&hairsp;":" ","&half;":"½","&hamilt;":"ℋ","&hardcy;":"ъ","&harr;":"↔","&harrcir;":"⥈","&harrw;":"↭","&hbar;":"ℏ","&hcirc;":"ĥ","&hearts;":"♥","&heartsuit;":"♥","&hellip;":"…","&hercon;":"⊹","&hfr;":"𝔥","&hksearow;":"⤥","&hkswarow;":"⤦","&hoarr;":"⇿","&homtht;":"∻","&hookleftarrow;":"↩","&hookrightarrow;":"↪","&hopf;":"𝕙","&horbar;":"―","&hscr;":"𝒽","&hslash;":"ℏ","&hstrok;":"ħ","&hybull;":"⁃","&hyphen;":"‐","&iacute":"í","&iacute;":"í","&ic;":"⁣","&icirc":"î","&icirc;":"î","&icy;":"и","&iecy;":"е","&iexcl":"¡","&iexcl;":"¡","&iff;":"⇔","&ifr;":"𝔦","&igrave":"ì","&igrave;":"ì","&ii;":"ⅈ","&iiiint;":"⨌","&iiint;":"∭","&iinfin;":"⧜","&iiota;":"℩","&ijlig;":"ĳ","&imacr;":"ī","&image;":"ℑ","&imagline;":"ℐ","&imagpart;":"ℑ","&imath;":"ı","&imof;":"⊷","&imped;":"Ƶ","&in;":"∈","&incare;":"℅","&infin;":"∞","&infintie;":"⧝","&inodot;":"ı","&int;":"∫","&intcal;":"⊺","&integers;":"ℤ","&intercal;":"⊺","&intlarhk;":"⨗","&intprod;":"⨼","&iocy;":"ё","&iogon;":"į","&iopf;":"𝕚","&iota;":"ι","&iprod;":"⨼","&iquest":"¿","&iquest;":"¿","&iscr;":"𝒾","&isin;":"∈","&isinE;":"⋹","&isindot;":"⋵","&isins;":"⋴","&isinsv;":"⋳","&isinv;":"∈","&it;":"⁢","&itilde;":"ĩ","&iukcy;":"і","&iuml":"ï","&iuml;":"ï","&jcirc;":"ĵ","&jcy;":"й","&jfr;":"𝔧","&jmath;":"ȷ","&jopf;":"𝕛","&jscr;":"𝒿","&jsercy;":"ј","&jukcy;":"є","&kappa;":"κ","&kappav;":"ϰ","&kcedil;":"ķ","&kcy;":"к","&kfr;":"𝔨","&kgreen;":"ĸ","&khcy;":"х","&kjcy;":"ќ","&kopf;":"𝕜","&kscr;":"𝓀","&lAarr;":"⇚","&lArr;":"⇐","&lAtail;":"⤛","&lBarr;":"⤎","&lE;":"≦","&lEg;":"⪋","&lHar;":"⥢","&lacute;":"ĺ","&laemptyv;":"⦴","&lagran;":"ℒ","&lambda;":"λ","&lang;":"⟨","&langd;":"⦑","&langle;":"⟨","&lap;":"⪅","&laquo":"«","&laquo;":"«","&larr;":"←","&larrb;":"⇤","&larrbfs;":"⤟","&larrfs;":"⤝","&larrhk;":"↩","&larrlp;":"↫","&larrpl;":"⤹","&larrsim;":"⥳","&larrtl;":"↢","&lat;":"⪫","&latail;":"⤙","&late;":"⪭","&lates;":"⪭︀","&lbarr;":"⤌","&lbbrk;":"❲","&lbrace;":"{","&lbrack;":"[","&lbrke;":"⦋","&lbrksld;":"⦏","&lbrkslu;":"⦍","&lcaron;":"ľ","&lcedil;":"ļ","&lceil;":"⌈","&lcub;":"{","&lcy;":"л","&ldca;":"⤶","&ldquo;":"“","&ldquor;":"„","&ldrdhar;":"⥧","&ldrushar;":"⥋","&ldsh;":"↲","&le;":"≤","&leftarrow;":"←","&leftarrowtail;":"↢","&leftharpoondown;":"↽","&leftharpoonup;":"↼","&leftleftarrows;":"⇇","&leftrightarrow;":"↔","&leftrightarrows;":"⇆","&leftrightharpoons;":"⇋","&leftrightsquigarrow;":"↭","&leftthreetimes;":"⋋","&leg;":"⋚","&leq;":"≤","&leqq;":"≦","&leqslant;":"⩽","&les;":"⩽","&lescc;":"⪨","&lesdot;":"⩿","&lesdoto;":"⪁","&lesdotor;":"⪃","&lesg;":"⋚︀","&lesges;":"⪓","&lessapprox;":"⪅","&lessdot;":"⋖","&lesseqgtr;":"⋚","&lesseqqgtr;":"⪋","&lessgtr;":"≶","&lesssim;":"≲","&lfisht;":"⥼","&lfloor;":"⌊","&lfr;":"𝔩","&lg;":"≶","&lgE;":"⪑","&lhard;":"↽","&lharu;":"↼","&lharul;":"⥪","&lhblk;":"▄","&ljcy;":"љ","&ll;":"≪","&llarr;":"⇇","&llcorner;":"⌞","&llhard;":"⥫","&lltri;":"◺","&lmidot;":"ŀ","&lmoust;":"⎰","&lmoustache;":"⎰","&lnE;":"≨","&lnap;":"⪉","&lnapprox;":"⪉","&lne;":"⪇","&lneq;":"⪇","&lneqq;":"≨","&lnsim;":"⋦","&loang;":"⟬","&loarr;":"⇽","&lobrk;":"⟦","&longleftarrow;":"⟵","&longleftrightarrow;":"⟷","&longmapsto;":"⟼","&longrightarrow;":"⟶","&looparrowleft;":"↫","&looparrowright;":"↬","&lopar;":"⦅","&lopf;":"𝕝","&loplus;":"⨭","&lotimes;":"⨴","&lowast;":"∗","&lowbar;":"_","&loz;":"◊","&lozenge;":"◊","&lozf;":"⧫","&lpar;":"(","&lparlt;":"⦓","&lrarr;":"⇆","&lrcorner;":"⌟","&lrhar;":"⇋","&lrhard;":"⥭","&lrm;":"‎","&lrtri;":"⊿","&lsaquo;":"‹","&lscr;":"𝓁","&lsh;":"↰","&lsim;":"≲","&lsime;":"⪍","&lsimg;":"⪏","&lsqb;":"[","&lsquo;":"‘","&lsquor;":"‚","&lstrok;":"ł","&lt":"<","&lt;":"<","&ltcc;":"⪦","&ltcir;":"⩹","&ltdot;":"⋖","&lthree;":"⋋","&ltimes;":"⋉","&ltlarr;":"⥶","&ltquest;":"⩻","&ltrPar;":"⦖","&ltri;":"◃","&ltrie;":"⊴","&ltrif;":"◂","&lurdshar;":"⥊","&luruhar;":"⥦","&lvertneqq;":"≨︀","&lvnE;":"≨︀","&mDDot;":"∺","&macr":"¯","&macr;":"¯","&male;":"♂","&malt;":"✠","&maltese;":"✠","&map;":"↦","&mapsto;":"↦","&mapstodown;":"↧","&mapstoleft;":"↤","&mapstoup;":"↥","&marker;":"▮","&mcomma;":"⨩","&mcy;":"м","&mdash;":"—","&measuredangle;":"∡","&mfr;":"𝔪","&mho;":"℧","&micro":"µ","&micro;":"µ","&mid;":"∣","&midast;":"*","&midcir;":"⫰","&middot":"·","&middot;":"·","&minus;":"−","&minusb;":"⊟","&minusd;":"∸","&minusdu;":"⨪","&mlcp;":"⫛","&mldr;":"…","&mnplus;":"∓","&models;":"⊧","&mopf;":"𝕞","&mp;":"∓","&mscr;":"𝓂","&mstpos;":"∾","&mu;":"μ","&multimap;":"⊸","&mumap;":"⊸","&nGg;":"⋙̸","&nGt;":"≫⃒","&nGtv;":"≫̸","&nLeftarrow;":"⇍","&nLeftrightarrow;":"⇎","&nLl;":"⋘̸","&nLt;":"≪⃒","&nLtv;":"≪̸","&nRightarrow;":"⇏","&nVDash;":"⊯","&nVdash;":"⊮","&nabla;":"∇","&nacute;":"ń","&nang;":"∠⃒","&nap;":"≉","&napE;":"⩰̸","&napid;":"≋̸","&napos;":"ŉ","&napprox;":"≉","&natur;":"♮","&natural;":"♮","&naturals;":"ℕ","&nbsp":" ","&nbsp;":" ","&nbump;":"≎̸","&nbumpe;":"≏̸","&ncap;":"⩃","&ncaron;":"ň","&ncedil;":"ņ","&ncong;":"≇","&ncongdot;":"⩭̸","&ncup;":"⩂","&ncy;":"н","&ndash;":"–","&ne;":"≠","&neArr;":"⇗","&nearhk;":"⤤","&nearr;":"↗","&nearrow;":"↗","&nedot;":"≐̸","&nequiv;":"≢","&nesear;":"⤨","&nesim;":"≂̸","&nexist;":"∄","&nexists;":"∄","&nfr;":"𝔫","&ngE;":"≧̸","&nge;":"≱","&ngeq;":"≱","&ngeqq;":"≧̸","&ngeqslant;":"⩾̸","&nges;":"⩾̸","&ngsim;":"≵","&ngt;":"≯","&ngtr;":"≯","&nhArr;":"⇎","&nharr;":"↮","&nhpar;":"⫲","&ni;":"∋","&nis;":"⋼","&nisd;":"⋺","&niv;":"∋","&njcy;":"њ","&nlArr;":"⇍","&nlE;":"≦̸","&nlarr;":"↚","&nldr;":"‥","&nle;":"≰","&nleftarrow;":"↚","&nleftrightarrow;":"↮","&nleq;":"≰","&nleqq;":"≦̸","&nleqslant;":"⩽̸","&nles;":"⩽̸","&nless;":"≮","&nlsim;":"≴","&nlt;":"≮","&nltri;":"⋪","&nltrie;":"⋬","&nmid;":"∤","&nopf;":"𝕟","&not":"¬","&not;":"¬","&notin;":"∉","&notinE;":"⋹̸","&notindot;":"⋵̸","&notinva;":"∉","&notinvb;":"⋷","&notinvc;":"⋶","&notni;":"∌","&notniva;":"∌","&notnivb;":"⋾","&notnivc;":"⋽","&npar;":"∦","&nparallel;":"∦","&nparsl;":"⫽⃥","&npart;":"∂̸","&npolint;":"⨔","&npr;":"⊀","&nprcue;":"⋠","&npre;":"⪯̸","&nprec;":"⊀","&npreceq;":"⪯̸","&nrArr;":"⇏","&nrarr;":"↛","&nrarrc;":"⤳̸","&nrarrw;":"↝̸","&nrightarrow;":"↛","&nrtri;":"⋫","&nrtrie;":"⋭","&nsc;":"⊁","&nsccue;":"⋡","&nsce;":"⪰̸","&nscr;":"𝓃","&nshortmid;":"∤","&nshortparallel;":"∦","&nsim;":"≁","&nsime;":"≄","&nsimeq;":"≄","&nsmid;":"∤","&nspar;":"∦","&nsqsube;":"⋢","&nsqsupe;":"⋣","&nsub;":"⊄","&nsubE;":"⫅̸","&nsube;":"⊈","&nsubset;":"⊂⃒","&nsubseteq;":"⊈","&nsubseteqq;":"⫅̸","&nsucc;":"⊁","&nsucceq;":"⪰̸","&nsup;":"⊅","&nsupE;":"⫆̸","&nsupe;":"⊉","&nsupset;":"⊃⃒","&nsupseteq;":"⊉","&nsupseteqq;":"⫆̸","&ntgl;":"≹","&ntilde":"ñ","&ntilde;":"ñ","&ntlg;":"≸","&ntriangleleft;":"⋪","&ntrianglelefteq;":"⋬","&ntriangleright;":"⋫","&ntrianglerighteq;":"⋭","&nu;":"ν","&num;":"#","&numero;":"№","&numsp;":" ","&nvDash;":"⊭","&nvHarr;":"⤄","&nvap;":"≍⃒","&nvdash;":"⊬","&nvge;":"≥⃒","&nvgt;":">⃒","&nvinfin;":"⧞","&nvlArr;":"⤂","&nvle;":"≤⃒","&nvlt;":"<⃒","&nvltrie;":"⊴⃒","&nvrArr;":"⤃","&nvrtrie;":"⊵⃒","&nvsim;":"∼⃒","&nwArr;":"⇖","&nwarhk;":"⤣","&nwarr;":"↖","&nwarrow;":"↖","&nwnear;":"⤧","&oS;":"Ⓢ","&oacute":"ó","&oacute;":"ó","&oast;":"⊛","&ocir;":"⊚","&ocirc":"ô","&ocirc;":"ô","&ocy;":"о","&odash;":"⊝","&odblac;":"ő","&odiv;":"⨸","&odot;":"⊙","&odsold;":"⦼","&oelig;":"œ","&ofcir;":"⦿","&ofr;":"𝔬","&ogon;":"˛","&ograve":"ò","&ograve;":"ò","&ogt;":"⧁","&ohbar;":"⦵","&ohm;":"Ω","&oint;":"∮","&olarr;":"↺","&olcir;":"⦾","&olcross;":"⦻","&oline;":"‾","&olt;":"⧀","&omacr;":"ō","&omega;":"ω","&omicron;":"ο","&omid;":"⦶","&ominus;":"⊖","&oopf;":"𝕠","&opar;":"⦷","&operp;":"⦹","&oplus;":"⊕","&or;":"∨","&orarr;":"↻","&ord;":"⩝","&order;":"ℴ","&orderof;":"ℴ","&ordf":"ª","&ordf;":"ª","&ordm":"º","&ordm;":"º","&origof;":"⊶","&oror;":"⩖","&orslope;":"⩗","&orv;":"⩛","&oscr;":"ℴ","&oslash":"ø","&oslash;":"ø","&osol;":"⊘","&otilde":"õ","&otilde;":"õ","&otimes;":"⊗","&otimesas;":"⨶","&ouml":"ö","&ouml;":"ö","&ovbar;":"⌽","&par;":"∥","&para":"¶","&para;":"¶","&parallel;":"∥","&parsim;":"⫳","&parsl;":"⫽","&part;":"∂","&pcy;":"п","&percnt;":"%","&period;":".","&permil;":"‰","&perp;":"⊥","&pertenk;":"‱","&pfr;":"𝔭","&phi;":"φ","&phiv;":"ϕ","&phmmat;":"ℳ","&phone;":"☎","&pi;":"π","&pitchfork;":"⋔","&piv;":"ϖ","&planck;":"ℏ","&planckh;":"ℎ","&plankv;":"ℏ","&plus;":"+","&plusacir;":"⨣","&plusb;":"⊞","&pluscir;":"⨢","&plusdo;":"∔","&plusdu;":"⨥","&pluse;":"⩲","&plusmn":"±","&plusmn;":"±","&plussim;":"⨦","&plustwo;":"⨧","&pm;":"±","&pointint;":"⨕","&popf;":"𝕡","&pound":"£","&pound;":"£","&pr;":"≺","&prE;":"⪳","&prap;":"⪷","&prcue;":"≼","&pre;":"⪯","&prec;":"≺","&precapprox;":"⪷","&preccurlyeq;":"≼","&preceq;":"⪯","&precnapprox;":"⪹","&precneqq;":"⪵","&precnsim;":"⋨","&precsim;":"≾","&prime;":"′","&primes;":"ℙ","&prnE;":"⪵","&prnap;":"⪹","&prnsim;":"⋨","&prod;":"∏","&profalar;":"⌮","&profline;":"⌒","&profsurf;":"⌓","&prop;":"∝","&propto;":"∝","&prsim;":"≾","&prurel;":"⊰","&pscr;":"𝓅","&psi;":"ψ","&puncsp;":" ","&qfr;":"𝔮","&qint;":"⨌","&qopf;":"𝕢","&qprime;":"⁗","&qscr;":"𝓆","&quaternions;":"ℍ","&quatint;":"⨖","&quest;":"?","&questeq;":"≟","&quot":'"',"&quot;":'"',"&rAarr;":"⇛","&rArr;":"⇒","&rAtail;":"⤜","&rBarr;":"⤏","&rHar;":"⥤","&race;":"∽̱","&racute;":"ŕ","&radic;":"√","&raemptyv;":"⦳","&rang;":"⟩","&rangd;":"⦒","&range;":"⦥","&rangle;":"⟩","&raquo":"»","&raquo;":"»","&rarr;":"→","&rarrap;":"⥵","&rarrb;":"⇥","&rarrbfs;":"⤠","&rarrc;":"⤳","&rarrfs;":"⤞","&rarrhk;":"↪","&rarrlp;":"↬","&rarrpl;":"⥅","&rarrsim;":"⥴","&rarrtl;":"↣","&rarrw;":"↝","&ratail;":"⤚","&ratio;":"∶","&rationals;":"ℚ","&rbarr;":"⤍","&rbbrk;":"❳","&rbrace;":"}","&rbrack;":"]","&rbrke;":"⦌","&rbrksld;":"⦎","&rbrkslu;":"⦐","&rcaron;":"ř","&rcedil;":"ŗ","&rceil;":"⌉","&rcub;":"}","&rcy;":"р","&rdca;":"⤷","&rdldhar;":"⥩","&rdquo;":"”","&rdquor;":"”","&rdsh;":"↳","&real;":"ℜ","&realine;":"ℛ","&realpart;":"ℜ","&reals;":"ℝ","&rect;":"▭","&reg":"®","&reg;":"®","&rfisht;":"⥽","&rfloor;":"⌋","&rfr;":"𝔯","&rhard;":"⇁","&rharu;":"⇀","&rharul;":"⥬","&rho;":"ρ","&rhov;":"ϱ","&rightarrow;":"→","&rightarrowtail;":"↣","&rightharpoondown;":"⇁","&rightharpoonup;":"⇀","&rightleftarrows;":"⇄","&rightleftharpoons;":"⇌","&rightrightarrows;":"⇉","&rightsquigarrow;":"↝","&rightthreetimes;":"⋌","&ring;":"˚","&risingdotseq;":"≓","&rlarr;":"⇄","&rlhar;":"⇌","&rlm;":"‏","&rmoust;":"⎱","&rmoustache;":"⎱","&rnmid;":"⫮","&roang;":"⟭","&roarr;":"⇾","&robrk;":"⟧","&ropar;":"⦆","&ropf;":"𝕣","&roplus;":"⨮","&rotimes;":"⨵","&rpar;":")","&rpargt;":"⦔","&rppolint;":"⨒","&rrarr;":"⇉","&rsaquo;":"›","&rscr;":"𝓇","&rsh;":"↱","&rsqb;":"]","&rsquo;":"’","&rsquor;":"’","&rthree;":"⋌","&rtimes;":"⋊","&rtri;":"▹","&rtrie;":"⊵","&rtrif;":"▸","&rtriltri;":"⧎","&ruluhar;":"⥨","&rx;":"℞","&sacute;":"ś","&sbquo;":"‚","&sc;":"≻","&scE;":"⪴","&scap;":"⪸","&scaron;":"š","&sccue;":"≽","&sce;":"⪰","&scedil;":"ş","&scirc;":"ŝ","&scnE;":"⪶","&scnap;":"⪺","&scnsim;":"⋩","&scpolint;":"⨓","&scsim;":"≿","&scy;":"с","&sdot;":"⋅","&sdotb;":"⊡","&sdote;":"⩦","&seArr;":"⇘","&searhk;":"⤥","&searr;":"↘","&searrow;":"↘","&sect":"§","&sect;":"§","&semi;":";","&seswar;":"⤩","&setminus;":"∖","&setmn;":"∖","&sext;":"✶","&sfr;":"𝔰","&sfrown;":"⌢","&sharp;":"♯","&shchcy;":"щ","&shcy;":"ш","&shortmid;":"∣","&shortparallel;":"∥","&shy":"­","&shy;":"­","&sigma;":"σ","&sigmaf;":"ς","&sigmav;":"ς","&sim;":"∼","&simdot;":"⩪","&sime;":"≃","&simeq;":"≃","&simg;":"⪞","&simgE;":"⪠","&siml;":"⪝","&simlE;":"⪟","&simne;":"≆","&simplus;":"⨤","&simrarr;":"⥲","&slarr;":"←","&smallsetminus;":"∖","&smashp;":"⨳","&smeparsl;":"⧤","&smid;":"∣","&smile;":"⌣","&smt;":"⪪","&smte;":"⪬","&smtes;":"⪬︀","&softcy;":"ь","&sol;":"/","&solb;":"⧄","&solbar;":"⌿","&sopf;":"𝕤","&spades;":"♠","&spadesuit;":"♠","&spar;":"∥","&sqcap;":"⊓","&sqcaps;":"⊓︀","&sqcup;":"⊔","&sqcups;":"⊔︀","&sqsub;":"⊏","&sqsube;":"⊑","&sqsubset;":"⊏","&sqsubseteq;":"⊑","&sqsup;":"⊐","&sqsupe;":"⊒","&sqsupset;":"⊐","&sqsupseteq;":"⊒","&squ;":"□","&square;":"□","&squarf;":"▪","&squf;":"▪","&srarr;":"→","&sscr;":"𝓈","&ssetmn;":"∖","&ssmile;":"⌣","&sstarf;":"⋆","&star;":"☆","&starf;":"★","&straightepsilon;":"ϵ","&straightphi;":"ϕ","&strns;":"¯","&sub;":"⊂","&subE;":"⫅","&subdot;":"⪽","&sube;":"⊆","&subedot;":"⫃","&submult;":"⫁","&subnE;":"⫋","&subne;":"⊊","&subplus;":"⪿","&subrarr;":"⥹","&subset;":"⊂","&subseteq;":"⊆","&subseteqq;":"⫅","&subsetneq;":"⊊","&subsetneqq;":"⫋","&subsim;":"⫇","&subsub;":"⫕","&subsup;":"⫓","&succ;":"≻","&succapprox;":"⪸","&succcurlyeq;":"≽","&succeq;":"⪰","&succnapprox;":"⪺","&succneqq;":"⪶","&succnsim;":"⋩","&succsim;":"≿","&sum;":"∑","&sung;":"♪","&sup1":"¹","&sup1;":"¹","&sup2":"²","&sup2;":"²","&sup3":"³","&sup3;":"³","&sup;":"⊃","&supE;":"⫆","&supdot;":"⪾","&supdsub;":"⫘","&supe;":"⊇","&supedot;":"⫄","&suphsol;":"⟉","&suphsub;":"⫗","&suplarr;":"⥻","&supmult;":"⫂","&supnE;":"⫌","&supne;":"⊋","&supplus;":"⫀","&supset;":"⊃","&supseteq;":"⊇","&supseteqq;":"⫆","&supsetneq;":"⊋","&supsetneqq;":"⫌","&supsim;":"⫈","&supsub;":"⫔","&supsup;":"⫖","&swArr;":"⇙","&swarhk;":"⤦","&swarr;":"↙","&swarrow;":"↙","&swnwar;":"⤪","&szlig":"ß","&szlig;":"ß","&target;":"⌖","&tau;":"τ","&tbrk;":"⎴","&tcaron;":"ť","&tcedil;":"ţ","&tcy;":"т","&tdot;":"⃛","&telrec;":"⌕","&tfr;":"𝔱","&there4;":"∴","&therefore;":"∴","&theta;":"θ","&thetasym;":"ϑ","&thetav;":"ϑ","&thickapprox;":"≈","&thicksim;":"∼","&thinsp;":" ","&thkap;":"≈","&thksim;":"∼","&thorn":"þ","&thorn;":"þ","&tilde;":"˜","&times":"×","&times;":"×","&timesb;":"⊠","&timesbar;":"⨱","&timesd;":"⨰","&tint;":"∭","&toea;":"⤨","&top;":"⊤","&topbot;":"⌶","&topcir;":"⫱","&topf;":"𝕥","&topfork;":"⫚","&tosa;":"⤩","&tprime;":"‴","&trade;":"™","&triangle;":"▵","&triangledown;":"▿","&triangleleft;":"◃","&trianglelefteq;":"⊴","&triangleq;":"≜","&triangleright;":"▹","&trianglerighteq;":"⊵","&tridot;":"◬","&trie;":"≜","&triminus;":"⨺","&triplus;":"⨹","&trisb;":"⧍","&tritime;":"⨻","&trpezium;":"⏢","&tscr;":"𝓉","&tscy;":"ц","&tshcy;":"ћ","&tstrok;":"ŧ","&twixt;":"≬","&twoheadleftarrow;":"↞","&twoheadrightarrow;":"↠","&uArr;":"⇑","&uHar;":"⥣","&uacute":"ú","&uacute;":"ú","&uarr;":"↑","&ubrcy;":"ў","&ubreve;":"ŭ","&ucirc":"û","&ucirc;":"û","&ucy;":"у","&udarr;":"⇅","&udblac;":"ű","&udhar;":"⥮","&ufisht;":"⥾","&ufr;":"𝔲","&ugrave":"ù","&ugrave;":"ù","&uharl;":"↿","&uharr;":"↾","&uhblk;":"▀","&ulcorn;":"⌜","&ulcorner;":"⌜","&ulcrop;":"⌏","&ultri;":"◸","&umacr;":"ū","&uml":"¨","&uml;":"¨","&uogon;":"ų","&uopf;":"𝕦","&uparrow;":"↑","&updownarrow;":"↕","&upharpoonleft;":"↿","&upharpoonright;":"↾","&uplus;":"⊎","&upsi;":"υ","&upsih;":"ϒ","&upsilon;":"υ","&upuparrows;":"⇈","&urcorn;":"⌝","&urcorner;":"⌝","&urcrop;":"⌎","&uring;":"ů","&urtri;":"◹","&uscr;":"𝓊","&utdot;":"⋰","&utilde;":"ũ","&utri;":"▵","&utrif;":"▴","&uuarr;":"⇈","&uuml":"ü","&uuml;":"ü","&uwangle;":"⦧","&vArr;":"⇕","&vBar;":"⫨","&vBarv;":"⫩","&vDash;":"⊨","&vangrt;":"⦜","&varepsilon;":"ϵ","&varkappa;":"ϰ","&varnothing;":"∅","&varphi;":"ϕ","&varpi;":"ϖ","&varpropto;":"∝","&varr;":"↕","&varrho;":"ϱ","&varsigma;":"ς","&varsubsetneq;":"⊊︀","&varsubsetneqq;":"⫋︀","&varsupsetneq;":"⊋︀","&varsupsetneqq;":"⫌︀","&vartheta;":"ϑ","&vartriangleleft;":"⊲","&vartriangleright;":"⊳","&vcy;":"в","&vdash;":"⊢","&vee;":"∨","&veebar;":"⊻","&veeeq;":"≚","&vellip;":"⋮","&verbar;":"|","&vert;":"|","&vfr;":"𝔳","&vltri;":"⊲","&vnsub;":"⊂⃒","&vnsup;":"⊃⃒","&vopf;":"𝕧","&vprop;":"∝","&vrtri;":"⊳","&vscr;":"𝓋","&vsubnE;":"⫋︀","&vsubne;":"⊊︀","&vsupnE;":"⫌︀","&vsupne;":"⊋︀","&vzigzag;":"⦚","&wcirc;":"ŵ","&wedbar;":"⩟","&wedge;":"∧","&wedgeq;":"≙","&weierp;":"℘","&wfr;":"𝔴","&wopf;":"𝕨","&wp;":"℘","&wr;":"≀","&wreath;":"≀","&wscr;":"𝓌","&xcap;":"⋂","&xcirc;":"◯","&xcup;":"⋃","&xdtri;":"▽","&xfr;":"𝔵","&xhArr;":"⟺","&xharr;":"⟷","&xi;":"ξ","&xlArr;":"⟸","&xlarr;":"⟵","&xmap;":"⟼","&xnis;":"⋻","&xodot;":"⨀","&xopf;":"𝕩","&xoplus;":"⨁","&xotime;":"⨂","&xrArr;":"⟹","&xrarr;":"⟶","&xscr;":"𝓍","&xsqcup;":"⨆","&xuplus;":"⨄","&xutri;":"△","&xvee;":"⋁","&xwedge;":"⋀","&yacute":"ý","&yacute;":"ý","&yacy;":"я","&ycirc;":"ŷ","&ycy;":"ы","&yen":"¥","&yen;":"¥","&yfr;":"𝔶","&yicy;":"ї","&yopf;":"𝕪","&yscr;":"𝓎","&yucy;":"ю","&yuml":"ÿ","&yuml;":"ÿ","&zacute;":"ź","&zcaron;":"ž","&zcy;":"з","&zdot;":"ż","&zeetrf;":"ℨ","&zeta;":"ζ","&zfr;":"𝔷","&zhcy;":"ж","&zigrarr;":"⇝","&zopf;":"𝕫","&zscr;":"𝓏","&zwj;":"‍","&zwnj;":"‌"},characters:{"Æ":"&AElig;","&":"&amp;","Á":"&Aacute;","Ă":"&Abreve;","Â":"&Acirc;","А":"&Acy;","𝔄":"&Afr;","À":"&Agrave;","Α":"&Alpha;","Ā":"&Amacr;","⩓":"&And;","Ą":"&Aogon;","𝔸":"&Aopf;","⁡":"&af;","Å":"&angst;","𝒜":"&Ascr;","≔":"&coloneq;","Ã":"&Atilde;","Ä":"&Auml;","∖":"&ssetmn;","⫧":"&Barv;","⌆":"&doublebarwedge;","Б":"&Bcy;","∵":"&because;","ℬ":"&bernou;","Β":"&Beta;","𝔅":"&Bfr;","𝔹":"&Bopf;","˘":"&breve;","≎":"&bump;","Ч":"&CHcy;","©":"&copy;","Ć":"&Cacute;","⋒":"&Cap;","ⅅ":"&DD;","ℭ":"&Cfr;","Č":"&Ccaron;","Ç":"&Ccedil;","Ĉ":"&Ccirc;","∰":"&Cconint;","Ċ":"&Cdot;","¸":"&cedil;","·":"&middot;","Χ":"&Chi;","⊙":"&odot;","⊖":"&ominus;","⊕":"&oplus;","⊗":"&otimes;","∲":"&cwconint;","”":"&rdquor;","’":"&rsquor;","∷":"&Proportion;","⩴":"&Colone;","≡":"&equiv;","∯":"&DoubleContourIntegral;","∮":"&oint;","ℂ":"&complexes;","∐":"&coprod;","∳":"&awconint;","⨯":"&Cross;","𝒞":"&Cscr;","⋓":"&Cup;","≍":"&asympeq;","⤑":"&DDotrahd;","Ђ":"&DJcy;","Ѕ":"&DScy;","Џ":"&DZcy;","‡":"&ddagger;","↡":"&Darr;","⫤":"&DoubleLeftTee;","Ď":"&Dcaron;","Д":"&Dcy;","∇":"&nabla;","Δ":"&Delta;","𝔇":"&Dfr;","´":"&acute;","˙":"&dot;","˝":"&dblac;","`":"&grave;","˜":"&tilde;","⋄":"&diamond;","ⅆ":"&dd;","𝔻":"&Dopf;","¨":"&uml;","⃜":"&DotDot;","≐":"&esdot;","⇓":"&dArr;","⇐":"&lArr;","⇔":"&iff;","⟸":"&xlArr;","⟺":"&xhArr;","⟹":"&xrArr;","⇒":"&rArr;","⊨":"&vDash;","⇑":"&uArr;","⇕":"&vArr;","∥":"&spar;","↓":"&downarrow;","⤓":"&DownArrowBar;","⇵":"&duarr;","̑":"&DownBreve;","⥐":"&DownLeftRightVector;","⥞":"&DownLeftTeeVector;","↽":"&lhard;","⥖":"&DownLeftVectorBar;","⥟":"&DownRightTeeVector;","⇁":"&rightharpoondown;","⥗":"&DownRightVectorBar;","⊤":"&top;","↧":"&mapstodown;","𝒟":"&Dscr;","Đ":"&Dstrok;","Ŋ":"&ENG;","Ð":"&ETH;","É":"&Eacute;","Ě":"&Ecaron;","Ê":"&Ecirc;","Э":"&Ecy;","Ė":"&Edot;","𝔈":"&Efr;","È":"&Egrave;","∈":"&isinv;","Ē":"&Emacr;","◻":"&EmptySmallSquare;","▫":"&EmptyVerySmallSquare;","Ę":"&Eogon;","𝔼":"&Eopf;","Ε":"&Epsilon;","⩵":"&Equal;","≂":"&esim;","⇌":"&rlhar;","ℰ":"&expectation;","⩳":"&Esim;","Η":"&Eta;","Ë":"&Euml;","∃":"&exist;","ⅇ":"&exponentiale;","Ф":"&Fcy;","𝔉":"&Ffr;","◼":"&FilledSmallSquare;","▪":"&squf;","𝔽":"&Fopf;","∀":"&forall;","ℱ":"&Fscr;","Ѓ":"&GJcy;",">":"&gt;","Γ":"&Gamma;","Ϝ":"&Gammad;","Ğ":"&Gbreve;","Ģ":"&Gcedil;","Ĝ":"&Gcirc;","Г":"&Gcy;","Ġ":"&Gdot;","𝔊":"&Gfr;","⋙":"&ggg;","𝔾":"&Gopf;","≥":"&geq;","⋛":"&gtreqless;","≧":"&geqq;","⪢":"&GreaterGreater;","≷":"&gtrless;","⩾":"&ges;","≳":"&gtrsim;","𝒢":"&Gscr;","≫":"&gg;","Ъ":"&HARDcy;","ˇ":"&caron;","^":"&Hat;","Ĥ":"&Hcirc;","ℌ":"&Poincareplane;","ℋ":"&hamilt;","ℍ":"&quaternions;","─":"&boxh;","Ħ":"&Hstrok;","≏":"&bumpeq;","Е":"&IEcy;","Ĳ":"&IJlig;","Ё":"&IOcy;","Í":"&Iacute;","Î":"&Icirc;","И":"&Icy;","İ":"&Idot;","ℑ":"&imagpart;","Ì":"&Igrave;","Ī":"&Imacr;","ⅈ":"&ii;","∬":"&Int;","∫":"&int;","⋂":"&xcap;","⁣":"&ic;","⁢":"&it;","Į":"&Iogon;","𝕀":"&Iopf;","Ι":"&Iota;","ℐ":"&imagline;","Ĩ":"&Itilde;","І":"&Iukcy;","Ï":"&Iuml;","Ĵ":"&Jcirc;","Й":"&Jcy;","𝔍":"&Jfr;","𝕁":"&Jopf;","𝒥":"&Jscr;","Ј":"&Jsercy;","Є":"&Jukcy;","Х":"&KHcy;","Ќ":"&KJcy;","Κ":"&Kappa;","Ķ":"&Kcedil;","К":"&Kcy;","𝔎":"&Kfr;","𝕂":"&Kopf;","𝒦":"&Kscr;","Љ":"&LJcy;","<":"&lt;","Ĺ":"&Lacute;","Λ":"&Lambda;","⟪":"&Lang;","ℒ":"&lagran;","↞":"&twoheadleftarrow;","Ľ":"&Lcaron;","Ļ":"&Lcedil;","Л":"&Lcy;","⟨":"&langle;","←":"&slarr;","⇤":"&larrb;","⇆":"&lrarr;","⌈":"&lceil;","⟦":"&lobrk;","⥡":"&LeftDownTeeVector;","⇃":"&downharpoonleft;","⥙":"&LeftDownVectorBar;","⌊":"&lfloor;","↔":"&leftrightarrow;","⥎":"&LeftRightVector;","⊣":"&dashv;","↤":"&mapstoleft;","⥚":"&LeftTeeVector;","⊲":"&vltri;","⧏":"&LeftTriangleBar;","⊴":"&trianglelefteq;","⥑":"&LeftUpDownVector;","⥠":"&LeftUpTeeVector;","↿":"&upharpoonleft;","⥘":"&LeftUpVectorBar;","↼":"&lharu;","⥒":"&LeftVectorBar;","⋚":"&lesseqgtr;","≦":"&leqq;","≶":"&lg;","⪡":"&LessLess;","⩽":"&les;","≲":"&lsim;","𝔏":"&Lfr;","⋘":"&Ll;","⇚":"&lAarr;","Ŀ":"&Lmidot;","⟵":"&xlarr;","⟷":"&xharr;","⟶":"&xrarr;","𝕃":"&Lopf;","↙":"&swarrow;","↘":"&searrow;","↰":"&lsh;","Ł":"&Lstrok;","≪":"&ll;","⤅":"&Map;","М":"&Mcy;"," ":"&MediumSpace;","ℳ":"&phmmat;","𝔐":"&Mfr;","∓":"&mp;","𝕄":"&Mopf;","Μ":"&Mu;","Њ":"&NJcy;","Ń":"&Nacute;","Ň":"&Ncaron;","Ņ":"&Ncedil;","Н":"&Ncy;","​":"&ZeroWidthSpace;","\n":"&NewLine;","𝔑":"&Nfr;","⁠":"&NoBreak;"," ":"&nbsp;","ℕ":"&naturals;","⫬":"&Not;","≢":"&nequiv;","≭":"&NotCupCap;","∦":"&nspar;","∉":"&notinva;","≠":"&ne;","≂̸":"&nesim;","∄":"&nexists;","≯":"&ngtr;","≱":"&ngeq;","≧̸":"&ngeqq;","≫̸":"&nGtv;","≹":"&ntgl;","⩾̸":"&nges;","≵":"&ngsim;","≎̸":"&nbump;","≏̸":"&nbumpe;","⋪":"&ntriangleleft;","⧏̸":"&NotLeftTriangleBar;","⋬":"&ntrianglelefteq;","≮":"&nlt;","≰":"&nleq;","≸":"&ntlg;","≪̸":"&nLtv;","⩽̸":"&nles;","≴":"&nlsim;","⪢̸":"&NotNestedGreaterGreater;","⪡̸":"&NotNestedLessLess;","⊀":"&nprec;","⪯̸":"&npreceq;","⋠":"&nprcue;","∌":"&notniva;","⋫":"&ntriangleright;","⧐̸":"&NotRightTriangleBar;","⋭":"&ntrianglerighteq;","⊏̸":"&NotSquareSubset;","⋢":"&nsqsube;","⊐̸":"&NotSquareSuperset;","⋣":"&nsqsupe;","⊂⃒":"&vnsub;","⊈":"&nsubseteq;","⊁":"&nsucc;","⪰̸":"&nsucceq;","⋡":"&nsccue;","≿̸":"&NotSucceedsTilde;","⊃⃒":"&vnsup;","⊉":"&nsupseteq;","≁":"&nsim;","≄":"&nsimeq;","≇":"&ncong;","≉":"&napprox;","∤":"&nsmid;","𝒩":"&Nscr;","Ñ":"&Ntilde;","Ν":"&Nu;","Œ":"&OElig;","Ó":"&Oacute;","Ô":"&Ocirc;","О":"&Ocy;","Ő":"&Odblac;","𝔒":"&Ofr;","Ò":"&Ograve;","Ō":"&Omacr;","Ω":"&ohm;","Ο":"&Omicron;","𝕆":"&Oopf;","“":"&ldquo;","‘":"&lsquo;","⩔":"&Or;","𝒪":"&Oscr;","Ø":"&Oslash;","Õ":"&Otilde;","⨷":"&Otimes;","Ö":"&Ouml;","‾":"&oline;","⏞":"&OverBrace;","⎴":"&tbrk;","⏜":"&OverParenthesis;","∂":"&part;","П":"&Pcy;","𝔓":"&Pfr;","Φ":"&Phi;","Π":"&Pi;","±":"&pm;","ℙ":"&primes;","⪻":"&Pr;","≺":"&prec;","⪯":"&preceq;","≼":"&preccurlyeq;","≾":"&prsim;","″":"&Prime;","∏":"&prod;","∝":"&vprop;","𝒫":"&Pscr;","Ψ":"&Psi;",'"':"&quot;","𝔔":"&Qfr;","ℚ":"&rationals;","𝒬":"&Qscr;","⤐":"&drbkarow;","®":"&reg;","Ŕ":"&Racute;","⟫":"&Rang;","↠":"&twoheadrightarrow;","⤖":"&Rarrtl;","Ř":"&Rcaron;","Ŗ":"&Rcedil;","Р":"&Rcy;","ℜ":"&realpart;","∋":"&niv;","⇋":"&lrhar;","⥯":"&duhar;","Ρ":"&Rho;","⟩":"&rangle;","→":"&srarr;","⇥":"&rarrb;","⇄":"&rlarr;","⌉":"&rceil;","⟧":"&robrk;","⥝":"&RightDownTeeVector;","⇂":"&downharpoonright;","⥕":"&RightDownVectorBar;","⌋":"&rfloor;","⊢":"&vdash;","↦":"&mapsto;","⥛":"&RightTeeVector;","⊳":"&vrtri;","⧐":"&RightTriangleBar;","⊵":"&trianglerighteq;","⥏":"&RightUpDownVector;","⥜":"&RightUpTeeVector;","↾":"&upharpoonright;","⥔":"&RightUpVectorBar;","⇀":"&rightharpoonup;","⥓":"&RightVectorBar;","ℝ":"&reals;","⥰":"&RoundImplies;","⇛":"&rAarr;","ℛ":"&realine;","↱":"&rsh;","⧴":"&RuleDelayed;","Щ":"&SHCHcy;","Ш":"&SHcy;","Ь":"&SOFTcy;","Ś":"&Sacute;","⪼":"&Sc;","Š":"&Scaron;","Ş":"&Scedil;","Ŝ":"&Scirc;","С":"&Scy;","𝔖":"&Sfr;","↑":"&uparrow;","Σ":"&Sigma;","∘":"&compfn;","𝕊":"&Sopf;","√":"&radic;","□":"&square;","⊓":"&sqcap;","⊏":"&sqsubset;","⊑":"&sqsubseteq;","⊐":"&sqsupset;","⊒":"&sqsupseteq;","⊔":"&sqcup;","𝒮":"&Sscr;","⋆":"&sstarf;","⋐":"&Subset;","⊆":"&subseteq;","≻":"&succ;","⪰":"&succeq;","≽":"&succcurlyeq;","≿":"&succsim;","∑":"&sum;","⋑":"&Supset;","⊃":"&supset;","⊇":"&supseteq;","Þ":"&THORN;","™":"&trade;","Ћ":"&TSHcy;","Ц":"&TScy;","\t":"&Tab;","Τ":"&Tau;","Ť":"&Tcaron;","Ţ":"&Tcedil;","Т":"&Tcy;","𝔗":"&Tfr;","∴":"&therefore;","Θ":"&Theta;","  ":"&ThickSpace;"," ":"&thinsp;","∼":"&thksim;","≃":"&simeq;","≅":"&cong;","≈":"&thkap;","𝕋":"&Topf;","⃛":"&tdot;","𝒯":"&Tscr;","Ŧ":"&Tstrok;","Ú":"&Uacute;","↟":"&Uarr;","⥉":"&Uarrocir;","Ў":"&Ubrcy;","Ŭ":"&Ubreve;","Û":"&Ucirc;","У":"&Ucy;","Ű":"&Udblac;","𝔘":"&Ufr;","Ù":"&Ugrave;","Ū":"&Umacr;",_:"&lowbar;","⏟":"&UnderBrace;","⎵":"&bbrk;","⏝":"&UnderParenthesis;","⋃":"&xcup;","⊎":"&uplus;","Ų":"&Uogon;","𝕌":"&Uopf;","⤒":"&UpArrowBar;","⇅":"&udarr;","↕":"&varr;","⥮":"&udhar;","⊥":"&perp;","↥":"&mapstoup;","↖":"&nwarrow;","↗":"&nearrow;","ϒ":"&upsih;","Υ":"&Upsilon;","Ů":"&Uring;","𝒰":"&Uscr;","Ũ":"&Utilde;","Ü":"&Uuml;","⊫":"&VDash;","⫫":"&Vbar;","В":"&Vcy;","⊩":"&Vdash;","⫦":"&Vdashl;","⋁":"&xvee;","‖":"&Vert;","∣":"&smid;","|":"&vert;","❘":"&VerticalSeparator;","≀":"&wreath;"," ":"&hairsp;","𝔙":"&Vfr;","𝕍":"&Vopf;","𝒱":"&Vscr;","⊪":"&Vvdash;","Ŵ":"&Wcirc;","⋀":"&xwedge;","𝔚":"&Wfr;","𝕎":"&Wopf;","𝒲":"&Wscr;","𝔛":"&Xfr;","Ξ":"&Xi;","𝕏":"&Xopf;","𝒳":"&Xscr;","Я":"&YAcy;","Ї":"&YIcy;","Ю":"&YUcy;","Ý":"&Yacute;","Ŷ":"&Ycirc;","Ы":"&Ycy;","𝔜":"&Yfr;","𝕐":"&Yopf;","𝒴":"&Yscr;","Ÿ":"&Yuml;","Ж":"&ZHcy;","Ź":"&Zacute;","Ž":"&Zcaron;","З":"&Zcy;","Ż":"&Zdot;","Ζ":"&Zeta;","ℨ":"&zeetrf;","ℤ":"&integers;","𝒵":"&Zscr;","á":"&aacute;","ă":"&abreve;","∾":"&mstpos;","∾̳":"&acE;","∿":"&acd;","â":"&acirc;","а":"&acy;","æ":"&aelig;","𝔞":"&afr;","à":"&agrave;","ℵ":"&aleph;","α":"&alpha;","ā":"&amacr;","⨿":"&amalg;","∧":"&wedge;","⩕":"&andand;","⩜":"&andd;","⩘":"&andslope;","⩚":"&andv;","∠":"&angle;","⦤":"&ange;","∡":"&measuredangle;","⦨":"&angmsdaa;","⦩":"&angmsdab;","⦪":"&angmsdac;","⦫":"&angmsdad;","⦬":"&angmsdae;","⦭":"&angmsdaf;","⦮":"&angmsdag;","⦯":"&angmsdah;","∟":"&angrt;","⊾":"&angrtvb;","⦝":"&angrtvbd;","∢":"&angsph;","⍼":"&angzarr;","ą":"&aogon;","𝕒":"&aopf;","⩰":"&apE;","⩯":"&apacir;","≊":"&approxeq;","≋":"&apid;","'":"&apos;","å":"&aring;","𝒶":"&ascr;","*":"&midast;","ã":"&atilde;","ä":"&auml;","⨑":"&awint;","⫭":"&bNot;","≌":"&bcong;","϶":"&bepsi;","‵":"&bprime;","∽":"&bsim;","⋍":"&bsime;","⊽":"&barvee;","⌅":"&barwedge;","⎶":"&bbrktbrk;","б":"&bcy;","„":"&ldquor;","⦰":"&bemptyv;","β":"&beta;","ℶ":"&beth;","≬":"&twixt;","𝔟":"&bfr;","◯":"&xcirc;","⨀":"&xodot;","⨁":"&xoplus;","⨂":"&xotime;","⨆":"&xsqcup;","★":"&starf;","▽":"&xdtri;","△":"&xutri;","⨄":"&xuplus;","⤍":"&rbarr;","⧫":"&lozf;","▴":"&utrif;","▾":"&dtrif;","◂":"&ltrif;","▸":"&rtrif;","␣":"&blank;","▒":"&blk12;","░":"&blk14;","▓":"&blk34;","█":"&block;","=⃥":"&bne;","≡⃥":"&bnequiv;","⌐":"&bnot;","𝕓":"&bopf;","⋈":"&bowtie;","╗":"&boxDL;","╔":"&boxDR;","╖":"&boxDl;","╓":"&boxDr;","═":"&boxH;","╦":"&boxHD;","╩":"&boxHU;","╤":"&boxHd;","╧":"&boxHu;","╝":"&boxUL;","╚":"&boxUR;","╜":"&boxUl;","╙":"&boxUr;","║":"&boxV;","╬":"&boxVH;","╣":"&boxVL;","╠":"&boxVR;","╫":"&boxVh;","╢":"&boxVl;","╟":"&boxVr;","⧉":"&boxbox;","╕":"&boxdL;","╒":"&boxdR;","┐":"&boxdl;","┌":"&boxdr;","╥":"&boxhD;","╨":"&boxhU;","┬":"&boxhd;","┴":"&boxhu;","⊟":"&minusb;","⊞":"&plusb;","⊠":"&timesb;","╛":"&boxuL;","╘":"&boxuR;","┘":"&boxul;","└":"&boxur;","│":"&boxv;","╪":"&boxvH;","╡":"&boxvL;","╞":"&boxvR;","┼":"&boxvh;","┤":"&boxvl;","├":"&boxvr;","¦":"&brvbar;","𝒷":"&bscr;","⁏":"&bsemi;","\\":"&bsol;","⧅":"&bsolb;","⟈":"&bsolhsub;","•":"&bullet;","⪮":"&bumpE;","ć":"&cacute;","∩":"&cap;","⩄":"&capand;","⩉":"&capbrcup;","⩋":"&capcap;","⩇":"&capcup;","⩀":"&capdot;","∩︀":"&caps;","⁁":"&caret;","⩍":"&ccaps;","č":"&ccaron;","ç":"&ccedil;","ĉ":"&ccirc;","⩌":"&ccups;","⩐":"&ccupssm;","ċ":"&cdot;","⦲":"&cemptyv;","¢":"&cent;","𝔠":"&cfr;","ч":"&chcy;","✓":"&checkmark;","χ":"&chi;","○":"&cir;","⧃":"&cirE;","ˆ":"&circ;","≗":"&cire;","↺":"&olarr;","↻":"&orarr;","Ⓢ":"&oS;","⊛":"&oast;","⊚":"&ocir;","⊝":"&odash;","⨐":"&cirfnint;","⫯":"&cirmid;","⧂":"&cirscir;","♣":"&clubsuit;",":":"&colon;",",":"&comma;","@":"&commat;","∁":"&complement;","⩭":"&congdot;","𝕔":"&copf;","℗":"&copysr;","↵":"&crarr;","✗":"&cross;","𝒸":"&cscr;","⫏":"&csub;","⫑":"&csube;","⫐":"&csup;","⫒":"&csupe;","⋯":"&ctdot;","⤸":"&cudarrl;","⤵":"&cudarrr;","⋞":"&curlyeqprec;","⋟":"&curlyeqsucc;","↶":"&curvearrowleft;","⤽":"&cularrp;","∪":"&cup;","⩈":"&cupbrcap;","⩆":"&cupcap;","⩊":"&cupcup;","⊍":"&cupdot;","⩅":"&cupor;","∪︀":"&cups;","↷":"&curvearrowright;","⤼":"&curarrm;","⋎":"&cuvee;","⋏":"&cuwed;","¤":"&curren;","∱":"&cwint;","⌭":"&cylcty;","⥥":"&dHar;","†":"&dagger;","ℸ":"&daleth;","‐":"&hyphen;","⤏":"&rBarr;","ď":"&dcaron;","д":"&dcy;","⇊":"&downdownarrows;","⩷":"&eDDot;","°":"&deg;","δ":"&delta;","⦱":"&demptyv;","⥿":"&dfisht;","𝔡":"&dfr;","♦":"&diams;","ϝ":"&gammad;","⋲":"&disin;","÷":"&divide;","⋇":"&divonx;","ђ":"&djcy;","⌞":"&llcorner;","⌍":"&dlcrop;",$:"&dollar;","𝕕":"&dopf;","≑":"&eDot;","∸":"&minusd;","∔":"&plusdo;","⊡":"&sdotb;","⌟":"&lrcorner;","⌌":"&drcrop;","𝒹":"&dscr;","ѕ":"&dscy;","⧶":"&dsol;","đ":"&dstrok;","⋱":"&dtdot;","▿":"&triangledown;","⦦":"&dwangle;","џ":"&dzcy;","⟿":"&dzigrarr;","é":"&eacute;","⩮":"&easter;","ě":"&ecaron;","≖":"&eqcirc;","ê":"&ecirc;","≕":"&eqcolon;","э":"&ecy;","ė":"&edot;","≒":"&fallingdotseq;","𝔢":"&efr;","⪚":"&eg;","è":"&egrave;","⪖":"&eqslantgtr;","⪘":"&egsdot;","⪙":"&el;","⏧":"&elinters;","ℓ":"&ell;","⪕":"&eqslantless;","⪗":"&elsdot;","ē":"&emacr;","∅":"&varnothing;"," ":"&emsp13;"," ":"&emsp14;"," ":"&emsp;","ŋ":"&eng;"," ":"&ensp;","ę":"&eogon;","𝕖":"&eopf;","⋕":"&epar;","⧣":"&eparsl;","⩱":"&eplus;","ε":"&epsilon;","ϵ":"&varepsilon;","=":"&equals;","≟":"&questeq;","⩸":"&equivDD;","⧥":"&eqvparsl;","≓":"&risingdotseq;","⥱":"&erarr;","ℯ":"&escr;","η":"&eta;","ð":"&eth;","ë":"&euml;","€":"&euro;","!":"&excl;","ф":"&fcy;","♀":"&female;","ﬃ":"&ffilig;","ﬀ":"&fflig;","ﬄ":"&ffllig;","𝔣":"&ffr;","ﬁ":"&filig;",fj:"&fjlig;","♭":"&flat;","ﬂ":"&fllig;","▱":"&fltns;","ƒ":"&fnof;","𝕗":"&fopf;","⋔":"&pitchfork;","⫙":"&forkv;","⨍":"&fpartint;","½":"&half;","⅓":"&frac13;","¼":"&frac14;","⅕":"&frac15;","⅙":"&frac16;","⅛":"&frac18;","⅔":"&frac23;","⅖":"&frac25;","¾":"&frac34;","⅗":"&frac35;","⅜":"&frac38;","⅘":"&frac45;","⅚":"&frac56;","⅝":"&frac58;","⅞":"&frac78;","⁄":"&frasl;","⌢":"&sfrown;","𝒻":"&fscr;","⪌":"&gtreqqless;","ǵ":"&gacute;","γ":"&gamma;","⪆":"&gtrapprox;","ğ":"&gbreve;","ĝ":"&gcirc;","г":"&gcy;","ġ":"&gdot;","⪩":"&gescc;","⪀":"&gesdot;","⪂":"&gesdoto;","⪄":"&gesdotol;","⋛︀":"&gesl;","⪔":"&gesles;","𝔤":"&gfr;","ℷ":"&gimel;","ѓ":"&gjcy;","⪒":"&glE;","⪥":"&gla;","⪤":"&glj;","≩":"&gneqq;","⪊":"&gnapprox;","⪈":"&gneq;","⋧":"&gnsim;","𝕘":"&gopf;","ℊ":"&gscr;","⪎":"&gsime;","⪐":"&gsiml;","⪧":"&gtcc;","⩺":"&gtcir;","⋗":"&gtrdot;","⦕":"&gtlPar;","⩼":"&gtquest;","⥸":"&gtrarr;","≩︀":"&gvnE;","ъ":"&hardcy;","⥈":"&harrcir;","↭":"&leftrightsquigarrow;","ℏ":"&plankv;","ĥ":"&hcirc;","♥":"&heartsuit;","…":"&mldr;","⊹":"&hercon;","𝔥":"&hfr;","⤥":"&searhk;","⤦":"&swarhk;","⇿":"&hoarr;","∻":"&homtht;","↩":"&larrhk;","↪":"&rarrhk;","𝕙":"&hopf;","―":"&horbar;","𝒽":"&hscr;","ħ":"&hstrok;","⁃":"&hybull;","í":"&iacute;","î":"&icirc;","и":"&icy;","е":"&iecy;","¡":"&iexcl;","𝔦":"&ifr;","ì":"&igrave;","⨌":"&qint;","∭":"&tint;","⧜":"&iinfin;","℩":"&iiota;","ĳ":"&ijlig;","ī":"&imacr;","ı":"&inodot;","⊷":"&imof;","Ƶ":"&imped;","℅":"&incare;","∞":"&infin;","⧝":"&infintie;","⊺":"&intercal;","⨗":"&intlarhk;","⨼":"&iprod;","ё":"&iocy;","į":"&iogon;","𝕚":"&iopf;","ι":"&iota;","¿":"&iquest;","𝒾":"&iscr;","⋹":"&isinE;","⋵":"&isindot;","⋴":"&isins;","⋳":"&isinsv;","ĩ":"&itilde;","і":"&iukcy;","ï":"&iuml;","ĵ":"&jcirc;","й":"&jcy;","𝔧":"&jfr;","ȷ":"&jmath;","𝕛":"&jopf;","𝒿":"&jscr;","ј":"&jsercy;","є":"&jukcy;","κ":"&kappa;","ϰ":"&varkappa;","ķ":"&kcedil;","к":"&kcy;","𝔨":"&kfr;","ĸ":"&kgreen;","х":"&khcy;","ќ":"&kjcy;","𝕜":"&kopf;","𝓀":"&kscr;","⤛":"&lAtail;","⤎":"&lBarr;","⪋":"&lesseqqgtr;","⥢":"&lHar;","ĺ":"&lacute;","⦴":"&laemptyv;","λ":"&lambda;","⦑":"&langd;","⪅":"&lessapprox;","«":"&laquo;","⤟":"&larrbfs;","⤝":"&larrfs;","↫":"&looparrowleft;","⤹":"&larrpl;","⥳":"&larrsim;","↢":"&leftarrowtail;","⪫":"&lat;","⤙":"&latail;","⪭":"&late;","⪭︀":"&lates;","⤌":"&lbarr;","❲":"&lbbrk;","{":"&lcub;","[":"&lsqb;","⦋":"&lbrke;","⦏":"&lbrksld;","⦍":"&lbrkslu;","ľ":"&lcaron;","ļ":"&lcedil;","л":"&lcy;","⤶":"&ldca;","⥧":"&ldrdhar;","⥋":"&ldrushar;","↲":"&ldsh;","≤":"&leq;","⇇":"&llarr;","⋋":"&lthree;","⪨":"&lescc;","⩿":"&lesdot;","⪁":"&lesdoto;","⪃":"&lesdotor;","⋚︀":"&lesg;","⪓":"&lesges;","⋖":"&ltdot;","⥼":"&lfisht;","𝔩":"&lfr;","⪑":"&lgE;","⥪":"&lharul;","▄":"&lhblk;","љ":"&ljcy;","⥫":"&llhard;","◺":"&lltri;","ŀ":"&lmidot;","⎰":"&lmoustache;","≨":"&lneqq;","⪉":"&lnapprox;","⪇":"&lneq;","⋦":"&lnsim;","⟬":"&loang;","⇽":"&loarr;","⟼":"&xmap;","↬":"&rarrlp;","⦅":"&lopar;","𝕝":"&lopf;","⨭":"&loplus;","⨴":"&lotimes;","∗":"&lowast;","◊":"&lozenge;","(":"&lpar;","⦓":"&lparlt;","⥭":"&lrhard;","‎":"&lrm;","⊿":"&lrtri;","‹":"&lsaquo;","𝓁":"&lscr;","⪍":"&lsime;","⪏":"&lsimg;","‚":"&sbquo;","ł":"&lstrok;","⪦":"&ltcc;","⩹":"&ltcir;","⋉":"&ltimes;","⥶":"&ltlarr;","⩻":"&ltquest;","⦖":"&ltrPar;","◃":"&triangleleft;","⥊":"&lurdshar;","⥦":"&luruhar;","≨︀":"&lvnE;","∺":"&mDDot;","¯":"&strns;","♂":"&male;","✠":"&maltese;","▮":"&marker;","⨩":"&mcomma;","м":"&mcy;","—":"&mdash;","𝔪":"&mfr;","℧":"&mho;","µ":"&micro;","⫰":"&midcir;","−":"&minus;","⨪":"&minusdu;","⫛":"&mlcp;","⊧":"&models;","𝕞":"&mopf;","𝓂":"&mscr;","μ":"&mu;","⊸":"&mumap;","⋙̸":"&nGg;","≫⃒":"&nGt;","⇍":"&nlArr;","⇎":"&nhArr;","⋘̸":"&nLl;","≪⃒":"&nLt;","⇏":"&nrArr;","⊯":"&nVDash;","⊮":"&nVdash;","ń":"&nacute;","∠⃒":"&nang;","⩰̸":"&napE;","≋̸":"&napid;","ŉ":"&napos;","♮":"&natural;","⩃":"&ncap;","ň":"&ncaron;","ņ":"&ncedil;","⩭̸":"&ncongdot;","⩂":"&ncup;","н":"&ncy;","–":"&ndash;","⇗":"&neArr;","⤤":"&nearhk;","≐̸":"&nedot;","⤨":"&toea;","𝔫":"&nfr;","↮":"&nleftrightarrow;","⫲":"&nhpar;","⋼":"&nis;","⋺":"&nisd;","њ":"&njcy;","≦̸":"&nleqq;","↚":"&nleftarrow;","‥":"&nldr;","𝕟":"&nopf;","¬":"&not;","⋹̸":"&notinE;","⋵̸":"&notindot;","⋷":"&notinvb;","⋶":"&notinvc;","⋾":"&notnivb;","⋽":"&notnivc;","⫽⃥":"&nparsl;","∂̸":"&npart;","⨔":"&npolint;","↛":"&nrightarrow;","⤳̸":"&nrarrc;","↝̸":"&nrarrw;","𝓃":"&nscr;","⊄":"&nsub;","⫅̸":"&nsubseteqq;","⊅":"&nsup;","⫆̸":"&nsupseteqq;","ñ":"&ntilde;","ν":"&nu;","#":"&num;","№":"&numero;"," ":"&numsp;","⊭":"&nvDash;","⤄":"&nvHarr;","≍⃒":"&nvap;","⊬":"&nvdash;","≥⃒":"&nvge;",">⃒":"&nvgt;","⧞":"&nvinfin;","⤂":"&nvlArr;","≤⃒":"&nvle;","<⃒":"&nvlt;","⊴⃒":"&nvltrie;","⤃":"&nvrArr;","⊵⃒":"&nvrtrie;","∼⃒":"&nvsim;","⇖":"&nwArr;","⤣":"&nwarhk;","⤧":"&nwnear;","ó":"&oacute;","ô":"&ocirc;","о":"&ocy;","ő":"&odblac;","⨸":"&odiv;","⦼":"&odsold;","œ":"&oelig;","⦿":"&ofcir;","𝔬":"&ofr;","˛":"&ogon;","ò":"&ograve;","⧁":"&ogt;","⦵":"&ohbar;","⦾":"&olcir;","⦻":"&olcross;","⧀":"&olt;","ō":"&omacr;","ω":"&omega;","ο":"&omicron;","⦶":"&omid;","𝕠":"&oopf;","⦷":"&opar;","⦹":"&operp;","∨":"&vee;","⩝":"&ord;","ℴ":"&oscr;","ª":"&ordf;","º":"&ordm;","⊶":"&origof;","⩖":"&oror;","⩗":"&orslope;","⩛":"&orv;","ø":"&oslash;","⊘":"&osol;","õ":"&otilde;","⨶":"&otimesas;","ö":"&ouml;","⌽":"&ovbar;","¶":"&para;","⫳":"&parsim;","⫽":"&parsl;","п":"&pcy;","%":"&percnt;",".":"&period;","‰":"&permil;","‱":"&pertenk;","𝔭":"&pfr;","φ":"&phi;","ϕ":"&varphi;","☎":"&phone;","π":"&pi;","ϖ":"&varpi;","ℎ":"&planckh;","+":"&plus;","⨣":"&plusacir;","⨢":"&pluscir;","⨥":"&plusdu;","⩲":"&pluse;","⨦":"&plussim;","⨧":"&plustwo;","⨕":"&pointint;","𝕡":"&popf;","£":"&pound;","⪳":"&prE;","⪷":"&precapprox;","⪹":"&prnap;","⪵":"&prnE;","⋨":"&prnsim;","′":"&prime;","⌮":"&profalar;","⌒":"&profline;","⌓":"&profsurf;","⊰":"&prurel;","𝓅":"&pscr;","ψ":"&psi;"," ":"&puncsp;","𝔮":"&qfr;","𝕢":"&qopf;","⁗":"&qprime;","𝓆":"&qscr;","⨖":"&quatint;","?":"&quest;","⤜":"&rAtail;","⥤":"&rHar;","∽̱":"&race;","ŕ":"&racute;","⦳":"&raemptyv;","⦒":"&rangd;","⦥":"&range;","»":"&raquo;","⥵":"&rarrap;","⤠":"&rarrbfs;","⤳":"&rarrc;","⤞":"&rarrfs;","⥅":"&rarrpl;","⥴":"&rarrsim;","↣":"&rightarrowtail;","↝":"&rightsquigarrow;","⤚":"&ratail;","∶":"&ratio;","❳":"&rbbrk;","}":"&rcub;","]":"&rsqb;","⦌":"&rbrke;","⦎":"&rbrksld;","⦐":"&rbrkslu;","ř":"&rcaron;","ŗ":"&rcedil;","р":"&rcy;","⤷":"&rdca;","⥩":"&rdldhar;","↳":"&rdsh;","▭":"&rect;","⥽":"&rfisht;","𝔯":"&rfr;","⥬":"&rharul;","ρ":"&rho;","ϱ":"&varrho;","⇉":"&rrarr;","⋌":"&rthree;","˚":"&ring;","‏":"&rlm;","⎱":"&rmoustache;","⫮":"&rnmid;","⟭":"&roang;","⇾":"&roarr;","⦆":"&ropar;","𝕣":"&ropf;","⨮":"&roplus;","⨵":"&rotimes;",")":"&rpar;","⦔":"&rpargt;","⨒":"&rppolint;","›":"&rsaquo;","𝓇":"&rscr;","⋊":"&rtimes;","▹":"&triangleright;","⧎":"&rtriltri;","⥨":"&ruluhar;","℞":"&rx;","ś":"&sacute;","⪴":"&scE;","⪸":"&succapprox;","š":"&scaron;","ş":"&scedil;","ŝ":"&scirc;","⪶":"&succneqq;","⪺":"&succnapprox;","⋩":"&succnsim;","⨓":"&scpolint;","с":"&scy;","⋅":"&sdot;","⩦":"&sdote;","⇘":"&seArr;","§":"&sect;",";":"&semi;","⤩":"&tosa;","✶":"&sext;","𝔰":"&sfr;","♯":"&sharp;","щ":"&shchcy;","ш":"&shcy;","­":"&shy;","σ":"&sigma;","ς":"&varsigma;","⩪":"&simdot;","⪞":"&simg;","⪠":"&simgE;","⪝":"&siml;","⪟":"&simlE;","≆":"&simne;","⨤":"&simplus;","⥲":"&simrarr;","⨳":"&smashp;","⧤":"&smeparsl;","⌣":"&ssmile;","⪪":"&smt;","⪬":"&smte;","⪬︀":"&smtes;","ь":"&softcy;","/":"&sol;","⧄":"&solb;","⌿":"&solbar;","𝕤":"&sopf;","♠":"&spadesuit;","⊓︀":"&sqcaps;","⊔︀":"&sqcups;","𝓈":"&sscr;","☆":"&star;","⊂":"&subset;","⫅":"&subseteqq;","⪽":"&subdot;","⫃":"&subedot;","⫁":"&submult;","⫋":"&subsetneqq;","⊊":"&subsetneq;","⪿":"&subplus;","⥹":"&subrarr;","⫇":"&subsim;","⫕":"&subsub;","⫓":"&subsup;","♪":"&sung;","¹":"&sup1;","²":"&sup2;","³":"&sup3;","⫆":"&supseteqq;","⪾":"&supdot;","⫘":"&supdsub;","⫄":"&supedot;","⟉":"&suphsol;","⫗":"&suphsub;","⥻":"&suplarr;","⫂":"&supmult;","⫌":"&supsetneqq;","⊋":"&supsetneq;","⫀":"&supplus;","⫈":"&supsim;","⫔":"&supsub;","⫖":"&supsup;","⇙":"&swArr;","⤪":"&swnwar;","ß":"&szlig;","⌖":"&target;","τ":"&tau;","ť":"&tcaron;","ţ":"&tcedil;","т":"&tcy;","⌕":"&telrec;","𝔱":"&tfr;","θ":"&theta;","ϑ":"&vartheta;","þ":"&thorn;","×":"&times;","⨱":"&timesbar;","⨰":"&timesd;","⌶":"&topbot;","⫱":"&topcir;","𝕥":"&topf;","⫚":"&topfork;","‴":"&tprime;","▵":"&utri;","≜":"&trie;","◬":"&tridot;","⨺":"&triminus;","⨹":"&triplus;","⧍":"&trisb;","⨻":"&tritime;","⏢":"&trpezium;","𝓉":"&tscr;","ц":"&tscy;","ћ":"&tshcy;","ŧ":"&tstrok;","⥣":"&uHar;","ú":"&uacute;","ў":"&ubrcy;","ŭ":"&ubreve;","û":"&ucirc;","у":"&ucy;","ű":"&udblac;","⥾":"&ufisht;","𝔲":"&ufr;","ù":"&ugrave;","▀":"&uhblk;","⌜":"&ulcorner;","⌏":"&ulcrop;","◸":"&ultri;","ū":"&umacr;","ų":"&uogon;","𝕦":"&uopf;","υ":"&upsilon;","⇈":"&uuarr;","⌝":"&urcorner;","⌎":"&urcrop;","ů":"&uring;","◹":"&urtri;","𝓊":"&uscr;","⋰":"&utdot;","ũ":"&utilde;","ü":"&uuml;","⦧":"&uwangle;","⫨":"&vBar;","⫩":"&vBarv;","⦜":"&vangrt;","⊊︀":"&vsubne;","⫋︀":"&vsubnE;","⊋︀":"&vsupne;","⫌︀":"&vsupnE;","в":"&vcy;","⊻":"&veebar;","≚":"&veeeq;","⋮":"&vellip;","𝔳":"&vfr;","𝕧":"&vopf;","𝓋":"&vscr;","⦚":"&vzigzag;","ŵ":"&wcirc;","⩟":"&wedbar;","≙":"&wedgeq;","℘":"&wp;","𝔴":"&wfr;","𝕨":"&wopf;","𝓌":"&wscr;","𝔵":"&xfr;","ξ":"&xi;","⋻":"&xnis;","𝕩":"&xopf;","𝓍":"&xscr;","ý":"&yacute;","я":"&yacy;","ŷ":"&ycirc;","ы":"&ycy;","¥":"&yen;","𝔶":"&yfr;","ї":"&yicy;","𝕪":"&yopf;","𝓎":"&yscr;","ю":"&yucy;","ÿ":"&yuml;","ź":"&zacute;","ž":"&zcaron;","з":"&zcy;","ż":"&zdot;","ζ":"&zeta;","𝔷":"&zfr;","ж":"&zhcy;","⇝":"&zigrarr;","𝕫":"&zopf;","𝓏":"&zscr;","‍":"&zwj;","‌":"&zwnj;"}}};

/***/ }),

/***/ "./node_modules/html-entities/lib/numeric-unicode-map.js":
/*!***************************************************************!*\
  !*** ./node_modules/html-entities/lib/numeric-unicode-map.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.numericUnicodeMap={0:65533,128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376};

/***/ }),

/***/ "./node_modules/html-entities/lib/surrogate-pairs.js":
/*!***********************************************************!*\
  !*** ./node_modules/html-entities/lib/surrogate-pairs.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.fromCodePoint=String.fromCodePoint||function(astralCodePoint){return String.fromCharCode(Math.floor((astralCodePoint-65536)/1024)+55296,(astralCodePoint-65536)%1024+56320)};exports.getCodePoint=String.prototype.codePointAt?function(input,position){return input.codePointAt(position)}:function(input,position){return(input.charCodeAt(position)-55296)*1024+input.charCodeAt(position+1)-56320+65536};exports.highSurrogateFrom=55296;exports.highSurrogateTo=56319;

/***/ }),

/***/ "./node_modules/imagesloaded/imagesloaded.js":
/*!***************************************************!*\
  !*** ./node_modules/imagesloaded/imagesloaded.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
 * imagesLoaded v5.0.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

( function( window, factory ) {
  // universal module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory( window, __webpack_require__(/*! ev-emitter */ "./node_modules/ev-emitter/ev-emitter.js") );
  } else {
    // browser global
    window.imagesLoaded = factory( window, window.EvEmitter );
  }

} )( typeof window !== 'undefined' ? window : this,
    function factory( window, EvEmitter ) {

let $ = window.jQuery;
let console = window.console;

// -------------------------- helpers -------------------------- //

// turn element or nodeList into an array
function makeArray( obj ) {
  // use object if already an array
  if ( Array.isArray( obj ) ) return obj;

  let isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  // convert nodeList to array
  if ( isArrayLike ) return [ ...obj ];

  // array of single index
  return [ obj ];
}

// -------------------------- imagesLoaded -------------------------- //

/**
 * @param {[Array, Element, NodeList, String]} elem
 * @param {[Object, Function]} options - if function, use as callback
 * @param {Function} onAlways - callback function
 * @returns {ImagesLoaded}
 */
function ImagesLoaded( elem, options, onAlways ) {
  // coerce ImagesLoaded() without new, to be new ImagesLoaded()
  if ( !( this instanceof ImagesLoaded ) ) {
    return new ImagesLoaded( elem, options, onAlways );
  }
  // use elem as selector string
  let queryElem = elem;
  if ( typeof elem == 'string' ) {
    queryElem = document.querySelectorAll( elem );
  }
  // bail if bad element
  if ( !queryElem ) {
    console.error(`Bad element for imagesLoaded ${queryElem || elem}`);
    return;
  }

  this.elements = makeArray( queryElem );
  this.options = {};
  // shift arguments if no options set
  if ( typeof options == 'function' ) {
    onAlways = options;
  } else {
    Object.assign( this.options, options );
  }

  if ( onAlways ) this.on( 'always', onAlways );

  this.getImages();
  // add jQuery Deferred object
  if ( $ ) this.jqDeferred = new $.Deferred();

  // HACK check async to allow time to bind listeners
  setTimeout( this.check.bind( this ) );
}

ImagesLoaded.prototype = Object.create( EvEmitter.prototype );

ImagesLoaded.prototype.getImages = function() {
  this.images = [];

  // filter & find items if we have an item selector
  this.elements.forEach( this.addElementImages, this );
};

const elementNodeTypes = [ 1, 9, 11 ];

/**
 * @param {Node} elem
 */
ImagesLoaded.prototype.addElementImages = function( elem ) {
  // filter siblings
  if ( elem.nodeName === 'IMG' ) {
    this.addImage( elem );
  }
  // get background image on element
  if ( this.options.background === true ) {
    this.addElementBackgroundImages( elem );
  }

  // find children
  // no non-element nodes, #143
  let { nodeType } = elem;
  if ( !nodeType || !elementNodeTypes.includes( nodeType ) ) return;

  let childImgs = elem.querySelectorAll('img');
  // concat childElems to filterFound array
  for ( let img of childImgs ) {
    this.addImage( img );
  }

  // get child background images
  if ( typeof this.options.background == 'string' ) {
    let children = elem.querySelectorAll( this.options.background );
    for ( let child of children ) {
      this.addElementBackgroundImages( child );
    }
  }
};

const reURL = /url\((['"])?(.*?)\1\)/gi;

ImagesLoaded.prototype.addElementBackgroundImages = function( elem ) {
  let style = getComputedStyle( elem );
  // Firefox returns null if in a hidden iframe https://bugzil.la/548397
  if ( !style ) return;

  // get url inside url("...")
  let matches = reURL.exec( style.backgroundImage );
  while ( matches !== null ) {
    let url = matches && matches[2];
    if ( url ) {
      this.addBackground( url, elem );
    }
    matches = reURL.exec( style.backgroundImage );
  }
};

/**
 * @param {Image} img
 */
ImagesLoaded.prototype.addImage = function( img ) {
  let loadingImage = new LoadingImage( img );
  this.images.push( loadingImage );
};

ImagesLoaded.prototype.addBackground = function( url, elem ) {
  let background = new Background( url, elem );
  this.images.push( background );
};

ImagesLoaded.prototype.check = function() {
  this.progressedCount = 0;
  this.hasAnyBroken = false;
  // complete if no images
  if ( !this.images.length ) {
    this.complete();
    return;
  }

  /* eslint-disable-next-line func-style */
  let onProgress = ( image, elem, message ) => {
    // HACK - Chrome triggers event before object properties have changed. #83
    setTimeout( () => {
      this.progress( image, elem, message );
    } );
  };

  this.images.forEach( function( loadingImage ) {
    loadingImage.once( 'progress', onProgress );
    loadingImage.check();
  } );
};

ImagesLoaded.prototype.progress = function( image, elem, message ) {
  this.progressedCount++;
  this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
  // progress event
  this.emitEvent( 'progress', [ this, image, elem ] );
  if ( this.jqDeferred && this.jqDeferred.notify ) {
    this.jqDeferred.notify( this, image );
  }
  // check if completed
  if ( this.progressedCount === this.images.length ) {
    this.complete();
  }

  if ( this.options.debug && console ) {
    console.log( `progress: ${message}`, image, elem );
  }
};

ImagesLoaded.prototype.complete = function() {
  let eventName = this.hasAnyBroken ? 'fail' : 'done';
  this.isComplete = true;
  this.emitEvent( eventName, [ this ] );
  this.emitEvent( 'always', [ this ] );
  if ( this.jqDeferred ) {
    let jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
    this.jqDeferred[ jqMethod ]( this );
  }
};

// --------------------------  -------------------------- //

function LoadingImage( img ) {
  this.img = img;
}

LoadingImage.prototype = Object.create( EvEmitter.prototype );

LoadingImage.prototype.check = function() {
  // If complete is true and browser supports natural sizes,
  // try to check for image status manually.
  let isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    // report based on naturalWidth
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    return;
  }

  // If none of the checks above matched, simulate loading on detached element.
  this.proxyImage = new Image();
  // add crossOrigin attribute. #204
  if ( this.img.crossOrigin ) {
    this.proxyImage.crossOrigin = this.img.crossOrigin;
  }
  this.proxyImage.addEventListener( 'load', this );
  this.proxyImage.addEventListener( 'error', this );
  // bind to image as well for Firefox. #191
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.proxyImage.src = this.img.currentSrc || this.img.src;
};

LoadingImage.prototype.getIsImageComplete = function() {
  // check for non-zero, non-undefined naturalWidth
  // fixes Safari+InfiniteScroll+Masonry bug infinite-scroll#671
  return this.img.complete && this.img.naturalWidth;
};

LoadingImage.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  let { parentNode } = this.img;
  // emit progress with parent <picture> or self <img>
  let elem = parentNode.nodeName === 'PICTURE' ? parentNode : this.img;
  this.emitEvent( 'progress', [ this, elem, message ] );
};

// ----- events ----- //

// trigger specified handler for event type
LoadingImage.prototype.handleEvent = function( event ) {
  let method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

LoadingImage.prototype.onload = function() {
  this.confirm( true, 'onload' );
  this.unbindEvents();
};

LoadingImage.prototype.onerror = function() {
  this.confirm( false, 'onerror' );
  this.unbindEvents();
};

LoadingImage.prototype.unbindEvents = function() {
  this.proxyImage.removeEventListener( 'load', this );
  this.proxyImage.removeEventListener( 'error', this );
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

// -------------------------- Background -------------------------- //

function Background( url, element ) {
  this.url = url;
  this.element = element;
  this.img = new Image();
}

// inherit LoadingImage prototype
Background.prototype = Object.create( LoadingImage.prototype );

Background.prototype.check = function() {
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.img.src = this.url;
  // check if image is already complete
  let isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    this.unbindEvents();
  }
};

Background.prototype.unbindEvents = function() {
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

Background.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.element, message ] );
};

// -------------------------- jQuery -------------------------- //

ImagesLoaded.makeJQueryPlugin = function( jQuery ) {
  jQuery = jQuery || window.jQuery;
  if ( !jQuery ) return;

  // set local variable
  $ = jQuery;
  // $().imagesLoaded()
  $.fn.imagesLoaded = function( options, onAlways ) {
    let instance = new ImagesLoaded( this, options, onAlways );
    return instance.jqDeferred.promise( $( this ) );
  };
};
// try making plugin
ImagesLoaded.makeJQueryPlugin();

// --------------------------  -------------------------- //

return ImagesLoaded;

} );


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* eslint-env browser */
/*
  eslint-disable
  no-console,
  func-names
*/

/** @typedef {any} TODO */

var normalizeUrl = __webpack_require__(/*! ./normalize-url */ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js");
var srcByModuleId = Object.create(null);
var noDocument = typeof document === "undefined";
var forEach = Array.prototype.forEach;

/**
 * @param {function} fn
 * @param {number} time
 * @returns {(function(): void)|*}
 */
function debounce(fn, time) {
  var timeout = 0;
  return function () {
    // @ts-ignore
    var self = this;
    // eslint-disable-next-line prefer-rest-params
    var args = arguments;
    var functionCall = function functionCall() {
      return fn.apply(self, args);
    };
    clearTimeout(timeout);

    // @ts-ignore
    timeout = setTimeout(functionCall, time);
  };
}
function noop() {}

/**
 * @param {TODO} moduleId
 * @returns {TODO}
 */
function getCurrentScriptUrl(moduleId) {
  var src = srcByModuleId[moduleId];
  if (!src) {
    if (document.currentScript) {
      src = /** @type {HTMLScriptElement} */document.currentScript.src;
    } else {
      var scripts = document.getElementsByTagName("script");
      var lastScriptTag = scripts[scripts.length - 1];
      if (lastScriptTag) {
        src = lastScriptTag.src;
      }
    }
    srcByModuleId[moduleId] = src;
  }

  /**
   * @param {string} fileMap
   * @returns {null | string[]}
   */
  return function (fileMap) {
    if (!src) {
      return null;
    }
    var splitResult = src.split(/([^\\/]+)\.js$/);
    var filename = splitResult && splitResult[1];
    if (!filename) {
      return [src.replace(".js", ".css")];
    }
    if (!fileMap) {
      return [src.replace(".js", ".css")];
    }
    return fileMap.split(",").map(function (mapRule) {
      var reg = new RegExp("".concat(filename, "\\.js$"), "g");
      return normalizeUrl(src.replace(reg, "".concat(mapRule.replace(/{fileName}/g, filename), ".css")));
    });
  };
}

/**
 * @param {TODO} el
 * @param {string} [url]
 */
function updateCss(el, url) {
  if (!url) {
    if (!el.href) {
      return;
    }

    // eslint-disable-next-line
    url = el.href.split("?")[0];
  }
  if (!isUrlRequest( /** @type {string} */url)) {
    return;
  }
  if (el.isLoaded === false) {
    // We seem to be about to replace a css link that hasn't loaded yet.
    // We're probably changing the same file more than once.
    return;
  }
  if (!url || !(url.indexOf(".css") > -1)) {
    return;
  }

  // eslint-disable-next-line no-param-reassign
  el.visited = true;
  var newEl = el.cloneNode();
  newEl.isLoaded = false;
  newEl.addEventListener("load", function () {
    if (newEl.isLoaded) {
      return;
    }
    newEl.isLoaded = true;
    el.parentNode.removeChild(el);
  });
  newEl.addEventListener("error", function () {
    if (newEl.isLoaded) {
      return;
    }
    newEl.isLoaded = true;
    el.parentNode.removeChild(el);
  });
  newEl.href = "".concat(url, "?").concat(Date.now());
  if (el.nextSibling) {
    el.parentNode.insertBefore(newEl, el.nextSibling);
  } else {
    el.parentNode.appendChild(newEl);
  }
}

/**
 * @param {string} href
 * @param {TODO} src
 * @returns {TODO}
 */
function getReloadUrl(href, src) {
  var ret;

  // eslint-disable-next-line no-param-reassign
  href = normalizeUrl(href);
  src.some(
  /**
   * @param {string} url
   */
  // eslint-disable-next-line array-callback-return
  function (url) {
    if (href.indexOf(src) > -1) {
      ret = url;
    }
  });
  return ret;
}

/**
 * @param {string} [src]
 * @returns {boolean}
 */
function reloadStyle(src) {
  if (!src) {
    return false;
  }
  var elements = document.querySelectorAll("link");
  var loaded = false;
  forEach.call(elements, function (el) {
    if (!el.href) {
      return;
    }
    var url = getReloadUrl(el.href, src);
    if (!isUrlRequest(url)) {
      return;
    }
    if (el.visited === true) {
      return;
    }
    if (url) {
      updateCss(el, url);
      loaded = true;
    }
  });
  return loaded;
}
function reloadAll() {
  var elements = document.querySelectorAll("link");
  forEach.call(elements, function (el) {
    if (el.visited === true) {
      return;
    }
    updateCss(el);
  });
}

/**
 * @param {string} url
 * @returns {boolean}
 */
function isUrlRequest(url) {
  // An URL is not an request if

  // It is not http or https
  if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url)) {
    return false;
  }
  return true;
}

/**
 * @param {TODO} moduleId
 * @param {TODO} options
 * @returns {TODO}
 */
module.exports = function (moduleId, options) {
  if (noDocument) {
    console.log("no window.document found, will not HMR CSS");
    return noop;
  }
  var getScriptSrc = getCurrentScriptUrl(moduleId);
  function update() {
    var src = getScriptSrc(options.filename);
    var reloaded = reloadStyle(src);
    if (options.locals) {
      console.log("[HMR] Detected local css modules. Reload all css");
      reloadAll();
      return;
    }
    if (reloaded) {
      console.log("[HMR] css reload %s", src.join(" "));
    } else {
      console.log("[HMR] Reload all css");
      reloadAll();
    }
  }
  return debounce(update, 50);
};

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js":
/*!************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";


/* eslint-disable */

/**
 * @param {string[]} pathComponents
 * @returns {string}
 */
function normalizeUrl(pathComponents) {
  return pathComponents.reduce(function (accumulator, item) {
    switch (item) {
      case "..":
        accumulator.pop();
        break;
      case ".":
        break;
      default:
        accumulator.push(item);
    }
    return accumulator;
  }, /** @type {string[]} */[]).join("/");
}

/**
 * @param {string} urlString
 * @returns {string}
 */
module.exports = function (urlString) {
  urlString = urlString.trim();
  if (/^data:/i.test(urlString)) {
    return urlString;
  }
  var protocol = urlString.indexOf("//") !== -1 ? urlString.split("//")[0] + "//" : "";
  var components = urlString.replace(new RegExp(protocol, "i"), "").split("/");
  var host = components[0].toLowerCase().replace(/\.$/, "");
  components[0] = "";
  var path = normalizeUrl(components);
  return protocol + host + path;
};

/***/ }),

/***/ "./src/sass/app.scss":
/*!***************************!*\
  !*** ./src/sass/app.scss ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1697719075789
      var cssReload = __webpack_require__(/*! ../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./node_modules/svg-spritemap-webpack-plugin/svg4everybody-helper.js":
/*!***************************************************************************!*\
  !*** ./node_modules/svg-spritemap-webpack-plugin/svg4everybody-helper.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! svg4everybody */ "./node_modules/svg4everybody/dist/svg4everybody.js")({});


/***/ }),

/***/ "./node_modules/svg4everybody/dist/svg4everybody.js":
/*!**********************************************************!*\
  !*** ./node_modules/svg4everybody/dist/svg4everybody.js ***!
  \**********************************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(root, factory) {
     true ? // AMD. Register as an anonymous module unless amdModuleId is set
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
        return root.svg4everybody = factory();
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 0;
}(this, function() {
    /*! svg4everybody v2.1.9 | github.com/jonathantneal/svg4everybody */
    function embed(parent, svg, target) {
        // if the target exists
        if (target) {
            // create a document fragment to hold the contents of the target
            var fragment = document.createDocumentFragment(), viewBox = !svg.hasAttribute("viewBox") && target.getAttribute("viewBox");
            // conditionally set the viewBox on the svg
            viewBox && svg.setAttribute("viewBox", viewBox);
            // copy the contents of the clone into the fragment
            for (// clone the target
            var clone = target.cloneNode(!0); clone.childNodes.length; ) {
                fragment.appendChild(clone.firstChild);
            }
            // append the fragment into the svg
            parent.appendChild(fragment);
        }
    }
    function loadreadystatechange(xhr) {
        // listen to changes in the request
        xhr.onreadystatechange = function() {
            // if the request is ready
            if (4 === xhr.readyState) {
                // get the cached html document
                var cachedDocument = xhr._cachedDocument;
                // ensure the cached html document based on the xhr response
                cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""), 
                cachedDocument.body.innerHTML = xhr.responseText, xhr._cachedTarget = {}), // clear the xhr embeds list and embed each item
                xhr._embeds.splice(0).map(function(item) {
                    // get the cached target
                    var target = xhr._cachedTarget[item.id];
                    // ensure the cached target
                    target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)), 
                    // embed the target into the svg
                    embed(item.parent, item.svg, target);
                });
            }
        }, // test the ready state change immediately
        xhr.onreadystatechange();
    }
    function svg4everybody(rawopts) {
        function oninterval() {
            // while the index exists in the live <use> collection
            for (// get the cached <use> index
            var index = 0; index < uses.length; ) {
                // get the current <use>
                var use = uses[index], parent = use.parentNode, svg = getSVGAncestor(parent), src = use.getAttribute("xlink:href") || use.getAttribute("href");
                if (!src && opts.attributeName && (src = use.getAttribute(opts.attributeName)), 
                svg && src) {
                    if (polyfill) {
                        if (!opts.validate || opts.validate(src, svg, use)) {
                            // remove the <use> element
                            parent.removeChild(use);
                            // parse the src and get the url and id
                            var srcSplit = src.split("#"), url = srcSplit.shift(), id = srcSplit.join("#");
                            // if the link is external
                            if (url.length) {
                                // get the cached xhr request
                                var xhr = requests[url];
                                // ensure the xhr request exists
                                xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open("GET", url), xhr.send(), 
                                xhr._embeds = []), // add the svg and id as an item to the xhr embeds list
                                xhr._embeds.push({
                                    parent: parent,
                                    svg: svg,
                                    id: id
                                }), // prepare the xhr ready state change event
                                loadreadystatechange(xhr);
                            } else {
                                // embed the local id into the svg
                                embed(parent, svg, document.getElementById(id));
                            }
                        } else {
                            // increase the index when the previous value was not "valid"
                            ++index, ++numberOfSvgUseElementsToBypass;
                        }
                    }
                } else {
                    // increase the index when the previous value was not "valid"
                    ++index;
                }
            }
            // continue the interval
            (!uses.length || uses.length - numberOfSvgUseElementsToBypass > 0) && requestAnimationFrame(oninterval, 67);
        }
        var polyfill, opts = Object(rawopts), newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/, webkitUA = /\bAppleWebKit\/(\d+)\b/, olderEdgeUA = /\bEdge\/12\.(\d+)\b/, edgeUA = /\bEdge\/.(\d+)\b/, inIframe = window.top !== window.self;
        polyfill = "polyfill" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537 || edgeUA.test(navigator.userAgent) && inIframe;
        // create xhr requests object
        var requests = {}, requestAnimationFrame = window.requestAnimationFrame || setTimeout, uses = document.getElementsByTagName("use"), numberOfSvgUseElementsToBypass = 0;
        // conditionally start the interval if the polyfill is active
        polyfill && oninterval();
    }
    function getSVGAncestor(node) {
        for (var svg = node; "svg" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode); ) {}
        return svg;
    }
    return svg4everybody;
});

/***/ }),

/***/ "./node_modules/svgxuse/svgxuse.js":
/*!*****************************************!*\
  !*** ./node_modules/svgxuse/svgxuse.js ***!
  \*****************************************/
/***/ (() => {

/*!
 * @copyright Copyright (c) 2017 IcoMoon.io
 * @license   Licensed under MIT license
 *            See https://github.com/Keyamoon/svgxuse
 * @version   1.2.6
 */
/*jslint browser: true */
/*global XDomainRequest, MutationObserver, window */
(function () {
    "use strict";
    if (typeof window !== "undefined" && window.addEventListener) {
        var cache = Object.create(null); // holds xhr objects to prevent multiple requests
        var checkUseElems;
        var tid; // timeout id
        var debouncedCheck = function () {
            clearTimeout(tid);
            tid = setTimeout(checkUseElems, 100);
        };
        var unobserveChanges = function () {
            return;
        };
        var observeChanges = function () {
            var observer;
            window.addEventListener("resize", debouncedCheck, false);
            window.addEventListener("orientationchange", debouncedCheck, false);
            if (window.MutationObserver) {
                observer = new MutationObserver(debouncedCheck);
                observer.observe(document.documentElement, {
                    childList: true,
                    subtree: true,
                    attributes: true
                });
                unobserveChanges = function () {
                    try {
                        observer.disconnect();
                        window.removeEventListener("resize", debouncedCheck, false);
                        window.removeEventListener("orientationchange", debouncedCheck, false);
                    } catch (ignore) {}
                };
            } else {
                document.documentElement.addEventListener("DOMSubtreeModified", debouncedCheck, false);
                unobserveChanges = function () {
                    document.documentElement.removeEventListener("DOMSubtreeModified", debouncedCheck, false);
                    window.removeEventListener("resize", debouncedCheck, false);
                    window.removeEventListener("orientationchange", debouncedCheck, false);
                };
            }
        };
        var createRequest = function (url) {
            // In IE 9, cross origin requests can only be sent using XDomainRequest.
            // XDomainRequest would fail if CORS headers are not set.
            // Therefore, XDomainRequest should only be used with cross origin requests.
            function getOrigin(loc) {
                var a;
                if (loc.protocol !== undefined) {
                    a = loc;
                } else {
                    a = document.createElement("a");
                    a.href = loc;
                }
                return a.protocol.replace(/:/g, "") + a.host;
            }
            var Request;
            var origin;
            var origin2;
            if (window.XMLHttpRequest) {
                Request = new XMLHttpRequest();
                origin = getOrigin(location);
                origin2 = getOrigin(url);
                if (Request.withCredentials === undefined && origin2 !== "" && origin2 !== origin) {
                    Request = XDomainRequest || undefined;
                } else {
                    Request = XMLHttpRequest;
                }
            }
            return Request;
        };
        var xlinkNS = "http://www.w3.org/1999/xlink";
        checkUseElems = function () {
            var base;
            var bcr;
            var fallback = ""; // optional fallback URL in case no base path to SVG file was given and no symbol definition was found.
            var hash;
            var href;
            var i;
            var inProgressCount = 0;
            var isHidden;
            var Request;
            var url;
            var uses;
            var xhr;
            function observeIfDone() {
                // If done with making changes, start watching for chagnes in DOM again
                inProgressCount -= 1;
                if (inProgressCount === 0) { // if all xhrs were resolved
                    unobserveChanges(); // make sure to remove old handlers
                    observeChanges(); // watch for changes to DOM
                }
            }
            function attrUpdateFunc(spec) {
                return function () {
                    if (cache[spec.base] !== true) {
                        spec.useEl.setAttributeNS(xlinkNS, "xlink:href", "#" + spec.hash);
                        if (spec.useEl.hasAttribute("href")) {
                            spec.useEl.setAttribute("href", "#" + spec.hash);
                        }
                    }
                };
            }
            function onloadFunc(xhr) {
                return function () {
                    var body = document.body;
                    var x = document.createElement("x");
                    var svg;
                    xhr.onload = null;
                    x.innerHTML = xhr.responseText;
                    svg = x.getElementsByTagName("svg")[0];
                    if (svg) {
                        svg.setAttribute("aria-hidden", "true");
                        svg.style.position = "absolute";
                        svg.style.width = 0;
                        svg.style.height = 0;
                        svg.style.overflow = "hidden";
                        body.insertBefore(svg, body.firstChild);
                    }
                    observeIfDone();
                };
            }
            function onErrorTimeout(xhr) {
                return function () {
                    xhr.onerror = null;
                    xhr.ontimeout = null;
                    observeIfDone();
                };
            }
            unobserveChanges(); // stop watching for changes to DOM
            // find all use elements
            uses = document.getElementsByTagName("use");
            for (i = 0; i < uses.length; i += 1) {
                try {
                    bcr = uses[i].getBoundingClientRect();
                } catch (ignore) {
                    // failed to get bounding rectangle of the use element
                    bcr = false;
                }
                href = uses[i].getAttribute("href")
                        || uses[i].getAttributeNS(xlinkNS, "href")
                        || uses[i].getAttribute("xlink:href");
                if (href && href.split) {
                    url = href.split("#");
                } else {
                    url = ["", ""];
                }
                base = url[0];
                hash = url[1];
                isHidden = bcr && bcr.left === 0 && bcr.right === 0 && bcr.top === 0 && bcr.bottom === 0;
                if (bcr && bcr.width === 0 && bcr.height === 0 && !isHidden) {
                    // the use element is empty
                    // if there is a reference to an external SVG, try to fetch it
                    // use the optional fallback URL if there is no reference to an external SVG
                    if (fallback && !base.length && hash && !document.getElementById(hash)) {
                        base = fallback;
                    }
                    if (uses[i].hasAttribute("href")) {
                        uses[i].setAttributeNS(xlinkNS, "xlink:href", href);
                    }
                    if (base.length) {
                        // schedule updating xlink:href
                        xhr = cache[base];
                        if (xhr !== true) {
                            // true signifies that prepending the SVG was not required
                            setTimeout(attrUpdateFunc({
                                useEl: uses[i],
                                base: base,
                                hash: hash
                            }), 0);
                        }
                        if (xhr === undefined) {
                            Request = createRequest(base);
                            if (Request !== undefined) {
                                xhr = new Request();
                                cache[base] = xhr;
                                xhr.onload = onloadFunc(xhr);
                                xhr.onerror = onErrorTimeout(xhr);
                                xhr.ontimeout = onErrorTimeout(xhr);
                                xhr.open("GET", base);
                                xhr.send();
                                inProgressCount += 1;
                            }
                        }
                    }
                } else {
                    if (!isHidden) {
                        if (cache[base] === undefined) {
                            // remember this URL if the use element was not empty and no request was sent
                            cache[base] = true;
                        } else if (cache[base].onload) {
                            // if it turns out that prepending the SVG is not necessary,
                            // abort the in-progress xhr.
                            cache[base].abort();
                            delete cache[base].onload;
                            cache[base] = true;
                        }
                    } else if (base.length && cache[base]) {
                        setTimeout(attrUpdateFunc({
                            useEl: uses[i],
                            base: base,
                            hash: hash
                        }), 0);
                    }
                }
            }
            uses = "";
            inProgressCount += 1;
            observeIfDone();
        };
        var winLoad;
        winLoad = function () {
            window.removeEventListener("load", winLoad, false); // to prevent memory leaks
            tid = setTimeout(checkUseElems, 0);
        };
        if (document.readyState !== "complete") {
            // The load event fires when all resources have finished loading, which allows detecting whether SVG use elements are empty.
            window.addEventListener("load", winLoad, false);
        } else {
            // No need to add a listener if the document is already loaded, initialize immediately.
            winLoad();
        }
    }
}());


/***/ }),

/***/ "./node_modules/unidragger/unidragger.js":
/*!***********************************************!*\
  !*** ./node_modules/unidragger/unidragger.js ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
 * Unidragger v3.0.1
 * Draggable base class
 * MIT license
 */

( function( window, factory ) {
  // universal module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory(
        window,
        __webpack_require__(/*! ev-emitter */ "./node_modules/ev-emitter/ev-emitter.js"),
    );
  } else {
    // browser global
    window.Unidragger = factory(
        window,
        window.EvEmitter,
    );
  }

}( typeof window != 'undefined' ? window : this, function factory( window, EvEmitter ) {

function Unidragger() {}

// inherit EvEmitter
let proto = Unidragger.prototype = Object.create( EvEmitter.prototype );

// ----- bind start ----- //

// trigger handler methods for events
proto.handleEvent = function( event ) {
  let method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

let startEvent, activeEvents;
if ( 'ontouchstart' in window ) {
  // HACK prefer Touch Events as you can preventDefault on touchstart to
  // disable scroll in iOS & mobile Chrome metafizzy/flickity#1177
  startEvent = 'touchstart';
  activeEvents = [ 'touchmove', 'touchend', 'touchcancel' ];
} else if ( window.PointerEvent ) {
  // Pointer Events
  startEvent = 'pointerdown';
  activeEvents = [ 'pointermove', 'pointerup', 'pointercancel' ];
} else {
  // mouse events
  startEvent = 'mousedown';
  activeEvents = [ 'mousemove', 'mouseup' ];
}

// prototype so it can be overwriteable by Flickity
proto.touchActionValue = 'none';

proto.bindHandles = function() {
  this._bindHandles( 'addEventListener', this.touchActionValue );
};

proto.unbindHandles = function() {
  this._bindHandles( 'removeEventListener', '' );
};

/**
 * Add or remove start event
 * @param {String} bindMethod - addEventListener or removeEventListener
 * @param {String} touchAction - value for touch-action CSS property
 */
proto._bindHandles = function( bindMethod, touchAction ) {
  this.handles.forEach( ( handle ) => {
    handle[ bindMethod ]( startEvent, this );
    handle[ bindMethod ]( 'click', this );
    // touch-action: none to override browser touch gestures. metafizzy/flickity#540
    if ( window.PointerEvent ) handle.style.touchAction = touchAction;
  } );
};

proto.bindActivePointerEvents = function() {
  activeEvents.forEach( ( eventName ) => {
    window.addEventListener( eventName, this );
  } );
};

proto.unbindActivePointerEvents = function() {
  activeEvents.forEach( ( eventName ) => {
    window.removeEventListener( eventName, this );
  } );
};

// ----- event handler helpers ----- //

// trigger method with matching pointer
proto.withPointer = function( methodName, event ) {
  if ( event.pointerId === this.pointerIdentifier ) {
    this[ methodName ]( event, event );
  }
};

// trigger method with matching touch
proto.withTouch = function( methodName, event ) {
  let touch;
  for ( let changedTouch of event.changedTouches ) {
    if ( changedTouch.identifier === this.pointerIdentifier ) {
      touch = changedTouch;
    }
  }
  if ( touch ) this[ methodName ]( event, touch );
};

// ----- start event ----- //

proto.onmousedown = function( event ) {
  this.pointerDown( event, event );
};

proto.ontouchstart = function( event ) {
  this.pointerDown( event, event.changedTouches[0] );
};

proto.onpointerdown = function( event ) {
  this.pointerDown( event, event );
};

// nodes that have text fields
const cursorNodes = [ 'TEXTAREA', 'INPUT', 'SELECT', 'OPTION' ];
// input types that do not have text fields
const clickTypes = [ 'radio', 'checkbox', 'button', 'submit', 'image', 'file' ];

/**
 * any time you set `event, pointer` it refers to:
 * @param {Event} event
 * @param {Event | Touch} pointer
 */
proto.pointerDown = function( event, pointer ) {
  // dismiss multi-touch taps, right clicks, and clicks on text fields
  let isCursorNode = cursorNodes.includes( event.target.nodeName );
  let isClickType = clickTypes.includes( event.target.type );
  let isOkayElement = !isCursorNode || isClickType;
  let isOkay = !this.isPointerDown && !event.button && isOkayElement;
  if ( !isOkay ) return;

  this.isPointerDown = true;
  // save pointer identifier to match up touch events
  this.pointerIdentifier = pointer.pointerId !== undefined ?
    // pointerId for pointer events, touch.indentifier for touch events
    pointer.pointerId : pointer.identifier;
  // track position for move
  this.pointerDownPointer = {
    pageX: pointer.pageX,
    pageY: pointer.pageY,
  };

  this.bindActivePointerEvents();
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// ----- move ----- //

proto.onmousemove = function( event ) {
  this.pointerMove( event, event );
};

proto.onpointermove = function( event ) {
  this.withPointer( 'pointerMove', event );
};

proto.ontouchmove = function( event ) {
  this.withTouch( 'pointerMove', event );
};

proto.pointerMove = function( event, pointer ) {
  let moveVector = {
    x: pointer.pageX - this.pointerDownPointer.pageX,
    y: pointer.pageY - this.pointerDownPointer.pageY,
  };
  this.emitEvent( 'pointerMove', [ event, pointer, moveVector ] );
  // start drag if pointer has moved far enough to start drag
  let isDragStarting = !this.isDragging && this.hasDragStarted( moveVector );
  if ( isDragStarting ) this.dragStart( event, pointer );
  if ( this.isDragging ) this.dragMove( event, pointer, moveVector );
};

// condition if pointer has moved far enough to start drag
proto.hasDragStarted = function( moveVector ) {
  return Math.abs( moveVector.x ) > 3 || Math.abs( moveVector.y ) > 3;
};

// ----- drag ----- //

proto.dragStart = function( event, pointer ) {
  this.isDragging = true;
  this.isPreventingClicks = true; // set flag to prevent clicks
  this.emitEvent( 'dragStart', [ event, pointer ] );
};

proto.dragMove = function( event, pointer, moveVector ) {
  this.emitEvent( 'dragMove', [ event, pointer, moveVector ] );
};

// ----- end ----- //

proto.onmouseup = function( event ) {
  this.pointerUp( event, event );
};

proto.onpointerup = function( event ) {
  this.withPointer( 'pointerUp', event );
};

proto.ontouchend = function( event ) {
  this.withTouch( 'pointerUp', event );
};

proto.pointerUp = function( event, pointer ) {
  this.pointerDone();
  this.emitEvent( 'pointerUp', [ event, pointer ] );

  if ( this.isDragging ) {
    this.dragEnd( event, pointer );
  } else {
    // pointer didn't move enough for drag to start
    this.staticClick( event, pointer );
  }
};

proto.dragEnd = function( event, pointer ) {
  this.isDragging = false; // reset flag
  // re-enable clicking async
  setTimeout( () => delete this.isPreventingClicks );

  this.emitEvent( 'dragEnd', [ event, pointer ] );
};

// triggered on pointer up & pointer cancel
proto.pointerDone = function() {
  this.isPointerDown = false;
  delete this.pointerIdentifier;
  this.unbindActivePointerEvents();
  this.emitEvent('pointerDone');
};

// ----- cancel ----- //

proto.onpointercancel = function( event ) {
  this.withPointer( 'pointerCancel', event );
};

proto.ontouchcancel = function( event ) {
  this.withTouch( 'pointerCancel', event );
};

proto.pointerCancel = function( event, pointer ) {
  this.pointerDone();
  this.emitEvent( 'pointerCancel', [ event, pointer ] );
};

// ----- click ----- //

// handle all clicks and prevent clicks when dragging
proto.onclick = function( event ) {
  if ( this.isPreventingClicks ) event.preventDefault();
};

// triggered after pointer down & up with no/tiny movement
proto.staticClick = function( event, pointer ) {
  // ignore emulated mouse up clicks
  let isMouseup = event.type === 'mouseup';
  if ( isMouseup && this.isIgnoringMouseUp ) return;

  this.emitEvent( 'staticClick', [ event, pointer ] );

  // set flag for emulated clicks 300ms after touchend
  if ( isMouseup ) {
    this.isIgnoringMouseUp = true;
    // reset flag after 400ms
    setTimeout( () => {
      delete this.isIgnoringMouseUp;
    }, 400 );
  }
};

// -----  ----- //

return Unidragger;

} ) );


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js":
/*!***************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WebSocketClient)
/* harmony export */ });
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var WebSocketClient = /*#__PURE__*/function () {
  /**
   * @param {string} url
   */
  function WebSocketClient(url) {
    _classCallCheck(this, WebSocketClient);
    this.client = new WebSocket(url);
    this.client.onerror = function (error) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_0__.log.error(error);
    };
  }

  /**
   * @param {(...args: any[]) => void} f
   */
  _createClass(WebSocketClient, [{
    key: "onOpen",
    value: function onOpen(f) {
      this.client.onopen = f;
    }

    /**
     * @param {(...args: any[]) => void} f
     */
  }, {
    key: "onClose",
    value: function onClose(f) {
      this.client.onclose = f;
    }

    // call f with the message string as the first argument
    /**
     * @param {(...args: any[]) => void} f
     */
  }, {
    key: "onMessage",
    value: function onMessage(f) {
      this.client.onmessage = function (e) {
        f(e.data);
      };
    }
  }]);
  return WebSocketClient;
}();


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=verbose&overlay=true&reconnect=10&hot=only&live-reload=true":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=verbose&overlay=true&reconnect=10&hot=only&live-reload=true ***!
  \**************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
var __resourceQuery = "?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=verbose&overlay=true&reconnect=10&hot=only&live-reload=true";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/log.js */ "./node_modules/webpack/hot/log.js");
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/stripAnsi.js */ "./node_modules/webpack-dev-server/client/utils/stripAnsi.js");
/* harmony import */ var _utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/parseURL.js */ "./node_modules/webpack-dev-server/client/utils/parseURL.js");
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./socket.js */ "./node_modules/webpack-dev-server/client/socket.js");
/* harmony import */ var _overlay_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./overlay.js */ "./node_modules/webpack-dev-server/client/overlay.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* harmony import */ var _utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/sendMessage.js */ "./node_modules/webpack-dev-server/client/utils/sendMessage.js");
/* harmony import */ var _utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/reloadApp.js */ "./node_modules/webpack-dev-server/client/utils/reloadApp.js");
/* harmony import */ var _utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/createSocketURL.js */ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* global __resourceQuery, __webpack_hash__ */
/// <reference types="webpack/module" />










/**
 * @typedef {Object} OverlayOptions
 * @property {boolean | (error: Error) => boolean} [warnings]
 * @property {boolean | (error: Error) => boolean} [errors]
 * @property {boolean | (error: Error) => boolean} [runtimeErrors]
 * @property {string} [trustedTypesPolicyName]
 */

/**
 * @typedef {Object} Options
 * @property {boolean} hot
 * @property {boolean} liveReload
 * @property {boolean} progress
 * @property {boolean | OverlayOptions} overlay
 * @property {string} [logging]
 * @property {number} [reconnect]
 */

/**
 * @typedef {Object} Status
 * @property {boolean} isUnloading
 * @property {string} currentHash
 * @property {string} [previousHash]
 */

/**
 * @param {boolean | { warnings?: boolean | string; errors?: boolean | string; runtimeErrors?: boolean | string; }} overlayOptions
 */
var decodeOverlayOptions = function decodeOverlayOptions(overlayOptions) {
  if (typeof overlayOptions === "object") {
    ["warnings", "errors", "runtimeErrors"].forEach(function (property) {
      if (typeof overlayOptions[property] === "string") {
        var overlayFilterFunctionString = decodeURIComponent(overlayOptions[property]);

        // eslint-disable-next-line no-new-func
        var overlayFilterFunction = new Function("message", "var callback = ".concat(overlayFilterFunctionString, "\n        return callback(message)"));
        overlayOptions[property] = overlayFilterFunction;
      }
    });
  }
};

/**
 * @type {Status}
 */
var status = {
  isUnloading: false,
  // TODO Workaround for webpack v4, `__webpack_hash__` is not replaced without HotModuleReplacement
  // eslint-disable-next-line camelcase
  currentHash:  true ? __webpack_require__.h() : 0
};

/** @type {Options} */
var options = {
  hot: false,
  liveReload: false,
  progress: false,
  overlay: false
};
var parsedResourceQuery = (0,_utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__["default"])(__resourceQuery);
var enabledFeatures = {
  "Hot Module Replacement": false,
  "Live Reloading": false,
  Progress: false,
  Overlay: false
};
if (parsedResourceQuery.hot === "true") {
  options.hot = true;
  enabledFeatures["Hot Module Replacement"] = true;
}
if (parsedResourceQuery["live-reload"] === "true") {
  options.liveReload = true;
  enabledFeatures["Live Reloading"] = true;
}
if (parsedResourceQuery.progress === "true") {
  options.progress = true;
  enabledFeatures.Progress = true;
}
if (parsedResourceQuery.overlay) {
  try {
    options.overlay = JSON.parse(parsedResourceQuery.overlay);
  } catch (e) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error("Error parsing overlay options from resource query:", e);
  }

  // Fill in default "true" params for partially-specified objects.
  if (typeof options.overlay === "object") {
    options.overlay = _objectSpread({
      errors: true,
      warnings: true,
      runtimeErrors: true
    }, options.overlay);
    decodeOverlayOptions(options.overlay);
  }
  enabledFeatures.Overlay = true;
}
if (parsedResourceQuery.logging) {
  options.logging = parsedResourceQuery.logging;
}
if (typeof parsedResourceQuery.reconnect !== "undefined") {
  options.reconnect = Number(parsedResourceQuery.reconnect);
}

/**
 * @param {string} level
 */
function setAllLogLevel(level) {
  // This is needed because the HMR logger operate separately from dev server logger
  webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default().setLogLevel(level === "verbose" || level === "log" ? "info" : level);
  (0,_utils_log_js__WEBPACK_IMPORTED_MODULE_5__.setLogLevel)(level);
}
if (options.logging) {
  setAllLogLevel(options.logging);
}
(0,_utils_log_js__WEBPACK_IMPORTED_MODULE_5__.logEnabledFeatures)(enabledFeatures);
self.addEventListener("beforeunload", function () {
  status.isUnloading = true;
});
var overlay = typeof window !== "undefined" ? (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.createOverlay)(typeof options.overlay === "object" ? {
  trustedTypesPolicyName: options.overlay.trustedTypesPolicyName,
  catchRuntimeError: options.overlay.runtimeErrors
} : {
  trustedTypesPolicyName: false,
  catchRuntimeError: options.overlay
}) : {
  send: function send() {}
};
var onSocketMessage = {
  hot: function hot() {
    if (parsedResourceQuery.hot === "false") {
      return;
    }
    options.hot = true;
  },
  liveReload: function liveReload() {
    if (parsedResourceQuery["live-reload"] === "false") {
      return;
    }
    options.liveReload = true;
  },
  invalid: function invalid() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("App updated. Recompiling...");

    // Fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Invalid");
  },
  /**
   * @param {string} hash
   */
  hash: function hash(_hash) {
    status.previousHash = status.currentHash;
    status.currentHash = _hash;
  },
  logging: setAllLogLevel,
  /**
   * @param {boolean} value
   */
  overlay: function overlay(value) {
    if (typeof document === "undefined") {
      return;
    }
    options.overlay = value;
    decodeOverlayOptions(options.overlay);
  },
  /**
   * @param {number} value
   */
  reconnect: function reconnect(value) {
    if (parsedResourceQuery.reconnect === "false") {
      return;
    }
    options.reconnect = value;
  },
  /**
   * @param {boolean} value
   */
  progress: function progress(value) {
    options.progress = value;
  },
  /**
   * @param {{ pluginName?: string, percent: number, msg: string }} data
   */
  "progress-update": function progressUpdate(data) {
    if (options.progress) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(data.pluginName ? "[".concat(data.pluginName, "] ") : "").concat(data.percent, "% - ").concat(data.msg, "."));
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Progress", data);
  },
  "still-ok": function stillOk() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Nothing changed.");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("StillOk");
  },
  ok: function ok() {
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Ok");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
  },
  // TODO: remove in v5 in favor of 'static-changed'
  /**
   * @param {string} file
   */
  "content-changed": function contentChanged(file) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },
  /**
   * @param {string} file
   */
  "static-changed": function staticChanged(file) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },
  /**
   * @param {Error[]} warnings
   * @param {any} params
   */
  warnings: function warnings(_warnings, params) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn("Warnings while compiling.");
    var printableWarnings = _warnings.map(function (error) {
      var _formatProblem = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)("warning", error),
        header = _formatProblem.header,
        body = _formatProblem.body;
      return "".concat(header, "\n").concat((0,_utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__["default"])(body));
    });
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Warnings", printableWarnings);
    for (var i = 0; i < printableWarnings.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn(printableWarnings[i]);
    }
    var overlayWarningsSetting = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.warnings;
    if (overlayWarningsSetting) {
      var warningsToDisplay = typeof overlayWarningsSetting === "function" ? _warnings.filter(overlayWarningsSetting) : _warnings;
      if (warningsToDisplay.length) {
        overlay.send({
          type: "BUILD_ERROR",
          level: "warning",
          messages: _warnings
        });
      }
    }
    if (params && params.preventReloading) {
      return;
    }
    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
  },
  /**
   * @param {Error[]} errors
   */
  errors: function errors(_errors) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error("Errors while compiling. Reload prevented.");
    var printableErrors = _errors.map(function (error) {
      var _formatProblem2 = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)("error", error),
        header = _formatProblem2.header,
        body = _formatProblem2.body;
      return "".concat(header, "\n").concat((0,_utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__["default"])(body));
    });
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Errors", printableErrors);
    for (var i = 0; i < printableErrors.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(printableErrors[i]);
    }
    var overlayErrorsSettings = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.errors;
    if (overlayErrorsSettings) {
      var errorsToDisplay = typeof overlayErrorsSettings === "function" ? _errors.filter(overlayErrorsSettings) : _errors;
      if (errorsToDisplay.length) {
        overlay.send({
          type: "BUILD_ERROR",
          level: "error",
          messages: _errors
        });
      }
    }
  },
  /**
   * @param {Error} error
   */
  error: function error(_error) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(_error);
  },
  close: function close() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Disconnected!");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Close");
  }
};
var socketURL = (0,_utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__["default"])(parsedResourceQuery);
(0,_socket_js__WEBPACK_IMPORTED_MODULE_3__["default"])(socketURL, onSocketMessage, options.reconnect);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/modules/logger/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/modules/logger/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client-src/modules/logger/SyncBailHookFake.js":
/*!*******************************************************!*\
  !*** ./client-src/modules/logger/SyncBailHookFake.js ***!
  \*******************************************************/
/***/ (function(module) {



/**
 * Client stub for tapable SyncBailHook
 */
module.exports = function clientTapableSyncBailHook() {
  return {
    call: function call() {}
  };
};

/***/ }),

/***/ "./node_modules/webpack/lib/logging/Logger.js":
/*!****************************************************!*\
  !*** ./node_modules/webpack/lib/logging/Logger.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/



function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
  if (typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var LogType = Object.freeze({
  error: /** @type {"error"} */"error",
  // message, c style arguments
  warn: /** @type {"warn"} */"warn",
  // message, c style arguments
  info: /** @type {"info"} */"info",
  // message, c style arguments
  log: /** @type {"log"} */"log",
  // message, c style arguments
  debug: /** @type {"debug"} */"debug",
  // message, c style arguments

  trace: /** @type {"trace"} */"trace",
  // no arguments

  group: /** @type {"group"} */"group",
  // [label]
  groupCollapsed: /** @type {"groupCollapsed"} */"groupCollapsed",
  // [label]
  groupEnd: /** @type {"groupEnd"} */"groupEnd",
  // [label]

  profile: /** @type {"profile"} */"profile",
  // [profileName]
  profileEnd: /** @type {"profileEnd"} */"profileEnd",
  // [profileName]

  time: /** @type {"time"} */"time",
  // name, time as [seconds, nanoseconds]

  clear: /** @type {"clear"} */"clear",
  // no arguments
  status: /** @type {"status"} */"status" // message, arguments
});

exports.LogType = LogType;

/** @typedef {typeof LogType[keyof typeof LogType]} LogTypeEnum */

var LOG_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger raw log method");
var TIMERS_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger times");
var TIMERS_AGGREGATES_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger aggregated times");
var WebpackLogger = /*#__PURE__*/function () {
  /**
   * @param {function(LogTypeEnum, any[]=): void} log log function
   * @param {function(string | function(): string): WebpackLogger} getChildLogger function to create child logger
   */
  function WebpackLogger(log, getChildLogger) {
    _classCallCheck(this, WebpackLogger);
    this[LOG_SYMBOL] = log;
    this.getChildLogger = getChildLogger;
  }
  _createClass(WebpackLogger, [{
    key: "error",
    value: function error() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      this[LOG_SYMBOL](LogType.error, args);
    }
  }, {
    key: "warn",
    value: function warn() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      this[LOG_SYMBOL](LogType.warn, args);
    }
  }, {
    key: "info",
    value: function info() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      this[LOG_SYMBOL](LogType.info, args);
    }
  }, {
    key: "log",
    value: function log() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      this[LOG_SYMBOL](LogType.log, args);
    }
  }, {
    key: "debug",
    value: function debug() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      this[LOG_SYMBOL](LogType.debug, args);
    }
  }, {
    key: "assert",
    value: function assert(assertion) {
      if (!assertion) {
        for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
          args[_key6 - 1] = arguments[_key6];
        }
        this[LOG_SYMBOL](LogType.error, args);
      }
    }
  }, {
    key: "trace",
    value: function trace() {
      this[LOG_SYMBOL](LogType.trace, ["Trace"]);
    }
  }, {
    key: "clear",
    value: function clear() {
      this[LOG_SYMBOL](LogType.clear);
    }
  }, {
    key: "status",
    value: function status() {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      this[LOG_SYMBOL](LogType.status, args);
    }
  }, {
    key: "group",
    value: function group() {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      this[LOG_SYMBOL](LogType.group, args);
    }
  }, {
    key: "groupCollapsed",
    value: function groupCollapsed() {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }
      this[LOG_SYMBOL](LogType.groupCollapsed, args);
    }
  }, {
    key: "groupEnd",
    value: function groupEnd() {
      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }
      this[LOG_SYMBOL](LogType.groupEnd, args);
    }
  }, {
    key: "profile",
    value: function profile(label) {
      this[LOG_SYMBOL](LogType.profile, [label]);
    }
  }, {
    key: "profileEnd",
    value: function profileEnd(label) {
      this[LOG_SYMBOL](LogType.profileEnd, [label]);
    }
  }, {
    key: "time",
    value: function time(label) {
      this[TIMERS_SYMBOL] = this[TIMERS_SYMBOL] || new Map();
      this[TIMERS_SYMBOL].set(label, process.hrtime());
    }
  }, {
    key: "timeLog",
    value: function timeLog(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeLog()"));
      }
      var time = process.hrtime(prev);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }, {
    key: "timeEnd",
    value: function timeEnd(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeEnd()"));
      }
      var time = process.hrtime(prev);
      this[TIMERS_SYMBOL].delete(label);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }, {
    key: "timeAggregate",
    value: function timeAggregate(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeAggregate()"));
      }
      var time = process.hrtime(prev);
      this[TIMERS_SYMBOL].delete(label);
      this[TIMERS_AGGREGATES_SYMBOL] = this[TIMERS_AGGREGATES_SYMBOL] || new Map();
      var current = this[TIMERS_AGGREGATES_SYMBOL].get(label);
      if (current !== undefined) {
        if (time[1] + current[1] > 1e9) {
          time[0] += current[0] + 1;
          time[1] = time[1] - 1e9 + current[1];
        } else {
          time[0] += current[0];
          time[1] += current[1];
        }
      }
      this[TIMERS_AGGREGATES_SYMBOL].set(label, time);
    }
  }, {
    key: "timeAggregateEnd",
    value: function timeAggregateEnd(label) {
      if (this[TIMERS_AGGREGATES_SYMBOL] === undefined) return;
      var time = this[TIMERS_AGGREGATES_SYMBOL].get(label);
      if (time === undefined) return;
      this[TIMERS_AGGREGATES_SYMBOL].delete(label);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }]);
  return WebpackLogger;
}();
exports.Logger = WebpackLogger;

/***/ }),

/***/ "./node_modules/webpack/lib/logging/createConsoleLogger.js":
/*!*****************************************************************!*\
  !*** ./node_modules/webpack/lib/logging/createConsoleLogger.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __nested_webpack_require_11285__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/



function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
  if (typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
var _require = __nested_webpack_require_11285__(/*! ./Logger */ "./node_modules/webpack/lib/logging/Logger.js"),
  LogType = _require.LogType;

/** @typedef {import("../../declarations/WebpackOptions").FilterItemTypes} FilterItemTypes */
/** @typedef {import("../../declarations/WebpackOptions").FilterTypes} FilterTypes */
/** @typedef {import("./Logger").LogTypeEnum} LogTypeEnum */

/** @typedef {function(string): boolean} FilterFunction */

/**
 * @typedef {Object} LoggerConsole
 * @property {function(): void} clear
 * @property {function(): void} trace
 * @property {(...args: any[]) => void} info
 * @property {(...args: any[]) => void} log
 * @property {(...args: any[]) => void} warn
 * @property {(...args: any[]) => void} error
 * @property {(...args: any[]) => void=} debug
 * @property {(...args: any[]) => void=} group
 * @property {(...args: any[]) => void=} groupCollapsed
 * @property {(...args: any[]) => void=} groupEnd
 * @property {(...args: any[]) => void=} status
 * @property {(...args: any[]) => void=} profile
 * @property {(...args: any[]) => void=} profileEnd
 * @property {(...args: any[]) => void=} logTime
 */

/**
 * @typedef {Object} LoggerOptions
 * @property {false|true|"none"|"error"|"warn"|"info"|"log"|"verbose"} level loglevel
 * @property {FilterTypes|boolean} debug filter for debug logging
 * @property {LoggerConsole} console the console to log to
 */

/**
 * @param {FilterItemTypes} item an input item
 * @returns {FilterFunction} filter function
 */
var filterToFunction = function filterToFunction(item) {
  if (typeof item === "string") {
    var regExp = new RegExp("[\\\\/]".concat(item.replace(
    // eslint-disable-next-line no-useless-escape
    /[-[\]{}()*+?.\\^$|]/g, "\\$&"), "([\\\\/]|$|!|\\?)"));
    return function (ident) {
      return regExp.test(ident);
    };
  }
  if (item && typeof item === "object" && typeof item.test === "function") {
    return function (ident) {
      return item.test(ident);
    };
  }
  if (typeof item === "function") {
    return item;
  }
  if (typeof item === "boolean") {
    return function () {
      return item;
    };
  }
};

/**
 * @enum {number}
 */
var LogLevel = {
  none: 6,
  false: 6,
  error: 5,
  warn: 4,
  info: 3,
  log: 2,
  true: 2,
  verbose: 1
};

/**
 * @param {LoggerOptions} options options object
 * @returns {function(string, LogTypeEnum, any[]): void} logging function
 */
module.exports = function (_ref) {
  var _ref$level = _ref.level,
    level = _ref$level === void 0 ? "info" : _ref$level,
    _ref$debug = _ref.debug,
    debug = _ref$debug === void 0 ? false : _ref$debug,
    console = _ref.console;
  var debugFilters = typeof debug === "boolean" ? [function () {
    return debug;
  }] : /** @type {FilterItemTypes[]} */[].concat(debug).map(filterToFunction);
  /** @type {number} */
  var loglevel = LogLevel["".concat(level)] || 0;

  /**
   * @param {string} name name of the logger
   * @param {LogTypeEnum} type type of the log entry
   * @param {any[]} args arguments of the log entry
   * @returns {void}
   */
  var logger = function logger(name, type, args) {
    var labeledArgs = function labeledArgs() {
      if (Array.isArray(args)) {
        if (args.length > 0 && typeof args[0] === "string") {
          return ["[".concat(name, "] ").concat(args[0])].concat(_toConsumableArray(args.slice(1)));
        } else {
          return ["[".concat(name, "]")].concat(_toConsumableArray(args));
        }
      } else {
        return [];
      }
    };
    var debug = debugFilters.some(function (f) {
      return f(name);
    });
    switch (type) {
      case LogType.debug:
        if (!debug) return;
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.debug === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.debug.apply(console, _toConsumableArray(labeledArgs()));
        } else {
          console.log.apply(console, _toConsumableArray(labeledArgs()));
        }
        break;
      case LogType.log:
        if (!debug && loglevel > LogLevel.log) return;
        console.log.apply(console, _toConsumableArray(labeledArgs()));
        break;
      case LogType.info:
        if (!debug && loglevel > LogLevel.info) return;
        console.info.apply(console, _toConsumableArray(labeledArgs()));
        break;
      case LogType.warn:
        if (!debug && loglevel > LogLevel.warn) return;
        console.warn.apply(console, _toConsumableArray(labeledArgs()));
        break;
      case LogType.error:
        if (!debug && loglevel > LogLevel.error) return;
        console.error.apply(console, _toConsumableArray(labeledArgs()));
        break;
      case LogType.trace:
        if (!debug) return;
        console.trace();
        break;
      case LogType.groupCollapsed:
        if (!debug && loglevel > LogLevel.log) return;
        if (!debug && loglevel > LogLevel.verbose) {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          if (typeof console.groupCollapsed === "function") {
            // eslint-disable-next-line node/no-unsupported-features/node-builtins
            console.groupCollapsed.apply(console, _toConsumableArray(labeledArgs()));
          } else {
            console.log.apply(console, _toConsumableArray(labeledArgs()));
          }
          break;
        }
      // falls through
      case LogType.group:
        if (!debug && loglevel > LogLevel.log) return;
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.group === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.group.apply(console, _toConsumableArray(labeledArgs()));
        } else {
          console.log.apply(console, _toConsumableArray(labeledArgs()));
        }
        break;
      case LogType.groupEnd:
        if (!debug && loglevel > LogLevel.log) return;
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.groupEnd === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.groupEnd();
        }
        break;
      case LogType.time:
        {
          if (!debug && loglevel > LogLevel.log) return;
          var ms = args[1] * 1000 + args[2] / 1000000;
          var msg = "[".concat(name, "] ").concat(args[0], ": ").concat(ms, " ms");
          if (typeof console.logTime === "function") {
            console.logTime(msg);
          } else {
            console.log(msg);
          }
          break;
        }
      case LogType.profile:
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.profile === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.profile.apply(console, _toConsumableArray(labeledArgs()));
        }
        break;
      case LogType.profileEnd:
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.profileEnd === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.profileEnd.apply(console, _toConsumableArray(labeledArgs()));
        }
        break;
      case LogType.clear:
        if (!debug && loglevel > LogLevel.log) return;
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.clear === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.clear();
        }
        break;
      case LogType.status:
        if (!debug && loglevel > LogLevel.info) return;
        if (typeof console.status === "function") {
          if (args.length === 0) {
            console.status();
          } else {
            console.status.apply(console, _toConsumableArray(labeledArgs()));
          }
        } else {
          if (args.length !== 0) {
            console.info.apply(console, _toConsumableArray(labeledArgs()));
          }
        }
        break;
      default:
        throw new Error("Unexpected LogType ".concat(type));
    }
  };
  return logger;
};

/***/ }),

/***/ "./node_modules/webpack/lib/logging/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/webpack/lib/logging/runtime.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_21334__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/



function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var SyncBailHook = __nested_webpack_require_21334__(/*! tapable/lib/SyncBailHook */ "./client-src/modules/logger/SyncBailHookFake.js");
var _require = __nested_webpack_require_21334__(/*! ./Logger */ "./node_modules/webpack/lib/logging/Logger.js"),
  Logger = _require.Logger;
var createConsoleLogger = __nested_webpack_require_21334__(/*! ./createConsoleLogger */ "./node_modules/webpack/lib/logging/createConsoleLogger.js");

/** @type {createConsoleLogger.LoggerOptions} */
var currentDefaultLoggerOptions = {
  level: "info",
  debug: false,
  console: console
};
var currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);

/**
 * @param {string} name name of the logger
 * @returns {Logger} a logger
 */
exports.getLogger = function (name) {
  return new Logger(function (type, args) {
    if (exports.hooks.log.call(name, type, args) === undefined) {
      currentDefaultLogger(name, type, args);
    }
  }, function (childName) {
    return exports.getLogger("".concat(name, "/").concat(childName));
  });
};

/**
 * @param {createConsoleLogger.LoggerOptions} options new options, merge with old options
 * @returns {void}
 */
exports.configureDefaultLogger = function (options) {
  _extends(currentDefaultLoggerOptions, options);
  currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);
};
exports.hooks = {
  log: new SyncBailHook(["origin", "type", "args"])
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_23461__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_23461__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_23461__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_23461__.o(definition, key) && !__nested_webpack_require_23461__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__nested_webpack_require_23461__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_23461__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __nested_webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!********************************************!*\
  !*** ./client-src/modules/logger/index.js ***!
  \********************************************/
__nested_webpack_require_23461__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_23461__.d(__nested_webpack_exports__, {
/* harmony export */   "default": function() { return /* reexport default export from named module */ webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__; }
/* harmony export */ });
/* harmony import */ var webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_23461__(/*! webpack/lib/logging/runtime.js */ "./node_modules/webpack/lib/logging/runtime.js");

}();
var __webpack_export_target__ = exports;
for(var i in __nested_webpack_exports__) __webpack_export_target__[i] = __nested_webpack_exports__[i];
if(__nested_webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay.js":
/*!***********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createOverlay: () => (/* binding */ createOverlay),
/* harmony export */   formatProblem: () => (/* binding */ formatProblem)
/* harmony export */ });
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ansi-html-community */ "./node_modules/ansi-html-community/index.js");
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ansi_html_community__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! html-entities */ "./node_modules/html-entities/lib/index.js");
/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(html_entities__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./overlay/runtime-error.js */ "./node_modules/webpack-dev-server/client/overlay/runtime-error.js");
/* harmony import */ var _overlay_state_machine_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./overlay/state-machine.js */ "./node_modules/webpack-dev-server/client/overlay/state-machine.js");
/* harmony import */ var _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./overlay/styles.js */ "./node_modules/webpack-dev-server/client/overlay/styles.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)
// They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).






var colors = {
  reset: ["transparent", "transparent"],
  black: "181818",
  red: "E36049",
  green: "B3CB74",
  yellow: "FFD080",
  blue: "7CAFC2",
  magenta: "7FACCA",
  cyan: "C3C2EF",
  lightgrey: "EBE7E3",
  darkgrey: "6D7891"
};
ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default().setColors(colors);

/**
 * @param {string} type
 * @param {string  | { file?: string, moduleName?: string, loc?: string, message?: string; stack?: string[] }} item
 * @returns {{ header: string, body: string }}
 */
function formatProblem(type, item) {
  var header = type === "warning" ? "WARNING" : "ERROR";
  var body = "";
  if (typeof item === "string") {
    body += item;
  } else {
    var file = item.file || "";
    // eslint-disable-next-line no-nested-ternary
    var moduleName = item.moduleName ? item.moduleName.indexOf("!") !== -1 ? "".concat(item.moduleName.replace(/^(\s|\S)*!/, ""), " (").concat(item.moduleName, ")") : "".concat(item.moduleName) : "";
    var loc = item.loc;
    header += "".concat(moduleName || file ? " in ".concat(moduleName ? "".concat(moduleName).concat(file ? " (".concat(file, ")") : "") : file).concat(loc ? " ".concat(loc) : "") : "");
    body += item.message || "";
  }
  if (Array.isArray(item.stack)) {
    item.stack.forEach(function (stack) {
      if (typeof stack === "string") {
        body += "\r\n".concat(stack);
      }
    });
  }
  return {
    header: header,
    body: body
  };
}

/**
 * @typedef {Object} CreateOverlayOptions
 * @property {string | null} trustedTypesPolicyName
 * @property {boolean | (error: Error) => void} [catchRuntimeError]
 */

/**
 *
 * @param {CreateOverlayOptions} options
 */
var createOverlay = function createOverlay(options) {
  /** @type {HTMLIFrameElement | null | undefined} */
  var iframeContainerElement;
  /** @type {HTMLDivElement | null | undefined} */
  var containerElement;
  /** @type {HTMLDivElement | null | undefined} */
  var headerElement;
  /** @type {Array<(element: HTMLDivElement) => void>} */
  var onLoadQueue = [];
  /** @type {TrustedTypePolicy | undefined} */
  var overlayTrustedTypesPolicy;

  /**
   *
   * @param {HTMLElement} element
   * @param {CSSStyleDeclaration} style
   */
  function applyStyle(element, style) {
    Object.keys(style).forEach(function (prop) {
      element.style[prop] = style[prop];
    });
  }

  /**
   * @param {string | null} trustedTypesPolicyName
   */
  function createContainer(trustedTypesPolicyName) {
    // Enable Trusted Types if they are available in the current browser.
    if (window.trustedTypes) {
      overlayTrustedTypesPolicy = window.trustedTypes.createPolicy(trustedTypesPolicyName || "webpack-dev-server#overlay", {
        createHTML: function createHTML(value) {
          return value;
        }
      });
    }
    iframeContainerElement = document.createElement("iframe");
    iframeContainerElement.id = "webpack-dev-server-client-overlay";
    iframeContainerElement.src = "about:blank";
    applyStyle(iframeContainerElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.iframeStyle);
    iframeContainerElement.onload = function () {
      var contentElement = /** @type {Document} */
      /** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument.createElement("div");
      containerElement = /** @type {Document} */
      /** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument.createElement("div");
      contentElement.id = "webpack-dev-server-client-overlay-div";
      applyStyle(contentElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.containerStyle);
      headerElement = document.createElement("div");
      headerElement.innerText = "Compiled with problems:";
      applyStyle(headerElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.headerStyle);
      var closeButtonElement = document.createElement("button");
      applyStyle(closeButtonElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.dismissButtonStyle);
      closeButtonElement.innerText = "×";
      closeButtonElement.ariaLabel = "Dismiss";
      closeButtonElement.addEventListener("click", function () {
        // eslint-disable-next-line no-use-before-define
        overlayService.send({
          type: "DISMISS"
        });
      });
      contentElement.appendChild(headerElement);
      contentElement.appendChild(closeButtonElement);
      contentElement.appendChild(containerElement);

      /** @type {Document} */
      /** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument.body.appendChild(contentElement);
      onLoadQueue.forEach(function (onLoad) {
        onLoad( /** @type {HTMLDivElement} */contentElement);
      });
      onLoadQueue = [];

      /** @type {HTMLIFrameElement} */
      iframeContainerElement.onload = null;
    };
    document.body.appendChild(iframeContainerElement);
  }

  /**
   * @param {(element: HTMLDivElement) => void} callback
   * @param {string | null} trustedTypesPolicyName
   */
  function ensureOverlayExists(callback, trustedTypesPolicyName) {
    if (containerElement) {
      containerElement.innerHTML = "";
      // Everything is ready, call the callback right away.
      callback(containerElement);
      return;
    }
    onLoadQueue.push(callback);
    if (iframeContainerElement) {
      return;
    }
    createContainer(trustedTypesPolicyName);
  }

  // Successful compilation.
  function hide() {
    if (!iframeContainerElement) {
      return;
    }

    // Clean up and reset internal state.
    document.body.removeChild(iframeContainerElement);
    iframeContainerElement = null;
    containerElement = null;
  }

  // Compilation with errors (e.g. syntax error or missing modules).
  /**
   * @param {string} type
   * @param {Array<string  | { moduleIdentifier?: string, moduleName?: string, loc?: string, message?: string }>} messages
   * @param {string | null} trustedTypesPolicyName
   * @param {'build' | 'runtime'} messageSource
   */
  function show(type, messages, trustedTypesPolicyName, messageSource) {
    ensureOverlayExists(function () {
      headerElement.innerText = messageSource === "runtime" ? "Uncaught runtime errors:" : "Compiled with problems:";
      messages.forEach(function (message) {
        var entryElement = document.createElement("div");
        var msgStyle = type === "warning" ? _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgStyles.warning : _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgStyles.error;
        applyStyle(entryElement, _objectSpread(_objectSpread({}, msgStyle), {}, {
          padding: "1rem 1rem 1.5rem 1rem"
        }));
        var typeElement = document.createElement("div");
        var _formatProblem = formatProblem(type, message),
          header = _formatProblem.header,
          body = _formatProblem.body;
        typeElement.innerText = header;
        applyStyle(typeElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgTypeStyle);
        if (message.moduleIdentifier) {
          applyStyle(typeElement, {
            cursor: "pointer"
          });
          // element.dataset not supported in IE
          typeElement.setAttribute("data-can-open", true);
          typeElement.addEventListener("click", function () {
            fetch("/webpack-dev-server/open-editor?fileName=".concat(message.moduleIdentifier));
          });
        }

        // Make it look similar to our terminal.
        var text = ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default()((0,html_entities__WEBPACK_IMPORTED_MODULE_4__.encode)(body));
        var messageTextNode = document.createElement("div");
        applyStyle(messageTextNode, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgTextStyle);
        messageTextNode.innerHTML = overlayTrustedTypesPolicy ? overlayTrustedTypesPolicy.createHTML(text) : text;
        entryElement.appendChild(typeElement);
        entryElement.appendChild(messageTextNode);

        /** @type {HTMLDivElement} */
        containerElement.appendChild(entryElement);
      });
    }, trustedTypesPolicyName);
  }
  var overlayService = (0,_overlay_state_machine_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
    showOverlay: function showOverlay(_ref) {
      var _ref$level = _ref.level,
        level = _ref$level === void 0 ? "error" : _ref$level,
        messages = _ref.messages,
        messageSource = _ref.messageSource;
      return show(level, messages, options.trustedTypesPolicyName, messageSource);
    },
    hideOverlay: hide
  });
  if (options.catchRuntimeError) {
    /**
     * @param {Error | undefined} error
     * @param {string} fallbackMessage
     */
    var handleError = function handleError(error, fallbackMessage) {
      var errorObject = error instanceof Error ? error : new Error(error || fallbackMessage);
      var shouldDisplay = typeof options.catchRuntimeError === "function" ? options.catchRuntimeError(errorObject) : true;
      if (shouldDisplay) {
        overlayService.send({
          type: "RUNTIME_ERROR",
          messages: [{
            message: errorObject.message,
            stack: (0,_overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__.parseErrorToStacks)(errorObject)
          }]
        });
      }
    };
    (0,_overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__.listenToRuntimeError)(function (errorEvent) {
      // error property may be empty in older browser like IE
      var error = errorEvent.error,
        message = errorEvent.message;
      if (!error && !message) {
        return;
      }
      handleError(error, message);
    });
    (0,_overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__.listenToUnhandledRejection)(function (promiseRejectionEvent) {
      var reason = promiseRejectionEvent.reason;
      handleError(reason, "Unknown promise rejection reason");
    });
  }
  return overlayService;
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/fsm.js":
/*!***************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/fsm.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * @typedef {Object} StateDefinitions
 * @property {{[event: string]: { target: string; actions?: Array<string> }}} [on]
 */

/**
 * @typedef {Object} Options
 * @property {{[state: string]: StateDefinitions}} states
 * @property {object} context;
 * @property {string} initial
 */

/**
 * @typedef {Object} Implementation
 * @property {{[actionName: string]: (ctx: object, event: any) => object}} actions
 */

/**
 * A simplified `createMachine` from `@xstate/fsm` with the following differences:
 *
 *  - the returned machine is technically a "service". No `interpret(machine).start()` is needed.
 *  - the state definition only support `on` and target must be declared with { target: 'nextState', actions: [] } explicitly.
 *  - event passed to `send` must be an object with `type` property.
 *  - actions implementation will be [assign action](https://xstate.js.org/docs/guides/context.html#assign-action) if you return any value.
 *  Do not return anything if you just want to invoke side effect.
 *
 * The goal of this custom function is to avoid installing the entire `'xstate/fsm'` package, while enabling modeling using
 * state machine. You can copy the first parameter into the editor at https://stately.ai/viz to visualize the state machine.
 *
 * @param {Options} options
 * @param {Implementation} implementation
 */
function createMachine(_ref, _ref2) {
  var states = _ref.states,
    context = _ref.context,
    initial = _ref.initial;
  var actions = _ref2.actions;
  var currentState = initial;
  var currentContext = context;
  return {
    send: function send(event) {
      var currentStateOn = states[currentState].on;
      var transitionConfig = currentStateOn && currentStateOn[event.type];
      if (transitionConfig) {
        currentState = transitionConfig.target;
        if (transitionConfig.actions) {
          transitionConfig.actions.forEach(function (actName) {
            var actionImpl = actions[actName];
            var nextContextValue = actionImpl && actionImpl(currentContext, event);
            if (nextContextValue) {
              currentContext = _objectSpread(_objectSpread({}, currentContext), nextContextValue);
            }
          });
        }
      }
    }
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createMachine);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/runtime-error.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/runtime-error.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   listenToRuntimeError: () => (/* binding */ listenToRuntimeError),
/* harmony export */   listenToUnhandledRejection: () => (/* binding */ listenToUnhandledRejection),
/* harmony export */   parseErrorToStacks: () => (/* binding */ parseErrorToStacks)
/* harmony export */ });
/**
 *
 * @param {Error} error
 */
function parseErrorToStacks(error) {
  if (!error || !(error instanceof Error)) {
    throw new Error("parseErrorToStacks expects Error object");
  }
  if (typeof error.stack === "string") {
    return error.stack.split("\n").filter(function (stack) {
      return stack !== "Error: ".concat(error.message);
    });
  }
}

/**
 * @callback ErrorCallback
 * @param {ErrorEvent} error
 * @returns {void}
 */

/**
 * @param {ErrorCallback} callback
 */
function listenToRuntimeError(callback) {
  window.addEventListener("error", callback);
  return function cleanup() {
    window.removeEventListener("error", callback);
  };
}

/**
 * @callback UnhandledRejectionCallback
 * @param {PromiseRejectionEvent} rejectionEvent
 * @returns {void}
 */

/**
 * @param {UnhandledRejectionCallback} callback
 */
function listenToUnhandledRejection(callback) {
  window.addEventListener("unhandledrejection", callback);
  return function cleanup() {
    window.removeEventListener("unhandledrejection", callback);
  };
}


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/state-machine.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/state-machine.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _fsm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fsm.js */ "./node_modules/webpack-dev-server/client/overlay/fsm.js");


/**
 * @typedef {Object} ShowOverlayData
 * @property {'warning' | 'error'} level
 * @property {Array<string  | { moduleIdentifier?: string, moduleName?: string, loc?: string, message?: string }>} messages
 * @property {'build' | 'runtime'} messageSource
 */

/**
 * @typedef {Object} CreateOverlayMachineOptions
 * @property {(data: ShowOverlayData) => void} showOverlay
 * @property {() => void} hideOverlay
 */

/**
 * @param {CreateOverlayMachineOptions} options
 */
var createOverlayMachine = function createOverlayMachine(options) {
  var hideOverlay = options.hideOverlay,
    showOverlay = options.showOverlay;
  var overlayMachine = (0,_fsm_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    initial: "hidden",
    context: {
      level: "error",
      messages: [],
      messageSource: "build"
    },
    states: {
      hidden: {
        on: {
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["setMessages", "showOverlay"]
          },
          RUNTIME_ERROR: {
            target: "displayRuntimeError",
            actions: ["setMessages", "showOverlay"]
          }
        }
      },
      displayBuildError: {
        on: {
          DISMISS: {
            target: "hidden",
            actions: ["dismissMessages", "hideOverlay"]
          },
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["appendMessages", "showOverlay"]
          }
        }
      },
      displayRuntimeError: {
        on: {
          DISMISS: {
            target: "hidden",
            actions: ["dismissMessages", "hideOverlay"]
          },
          RUNTIME_ERROR: {
            target: "displayRuntimeError",
            actions: ["appendMessages", "showOverlay"]
          },
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["setMessages", "showOverlay"]
          }
        }
      }
    }
  }, {
    actions: {
      dismissMessages: function dismissMessages() {
        return {
          messages: [],
          level: "error",
          messageSource: "build"
        };
      },
      appendMessages: function appendMessages(context, event) {
        return {
          messages: context.messages.concat(event.messages),
          level: event.level || context.level,
          messageSource: event.type === "RUNTIME_ERROR" ? "runtime" : "build"
        };
      },
      setMessages: function setMessages(context, event) {
        return {
          messages: event.messages,
          level: event.level || context.level,
          messageSource: event.type === "RUNTIME_ERROR" ? "runtime" : "build"
        };
      },
      hideOverlay: hideOverlay,
      showOverlay: showOverlay
    }
  });
  return overlayMachine;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createOverlayMachine);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/styles.js":
/*!******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/styles.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   containerStyle: () => (/* binding */ containerStyle),
/* harmony export */   dismissButtonStyle: () => (/* binding */ dismissButtonStyle),
/* harmony export */   headerStyle: () => (/* binding */ headerStyle),
/* harmony export */   iframeStyle: () => (/* binding */ iframeStyle),
/* harmony export */   msgStyles: () => (/* binding */ msgStyles),
/* harmony export */   msgTextStyle: () => (/* binding */ msgTextStyle),
/* harmony export */   msgTypeStyle: () => (/* binding */ msgTypeStyle)
/* harmony export */ });
// styles are inspired by `react-error-overlay`

var msgStyles = {
  error: {
    backgroundColor: "rgba(206, 17, 38, 0.1)",
    color: "#fccfcf"
  },
  warning: {
    backgroundColor: "rgba(251, 245, 180, 0.1)",
    color: "#fbf5b4"
  }
};
var iframeStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: "100vw",
  height: "100vh",
  border: "none",
  "z-index": 9999999999
};
var containerStyle = {
  position: "fixed",
  boxSizing: "border-box",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  width: "100vw",
  height: "100vh",
  fontSize: "large",
  padding: "2rem 2rem 4rem 2rem",
  lineHeight: "1.2",
  whiteSpace: "pre-wrap",
  overflow: "auto",
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  color: "white"
};
var headerStyle = {
  color: "#e83b46",
  fontSize: "2em",
  whiteSpace: "pre-wrap",
  fontFamily: "sans-serif",
  margin: "0 2rem 2rem 0",
  flex: "0 0 auto",
  maxHeight: "50%",
  overflow: "auto"
};
var dismissButtonStyle = {
  color: "#ffffff",
  lineHeight: "1rem",
  fontSize: "1.5rem",
  padding: "1rem",
  cursor: "pointer",
  position: "absolute",
  right: 0,
  top: 0,
  backgroundColor: "transparent",
  border: "none"
};
var msgTypeStyle = {
  color: "#e83b46",
  fontSize: "1.2em",
  marginBottom: "1rem",
  fontFamily: "sans-serif"
};
var msgTextStyle = {
  lineHeight: "1.5",
  fontSize: "1rem",
  fontFamily: "Menlo, Consolas, monospace"
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/socket.js":
/*!**********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/socket.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   client: () => (/* binding */ client),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* provided dependency */ var __webpack_dev_server_client__ = __webpack_require__(/*! ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* global __webpack_dev_server_client__ */




// this WebsocketClient is here as a default fallback, in case the client is not injected
/* eslint-disable camelcase */
var Client =
// eslint-disable-next-line no-nested-ternary
typeof __webpack_dev_server_client__ !== "undefined" ? typeof __webpack_dev_server_client__.default !== "undefined" ? __webpack_dev_server_client__.default : __webpack_dev_server_client__ : _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__["default"];
/* eslint-enable camelcase */

var retries = 0;
var maxRetries = 10;

// Initialized client is exported so external consumers can utilize the same instance
// It is mutable to enforce singleton
// eslint-disable-next-line import/no-mutable-exports
var client = null;

/**
 * @param {string} url
 * @param {{ [handler: string]: (data?: any, params?: any) => any }} handlers
 * @param {number} [reconnect]
 */
var socket = function initSocket(url, handlers, reconnect) {
  client = new Client(url);
  client.onOpen(function () {
    retries = 0;
    if (typeof reconnect !== "undefined") {
      maxRetries = reconnect;
    }
  });
  client.onClose(function () {
    if (retries === 0) {
      handlers.close();
    }

    // Try to reconnect.
    client = null;

    // After 10 retries stop trying, to prevent logspam.
    if (retries < maxRetries) {
      // Exponentially increase timeout to reconnect.
      // Respectfully copied from the package `got`.
      // eslint-disable-next-line no-restricted-properties
      var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;
      retries += 1;
      _utils_log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("Trying to reconnect...");
      setTimeout(function () {
        socket(url, handlers, reconnect);
      }, retryInMs);
    }
  });
  client.onMessage(
  /**
   * @param {any} data
   */
  function (data) {
    var message = JSON.parse(data);
    if (handlers[message.type]) {
      handlers[message.type](message.data, message.params);
    }
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (socket);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/createSocketURL.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @param {{ protocol?: string, auth?: string, hostname?: string, port?: string, pathname?: string, search?: string, hash?: string, slashes?: boolean }} objURL
 * @returns {string}
 */
function format(objURL) {
  var protocol = objURL.protocol || "";
  if (protocol && protocol.substr(-1) !== ":") {
    protocol += ":";
  }
  var auth = objURL.auth || "";
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ":");
    auth += "@";
  }
  var host = "";
  if (objURL.hostname) {
    host = auth + (objURL.hostname.indexOf(":") === -1 ? objURL.hostname : "[".concat(objURL.hostname, "]"));
    if (objURL.port) {
      host += ":".concat(objURL.port);
    }
  }
  var pathname = objURL.pathname || "";
  if (objURL.slashes) {
    host = "//".concat(host || "");
    if (pathname && pathname.charAt(0) !== "/") {
      pathname = "/".concat(pathname);
    }
  } else if (!host) {
    host = "";
  }
  var search = objURL.search || "";
  if (search && search.charAt(0) !== "?") {
    search = "?".concat(search);
  }
  var hash = objURL.hash || "";
  if (hash && hash.charAt(0) !== "#") {
    hash = "#".concat(hash);
  }
  pathname = pathname.replace(/[?#]/g,
  /**
   * @param {string} match
   * @returns {string}
   */
  function (match) {
    return encodeURIComponent(match);
  });
  search = search.replace("#", "%23");
  return "".concat(protocol).concat(host).concat(pathname).concat(search).concat(hash);
}

/**
 * @param {URL & { fromCurrentScript?: boolean }} parsedURL
 * @returns {string}
 */
function createSocketURL(parsedURL) {
  var hostname = parsedURL.hostname;

  // Node.js module parses it as `::`
  // `new URL(urlString, [baseURLString])` parses it as '[::]'
  var isInAddrAny = hostname === "0.0.0.0" || hostname === "::" || hostname === "[::]";

  // why do we need this check?
  // hostname n/a for file protocol (example, when using electron, ionic)
  // see: https://github.com/webpack/webpack-dev-server/pull/384
  if (isInAddrAny && self.location.hostname && self.location.protocol.indexOf("http") === 0) {
    hostname = self.location.hostname;
  }
  var socketURLProtocol = parsedURL.protocol || self.location.protocol;

  // When https is used in the app, secure web sockets are always necessary because the browser doesn't accept non-secure web sockets.
  if (socketURLProtocol === "auto:" || hostname && isInAddrAny && self.location.protocol === "https:") {
    socketURLProtocol = self.location.protocol;
  }
  socketURLProtocol = socketURLProtocol.replace(/^(?:http|.+-extension|file)/i, "ws");
  var socketURLAuth = "";

  // `new URL(urlString, [baseURLstring])` doesn't have `auth` property
  // Parse authentication credentials in case we need them
  if (parsedURL.username) {
    socketURLAuth = parsedURL.username;

    // Since HTTP basic authentication does not allow empty username,
    // we only include password if the username is not empty.
    if (parsedURL.password) {
      // Result: <username>:<password>
      socketURLAuth = socketURLAuth.concat(":", parsedURL.password);
    }
  }

  // In case the host is a raw IPv6 address, it can be enclosed in
  // the brackets as the brackets are needed in the final URL string.
  // Need to remove those as url.format blindly adds its own set of brackets
  // if the host string contains colons. That would lead to non-working
  // double brackets (e.g. [[::]]) host
  //
  // All of these web socket url params are optionally passed in through resourceQuery,
  // so we need to fall back to the default if they are not provided
  var socketURLHostname = (hostname || self.location.hostname || "localhost").replace(/^\[(.*)\]$/, "$1");
  var socketURLPort = parsedURL.port;
  if (!socketURLPort || socketURLPort === "0") {
    socketURLPort = self.location.port;
  }

  // If path is provided it'll be passed in via the resourceQuery as a
  // query param so it has to be parsed out of the querystring in order for the
  // client to open the socket to the correct location.
  var socketURLPathname = "/ws";
  if (parsedURL.pathname && !parsedURL.fromCurrentScript) {
    socketURLPathname = parsedURL.pathname;
  }
  return format({
    protocol: socketURLProtocol,
    auth: socketURLAuth,
    hostname: socketURLHostname,
    port: socketURLPort,
    pathname: socketURLPathname,
    slashes: true
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createSocketURL);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js":
/*!********************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @returns {string}
 */
function getCurrentScriptSource() {
  // `document.currentScript` is the most accurate way to find the current script,
  // but is not supported in all browsers.
  if (document.currentScript) {
    return document.currentScript.getAttribute("src");
  }

  // Fallback to getting all scripts running in the document.
  var scriptElements = document.scripts || [];
  var scriptElementsWithSrc = Array.prototype.filter.call(scriptElements, function (element) {
    return element.getAttribute("src");
  });
  if (scriptElementsWithSrc.length > 0) {
    var currentScript = scriptElementsWithSrc[scriptElementsWithSrc.length - 1];
    return currentScript.getAttribute("src");
  }

  // Fail as there was no script to use.
  throw new Error("[webpack-dev-server] Failed to get current script source.");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getCurrentScriptSource);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/log.js":
/*!*************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/log.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   log: () => (/* binding */ log),
/* harmony export */   logEnabledFeatures: () => (/* binding */ logEnabledFeatures),
/* harmony export */   setLogLevel: () => (/* binding */ setLogLevel)
/* harmony export */ });
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/logger/index.js */ "./node_modules/webpack-dev-server/client/modules/logger/index.js");
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__);

var name = "webpack-dev-server";
// default level is set on the client side, so it does not need
// to be set by the CLI or API
var defaultLevel = "info";

// options new options, merge with old options
/**
 * @param {false | true | "none" | "error" | "warn" | "info" | "log" | "verbose"} level
 * @returns {void}
 */
function setLogLevel(level) {
  _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().configureDefaultLogger({
    level: level
  });
}
setLogLevel(defaultLevel);
var log = _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().getLogger(name);
var logEnabledFeatures = function logEnabledFeatures(features) {
  var enabledFeatures = Object.keys(features);
  if (!features || enabledFeatures.length === 0) {
    return;
  }
  var logString = "Server started:";

  // Server started: Hot Module Replacement enabled, Live Reloading enabled, Overlay disabled.
  for (var i = 0; i < enabledFeatures.length; i++) {
    var key = enabledFeatures[i];
    logString += " ".concat(key, " ").concat(features[key] ? "enabled" : "disabled", ",");
  }
  // replace last comma with a period
  logString = logString.slice(0, -1).concat(".");
  log.info(logString);
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/parseURL.js":
/*!******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/parseURL.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getCurrentScriptSource.js */ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js");


/**
 * @param {string} resourceQuery
 * @returns {{ [key: string]: string | boolean }}
 */
function parseURL(resourceQuery) {
  /** @type {{ [key: string]: string }} */
  var options = {};
  if (typeof resourceQuery === "string" && resourceQuery !== "") {
    var searchParams = resourceQuery.slice(1).split("&");
    for (var i = 0; i < searchParams.length; i++) {
      var pair = searchParams[i].split("=");
      options[pair[0]] = decodeURIComponent(pair[1]);
    }
  } else {
    // Else, get the url from the <script> this file was called with.
    var scriptSource = (0,_getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    var scriptSourceURL;
    try {
      // The placeholder `baseURL` with `window.location.href`,
      // is to allow parsing of path-relative or protocol-relative URLs,
      // and will have no effect if `scriptSource` is a fully valid URL.
      scriptSourceURL = new URL(scriptSource, self.location.href);
    } catch (error) {
      // URL parsing failed, do nothing.
      // We will still proceed to see if we can recover using `resourceQuery`
    }
    if (scriptSourceURL) {
      options = scriptSourceURL;
      options.fromCurrentScript = true;
    }
  }
  return options;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parseURL);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/reloadApp.js":
/*!*******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/reloadApp.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/emitter.js */ "./node_modules/webpack/hot/emitter.js");
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");



/** @typedef {import("../index").Options} Options
/** @typedef {import("../index").Status} Status

/**
 * @param {Options} options
 * @param {Status} status
 */
function reloadApp(_ref, status) {
  var hot = _ref.hot,
    liveReload = _ref.liveReload;
  if (status.isUnloading) {
    return;
  }
  var currentHash = status.currentHash,
    previousHash = status.previousHash;
  var isInitial = currentHash.indexOf( /** @type {string} */previousHash) >= 0;
  if (isInitial) {
    return;
  }

  /**
   * @param {Window} rootWindow
   * @param {number} intervalId
   */
  function applyReload(rootWindow, intervalId) {
    clearInterval(intervalId);
    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App updated. Reloading...");
    rootWindow.location.reload();
  }
  var search = self.location.search.toLowerCase();
  var allowToHot = search.indexOf("webpack-dev-server-hot=false") === -1;
  var allowToLiveReload = search.indexOf("webpack-dev-server-live-reload=false") === -1;
  if (hot && allowToHot) {
    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App hot update...");
    webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default().emit("webpackHotUpdate", status.currentHash);
    if (typeof self !== "undefined" && self.window) {
      // broadcast update to window
      self.postMessage("webpackHotUpdate".concat(status.currentHash), "*");
    }
  }
  // allow refreshing the page only if liveReload isn't disabled
  else if (liveReload && allowToLiveReload) {
    var rootWindow = self;

    // use parent window for reload (in case we're in an iframe with no valid src)
    var intervalId = self.setInterval(function () {
      if (rootWindow.location.protocol !== "about:") {
        // reload immediately if protocol is valid
        applyReload(rootWindow, intervalId);
      } else {
        rootWindow = rootWindow.parent;
        if (rootWindow.parent === rootWindow) {
          // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
          applyReload(rootWindow, intervalId);
        }
      }
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reloadApp);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/sendMessage.js":
/*!*********************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/sendMessage.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* global __resourceQuery WorkerGlobalScope */

// Send messages to the outside, so plugins can consume it.
/**
 * @param {string} type
 * @param {any} [data]
 */
function sendMsg(type, data) {
  if (typeof self !== "undefined" && (typeof WorkerGlobalScope === "undefined" || !(self instanceof WorkerGlobalScope))) {
    self.postMessage({
      type: "webpack".concat(type),
      data: data
    }, "*");
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendMsg);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/stripAnsi.js":
/*!*******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/stripAnsi.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var ansiRegex = new RegExp(["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|"), "g");

/**
 *
 * Strip [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code) from a string.
 * Adapted from code originally released by Sindre Sorhus
 * Licensed the MIT License
 *
 * @param {string} string
 * @return {string}
 */
function stripAnsi(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a `string`, got `".concat(typeof string, "`"));
  }
  return string.replace(ansiRegex, "");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stripAnsi);

/***/ }),

/***/ "./node_modules/webpack/hot/emitter.js":
/*!*********************************************!*\
  !*** ./node_modules/webpack/hot/emitter.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var EventEmitter = __webpack_require__(/*! events */ "./node_modules/events/events.js");
module.exports = new EventEmitter();


/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!******************************************************!*\
  !*** ./node_modules/webpack/hot/log-apply-result.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

/**
 * @param {(string | number)[]} updatedModules updated modules
 * @param {(string | number)[] | null} renewedModules renewed modules
 */
module.exports = function (updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function (moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function (moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function (moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function (moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				'[HMR] Consider using the optimization.moduleIds: "named" for module names.'
			);
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!*****************************************!*\
  !*** ./node_modules/webpack/hot/log.js ***!
  \*****************************************/
/***/ ((module) => {

/** @typedef {"info" | "warning" | "error"} LogLevel */

/** @type {LogLevel} */
var logLevel = "info";

function dummy() {}

/**
 * @param {LogLevel} level log level
 * @returns {boolean} true, if should log
 */
function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

/**
 * @param {(msg?: string) => void} logFn log function
 * @returns {(level: LogLevel, msg?: string) => void} function that logs when log level is sufficient
 */
function logGroup(logFn) {
	return function (level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

/**
 * @param {LogLevel} level log level
 * @param {string|Error} msg message
 */
module.exports = function (level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

/**
 * @param {LogLevel} level log level
 */
module.exports.setLogLevel = function (level) {
	logLevel = level;
};

/**
 * @param {Error} err error
 * @returns {string} formatted error
 */
module.exports.formatError = function (err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/only-dev-server.js":
/*!*****************************************************!*\
  !*** ./node_modules/webpack/hot/only-dev-server.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __webpack_hash__ */
if (true) {
	/** @type {undefined|string} */
	var lastHash;
	var upToDate = function upToDate() {
		return /** @type {string} */ (lastHash).indexOf(__webpack_require__.h()) >= 0;
	};
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");
	var check = function check() {
		module.hot
			.check()
			.then(function (updatedModules) {
				if (!updatedModules) {
					log("warning", "[HMR] Cannot find update. Need to do a full reload!");
					log(
						"warning",
						"[HMR] (Probably because of restarting the webpack-dev-server)"
					);
					return;
				}

				return module.hot
					.apply({
						ignoreUnaccepted: true,
						ignoreDeclined: true,
						ignoreErrored: true,
						onUnaccepted: function (data) {
							log(
								"warning",
								"Ignored an update to unaccepted module " +
									data.chain.join(" -> ")
							);
						},
						onDeclined: function (data) {
							log(
								"warning",
								"Ignored an update to declined module " +
									data.chain.join(" -> ")
							);
						},
						onErrored: function (data) {
							log("error", data.error);
							log(
								"warning",
								"Ignored an error while updating module " +
									data.moduleId +
									" (" +
									data.type +
									")"
							);
						}
					})
					.then(function (renewedModules) {
						if (!upToDate()) {
							check();
						}

						__webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, renewedModules);

						if (upToDate()) {
							log("info", "[HMR] App is up to date.");
						}
					});
			})
			.catch(function (err) {
				var status = module.hot.status();
				if (["abort", "fail"].indexOf(status) >= 0) {
					log(
						"warning",
						"[HMR] Cannot check for update. Need to do a full reload!"
					);
					log("warning", "[HMR] " + log.formatError(err));
				} else {
					log("warning", "[HMR] Update check failed: " + log.formatError(err));
				}
			});
	};
	var hotEmitter = __webpack_require__(/*! ./emitter */ "./node_modules/webpack/hot/emitter.js");
	hotEmitter.on("webpackHotUpdate", function (currentHash) {
		lastHash = currentHash;
		if (!upToDate()) {
			var status = module.hot.status();
			if (status === "idle") {
				log("info", "[HMR] Checking for updates on the server...");
				check();
			} else if (["abort", "fail"].indexOf(status) >= 0) {
				log(
					"warning",
					"[HMR] Cannot apply update as a previous update " +
						status +
						"ed. Need to do a full reload!"
				);
			}
		}
	});
	log("info", "[HMR] Waiting for update signal from WDS...");
} else {}


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
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
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
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("app." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("7fb3590ef6bf7b9030ef")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "craft3:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		// eslint-disable-next-line no-unused-vars
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results);
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							},
/******/ 							[])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/css loading */
/******/ 	(() => {
/******/ 		if (typeof document === "undefined") return;
/******/ 		var createStylesheet = (chunkId, fullhref, oldTag, resolve, reject) => {
/******/ 			var linkTag = document.createElement("link");
/******/ 		
/******/ 			linkTag.rel = "stylesheet";
/******/ 			linkTag.type = "text/css";
/******/ 			var onLinkComplete = (event) => {
/******/ 				// avoid mem leaks.
/******/ 				linkTag.onerror = linkTag.onload = null;
/******/ 				if (event.type === 'load') {
/******/ 					resolve();
/******/ 				} else {
/******/ 					var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 					var realHref = event && event.target && event.target.href || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + realHref + ")");
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.type = errorType;
/******/ 					err.request = realHref;
/******/ 					if (linkTag.parentNode) linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				}
/******/ 			}
/******/ 			linkTag.onerror = linkTag.onload = onLinkComplete;
/******/ 			linkTag.href = fullhref;
/******/ 		
/******/ 			if (oldTag) {
/******/ 				oldTag.parentNode.insertBefore(linkTag, oldTag.nextSibling);
/******/ 			} else {
/******/ 				document.head.appendChild(linkTag);
/******/ 			}
/******/ 			return linkTag;
/******/ 		};
/******/ 		var findStylesheet = (href, fullhref) => {
/******/ 			var existingLinkTags = document.getElementsByTagName("link");
/******/ 			for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 				var tag = existingLinkTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 				if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return tag;
/******/ 			}
/******/ 			var existingStyleTags = document.getElementsByTagName("style");
/******/ 			for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 				var tag = existingStyleTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href");
/******/ 				if(dataHref === href || dataHref === fullhref) return tag;
/******/ 			}
/******/ 		};
/******/ 		var loadStylesheet = (chunkId) => {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				if(findStylesheet(href, fullhref)) return resolve();
/******/ 				createStylesheet(chunkId, fullhref, null, resolve, reject);
/******/ 			});
/******/ 		}
/******/ 		// no chunk loading
/******/ 		
/******/ 		var oldTags = [];
/******/ 		var newTags = [];
/******/ 		var applyHandler = (options) => {
/******/ 			return { dispose: () => {
/******/ 				for(var i = 0; i < oldTags.length; i++) {
/******/ 					var oldTag = oldTags[i];
/******/ 					if(oldTag.parentNode) oldTag.parentNode.removeChild(oldTag);
/******/ 				}
/******/ 				oldTags.length = 0;
/******/ 			}, apply: () => {
/******/ 				for(var i = 0; i < newTags.length; i++) newTags[i].rel = "stylesheet";
/******/ 				newTags.length = 0;
/******/ 			} };
/******/ 		}
/******/ 		__webpack_require__.hmrC.miniCss = (chunkIds, removedChunks, removedModules, promises, applyHandlers, updatedModulesList) => {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			chunkIds.forEach((chunkId) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var oldTag = findStylesheet(href, fullhref);
/******/ 				if(!oldTag) return;
/******/ 				promises.push(new Promise((resolve, reject) => {
/******/ 					var tag = createStylesheet(chunkId, fullhref, oldTag, () => {
/******/ 						tag.as = "style";
/******/ 						tag.rel = "preload";
/******/ 						resolve();
/******/ 					}, reject);
/******/ 					oldTags.push(oldTag);
/******/ 					newTags.push(tag);
/******/ 				}));
/******/ 			});
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			currentUpdatedModulesList = updatedModulesList;
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdatecraft3"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=verbose&overlay=true&reconnect=10&hot=only&live-reload=true");
/******/ 	__webpack_require__("./node_modules/webpack/hot/only-dev-server.js");
/******/ 	__webpack_require__("./src/javascripts/app.js");
/******/ 	__webpack_require__("./src/sass/app.scss");
/******/ 	var __webpack_exports__ = __webpack_require__("./node_modules/svg-spritemap-webpack-plugin/svg4everybody-helper.js");
/******/ 	craft3 = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=app.js.map