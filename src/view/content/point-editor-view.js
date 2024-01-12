import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';

import {POINT_TYPES} from '../../utils/const.js';
import {DateFormat, convertDate} from '../../utils/date.js';
import {upFirstLetter} from '../../utils/utils.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_blue.css';

const createPointTypeGroupTemplate = (pointId, type) => (/*html*/`
  ${POINT_TYPES.map((pointType) => (
    `<div class="event__type-item">
        <input id="event-type-${pointType}-${pointId}" class="event__type-input  visually-hidden" type="radio"
        name="event-type" value="${pointType}" ${pointType === type ? 'checked' : ''}>
        <label class="event__type-label event__type-label--${pointType}" for="event-type-${pointType}-${pointId}">${upFirstLetter(pointType)}</label>
    </div>`)).join('')}`
);

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
                data-offer-id="${defaultOffer.id}"
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

const createDetailsTemplate = (pointId, defaultOffers, selectedOffers, description, pictures) => {
  if (defaultOffers.length === 0 && !description) {
    return '';
  }

  return `<section class="event__details">
            ${createAvailableOffersTemplate(pointId, defaultOffers, selectedOffers)}
            ${createDestinationDescriptionTemplate(description, pictures)}
          </section>`;
};

const createPointEditorTemplate = (point, offers, destinations) => {
  const defaultOffers = offers.find((offer) => offer.type === point.type).offers;
  const selectedOffers = defaultOffers.filter((defaultOffer) => point.offers.includes(defaultOffer.id));
  const pointDestination = destinations.find((item) => item.id === point.destination);

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

                <!-- Дополнительные опции и описание пункта назначения -->
                ${createDetailsTemplate(pointId, defaultOffers, selectedOffers, description, pictures)}

              </form>
            </li>`;
};

export default class PointEditorView extends AbstractStatefulView {
  #dateFromPicker = null;
  #dateToPicker = null;

  #offers = [];
  #destinations = [];

  #handleFormSubmit = null;
  #handleEditClick = null;

  constructor({point, offers, destinations, onEditClick, onFormSubmit}) {
    super();
    this._setState(PointEditorView.parsePointToState(point));
    this.#offers = offers;
    this.#destinations = destinations;

    this.#handleEditClick = onEditClick;
    this.#handleFormSubmit = onFormSubmit;

    this._restoreHandlers();
  }

  get template() {
    return createPointEditorTemplate(this._state, this.#offers, this.#destinations);
  }

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    return {...state};
  }

  reset(point) {
    this.updateElement(PointEditorView.parsePointToState(point));
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#changeTypeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDestinationHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#changeSelectedOffersHandler);
    this.element.querySelector('.event__field-group--price').addEventListener('input', this.#changePriceHandler);

    this.#setDatePicker();
  }

  removeElement() {
    super.removeElement();

    if (this.#dateFromPicker) {
      this.#dateFromPicker.destroy();
      this.#dateFromPicker = null;
    }

    if (this.#dateToPicker) {
      this.#dateToPicker.destroy();
      this.#dateToPicker = null;
    }
  }

  #setDatePicker = () => {
    const startTime = this.element.querySelector(`#event-start-time-${this._state.id}`);
    const endTime = this.element.querySelector(`#event-end-time-${this._state.id}`);

    const commonConfigOptions = {
      enableTime: true,
      'time_24hr': true,
      dateFormat: DateFormat.DATE_PICKED
    };

    this.#dateFromPicker = flatpickr(
      startTime,
      {
        ...commonConfigOptions,
        maxDate: this._state.dateTo,
        onChange: this.#changeDateHandler('dateFrom'),
        onClose: (_, userDate) => this.#dateToPicker.set('minDate', userDate)
      }
    );

    this.#dateToPicker = flatpickr(
      endTime,
      {
        ...commonConfigOptions,
        minDate: this._state.dateFrom,
        onChange: this.#changeDateHandler('dateTo'),
        onClose: (_, userDate) => this.#dateFromPicker.set('maxDate', userDate)
      }
    );
  };

  #changeDateHandler = (propertyName) => ([userDate]) => {
    this._setState({
      [propertyName]: userDate
    });
  };

  #changeTypeHandler = (evt) => {
    this.updateElement({
      type: evt.target.value
    });
  };

  #changeDestinationHandler = (evt) => {
    this.updateElement({
      destination: this.#destinations.find((destination) => destination.name === evt.target.value).id
    });
  };

  #changeSelectedOffersHandler = () => {
    const selectedOffers = this.element.querySelectorAll('.event__offer-checkbox:checked');

    this._setState({
      offers: Array.from(selectedOffers).map((item) => item.dataset.offerId)
    });
  };

  #changePriceHandler = (evt) => {
    this._setState({
      basePrice: parseInt(evt.target.value, 10)
    });
  };

  #editClickHandler = () => this.#handleEditClick();

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditorView.parseStateToPoint(this._state));
  };
}