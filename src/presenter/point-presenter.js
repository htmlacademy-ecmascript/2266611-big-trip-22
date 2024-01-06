import {render, replace} from '../framework/render.js';

import PointView from '../view/content/point-view.js';
import PointEditorView from '../view/content/point-editor-view.js';

export default class PointPresenter {
  #listComponent = null;
  #pointComponent = null;
  #pointEditorComponent = null;

  constructor({listComponent}) {
    this.#listComponent = listComponent;
  }

  init(point, destinations, offers) {
    this.#pointComponent = new PointView({
      point,
      destinations,
      offers,
      onEditClick: this.#handleOpenClick
    });

    this.#pointEditorComponent = new PointEditorView({
      point,
      destinations,
      offers,
      onEditClick: this.#handleCloseClick,
      onFormSubmit: this.#handleFormSubmit
    });

    render(this.#pointComponent, this.#listComponent);
  }

  #replacePointToForm = () => {
    replace(this.#pointEditorComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditorComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handleOpenClick = () => {
    this.#replacePointToForm();
  };

  #handleCloseClick = () => {
    this.#replaceFormToPoint();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
  };
}

