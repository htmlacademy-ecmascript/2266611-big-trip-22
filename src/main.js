import PointModel from './model/point-model.js';
import HeaderPresenter from './presenter/header-presenter.js';
import MainPresenter from './presenter/main-presenter.js';

const pointModel = new PointModel();

pointModel.init();

const headerPresenter = new HeaderPresenter();
const mainPresenter = new MainPresenter({pointModel});

headerPresenter.init();
mainPresenter.init();
