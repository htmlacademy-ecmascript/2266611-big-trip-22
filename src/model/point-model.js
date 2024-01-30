import {updateItem} from '../utils/utils.js';
import {UpdateType} from '../utils/const.js';
import {sortByDate} from '../utils/date.js';

import Observable from '../framework/observable.js';

export default class PointModel extends Observable {
  #pointsApiService = null;

  #points = [];
  #offers = [];
  #destinations = [];

  #isLoading = true;
  #isLoadingFailed = false;

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  async init() {
    try {
      this.#points = await this.#pointsApiService.getPoints();
      this.#offers = await this.#pointsApiService.getOffers();
      this.#destinations = await this.#pointsApiService.getDestinations();

      this.#isLoading = false;
    } catch {
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];

      this.#isLoading = false;
      this.#isLoadingFailed = true;
    }

    this._notify(UpdateType.INIT);
  }

  get points() {
    return this.#points.sort(sortByDate('dateFrom'));
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  get loading() {
    return this.#isLoading;
  }

  get error() {
    return this.#isLoadingFailed;
  }

  async updatePoint(updateType, point) {
    const updatedPoint = await this.#pointsApiService.updatePoint(point);
    this.#points = updateItem(this.#points, updatedPoint);
    this._notify(updateType, updatedPoint);
  }

  async addPoint(updateType, point) {
    const newPoint = await this.#pointsApiService.addPoint(point);
    this.#points.push(newPoint);
    this._notify(updateType);
  }

  async deletePoint(updateType, point) {
    await this.#pointsApiService.deletePoint(point);
    this.#points = this.#points.filter((item) => item.id !== point.id);
    this._notify(updateType, point);
  }
}
