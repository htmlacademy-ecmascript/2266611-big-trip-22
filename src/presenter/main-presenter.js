import {RenderPosition, render, remove} from '../framework/render.js';
import {sortByValue} from '../utils/utils.js';
import {SortType, UserAction, UpdateType, FilterType} from '../utils/const.js';
import {sortByDate, sortByDuration} from '../utils/date.js';
import {filter} from '../utils/filter.js';

import HeadlineView from '../view/content/headline-view.js';
import ButtonView from '../view/toolbar/button-view.js';

import SortView from '../view/toolbar/sort-view.js';
import ListView from '../view/content/list-view.js';
import StubView from '../view/stubs/stub-view.js';

import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';

const toolbarContainer = document.querySelector('.trip-main');
const contentContainer = document.querySelector('.trip-events');

export default class MainPresenter {
  #pointModel = null;
  #filterModel = null;

  #pointPresenters = new Map();
  #newPointPresenter = null;

  #headlineComponent = new HeadlineView();
  #buttonComponent = null;

  #sortComponent = null;
  #stubComponent = null;
  #listComponent = new ListView();

  #defaultSortType = SortType.DAY;
  #currentSortType = this.#defaultSortType;
  #filterType = FilterType.EVERYTHING;

  constructor({pointModel, filterModel}) {
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      listComponent: this.#listComponent.element,
      pointModel: this.#pointModel,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#handleNewPointFormClose
    });

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case 'day':
        return filteredPoints.sort(sortByDate('dateFrom'));
      case 'time':
        return filteredPoints.sort(sortByDuration('dateFrom', 'dateTo'));
      case 'price':
        return filteredPoints.sort(sortByValue('basePrice'));
    }
    return filteredPoints.sort(sortByDate('dateFrom'));
  }

  get offers() {
    return this.#pointModel.offers;
  }

  get destinations() {
    return this.#pointModel.destinations;
  }

  init() {
    this.#renderHeader();
    this.#renderContainer();
    this.#renderContent();
  }

  // Контент
  // -----------------

  #renderHeader = () => {
    this.#buttonComponent = new ButtonView({onClick: this.#handleNewPointButtonClick});
    render(this.#headlineComponent, toolbarContainer, RenderPosition.AFTERBEGIN);
    render(this.#buttonComponent, toolbarContainer);
  };

  #renderContent = () => {
    this.#renderPoints();
    this.#renderStub();
    this.#renderSortTypes();
  };

  #clearContent = () => {
    this.#clearPoints();
    remove(this.#sortComponent);

    if (this.#stubComponent) {
      remove(this.#stubComponent);
    }
  };

  #renderStub = () => {
    if (this.points.length === 0) {
      this.#stubComponent = new StubView({filterType: this.#filterType});
      render(this.#stubComponent, contentContainer);
    }
  };

  // Сортировка
  // -----------------

  #renderSortTypes = () => {
    const currentSortType = this.#currentSortType;
    const onSortTypeChange = this.#handleSortTypeChange;

    this.#sortComponent = new SortView({currentSortType, onSortTypeChange});
    render(this.#sortComponent, contentContainer, RenderPosition.AFTERBEGIN);
  };

  // Точки
  // -----------------

  #renderContainer = () => {
    render(this.#listComponent, contentContainer);
  };

  #renderPoints = () => {
    this.points.forEach((point) => this.#renderPoint(point, this.offers, this.destinations));
  };

  #clearPoints = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#newPointPresenter.destroy();
  };

  #renderPoint = (point, offers, destinations) => {
    const listComponent = this.#listComponent.element;
    const onDataChange = this.#handleViewAction;
    const onModeChange = this.#handleModeChange;

    const pointPresenter = new PointPresenter({listComponent, onDataChange, onModeChange});

    pointPresenter.init(point, offers, destinations);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #createNewPoint = () => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();

    if (this.#stubComponent) {
      remove(this.#stubComponent);
    }
  };

  /**
  * Обработчик любого пользовательского действия для вызова обновления модели.
  * @param {*} actionType Действие пользователя: нужно чтобы понять, какой метод модели вызвать
  * @param {*} updateType Тип изменений: что нужно обновить
  * @param {*} updatedPoint Обновленные данные точки
  */

  #handleViewAction = (actionType, updateType, updatedPoint) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, updatedPoint);
        break;
      case UserAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, updatedPoint);
        break;
      case UserAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, updatedPoint);
        break;
    }
  };

  /**
   * Обработчик-наблюдатель, который реагирует на изменения модели.
   * @param {*} updateType Тип изменений
   * @param {*} updatedPoint Обновленные данные точки
   */

  #handleModelEvent = (updateType, updatedPoint) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.offers, this.destinations);
        break;
      case UpdateType.MINOR:
        this.#clearContent();
        this.#renderContent();
        break;
      case UpdateType.MAJOR:
        this.#currentSortType = this.#defaultSortType;
        this.#clearContent();
        this.#renderContent();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearPoints();
    this.#renderPoints();
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
    this.#newPointPresenter.destroy();
  };

  #handleNewPointFormClose = () => {
    this.#renderStub();
    this.#buttonComponent.element.disabled = false;
  };

  #handleNewPointButtonClick = () => {
    this.#createNewPoint();
    this.#buttonComponent.element.disabled = true;
  };
}
