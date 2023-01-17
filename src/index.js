import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(findCountry, DEBOUNCE_DELAY));

function findCountry() {
  const name = refs.input.value.trim();
  if (!name) {
    refs.info.innerHTML = '';
    refs.list.innerHTML = '';
  }
  fetchCountries(name)
    .then(countries => {
      if (countries.length > 10) {
        refs.list.innerHTML = '';
        refs.info.innerHTML = '';
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (countries.length === 1) {
        const markup = countries.map(country => countryMarkup(country));
        refs.list.innerHTML = '';
        refs.info.innerHTML = markup.join(``);
      }
      if (countries.length > 1 && countries.length <= 10) {
        const markup = countries.map(country => countryListMarkup(country));
        refs.list.innerHTML = markup.join(``);
        refs.info.innerHTML = '';
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
    });
}
function countryMarkup({
  flags,
  name: countryName,
  languages,
  capital,
  population,
}) {
  return `<div style="
        display: flex;
        align-items: center;
        gap: 15px;"><img src="${flags.svg}" alt="${
    countryName.official
  }" width='64' height = '40'><h2>${countryName.official}</h2></div>
      <p>Capital: <span>${capital}</span> </p>
      <p>Population: <span>${population}</span></p>
      <p>Languages: <span>${Object.values(languages)}</span></p>`;
}
function countryListMarkup({ flags, name: countryName }) {
  return `<li  style="
        display: flex;
        align-items: center;
        gap: 15px;
        list-style: none;">
        <img src="${flags.svg}" alt="${countryName.official}" width='32'>
        <p>${countryName.official}</p>
        </li>`;
}
