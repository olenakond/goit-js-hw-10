import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/SlimSelect.css';

Notiflix.Notify.init({
  position: 'center-top',
  showOnlyTheLastOne: true,
  clickToClose: true,
  timeout: 3000,
  clickToClose: true,
  pauseOnHover: true,
});

const selectEl = document.querySelector('.breed-select');
const cardEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');

loaderEl.classList.remove('is-hidden');

fetchBreeds()
  .then(data => {
    selectEl.insertAdjacentHTML('beforeend', createSelectMarkup(data));
    selectEl.classList.remove('is-hidden');
    loaderEl.classList.add('is-hidden');
    new SlimSelect({
        select: '#selectElement'
      })
  })
  .catch(error => {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
    loaderEl.classList.add('is-hidden');
    console.erorr(error);
  });

function createSelectMarkup(arr) {
  return arr
    .map(
      ({ id, name }) => `
    <option value="${id}">${name}</option>
    `
    )
    .join('');
}

selectEl.addEventListener('change', getCat);

function getCat() {
  loaderEl.classList.remove('is-hidden');
  cardEl.classList.add('is-hidden');

  const breedId = selectEl.value;

  fetchCatByBreed(breedId)
    .then(response => {
      cardEl.innerHTML = createCatMarkup(response.data[0]);
      cardEl.classList.remove('is-hidden');
      loaderEl.classList.add('is-hidden');
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      loaderEl.classList.add('is-hidden');
      console.error(error);
    });
}

function createCatMarkup({
  url,
  breeds: [{ name, description, temperament }],
}) {
  return `
    <img class="cat-img" src='${url}' alt='${name}' width="400px"/>
    <div class="cat-about">
    <h3 class="cat-title">${name}</h3>
    <p class="cat-descr">${description}</p>
    <p class="cat-temp"><span class="cat-temp-title">Temperament: </span>${temperament}</p>
    </div>
    `;
}
