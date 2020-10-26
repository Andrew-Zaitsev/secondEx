import {
  dayNouns,
  weekNouns,
  monthNouns,
  yearNouns
} from '../../assets/js/variables.js';

import {
  getNoun
} from '../../assets/js/functions.js';

const getPassedTimeString = (reviewDate) => {

  let daysNumber = Math.floor((Date.now() - new Date(reviewDate)) / (1000 * 60 * 60 * 24));

  switch (true) {
    case (daysNumber < 0):
      return 'Из будущего'
    case (daysNumber === 0):
      return 'Сегодня';
    case (daysNumber < 8):
      return (daysNumber + ' ' + getNoun(daysNumber, dayNouns) + ' назад');
    case (daysNumber < 32):
      let weeksNumber = Math.floor(daysNumber / 7);
      return (weeksNumber + ' ' + getNoun(weeksNumber, weekNouns) + ' назад');;
    case (daysNumber < 366):
      let monthsNumber = Math.floor(daysNumber / 31.4);
      return (monthsNumber + ' ' + getNoun(monthsNumber, monthNouns) + ' назад');
    default:
      let yearsNumber = Math.floor(daysNumber / 365);
      return (yearsNumber + ' ' + getNoun(yearsNumber, yearNouns) + ' назад');
  }

};

document.querySelectorAll('.review__time-passed').forEach((elem) => {
  elem.textContent = getPassedTimeString(elem.textContent);
});