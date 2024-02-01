import {FilterMessage} from '../../utils/enum.js';

import AbstractView from '../../framework/view/abstract-view.js';

const createAlertTemplate = (errorMessage, filterType) => {
  const filterMessage = FilterMessage[filterType];

  return `<p class="trip-events__msg">${errorMessage || filterMessage}</p>`;
};

export default class AlertView extends AbstractView {
  #errorMessage = null;
  #filterType = null;

  constructor({errorMessage, filterType}) {
    super();
    this.#errorMessage = errorMessage;
    this.#filterType = filterType;
  }

  get template() {
    return createAlertTemplate(this.#errorMessage, this.#filterType);
  }
}
