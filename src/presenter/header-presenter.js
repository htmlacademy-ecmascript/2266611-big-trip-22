import {RenderPosition, render} from '../framework/render.js';

import HeadlineView from '../view/content/headline-view.js';
import ButtonView from '../view/toolbar/button-view.js';

const toolbarContainer = document.querySelector('.trip-main');

export default class HeaderPresenter {
  #headlineComponent = new HeadlineView();
  #buttonComponent = new ButtonView();

  init() {
    this.#renderHeader();
  }

  #renderHeader = () => {
    render(this.#headlineComponent, toolbarContainer, RenderPosition.AFTERBEGIN);
    render(this.#buttonComponent, toolbarContainer);
  };
}
