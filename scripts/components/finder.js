import {
  result,
  input,
  form,
  product,
  category,
  replacement,
  resetStatus,
  link,
  details,
  detailsText,
} from "../utils/utils.js";

export default function findModel(AllModelsArray) {
  let foundModels = [];
  let inputValue = input.value.toLowerCase().replace(/\s+/g, "");

  //* Находим в общей базе все, что похоже на введенную пользователем модель и кладем в пустой массив foundModels
  AllModelsArray.forEach((model) => {
    if (
      (inputValue.length >= 1 &&
        model.model.toLowerCase().replace(/\s+/g, "").includes(inputValue)) ||
      (inputValue.length >= 1 &&
        inputValue.includes(model.model.toLowerCase().replace(/\s+/g, "")))
    ) {
      foundModels.push(model);
    }
  });

  //* Содержится ли введенная пользователем модель в общем массиве найденных моделей
  function checkAvailability(arr, model) {
    return arr.some(function (arrModel) {
      return model === arrModel.model.toLowerCase();
    });
  }

  //* Находим объект с информацией об искомой модели в массиве найденных моделей
  function findModelInArr(arr, model) {
    return arr.find(function (arrModel) {
      return model === arrModel.model.toLowerCase();
    });
  }

  //* Если в поле ввода ничего не ввели, то скидываем все статусы
  if (inputValue === "") {
    resetStatus();
    input.style.cssText = "border-bottom: 3px solid #3398dc;"
  } else {
    input.style.cssText = "border: 0;"
    //* Если в поле ввода есть текст и если моделей найдено 1 или более
    if (foundModels.length >= 1) {

      //* Если среди найденных моделей есть точное совпадение
      if (checkAvailability(foundModels, inputValue)) {
        //! Если модель найденная снята с производства и если это не Dahua
        if (
          findModelInArr(foundModels, inputValue).relevance === "false" &&
          findModelInArr(foundModels, inputValue).brand !== "Dahua"
        ) {
          resetStatus();
          form.classList.add("form__input_warning");
          result.classList.add("active");
          result.textContent = `Модель ${
            findModelInArr(foundModels, inputValue).model
          } снята с производства`;
          //* Если есть на что заменить найденную модель
          if (findModelInArr(foundModels, inputValue).replacement !== "") {
            replacement.classList.add("active");
            replacement.textContent = `Рекомендуемая замена:`;
            replacement.insertAdjacentHTML(
              "beforeend",
              ` <span class="form__details-model">${
                findModelInArr(foundModels, inputValue).replacement
              }</span>`
            );
          } else {
            //* Если нет замены для найденной модели
            replacement.classList.add("active");
            replacement.textContent = `Рекомендуемая замена не предусмотрена, обратитесь в отдел СВН`;
          }
          //* Если найденная модель относится к дистрибуционной линейке
          if (findModelInArr(foundModels, inputValue).category === "D") {
            category.classList.add("active");
            category.textContent = `Относилась к дистрибуционной линейке`;
          } else if (findModelInArr(foundModels, inputValue).category === "P") {
            //* Если найденная модель относится к проектной линейке
            category.classList.add("active");
            category.textContent = `Относилась к проектной линейке`;
          } else {
            category.classList.add("active");
            category.textContent = `Линейка продукта неизвестна`;
          }
        } else if (
          //! Если введена модель Dahua
          findModelInArr(foundModels, inputValue).relevance === "false" &&
          findModelInArr(foundModels, inputValue).brand === "Dahua"
        ) {
          resetStatus();
          form.classList.add("form__input_warning");
          //* Если есть на что заменить Dahua
          if (findModelInArr(foundModels, inputValue).replacement !== "") {
            replacement.classList.add("active");
            replacement.textContent = `Аналогичное оборудование на Hikvision:`;
            replacement.insertAdjacentHTML(
              "beforeend",
              ` <span class="form__details-model">${
                findModelInArr(foundModels, inputValue).replacement
              }</span>`
            );
          } else {
            //* Если нет замены для Dahua
            replacement.classList.add("active");
            replacement.textContent = `У Hikvision нет аналогичной модели, обратитесь в отдел СВН`;
          }
        } else {
          //* Если введенная модель (не Dahua) актуальна
          resetStatus();
          form.classList.add("form__input_success");

          result.classList.add("active");
          result.textContent = `Модель "${
            findModelInArr(foundModels, inputValue).model
          }" доступна к заказу`;
          link.classList.add("active");
          link.textContent = "Искать на hikvision.com";
          link.href = `https://www.hikvision.com/en/search/?q=${
            findModelInArr(foundModels, inputValue).model
          }`;
          link.target = `_blank`;

          //* Если введенная модель относится к дистрибуционной линейке
          if (findModelInArr(foundModels, inputValue).category === "D") {
            category.classList.add("active");
            category.textContent = `Относится к дистрибуционной линейке`;
          } else if (findModelInArr(foundModels, inputValue).category === "P") {
            //* Если введенная модель относится к проектной линейке
            category.classList.add("active");
            category.textContent = `Относится к проектной линейке`;
          } else {
            category.classList.add("active");
            category.textContent = `Линейка продукта неизвестна`;
          }
        }
      } else {
        //* Если точного совпадения нет и найдено несколько моделей
        resetStatus();
        form.classList.add("form__input_warning");
        result.classList.add("active");
        result.textContent = `Похожие модели: ${foundModels.length} шт.`;
        //* Если количество найденных моделей меньше 10
        if (foundModels.length <= 15) {
          if (foundModels.length <= 15 && foundModels.length > 5) {
            form.style.cssText = "width: 80%"
          } else if (foundModels.length <= 5) {
            form.style.cssText = "width: 50%"
          }
          details.classList.add("active");
          foundModels.forEach((model) => {
            if (model.relevance === "false") {
              detailsText.insertAdjacentHTML(
                "beforeend",
                `<span title="Недоступно к заказу" class="form__details-model discontinued">${model.model}</span>`
              );
            } else {
              detailsText.insertAdjacentHTML(
                "beforeend",
                `<span title="Доступно к заказу" class="form__details-model">${model.model}</span>`
              );
            }
          });
        }
      }
    } else {
      //* Если вообще ничего не найдено
      resetStatus();
      form.classList.add("form__input_error");
      result.classList.add("active");
      result.textContent = `По запросу "${input.value}" ни одной модели не найдено.`;
      product.classList.add("active");
      product.textContent = `Проверьте корректность наименования или уточните информацию в отделе СВН`;
    }
  }
}
