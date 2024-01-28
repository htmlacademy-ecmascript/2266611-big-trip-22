import {RenderPosition, render, remove} from '../framework/render.js';

import HeadlineView from '../view/content/headline-view.js';

const toolbarContainer = document.querySelector('.trip-main');

export default class HeadlinePresenter {
  #headlineComponent = null;
  #pointModel = null;

  constructor({pointModel}) {
    this.#pointModel = pointModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
  }

  init() {
    if (this.#headlineComponent !== null) {
      remove(this.#headlineComponent);
    }

    this.#headlineComponent = new HeadlineView({
      points: this.#pointModel.points,
      offers: this.#pointModel.offers,
      destinations: this.#pointModel.destinations
    });

    if (this.#pointModel.points.length === 0) {
      remove(this.#headlineComponent);
      return;
    }

    render(this.#headlineComponent, toolbarContainer, RenderPosition.AFTERBEGIN);
  }

  #handleModelEvent = () => {
    this.init();
  };
}
