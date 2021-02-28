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
        modalWindow = document.querySelector('.modal');

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

    modalWindow.addEventListener('click', (event) => {
        if (event.target === modalWindow || event.target.getAttribute('data-close') == '') {
            closeModalWindow();
        }
    });


    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modalWindow.classList.contains('show')) {
            // console.log('ESC');
            closeModalWindow();
        }
    });

    const timeout = setTimeout(openModalWindow, 50000000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalWindow();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // Classes for cards

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
            this.parent = document.querySelector(parentSelector);
        }

        changeToUAH() {
            this.price *= this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.classes.push('menu__item');
            }
            this.classes.forEach(classItem => element.classList.add(classItem));
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    // const getResource = async (url) => {
    //     const result = await axios.get('http://localhost:3000/menu');

    //     // if (!result.ok) {
    //     //     throw new Error(`Could not fetch ${url} status: ${result.status}`);
    //     // }

    //     return await result.data;
    // };

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    //Forms 

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Успех',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(form => bindPostData(form));

    const postData = async (url, data) => {
        const result = await fetch(url, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: data
        });

        return await result.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form); //Записывает все данные из формы 'form' в пару ключ-знчение

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.success);
                }).finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const modalDialog = document.querySelector('.modal__dialog');
        modalDialog.classList.add('hide');
        openModalWindow();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class='modal__content'>
                <div class='modal__close' data-close>×</div>
                <div class='modal__title'>${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            modalDialog.classList.add('show');
            modalDialog.classList.remove('hide');
            closeModalWindow();
        }, 4000);
    }


    //Slider

    const slider = document.querySelector('.offer__slider'),
        current = slider.querySelector('#current'),
        total = slider.querySelector('#total'),
        stilesWrapper = slider.querySelector('.offer__slider-wrapper'),
        stilesField = slider.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(stilesWrapper).width,
        sliderItems = slider.querySelectorAll('.offer__slide');

    let currentSlideID = 1;
    let offset = 0;

    // console.log(stilesField);
    total.textContent = sliderItems.length > 10 ? `${sliderItems.length}` : `0${sliderItems.length}`;
    current.textContent = currentSlideID > 10 ? `${currentSlideID}` : `0${currentSlideID}`;

    stilesField.style.width = 100 * sliderItems.length + '%';
    stilesField.style.display = 'flex';
    stilesField.style.transition = '0.5s all';

    stilesWrapper.style.overflow = 'hidden';

    sliderItems.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');

    slider.append(indicators);


    for (let i = 0; i < sliderItems.length; i++) {
        const element = sliderItems[i];
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if (i == 0) {
            dot.style.opacity = 1;
        }

        dots.push(dot);
        indicators.append(dot);
    }

    function changeDotOpacity() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[currentSlideID - 1].style.opacity = '1';
    }

    slider.querySelector('.offer__slider-next').addEventListener('click', () => {
        if (offset == parseInt(width) * (sliderItems.length - 1)) {
            offset = 0;
        } else {
            offset += parseInt(width);
        }

        currentSlideID++;
        if (currentSlideID > sliderItems.length) {
            currentSlideID = 1;
        }

        current.textContent = currentSlideID > 10 ? `${currentSlideID}` : `0${currentSlideID}`;
        stilesField.style.transform = `translateX(-${offset}px)`;
        
        changeDotOpacity();
    });
    
    slider.querySelector('.offer__slider-prev').addEventListener('click', () => {
        if (offset == 0) {
            offset = parseInt(width) * (sliderItems.length - 1);
        } else {
            offset -= parseInt(width);
        }
        
        currentSlideID--;
        if (currentSlideID < 1) {
            currentSlideID = sliderItems.length;
        }
        
        current.textContent = currentSlideID > 10 ? `${currentSlideID}` : `0${currentSlideID}`;
        stilesField.style.transform = `translateX(-${offset}px)`;
        
        changeDotOpacity();
    });
    
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const dotID = dot.getAttribute('data-slide-to');
            offset += parseInt(width) * (dotID - currentSlideID);
            currentSlideID = dotID;
            current.textContent = currentSlideID > 10 ? `${currentSlideID}` : `0${currentSlideID}`;
            stilesField.style.transform = `translateX(-${offset}px)`;
            changeDotOpacity();
        });
    });
    
    // function hideSliderItems() {
        //     sliderItems.forEach(item => {
            //         item.classList.add('hide');
    //     });
    // }

    // function showSliderItems(i = 0) {
    //     sliderItems[i].classList.remove('hide');
    //     current.textContent = i + 1 > 10 ? `${i + 1}` : `0${i + 1}`;
    // }

    // hideSliderItems();
    // showSliderItems();


});