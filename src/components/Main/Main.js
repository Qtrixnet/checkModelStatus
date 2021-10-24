import "./Main.scss";
import { Route, Switch } from "react-router-dom";
import About from "../About/About";
import Search from "../Search/Search";
import Statistics from "../Statistics/Statistics";
import PageNotFound from '../PageNotFound/PageNotFound';

export default function Main({
  modelsData,
  password = "",
}) {

  return (
    <main className="main">
      <Switch>
        <Route exact path="/">
          <About modelsData={modelsData} />
          <Search modelsData={modelsData} />
        </Route>
        <Route path="/statistics">
          <Statistics password={password} />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </main>
  );
}
