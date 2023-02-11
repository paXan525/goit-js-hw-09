import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit (event) {
    event.preventDefault();

  const formElements = event.currentTarget.elements;

  const delayFirst = Number(formElements.delay.value);
  const delayStep = Number(formElements.step.value);
  const numberOfCreatedPromise = Number(formElements.amount.value);

  for (let position = 1; position <= numberOfCreatedPromise; position += 1 ) {
    let delay = delayFirst + delayStep*(position - 1);
  
  createPromise(position, delay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  })
};
  form.reset();
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};


