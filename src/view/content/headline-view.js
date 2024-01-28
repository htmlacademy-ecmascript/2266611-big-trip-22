import AbstractView from '../../framework/view/abstract-view.js';

const getTitle = () => {};

const getDates = () => {};

const calculateTotalCost = () => {};

function createHeadlineTemplate(points, offers, destinations) {
  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${getTitle(points, destinations)}</h1>
              <p class="trip-info__dates">${getDates(points)}</p>
            </div>
            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${calculateTotalCost(points, offers)}</span>
            </p>
          </section>`;
}

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
