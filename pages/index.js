import {
    form,
    resetStatus,
    statistics,
    detailsText,
    input,
    replacement,
} from "../scripts/utils/utils.js";

import findModel from "../scripts/components/finder.js";

(async () => {
    const response = await fetch("./database/models.json")
    const models = await response.json()

    statistics.textContent = `Общее количество моделей Hikvision & HiLook в базе поиска: ${models.length} шт.`;
    resetStatus();

    form.addEventListener("input", () => {
        findModel(models);
    });

    form.addEventListener("submit", (evt) => {
        evt.preventDefault();
    });

    detailsText.addEventListener("click", (evt) => {
        input.value = evt.target.textContent;
        findModel(models);
    });
    replacement.addEventListener("click", (evt) => {
        if(evt.target.classList.contains('form__details-model')){
            input.value = evt.target.textContent;
            findModel(models);
        }
    });
})();
