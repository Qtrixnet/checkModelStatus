import "./StatisticsNav.scss";
// import { texts } from '../../utils/constants';
import { useState } from "react";
import { Route, NavLink, useRouteMatch } from "react-router-dom";
import { texts } from "../../../utils/constants";
import Indicator from '../../Indicator/Indicator'

export default function StatisticsNav() {
  const { path, url } = useRouteMatch();
  return (
    <>
      <nav className="statistics__nav">
        <NavLink
          className="statistics__nav-link"
          to={`${url}/relevanceAndReplacment`}
        >
          {texts.statisticsTabs.relevanceAndReplacment}
          <Indicator />
        </NavLink>
        <NavLink
          className="statistics__nav-link"
          to={`${url}/relevanceSameModel`}
        >
          {texts.statisticsTabs.relevanceSameModel}
          <Indicator />
        </NavLink>
        <NavLink
          className="statistics__nav-link"
          to={`${url}/notValidReplacement`}
        >
          {texts.statisticsTabs.notValidReplacement}
          <Indicator />
        </NavLink>
        <a className="statistics__link" href="#">
          Google таблица
        </a>
      </nav>
    </>
  );
}
