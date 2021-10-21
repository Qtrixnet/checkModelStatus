import "./Main.scss";
import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import About from "../About/About";
import Search from "../Search/Search";
import Statistics from "../Statistics/Statistics";
// import ToastMessage from "../ToastMessage/ToastMessage";
// import ToastContainer from "react-bootstrap/ToastContainer";
import { texts, templateWordsError } from "../../utils/constants";
import { formatWord } from "../../utils/wordFormatter";

export default function Main({
  modelsData,
  relevanceAndReplacment = [],
  relevanceSameModel = [],
  notValidReplacement = [],
  relevanceAndReplacmentLength = 0,
  relevanceSameModelLength = 0,
  notValidReplacementLength = 0,
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
    relevanceSameModelLength !== 0 ||
    notValidReplacementLength !== 0
      ? setErrorStatus(true)
      : setErrorStatus(false);
  }, [
    setErrorStatus,
    relevanceAndReplacmentLength,
    relevanceSameModelLength,
    notValidReplacementLength,
  ]);

  useEffect(() => {
    errorStatus
      ? setErrorStatusColor("danger")
      : setErrorStatusColor("success");
  }, [setErrorStatusColor, errorStatus]);

  return (
    <main className="main">
      {/* <ToastContainer className="toast-container p-3" position="bottom-end">
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
            {relevanceSameModelLength !== 0 && (
              <ToastMessage
                title="Внимание"
                subtitle="Google sheet"
                errorStatusColor={
                  relevanceSameModelLength !== 0 ? "danger" : "success"
                }
                text={`Нужно исправить ${relevanceSameModelLength} ${formatWord(
                  relevanceSameModelLength,
                  templateWordsError
                )} в категории "${texts.statisticsTabs.relevanceSameModel}"`}
              />
            )}
            {notValidReplacementLength !== 0 && (
              <ToastMessage
                title="Внимание"
                subtitle="Google sheet"
                errorStatusColor={
                  notValidReplacementLength !== 0 ? "danger" : "success"
                }
                text={`Нужно исправить ${notValidReplacementLength} ${formatWord(
                  notValidReplacementLength,
                  templateWordsError
                )} в категории "${texts.statisticsTabs.notValidReplacement}"`}
              />
            )}
          </>
        )}
      </ToastContainer> */}
      <Switch>
        <Route exact path="/">
          <About modelsData={modelsData} />
          <Search modelsData={modelsData} />
        </Route>
        <Route path="/statistics">
          <Statistics
            relevanceAndReplacment={relevanceAndReplacment}
            relevanceSameModel={relevanceSameModel}
            notValidReplacement={notValidReplacement}
            relevanceSameModelLength={relevanceSameModelLength}
            relevanceAndReplacmentLength={relevanceAndReplacmentLength}
            notValidReplacementLength={notValidReplacementLength}
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
