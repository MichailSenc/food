'use strict';

// TABS 

window.addEventListener('DOMContentLoaded', () => {
    const tabsParent = document.querySelector('.tabheader__items'),
        tabs = tabsParent.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', event => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((tab, i) => {
                if (tab == target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // TIMER

    const deadline = '2021-02-19';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - new Date(),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor(t / (1000 * 60) % 60),
            seconds = Math.floor(t / 1000 % 60);

        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');


        const setTimer = setInterval(updateTimer, 1000);
        updateTimer();

        function getZero(time) {
            return ('' + time).length == 1 ? `0${time}` : time;
        }

        function updateTimer() {
            let time = getTimeRemaining(endtime);
            if (time.total <= 0) {
                clearInterval(setTimer);
                time = {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                };
            }
            days.textContent = getZero(time.days);
            hours.textContent = getZero(time.hours);
            minutes.textContent = getZero(time.minutes);
            seconds.textContent = getZero(time.seconds);

        }
    }

    setClock('.timer', deadline);
    
    //MODAL 
    
    const modalTrigger = document.querySelectorAll('[data-modal]'),
    modalWindow = document.querySelector('.modal'),
    dataClose = document.querySelector('[data-close]');
    
    function closeModalWindow() {
        modalWindow.classList.remove('show');
        modalWindow.classList.add('hide');
        document.body.style.overflow = '';
    }

    function openModalWindow() {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearTimeout(timeout);
    }

    modalTrigger.forEach(item => {
        item.addEventListener('click', openModalWindow);
    });

    dataClose.addEventListener('click', closeModalWindow);

    modalWindow.addEventListener('click', (event) => {
        if (event.target === modalWindow) {
            closeModalWindow();
        }
    });


    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modalWindow.classList.contains('show')) {
            // console.log('ESC');
            closeModalWindow();
        }
    });

    const timeout = setTimeout(openModalWindow, 5000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalWindow(); 
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
});