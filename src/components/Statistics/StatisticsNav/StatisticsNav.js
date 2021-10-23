import "./StatisticsNav.scss";
// import { texts } from '../../utils/constants';
import { useState, useContext } from "react";
import { Route, NavLink, useRouteMatch } from "react-router-dom";
import { texts } from "../../../utils/constants";
import Indicator from '../../Indicator/Indicator';
import RelevanceSameModelContext from '../../../contexts/relevanceSameModelContext';
import RelevanceAndReplacmentContext from '../../../contexts/relevanceAndReplacmentContext';
import NotValidReplacementContext from '../../../contexts/notValidReplacementContext';

export default function StatisticsNav() {
  const { path, url } = useRouteMatch();

  const relevanceSameModel = useContext(RelevanceSameModelContext);
  const relevanceAndReplacment = useContext(RelevanceAndReplacmentContext);
  const notValidReplacement = useContext(NotValidReplacementContext);

  return (
    <>
      <nav className="statistics-nav">
        <NavLink
          activeClassName="statistics-nav__link_active"
          className="statistics-nav__link"
          to={`${url}/relevanceAndReplacment`}
        >
          {texts.statisticsTabs.relevanceAndReplacment}
          <Indicator errorModels={relevanceAndReplacment}/>
        </NavLink>
        <NavLink
          activeClassName="statistics-nav__link_active"
          className="statistics-nav__link"
          to={`${url}/relevanceSameModel`}
        >
          {texts.statisticsTabs.relevanceSameModel}
          <Indicator errorModels={relevanceSameModel}/>
        </NavLink>
        <NavLink
          activeClassName="statistics-nav__link_active"
          className="statistics-nav__link"
          to={`${url}/notValidReplacement`}
        >
          {texts.statisticsTabs.notValidReplacement}
          <Indicator errorModels={notValidReplacement}/>
        </NavLink>
        <hr className="statistics-nav__line"/>
        <a className="statistics-nav__link_google" href="#">
          Google таблица
        </a>
      </nav>
    </>
  );
}
