import "./StatisticsNav.scss";
// import { texts } from '../../utils/constants';
import { useState } from "react";
import { Route, NavLink, useRouteMatch } from "react-router-dom";
import { texts } from "../../../utils/constants";
import Indicator from '../../Indicator/Indicator';
import StatisticsTable from "../StatisticsTable/StatisticsTable";

export default function StatisticsNav({
  errorStatus,
  relevanceAndReplacment,
  relevanceSameModel,
  notValidReplacement,
  relevanceAndReplacmentLength,
  relevanceSameModelLength,
  notValidReplacementLength,
}) {
  const { path, url } = useRouteMatch();
  return (
    <>
      <nav className="statistics-nav">
        <NavLink
          activeClassName="statistics-nav__link_active"
          className="statistics-nav__link"
          to={`${url}/relevanceAndReplacment`}
        >
          {texts.statisticsTabs.relevanceAndReplacment}
          <Indicator errorStatus={errorStatus} />
        </NavLink>
        <NavLink
          activeClassName="statistics-nav__link_active"
          className="statistics-nav__link"
          to={`${url}/relevanceSameModel`}
        >
          {texts.statisticsTabs.relevanceSameModel}

          <Indicator errorStatus={errorStatus} />
        </NavLink>
        <NavLink
          activeClassName="statistics-nav__link_active"
          className="statistics-nav__link"
          to={`${url}/notValidReplacement`}
        >
          {texts.statisticsTabs.notValidReplacement}

          <Indicator errorStatus={errorStatus} />
        </NavLink>
        <a className="statistics-nav__link_google" href="#">
          Google таблица
        </a>
      </nav>
    </>
  );
}
