import AbstractView from '../../framework/view/abstract-view.js';
import {FilterMessage} from '../../utils/const.js';

const createStubTemplate = (message, filterType) => {
  const filterMessage = FilterMessage[filterType];

  return `<p class="trip-events__msg">${message || filterMessage}</p>`;
};

export default class StubView extends AbstractView {
  #message = null;
  #filterType = null;

  constructor({message, filterType}) {
    super();
    this.#message = message;
    this.#filterType = filterType;
  }

  get template() {
    return createStubTemplate(this.#message, this.#filterType);
  }
}
