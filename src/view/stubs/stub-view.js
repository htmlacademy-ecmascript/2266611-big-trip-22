import AbstractView from '../../framework/view/abstract-view.js';
import {FilterMessage} from '../../utils/const.js';

const createStubTemplate = (filterType) => {
  const filterMessage = FilterMessage[filterType];

  return `<p class="trip-events__msg">${filterMessage}</p>`;
};

export default class StubView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createStubTemplate(this.#filterType);
  }
}
