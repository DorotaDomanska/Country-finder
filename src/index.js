import "./css/styles.css";
import Notiflix from "notiflix";
import debounce from "lodash.debounce";

const DEBOUNCE_DELAY = 300;
const input = document.querySelector("input#search-box");
const countryList = document.querySelector("ul.country-list");

const fetchCountries = (name) => {
  return fetch(
    `https://restcountries.com/v3/name/${name}?fields=name,capital,population,flags,languages`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return console.log(response.json());
  });
};

const createCountryList = ({ name, capital, population, flags, languages }) => {
  const country = document.createElement("li");
  country.innerHTML = `
  <h3>
    <img src="${flags.svg}" alt="${name.official} flag" width="50px" />
    ${name.official}
  </h3>
   <p>Capital: ${capital}</p>
  <p>Population: ${population}</p>
  <p>Languages: ${languages}</p>`;
  countryList.append(country);
};

input.addEventListener(
  "input",
  debounce((event) => fetchCountries(event.target.value), DEBOUNCE_DELAY)
);
