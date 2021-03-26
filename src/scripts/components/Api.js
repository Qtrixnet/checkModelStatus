//* Класс для запроса списка оборудования
export default class Api {
  constructor(url) {
    this._url = url;
  }

  _requestResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(
        `Что-то пошло не так: Ошибка ${res.status} - ${res.statusText}`
      );
    }
  }

  getModels() {
    return fetch(this._url).then((res) => this._requestResult(res));
  }
}
