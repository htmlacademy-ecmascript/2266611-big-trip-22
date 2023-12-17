import {createElement} from '../../render.js';
import {POINT_TYPES} from '../../utils/const.js';
import {DateFormat, convertDate} from '../../utils/date.js';

const createPointTypeGroupTemplate = (pointId, type) => {
  const upFirstLetter = (word) => `${word[0].toUpperCase()}${word.slice(1)}`;

  return `${POINT_TYPES.map((pointType) => (
    `<div class="event__type-item">
        <input id="event-type-${pointType}-${pointId}" class="event__type-input  visually-hidden" type="radio"
        name="event-type" value="${pointType}" ${pointType === type ? 'checked' : ''}>
        <label class="event__type-label event__type-label--${pointType}" for="event-type-${pointType}-${pointId}">${upFirstLetter(pointType)}</label>
    </div>`)).join('')}`;
};

const createPointDestinationsTemplate = (destinations) => destinations.map((destination) => `<option value="${destination.name}"></option>`).join('');

const createAvailableOffersTemplate = (pointId, defaultOffers, selectedOffers) => {
  const convertOfferTitle = (title) => title.toLowerCase().split(' ').join('-');

  if (defaultOffers.length === 0) {
    return '';
  }

  return `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">

              ${defaultOffers.map((defaultOffer) => (`
              <div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-${convertOfferTitle(defaultOffer.title)}-${pointId}" type="checkbox"
                name="event-offer-${convertOfferTitle(defaultOffer.title)}"
                ${selectedOffers.map((offer) => offer.id).includes(defaultOffer.id) ? 'checked' : ''}>
                <label class="event__offer-label" for="event-offer-${convertOfferTitle(defaultOffer.title)}-${pointId}">
                  <span class="event__offer-title">${defaultOffer.title}</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">${defaultOffer.price}</span>
                </label>
              </div>`)).join('')}
            </div>
          </section>`;
};

const createDestinationDescriptionTemplate = (description, pictures) => {
  if (!description) {
    return '';
  }

  return `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${pictures.map((picture) => (`<img class="event__photo" src="${picture.src}" alt="${picture.description}">`)).join('')}
              </div>
            </div>
          </section>`;
};

const createPointEditorTemplate = (point, destinations, offers) => {
  const pointDestination = destinations.find((item) => item.id === point.destination);
  const defaultOffers = offers.find((offer) => offer.type === point.type).offers;
  const selectedOffers = defaultOffers.filter((defaultOffer) => point.offers.includes(defaultOffer.id));

  const {basePrice, dateFrom, dateTo, type} = point;
  const {description, name, pictures} = pointDestination || {};
  const pointId = point.id || 0;

  const startTime = convertDate(dateFrom, DateFormat.EDIT_DATE);
  const endTime = convertDate(dateTo, DateFormat.EDIT_DATE);

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">

                <header class="event__header">
                <!-- Выбор типа события -->
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-${pointId}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${pointId}" type="checkbox">

                    <!-- Список типов событий -->
                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${createPointTypeGroupTemplate(pointId, type)}
                      </fieldset>
                    </div>
                  </div>

                  <!-- Выбор пункта назначения -->
                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-${pointId}">${type}</label>
                    <input class="event__input  event__input--destination" id="event-destination-${pointId}" type="text" name="event-destination" value="${name || ''}" list="destination-list-${pointId}">

                    <!-- Список пунктов назначения -->
                    <datalist id="destination-list-${pointId}">
                      ${createPointDestinationsTemplate(destinations)}
                    </datalist>
                  </div>

                  <!-- Выбор даты и времени события -->
                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-${pointId}">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-${pointId}" type="text" name="event-start-time" value="${startTime}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-${pointId}">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-${pointId}" type="text" name="event-end-time" value="${endTime}">
                  </div>

                  <!-- Стоимость -->
                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-${pointId}">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-${pointId}" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <!-- Кнопки -->
                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">${point.id ? 'Delete' : 'Cancel'}</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>

                <section class="event__details">
                  <!-- Дополнительные опции -->
                  ${createAvailableOffersTemplate(pointId, defaultOffers, selectedOffers)}

                  <!-- Описание пункта назначения -->
                  ${createDestinationDescriptionTemplate(description, pictures)}

                </section>
              </form>
            </li>`;
};

export default class PointEditorView {
  constructor(point, destinations, offers) {
    this.point = point;
    this.destinations = destinations;
    this.offers = offers;
  }

  getElement() {
    return createElement(createPointEditorTemplate(this.point, this.destinations, this.offers));
  }
}
