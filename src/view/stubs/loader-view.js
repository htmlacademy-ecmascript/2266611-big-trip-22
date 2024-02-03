import AbstractView from '../../framework/view/abstract-view.js';

const createLoaderTemplate = () => (/*html*/
  `<div class='loader-container'>
    <div class="loader">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>`
);

export default class LoaderView extends AbstractView {
  get template() {
    return createLoaderTemplate();
  }
}
