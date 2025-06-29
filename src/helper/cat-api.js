const API_KEY = "live_SU4QHYgUYTBbiOFg5QyDurIUW9f37I7sy836qGATvXSWir1RtEdcO9YTnspO0K4x";
const BASE_URL = "https://api.thecatapi.com/v1";

function fetchBreeds() {
    return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText);
            }
            return resp.json();
        });
};

function fetchCatByBreed(breedId) {
    return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}&api_key=${API_KEY}`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText);
            }
            return resp.json();
        });
};

fetchCatByBreed()
    .then(data => console.log(data))
    .catch(err => console.log(err));

fetchBreeds()
    .then(data => console.log(data))
    .catch(err => console.log(err));

export { fetchBreeds, fetchCatByBreed };