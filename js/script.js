'use strict';

require('es6-promise').polyfill();

import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import slider from './modules/slider';
import forms from './modules/forms';
import calc from './modules/calc';
import cards from './modules/cards';
import {
    openModalWindow
} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    const timeout = setTimeout(() => openModalWindow('.modal', timeout), 50000);

    tabs('.tabheader__item', '.tabheader__items', '.tabcontent', 'tabheader__item_active');
    modal('[data-modal]', '.modal', timeout);
    timer('.timer', '2021-03-19');
    slider({
        sliderSelector: '.offer__slider',
        currentSelector: '#current',
        totalSelector: '#total',
        stilesWrapperSelector: '.offer__slider-wrapper',
        stilesFieldSelector: '.offer__slider-inner',
        sliderItemsSelector: '.offer__slide',
        prevSelector: '.offer__slider-prev',
        nextSelector: '.offer__slider-next'
    });

    forms('form', '.modal', timeout);
    calc();
    cards();
});