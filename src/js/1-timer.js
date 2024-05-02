import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

const secondsRender = document.querySelector('span[data-seconds]');
const minutesRender = document.querySelector('span[data-minutes]');
const hoursRender = document.querySelector('span[data-hours]');
const daysRender = document.querySelector('span[data-days]');


let time = 0;
let timerId = null;
let totalTime = null;


const btnStart = document.querySelector('button[data-start]');
btnStart.disabled = true;

const inputDateTime = document.querySelector('input#datetime-picker');


let deadline = 0;

const toast = Toastify({
    text: "Please choose a date in the future",
    duration: 1500,
    destination: "1-timer.html",
    // newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
    background: "linear-gradient(to right, #FE2E2E, #AF002A)",
    },
    onClick: function(){} // Callback after click
    })


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {

            if (selectedDates[0] <= new Date()) {
                // alert("Please choose a date in the future")
                toast.showToast();
                return;
            } else {
                btnStart.disabled = false;
                deadline = selectedDates[0];
            }
    },
  };

flatpickr('input#datetime-picker', options);


const timerStart = () => {


    timerId = setInterval(() => {
        time = deadline.getTime() - new Date().getTime();
        totalTime = convertMs(time); 
        // console.log(totalTime);
        btnStart.disabled = true;
        inputDateTime.disabled = true;
        // flatpickr('input#datetime-picker', {disabled: true});
    

        secondsRender.textContent = totalTime.seconds;
        minutesRender.textContent = totalTime.minutes;
        hoursRender.textContent = totalTime.hours;
        daysRender.textContent = totalTime.days;


    if (time <= 0) {
        clearInterval(timerId);
                secondsRender.textContent = '00';
                minutesRender.textContent = '00';
                hoursRender.textContent = '00';
                daysRender.textContent = '00';
                
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
