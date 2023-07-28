import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_9qP2apwR5n5O09JVmRCC3a15jqrY8i2ujCdeXwiVK0lp0aSry1k3B4vVmqH654ba';

const url = 'https://api.thecatapi.com/v1/breeds';

export function fetchBreeds() {
  return axios(url).then(response => {
    return response.data;
  });
}

export function fetchCatByBreed(breedId) {
  return axios(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  ).then(response => {
    return response;
  });
}
