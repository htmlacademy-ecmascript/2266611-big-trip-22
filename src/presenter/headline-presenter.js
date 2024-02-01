import {RenderPosition, render, remove} from '../framework/render.js';

import HeadlineView from '../view/content/headline-view.js';

export default class HeadlinePresenter {
  #pointModel = null;
  #headlineComponent = null;
  #toolbarContainer = null;

  constructor({pointModel, toolbarContainer}) {
    this.#pointModel = pointModel;
    this.#toolbarContainer = toolbarContainer;

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

    render(this.#headlineComponent, this.#toolbarContainer, RenderPosition.AFTERBEGIN);
  }

  #handleModelEvent = () => {
    this.init();
  };
}
