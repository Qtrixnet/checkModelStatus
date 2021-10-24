import "./Auth.scss";

export default function Auth({ handleChange, passwordError, handleSubmit }) {
  return (
    <section onSubmit={handleSubmit} className="auth">
      <form className="auth-form">
        <label className="auth-form__label">
          Авторизуйтесь
          <input
            className="auth-form__password"
            type="password"
            placeholder="Пароль"
            onChange={handleChange}
          />
        </label>
        <span className="auth-form__text">
          * Пароль будет сохранен для всех следующих сессий
        </span>
        <span className="auth-form__text">
          * Пароль можно узнать имея доступ к Google таблице
        </span>
        <button
          className="auth-form__submit"
          type="submit"
        >
          Авторизоваться
        </button>
        {passwordError && <p className="auth-form__wrong-password">Неверный пароль</p>}
      </form>
    </section>
  );
}
