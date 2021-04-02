import Api from '../scripts/components/Api';
import {
  statistics,
  input,
  form,
  replacement,
  category,
  detailsText,
  resetButton,
  title,
  noteInfo,
  link,
  product
} from '../scripts/utils/constants';
import { resetStatus, transformData, disableButton} from '../scripts/utils/utils';
import { search } from '../scripts/components/search'
import './index.css';

const base_url = 'https://spreadsheets.google.com/feeds/list/148wA9wWJro2mwng84-YKu4LvSgWLnoapIedAZmsk8Uw/od6/public/values?alt=json';
const api = new Api(base_url);
const initialModels = api.getModels();
const pureModels = [];
let newModels = Promise.all([initialModels])
  .then((arr) => {
    newModels = arr[0].feed.entry;
    newModels.forEach((element) => {
      pureModels.push(transformData(element));
    });
    console.log(pureModels);
    resetStatus();
    disableButton();
    title.textContent = 'Введите модель оборудования';
    resetButton.classList.add('active');
    input.classList.add('active');
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


input.addEventListener('input', () => {
  search(pureModels, input.value)
});

product.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('form__details-model')) {
    input.value = evt.target.textContent;
    search(pureModels, input.value)
  }
});

replacement.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('form__details-model')) {
    input.value = evt.target.textContent;
    search(pureModels, input.value)
  }
});

category.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('form__details-model')) {
    input.value = evt.target.textContent;
    search(pureModels, input.value)
  }
});

resetButton.addEventListener('click', (evt) => {
  resetStatus();
  input.value = '';
  disableButton();
});
