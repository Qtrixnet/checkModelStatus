import "./Main.css";
import { Route, Switch } from "react-router-dom";
import About from "../About/About";
import Search from "../Search/Search";
import Statistics from "../Statistics/Statistics";
import ToastMessage from "../ToastMessage/ToastMessage";

export default function Main({ modelsData, relevanceAndReplacment, relevanceSameModelState }) {

  return (
    <main className="main">
      <ToastMessage />
      <Switch>
        <Route exact path="/">
          <About modelsData={modelsData}/>
          <Search modelsData={modelsData} />
        </Route>
        <Route path="/statistics">
          <Statistics relevanceAndReplacment={relevanceAndReplacment} relevanceSameModelState={relevanceSameModelState} />
        </Route>
      </Switch>
    </main>
  );
}
