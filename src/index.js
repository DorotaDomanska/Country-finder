import "./css/styles.css";
import Notiflix from "notiflix";
import debounce from "lodash.debounce";

const DEBOUNCE_DELAY = 300;
const input = document.querySelector("input#search-box");

const fetchCountries = (name) => {
  console.log(name);
  return fetch(
    `https://restcountries.com/v3/name/${name}?fields=name,capital,population,flags,languages`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return console.log(response.json());
  });
};

// const countriesList = () => {

// }

input.addEventListener(
  "input",
  debounce((event) => fetchCountries(event.target.value), 300)
);
