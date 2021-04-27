import Api from '../scripts/components/Api';
import {
  statistics,
  input,
  form,
  replacement,
  category,
  resetButton,
  title,
  noteInfo,
  link,
  product,
  page,
} from '../scripts/utils/constants';
import {
  resetStatus,
  transformData,
  disableButton,
  handleEscReset,
} from '../scripts/utils/utils';
import search from '../scripts/components/search';
import './index.css';

const baseUrl = 'https://spreadsheets.google.com/feeds/list/148wA9wWJro2mwng84-YKu4LvSgWLnoapIedAZmsk8Uw/od6/public/values?alt=json';
const api = new Api(baseUrl);
const initialModels = api.getModels();
const pureModels = [];
const modelsWithoutReplacement = [];

let newModels = Promise.all([initialModels])
  .then((arr) => {
    newModels = arr[0].feed.entry;
    newModels.forEach((element) => {
      pureModels.push(transformData(element));
    });
    console.log(pureModels);

    pureModels.forEach((model) => {
      if (model.replacement !== '') {
        if (!(pureModels.find((puremodel) => puremodel.model === model.replacement))) {
          modelsWithoutReplacement.push(model);
        };
      }
    });

    console.log(modelsWithoutReplacement);

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
    link.textContent = 'Поиск временно не работает, мы уже занимаемся поиском решения';
    link.href = '#';
    link.classList.add('active');
    link.classList.add('form__info_danger');
    statistics.textContent = '';
  })
  .finally(() => { });

input.addEventListener('input', () => {
  search(pureModels, input.value);
});

product.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('form__details-model')) {
    input.value = evt.target.textContent;
    search(pureModels, input.value);
  }
});

replacement.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('form__details-model')) {
    input.value = evt.target.textContent;
    search(pureModels, input.value);
  }
});

category.addEventListener('click', (evt) => {
  if ((evt.target.classList.contains('form__details-similar')) || (evt.target.classList.contains('form__details-model'))) {
    //* Исключаем бренд, оставляем только модель в инпуте
    input.value = evt.target.textContent.replace(/^\b.{1,15}\s/, '');
    search(pureModels, input.value);
  }
});

resetButton.addEventListener('click', () => {
  resetStatus();
  input.value = '';
  disableButton();
});

form.addEventListener('keyup', (evt) => {
  handleEscReset(evt);
});

const modelsButton = document.querySelector('.model-info');

modelsButton.addEventListener('click', (evt) => {
  if (prompt('Введите пароль') === '0000') {
    console.log(modelsWithoutReplacement);
    modelsWithoutReplacement.forEach((model) => {
      document.body.insertAdjacentHTML("beforeend", `<details style="padding: 10px; cursor: pointer;">
      <summary>${model.replacement}</summary>
      <p>Model: ${model.model}</p>
      <p>Replacement: ${model.replacement} - вот этой замены нет в списке актуальных</p>
      <p>Relevance: ${model.relevance}</p>
  </details>`);
    });
  }
});