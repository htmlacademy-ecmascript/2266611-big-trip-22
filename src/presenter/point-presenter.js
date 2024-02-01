import {render, replace, remove} from '../framework/render.js';
import {Mode, UserAction, UpdateType} from '../utils/enum.js';

import PointView from '../view/content/point-view.js';
import PointEditorView from '../view/content/point-editor-view.js';

export default class PointPresenter {
  #listComponent = null;
  #pointComponent = null;
  #pointEditorComponent = null;

  #point = null;
  #offers = [];
  #destinations = [];

  #handleDataChange = null;
  #handleModeChange = null;

  #mode = Mode.DEFAULT;

  constructor({listComponent, onDataChange, onModeChange}) {
    this.#listComponent = listComponent;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point, offers, destinations) {
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditorComponent = this.#pointEditorComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onEditClick: this.#handleOpenClick,
      onFavoriteClick: this.#handleFavoriteClick
    });

    this.#pointEditorComponent = new PointEditorView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onEditClick: this.#handleCloseClick,
      onFormSubmit: this.#handleFormSubmit,
      onFormReset: this.#handleFormReset
    });

    if (prevPointComponent === null || prevPointEditorComponent === null) {
      render(this.#pointComponent, this.#listComponent);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, prevPointEditorComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevPointEditorComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditorComponent);
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditorComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditorComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#pointEditorComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditorComponent.shake(resetFormState);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditorComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  }

  #replacePointToForm = () => {
    replace(this.#pointEditorComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditorComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointEditorComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };

  #handleOpenClick = () => {
    this.#replacePointToForm();
  };

  #handleCloseClick = () => {
    this.#pointEditorComponent.reset(this.#point);
    this.#replaceFormToPoint();
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      point
    );
  };

  #handleFormReset = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point
    );
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {...this.#point, isFavorite: !this.#point.isFavorite}
    );
  };
}
