import {SortType} from '../../utils/enum.js';
import {capitalizeFirstLetter} from '../../utils/common.js';

import AbstractView from '../../framework/view/abstract-view.js';

const createSortTypeTemplate = (name, isDisabled, currentSortType) => (/*html*/`
  <div class="trip-sort__item  trip-sort__item--${name}">
    <input id="sort-${name}" class="trip-sort__input  visually-hidden"
    type="radio" name="trip-sort" value="sort-${name}"
    data-sort-type="${name}"
    ${isDisabled ? 'disabled' : ''}
    ${currentSortType.name === name ? 'checked' : ''}>
    <label class="trip-sort__btn" for="sort-${name}">${capitalizeFirstLetter(name)}</label>
  </div>`
);

const createSortTemplate = (currentSortType) => (/*html*/`
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${Object
    .values(SortType)
    .map((type) => createSortTypeTemplate(type.name, type.disabled, currentSortType))
    .join('')}
  </form>`
);

export default class SortView extends AbstractView {
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => this.#handleSortTypeChange(evt.target.dataset.sortType);
}
