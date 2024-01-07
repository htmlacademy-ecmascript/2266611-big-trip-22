import AbstractView from '../../framework/view/abstract-view.js';

const createStubTemplate = () => '<p class="trip-events__msg">Click "New Event" to create your first point</p>';

export default class StubView extends AbstractView {
  get template() {
    return createStubTemplate();
  }
}
