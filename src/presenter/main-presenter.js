import {render} from '../framework/render.js';
import {updateItem} from '../utils/utils.js';

import SortView from '../view/toolbar/sort-view.js';
import ListView from '../view/content/list-view.js';
import StubView from '../view/stubs/stub-view.js';
import PointPresenter from './point-presenter.js';

const contentContainer = document.querySelector('.trip-events');

export default class MainPresenter {
  #pointModel = null;

  #pointPresenters = new Map();

  #sortComponent = new SortView();
  #listComponent = new ListView();
  #stubComponent = new StubView();

  #points = [];
  #offers = [];
  #destinations = [];

  constructor({pointModel}) {
    this.#pointModel = pointModel;
  }

  init() {
    this.#points = this.#pointModel.points;
    this.#offers = this.#pointModel.offers;
    this.#destinations = this.#pointModel.destinations;

    this.#renderWithoutContent(this.#points);
    this.#renderContent(this.#points, this.#offers, this.#destinations);
  }

  #renderWithoutContent = (points) => {
    if (points.length === 0) {
      render(this.#stubComponent, contentContainer);
    }
  };

  #renderContent = (points, offers, destinations) => {
    render(this.#sortComponent, contentContainer);
    render(this.#listComponent, contentContainer);
    this.#renderPoints(points, offers, destinations);
  };

  #renderPoints = (points, offers, destinations) => {
    points.forEach((point) => this.#renderPoint(point, offers, destinations));
  };

  #renderPoint = (point, offers, destinations) => {
    const listComponent = this.#listComponent.element;
    const onDataChange = this.#handlePointChange;

    const pointPresenter = new PointPresenter({listComponent, onDataChange});

    pointPresenter.init(point, offers, destinations);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.#offers, this.#destinations);
  };
}
