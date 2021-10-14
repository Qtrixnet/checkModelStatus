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
                [n]: model.c[i] ? model.c[i].v : "Ячейка не заполнена",
              }))
            );
          });
        };
    
        const newData = createModelsArr(initialModels, labels);

        setData(newData)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className="App">
      {!loading ? (
        <>
          <Header />
          <Main modelsData={data} />
        </>
      ) : (
        <div className="loading">
          <h1 className="loading__title">Загружаемся</h1>
          <Spinner animation="border" variant="success" />
        </div>
      )}
    </div>
  );
}
