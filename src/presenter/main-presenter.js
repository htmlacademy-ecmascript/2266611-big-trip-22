import {render} from '../render.js';
import SortView from '../view/toolbar/sort-view.js';
import ListView from '../view/content/list-view.js';
import PointView from '../view/content/point-view.js';
import PointEditorView from '../view/content/point-editor-view.js';

const POINTS_COUNT = 3;

export default class MainPresenter {
  sortComponent = new SortView();
  listComponent = new ListView();
  pointComponent = new PointView();
  pointEditorComponent = new PointEditorView();

  constructor({contentContainer}) {
    this.contentContainer = contentContainer;
  }

  init() {
    render(this.sortComponent, this.contentContainer);
    render(this.listComponent, this.contentContainer);
    render(this.pointEditorComponent, this.listComponent.getElement());

    for (let i = 0; i < POINTS_COUNT; i++) {
      render(this.pointComponent, this.listComponent.getElement());
    }
  }
}
