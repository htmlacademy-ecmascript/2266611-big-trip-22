import AbstractView from '../../framework/view/abstract-view.js';

const createCtaButtonTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class CtaButtonView extends AbstractView {
  #handleCtaButtonClick = null;

  constructor({onCtaButtonClick}) {
    super();
    this.#handleCtaButtonClick = onCtaButtonClick;
    this.element.addEventListener('click', this.#ctaButtonClickHandler);
  }

  get template() {
    return createCtaButtonTemplate();
  }

  #ctaButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCtaButtonClick();
  };
}
