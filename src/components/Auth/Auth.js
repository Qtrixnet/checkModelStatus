import "./Auth.scss";

export default function Auth() {
  return (
    <section className="auth">
      <form className="auth-form">
        <label className="auth-form__label">
          Введите пароль
          <input
            className="auth-form__password"
            type="password"
            placeholder="Пароль"
          />
        </label>
        <span className="auth-form__text">
          Пароль будет сохранен для всех следующих сессий
        </span>
        <span className="auth-form__text">
          Пароль можно найти в Google таблице, в разделе FAQ
        </span>
        <button className="auth-form__submit" type="submit">
          Авторизоваться
        </button>
      </form>
    </section>
  );
}
