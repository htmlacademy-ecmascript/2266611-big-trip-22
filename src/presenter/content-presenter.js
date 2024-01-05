import {render, replace} from '../framework/render.js';

import SortView from '../view/toolbar/sort-view.js';
import ListView from '../view/content/list-view.js';
import PointView from '../view/content/point-view.js';
import PointEditorView from '../view/content/point-editor-view.js';
import StubView from '../view/stubs/stub-view.js';

const contentContainer = document.querySelector('.trip-events');

export default class ContentPresenter {
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

    this.#renderContent(points, destinations, offers);
  }

  #renderContent(points, destinations, offers) {
    render(this.#sortComponent, contentContainer);
    render(this.#listComponent, contentContainer);

    if (points.length === 0) {
      render(new StubView(), contentContainer);
    }

    points.forEach((point) => this.#renderPoint(point, destinations, offers));
  }

  #renderPoint(point, destinations, offers) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      destinations,
      offers,
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditorComponent = new PointEditorView({
      point,
      destinations,
      offers,
      onEditClick: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(pointEditorComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, pointEditorComponent);
    }

    render(pointComponent, this.#listComponent.element);
  }
}
