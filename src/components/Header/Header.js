import "./Header.scss";
import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Indicator from "../Indicator/Indicator";
import logo from "../../images/logo.png";
import RelevanceSameModelContext from '../../contexts/relevanceSameModelContext';
import RelevanceAndReplacmentContext from '../../contexts/relevanceAndReplacmentContext';
import NotValidReplacementContext from '../../contexts/notValidReplacementContext';

export default function Header() {
  const relevanceAndReplacment = useContext(RelevanceAndReplacmentContext);
  const relevanceSameModel = useContext(RelevanceSameModelContext);
  const notValidReplacement = useContext(NotValidReplacementContext);
  const [errorModelsArr, setErrorModelsArr] = useState([])

  useEffect(() => {
    setErrorModelsArr([...relevanceAndReplacment, ...relevanceSameModel, ...notValidReplacement])
  }, [
    relevanceAndReplacment,
    relevanceSameModel,
    notValidReplacement,
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
          <Indicator errorModels={errorModelsArr} />
        </NavLink>
      </nav>
    </header>
  );
}
