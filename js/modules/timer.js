function timer() {
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
}

module.exports = timer;