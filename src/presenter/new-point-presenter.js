import {remove, render, RenderPosition} from '../framework/render.js';
import {DEFAULT_POINT} from '../utils/const.js';
import {UserAction, UpdateType} from '../utils/enum.js';

import PointEditorView from '../view/content/point-editor-view.js';

export default class NewPointPresenter {
  #listComponent = null;
  #pointEditorComponent = null;

  #handleDataChange = null;
  #handleDestroy = null;

  #pointModel = null;
  #point = null;

  constructor({listComponent, pointModel, onDataChange, onDestroy}) {
    this.#listComponent = listComponent;
    this.#pointModel = pointModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#point = DEFAULT_POINT;
  }

  init() {
    if (this.#pointEditorComponent !== null) {
      return;
    }

    this.#pointEditorComponent = new PointEditorView({
      point: this.#point,
      offers: this.#pointModel.offers,
      destinations: this.#pointModel.destinations,
      onFormSubmit: this.#handleFormSubmit,
      onFormReset: this.#handleFormReset
    });

    render(this.#pointEditorComponent, this.#listComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditorComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditorComponent);
    this.#pointEditorComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#pointEditorComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointEditorComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditorComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleFormReset = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
