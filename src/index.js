import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed, fetchImg } from "./helper/cat-api";
import { TheCatAPI } from "@thatapicompany/thecatapi";
import axios from "axios";

const API_KEY = "live_SU4QHYgUYTBbiOFg5QyDurIUW9f37I7sy836qGATvXSWir1RtEdcO9YTnspO0K4x";
const BASE_URL = "https://api.thecatapi.com/v1";

axios.defaults.headers.common["x-api-key"] = API_KEY;

const loader = document.querySelector(".loader");
const selector = document.querySelector(".breed-select");
const errMessage = document.querySelector(".error");
const catInfo = document.querySelector("div");

function showLoader() {
    loader.classList.remove("invisible");
}

function hideLoader() {
    loader.classList.add("invisible");
}

//error Message
function hideErrMessage() {
    errMessage.classList.add("invisible");
}

function showErrMessage() {
    errMessage.classList.remove("invisible");
}

//cat info-box
function hideCatInfo() {
    catInfo.classList.add("invisible");
}

function viewCatInfo() {
    catInfo.classList.remove("invisible");
}

//selector visibility
function hideSelector() {
    selector.classList.add("invisible");
}

function showSelector() {
    selector.classList.remove("invisible");
}

hideSelector();
showLoader();

fetchBreeds()
    .then(breeds => {
        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.textContent = breed.name;

            selector.appendChild(option);
        });
    })
    .catch(err => console.error(err))
    .finally(() => {
        showSelector()
        hideLoader()
    });

function createMarkup(breedOpt) {
    return breedOpt
        .map(({ url, breeds: [{ name, description, temperament }] }) =>
            `<img src="${url}" alt="" height="250px"/>
        <div>
            <h2 class="cat-breed">${name}</h2>
            <p class="cat-desc">${description}</p>
            <p><b>Temperament: </b>${temperament}</p>
        </div>`)
        .join('')
}

let selectedBreedId;

hideCatInfo();

selector.addEventListener('change', () => {
    showLoader();
    selectedBreedId = selector.value;

    fetchCatByBreed(selectedBreedId)
        .then(data => {
            catInfo.innerHTML = createMarkup(data);
        })
        .catch((error => {
            hideCatInfo();
            showErrMessage();
            console.error("You've got an error" + error);
        }))
        .finally(() => {
            hideErrMessage();
            hideLoader();
            showSelector();
            viewCatInfo();
        });
    
    hideCatInfo();
    hideSelector();
});

selector.addEventListener('load', () => {
    try {
        hideSelector();
        showLoader();
        loader.classList.toggle("invisible");
    } catch {
        hideSelector();
        showLoader();
        Notiflix.Notify.failure('Sorry! ' + errMessage.textContent);
        errMessage.classList.toggle("invisible");
        console.error;
    }
});

export { hideSelector, showSelector };