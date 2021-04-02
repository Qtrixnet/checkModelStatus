import {
  title,
  result,
  product,
  category,
  replacement,
  link,
  form,
  input,
  details,
  detailsText,
  resetButton,
  foundModels,
} from "./constants";

//* Сброс статусов поиска
export function resetStatus() {
  result.textContent = "";
  result.classList.remove("active");
  product.textContent = "";
  product.classList.remove("active");
  category.textContent = "";
  category.classList.remove("active");
  replacement.textContent = "";
  replacement.classList.remove("active");
  link.textContent = "asd";
  link.href = "#";
  link.target = "";
  link.classList.remove("active");
  link.classList.remove("form__info_danger");
  form.classList.remove("form__input_success");
  form.classList.remove("form__input_error");
  form.classList.remove("form__input_warning");
  input.classList.add("active");
  // detailsText.textContent = '';
  // details.classList.remove('active');
}

//* Трансформация данных
export function transformData(data) {
  return {
    brand: data.gsx$brand.$t.toLowerCase().replace(/\s+/g, ""),
    category: data.gsx$category.$t.toLowerCase().replace(/\s+/g, ""),
    model: data.gsx$model.$t.toLowerCase().replace(/\s+/g, ""),
    product: data.gsx$product.$t.toLowerCase(),
    relevance: data.gsx$relevance.$t.toLowerCase().replace(/\s+/g, ""),
    replacement: data.gsx$replacement.$t.toLowerCase().replace(/\s+/g, ""),
    id: data.gsx$id.$t.toLowerCase().replace(/\s+/g, ""),
    similarHilook: data.gsx$hilook.$t.toLowerCase().replace(/\s+/g, ""),
    similarHiwatch: data.gsx$hiwatch.$t.toLowerCase().replace(/\s+/g, ""),
    similarHikvision: data.gsx$hikvision.$t.toLowerCase().replace(/\s+/g, ""),
  };
}

//* деактивация кнопки очистки инпута
export function disableButton() {
  resetStatus();
  resetButton.setAttribute("disabled", true);
  resetButton.classList.add("disabled");
  resetButton.setAttribute("title", "В поле ввода ничего нет");
}

//* активация кнопки очистки инпута
export function enableButton() {
  resetStatus();
  resetButton.removeAttribute("disabled", false);
  resetButton.classList.remove("disabled");
  resetButton.setAttribute("title", "Очистить поле ввода");
}

//* Содержится ли введенная пользователем модель в общем массиве найденных моделей
export function checkAvailability(arr, model) {
  return arr.some(function (arrModel) {
    return model === arrModel.model.toLowerCase();
  });
}

export function findModelInArr(arr, model) {
  return arr.find(function (arrModel) {
    return model === arrModel.model.toLowerCase();
  });
}
