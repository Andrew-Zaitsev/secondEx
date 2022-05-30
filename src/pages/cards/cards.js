import '../../modules/card-filter/card-filter.js';
import '../../modules/card-registration/card-registration.js';
import '../../modules/card-booking/card-booking.js';
import '../../modules/date-dropdown/date-dropdown.js';
import {
  initSlider
} from '../../modules/room-card/room-card.js';

document.querySelectorAll('.cards__room-card')
  .forEach(roomCardElem => initSlider(roomCardElem.querySelector('.room-card__slider')));