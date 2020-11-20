import '../../assets/js/plagins/lightSlider/lightslider.js';

import {
  getNoun
} from '../../assets/js/functions.js';

import {
  reviewNouns
} from '../../assets/js/variables.js';

$(document).ready(function () {
  $(".room-card__slider").lightSlider({
    item: 1,
    enableTouch: true,
    enableDrag: true,
    freeMove: true,
    mode: 'slide',
    speed: 400,
    auto: false,
    pauseOnHover: false,
    loop: true, //works not correcly if 'true'
    slideEndAnimation: true,
    keyPress: true,
    //prevHtml: '<i>Hi</i>',
    //nextHtml:,
    pager: true,
    gallery: false,
    currentPagerPosition: 'middle', //works not correcly if 'true'
  });
});

const roomCardElement = document.querySelectorAll('.room-card');

roomCardElement.forEach((element) => {
  const reviewsNumberElement = element.querySelector('.room-card__reviews-number');
  const measureUnitElement = element.querySelector('.room-card__measure-unit');

  measureUnitElement.textContent = getNoun(reviewsNumberElement.textContent, reviewNouns);
});