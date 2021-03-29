import {
  title,
  result,
  product,
  category,
  replacement,
  link,
  form,
  input,
  details,
  detailsText,
  resetButton,
} from './constants';

export function resetStatus() {
  result.textContent = '';
  result.classList.remove('active');
  product.textContent = '';
  product.classList.remove('active');
  category.textContent = '';
  category.classList.remove('active');
  replacement.textContent = '';
  replacement.classList.remove('active');
  link.textContent = 'asd';
  link.href = '#';
  link.target = '';
  link.classList.remove('active');
  link.classList.remove('form__info_danger');
  form.classList.remove('form__input_success');
  form.classList.remove('form__input_error');
  form.classList.remove('form__input_warning');
  input.classList.add('active');
  detailsText.textContent = '';
  details.classList.remove('active');
}

export function transformData(data) {
  return {
    brand: data.gsx$brand.$t,
    category: data.gsx$category.$t,
    model: data.gsx$model.$t,
    product: data.gsx$product.$t,
    relevance: data.gsx$relevance.$t,
    replacement: data.gsx$replacement.$t,
  };
}
