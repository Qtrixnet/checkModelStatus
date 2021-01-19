import {
  result,
  input,
  form,
  product,
  category,
  replacement,
  resetStatus,
  link,
} from "../utils/utils.js";

export default function findModel(models) {
  let modelObj;
  modelObj = models.find(
    (o) => o.model.toLowerCase() === input.value.toLowerCase()
  );

  //* Если такой модели не найдено
  if (!modelObj) {
    resetStatus();
    result.classList.add("active");
    result.textContent = `Модель ${input.value} не найдена.`;

    product.classList.add("active");
    product.textContent = `Проверьте корректность наименования или уточните информацию в отделе СВН`
    form.classList.add("form__input_error");
  } else {
    //* Если найдено и если модель снята с производства
    if (modelObj.relevance === "false") {
      resetStatus();
      console.log(modelObj);
      form.classList.add("form__input_warning");

      result.classList.add("active");
      result.textContent = `Модель ${modelObj.model} снята с производства`;

      replacement.classList.add("active");
      replacement.textContent = `Рекомендуемая замена: ${modelObj.replacement}`;
    }
    //* Если найдено и если модель НЕ снята с производства
    else {
      console.log(modelObj);

      resetStatus();

      form.classList.add("form__input_success");

      result.classList.add("active");
      result.textContent = `Модель ${modelObj.model} доступна к заказу`;

      product.classList.add("active");
      product.textContent = `Находится в прайсе: ${modelObj.product}`;

      link.classList.add("active");
      link.textContent = "Искать на hikvision.com";
      link.href = `https://www.hikvision.com/en/search/?q=${modelObj.model}`;

      if (modelObj.category === "D") {
        category.classList.add("active");
        category.textContent = `Относится к дистрибуционной линейке`;
      } else {
        category.classList.add("active");
        category.textContent = `Относится к проектной линейке`;
      }
    }
  }
}
