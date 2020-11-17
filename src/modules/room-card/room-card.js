import {
  getNoun
} from '../../assets/js/functions.js';

import {
  reviewNouns
} from '../../assets/js/variables.js';

const roomCardElement = document.querySelectorAll('.room-card');

roomCardElement.forEach((element) => {
  const reviewsNumberElement = element.querySelector('.room-card__reviews-number');
  const measureUnitElement = element.querySelector('.room-card__measure-unit');

  measureUnitElement.textContent = getNoun(reviewsNumberElement.textContent, reviewNouns);
});