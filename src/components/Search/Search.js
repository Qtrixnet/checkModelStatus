import "./Search.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import { templateWordsNoun } from "../utils/constants";
import { formatWord } from "../utils/wordFormatter";
import Alert from "react-bootstrap/Alert";

export default function Search({ modelsData }) {

  console.log(modelsData)

  // const mainInput = document.querySelector('.search__input')
  // mainInput.addEventListener('change', (evt) => {
  //   console.log(evt.target.value)
  // })

  //! состояния bootstrap
  const [successStatus, setSuccessStatus] = useState('success')
  const [dangerStatus, setDangerStatus] = useState('danger')
  const [warningStatus, setWarningStatus] = useState('warning')

  //! состояние поиска модели
  // const [searchModelStatus, setSearchModelStatus] = useState(false);
  const [searchModelStatusText, setSearchModelStatusText] = useState("");
  const [searchModelStatusType, setSearchModelStatusType] = useState("");

  //! состояние актуальности модели
  const [relevanceText, setRelevanceText] = useState("");
  const [relevanceStatus, setRelevanceStatus] = useState(false);
  const [relevanceStatusText, setRelevanceStatusText] = useState("");

  //! состояние ссылки на hikvision
  const [hikvisionLinkStatus, setHikvisionLinkStatus] = useState(false);
  const [hikvisionLink, setHikvisionLink] = useState("");

  //! состояние замены оборудования
  const [replacementText, setReplacementText] = useState("");
  const [perlacementStatus, setReplacementStatus] = useState(false);

  const [status, setStatus] = useState("");
  const [statusModels, setStatusModels] = useState([]);
  const [value, setValue] = useState("");
  const [foundModelsArr, setFoundModelsArr] = useState([]);

  const clearStatus = () => {
    setSearchModelStatusText('')
    setSearchModelStatusType('')
    setHikvisionLinkStatus(false);
    setHikvisionLink('');
  }

  const foundModelRelevanceCheck = (model) => {
    if (model.relevance === "yes") {
      //! Если точная модель актуальна
      setSearchModelStatusText(false)
      setRelevanceText(`Модель ${model.model} доступна к заказу`);
      setRelevanceStatusText("success");
      setRelevanceStatus(true);
      setHikvisionLinkStatus(true);
      setHikvisionLink(`https://www.hikvision.com/en/search/?q=${model.model}`);
      console.log(`${model.model} - актуальна`);
    } else if (model.relevance === "no") {
      //! если точная модель не актуальна
      setSearchModelStatusText(false)
      setRelevanceText(`Модель ${model.model} не доступна к заказу`);
      setRelevanceStatusText("danger");
      setRelevanceStatus(false);
      console.log(`${model.model} - не актуальна`);
    }
  };

  const searchModel2 = (targetValue, modelsData) => {
    const foundModels = [];
    modelsData.forEach((model) => {
      // if (targetValue.toLowerCase().trim() === model.model.toLowerCase().trim()) {
      //   //! Если найдена точная модель
      //   console.log("найдена точная модель");
      //   //! Проверяем на актуальность
      //   foundModelRelevanceCheck(model);
      // } else
      if (
        model.model
          .toLowerCase()
          .trim()
          .includes(targetValue.toLowerCase().trim()) ||
        targetValue
          .toLowerCase()
          .trim()
          .includes(model.model.toLowerCase().trim())
      ) {
        foundModels.push(model);
        //! Если найдены похожие модели
        // console.log("найдена похожая");
        setSearchModelStatusText("Нашлось несколько похожих моделей");
        setSearchModelStatusType('warning')
        if (
          targetValue.toLowerCase().trim() === model.model.toLowerCase().trim()
        ) {
          //! Если найдена точная модель
          // console.log("найдена точная модель");
          //! Проверяем на актуальность
          foundModelRelevanceCheck(model);
        } else {
          // foundModels.push(model)
        }
      } else {
        // console.log("ничего не найдено");
        setSearchModelStatusText(
          "Ничего не найдено, уточните модель в отделе СВН"
        );
        setSearchModelStatusType('danger')
      }
    });

    console.log(foundModels);
  };



  const searchModel = (targetValue, modelsData) => {
    // console.log(targetValue, modelsData)
    const foundModels = [];
    clearStatus()
    modelsData.forEach((model) => {
      //* Если поле ввода не пустое
      if (document.querySelector('.search__input').value !== '') {
        //* Если введенная модель точно совпадает с найденной
        if (model.model.toLowerCase().trim() === targetValue.toLowerCase().trim()) {
          //* Проверка на актуальность
          if (model.relevance === 'yes') {
            setSearchModelStatusText(`Модель ${model.model} доступна к заказу`)
            setSearchModelStatusType(successStatus)
            setHikvisionLinkStatus(true);
            setHikvisionLink(`https://www.hikvision.com/en/search/?q=${model.model}`);
          } else {
            setSearchModelStatusText(`Модель ${model.model} снята с производста`)
            setSearchModelStatusType(dangerStatus)
          }
          return
          //* Либо, если найдены похожие
        } else if (model.model
          .toLowerCase()
          .trim()
          .includes(targetValue.toLowerCase().trim()) ||
          targetValue
            .toLowerCase()
            .trim()
            .includes(model.model.toLowerCase().trim())) {
          foundModels.push(model);
          setSearchModelStatusText(`Нашлось: ${foundModels.length} похожих ${formatWord(foundModels.length, templateWordsNoun)}, пишите точнее`);
          setSearchModelStatusType(warningStatus);
          return
        } else {
          //* Если не найдено ничего
          // console.log(model)
          // setSearchModelStatusText(`Модель не найдена`)
          // setSearchModelStatusType(dangerStatus)
        }
      } else {
        clearStatus()
      }
    })
    setFoundModelsArr(foundModels)
    // console.log(foundModels)

  }

  const handleChange = (evt) => {
    // console.log(evt.target.value);
    const targetValue = evt.target.value;
    setValue(targetValue);
    //! DS-2CD2023G2-IU

    // const foundModels = [];
    

    searchModel(targetValue, modelsData);

    // searchModel(targetValue, modelsData);

    // console.log(foundModels);

    // setFoundModelsArr(foundModels);

    // if (foundModels.length === 1) {
    //   // setRelevanceText("точная модель найдена");
    // } else if (foundModels.length > 15) {
    //   setStatus(`По такому запросу нашлось: ${foundModels.length} ${formatWord(foundModels.length, templateWordsNoun)}, пишите точнее`);
    // } else {
    //   setStatus(false);
    //   setStatusModels(foundModels);
    // }
  };

  const handleBadgeClick = (evt) => {
    setValue(evt.target.textContent)
    // document.querySelector(".search__input").value = evt.target.textContent;
    searchModel(evt.target.textContent, modelsData);
  };

  const modelsTemplate = (models) => {
    return models.map((model, idx) => (
      <Badge
        key={idx}
        onClick={handleBadgeClick}
        className="search__badge"
        bg={model.relevance === "yes" ? "success" : "danger"}
      >
        {model.model}
      </Badge>
    ));
  };

  const handleClear = (evt) => {
    evt.preventDefault();
    console.log(evt.target);
    // setStatus(statusTitle);
  };

  return (
    <form className="search">
      <fieldset className="search__field">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="mb-3 search__title">
            Введите интересующую модель
          </Form.Label>
          <Form.Control
            className="search__input"
            onChange={handleChange}
            value={value}
            type="text"
            placeholder="DS-2CD2023G2-I"
          />
          {foundModelsArr.length > 1 && foundModelsArr.length <= 15 ?
            <div className="search__similar-models">
              {foundModelsArr ? modelsTemplate(foundModelsArr) : ''}
            </div> : ''}
          <Alert className="search__relevance" variant={searchModelStatusType}>
            {searchModelStatusText}
          </Alert>
        </Form.Group>
      </fieldset>


      {/* <span className="search__relevance">{relevance}</span> */}
      {/* <span className="search__result-three"></span> */}

      {/* {relevance ? <Alert className="search__relevance" variant={relevanceStatus}>
        {relevance}
      </Alert> : ''} */}

      {/* {relevance ? <Link target="_blank" className="search__link" to={hikvisionLink}>Искать на Hikvision.com</Link> : ''} */}

      {/* {value === '' ?
        <>
          {
            foundModelsArr.length === 0 ? <Alert className="search__relevance" variant="danger">
              Такой модели не нашлось, уточните в отделе СВН
            </Alert> : ''
          }
        </>
        : ''
      } */}
    </form>
  );
}

// Модель актуальна / модель не актуальна
{
  /* <Alert className="search__relevance" variant={relevanceStatus}>
  {relevance}
</Alert> */
}

// Ссылка на хиквижн
{
  /* <Link target="_blank" className="search__link" to={hikvisionLink}>Искать на Hikvision.com</Link> */
}

// Аналог на другом бренде
