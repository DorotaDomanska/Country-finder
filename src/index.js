import "./css/styles.css";
import Notiflix from "notiflix";
import debounce from "lodash.debounce";

const DEBOUNCE_DELAY = 300;
const input = document.querySelector("input#search-box");
const countryList = document.querySelector("ul.country-list");
const countryInfo = document.querySelector("div.country-info");

const fetchCountries = (name) => {
  const trimedName = name.trim();

  return fetch(
    `https://restcountries.com/v2/name/${trimedName}?fields=name,capital,population,flags,languages`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((countries) => {
      if (countries.length > 10)
        return Notiflix.Notify.info(
          `Too many matches found. Please enter a more specific name.`
        );
      if (countries.length === 1) return createCountryCard(countries[0]);
      return createCountryList(countries);
    })
    .catch((error) => console.error(error));
};

const createCountryCard = ({ name, capital, population, flags, languages }) => {
  const allLanguages = languages.map((language) => language.name).join(", ");
  const country = document.createElement("p");
  country.innerHTML = `
  <h3>
    <img src="${flags.svg}" alt="${name} flag" width="50px" />
    ${name}
  </h3>
  <p>Capital: ${capital}</p>
  <p>Population: ${population}</p>
  <p>Languages: ${allLanguages}</p>`;
  countryInfo.append(country);
};

const createCountryList = (countries) => {
  const allCountries = countries.map(({ flags, name }) => {
    const item = document.createElement("li");
    item.innerHTML = `
    <img src="${flags.svg}" alt="${name} flag" width="50px" /> ${name}`;

    return item;
  });

  countryList.append(...allCountries);
};

input.addEventListener(
  "input",
  debounce((event) => fetchCountries(event.target.value), DEBOUNCE_DELAY)
);
