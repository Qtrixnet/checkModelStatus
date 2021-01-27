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
export const title = document.querySelector(".title");

export function resetStatus() {
    title.textContent = "Введите модель оборудования";
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
    link.target = "";
    link.classList.remove("active");
    link.classList.remove('form__info_danger');

    form.classList.remove("form__input_success");
    form.classList.remove("form__input_error");
    form.classList.remove("form__input_warning");
    input.classList.add("active");

    detailsText.textContent = "";

    details.classList.remove("active");
}
