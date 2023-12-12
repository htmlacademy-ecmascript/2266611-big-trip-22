import {createElement} from '../../render';

function createButtonTemplate() {
  return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
}

export default class ButtonView {
  getElement() {
    return createElement(createButtonTemplate());
  }
}
