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
      let numberLastDigit = +Array.from(number.toString()).pop();
      return getNoun(numberLastDigit, nouns);
  }
};

const prettifyNumber = (number, separator = '\u00A0') => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

function makeDropdown(dropdownClassName, dropdownButtonClassName, dropdownListClassName, needToHideButton) {
  //it is needed the button and the list of the dropdowns to have modifiers "_hidden" for hiding them 
  //dropdown module have to have such a structure:   |     dropdown
  //                                                 |       dropdown__button
  //                                                 |       dropdown__list

  const dropdowns = document.querySelectorAll(`.${dropdownClassName}`);
  let openedDropdown = null;

  dropdowns.forEach(function (dropdown) {
    dropdown.button = dropdown.querySelector(`.${dropdownButtonClassName}`);
    dropdown.list = dropdown.querySelector(`.${dropdownListClassName}`);
    dropdown.needToHideButton = needToHideButton;
    dropdown.toggleDropdown = toggleDropdown;

    dropdown.list.classList.add(`${dropdownListClassName}_hidden`);
    dropdown.button.addEventListener('click', () => dropdown.toggleDropdown(dropdown));
  });

  function toggleDropdown(currentDropdown) {
    if (isDropdownClosed(currentDropdown)) {
      if (openedDropdown) {
        if (openedDropdown.needToHideButton) showButton();
        closeDropdown();
      }
      openDropdown(currentDropdown);
      if (openedDropdown.needToHideButton) hideButton();
      event.stopPropagation();
      document.addEventListener('click', handleDocumentClick);
    } else {
      if (openedDropdown.needToHideButton) showButton();
      closeDropdown();
      document.removeEventListener('click', handleDocumentClick);
    }
  }

  function handleDocumentClick() {
    if (isClickInsideOpenedDropdownList()) return;
    document.removeEventListener('click', handleDocumentClick);
    if (openedDropdown.needToHideButton) showButton();
    closeDropdown();
  }

  const isClickInsideOpenedDropdownList = () => openedDropdown.list.contains(event.target);
  const isDropdownClosed = (dropdown) => (getComputedStyle(dropdown.list).display === 'none');
  const closeDropdown = () => {
    openedDropdown.list.classList.add(`${dropdownListClassName}_hidden`);
    openedDropdown = null;
  };
  const openDropdown = (elem) => {
    elem.list.classList.remove(`${dropdownListClassName}_hidden`);
    openedDropdown = elem;
  };
  const showButton = () => openedDropdown.button.classList.remove(`${dropdownButtonClassName}_hidden`);
  const hideButton = () => openedDropdown.button.classList.add(`${dropdownButtonClassName}_hidden`);
}

export {
  getNoun,
  prettifyNumber,
  makeDropdown,
};