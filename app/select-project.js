;(function (root, factory) {
	if(typeof define === 'function' && define.amd) {
		define([], factory(root));
	} else if(typeof exports === 'object') {
		module.exports = factory(root);
	} else {
		root.Select = factory(root);
	}
})(typeof global !== 'undefined' ? global : window || this.window || this.global, function (root) {
	'use strict';

	if (!Element.prototype.closest) {
		(function(ELEMENT) {
			ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
			ELEMENT.closest = ELEMENT.closest || function closest(selector) {
				if (!this) return null;
				if (this.matches(selector)) return this;
				if (!this.parentElement) {
					return null
				}else return this.parentElement.closest(selector)
			};
		}(Element.prototype));
	}

	window.Select = Select || {};

	const defaultClasses = {
		newSelectClass: 'select',
		buttonClass: 'select__title',
		textClass: 'select__text',
		iconClass: 'select__icon',
		listWrapperClass: 'select__inner',
		listClass: 'select__list',
		listItemClass: 'select__item',
		listItemSelectedClass: 'select__item--selected'
	};

	function Select(obj) {
		this.selectEl = obj.selector;
		this.callBack = obj.callBack;

		this.text = null;
		this.listWrapper = null;
		this.select = document.querySelector(this.selectEl);
		
		createNewSelect.apply(this, [this.selectEl, getSelectAttributes(this.selectEl), getOptionAttributes(this.selectEl)]);
		initClickEvent.call(this);
	}

	function getSelectAttributes(el) {
		return Array.prototype.slice.call(document.querySelector(el).attributes);
	}

	function getOptionAttributes(el) {
		return Array.prototype.slice.call(document.querySelector(el).children).map(item => {
			return Array.prototype.slice.call(item.attributes);
		});
	}

	function getOptionInnerText(el) {
		return Array.prototype.slice.call(document.querySelector(el).children).map(item => {
			return item.textContent;
		});
	}

	function hideSelectEl(el) {
		document.querySelector(el).style.display = 'none';
	}

	function createNewSelect(el, selectArray, optionsArray) {
		hideSelectEl(el);

		this.newSelect = document.createElement('DIV');
		this.newSelect.className = defaultClasses.newSelectClass
		selectArray.forEach(function(item) {
			this.newSelect.setAttribute('data-' + item.name, item.value);
		}, this);

		this.button = document.createElement('A');
		this.button.className = defaultClasses.buttonClass;
		this.button.href = '/';

		this.text = document.createElement('SPAN');
		this.text.className = defaultClasses.textClass;

		this.icon = document.createElement('SPAN');
		this.icon.className = defaultClasses.iconClass;

		this.listWrapper = document.createElement('DIV');
		this.listWrapper.className = defaultClasses.listWrapperClass;

		this.list = document.createElement('UL');
		this.list.className = defaultClasses.listClass;

		let isSelectedAttr = false;
		optionsArray.forEach((item, i) => {
			this.listItem = document.createElement('LI');
			this.listItem.className = defaultClasses.listItemClass;
			this.listItem.textContent = getOptionInnerText(el)[i];
			if (item.length) {
				item.forEach(attr => {
					if (attr.value === 'selected') {
						this.listItem.classList.add(defaultClasses.listItemSelectedClass);
						this.text.textContent = getOptionInnerText(el)[i];
						isSelectedAttr = true;
					}
					this.listItem.setAttribute('data-' + attr.name, attr.value);
				});
			}else {
				if (!i) {
					this.listItem.classList.add(defaultClasses.listItemSelectedClass);
					this.listItem.setAttribute('data-selected', 'selected');
					this.text.textContent = getOptionInnerText(el)[i];
				}
			}
			this.list.appendChild(this.listItem);
		});

		if (!isSelectedAttr) {
			this.list.querySelector(`.${defaultClasses.listItemClass}`).classList.add(defaultClasses.listItemSelectedClass);
			this.text.textContent = getOptionInnerText(el)[0];
		}

		this.button.appendChild(this.text);
		this.button.appendChild(this.icon);
		this.listWrapper.appendChild(this.list);
		this.newSelect.appendChild(this.button);
		this.newSelect.appendChild(this.listWrapper);

		// Add custom select to the DOM
		document.querySelector(el).parentElement.appendChild(this.newSelect);
	}

	function open() {
		const openedSelect = Array.prototype.slice.call(document.getElementsByClassName('select--open'));
		
		// If there are opened select elements - close theme if we open the new one.
		if (openedSelect.length) {
			openedSelect.forEach(item => {
				item.classList.remove('select--open');
			});
		}

		this.newSelect.classList.add('select--open');
		document.body.addEventListener('click', closeOnBodyClick);
	}

	function close() {
		this.newSelect.classList.remove('select--open');
		document.body.removeEventListener('click', closeOnBodyClick);
	}

	function closeOnBodyClick() {
		const openedSelect = document.getElementsByClassName('select--open')[0] ? document.getElementsByClassName('select--open')[0] : null;
		if (openedSelect) {
			openedSelect.classList.remove('select--open');
		}
		document.body.removeEventListener('click', closeOnBodyClick);
	}

	function getValue(el) {
		return el.getAttribute('data-value');
	}

	function doCallBack(fn, el) {
		fn({
			el: el,
			value: getValue(el)
		});
	}

	function changeSelectedAttrAndClass(e) {
		const newSelectedItem = e.target.closest('.select__item');
		const oldSelectedItem = newSelectedItem.parentElement.querySelector(`.${defaultClasses.listItemSelectedClass}`);
		
		// console.log(selectedItem)

		oldSelectedItem.classList.remove(defaultClasses.listItemSelectedClass);
		oldSelectedItem.removeAttribute('data-selected');
		newSelectedItem.classList.add(defaultClasses.listItemSelectedClass);
		newSelectedItem.setAttribute('data-selected', 'selected');
	}

	function onSelect(e) {
		close.call(this);
		if (this.callBack) {
			doCallBack.apply(this, [this.callBack, e.target.closest('.select__item')]);
		}
		changeSelectedAttrAndClass.call(this, e);
		this.text.textContent = (e.target.closest('.select__item').textContent);
		this.select.value = e.target.closest('.select__item').getAttribute('data-value');
	}

	function initClickEvent() {
		const _this = this;

		this.newSelect.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			if (e.target.closest('.select')) {
				if (e.target.closest('.select').classList.contains('select--open')) {
					close.call(_this);
				}else {
					open.call(_this);
				}
			}
			if (e.target.closest('.select__item')) {
				onSelect.call(_this, e);
			}
		});
	}

	return Select;

});