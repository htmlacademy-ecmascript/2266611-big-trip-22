import {END_POINT, AUTHORIZATION} from './utils/const.js';
import PointsApiService from './server/points-api-service.js';

import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';

import HeadlinePresenter from './presenter/headline-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import MainPresenter from './presenter/main-presenter.js';

const toolbarContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const contentContainer = document.querySelector('.trip-events');

const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);

const pointModel = new PointModel({pointsApiService});
const filterModel = new FilterModel();

pointModel.init();

const headlinePresenter = new HeadlinePresenter({pointModel, toolbarContainer});
const filterPresenter = new FilterPresenter({pointModel, filterModel, filterContainer});
const mainPresenter = new MainPresenter({pointModel, filterModel, toolbarContainer, contentContainer});

headlinePresenter.init();
filterPresenter.init();
mainPresenter.init();
