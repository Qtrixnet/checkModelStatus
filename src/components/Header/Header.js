import "./Header.css";
import { NavLink } from "react-router-dom";
import Indicator from "../Indicator/Indicator";

export default function Header({ 
  relevanceSameModelStateLength = 0,
  relevanceAndReplacmentLength = 0,
  notActualReplacementLength = 0,
}) {

  let errorStatus = 'warning';

  if (relevanceAndReplacmentLength !== 0 || relevanceSameModelStateLength !== 0 || notActualReplacementLength !== 0) {
    errorStatus = 'danger'
  } else {
    errorStatus = 'success';
  }

  return (
    <header className="header">
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
          <Indicator errorStatus={errorStatus}/>
        </NavLink>
      </nav>
    </header>
  );
}
