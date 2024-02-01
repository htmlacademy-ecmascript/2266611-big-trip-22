import {getMinDate, getMaxDate, sortByDate} from '../../utils/date.js';
import {MAX_DISPLAYED_DESTINATIONS} from '../../utils/const.js';

import AbstractView from '../../framework/view/abstract-view.js';

const getTitle = (points, destinations) => {
  const sortedPoints = points.sort(sortByDate('dateFrom'));
  const destinationNames = sortedPoints.map((point) => destinations
    .find((destination) => point.destination === destination.id))
    .map((destination) => destination.name);

  if (destinationNames.length > MAX_DISPLAYED_DESTINATIONS) {
    return `${destinationNames.at(0)} &mdash;...&mdash; ${destinationNames.at(-1)}`;
  }

  return destinationNames.join(' &mdash; ');
};

const getDates = (points) => {
  const startDates = points.map((point) => point.dateFrom);
  const endDates = points.map((point) => point.dateTo);

  return `${getMinDate(startDates)}&nbsp;&mdash;&nbsp;${getMaxDate(endDates)}`;
};

const calculateOffersPrice = (points, offers) => {
  const allOffers = offers.map((offer) => offer.offers).flat();
  const selectedOffersId = points.map((point) => point.offers).flat();
  const selectedOffers = selectedOffersId.map((id) => allOffers.find((offer) => offer.id === id));
  const selectedOffersPrice = selectedOffers.map((offer) => offer.price).reduce((sum, current) => sum + current, 0);

  return selectedOffersPrice;
};

const calculateBasePrice = (points) => points.map((point) => point.basePrice).reduce((sum, current) => sum + current, 0);

const createHeadlineTemplate = (points, offers, destinations) => (/*html*/
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getTitle(points, destinations)}</h1>
      <p class="trip-info__dates">${getDates(points)}</p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">
      ${calculateBasePrice(points) + calculateOffersPrice(points, offers)}
    </span>
    </p>
  </section>`
);

export default class HeadlineView extends AbstractView {
  #points = [];
  #offers = [];
  #destinations = [];

  constructor({points, offers, destinations}) {
    super();

    this.#points = points;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get template() {
    return createHeadlineTemplate(this.#points, this.#offers, this.#destinations);
  }
}
