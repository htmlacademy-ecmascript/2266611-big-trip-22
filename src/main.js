import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';

import HeadlinePresenter from './presenter/headline-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import MainPresenter from './presenter/main-presenter.js';

import PointsApiService from './server/points-api-service.js';
import {END_POINT, Authorization} from './utils/const.js';

const pointsApiService = new PointsApiService(END_POINT, Authorization);

const pointModel = new PointModel({pointsApiService});
const filterModel = new FilterModel();

pointModel.init();

const headlinePresenter = new HeadlinePresenter({pointModel});
const filterPresenter = new FilterPresenter({pointModel, filterModel});
const mainPresenter = new MainPresenter({pointModel, filterModel});

headlinePresenter.init();
filterPresenter.init();
mainPresenter.init();
