import './sass/main.scss';
import { debounce } from 'lodash';
import countriesListTpl from './templates/countries-list.hbs';
import countryCardTpl from './templates/country-info.hbs';
import fetchCountries from './js/fetchCountries';
import getRefs from './js/get-refs';

const refs = getRefs();

// refs.searchInput.addEventListener('input', onInput);
refs.searchInput.addEventListener('input', debounce(onInput, 500));


function onInput(event) {
  event.preventDefault();

  const userCountry = event.target.value;
  if (userCountry) {
    refs.cardContainer.innerHTML = '';
  }

  fetchCountries(userCountry)
  .then(renderCountryCard)
  .catch(onFetchError)
}

function renderCountryCard(data) {
  if (data.length === 1) {
    return refs.cardContainer.innerHTML = countryCardTpl(...data);
  }
  if (data.length > 1 && data.length < 10) {
    return refs.cardContainer.innerHTML = countriesListTpl(data);
  }
  if (data.length > 10) {
    return console.log('error >10');
  } else {
    console.log('error no match');
  }
}

function onFetchError(error) {
  alert('что-то не так');
}