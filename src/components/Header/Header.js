import "./Header.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import Indicator from "../Indicator/Indicator";
import logo from "../../images/logo.png";

export default function Header({
  relevanceSameModelStateLength = 0,
  relevanceAndReplacmentLength = 0,
  notActualReplacementLength = 0,
}) {
  const [errorStatus, setErrorStatus] = useState("warning");

  useEffect(() => {
    relevanceAndReplacmentLength !== 0 ||
    relevanceSameModelStateLength !== 0 ||
    notActualReplacementLength !== 0
      ? setErrorStatus("danger")
      : setErrorStatus("success");
  }, [
    relevanceAndReplacmentLength,
    relevanceSameModelStateLength,
    notActualReplacementLength,
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
