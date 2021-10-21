import "./Auth.scss";
import { useState } from "react";

export default function Auth() {
  const [password, setPassword] = useState("");
  const [value, setValue] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const inputValue = evt.target
      .closest(".auth-form")
      .querySelector(".auth-form__password").value;

    if(inputValue === password) {
      
    }
  };

  const handleChange = (evt) => {
    console.log(evt.target);
    setValue(evt.target.value);
  };

  return (
    <section className="auth">
      <form className="auth-form">
        <label className="auth-form__label">
          Введите пароль
          <input
            className="auth-form__password"
            type="password"
            placeholder="Пароль"
            value={value}
            onChange={handleChange}
          />
        </label>
        <span className="auth-form__text">
          Пароль будет сохранен для всех следующих сессий
        </span>
        <span className="auth-form__text">
          Пароль можно найти в Google таблице, в разделе FAQ
        </span>
        <button
          className="auth-form__submit"
          onClick={handleSubmit}
          type="submit"
        >
          Авторизоваться
        </button>
      </form>
    </section>
  );
}
