import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';

import FilterPresenter from './presenter/filter-presenter.js';
import MainPresenter from './presenter/main-presenter.js';

import PointsApiService from './server/points-api-service.js';
import {generateTokenId} from './utils/token.js';
import {END_POINT} from './utils/const.js';

const AUTHORIZATION = generateTokenId();
const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);

const pointModel = new PointModel({pointsApiService});
const filterModel = new FilterModel();

pointModel.init();

const filterPresenter = new FilterPresenter({pointModel, filterModel});
const mainPresenter = new MainPresenter({pointModel, filterModel});

filterPresenter.init();
mainPresenter.init();
