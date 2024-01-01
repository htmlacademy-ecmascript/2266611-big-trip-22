import {render} from '../framework/render.js';
import {getDefaultPoint} from '../utils/const.js';

import SortView from '../view/toolbar/sort-view.js';
import ListView from '../view/content/list-view.js';
import PointView from '../view/content/point-view.js';
import PointEditorView from '../view/content/point-editor-view.js';

const contentContainer = document.querySelector('.trip-events');

export default class MainPresenter {
  #pointModel = null;

  #sortComponent = new SortView();
  #listComponent = new ListView();

  constructor({pointModel}) {
    this.#pointModel = pointModel;
  }

  init() {
    const points = this.#pointModel.points;
    const destinations = this.#pointModel.destinations;
    const offers = this.#pointModel.offers;

    render(this.#sortComponent, contentContainer);
    render(this.#listComponent, contentContainer);
    render(new PointEditorView(getDefaultPoint(), destinations, offers), this.#listComponent.element);
    render(new PointEditorView(points[4], destinations, offers), this.#listComponent.element);

    points.forEach((point) => this.#renderPoint(point, destinations, offers));
  }

  #renderPoint(point, destinations, offers) {
    render(new PointView(point, destinations, offers), this.#listComponent.element);
  }
}
