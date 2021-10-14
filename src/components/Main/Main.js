import "./Main.css";
import { Route, Switch } from "react-router-dom";
import About from "../About/About";
import Search from "../Search/Search";
import Statistics from "../Statistics/Statistics";
import ToastMessage from "../ToastMessage/ToastMessage";
import ToastContainer from 'react-bootstrap/ToastContainer'

export default function Main({ modelsData, relevanceAndReplacment, relevanceSameModelState }) {

  return (
    <main className="main">
      <ToastContainer className="toast-container" className="p-5" position="bottom-end">
        <ToastMessage title="Кастомизация" subtitle="Change color" text="Создай свою персональную тему" />
        <ToastMessage title="Напоминание" subtitle="Google sheet" text="Модели с некорректной информацией можно увидеть в разделе 'статистика'" />
      </ToastContainer>
      <Switch>
        <Route exact path="/">
          <About modelsData={modelsData} />
          <Search modelsData={modelsData} />
        </Route>
        <Route path="/statistics">
          <Statistics relevanceAndReplacment={relevanceAndReplacment} relevanceSameModelState={relevanceSameModelState} />
        </Route>
      </Switch>
    </main>
  );
}
