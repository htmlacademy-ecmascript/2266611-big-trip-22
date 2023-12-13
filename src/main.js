import HeaderPresenter from './presenter/header-presenter.js';
import MainPresenter from './presenter/main-presenter.js';

const toolbarContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const contentContainer = document.querySelector('.trip-events');

const headerPresenter = new HeaderPresenter({toolbarContainer, filterContainer});
const mainPresenter = new MainPresenter({contentContainer});

headerPresenter.init();
mainPresenter.init();
