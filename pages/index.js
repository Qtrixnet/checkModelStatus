import Api from "../scripts/components/Api.js";
// import Finder from "../scripts/components/Finder2.js";
import findModel from "../scripts/components/finder.js";
import {
    statistics,
    // result,
    input,
    form,
    // product,
    // category,
    replacement,
    resetStatus,
    // link,
    // details,
    detailsText,
} from "../scripts/utils/utils.js";

const api = new Api("./database/models.json");

const initialModels = api.getModels();

let models = Promise.all([initialModels])
    .then((arr) => {
        models = arr[0];
        statistics.textContent = `Общее количество моделей в базе поиска: ${models.length} шт.`;
        resetStatus();
    })
    .catch((err) => console.log(err));


form.addEventListener("input", () => {
    findModel(models);
});

form.addEventListener("submit", (evt) => {
    evt.preventDefault();
});

detailsText.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("form__details-model")) {
        input.value = evt.target.textContent;
        findModel(models);
    }
});

replacement.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("form__details-model")) {
        input.value = evt.target.textContent;
        findModel(models);
    }
});
