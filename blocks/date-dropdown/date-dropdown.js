import '../../src/plagins/air-datapicker/datepicker.js';

jQuery(document).ready(function () {

  let dateDropdown = $('.date-dropdown');
  let calendars = $('.date-dropdown__calendar');
  //let fromInput = $('.date-dropdown__from-field'); //not used
  //let toInput = $('.date-dropdown__to-field');  // not used
  let calDate = 'any';

  calendars.datepicker({
    //inline: true,
    range: true,
    multipleDatesSeparator: '-',
    language: "ru",
    clearButton: true,
    todayButton: true,
    //altField: "hi",

    onSelect: function (formattedDate, date, inst) {

      const getFormattedDateString = (dateObj) => {
        if (dateObj.length === 0) {
          return '';
        };
        console.log(dateObj.length);
        return `${(dateObj.getDate() < 10) ? '0' + dateObj.getDate() : dateObj.getDate()}.${((dateObj.getMonth() + 1) < 10) ? '0' + (dateObj.getMonth() + 1) : (dateObj.getMonth() + 1)}.${dateObj.getFullYear()}`;
      };

      calDate = formattedDate;
      //console.log('first', inst.selectedDates[0], inst.selectedDates[0] == true);
      let str = undefined;
      console.log('inst: ', inst);
      
      const fromDateString = inst.selectedDates[0];

      $(inst.el).prev().children().first().val(getFormattedDateString(fromDateString));

      if (inst.selectedDates.length === 2) {
        const toDateString = inst.selectedDates[1];
        //const toDateString = `${(toDateString.getDate() < 10) ? '0' + toDateString.getDate() : toDateString.getDate()}.${(toDateString.getDate() < 10) ? '0' + (toDateString.getDate() + 1) : (toDateString.getDate() + 1)}.${toDateString.getFullYear()}`;
        $(inst.el).prev().children().last().val(getFormattedDateString(toDateString));
        
      }
      //$(inst.el).prev().children().last().val(toDateString): '';
      //console.log(new Date(datestring));
    },
    onShow: function (inst) {},
  });

  $('.date-dropdown__calendar').data('datepicker');

  let datepicker = $('.datepicker');

  calendars.hide();

  $(document).on('mouseup', function (e) { // событие клика по веб-документу
    if (dateDropdown.has(e.target).length === 0) {
      calendars.hide();
    }
  });

  calendars.prev().children().each(
    function (index, el) {

      el.onclick = function (e) {
        let currentCalendar = dateDropdown.has(e.target).find('.date-dropdown__calendar');
        console.log(currentCalendar.css('display') === 'none');

        if (currentCalendar.css('display') === 'none') {
          calendars.hide();
          currentCalendar.show();
        } else {
          currentCalendar.hide();
        } 
      }
    }
  );

  console.log(calDate);
});

jQuery(document).ready(function () {
});