import '../../assets/js/plagins/air-datapicker/datepicker.js';

jQuery(document).ready(function () {

  let dateDropdown = $('.date-dropdown');
  let calendars = $('.date-dropdown__calendar');

  calendars.datepicker({
    range: true,
    multipleDatesSeparator: '-',

    clearButton: true,
    todayButton: true,
    language: {
      clear: 'очистить',
      today: 'применить'
    },
    navTitles: {
      days: 'MM yyyy'
    },

    prevHtml: '<i class = "material-icons">arrow_back</i>',
    nextHtml: '<i class = "material-icons">arrow_forward</i>',

    // выбор дат при клике на кнопках 
    onSelect: function (formattedDate, date, inst) {

      const currentFromInputValue = (value) => $(inst.el).prev().find('.date-dropdown__from-field').val(value);
      const currentToInputValue = (value) => $(inst.el).prev().find('.date-dropdown__to-field').val(value);

      let fromDateString = (inst.selectedDates[0] == null) ? '' : inst.selectedDates[0];
      let toDateString = (inst.selectedDates[1] == null) ? '' : inst.selectedDates[1];

      switch (true) {
        case (inst.selectedDates.length == 0):
          currentFromInputValue('');
          currentToInputValue('');
          break;
        case (inst.selectedDates.length == 1):
          currentFromInputValue(getFormattedDateString(fromDateString));
          currentToInputValue(getFormattedDateString(toDateString))
          break;
        case (inst.selectedDates.length == 2):
          currentFromInputValue(getFormattedDateString(fromDateString));
          currentToInputValue(getFormattedDateString(toDateString));
      }
    },
  });

  calendars.data('datepicker');

  calendars.each(function () {
    if (this.dataset.isVisible !== 'true') $(this).hide();// (!(this.dataset.isVisible)) $(this).hide(); ??????
  });

  // закрытие календаря при клике вне дропдауна
  $(document).on('mouseup', function (e) {
    if (dateDropdown.has(e.target).length === 0) {
      calendars.hide();
    }
  });

  // закрыть при клике по кнопке "применить"
  const applyButtons = calendars.find('.datepicker--button[data-action = "today"]')
  applyButtons.on('click', function () {
    $(this).parents().filter('.date-dropdown__calendar').hide();
  });

  // закрытие-открытие календаря при клике по инпутам
  calendars.prev().children().each(
    function (index, el) {
      el.onclick = function (e) {
        let currentCalendar = dateDropdown.has(e.target).find('.date-dropdown__calendar');

        if (currentCalendar.css('display') === 'none') {
          calendars.hide();
          currentCalendar.show();
        } else {
          currentCalendar.hide();
        }
      }
    }
  );

  const getFormattedDateString = (dateObj) => {
    if (dateObj.length !== 0) return `${(dateObj.getDate() < 10) ? '0' + dateObj.getDate() : dateObj.getDate()}.${((dateObj.getMonth() + 1) < 10) ? '0' + (dateObj.getMonth() + 1) : (dateObj.getMonth() + 1)}.${dateObj.getFullYear()}`;
    return '';
  };
});