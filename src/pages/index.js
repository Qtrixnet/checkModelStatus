import Api from "../scripts/components/Api";
import findModel from "../scripts/components/finder";
import {
  statistics,
  input,
  form,
  replacement,
  detailsText,
  resetButton,
} from "../scripts/utils/constants";
import { resetStatus, transformData } from '../scripts/utils/utils';
import './index.css'

const base_url = "https://spreadsheets.google.com/feeds/list/148wA9wWJro2mwng84-YKu4LvSgWLnoapIedAZmsk8Uw/od6/public/values?alt=json";

const api2 = new Api(base_url);

const initialModels2 = api2.getModels();

let pureModels = []

let newModels = Promise.all([initialModels2])
  .then((arr) => {

    newModels = arr[0].feed.entry;

    newModels.forEach(element => {
      pureModels.push(transformData(element))
    });
    console.log(pureModels)
  })
  .catch((err) => console.log(err));




const api = new Api("./database/models.json");

const initialModels = api.getModels();

let models = Promise.all([initialModels])
  .then((arr) => {
    models = arr[0];
    statistics.textContent = `Общее количество моделей в базе поиска: ${models.length} шт.`;
    resetStatus();
    console.log(models)
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

resetButton.addEventListener("click", (evt) => {
  resetStatus();
  input.value = '';
})
