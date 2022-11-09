// JQuery
	$(document).ready(function(){
		// Slider
			 $(".header__slider").owlCarousel({
			 	items: 1,
			 	loop: true,
			 	autoplay: true,
			 	margin: 0,
			 	nav: true,
			 	navText: [
		          '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle opacity="0.1" cx="24" cy="24" r="23.5" stroke="white"/><path d="M15.6464 23.6464C15.4512 23.8417 15.4512 24.1583 15.6464 24.3536L18.8284 27.5355C19.0237 27.7308 19.3403 27.7308 19.5355 27.5355C19.7308 27.3403 19.7308 27.0237 19.5355 26.8284L16.7071 24L19.5355 21.1716C19.7308 20.9763 19.7308 20.6597 19.5355 20.4645C19.3403 20.2692 19.0237 20.2692 18.8284 20.4645L15.6464 23.6464ZM16 24.5H31V23.5H16V24.5Z" fill="white"/></svg>',
		          '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle opacity="0.1" cx="24" cy="24" r="23.5" stroke="white"/><path d="M31.3536 24.3536C31.5488 24.1583 31.5488 23.8417 31.3536 23.6464L28.1716 20.4645C27.9763 20.2692 27.6597 20.2692 27.4645 20.4645C27.2692 20.6597 27.2692 20.9763 27.4645 21.1716L30.2929 24L27.4645 26.8284C27.2692 27.0237 27.2692 27.3403 27.4645 27.5355C27.6597 27.7308 27.9763 27.7308 28.1716 27.5355L31.3536 24.3536ZM16 24.5H31V23.5H16V24.5Z" fill="white"/></svg>'
		        ]
			 });
			 $(".graphic__wrapper").owlCarousel({
			 	loop: true,
			 	center: true,
			 	responsive: {
			 		0: {
			 			items: 1.15,
			 			margin: 10,
			 		},
			 		992: {
			 			items: 1.5,
			 			margin: 30,
			 		}
			 	}
			 });
		// Tabs in JQuery
			$('.tab').on('click', function(e){
				e.preventDefault();

				$($(this).siblings()).removeClass('tab--active');
				 $($(this).closest('.tabs__wrapper').siblings().find('.tabs__visual')).removeClass('tabs__visual--active');
				
				$(this).addClass('tab--active');
				$($(this).attr('href')).addClass('tabs__visual--active');
		});
	});
// Menu Burger
	const menuSidebarActive = document.querySelector('.menu__burger');
	const menuSidebarDisabled = document.querySelector('.header__sidebar-button');
	if (menuSidebarActive) {
		menuSidebarActive.addEventListener('click', function (e) {
			document.body.classList.add('lock');
			document.querySelector('.header__sidebar').classList.add('active');
		});
	}

	if (menuSidebarDisabled) {
		menuSidebarDisabled.addEventListener('click', function (e) {
			document.body.classList.remove('lock');
			document.querySelector('.header__sidebar').classList.remove('active');
		});
	}

	// Скрытие при нажатии вне блока
	const menuSidebar = document.querySelector('div.header__sidebar');
	document.addEventListener('mousedown', (e) => {
	   if (! menuSidebar.contains(e.target)) {
	      document.body.classList.remove('lock');
	      document.querySelector('.header__sidebar').classList.remove('active');
	   }
	})
// Определение тачСкрина
	const isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (
				isMobile.Android() ||
				isMobile.BlackBerry() ||
				isMobile.iOS() ||
				isMobile.Opera() ||
				isMobile.Windows());
		}
	};
	// Добавление класса на body в зависимости от экрана
	if (isMobile.any()) {
		document.body.classList.add('_touch');
	} else {
		document.body.classList.add('_pc'); // Если не тачСкрин то будет класс пк
	}
// Динамический адаптив
	function DynamicAdapt(type) {
		this.type = type;
	}

	DynamicAdapt.prototype.init = function () {
		const _this = this;
		// массив объектов
		this.оbjects = [];
		this.daClassname = "_dynamic_adapt_";
		// массив DOM-элементов
		this.nodes = document.querySelectorAll("[data-da]");

		// наполнение оbjects объктами
		for (let i = 0; i < this.nodes.length; i++) {
			const node = this.nodes[i];
			const data = node.dataset.da.trim();
			const dataArray = data.split(",");
			const оbject = {};
			оbject.element = node;
			оbject.parent = node.parentNode;
			оbject.destination = document.querySelector(dataArray[0].trim());
			оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
			оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.оbjects.push(оbject);
		}

		this.arraySort(this.оbjects);

		// массив уникальных медиа-запросов
		this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
			return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
		}, this);
		this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
			return Array.prototype.indexOf.call(self, item) === index;
		});

		// навешивание слушателя на медиа-запрос
		// и вызов обработчика при первом запуске
		for (let i = 0; i < this.mediaQueries.length; i++) {
			const media = this.mediaQueries[i];
			const mediaSplit = String.prototype.split.call(media, ',');
			const matchMedia = window.matchMedia(mediaSplit[0]);
			const mediaBreakpoint = mediaSplit[1];

			// массив объектов с подходящим брейкпоинтом
			const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
				return item.breakpoint === mediaBreakpoint;
			});
			matchMedia.addListener(function () {
				_this.mediaHandler(matchMedia, оbjectsFilter);
			});
			this.mediaHandler(matchMedia, оbjectsFilter);
		}
	};

	DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
		if (matchMedia.matches) {
			for (let i = 0; i < оbjects.length; i++) {
				const оbject = оbjects[i];
				оbject.index = this.indexInParent(оbject.parent, оbject.element);
				this.moveTo(оbject.place, оbject.element, оbject.destination);
			}
		} else {
			for (let i = 0; i < оbjects.length; i++) {
				const оbject = оbjects[i];
				if (оbject.element.classList.contains(this.daClassname)) {
					this.moveBack(оbject.parent, оbject.element, оbject.index);
				}
			}
		}
	};

	// Функция перемещения
	DynamicAdapt.prototype.moveTo = function (place, element, destination) {
		element.classList.add(this.daClassname);
		if (place === 'last' || place >= destination.children.length) {
			destination.insertAdjacentElement('beforeend', element);
			return;
		}
		if (place === 'first') {
			destination.insertAdjacentElement('afterbegin', element);
			return;
		}
		destination.children[place].insertAdjacentElement('beforebegin', element);
	}

	// Функция возврата
	DynamicAdapt.prototype.moveBack = function (parent, element, index) {
		element.classList.remove(this.daClassname);
		if (parent.children[index] !== undefined) {
			parent.children[index].insertAdjacentElement('beforebegin', element);
		} else {
			parent.insertAdjacentElement('beforeend', element);
		}
	}

	// Функция получения индекса внутри родителя
	DynamicAdapt.prototype.indexInParent = function (parent, element) {
		const array = Array.prototype.slice.call(parent.children);
		return Array.prototype.indexOf.call(array, element);
	};

	// Функция сортировки массива по breakpoint и place 
	// по возрастанию для this.type = min
	// по убыванию для this.type = max
	DynamicAdapt.prototype.arraySort = function (arr) {
		if (this.type === "min") {
			Array.prototype.sort.call(arr, function (a, b) {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}

					if (a.place === "first" || b.place === "last") {
						return -1;
					}

					if (a.place === "last" || b.place === "first") {
						return 1;
					}

					return a.place - b.place;
				}

				return a.breakpoint - b.breakpoint;
			});
		} else {
			Array.prototype.sort.call(arr, function (a, b) {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}

					if (a.place === "first" || b.place === "last") {
						return 1;
					}

					if (a.place === "last" || b.place === "first") {
						return -1;
					}

					return b.place - a.place;
				}

				return b.breakpoint - a.breakpoint;
			});
			return;
		}
	};

	const daAdapt = new DynamicAdapt("max");
	daAdapt.init();
// Добавление/удаление класса в опред.размере
	if (window.matchMedia("(max-width: 600px)").matches) {
		if(document.querySelector('.header__contacts-link--phone_svg')) {
			document.querySelector('.header__contacts-link--phone_svg').classList.remove('visually-hidden');
		} else {}
		if(document.querySelector('.header__contacts-link--phone_text')) {
			document.querySelector('.header__contacts-link--phone_text').classList.add('visually-hidden');
		} else {}
		if(document.querySelector('.header__buttons')) {
			document.querySelector('.header__buttons').classList.add('visually-hidden');
		} else {}
	} else {
		if(document.querySelector('.header__contacts-link--phone_svg')) {
			document.querySelector('.header__contacts-link--phone_svg').classList.add('visually-hidden');
		} else {}
		if(document.querySelector('.header__contacts-link--phone_text')) {
			document.querySelector('.header__contacts-link--phone_text').classList.remove('visually-hidden');
		} else {}
		if(document.querySelector('.header__buttons')) {
			document.querySelector('.header__buttons').classList.remove('visually-hidden');
		} else {}

	}
// Табы на JS
	const tabsBtn = document.querySelectorAll('.tabs__nav-btn');
	const tabsItems = document.querySelectorAll('.tabs__item');

	tabsBtn.forEach(onTabClick);

	function onTabClick(item) {
		item.addEventListener('click', function() {
			let currentBtn = item;
			let tabId = currentBtn.getAttribute('data-tab');
			let currentTab = document.querySelector(tabId);

			if ( ! currentBtn.classList.contains('_active') ) {
				tabsBtn.forEach(function(item) {
					item.classList.remove('_active')
				});

				tabsItems.forEach(function(item) {
					item.classList.remove('_active')
				});

				currentBtn.classList.add('_active');
				currentTab.classList.add('_active');
			}
		});
	}
// Mask Phone
	document.addEventListener('DOMContentLoaded', function () {
		var phoneInputs = document.querySelectorAll('input[data-tel-input]');

		var getInputNumbersValue = function (input) {
			// Return stripped input value — just numbers
			return input.value.replace(/\D/g, '');
		}

		var onPhonePaste = function (e) {
			var input = e.target,
				inputNumbersValue = getInputNumbersValue(input);
			var pasted = e.clipboardData || window.clipboardData;

			if (pasted) {
				var pastedText = pasted.getData('Text');
				if (/\D/g.test(pastedText)) {
					// Attempt to paste non-numeric symbol — remove all non-numeric symbols,
	            	// formatting will be in onPhoneInput handler
	            	input.value = inputNumbersValue;
	            	return;
	            }
			}
		}

		var onPhoneInput = function (e) {
			var input = e.target,
			inputNumbersValue = getInputNumbersValue(input),
			selectionStart = input.selectionStart,
			formattedInputValue = "";

			if (!inputNumbersValue) {
				return input.value = '';
			}

			if (input.value.length != selectionStart) {
				// Editing in the middle of input, not last symbol
				if (e.data && /\D/g.test(e.data)) {
					// Attempt to input non-numeric symbol
					input.value = inputNumbersValue;
				}
				return;
			}
			if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
				if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
				var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
				formattedInputValue = input.value = firstSymbols + " ";
				if (inputNumbersValue.length > 1) {
					formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
				}
				if (inputNumbersValue.length >= 5) {
					formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
				}
				if (inputNumbersValue.length >= 8) {
					formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
				}
				if (inputNumbersValue.length >= 10) {
					formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
				}
			} else {
				formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
			}
			input.value = formattedInputValue;
		}
		var onPhoneKeyDown = function (e) {
			// Clear input after remove last symbol
			var inputValue = e.target.value.replace(/\D/g, '');
			if (e.keyCode == 8 && inputValue.length == 1) {
				e.target.value = '';
			}
		}
		for (var phoneInput of phoneInputs) {
				 phoneInput.addEventListener('keydown', onPhoneKeyDown);
				 phoneInput.addEventListener('input', onPhoneInput, false);
				 phoneInput.addEventListener('paste', onPhonePaste, false);
		}
	});
// Popup
	const popupLinks = document.querySelectorAll('.popup-link');
	const body = document.querySelector('body');
	const lockPadding = document.querySelectorAll('.lock-padding'); // Добавлять элементу, который багается при Lock'е

	let unlock = true;
	const timeout = 200; // Время выполнения transition, как и в CSS

	if (popupLinks.length > 0) {
		for (let index = 0; index < popupLinks.length; index++){
			const popupLink = popupLinks[index];
			popupLink.addEventListener('click', function (e){
				const popupName = popupLink.getAttribute('href').replace('#', '');
				const curentPopup = document.getElementById(popupName);
				popupOpen(curentPopup);
				e.preventDefault();
			});
		}
	}
	const popupCloseIcon = document.querySelectorAll('.popup__close');
	if (popupCloseIcon.length > 0){
		for (let index = 0; index < popupCloseIcon.length; index++){
			const el = popupCloseIcon[index];
			el.addEventListener('click', function (e) {
				popupClose(el.closest('.popup'));
				e.preventDefault();
			});
		}
	}
	function popupOpen(curentPopup) {
		if (curentPopup && unlock){
			const popupActive = document.querySelector('.popup.open');
			if (popupActive) {
				popupClose(popupActive, false);
			} else {
				bodyLock();
			}
			curentPopup.classList.add('open');
			curentPopup.addEventListener('click', function (e) {
				if (!e.target.closest('.popup__content')) {
					popupClose(e.target.closest('.popup'));
				}
			});
		}
	}
	function popupClose(popupActive, doUnlock = true) {
		if (unlock) {
			popupActive.classList.remove('open');
			if (doUnlock){
				bodyUnLock();
			}
		}
	}
	function bodyLock() {
		const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
		if (lockPadding.length > 0){
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = lockPaddingValue;
			}
		}
		body.style.paddingRight = lockPaddingValue;
		body.classList.add('lock');
		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, timeout);
	}
	function bodyUnLock() {
		setTimeout(function () {
			if (lockPadding.length > 0) {
				for (let index = 0; index < lockPadding.length; index++) {
					const el = lockPadding[index];
					el.style.paddingRight = '0px';
				}
			}
			body.style.paddingRight = '0px';
			body.classList.remove('lock');
		}, timeout);
		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, timeout);
	}
	document.addEventListener('keydown', function (e) {
		if (e.which === 27) {
			const popupActive = document.querySelector('.popup.open');
			popupClose(popupActive);
		}
	});

	(function () {
		if (!Element.prototype.closest) {
			Element.prototype.closest = function (css) {
				var node = this;
				while (node) {
					if (node.matches(css)) return node;
					else node = node.parentElement;
				}
				return null;
			};
		}
	})();
	(function () {
		if (!Element.prototype.matches) {
			Element.prototype.matches = Element.prototype.matchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.msMatchesSelector;
		}
	})();
// Spolers
	const spollersArray = document.querySelectorAll('[data-spollers]');
	if (spollersArray.length > 0) {
		// Получение обычных спойлеров
		const spollersRegular = Array.from(spollersArray).filter(function(item, index, self) {
			return !item.dataset.spollers.split(",")[0];
		});
		// Инициализация обычных спойлеров
		if (spollersRegular.length > 0) {
			initSpollers(spollersRegular);
		}

		// Получение спойлеров с медиа запросами
		const spollersMedia = Array.from(spollersArray).filter(function(item, index, self) {
			return item.dataset.spollers.split(",")[0];
		});

		// Инициализация спойлеров с медиа запросами
		if (spollersMedia.length > 0 ) {
			const breakpointsArray = [];
			spollersMedia.forEach( item => {
				const params      = item.dataset.spollers;
				const breakpoint  = {};
				const paramsArray = params.split(",");
				breakpoint.value  = paramsArray[0];
				breakpoint.type   = paramsArray[1] ? paramsArray[1].trim() : "max";
				breakpoint.item   = item;
				breakpointsArray.push(breakpoint);
			});

			// Получаем уникальные брейкпоинты
			let mediaQueries = breakpointsArray.map(function (item) {
				return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
			});
			mediaQueries = mediaQueries.filter(function (item, index, self) {
				return self.indexOf(item) === index;
			});

			// Работаем с каждым брейкопоинтом
			mediaQueries.forEach(breakpoint => {
				const paramsArray 	  = breakpoint.split(",");
				const mediaBreakpoint = paramsArray[1];
				const mediaType 	  = paramsArray[2];
				const matchMedia 	  = window.matchMedia(paramsArray[0]);

				// Объекты с нужными условиями
				const spollersArray = breakpointsArray.filter(function (item) {
					if (item.value === mediaBreakpoint && item.type === mediaType) {
						return true;
					}
				});
				// Событие 
				matchMedia.addListener(function () {
					initSpollers(spollersArray, matchMedia);
				});
				initSpollers(spollersArray, matchMedia);
			});
		}

		// Инициализация
		function initSpollers(spollersArray, matchMedia = false) {
			spollersArray.forEach(spollersBlock => {
				spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
				if (matchMedia.matches || !matchMedia) {
					spollersBlock.classList.add('_init');
					initSpollerBody(spollersBlock);
					spollersBlock.addEventListener("click", setSpollerAction);
				} else {
					spollersBlock.classList.remove('_init');
					initSpollerBody(spollersBlock, false);
					spollersBlock.removeEventListener("click", setSpollerAction);
				}
			});
		}

		// Работа с контентом
		function initSpollerBody(spollersBlock, hideSpollerBody = true) {
			const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
			if (spollerTitles.length > 0) {
				spollerTitles.forEach(spollerTitle => {
					if (hideSpollerBody) {
						spollerTitle.removeAttribute('tabindex');
						if (!spollerTitle.classList.contains('_active')) {
							spollerTitle.nextElementSibling.hidden = true;
						}
					} else {
						spollerTitle.setAttribute('tabindex', '-1');
						spollerTitle.nextElementSibling.hidden = false;
					}
				});
			}
		}

		function setSpollerAction(e) {
			const el = e.target;
			if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
				const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
				const spollersBlock = spollerTitle.closest('[data-spollers]');
				const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
				if (!spollersBlock.querySelectorAll('._slide').length) {
					if (oneSpoller && !spollerTitle.classList.contains('_active')) {
						hideSpollersBody(spollersBlock);
					}
					spollerTitle.classList.toggle('_active');
					_slideToggle(spollerTitle.nextElementSibling, 500);
				}
				e.preventDefault();
			}
		}
		function hideSpollersBody(spollersBlock) {
			const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
			if (spollerActiveTitle) {
				spollerActiveTitle.classList.remove('_active');
				_slideUp(spollerActiveTitle.nextElementSibling, 500);
			}
		}
	}

	// =======================================================
	// SlideToggle
	let _slideUp = (target, duration = 500) => {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			target.style.transitionProperty = 'height, margin, padding';
			target.style.transitionDuration = duration + 'ms';
			target.style.height = target.offsetHeight + 'px';
			target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = 0;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			window.setTimeout(() => {
				target.hidden = true;
				target.style.removeProperty('height');
				target.style.removeProperty('padding-top');
				target.style.removeProperty('padding-bottom');
				target.style.removeProperty('margin-top');
				target.style.removeProperty('margin-bottom');
				target.style.removeProperty('overflow');
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('_slide');
			}, duration);
		}
	}
	let _slideDown = (target, duration = 500) => {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			if (target.hidden) {
				target.hidden = false;
			}
			let height = target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = 0;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			target.offsetHeight;
			target.style.transitionProperty = 'height, margin, padding';
			target.style.transitionDuration = duration + 'ms';
			target.style.height = height + 'px';
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			window.setTimeout(() => {
				target.style.removeProperty('height');
				target.style.removeProperty('overflow');
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('_slide');
			}, duration);
		}
	}
	let _slideToggle = (target, duration = 500) => {
		if (target.hidden) {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}


