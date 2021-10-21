import "./Header.scss";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import Indicator from "../Indicator/Indicator";
import logo from "../../images/logo.png";

export default function Header({
  relevanceSameModelLength = 0,
  relevanceAndReplacmentLength = 0,
  notValidReplacementLength = 0,
}) {
  const [errorStatus, setErrorStatus] = useState("warning");

  useEffect(() => {
    relevanceAndReplacmentLength !== 0 ||
    relevanceSameModelLength !== 0 ||
    notValidReplacementLength !== 0
      ? setErrorStatus("danger")
      : setErrorStatus("success");
  }, [
    relevanceAndReplacmentLength,
    relevanceSameModelLength,
    notValidReplacementLength,
  ]);

  return (
    <header className="header">
      <a
        href="https://www.intant.kz/"
        className="header__logo-link"
        title="Переход на сайт компании"
        target="_blank"
        rel="noreferrer"
      >
        <img src={logo} alt="логотип" className="header__logo"></img>
      </a>
      <nav className="header__navigation">
        <NavLink
          exact
          to="/"
          activeClassName="header__link_active"
          className="header__link"
        >
          Поиск
        </NavLink>
        <NavLink
          to="/statistics"
          activeClassName="header__link_active"
          className="header__link"
        >
          Статистика
          <Indicator errorStatus={errorStatus} />
        </NavLink>
      </nav>
    </header>
  );
}
