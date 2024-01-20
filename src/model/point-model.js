import Observable from '../framework/observable.js';

import {points} from '../mocks/points.js';
import {destinations} from '../mocks/destinations.js';
import {offers} from '../mocks/offers.js';

import {updateItem} from '../utils/utils.js';

export default class PointModel extends Observable {
  #points = null;
  #destinations = null;
  #offers = null;

  constructor() {
    super();
    this.#points = [];
    this.#destinations = [];
    this.#offers = [];
  }

  init() {
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
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

  updatePoint(updateType, updatePoint) {
    this.#points = updateItem(this.#points, updatePoint);

    this._notify(updateType, updatePoint.id);
  }

  addPoint(updateType, updatePoint) {
    this.#points.push(updatePoint);

    this._notify(updateType);
  }

  deletePoint(updateType, updatePoint) {
    this.#points = this.#points.filter((item) => item.id !== updatePoint.id);

    this._notify(updateType, updatePoint);
  }
}
