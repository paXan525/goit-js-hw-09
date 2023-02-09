import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const dataEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

const now = Date.now();
let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0];
        if (selectedDate < now) {
            Notiflix.Report.warning('WARNING', 'Please choose a date in the future', 'Close');
            return
        };
        startBtn.disabled = false;
        startBtn.addEventListener('click', startTimer);
    },};

flatpickr(input, options);

function startTimer() {
    setInterval(countdownTimer, 1000);
};

function countdownTimer() {
    const diff = selectedDate - Date.now();
    const counter = convertMs(diff);
    if (counter.seconds >= 0) {
    dataEl.textContent = addZero(counter.days);
    hoursEl.textContent = addZero(counter.hours);
    minutesEl.textContent = addZero(counter.minutes);
    secondsEl.textContent = addZero(counter.seconds);
    return
    };}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addZero(number) {
    return String(number).padStart(2, 0);
};
