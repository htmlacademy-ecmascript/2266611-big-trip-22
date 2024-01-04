import PointModel from './model/point-model.js';
import HeaderPresenter from './presenter/header-presenter.js';
import ContentPresenter from './presenter/content-presenter.js';

const pointModel = new PointModel();

pointModel.init();

const headerPresenter = new HeaderPresenter({pointModel});
const mainPresenter = new ContentPresenter({pointModel});

headerPresenter.init();
mainPresenter.init();
