import './Main.css'
import { Route, Switch } from "react-router-dom";
import About from '../About/About';
import Search from '../Search/Search';
import Statistics from '../Statistics/Statistics';

export default function Main() {
  return (
    <main className="main">
      <Switch>
        <Route exact path="/">
          <About />
          <Search />
        </Route>
        <Route path="/statistics">
          <Statistics />
        </Route>
      </Switch>

    </main>
  )
}