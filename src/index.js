import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notify from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(findCountry, DEBOUNCE_DELAY));

function findCountry() {
  const name = refs.input.value.trim();
  // console.log(name)

  fetchCountries(name).then(
    country => (refs.info.innerHTML = countryMarkup(country))
  );
}
function countryMarkup(country) {
  return country
    .map(
      ({
        flags,
        name: countryName,
        languages,
        capital,
        population,
      }) => `<div style="
        display: flex;
        align-items: center;
        gap: 15px;"><img src="${flags.svg}" alt="${countryName.official}" width='64' height = '40'><h2>${countryName.official}</h2></div>
      <p>Capital: <span>${capital}</span> </p>
      <p>Population: <span>${population}</span></p>
      <p>Languages: <span>${languages.ukr}</span></p>`
    )
    .join();
}
