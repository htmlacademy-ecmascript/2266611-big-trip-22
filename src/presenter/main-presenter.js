import {render} from '../render.js';
import {getDefaultPoint} from '../utils/const.js';

import SortView from '../view/toolbar/sort-view.js';
import ListView from '../view/content/list-view.js';
import PointView from '../view/content/point-view.js';
import PointEditorView from '../view/content/point-editor-view.js';

const contentContainer = document.querySelector('.trip-events');

export default class MainPresenter {
  sortComponent = new SortView();
  listComponent = new ListView();

  constructor({pointModel}) {
    this.pointModel = pointModel;
  }

  init() {
    const points = this.pointModel.getPoints();
    const destinations = this.pointModel.gerDestinations();
    const offers = this.pointModel.getOffers();

    render(this.sortComponent, contentContainer);
    render(this.listComponent, contentContainer);
    render(new PointEditorView(getDefaultPoint(), destinations, offers), this.listComponent.getElement());
    render(new PointEditorView(points[4], destinations, offers), this.listComponent.getElement());

    for (const point of points) {
      render(new PointView(point, destinations, offers), this.listComponent.getElement());
    }
  }
}
