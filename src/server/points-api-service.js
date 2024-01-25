import ApiService from '../framework/api-service.js';
import {Method} from '../utils/const.js';

export default class PointsApiService extends ApiService {
  async getPoints() {
    const response = await this._load({url: 'points'});
    const parsedResponse = await ApiService.parseResponse(response);
    const adaptedPoints = parsedResponse.map(this.#adaptToClient);

    return adaptedPoints;
  }

  async getOffers() {
    return this._load({url: 'offers'}).then(ApiService.parseResponse);
  }

  async getDestinations() {
    return this._load({url: 'destinations'}).then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    const adaptedPoint = this.#adaptToClient(parsedResponse);

    return adaptedPoint;
  }

  async addPoint(point) {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'})
    });

    const parsedResponse = await ApiService.parseResponse(response);
    const adaptedPoint = this.#adaptToClient(parsedResponse);

    return adaptedPoint;
  }

  async deletePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.DELETE
    });

    return response;
  }

  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      isFavorite: point['is_favorite']
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }

  #adaptToServer(point) {
    const adaptedPoint = {
      ...point,
      'base_price': point.basePrice,
      'date_from': point.dateFrom,
      'date_to': point.dateTo,
      'is_favorite': point.isFavorite
    };

    if (point.id === 0) {
      delete adaptedPoint.id;
    }

    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}
