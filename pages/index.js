import {
  form,
  resetStatus,
  statistics,
} from "../scripts/utils/utils.js";

import findModel from '../scripts/components/finder.js'

(async () => {
  const response = await fetch("./database/models.json");
  const models = await response.json();
  console.log(models)

  statistics.textContent = `Общее количество моделей Hikvision & HiLook в базе поиска: ${models.length} шт.`;
  // console.log(models);
  resetStatus();

  form.addEventListener("input", (evt) => {
    evt.preventDefault();
    findModel(models);
  });
})();
