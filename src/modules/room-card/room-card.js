import '../../assets/js/plagins/lightSlider/lightslider.js';

import {
  getNoun
} from '../../assets/js/functions.js';

import {
  reviewNouns
} from '../../assets/js/variables.js';

const lsOptions = {
  item: 1,
  enableTouch: true,
  enableDrag: true,
  freeMove: true,
  mode: 'slide',
  speed: 400,
  auto: false,
  pauseOnHover: false,
  loop: true,
  slideEndAnimation: true,
  keyPress: true,
  pager: true,
  gallery: false,
  currentPagerPosition: 'middle',
};

function initSlider(sliderElem) {
  return $(sliderElem).lightSlider(lsOptions);
}


function insertMeasureUnitNoun() {
  const roomCardElement = document.querySelectorAll('.room-card');

  roomCardElement.forEach((element) => {
    const reviewsNumberElement = element.querySelector('.room-card__reviews-number');
    const measureUnitElement = element.querySelector('.room-card__measure-unit');

    measureUnitElement.textContent = getNoun(reviewsNumberElement.textContent, reviewNouns);
  });
}

insertMeasureUnitNoun();

export {
  initSlider
};