import {
  result,
  input,
  form,
  product,
  category,
  replacement,
  link,
  details,
  detailsText,
  resetButton,
} from "../utils/constants";
import { enableButton, disableButton, resetStatus } from "../utils/utils";

let foundModels;
let matchModel = {};
let inputValue = "";

// Hikvision DS-2CD2043G0-I (2.8 мм) (Акция) IP видеокамера уличная, 4МП, EasyIP 2.0 Plus

export function search(models, value) {
  inputValue = value.toLowerCase().replace(/\s+/g, "");
  foundModels = models.filter((record) => record.model.includes(inputValue));
  // console.log(foundModels);
  //* 1. Если инпут не пустой
  if (inputValue !== "") {
    enableButton();
    //* 2. Если искомая модель совпадает с найденной
    if (foundModels.find((record) => record.model === inputValue)) {
      matchModel = foundModels.find((record) => record.model === inputValue);
      //* 3. Если эта модель актуальна
      if (matchModel.relevance === "yes") {
        form.classList.add("form__input_success");
        result.classList.add("active");
        result.textContent = `Модель доступна к заказу`;
        product.classList.add("active");
        //* Определяем категорию линейки
        if (matchModel.category === "d") {
          product.textContent = `Относится к дистрибуционной линейке`;
        } else if (matchModel.category === "p") {
          product.textContent = `Относится к проектной линейке`;
        } else {
          product.textContent = `Линейка модели не указана`;
        }
        if (matchModel.brand === 'hikvision') {
          link.classList.add("active");
          link.textContent = "Искать на hikvision.com";
          link.href = `https://www.hikvision.com/en/search/?q=${matchModel.model}`;
          link.target = "_blank";
        }
      } else {
        //* 3. Если модель не актуальна
        form.classList.add("form__input_warning");
        result.classList.add("active");
        result.textContent = `Модель ${matchModel.model.toUpperCase()} уже снята с производства`;
        replacement.classList.add("active");
        product.classList.add("active");
        if (matchModel.category === "d") {
          product.textContent = `Относилась к дистрибуционной линейке`;
        } else if (matchModel.category === "p") {
          product.textContent = `Относилась к проектной линейке`;
        } else {
          product.textContent = `Линейка модели не указана`;
        }
        //* Если есть замена
        if (matchModel.replacement !== "") {
          replacement.textContent = "Была заменена на:";
          replacement.insertAdjacentHTML(
            "beforeend",
            ` <span class="form__details-model">${matchModel.replacement.toUpperCase()}</span>`
          );
        } else {
          //* Если нет замены
          replacement.textContent =
            "Рекомендуемая замена не предусмотрена, обратитесь в отдел СВН";
        }
      }
      if (
        matchModel.similarHikvision ||
        matchModel.similarHilook ||
        matchModel.similarHiwatch
      ) {
        category.classList.add("active");
        category.textContent = "Аналог на другом бренде:";
        matchModel.similarHilook
          ? category.insertAdjacentHTML(
              "beforeend",
              `<span title="Доступно к заказу" class="form__details-model">${
                matchModel.similarHilook ? "Hilook: " : ""
              }${matchModel.similarHilook.toUpperCase()}</span>`
            )
          : "";
        matchModel.similarHiwatch
          ? category.insertAdjacentHTML(
              "beforeend",
              `<span title="Доступно к заказу" class="form__details-model">${
                matchModel.similarHiwatch ? "Hiwatch: " : ""
              }${matchModel.similarHiwatch.toUpperCase()}</span>`
            )
          : "";
        matchModel.similarHikvision
          ? category.insertAdjacentHTML(
              "beforeend",
              `<span title="Доступно к заказу" class="form__details-model">${
                matchModel.similarHikvision ? "Hikvision: " : ""
              }${matchModel.similarHikvision.toUpperCase()}</span>`
            )
          : "";
      }
      // DS-2CD1027G0-L
      return;
    }
    //* 2. Если моделей найдено много
    if (foundModels.length > 1) {
      form.classList.add("form__input_warning");
      result.classList.add("active");
      result.textContent = `Похожие модели: ${foundModels.length} шт.`;
      //* 3. Если найденных моделей меньше или 10
      if (foundModels.length <= 10) {
        product.classList.add("active");
        foundModels.forEach((model) => {
          //* Если модель в массиве актуальна
          if (model.relevance === "yes") {
            product.insertAdjacentHTML(
              "beforeend",
              `<span title="Доступно к заказу" class="form__details-model">${model.model.toUpperCase()}</span>`
            );
          } else {
            //* Если модель в массиве неактуальна
            product.insertAdjacentHTML(
              "beforeend",
              `<span title="Недоступно к заказу" class="form__details-model discontinued">${model.model.toUpperCase()}</span>`
            );
          }
        });
      }
    } else {
      //* 2. Если ничего не найдено
      form.classList.add("form__input_error");
      result.classList.add("active");
      result.textContent = `Ничего не найдено`;
      product.classList.add("active");
      product.textContent =
        "Проверьте корректность наименования или уточните информацию в отделе СВН";
    }
    return;
  } else {
    //* 1. Если пустой
    disableButton();
    return;
  }
}
