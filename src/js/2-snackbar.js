import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const notificationForm = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const fulfilledRadio = document.querySelector('input[value="fulfilled"]');

const toastSettings = {
  position: 'topRight',
  messageColor: '#ffffff',
  timeout: 5000,
  close: false,
};

const PROMISE_MESSAGES = {
  fulfilled: '✅ Fulfilled promise',
  rejected: '❌ Rejected promise',
};

const delayNotification = (delay, promiseType) =>
  new Promise((resolve, reject) =>
    setTimeout(() => promiseType === 'fulfilled' ? resolve(delay) : reject(delay), delay)
  );

const handleNotification = (delay, promiseType) =>
  delayNotification(delay, promiseType)
    .then(delay => {
      iziToast.show({
        ...toastSettings,
        message: `${PROMISE_MESSAGES[promiseType]} in ${delay}ms`,
        backgroundColor: promiseType === 'fulfilled' ? 'green' : '#FF7777',
      });
    })
    .catch(delay => {
      iziToast.show({
        ...toastSettings,
        message: `${PROMISE_MESSAGES[promiseType]} in ${delay}ms`,
        backgroundColor: '#FF7777',
      });
    });

const handleFormSubmit = event => {
  event.preventDefault();

  const promiseType = fulfilledRadio.checked ? 'fulfilled' : 'rejected';
  handleNotification(Number(delayInput.value), promiseType);

  event.target.reset();
};

notificationForm.addEventListener('submit', handleFormSubmit);