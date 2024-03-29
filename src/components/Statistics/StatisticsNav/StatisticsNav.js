import "./StatisticsNav.scss";

import { useContext } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import { texts, googleDocsUrl } from "../../../utils/constants";
import Indicator from '../../Indicator/Indicator';
import RelevanceSameModelContext from '../../../contexts/relevanceSameModelContext';
import RelevanceAndReplacmentContext from '../../../contexts/relevanceAndReplacmentContext';
import NotValidReplacementContext from '../../../contexts/notValidReplacementContext';
import DuplicatesContext from "../../../contexts/duplicatesContext";

export default function StatisticsNav() {
  const { path, url } = useRouteMatch();

  const relevanceSameModel = useContext(RelevanceSameModelContext);
  const relevanceAndReplacment = useContext(RelevanceAndReplacmentContext);
  const notValidReplacement = useContext(NotValidReplacementContext);
  const duplicates = useContext(DuplicatesContext);

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
        <NavLink
          activeClassName="statistics-nav__link_active"
          className="statistics-nav__link"
          to={`${url}/duplicates`}
        >
          {texts.statisticsTabs.duplicates}
          <Indicator errorModels={duplicates}/>
        </NavLink>
        <hr className="statistics-nav__line"/>
        <a className="statistics-nav__link_google" target="_blank" rel="noreferrer" href={googleDocsUrl}>
          Google таблица
        </a>
      </nav>
    </>
  );
}
