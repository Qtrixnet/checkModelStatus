export const page = document.querySelector(".page");
export const statistics = page.querySelector(".statistics");
export const form = page.querySelector(".form");
export const result = form.querySelector(".form__info_result");
export const input = form.querySelector(".form__input");
export const product = form.querySelector(".form__info_product");
export const category = form.querySelector(".form__info_category");
export const replacement = form.querySelector(".form__info_replacement");
export const link = form.querySelector(".form__info_link");
export const details = form.querySelector(".form__details");
export const detailsTitle = details.querySelector(".form__details-title");
export const detailsText = details.querySelector(".form__details-text");

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
  link.classList.remove("active");

  form.classList.remove("form__input_success");
  form.classList.remove("form__input_error");
  form.classList.remove("form__input_warning");

  detailsText.textContent = "";

  details.classList.remove('active')
}
