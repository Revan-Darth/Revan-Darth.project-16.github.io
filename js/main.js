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

