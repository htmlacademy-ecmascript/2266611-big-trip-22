import {render} from '../framework/render.js';
import {updateItem, sortByValue} from '../utils/utils.js';
import {SortType} from '../utils/const.js';
import {sortByDate, sortByDuration} from '../utils/date.js';

import SortView from '../view/toolbar/sort-view.js';
import ListView from '../view/content/list-view.js';
import StubView from '../view/stubs/stub-view.js';
import PointPresenter from './point-presenter.js';

const contentContainer = document.querySelector('.trip-events');

export default class MainPresenter {
  #pointModel = null;

  #pointPresenters = new Map();

  #sortComponent = null;
  #listComponent = new ListView();
  #stubComponent = new StubView();

  #points = [];
  #offers = [];
  #destinations = [];

  #defaultSortType = SortType.DAY;
  #currentSortType = this.#defaultSortType;

  constructor({pointModel}) {
    this.#pointModel = pointModel;
  }

  init() {
    this.#points = [...this.#pointModel.points];
    this.#offers = this.#pointModel.offers;
    this.#destinations = this.#pointModel.destinations;

    this.#renderWithoutContent();
    this.#renderContent();
  }

  // Контент
  // -----------------

  #renderWithoutContent = () => {
    if (this.#points.length === 0) {
      render(this.#stubComponent, contentContainer);
    }
  };

  #renderContent = () => {
    this.#renderSortTypes();

    this.#renderContainer();
    this.#sortPoints(this.#defaultSortType);
    this.#renderPoints();
  };

  // Сортировка
  // -----------------

  #renderSortTypes = () => {
    const currentSortType = this.#currentSortType;
    const onSortTypeChange = this.#handleSortTypeChange;

    this.#sortComponent = new SortView({currentSortType, onSortTypeChange});

    render(this.#sortComponent, contentContainer);
  };

  #handleSortTypeChange = (sortType) => {
    this.#clearPoints();
    this.#sortPoints(sortType);
    this.#renderPoints();
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case 'day':
        this.#points.sort(sortByDate);
        break;
      case 'time':
        this.#points.sort(sortByDuration);
        break;
      case 'price':
        this.#points.sort(sortByValue('basePrice'));
        break;
      default: this.#points.sort(sortByDate);
    }

    this.#currentSortType = sortType;
  };

  #clearPoints = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  };

  // Точки
  // -----------------

  #renderContainer = () => {
    render(this.#listComponent, contentContainer);
  };

  #renderPoints = () => {
    this.#points.forEach((point) => this.#renderPoint(point, this.#offers, this.#destinations));
  };

  #renderPoint = (point, offers, destinations) => {
    const listComponent = this.#listComponent.element;
    const onDataChange = this.#handlePointChange;
    const onModeChange = this.#handleModeChange;

    const pointPresenter = new PointPresenter({listComponent, onDataChange, onModeChange});

    pointPresenter.init(point, offers, destinations);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.#offers, this.#destinations);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };
}
