import '../../src/plagins/ion.rangeSlider/ion.rangeSlider.js';

import {
  prettifyNumber
} from '../../src/js/functions.js';

jQuery(document).ready(function () {

  $('.range-slider__input').ionRangeSlider({
    type: "double",
    skin: "round",
    grid: false,
    hide_min_max: true,
    hide_from_to: true,
    input_values_separator: "-",
    force_edges: true,

    onStart: function (data) {
      const unit = data.input.data('unit');

      data.slider.prev().find('.range-slider__caption').text(
        `${prettifyNumber(data.from, '\u00A0')}${unit} - ${prettifyNumber(data.to, '\u00A0')}${unit}`);
    },

    onChange: function (data) {
      const unit = data.input.data('unit');
      data.slider.prev().find('.range-slider__caption').text(
        `${prettifyNumber(data.from, '\u00A0')}${unit} - ${prettifyNumber(data.to, '\u00A0')}${unit}`);
    }
  });

  $('.range-slider__input').each(function () {
    $(this).ionRangeSlider()
  });
});