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

  async updatePoint(updateType, point) {
    try {
      const updatedPoint = await this.#pointsApiService.updatePoint(point);
      this.#points = updateItem(this.#points, updatedPoint);
      this._notify(updateType, updatedPoint.id);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, point) {
    try {
      const newPoint = await this.#pointsApiService.addPoint(point);
      this.#points.push(newPoint);
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType, point) {
    await this.#pointsApiService.deletePoint(point);
    this.#points = this.#points.filter((item) => item.id !== point.id);
    this._notify(updateType, point);
  }
}
