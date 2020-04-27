let choice = {
  facilities: {
    bedroom: 0,
    bed: 0,
    bathroom: 0
  },
  guests: {
    adult: 5,
    child: 0,
    baby: 0
  }
};

let dropdownButtons = document.querySelectorAll('.dropdown__button'); //коллекция кнопок дропдаунов
let clickedDropdown = null;
let expandedDropdown = null; // индекс расширенного дропдауна
let expandedDropdownButton = null; // кнопка расширенного дропдауна
let expandedDropdownPlusButtons = null; // коллекция кнопок плюс расширенного дропдауна

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

//=================== > checking for apply-section existing
const hasDropdownApplySection = () => {
  //console.log(!!(dropdownButtons[expandedDropdown].querySelector('.dropdown__apply-section')));
  return dropdownButtons[expandedDropdown].querySelector('.dropdown__apply-section');
};
//===================

const expandDropdown = () => {
  dropdownButtons[clickedDropdown].classList.add('dropdown__button_expanded');
  expandedDropdown = clickedDropdown;
  expandedDropdownButton = dropdownButtons[expandedDropdown]; //кнопка расширенного дропдауна
  expandedDropdownPlusButtons = expandedDropdownButton.querySelectorAll('.dropdown__item-plus-button'); //коллекция кнопок + расширенного дропдауна
  expandedDropdownMinusButtons = expandedDropdownButton.querySelectorAll('.dropdown__item-minus-button'); //коллекция кнопок - расширенного дропдауна
  clickedDropdown = null;
 
};

const closeDropdown = () => {
  //============= > cleaning people count
  if (hasDropdownApplySection()) {
    choice.adult = 0;
    choice.child = 0;
    choice.baby = 0;
  }
  //=============
  expandedDropdownButton.classList.remove('dropdown__button_expanded');
  expandedDropdown = null;
  expandedDropdownButton = null;
  expandedDropdownPlusButtons = null;
  expandedDropdownMinusButtons = null;
  //обнулить все переменные кнопок расширенного дропдауна
};

const listClickHandler = (event) => {
  switch (true) {
    case hasTargetClass('dropdown__apply-button'): // случай нажатия кнопки "применить"
      //куда-то передать объект с данными этого дропдауна?
      //закрыть дропдаун
      console.log('apply button');
      break;
    case hasTargetClass('dropdown__clean-button'): // случай нажатия кнопки "очистить"
      //уменьшить все значения до 0
      //сделать рамки и значки укнопок "-" светлыми
      //убрать кнопку "очистить"
      console.log('clean button');
      break;
    case hasTargetClass('dropdown__item-plus-button'): // случай нажатия кнопки "+"
      
      console.log('+ button: ' + Array.from(expandedDropdownPlusButtons).indexOf(event.target)); // отображает индекс нажатого +
      let a = expandedDropdownButton.previousElementSibling.querySelector('.dropdown__title');
      console.log(a);
      break;
    case hasTargetClass('dropdown__item-minus-button'): // случай нажатия кнопки "-"
      console.log('- button: ' + Array.from(expandedDropdownMinusButtons).indexOf(event.target)); // отображает индекс нажатого -
  }
};

const hasTargetClass = (name) => {
  return event.target.classList.contains(name);  //есть ли у таргетного элемента переданный в параметре класс
};

//====================================================================== проверочная функция
function check() {
  console.log('clickedDropdown = ' + clickedDropdown);
  console.log('expandedDropdown = ' + expandedDropdown);
  console.log('isDropdownExpanded() = ' + isDropdownExpanded());
  console.log('target = ' + event.target.tagName + ' (class = "' + event.target.className + '")');
};

// обработчик события передает в функцию единственный параметр по молчанию
// - объект, описывающий событие.
// event.target свойство этого объекта события, содержащее ссылку на целевой элемент события