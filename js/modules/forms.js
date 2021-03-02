import { openModalWindow, closeModalWindow } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalWindowSelector, timeout) {
    //Forms 

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Успех',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(form => bindPostData(form));

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
        openModalWindow(modalWindowSelector, timeout);

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
            closeModalWindow(modalWindowSelector);
        }, 4000);
    }

}

export default forms;