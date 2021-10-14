import "./Main.css";
import { Route, Switch } from "react-router-dom";
import About from "../About/About";
import Search from "../Search/Search";
import Statistics from "../Statistics/Statistics";
import ToastMessage from "../ToastMessage/ToastMessage";

export default function Main({ modelsData }) {

  return (
    <main className="main">
      <ToastMessage />
      <Switch>
        <Route exact path="/">
          <About />
          <Search modelsData={modelsData} />
        </Route>
        <Route path="/statistics">
          <Statistics />
        </Route>
      </Switch>
    </main>
  );
}
