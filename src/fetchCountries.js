const fetchCountries = (name) => {
  return fetch(`url`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch((error) => console.error(error));
};

export default fetchCountries;
