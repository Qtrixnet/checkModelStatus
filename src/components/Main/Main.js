import "./Main.css";
import { Route, Switch } from "react-router-dom";
import { useState } from "react";
import About from "../About/About";
import Search from "../Search/Search";
import Statistics from "../Statistics/Statistics";
import ToastMessage from "../ToastMessage/ToastMessage";
import ToastContainer from 'react-bootstrap/ToastContainer'

export default function Main({
  modelsData,
  relevanceAndReplacment = [],
  relevanceSameModelState = [],
  notActualReplacement = [],
  relevanceSameModelStateLength = 0,
  relevanceAndReplacmentLength = 0,
  notActualReplacementLength = 0,
}) {

  // const [errorStatus, setErrorStatus] = useState(false)
  // const [errorStatusText, setErrorStatusText] = useState('')

  let errorStatusText, errorStatus;

  if (relevanceAndReplacmentLength !== 0 || relevanceSameModelStateLength !== 0 || notActualReplacementLength !== 0) {
    errorStatusText = 'В Google таблице есть ошибки, проверьте статистику'
    errorStatus = 'danger'
    // setErrorStatus(true)
    // setErrorStatusText('В таблице есть ошибки, проверьте статистику')
  } else {
    errorStatusText = 'В Google таблице ошибок нет, отлично!'
    errorStatus = 'success';
    // setErrorStatus(false)
    // setErrorStatusText('Все отлично, ошибок нет')
  }

  return (
    <main className="main">
      <ToastContainer className="toast-container" className="p-5" position="bottom-end">
        {/* <ToastMessage title="Кастомизация" subtitle="Change color" text="Создай свою персональную тему" /> */}
        <ToastMessage title="Внимание" subtitle="Google sheet" errorStatus={errorStatus} text={`${errorStatusText}`} />
      </ToastContainer>
      <Switch>
        <Route exact path="/">
          <About modelsData={modelsData} />
          <Search modelsData={modelsData} />
        </Route>
        <Route path="/statistics">
          <Statistics
            relevanceAndReplacment={relevanceAndReplacment}
            relevanceSameModelState={relevanceSameModelState}
            notActualReplacement={notActualReplacement}
            relevanceSameModelStateLength={relevanceSameModelStateLength}
            relevanceAndReplacmentLength={relevanceAndReplacmentLength}
            notActualReplacementLength={notActualReplacementLength}
            errorStatus={errorStatus}
          />
        </Route>
      </Switch>
    </main>
  );
}
