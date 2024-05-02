import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const secondsRender = document.querySelector('span[data-seconds]');
const minutesRender = document.querySelector('span[data-minutes]');
const hoursRender = document.querySelector('span[data-hours]');
const daysRender = document.querySelector('span[data-days]');

// Initializing Notiflix Notify with custom settings
Notify.init({
  fontSize: "1rem",
  width: "550px",
  cssAnimationStyle: "from-bottom",
  useIcon: false,
  success: {
    background: "#17d0c6",
  },
  info: {
    background: "#336aea",
  },
});

let time = 0;
let timerId = null;
let totalTime = null;


const btnStart = document.querySelector('button[data-start]');
btnStart.disabled = true;

let deadline = 0;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {

        if (selectedDates && selectedDates.length > 0) {
            const selectedDate = selectedDates[0];
            if (selectedDate <= new Date()) {
                // alert("Please choose a date in the future")
                Notiflix.Notify.warning("Please choose a date in the future");
            } else {
                btnStart.disabled = false;
                deadline = selectedDate;
            }
        } else  {
                Notify.failure("Please choose a valid date");
        }
    },
  };

flatpickr('input#datetime-picker', options);


const timerStart = () => {


    timerId = setInterval(() => {
        time = deadline.getTime() - new Date().getTime();
        totalTime = convertMs(time); 
        // console.log(totalTime);

        secondsRender.textContent = totalTime.seconds;
        minutesRender.textContent = totalTime.minutes;
        hoursRender.textContent = totalTime.hours;
        daysRender.textContent = totalTime.days;

    if (time < 0) {
        clearInterval(timerId)
        }
    }, 1000);
}

btnStart.addEventListener('click', timerStart);

function addLeadingZero(value) {
    const newNum =  value.padStart(2, '0');
    return newNum;
 }

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day).toString());
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour).toString());
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute).toString());
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second).toString());
  
    return { days, hours, minutes, seconds };
  }
