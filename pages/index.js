import {
  form,
  resetStatus,
  statistics,
} from "../scripts/utils/utils.js";

import findModel from '../scripts/components/finder.js'

(async () => {
  const response = await fetch("../database/new.json");
  const models = await response.json();

  statistics.textContent = `База содержит ${models.length} наименований Hikvision & HiLook`;
  console.log(models);
  resetStatus();

  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    findModel(models);
  });
})();
