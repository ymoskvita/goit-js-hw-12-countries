export default function fetchCountry(searchQuery) {
  return fetch(`https://restcountries.com/v2/name/${searchQuery}`,
  ).then(response => response.json());
}

