import AbstractView from '../../framework/view/abstract-view.js';
import {DateFormat, convertDate, calculateDuration, convertDuration} from '../../utils/date.js';

const createSelectedOffersTemplate = (selectedOffers) => {
  if (selectedOffers.length === 0) {
    return '';
  }

  return `<ul class="event__selected-offers">
  ${selectedOffers.map((offer) => (
    `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`)).join('')}
  </ul>`;
};

const createPointTemplate = (point, destinations, offers) => {
  const {basePrice, dateFrom, dateTo, isFavorite, type} = point;

  const defaultOffers = offers.find((offer) => offer.type === point.type).offers;
  const selectedOffers = defaultOffers.filter((defaultOffer) => point.offers.includes(defaultOffer.id));
  const destination = destinations.find((item) => item.id === point.destination);

  const startDate = convertDate(dateFrom, DateFormat.DATE);
  const startTime = convertDate(dateFrom, DateFormat.TIME);
  const endTime = convertDate(dateTo, DateFormat.TIME);
  const duration = convertDuration(calculateDuration(dateFrom, dateTo));
  const favorite = isFavorite ? 'event__favorite-btn--active' : '';

  return `<li class="trip-events__item">
            <div class="event">
              <!-- Дата начала события -->
              <time class="event__date" datetime="${dateFrom}">${startDate}</time>

              <!-- Иконка типа события -->
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
              </div>

              <!-- Тип и место события -->
              <h3 class="event__title">${type} ${destination.name}</h3>

              <!-- Время и продолжительность события -->
              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="${dateFrom}">${startTime}</time>
                  &mdash;
                  <time class="event__end-time" datetime="${dateTo}">${endTime}</time>
                </p>
                <p class="event__duration">${duration}</p>
              </div>

              <!-- Цена события -->
              <p class="event__price">&euro;&nbsp;<span class="event__price-value">${basePrice}</span></p>

              <!-- Дополнительные опции -->
              <h4 class="visually-hidden">Offers:</h4>
              ${createSelectedOffersTemplate(selectedOffers)}

              <!-- Добавление события в избранное -->
              <button class="event__favorite-btn ${favorite}" type="button">
                <span class="visually-hidden">Add to favorite</span>
                <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                  <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                </svg>
              </button>

              <!-- Кнопка открытия/закрытия формы редактирования события -->
              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </div>
          </li>`;
};

export default class PointView extends AbstractView {
  #point = null;
  #destinations = null;
  #offers = null;
  #handleEditClick = null;

  constructor({point, destinations, offers, onEditClick}) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createPointTemplate(this.#point, this.#destinations, this.#offers);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
