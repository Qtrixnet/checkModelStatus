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
    let inputValue = input.value.toLowerCase();
    let foundModelsList = "";
    let eachModel = {}

    //* Находим все подходящие модели
    AllModelsArray.forEach((model) => {
        if (
            (inputValue.length >= 1 &&
                model.model.toLowerCase().includes(inputValue)) ||
            (inputValue.length >= 1 &&
                inputValue.includes(model.model.toLowerCase()))
        ) {
            foundModels.push(model);
        }
    });

    //* Содержится ли искомая модель в общем массиве найденных моделей
    function checkAvailability(arr, model) {
        return arr.some(function (arrModel) {
            return model === arrModel.model.toLowerCase();
        });
    }

    //* Найти объект искомой модели в массиве найденных моделей
    function findModelInArr(arr, model) {
        return arr.find(function (arrModel) {
            return model === arrModel.model.toLowerCase()
        });
    }

    //* Делаем из массива строку
    function modelsToString(arr) {
        arr.forEach((modelObj) => {
            foundModelsList += `, ${modelObj.model}`;
        });
        return foundModelsList.replace(/^, /, "");
    }

    //* Если поле для ввода пустое
    if (inputValue === "") {
        resetStatus();
    } else {
        //* Если поле не пустое и если моделей найдено больше 1й
        if (foundModels.length >= 1) {
            //* Если среди найденных моделей есть точное совпадение
            if (checkAvailability(foundModels, inputValue)) {
                //* Если Модель снята с производства
                if (findModelInArr(foundModels, inputValue).relevance === "false") {
                    resetStatus();
                    form.classList.add("form__input_warning");
                    result.classList.add("active");
                    result.textContent = `Модель ${findModelInArr(foundModels, inputValue).model} снята с производства`;
                    //* Если есть на что заменить
                    if (findModelInArr(foundModels, inputValue)) {
                        replacement.classList.add("active");
                        replacement.textContent = `Рекомендуемая замена: `;
                        replacement.insertAdjacentHTML('beforeend', ` <span class="form__details-model">${findModelInArr(foundModels, inputValue).replacement}</span>`)
                    } else {
                        //* Если нет замены
                        replacement.classList.add("active");
                        replacement.textContent = `Рекомендуемая замена не предусмотрена`;
                    }
                    //* Если относится к дистрибуционной линейке
                    if (findModelInArr(foundModels, inputValue).category === "D") {
                        category.classList.add("active");
                        category.textContent = `Относилась к дистрибуционной линейке`;
                    } else {
                        //* Если относится к проектной линейке
                        category.classList.add("active");
                        category.textContent = `Относилась к проектной линейке`;
                    }
                } else {
                    //* Если модель актуальна
                    resetStatus();
                    form.classList.add("form__input_success");

                    result.classList.add("active");
                    result.textContent = `Модель "${findModelInArr(foundModels, inputValue).model}" доступна к заказу`;
                    link.classList.add("active");
                    link.textContent = "Искать на hikvision.com";
                    link.href = `https://www.hikvision.com/en/search/?q=${findModelInArr(foundModels, inputValue).model}`;

                    //* Если относится к дистрибуционной линейке
                    if (findModelInArr(foundModels, inputValue).category === "D") {
                        category.classList.add("active");
                        category.textContent = `Относится к дистрибуционной линейке`;
                    } else {
                        //* Если относится к проектной линейке
                        category.classList.add("active");
                        category.textContent = `Относится к проектной линейке`;
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
                    details.classList.add("active");
                    foundModels.forEach(model => {
                        detailsText.insertAdjacentHTML('beforeend', `<span class="form__details-model">${model.model}</span>`);
                    })
                }
            }
        } else {
            //* Если вообще ничего не найдено
            resetStatus();
            form.classList.add("form__input_error");
            result.classList.add("active");
            result.textContent = `Модель "${input.value}" не найдена.`;
            product.classList.add("active");
            product.textContent = `Проверьте корректность наименования или уточните информацию в отделе СВН`;
        }
    }
}
