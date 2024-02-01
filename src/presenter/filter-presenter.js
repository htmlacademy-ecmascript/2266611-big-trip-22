import {render, replace, remove} from '../framework/render.js';
import {filter} from '../utils/filter.js';
import {FilterType, UpdateType} from '../utils/enum.js';

import FilterView from '../view/toolbar/filter-view.js';

const filterContainer = document.querySelector('.trip-controls__filters');

export default class FilterPresenter {
  #pointModel = null;
  #filterModel = null;

  #filterComponent = null;

  constructor({pointModel, filterModel}) {
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointModel.points;

    return Object.values(FilterType).map((type) => ({type, count: filter[type](points).length}));
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;
    const currentFilterType = this.#filterModel.filter;
    const onFilterTypeChange = this.#handleFilterTypeChange;

    this.#filterComponent = new FilterView({filters, currentFilterType, onFilterTypeChange});

    if (prevFilterComponent === null) {
      render(this.#filterComponent, filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
