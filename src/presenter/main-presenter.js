import {RenderPosition, render, remove} from '../framework/render.js';
import {sortByValue} from '../utils/utils.js';
import {FAILED_LOAD} from '../utils/const.js';
import {SortType, UserAction, UpdateType, FilterType, TimeLimit} from '../utils/enum.js';
import {sortByDate, sortByDuration} from '../utils/date.js';
import {filter} from '../utils/filter.js';

import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

import CtaButtonView from '../view/toolbar/cta-button-view.js';
import SortView from '../view/toolbar/sort-view.js';
import ListView from '../view/content/list-view.js';
import AlertView from '../view/stubs/alert-view.js';
import LoaderView from '../view/stubs/loader-view.js';

import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';

export default class MainPresenter {
  #pointModel = null;
  #filterModel = null;

  #pointPresenters = new Map();
  #newPointPresenter = null;

  #ctaButtonComponent = null;
  #sortComponent = null;
  #alertComponent = null;
  #loaderComponent = new LoaderView();
  #listComponent = new ListView();

  #toolbarContainer = null;
  #contentContainer = null;

  #defaultSortType = SortType.DAY;
  #currentSortType = this.#defaultSortType;
  #filterType = FilterType.EVERYTHING;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({pointModel, filterModel, toolbarContainer, contentContainer}) {
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;

    this.#toolbarContainer = toolbarContainer;
    this.#contentContainer = contentContainer;

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
    this.#renderCtaButton();
    this.#renderPointsContainer();
    this.#renderContent();
  }

  #renderCtaButton = () => {
    this.#ctaButtonComponent = new CtaButtonView({onCtaButtonClick: this.#handleCtaButtonClick});
    render(this.#ctaButtonComponent, this.#toolbarContainer);
  };

  #renderContent = () => {
    this.#renderPoints();
    this.#setInterfaceState();

    if (this.points.length > 0) {
      this.#renderSortTypes();
    }
  };

  #clearContent = () => {
    remove(this.#sortComponent);
    this.#clearPoints();

    if (this.#alertComponent) {
      remove(this.#alertComponent);
    }
  };

  #renderPointsContainer = () => {
    render(this.#listComponent, this.#contentContainer);
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
    this.#currentSortType = this.#defaultSortType;
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
    render(this.#sortComponent, this.#contentContainer, RenderPosition.AFTERBEGIN);
  };

  /**
   * Функция для обработки обратной связи с информацией или результатами:
   * отрисовка сообщений-заглушек о загрузке данных, ошибке загрузки данных и отсутствии точек маршрута,
   * блокировка кнопки при загрузке данных.
   * @returns {HTMLElement} Элемент в котором будет отрисован компонент
   */

  #setInterfaceState = () => {
    if (this.loading) {
      render(this.#loaderComponent, this.#contentContainer);
      this.#deactivateCtaButton();
      return;
    } else {
      remove(this.#loaderComponent);
      this.#activateCtaButton();
    }

    if (this.error) {
      this.#alertComponent = new AlertView({errorMessage: FAILED_LOAD});
      render(this.#alertComponent, this.#contentContainer);
      this.#deactivateCtaButton();
      return;
    }

    if (this.points.length === 0) {
      this.#alertComponent = new AlertView({filterType: this.#filterType});
      render(this.#alertComponent, this.#contentContainer);
    }
  };

  #activateCtaButton = () => {
    this.#ctaButtonComponent.element.disabled = false;
  };

  #deactivateCtaButton = () => {
    this.#ctaButtonComponent.element.disabled = true;
  };

  /**
  * Обработчик любого пользовательского действия для вызова обновления модели.
  * @param {*} actionType Действие пользователя: нужно чтобы понять, какой метод модели вызвать
  * @param {*} updateType Тип изменений: что нужно обновить
  * @param {*} point Обновленные данные точки
  */

  #handleViewAction = async (actionType, updateType, point) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(point.id).setSaving();
        try {
          await this.#pointModel.updatePoint(updateType, point);
        } catch(err) {
          this.#pointPresenters.get(point.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointModel.addPoint(updateType, point);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(point.id).setDeleting();
        try {
          await this.#pointModel.deletePoint(updateType, point);
        } catch(err) {
          this.#pointPresenters.get(point.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
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
    this.#currentSortType = {name: sortType, disabled: false};
    this.#clearPoints();
    this.#renderPoints();
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
    this.#newPointPresenter.destroy();
  };

  #handleNewPointFormClose = () => {
    this.#setInterfaceState();
    this.#activateCtaButton();
  };

  #handleCtaButtonClick = () => {
    this.#createNewPoint();
    this.#deactivateCtaButton();
  };
}
