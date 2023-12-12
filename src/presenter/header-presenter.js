import {RenderPosition, render} from '../render.js';
import RouteView from '../view/content/route-view.js';
import FilterView from '../view/toolbar/filter-view.js';
import ButtonView from '../view/toolbar/button-view.js';

export default class HeaderPresenter {
  filterComponent = new FilterView();
  routeComponent = new RouteView();
  buttonComponent = new ButtonView();

  constructor({toolbarContainer, filterContainer}) {
    this.toolbarContainer = toolbarContainer;
    this.filterContainer = filterContainer;
  }

  init() {
    render(this.routeComponent, this.toolbarContainer, RenderPosition.AFTERBEGIN);
    render(this.filterComponent, this.filterContainer);
    render(this.buttonComponent, this.toolbarContainer);
  }
}
