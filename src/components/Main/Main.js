import "./Main.scss";
import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import About from "../About/About";
import Search from "../Search/Search";
import Statistics from "../Statistics/Statistics";
import ToastMessage from "../ToastMessage/ToastMessage";
import ToastContainer from "react-bootstrap/ToastContainer";
import { texts, templateWordsError } from "../../utils/constants";
import { formatWord } from "../../utils/wordFormatter";

export default function Main({
  modelsData,
  relevanceAndReplacment = [],
  relevanceSameModelState = [],
  notActualReplacement = [],
  relevanceAndReplacmentLength = 0,
  relevanceSameModelStateLength = 0,
  notActualReplacementLength = 0,
  password = "",
}) {
  const [validPassword, setValidPassword] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorStatusColor, setErrorStatusColor] = useState("");

  useEffect(() => {
    localStorage.getItem("auth-password") === password
      ? setValidPassword(true)
      : setValidPassword(false);
  }, [setValidPassword, password]);

  useEffect(() => {
    relevanceAndReplacmentLength !== 0 ||
    relevanceSameModelStateLength !== 0 ||
    notActualReplacementLength !== 0
      ? setErrorStatus(true)
      : setErrorStatus(false);
  }, [
    setErrorStatus,
    relevanceAndReplacmentLength,
    relevanceSameModelStateLength,
    notActualReplacementLength,
  ]);

  useEffect(() => {
    errorStatus
      ? setErrorStatusColor("danger")
      : setErrorStatusColor("success");
  }, [setErrorStatusColor, errorStatus]);

  return (
    <main className="main">
      <ToastContainer className="toast-container p-3" position="bottom-end">
        {validPassword && (
          <>
            {relevanceAndReplacmentLength !== 0 && (
              <ToastMessage
                title="Внимание"
                subtitle="Google sheet"
                errorStatusColor={
                  relevanceAndReplacmentLength !== 0 ? "danger" : "success"
                }
                text={`Нужно исправить ${relevanceAndReplacmentLength} ${formatWord(
                  relevanceAndReplacmentLength,
                  templateWordsError
                )} в категории "${
                  texts.statisticsTabs.relevanceAndReplacment
                }"`}
              />
            )}
            {relevanceSameModelStateLength !== 0 && (
              <ToastMessage
                title="Внимание"
                subtitle="Google sheet"
                errorStatusColor={
                  relevanceSameModelStateLength !== 0 ? "danger" : "success"
                }
                text={`Нужно исправить ${relevanceSameModelStateLength} ${formatWord(
                  relevanceSameModelStateLength,
                  templateWordsError
                )} в категории "${texts.statisticsTabs.relevanceSameModel}"`}
              />
            )}
            {notActualReplacementLength !== 0 && (
              <ToastMessage
                title="Внимание"
                subtitle="Google sheet"
                errorStatusColor={
                  notActualReplacementLength !== 0 ? "danger" : "success"
                }
                text={`Нужно исправить ${notActualReplacementLength} ${formatWord(
                  notActualReplacementLength,
                  templateWordsError
                )} в категории "${texts.statisticsTabs.notActualReplacement}"`}
              />
            )}
          </>
        )}
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
            errorStatus={errorStatusColor}
            password={password}
          />
        </Route>
        {/* <Route exact path="/">
          <About modelsData={modelsData} />
          <Search modelsData={modelsData} />
        </Route> */}
      </Switch>
    </main>
  );
}
