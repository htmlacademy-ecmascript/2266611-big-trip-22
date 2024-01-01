import {points} from '../mocks/points.js';
import {destinations} from '../mocks/destinations.js';
import {offers} from '../mocks/offers.js';

export default class PointModel {
  #points = null;
  #destinations = null;
  #offers = null;

  constructor() {
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

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }
}
