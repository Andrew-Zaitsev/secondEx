let dropdownButtons = document.querySelectorAll('.dropdown__button'); //коллекция кнопок дропдаунов
let clickedDropdown = null;
let expandedDropdown = null;

document.onclick = function (event) {

  if (isClickInsideDropdown(event)) {
    //если клик внутри

    if (isDropdownExpanded()) {

      if (isCurrentExpanded()) {
        
        isClickInsideList(event) ? console.log('клик по списку') : closeDropdown();
      
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
 
let isClickInsideDropdown = (event) => { 
  
  for (let i = 0; i < dropdownButtons.length; i++) {
    
    if ((dropdownButtons[i] === event.target) || (dropdownButtons[i].contains(event.target))) {
      clickedDropdown = i;
      return true;
    }

  }
  return false;
};

let isClickInsideList = () => {
  let listElement = dropdownButtons[expandedDropdown].lastChild;
  return (listElement === event.target) || (listElement.contains(event.target));
};

let isDropdownExpanded = () => {
  return (expandedDropdown !== null);
};

let isCurrentExpanded = () => {
  return (clickedDropdown === expandedDropdown);
};

let expandDropdown = () => {
  dropdownButtons[clickedDropdown].classList.add('dropdown__button_expanded');
  expandedDropdown = clickedDropdown;
  clickedDropdown = null;
};

let closeDropdown = () => {
  dropdownButtons[expandedDropdown].classList.remove('dropdown__button_expanded');
  expandedDropdown = null;
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
