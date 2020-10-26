const expandableCheckBoxListButtons = document.querySelectorAll('.expandable-checkbox-list__button');
const expandableCheckBoxLists = document.querySelectorAll('.expandable-checkbox-list');
let expandedCheckBoxList = null;

expandableCheckBoxListButtons.forEach(

  function (elem) {
    elem.addEventListener(

      'click',
      function () {

        if (!(isAnyCheckboxListExpanded())) {
          (expandedCheckBoxList = this.parentElement);
          this.nextElementSibling.classList.add('expandable-checkbox-list__checkbox_expanded');
        } else if (isClickInsideExpandedCheckboxList()) {
          this.nextElementSibling.classList.remove('expandable-checkbox-list__checkbox_expanded');
          expandedCheckBoxList = null;
        } else {
          this.nextElementSibling.classList.add('expandable-checkbox-list__checkbox_expanded');
          expandedCheckBoxList.lastElementChild.classList.remove('expandable-checkbox-list__checkbox_expanded');
          expandedCheckBoxList = this.parentElement;
        }

      }
    );
  },

);

document.addEventListener('click',

  function () {
    if (isClickOutsideCheckboxList()) {
      if (isAnyCheckboxListExpanded()) {
        expandedCheckBoxList.lastElementChild.classList.remove('expandable-checkbox-list__checkbox_expanded');
        expandedCheckBoxList = null;
      }
    }
  }

)

const isClickOutsideCheckboxList = () => {

  for (let i = 0; i < expandableCheckBoxLists.length; i++)
    if ((expandableCheckBoxLists[i] === event.target) || (expandableCheckBoxLists[i].contains(event.target))) return false;
  return true;

};

const isAnyCheckboxListExpanded = () => {
  return (expandedCheckBoxList !== null);
};

const isClickInsideExpandedCheckboxList = () => {
  return (expandedCheckBoxList.contains(event.target));
};