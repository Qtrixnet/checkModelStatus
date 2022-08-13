import "./App.scss";
import { useEffect, useState } from "react";
import { baseUrl, faqUrl } from "../../utils/constants";
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Preloader from "../Preloader/Preloader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import PopupContainer from '../PopupContainer/PopupContainer';
import CurrentModelsContext from '../../contexts/currentModelsContext';
import RelevanceSameModelContext from '../../contexts/relevanceSameModelContext';
import RelevanceAndReplacmentContext from '../../contexts/relevanceAndReplacmentContext';
import NotValidReplacementContext from '../../contexts/notValidReplacementContext';
import DuplicatesContext from "../../contexts/duplicatesContext";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [password, setPassword] = useState("");
  const [errorLoading, setErrorLoading] = useState(false);

  const [relevanceSameModel, setRelevanceSameModel] = useState([]);
  const [relevanceAndReplacment, setRelevanceAndReplacment] = useState([]);
  const [notValidReplacement, setNotValidReplacement] = useState([]);
  const [duplicates, setDuplicates] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(baseUrl)
      .then((res) => res.text())
      .then((text) => {
        //* Убираем лишние символы их строки
        const json = JSON.parse(text.substr(47).slice(0, -2));

        const labels = json.table.cols.map((title) =>
          title.label !== "" ? title.label : "Техническое поле"
        );
        const initialModels = json.table.rows;

        const createModelsArr = (initialModels, labels) => {
          return initialModels.map((model) => {
            return Object.assign(
              ...labels.map((n, i) => ({
                [n]: model.c[i] ? model.c[i].v : false,
              }))
            );
          });
        };

        const newData = createModelsArr(initialModels, labels);

        // const initialData = createModelsArr(initialModels, labels);
        // const newData = initialData.slice(0, 400)
        newData.shift();

        setData(newData);
      })
      .catch((err) => {
        console.log(err);
        setErrorLoading(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(faqUrl)
      .then((res) => res.text())
      .then((text) => {
        //* Убираем лишние символы их строки
        const json = JSON.parse(text.substr(47).slice(0, -2));
        //* путь до пароля от полученных данных
        setPassword(json.table.rows[0].c[2].v);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    //* Модели, которые заменяются сами на себя
    const relevanceSameModel = [];
    data.forEach((model, idx) => {
      model.id = idx;
      return (
        model.model === model.replacement && relevanceSameModel.push(model)
      );
    });
    setRelevanceSameModel(relevanceSameModel);
  }, [data]);

  useEffect(() => {
    //* Модели, которые актуальны и заменяются на что либо
    const relevanceAndReplacment = [];
    data.forEach(
      (model) =>
        model.relevance === "yes" &&
        model.replacement &&
        relevanceAndReplacment.push(model)
    );
    setRelevanceAndReplacment(relevanceAndReplacment);
  }, [data]);

  useEffect(() => {
    //* Замены, которых нет в списке актуальных
    const badReplacement = [];
    const onlyModelNames = [];
    data.forEach((model) =>
      onlyModelNames.push(model.model.toLowerCase().trim())
    );
    data.forEach((model) => {
      if (model.replacement) {
        const result = onlyModelNames.indexOf(
          model.replacement.toLowerCase().trim()
        );
        if (result === -1) {
          badReplacement.push(model);
        }
      }
    });
    setNotValidReplacement(badReplacement);
  }, [data]);

  useEffect(() => {
    //* Поиск дубликатов
    const duplicates = [];
    const modelCounts = {};
    
    data.forEach((data) => {
      if(!modelCounts[data.model]) {
        modelCounts[data.model] = 1;
      } else {
        modelCounts[data.model] += 1;
      }
    })

    for(let model in modelCounts) {
      if(modelCounts[model] > 1) {
        duplicates.push({
          model,
          count: modelCounts[model]
        });
      }
    }
    setDuplicates(duplicates);

  }, [data]);

  return (
    <div className="App">
      {loading ? (
        <Preloader />
      ) : errorLoading ? (
        <ErrorMessage />
      ) : (
        <>
          <CurrentModelsContext.Provider value={data}>
            <RelevanceSameModelContext.Provider value={relevanceSameModel}>
              <RelevanceAndReplacmentContext.Provider value={relevanceAndReplacment}>
                <NotValidReplacementContext.Provider value={notValidReplacement}>
                  <DuplicatesContext.Provider value={duplicates}>
                    <Header />
                    <ScrollToTop />
                    <Main password={password} />
                    <PopupContainer />
                    <Footer />
                  </DuplicatesContext.Provider>
                </NotValidReplacementContext.Provider>
              </RelevanceAndReplacmentContext.Provider>
            </RelevanceSameModelContext.Provider>
          </CurrentModelsContext.Provider>
        </>
      )}
    </div>
  );
}
