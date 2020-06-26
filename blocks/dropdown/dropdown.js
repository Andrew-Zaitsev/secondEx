import {
  getNoun
} from '../../src/js/functions.js';

import {
  facilities,
  guests
} from '../../src/js/variables.js';

let dropdownButtons = document.querySelectorAll('.dropdown__button');
let clickedDropdown = null;
let expandedDropdown = null; // индекс расширенного дропдауна
let expandedDropdownButton = null; // кнопка расширенного дропдауна
let expandedDropdownMinusButtons = null; // коллекция кнопок минус расширенного дропдауна
let expandedDropdownId = null;
let expandedDropdownItemsNouns = null; //существительные элементов
let expandedDropdownValueElems = null; //элементы значений счетчика
let getDropdownResult;
let dropdownValues = null;

document.onclick = function (event) {

  if (isClickInsideDropdown(event)) {
    //если клик внутри

    if (isDropdownExpanded()) {

      if (isCurrentExpanded()) {

        isClickInsideList(event) ? listClickHandler(event) : closeDropdown();

      } else {

        closeDropdown();
        expandDropdown();

      };
    } else {
      expandDropdown();
    };

  } else {
    //если клик снаружи
    isDropdownExpanded() ? closeDropdown() : '';
  }

}

const isClickInsideDropdown = (event) => {

  for (let i = 0; i < dropdownButtons.length; i++) {

    if ((dropdownButtons[i] === event.target) || (dropdownButtons[i].contains(event.target))) {
      clickedDropdown = i;
      return true;
    }

  }
  return false;
};

const isClickInsideList = () => {
  let listElement = dropdownButtons[expandedDropdown].lastChild;
  return (listElement === event.target) || (listElement.contains(event.target));
};

const isDropdownExpanded = () => {
  return (expandedDropdown !== null);
};

const isCurrentExpanded = () => {
  return (clickedDropdown === expandedDropdown);
};

const expandDropdown = () => {
  dropdownButtons[clickedDropdown].classList.add('dropdown__button_expanded');
  expandedDropdown = clickedDropdown;
  expandedDropdownButton = dropdownButtons[expandedDropdown];
  expandedDropdownMinusButtons = expandedDropdownButton.querySelectorAll('.dropdown__item-minus-button');
  expandedDropdownId = expandedDropdownButton.parentElement.id;
  switch (expandedDropdownId) {
    case 'guests':
      expandedDropdownItemsNouns = guests;
      getDropdownResult = getGuests;
      break;
    case 'facilities':
      expandedDropdownItemsNouns = facilities;
      getDropdownResult = getFacilities;
      break;
  };
  expandedDropdownValueElems = Array.from(expandedDropdownButton.querySelectorAll('.dropdown__item-value'));
  clickedDropdown = null;
};

const closeDropdown = () => {
  expandedDropdownButton.classList.remove('dropdown__button_expanded');
  expandedDropdown = null;
  expandedDropdownButton = null;
  expandedDropdownMinusButtons = null;
  expandedDropdownId = null;
  expandedDropdownItemsNouns = null; //существительные элементов
  expandedDropdownValueElems = null;
  dropdownValues = null;
  getDropdownResult = null;
};

const listClickHandler = (event) => {
  let valueElem;
  switch (true) {
    case hasTargetClass('dropdown__apply-button'): // случай нажатия кнопки "применить"
      closeDropdown();
      break;
    case hasTargetClass('dropdown__clean-button'): // случай нажатия кнопки "очистить"
      expandedDropdownValueElems.forEach(item => item.textContent = 0);
      expandedDropdownMinusButtons.forEach(item => item.classList.add('dropdown__item-minus-button_transparent'));
      expandedDropdownButton.querySelector('.dropdown__clean-button').classList.remove('dropdown__clean-button_visible');
      changeButtonText();
      break;
    case hasTargetClass('dropdown__item-plus-button'): // случай нажатия кнопки "+"
      valueElem = event.target.previousElementSibling;
      valueElem.textContent = +valueElem.textContent + 1;
      changeButtonText();
      valueElem.previousElementSibling.classList.remove('dropdown__item-minus-button_transparent');
      (expandedDropdownId === 'guests') ? expandedDropdownButton.querySelector('.dropdown__clean-button').classList.add('dropdown__clean-button_visible'): '';
      break;
    case hasTargetClass('dropdown__item-minus-button'): // случай нажатия кнопки "-"
      valueElem = event.target.nextElementSibling;
      if (valueElem.textContent > 0) {
        valueElem.textContent = +valueElem.textContent - 1;
        if (valueElem.textContent == 0) {
          event.target.classList.add('dropdown__item-minus-button_transparent');
        }
      }
      changeButtonText();
      if (expandedDropdownId === 'guests') {
        (dropdownValues.join('') == 0) ? expandedDropdownButton.querySelector('.dropdown__clean-button').classList.remove('dropdown__clean-button_visible'): '';
      }
  }
};

const hasTargetClass = (name) => {
  return event.target.classList.contains(name); //есть ли у таргетного элемента переданный в параметре класс
};

const changeButtonText = () => {
  dropdownValues = expandedDropdownValueElems.map(item => +item.textContent);
  expandedDropdownButton.firstElementChild.textContent = getDropdownResult();
};

const getGuests = () => { //гости
  dropdownValues = [dropdownValues.slice(0, -1).reduce((accumulator, currentValue) => accumulator + currentValue), dropdownValues[dropdownValues.length - 1]];
  return getButtonResultString();
};

const getFacilities = () => { //удобства
  return getButtonResultString();
};

const getButtonResultString = () => { //button result string
  return dropdownValues.map((value, index) => ((value > 0) ? (value + ' ' + getNoun(value, expandedDropdownItemsNouns[index])) + ', ' : null))
    .join('').slice(0, -2);
};

// обработчик события передает в функцию единственный параметр по молчанию
// - объект, описывающий событие.
// event.target свойство этого объекта события, содержащее ссылку на целевой элемент события