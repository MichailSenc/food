function slider({
    sliderSelector,
    currentSelector,
    totalSelector,
    stilesWrapperSelector,
    stilesFieldSelector,
    sliderItemsSelector,
    prevSelector,
    nextSelector
}) {
    //Slider

    const slider = document.querySelector(sliderSelector),
        current = slider.querySelector(currentSelector),
        total = slider.querySelector(totalSelector),
        stilesWrapper = slider.querySelector(stilesWrapperSelector),
        stilesField = slider.querySelector(stilesFieldSelector),
        width = window.getComputedStyle(stilesWrapper).width,
        sliderItems = slider.querySelectorAll(sliderItemsSelector);

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

    slider.querySelector(nextSelector).addEventListener('click', () => {
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

    slider.querySelector(prevSelector).addEventListener('click', () => {
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
}

export default slider;