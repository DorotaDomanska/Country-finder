import {
  countryInfo,
  countryList,
  createCountryList,
  createCountryCard,
  createCountryWithNoCapital,
} from "./index";
import Notiflix from "notiflix";

const fetchCountries = (name) => {
  if (name === "") {
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
    return;
  }
  const trimedName = name.trim();

  return fetch(
    `https://restcountries.com/v2/name/${trimedName}?fields=name,capital,population,flags,languages`
  )
    .then((response) => {
      if (!response.ok) {
        return Notiflix.Notify.failure(
          `Oops, there is no country with that name`
        );
      }
      return response.json();
    })
    .then((countries) => {
      if (countries.length > 10)
        return Notiflix.Notify.info(
          `Too many matches found. Please enter a more specific name.`
        );
      if (countries.length === 1 && !(`capital` in countries[0]))
        return createCountryWithNoCapital(countries[0]);
      if (countries.length === 1) return createCountryCard(countries[0]);
      return createCountryList(countries);
    })
    .catch((error) => console.error(error));
};

export default fetchCountries;