import Api from '../scripts/components/Api';
import findModel2 from '../scripts/components/finder';
import {
  statistics,
  input,
  form,
  replacement,
  detailsText,
  resetButton,
  title,
  noteInfo,
  link,
} from '../scripts/utils/constants';
import { resetStatus, transformData } from '../scripts/utils/utils';
import './index.css';

//! Новые данные
const base_url = 'https://spreadsheets.google.com/feeds/list/148wA9wWJro2mwng84-YKu4LvSgWLnoapIedAZmsk8Uw/od6/public/values?alt=json';
const api2 = new Api(base_url);
const initialModels2 = api2.getModels();
const pureModels = [];
let newModels = Promise.all([initialModels2])
  .then((arr) => {
    newModels = arr[0].feed.entry;
    newModels.forEach((element) => {
      pureModels.push(transformData(element));
    });
    console.log(pureModels);
    resetStatus();
    (title.textContent = 'Введите модель оборудования'),
    input.classList.add('active');
    resetButton.classList.add('active');
    noteInfo.classList.add('active');
    statistics.classList.add('active');
    statistics.textContent = `Общее количество моделей в базе поиска: ${pureModels.length} шт.`;
  })
  .catch((err) => {
    console.error(err);
    resetStatus();
    input.remove();
    title.textContent = 'Что-то пошло не так';
    form.classList.add('form__input_error');
    link.textContent = 'Поиск не работает';
    link.href = '#';
    link.classList.add('active');
    link.classList.add('form__info_danger');
    statistics.textContent = '';
  })
  .finally(() => {});
//! Новые данные

// const api = new Api("./database/models.json");

// const initialModels = api.getModels();

// let models = Promise.all([initialModels])
//   .then((arr) => {
//     models = arr[0];
//     statistics.textContent = `Общее количество моделей в базе поиска: ${models.length} шт.`;
//     resetStatus();
//     console.log(models);
//   })
//   .catch((err) => console.log(err));

input.addEventListener('input', () => {
  findModel2(pureModels);
});

detailsText.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('form__details-model')) {
    input.value = evt.target.textContent;
    findModel2(pureModels);
  }
});

replacement.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('form__details-model')) {
    input.value = evt.target.textContent;
    findModel2(pureModels);
  }
});

resetButton.addEventListener('click', (evt) => {
  resetStatus();
  input.value = '';
});
