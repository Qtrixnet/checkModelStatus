import {
  form,
  resetStatus,
  statistics,
} from "../scripts/utils/utils.js";

import findModel from '../scripts/components/finder.js'

(async () => {
  const response = await fetch("./database/models.json");
  const models = await response.json();

  statistics.textContent = `Общее количество моделей Hikvision & HiLook в базе поиска: ${models.length} шт.`;
  resetStatus();

  form.addEventListener("input", (evt) => {
    evt.preventDefault();
    findModel(models);
  });
})();
