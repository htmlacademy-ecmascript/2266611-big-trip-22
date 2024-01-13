import {RenderPosition, render} from '../framework/render.js';
import {generateFilter} from '../mocks/filter.js';

import HeadlineView from '../view/content/headline-view.js';
import FilterView from '../view/toolbar/filter-view.js';
import ButtonView from '../view/toolbar/button-view.js';

const toolbarContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');

export default class HeaderPresenter {
  #pointModel = null;

  #headlineComponent = new HeadlineView();
  #buttonComponent = new ButtonView();

  #filters;

  constructor({pointModel}) {
    this.#pointModel = pointModel;
  }

  get points() {
    return this.#pointModel.points;
  }

  init() {
    this.#filters = generateFilter(this.points);
    this.#renderHeader(this.#filters);
  }

  #renderHeader = (filters) => {
    render(this.#headlineComponent, toolbarContainer, RenderPosition.AFTERBEGIN);
    render(new FilterView({filters}), filterContainer);
    render(this.#buttonComponent, toolbarContainer);
  };
}
