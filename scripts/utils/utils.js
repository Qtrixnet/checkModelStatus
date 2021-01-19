export const page = document.querySelector(".page");
export const result = page.querySelector(".form__info_result");
export const input = page.querySelector(".form__input");
export const form = page.querySelector(".form");
export const product = page.querySelector(".form__info_product");
export const category = page.querySelector(".form__info_category");
export const replacement = page.querySelector(".form__info_replacement");
export const statistics = page.querySelector(".statistics");
export const link = page.querySelector(".form__info_link");

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
}
