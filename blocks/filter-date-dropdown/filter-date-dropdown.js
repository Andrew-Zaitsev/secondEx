import '../../src/plagins/air-datapicker/datepicker.js';

jQuery(document).ready(function () {
  let filterDateDropdown = $('.filter-date-dropdown');
  let calendars = $('.filter-date-dropdown__calendar');

  calendars.datepicker({
    range: true,
    multipleDatesSeparator: ' - ',

    clearButton: true,
    todayButton: true,
    language: {
      clear: 'очистить',
      today: 'применить'
    },
    navTitles: {
      days: 'MM yyyy'
    },
    dateFormat: 'dd M',

    prevHtml: '<i class = "material-icons">arrow_back</i>',
    nextHtml: '<i class = "material-icons">arrow_forward</i>',

    // выбор дат при клике на кнопках 
    onSelect: function (formattedDate, date, inst) {
      const currenInputValue = (value) => $(inst.el).prev().find('.filter-date-dropdown__field').val(value);

      currenInputValue(formattedDate.toLowerCase());
    },
  });

  calendars.data('datepicker');

  calendars.hide();

  // закрытие календаря при клике вне дропдауна
  $(document).on('mouseup', function (e) {
    if (filterDateDropdown.has(e.target).length === 0) {
      calendars.hide();
    }
  });

  // закрыть при клике по кнопке "применить"
  const applyButtons = calendars.find('.datepicker--button[data-action = "today"]')
  applyButtons.on('click', function () {
    $(this).parents().filter('.filter-date-dropdown__calendar').hide();
  });

  // закрытие-открытие календаря при клике по инпутам
  $(document).find('.filter-date-dropdown__field-holder').each(
    function (index, el) {
      el.onclick = function (e) {
        let currentCalendar = filterDateDropdown.has(e.target).find('.filter-date-dropdown__calendar');

        if (currentCalendar.css('display') === 'none') {
          calendars.hide();
          currentCalendar.show();
        } else {
          currentCalendar.hide();
        }
      }
    }
  );
});