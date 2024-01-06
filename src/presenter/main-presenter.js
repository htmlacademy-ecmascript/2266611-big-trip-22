import {render} from '../framework/render.js';

import SortView from '../view/toolbar/sort-view.js';
import ListView from '../view/content/list-view.js';
import StubView from '../view/stubs/stub-view.js';
import PointPresenter from './point-presenter.js';

const contentContainer = document.querySelector('.trip-events');

export default class MainPresenter {
  #pointModel = null;

  #sortComponent = new SortView();
  #listComponent = new ListView();
  #stubComponent = new StubView();

  constructor({pointModel}) {
    this.#pointModel = pointModel;
  }

  init() {
    const points = this.#pointModel.points;
    const destinations = this.#pointModel.destinations;
    const offers = this.#pointModel.offers;

    this.#renderWithoutContent(points);
    this.#renderContent(points, destinations, offers);
  }

  #renderWithoutContent = (points) => {
    if (points.length === 0) {
      render(this.#stubComponent, contentContainer);
    }
  };

  #renderContent = (points, destinations, offers) => {
    render(this.#sortComponent, contentContainer);
    render(this.#listComponent, contentContainer);
    this.#renderPoints(points, destinations, offers);
  };

  #renderPoints = (points, destinations, offers) => {
    points.forEach((point) => this.#renderPoint(point, destinations, offers));
  };

  #renderPoint = (point, destinations, offers) => {
    const listComponent = this.#listComponent.element;
    const pointPresenter = new PointPresenter({listComponent});
    pointPresenter.init(point, destinations, offers);
  };
}
