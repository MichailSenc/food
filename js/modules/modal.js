function closeModalWindow(modalWindowSelector) {
    const modalWindow = document.querySelector(modalWindowSelector);
    modalWindow.classList.remove('show');
    modalWindow.classList.add('hide');
    document.body.style.overflow = '';
}

function openModalWindow(modalWindowSelector, timeout) {
    const modalWindow = document.querySelector(modalWindowSelector);
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if (timeout) {
        clearTimeout(timeout);
    }
}

function modal(modalTriggerSelector, modalWindowSelector, timeout) {
    //MODAL 

    const modalTrigger = document.querySelectorAll(modalTriggerSelector),
        modalWindow = document.querySelector(modalWindowSelector);


    modalTrigger.forEach(item => {
        item.addEventListener('click', () => openModalWindow(modalWindowSelector, timeout));
    });

    modalWindow.addEventListener('click', (event) => {
        if (event.target === modalWindow || event.target.getAttribute('data-close') == '') {
            closeModalWindow(modalWindowSelector);
        }
    });


    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modalWindow.classList.contains('show')) {
            closeModalWindow(modalWindowSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalWindow(modalWindowSelector, timeout);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {openModalWindow};
export {closeModalWindow};