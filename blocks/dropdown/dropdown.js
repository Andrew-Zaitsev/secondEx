let facilities = [
  ['спальня', 'спальни', 'спален'],
  ['кровать', 'кровати', 'кроватей'],
  ['ванная комната', 'ванные комнаты', 'ванных комнат']
];
let guests = [
  ['гость', 'гостя', 'гостей'],
  ['младенец', 'младенца', 'младенцев']
];

let dropdownButtons = document.querySelectorAll('.dropdown__button'); //коллекция кнопок дропдаунов
let clickedDropdown = null;
let expandedDropdown = null; // индекс расширенного дропдауна
let expandedDropdownButton = null; // кнопка расширенного дропдауна
let expandedDropdownPlusButtons = null; // коллекция кнопок плюс расширенного дропдауна
let expandedDropdownMinusButtons = null; // коллекция кнопок минус расширенного дропдауна
let expandedDropdownId = null;
//let expandedDropdownContent = null; //контент расширенного дропдауна 29/04
let expandedDropdownItemsNouns = null; //существительные элементов
let expandedDropdownValueElems = null; //элементы значений счетчика
let getDropdownResult; //функция
let dropdownValues = null;

document.onclick = function (event) {

  if (isClickInsideDropdown(event)) {
    //если клик внутри

    if (isDropdownExpanded()) {

      if (isCurrentExpanded()) {

        isClickInsideList(event) ? listClickHandler(event) : closeDropdown(); // console.log('клик по списку')

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

//=================== > checking for apply-section existance ... не используется
const hasDropdownApplySection = () => {
  //console.log(!!(dropdownButtons[expandedDropdown].querySelector('.dropdown__apply-section')));
  return dropdownButtons[expandedDropdown].querySelector('.dropdown__apply-section');
};

const expandDropdown = () => {
  dropdownButtons[clickedDropdown].classList.add('dropdown__button_expanded');
  expandedDropdown = clickedDropdown;
  expandedDropdownButton = dropdownButtons[expandedDropdown]; //кнопка расширенного дропдауна
  expandedDropdownPlusButtons = expandedDropdownButton.querySelectorAll('.dropdown__item-plus-button'); //коллекция кнопок + расширенного дропдауна
  expandedDropdownMinusButtons = expandedDropdownButton.querySelectorAll('.dropdown__item-minus-button'); //коллекция кнопок - расширенного дропдауна
  expandedDropdownId = expandedDropdownButton.parentElement.id; //29.04 получил содержание дропдауна по ид
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
  expandedDropdownPlusButtons = null;
  expandedDropdownMinusButtons = null;
  expandedDropdownId = null;
  //expandedDropdownContent = null; //контент расширенного дропдауна 29/04
  expandedDropdownItemsNouns = null; //существительные элементов
  expandedDropdownValueElems = null;
  dropdownValues = null;
  getDropdownResult = null;
  //обнулить все переменные кнопок расширенного дропдауна
};

const listClickHandler = (event) => {
  let valueElem;
  switch (true) {
    case hasTargetClass('dropdown__apply-button'): // случай нажатия кнопки "применить"
      closeDropdown();
      break;
    case hasTargetClass('dropdown__clean-button'): // случай нажатия кнопки "очистить"
      //уменьшить все значения до 0
      expandedDropdownValueElems.forEach(item => item.textContent = 0);
      expandedDropdownMinusButtons.forEach(item => item.classList.add('dropdown__item-minus-button_transparent')); //не работает
      expandedDropdownButton.querySelector('.dropdown__clean-button').classList.remove('dropdown__clean-button_visible');
      changeButtonText();
      //сделать рамки и значки укнопок "-" светлыми
      //убрать кнопку "очистить"
      //console.log('clean button');
      break;
    case hasTargetClass('dropdown__item-plus-button'): // случай нажатия кнопки "+"
      //console.log('+ button: ' + Array.from(expandedDropdownPlusButtons).indexOf(event.target)); // отображает индекс нажатого + ...массив из коллекции

      valueElem = event.target.previousElementSibling;
      valueElem.textContent = +valueElem.textContent + 1;
      changeButtonText(); //запись в текст кнопки button
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

const getNoun = (number, nouns) => {
  switch (true) {
    case (number === 1):
      return nouns[0];
    case ((number > 1) && (number < 5)):
      return nouns[1];
    case (number === 0):
    case ((number > 4) && (number < 21)):
      return nouns[2];
    default:
      return ('слишком много ' + nouns[2]);
  }
};
//================================================ проверочная функция
function check() {
  console.log('clickedDropdown = ' + clickedDropdown);
  console.log('expandedDropdown = ' + expandedDropdown);
  console.log('isDropdownExpanded() = ' + isDropdownExpanded());
  console.log('target = ' + event.target.tagName + ' (class = "' + event.target.className + '")');
};

// обработчик события передает в функцию единственный параметр по молчанию
// - объект, описывающий событие.
// event.target свойство этого объекта события, содержащее ссылку на целевой элемент события