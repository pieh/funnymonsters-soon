if (typeof Object.assign != 'function') {
	Object.assign = function(target, varArgs) { // .length of function is 2
		'use strict';
		if (target == null) { // TypeError if undefined or null
			throw new TypeError('Cannot convert undefined or null to object');
		}

		var to = Object(target);

		for (var index = 1; index < arguments.length; index++) {
			var nextSource = arguments[index];

			if (nextSource != null) { // Skip over if undefined or null
				for (var nextKey in nextSource) {
					// Avoid bugs when hasOwnProperty is shadowed
					if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
						to[nextKey] = nextSource[nextKey];
					}
				}
			}
		}
		return to;
	};
}

// Production steps of ECMA-262, Edition 6, 22.1.2.1
if (!Array.from) {
	Array.from = (function() {
		var toStr = Object.prototype.toString;
		var isCallable = function(fn) {
			return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
		};
		var toInteger = function(value) {
			var number = Number(value);
			if (isNaN(number)) {
				return 0;
			}
			if (number === 0 || !isFinite(number)) {
				return number;
			}
			return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
		};
		var maxSafeInteger = Math.pow(2, 53) - 1;
		var toLength = function(value) {
			var len = toInteger(value);
			return Math.min(Math.max(len, 0), maxSafeInteger);
		};

		// The length property of the from method is 1.
		return function from(arrayLike /*, mapFn, thisArg */ ) {
			// 1. Let C be the this value.
			var C = this;

			// 2. Let items be ToObject(arrayLike).
			var items = Object(arrayLike);

			// 3. ReturnIfAbrupt(items).
			if (arrayLike == null) {
				throw new TypeError('Array.from requires an array-like object - not null or undefined');
			}

			// 4. If mapfn is undefined, then let mapping be false.
			var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
			var T;
			if (typeof mapFn !== 'undefined') {
				// 5. else
				// 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
				if (!isCallable(mapFn)) {
					throw new TypeError('Array.from: when provided, the second argument must be a function');
				}

				// 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
				if (arguments.length > 2) {
					T = arguments[2];
				}
			}

			// 10. Let lenValue be Get(items, "length").
			// 11. Let len be ToLength(lenValue).
			var len = toLength(items.length);

			// 13. If IsConstructor(C) is true, then
			// 13. a. Let A be the result of calling the [[Construct]] internal method
			// of C with an argument list containing the single item len.
			// 14. a. Else, Let A be ArrayCreate(len).
			var A = isCallable(C) ? Object(new C(len)) : new Array(len);

			// 16. Let k be 0.
			var k = 0;
			// 17. Repeat, while k < len… (also steps a - h)
			var kValue;
			while (k < len) {
				kValue = items[k];
				if (mapFn) {
					A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
				} else {
					A[k] = kValue;
				}
				k += 1;
			}
			// 18. Let putStatus be Put(A, "length", len, true).
			A.length = len;
			// 20. Return A.
			return A;
		};
	}());
}

{

	var delay = 1000;
	var interval = 150;

	function Letter(letter, pos) {
		this.triggetAnim = this.triggetAnim.bind(this)
		this.scheduleRandomAnim = this.scheduleRandomAnim.bind(this)

		this.DOM = {};
		this.CONFIG = {
			animations: [{
				origin: '0% 100%',
				opts: {
					rotate: [{
						value: function() {
							this.anim1angle = anime.random(-20, -55);
							this.anim1fall = this.anim1angle < -45 ?
								true :
								false;
							return this.anim1angle;
						},
						duration: 1000,
						easing: [0.2, 1, 0.3, 1]
					}, {
						value: function() {
							if (this.anim1fall) {
								return -90;
							} else
								return this.anim1angle;
						},
						duration: function() {
							return this.anim1fall ?
								1000 :
								1;
						},
						easing: [0.4, 0, 0.8, 0]
					}, {
						value: 0,
						duration: 600,
						delay: function() {
							return this.anim1fall ?
								1000 :
								0;
						},
						easing: [0.4, 0, 0.8, 0]
					}]
				}
			}, {
				origin: '50% 100%',
				opts: {
					easing: 'easeOutExpo',
					scaleY: [{
						value: 0.3,
						duration: 250
					}, {
						value: 1,
						duration: 250
					}],
					scaleX: [{
						value: 2,
						duration: 250
					}, {
						value: 0.6,
						duration: 250
					}, {
						value: 1,
						duration: 250,
						easing: 'easeInQuad'
					}],
					translateY: [{
						value: function() {
							return anime.random(-200, -100);
						},
						duration: 250,
						delay: 250,
						easing: 'easeOutExpo'
					}, {
						value: 0,
						duration: 250,
						easing: 'easeInQuad'
					}]
				}
			}, {
				perspective: 1000,
				perspectiveOrigin: '500% 50%',
				origin: '50% 100%',
				opts: {
					rotateX: [{
						value: [
							0, -180
						],
						duration: 1600,
						easing: 'easeOutElastic',
						elasticity: 700
					}, {
						value: -360,
						duration: 400,
						easing: 'easeInQuad'
					}]
				}
			}, {
				origin: function() {
					var r = anime.random(0, 2);
					if (r === 0) {
						return '50% 100%';
					} else if (r === 1) {
						return '50% 0%';
					}
					return '50% 50%';
				},
				opts: {
					scaleY: [{
						value: 6,
						duration: 400,
						easing: [0.3, 1, 0.3, 1]
					}, {
						value: 1,
						duration: 800,
						easing: 'easeOutElastic',
						elasticity: 500
					}],
					scaleX: [{
						value: 0.5,
						duration: 400,
						easing: [0.3, 1, 0.3, 1]
					}, {
						value: 1,
						duration: 800,
						easing: 'easeOutElastic',
						elasticity: 500
					}]
				}
			}, {
				perspective: 1000,
				perspectiveOrigin: '50% -300%',
				opts: {
					rotateY: [{
						value: [
							0, -180
						],
						duration: 800,
						easing: [0.1, 1, 0.3, 1]
					}, {
						value: -360,
						duration: 1000,
						easing: 'easeOutElastic',
						elasticity: 300
					}]
				}
			}, {
				origin: '50% 0%',
				opts: {
					duration: 300,
					easing: [
						0.4, 0, 0.8, 0
					],
					translateY: [{
						value: function(t) {
							var bcr = t.getBoundingClientRect();
							return -1 * bcr.top + 5 + 'px';
						}
					}, {
						value: 0,
						duration: 200,
						delay: 750,
						easing: [0.2, 1, 0.3, 1]
					}],
					scaleX: [{
						value: 0.8,
						duration: 600,
						delay: 300,
						easing: [0.4, 0, 0.8, 0]
					}, {
						value: 1,
						duration: 200,
						easing: 'easeOutExpo'
					}],
					scaleY: [{
						value: 3,
						duration: 600,
						delay: 300,
						easing: [0.4, 0, 0.8, 0]
					}, {
						value: 1,
						duration: 200,
						easing: 'easeOutExpo'
					}]
				}
			}, {
				origin: '50% 100%',
				opts: {
					duration: 500,
					easing: 'easeOutExpo',
					scaleY: [{
						value: 0.3
					}, {
						value: 1,
						duration: 800,
						easing: 'easeOutElastic'
					}],
					scaleX: [{
						value: 1.5
					}, {
						value: 1,
						duration: 800,
						easing: 'easeOutElastic'
					}]
				}
			}, {
				perspective: 1000,
				perspectiveOrigin: '50% -300%',
				opts: {
					rotateX: [{
						value: [
							0, -180
						],
						duration: 800,
						easing: [0.1, 1, 0.3, 1]
					}, {
						value: -360,
						duration: 1000,
						easing: 'easeOutElastic',
						elasticity: 300
					}]
				}
			}, {
				perspective: 1000,
				perspectiveOrigin: '500% 50%',
				origin: '50% 0%',
				opts: {
					rotateX: [{
						value: [
							0, 180
						],
						duration: 1600,
						easing: 'easeOutElastic',
						elasticity: 700
					}, {
						value: 360,
						duration: 400,
						easing: 'easeInQuad'
					}]
				}
			}, {
				origin: '50% 100%',
				opts: {
					duration: 300,
					easing: [
						0.4, 0, 0.8, 0
					],
					translateY: [{
						value: function(t) {
							var bcr = t.getBoundingClientRect();
							return (window.innerHeight - bcr.bottom - 5) + 'px';
						}
					}, {
						value: 0,
						duration: 200,
						delay: 750,
						easing: [0.2, 1, 0.3, 1]
					}],
					scaleX: [{
						value: 0.8,
						duration: 600,
						delay: 300,
						easing: [0.4, 0, 0.8, 0]
					}, {
						value: 1,
						duration: 200,
						easing: 'easeOutExpo'
					}],
					scaleY: [{
						value: 3,
						duration: 600,
						delay: 300,
						easing: [0.4, 0, 0.8, 0]
					}, {
						value: 1,
						duration: 200,
						easing: 'easeOutExpo'
					}]
				}
			}, {
				perspective: 1000,
				perspectiveOrigin: '50% -300%',
				opts: {
					rotate: [{
						value: [
							0, -180
						],
						duration: 800,
						easing: [0.1, 1, 0.3, 1]
					}, {
						value: -360,
						duration: 1000,
						easing: 'easeOutElastic',
						elasticity: 300
					}]
				}
			}, {
				perspective: 1000,
				perspectiveOrigin: '500% 100%',
				origin: '50% 100%',
				opts: {
					rotateX: [{
						value: [
							0, 80
						],
						duration: 1600,
						easing: 'easeOutElastic',
						elasticity: 700
					}, {
						value: 0,
						duration: 400,
						easing: 'easeInQuad'
					}]
				}
			}, {
				origin: '100% 100%',
				opts: {
					rotate: [{
						value: function() {
							this.anim1angle = anime.random(20, 55);
							this.anim1fall = this.anim1angle > 45 ?
								true :
								false;
							return this.anim1angle;
						},
						duration: 1000,
						easing: [0.2, 1, 0.3, 1]
					}, {
						value: function() {
							if (this.anim1fall) {
								return 90;
							} else
								return this.anim1angle;
						},
						duration: function() {
							return this.anim1fall ?
								1000 :
								1;
						},
						easing: [0.4, 0, 0.8, 0]
					}, {
						value: 0,
						duration: 600,
						delay: function() {
							return this.anim1fall ?
								1000 :
								0;
						},
						easing: [0.4, 0, 0.8, 0]
					}]
				}
			}]
		};
		this.pos = pos;
		this.DOM.letter = letter;
		this.layout();
		this.initEvents();
	}


	Letter.prototype.layout = function() {
		this.DOM.letterInner = document.createElement('span');
		this.DOM.letterInner.innerHTML = this.DOM.letter.innerHTML;
		this.DOM.letter.innerHTML = '';
		this.DOM.letter.appendChild(this.DOM.letterInner);
	}

	Letter.prototype.triggetAnim = function() {
		clearTimeout(this.randomAnim);
		var that = this;
		var animOpts = {
			targets: this.DOM.letterInner,
			complete: function() {
				that.isActive = false
				that.scheduleRandomAnim();
			}
		};

		var pos = Math.floor(Math.random() * this.CONFIG.animations.length)

		var animation = this.CONFIG.animations[pos];

		this.DOM.letter.style.perspective = animation.perspective ?
			animation.perspective + 'px' :
			'none';
		this.DOM.letter.style.perspectiveOrigin = animation.perspectiveOrigin ?
			animation.perspectiveOrigin :
			'50% 50%';
		this.DOM.letterInner.style.transformOrigin = animation.origin ?
			(typeof animation.origin === 'function' ?
				animation.origin() :
				animation.origin) :
			'50% 50%';

		if (this.isActive)
			return;
		this.isActive = true;

		anime.remove(this.DOM.letterInner);
		anime(Object.assign(animOpts, animation.opts));
	}

	Letter.prototype.scheduleRandomAnim = function() {
		this.randomAnim = setTimeout(this.triggetAnim, anime.random(4000, 20000));
	}

	Letter.prototype.initEvents = function() {
		setTimeout(function() {
			this.DOM.letter.className += ' ready';
			this.triggetAnim();
			this.scheduleRandomAnim();
		}.bind(this), delay);
		delay += interval;

		this.DOM.letter.addEventListener('click', this.triggetAnim);
		this.DOM.letter.addEventListener('touchstart', this.triggetAnim);
	}


	function Word(word) {
		this.DOM = {};
		this.DOM.word = word;
		this.layout();
	}

	Word.prototype.layout = function() {
		Array.from(this.DOM.word.querySelectorAll('span:not(.char-space)')).forEach(function(letter, pos) {
			return new Letter(letter, pos)
		});
	}

	window.onload = function() {
		document.getElementsByTagName('body')[0].className += ' loaded';
		Array.from(document.querySelectorAll('.word')).forEach(function(word) {
			return new Word(word)
		});
	}
};
