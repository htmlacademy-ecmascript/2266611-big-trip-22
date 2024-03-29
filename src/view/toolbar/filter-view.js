import {capitalizeFirstLetter} from '../../utils/common.js';

import AbstractView from '../../framework/view/abstract-view.js';

const createFilterTemplate = (filter, currentFilterType) => {
  const {type, count} = filter;

  return `<div class="trip-filters__filter">
            <input id="filter-${type}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${type}"
            ${type === currentFilterType ? 'checked' : ''} ${count === 0 ? 'disabled' : ''} value="${type}">
            <label class="trip-filters__filter-label" for="filter-${type}">${capitalizeFirstLetter(type)}</label>
          </div>`;
};

const createFiltersTemplate = (filters, currentFilterType) => {
  const filtersTemplate = filters.map((filter) => createFilterTemplate(filter, currentFilterType)).join('');

  return `<form class="trip-filters" action="#" method="get">
            ${filtersTemplate}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
};

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor ({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
