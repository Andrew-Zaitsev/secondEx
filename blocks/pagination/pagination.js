import '../../src/plagins/pagination/pagination.js.js';
import {
  roomCards,
  variantNouns
} from '../../src/js/variables.js';
import {
  getNoun
} from '../../src/js/functions.js';

jQuery(document).ready(function () {

  let options = {
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
      // template method of yourself
      let html = template(data);

      $('.pagination__room-cards').html(html);

      const firstCardOfPage = (pagination.pageNumber - 1) * pagination.pageSize + 1;
      const lastCardOfPage = (pagination.pageNumber - 1) * pagination.pageSize + data.length;
      $('.pagination__button-nav').text(
        ((firstCardOfPage !== lastCardOfPage) ? (firstCardOfPage + ' - ' + lastCardOfPage) : lastCardOfPage) + ' из ' +
        ((options.dataSource.length > 100) ? '100+ вариантов' : ((options.dataSource.length) + ' ' + (getNoun(options.dataSource.length, variantNouns)))) +
        ' аренды'
      );
    }
  };

  $('.pagination__buttons').pagination(options);

  function template(data) {
    var html = '<div>';
    $.each(data, function (index, item) {
      html += '<div>' + item + '</div>';
    });
    html += '</div>';
    return html;
  }
  /*
    $('.pagination__buttons').addHook('afterIsLastPage', function () {
      options.dataSource[3] = 'eeee';
      //$('.pagination').show();
    });
  */
});