import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';

import FilterPresenter from './presenter/filter-presenter.js';
import MainPresenter from './presenter/main-presenter.js';

const pointModel = new PointModel();
const filterModel = new FilterModel();

pointModel.init();

const filterPresenter = new FilterPresenter({pointModel, filterModel});
const mainPresenter = new MainPresenter({pointModel, filterModel});

filterPresenter.init();
mainPresenter.init();
