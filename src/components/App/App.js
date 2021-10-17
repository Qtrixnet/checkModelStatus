import "./App.css";
import Header from "../Header/Header";
import Footer from '../Footer/Footer';
import Main from "../Main/Main";
import Preloader from '../Preloader/Preloader';
import { useEffect, useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import {baseUrl, faqUrl} from '../../utils/constants';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [password, setPassword] = useState('')
  const [errorLoading, setErrorLoading] = useState(false)

  const [relevanceSameModelState, setRelevanceSameModel] = useState([])
  const [relevanceAndReplacment, setRelevanceAndReplacment] = useState([])
  const [notActualReplacement, setNotActualReplacement] = useState([])

  const [relevanceSameModelStateLength, setRelevanceSameModelLength] = useState(0)
  const [relevanceAndReplacmentLength, setRelevanceAndReplacmentLength] = useState(0)
  const [notActualReplacementLength, setNotActualReplacementLength] = useState(0)

  useEffect(() => {
    setLoading(true)
    fetch(baseUrl)
      .then((res) => res.text())
      .then((text) => {
        //* Убираем лишние символы их строки
        const json = JSON.parse(text.substr(47).slice(0, -2));

        const labels = json.table.cols.map((title) => title.label !== "" ? title.label : 'Техническое поле');
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
        // const newData = initialData.slice(0, 1)
        newData.shift()

        setData(newData)
      })
      .catch(err => {
        console.log(err)
        setErrorLoading(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetch(faqUrl)
      .then((res) => res.text())
      .then((text) => {
        //* Убираем лишние символы их строки
        const json = JSON.parse(text.substr(47).slice(0, -2));
        //* путь до пароля от полученных данных
        setPassword(json.table.rows[0].c[2].v)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    //* Модели, которые заменяются сами на себя
    const relevanceSameModel = []
    data.forEach((model, idx) => {
      model.id = idx;
      return model.model === model.replacement ? relevanceSameModel.push(model) : ''
    })
    setRelevanceSameModel(relevanceSameModel)
    setRelevanceSameModelLength(relevanceSameModel.length)
  }, [data])

  useEffect(() => {
    //* Модели, которые актуальны и заменяются на что либо
    const relevanceAndReplacment = []
    data.forEach(model => model.relevance === 'yes' && model.replacement ? relevanceAndReplacment.push(model) : '')
    setRelevanceAndReplacment(relevanceAndReplacment)
    setRelevanceAndReplacmentLength(relevanceAndReplacment.length)
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
    setNotActualReplacementLength(badReplacement.length)
  }, [data])

  return (
    <div className="App">
      {
        loading ? <Preloader /> : (
          errorLoading ? <ErrorMessage /> : (
            <>
              <Header
                relevanceSameModelStateLength={relevanceSameModelStateLength}
                relevanceAndReplacmentLength={relevanceAndReplacmentLength}
                notActualReplacementLength={notActualReplacementLength}
              />
              <Main
                relevanceAndReplacment={relevanceAndReplacment}
                relevanceSameModelState={relevanceSameModelState}
                notActualReplacement={notActualReplacement}
                relevanceSameModelStateLength={relevanceSameModelStateLength}
                relevanceAndReplacmentLength={relevanceAndReplacmentLength}
                notActualReplacementLength={notActualReplacementLength}
                modelsData={data}
                password={password}
              />
              <Footer modelsData={data}/>
            </>
          )
        )
      }
    </div >
  );
}


