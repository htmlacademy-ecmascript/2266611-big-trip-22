import Observable from '../framework/observable.js';

import {updateItem} from '../utils/utils.js';
import {UpdateType} from '../utils/const.js';

export default class PointModel extends Observable {
  #pointsApiService = null;

  #points = [];
  #offers = [];
  #destinations = [];

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  async init() {
    try {
      this.#points = await this.#pointsApiService.getPoints();
      this.#offers = await this.#pointsApiService.getOffers();
      this.#destinations = await this.#pointsApiService.getDestinations();
    } catch {
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];
    }

    this._notify(UpdateType.INIT);
  }

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  updatePoint(updateType, updatedPoint) {
    this.#points = updateItem(this.#points, updatedPoint);
    this._notify(updateType, updatedPoint.id);
  }

  addPoint(updateType, updatedPoint) {
    this.#points.push(updatedPoint);
    this._notify(updateType);
  }

  deletePoint(updateType, updatedPoint) {
    this.#points = this.#points.filter((item) => item.id !== updatedPoint.id);
    this._notify(updateType, updatedPoint);
  }
}
