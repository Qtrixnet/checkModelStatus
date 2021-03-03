import {
  form,
  resetStatus,
  statistics,
  input,
  link,
  title,
} from "../utils/utils.js";

//* Класс для запроса списка оборудования
export default class Api {
  constructor(url) {
    this._url = url;
  }

  _requestResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      resetStatus();
      input.remove();
      title.textContent = "Что-то пошло не так";
      form.classList.add("form__input_error");
      link.textContent = "Поиск не работает";
      link.href = "#";
      link.classList.add("active");
      link.classList.add("form__info_danger");
      statistics.textContent = "";
      return Promise.reject(
        `Что-то пошло не так: Ошибка ${res.status} - ${res.statusText}`
      );
    }
  }

  getModels() {
    return fetch(this._url).then((res) => this._requestResult(res));
  }
}
