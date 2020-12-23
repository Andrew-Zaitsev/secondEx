import '../../assets/js/plagins/pagination/pagination.js.js';
import {
  initSlider
} from '../../modules/room-card/room-card.js';
import {
  formElementsPageRoomCards,
  variantNouns
} from '../../assets/js/variables.js';
import {
  getNoun
} from '../../assets/js/functions.js';

jQuery(document).ready(function () {

  const $roomCards = $('.pagination__room-cards');
  let roomCards = Array.from($('.pagination__room-card'));
  let sliders = [];

  if (roomCards.length === 0) roomCards = formElementsPageRoomCards;

  const paginationOptions = {
    dataSource: roomCards,
    pageSize: 12,
    pageRange: 1,
    autoHidePrevious: true,
    autoHideNext: true,
    showNavigator: false,
    showPageNumbers: true,
    showNavigator: true,
    classPrefix: 'pagination__button',
    activeClassName: 'pagination__button-active',
    disableClassName: '',
    ulClassName: 'pagination__list',
    ellipsisText: '...',
    prevText: '<i class = "material-icons">arrow_back</i>',
    nextText: '<i class = "material-icons">arrow_forward</i>',

    callback: function (data, pagination) {
      destroySliders();
      changeCardELems(data);
      initSliders();
      changePaginationText(data, pagination);
    }
  };

  $('.pagination__buttons').pagination(paginationOptions);

  function destroySliders() {
    sliders.forEach($sliderElem => $sliderElem.destroy());
    sliders = [];
  }

  function changeCardELems(elems) {
    $roomCards.find('.pagination__room-card').remove();
    $roomCards.append(elems);
  }

  function initSliders() {
    $roomCards.find('.room-card__slider').each((index, sliderElem) => {
      sliders.push(initSlider(sliderElem));
    });
  }

  function changePaginationText(data, pagination) {
    const firstCardOfPage = (pagination.pageNumber - 1) * pagination.pageSize + 1;
    const lastCardOfPage = (pagination.pageNumber - 1) * pagination.pageSize + data.length;
    $('.pagination__button-nav').text(
      ((firstCardOfPage !== lastCardOfPage) ? (firstCardOfPage + ' - ' + lastCardOfPage) : lastCardOfPage) + ' из ' +
      ((paginationOptions.dataSource.length > 100) ? '100+ вариантов' : ((paginationOptions.dataSource.length) + ' ' + (getNoun(paginationOptions.dataSource.length, variantNouns)))) +
      ' аренды'
    );
  }
});