import {RenderPosition, render} from '../framework/render.js';
import HeadlineView from '../view/content/headline-view.js';
import FilterView from '../view/toolbar/filter-view.js';
import ButtonView from '../view/toolbar/button-view.js';

const toolbarContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');

export default class HeaderPresenter {
  #headlineComponent = new HeadlineView();
  #filterComponent = new FilterView();
  #buttonComponent = new ButtonView();

  init() {
    render(this.#headlineComponent, toolbarContainer, RenderPosition.AFTERBEGIN);
    render(this.#filterComponent, filterContainer);
    render(this.#buttonComponent, toolbarContainer);
  }
}
