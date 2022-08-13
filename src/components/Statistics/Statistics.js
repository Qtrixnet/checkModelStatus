import "./Statistics.scss";
import { useState, useContext } from "react";
import { Route, useRouteMatch, Redirect } from "react-router-dom";
import NothingError from "../NothingError/NothingError";
import Auth from "../Auth/Auth";
import StatisticsNav from "./StatisticsNav/StatisticsNav";
import { texts } from "../../utils/constants";
import StatisticsTable from './StatisticsTable/StatisticsTable';
import RelevanceSameModelContext from '../../contexts/relevanceSameModelContext';
import RelevanceAndReplacmentContext from '../../contexts/relevanceAndReplacmentContext';
import NotValidReplacementContext from '../../contexts/notValidReplacementContext';
import DuplicatesContext from "../../contexts/duplicatesContext";

export default function Statistics({
  password = "",
}) {
  const [auth, setAuth] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { path, url } = useRouteMatch();
  const relevanceAndReplacment = useContext(RelevanceAndReplacmentContext);
  const relevanceSameModel = useContext(RelevanceSameModelContext);
  const notValidReplacement = useContext(NotValidReplacementContext);
  const duplicates = useContext(DuplicatesContext);

  useState(() => {
    localStorage.getItem("auth-password") === password
      ? setAuth(true)
      : setAuth(false);
  }, []);

  const [value, setValue] = useState("");

  const handleChange = (evt) => {
    setValue(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (value === password) {
      setAuth(true);
      setPasswordError(false);
      localStorage.setItem("auth-password", value);
    } else {
      setPasswordError(true);
    }
  };

  return auth ? (
    <section className="statistics">
      <StatisticsNav />

      <Route exact path="/statistics">
        <Redirect to={`${path}/relevanceAndReplacment`} />
      </Route>
      <Route path={`${path}/relevanceAndReplacment`}>
        {relevanceAndReplacment.length > 0 ? <StatisticsTable title={texts.statisticsTitles.relevanceAndReplacment} data={relevanceAndReplacment} /> : <NothingError />}
      </Route>
      <Route path={`${path}/relevanceSameModel`}>
        {relevanceSameModel.length > 0 ? <StatisticsTable title={texts.statisticsTitles.relevanceSameModel} data={relevanceSameModel} /> : <NothingError />}
      </Route>
      <Route path={`${path}/notValidReplacement`}>
        {notValidReplacement.length > 0 ? <StatisticsTable title={texts.statisticsTitles.notValidReplacement} data={notValidReplacement} /> : <NothingError />}
      </Route>
      <Route path={`${path}/duplicates`}>
        {duplicates.length > 0 ? <StatisticsTable title={texts.statisticsTitles.duplicates} data={duplicates} /> : <NothingError />}
      </Route>
    </section>
  ) : (
    <Auth
      handleChange={handleChange}
      passwordError={passwordError}
      handleSubmit={handleSubmit}
    />
  );
}
