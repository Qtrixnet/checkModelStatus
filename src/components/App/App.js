import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState } from "react";

export default function App() {
  const spreadsheetId = "148wA9wWJro2mwng84-YKu4LvSgWLnoapIedAZmsk8Uw";
  const baseUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json`;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [relevanceSameModelState, setRelevanceSameModel] = useState([])
  const [relevanceAndReplacment, setRelevanceAndReplacment] = useState([])
  const [notActualReplacement, setNotActualReplacement] = useState([])

  useEffect(() => {
    setLoading(true)
    fetch(baseUrl)
      .then((res) => res.text())
      .then((text) => {
        //* Убираем лишние символы их строки
        const json = JSON.parse(text.substr(47).slice(0, -2));

        const labels = json.table.cols.map((title) => title.label !== "" ? title.label : 'Пустой заголовок');
        const initialModels = json.table.rows;

        const createModelsArr = (initialModels, labels) => {
          return initialModels.map((model) => {
            return Object.assign(
              ...labels.map((n, i) => ({
                [n]: model.c[i] ? model.c[i].v : "",
              }))
            );
          });
        };

        const newData = createModelsArr(initialModels, labels);
        newData.shift()

        setData(newData)

        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [baseUrl])

  useEffect(() => {
    //* Модели, которые заменяются сами на себя
    const relevanceSameModel = []
    data.forEach((model, idx) => {
      model.id = idx;
      return model.model === model.replacement ? relevanceSameModel.push(model) : ''
    })
    setRelevanceSameModel(relevanceSameModel)
  }, [data])

  useEffect(() => {
    //* Модели, которые актуальны и заменяются на что либо
    const relevanceAndReplacment = []
    data.forEach(model => model.relevance === 'yes' && model.replacement ? relevanceAndReplacment.push(model) : '')
    setRelevanceAndReplacment(relevanceAndReplacment)
  }, [data])

  useEffect(() => {
    //* Замены, которых нет в списке актуальных
    const badReplacement = []
    const onlyModelNames = []
    data.forEach(model => onlyModelNames.push(model.model.toLowerCase().trim()))
    data.forEach(model => {
      if (model.replacement) {
        const result = onlyModelNames.indexOf(model.replacement.toLowerCase().trim());
        if (result === -1) {
          badReplacement.push(model)
        }
      }
    })
    setNotActualReplacement(badReplacement)
  }, [data])

  return (
    <div className="App">
      {!loading ? (
        <>
          <Header relevanceAndReplacment={relevanceAndReplacment} relevanceSameModelState={relevanceSameModelState} notActualReplacement={notActualReplacement} />
          <Main relevanceAndReplacment={relevanceAndReplacment} relevanceSameModelState={relevanceSameModelState} notActualReplacement={notActualReplacement} modelsData={data} />
        </>
      ) : (
        <div className="loading">
          <h1 className="loading__title">Загружаемся</h1>
          <Spinner animation="border" variant="light" className="loading__spinner" />
        </div>
      )}
    </div>
  );
}
