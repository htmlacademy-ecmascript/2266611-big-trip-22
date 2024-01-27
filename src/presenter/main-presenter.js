import {RenderPosition, render, remove} from '../framework/render.js';
import {sortByValue} from '../utils/utils.js';
import {FAILED_LOAD, SortType, UserAction, UpdateType, FilterType} from '../utils/const.js';
import {sortByDate, sortByDuration} from '../utils/date.js';
import {filter} from '../utils/filter.js';

import HeadlineView from '../view/content/headline-view.js';
import ButtonView from '../view/toolbar/button-view.js';

import SortView from '../view/toolbar/sort-view.js';
import ListView from '../view/content/list-view.js';
import AlertView from '../view/stubs/alert-view.js';
import LoaderView from '../view/stubs/loader-view.js';

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
  #alertComponent = null;
  #loaderComponent = new LoaderView();
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
      case SortType.DAY.name:
        return filteredPoints.sort(sortByDate('dateFrom'));
      case SortType.TIME.name:
        return filteredPoints.sort(sortByDuration('dateFrom', 'dateTo'));
      case SortType.PRICE.name:
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

  get loading() {
    return this.#pointModel.loading;
  }

  get error() {
    return this.#pointModel.error;
  }

  init() {
    this.#renderButton();
    this.#renderPointsContainer();
    this.#renderContent();
  }

  #renderHeadline = () => {
    render(this.#headlineComponent, toolbarContainer, RenderPosition.AFTERBEGIN);
  };

  #renderButton = () => {
    this.#buttonComponent = new ButtonView({onClick: this.#handleNewPointButtonClick});
    render(this.#buttonComponent, toolbarContainer);
  };

  #renderContent = () => {
    this.#renderPoints();
    this.#renderStub();

    if (this.points.length > 0) {
      this.#renderHeadline();
      this.#renderSortTypes();
    }
  };

  #clearContent = () => {
    this.#clearPoints();
    remove(this.#sortComponent);

    if (this.#alertComponent) {
      remove(this.#alertComponent);
    }
  };

  #renderPointsContainer = () => {
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

    if (this.#alertComponent) {
      remove(this.#alertComponent);
    }
  };

  /**
   * Функция для отрисовки сортировки с выбранным типом.
   */

  #renderSortTypes = () => {
    const currentSortType = this.#currentSortType;
    const onSortTypeChange = this.#handleSortTypeChange;

    this.#sortComponent = new SortView({currentSortType, onSortTypeChange});
    render(this.#sortComponent, contentContainer, RenderPosition.AFTERBEGIN);
  };

  /**
   * Функция для отрисовки сообщений-заглушек о загрузке данных, ошибке загрузки данных и отсутствии точек маршрута.
   * @returns {HTMLElement} Элемент в котором будет отрисован компонент
   */

  #renderStub = () => {
    if (this.loading) {
      render(this.#loaderComponent, contentContainer);
      return;
    } else {
      remove(this.#loaderComponent);
    }

    if (this.error) {
      this.#alertComponent = new AlertView({errorMessage: FAILED_LOAD});
      render(this.#alertComponent, contentContainer);
      return;
    }

    if (this.points.length === 0) {
      this.#alertComponent = new AlertView({filterType: this.#filterType});
      render(this.#alertComponent, contentContainer);
    }
  };

  /**
  * Обработчик любого пользовательского действия для вызова обновления модели.
  * @param {*} actionType Действие пользователя: нужно чтобы понять, какой метод модели вызвать
  * @param {*} updateType Тип изменений: что нужно обновить
  * @param {*} point Обновленные данные точки
  */

  #handleViewAction = (actionType, updateType, point) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, point);
        break;
      case UserAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, point);
        break;
      case UserAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, point);
        break;
    }
  };

  /**
   * Обработчик-наблюдатель, который реагирует на изменения модели.
   * @param {*} updateType Тип изменений
   * @param {*} point Обновленные данные точки
   */

  #handleModelEvent = (updateType, point) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(point.id).init(point, this.offers, this.destinations);
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
      case UpdateType.INIT:
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
