import "./Search.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import { templateWordsNoun } from "../../utils/constants";
import { formatWord } from "../../utils/wordFormatter";
import { relevanceCheck } from '../../utils/relevanceCheck';
import { modelsCount } from '../../utils/constants'

export default function Search({ modelsData }) {

  //! состояния bootstrap
  const [successStatus, setSuccessStatus] = useState('success')
  const [dangerStatus, setDangerStatus] = useState('danger')
  const [warningStatus, setWarningStatus] = useState('warning')

  //! состояние поиска модели
  const [searchModelStatus, setSearchModelStatus] = useState(false);
  const [searchModelStatusText, setSearchModelStatusText] = useState("");
  const [searchModelStatusType, setSearchModelStatusType] = useState("");

  //! состояние актуальности модели
  // const [relevanceText, setRelevanceText] = useState("");
  // const [relevanceStatus, setRelevanceStatus] = useState(false);
  // const [relevanceStatusText, setRelevanceStatusText] = useState("");

  //! состояние ссылки на hikvision
  const [hikvisionLinkStatus, setHikvisionLinkStatus] = useState(false);
  const [hikvisionLink, setHikvisionLink] = useState("");

  //! состояние замены оборудования
  const [replacementText, setReplacementText] = useState("");
  const [replacementStatus, setReplacementStatus] = useState(false);

  // const [status, setStatus] = useState("");
  // const [statusModels, setStatusModels] = useState([]);
  const [foundModelsArr, setFoundModelsArr] = useState([]);

  const [value, setValue] = useState("");

  const clearStatus = () => {
    setSearchModelStatusText('');
    setSearchModelStatusType('');
    setHikvisionLinkStatus(false);
    setHikvisionLink('');
    setReplacementText('');
    setReplacementStatus(false);
    setSearchModelStatus(false);
  }

  const searchModel = (targetValue, modelsData) => {
    clearStatus()
    const foundModels = [];

    // цикл For для прерывания поиска
    for (let i = 0; i < modelsData.length; i++) {

      if (targetValue) {
        if (
          //! Кейс №1 - Если точная модель найдена
          modelsData[i].model.toLowerCase().trim() === targetValue.toLowerCase().trim()
        ) {
          // Кейс №1.1 - Проверяем актуальность
          relevanceCheck(
            modelsData[i],
            setSearchModelStatusText,
            setSearchModelStatusType,
            successStatus,
            dangerStatus,
            setHikvisionLink,
            setHikvisionLinkStatus,
            setReplacementText,
            setReplacementStatus,
          )
          setSearchModelStatus(true)
          break;
        } else if (
          //! Кейс №2 - Если точная модель не найдена, но есть несколько совпадений
          modelsData[i].model
            .toLowerCase()
            .trim()
            .includes(targetValue.toLowerCase().trim()) ||
          targetValue
            .toLowerCase()
            .trim()
            .includes(modelsData[i].model.toLowerCase().trim())
        ) {
          foundModels.push(modelsData[i]);
          if (foundModels.length > 1) {
            setSearchModelStatusText(`Нашлось: ${foundModels.length} ${formatWord(foundModels.length, templateWordsNoun)}`);
            setSearchModelStatusType(warningStatus);
          } else {
            setSearchModelStatusText(`Такой модели не найдено, обратитесь в отдел СВН`);
            setSearchModelStatusType('secondary');
          }
        }
      } else {
        clearStatus()
      }
    }
    setFoundModelsArr(foundModels)
    console.log(foundModels)
  }

  const handleChange = (evt) => {
    const targetValue = evt.target.value;
    setValue(targetValue);
    searchModel(targetValue, modelsData);
    //! DS-2CD2023G2-IU
  };

  const handleBadgeClick = (evt) => {
    setValue(evt.target.textContent)
    document.querySelector(".search__input").value = evt.target.textContent;
    searchModel(evt.target.textContent, modelsData);
    setValue(evt.target.textContent)
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
  };

  return (
    <form className="search">
      <fieldset className="search__field">
        <Form.Group className="search__container" controlId="exampleForm.ControlInput1">
          <Form.Control
            className="search__input"
            onChange={handleChange}
            defaultValue={value}
            type="text"
            placeholder="DS-2CD2023G2-I"
          />

          {/* 
            //! Вывод информации о том, что ничего не найдено
          */}

          {
            foundModelsArr.length === 0 && value !== '' && !searchModelStatus ?
              <Badge as="div" className={`search__relevance`} bg={'danger'}>
                <h2 className="search__result-title">Ничего не найдено, обратитесь в отдел СВН
                </h2>
              </Badge>
              : ''
          }

          {/*
            //! Начальное сообщение
          */}

          {
            foundModelsArr.length === 0 && value === '' ?
              <Badge as="div" className={`search__relevance text-light`} bg={'dark'}>
                <h2 className="search__result-title">
                  Введите интересующую модель в поле выше
                </h2>
              </Badge>
              : ''
          }

          {/* 
            //! Вывод баджиков с похожими моделями
          */}
          <Badge as="div" className={`search__relevance ${searchModelStatusType === 'warning' ? 'text-dark' : 'text-light'}`} bg={searchModelStatusType}>
            <h2 className="search__result-title">
              {searchModelStatusText}
            </h2>
            {foundModelsArr.length > 1 && foundModelsArr.length <= modelsCount ?
              <div className="search__similar-models">
                {foundModelsArr ? modelsTemplate(foundModelsArr) : ''}
              </div> : ''}
          </Badge>

          {/* 
            //! Вывод замены
          */}

          {replacementStatus ?
            <Badge as="div" className={`search__relevance text-light`} bg='secondary'>
              {
                replacementText ?
                  <div className="search__relevance-container">
                    <span className="search__result-title">Замена на:</span>
                    <Badge onClick={handleBadgeClick} className="search__badge text-dark" bg='warning'>
                      {replacementText}
                    </Badge>
                  </div>
                  : 'Рекомендуемой замены нет, обратитесь в отдел СВН'
              }
            </Badge>
            : ''}

          {/* 
            //! Вывод ссылки на Hikvision
          */}

          {
            hikvisionLinkStatus ?
              <Badge as="div" className={`search__relevance ${searchModelStatusType === 'warning' ? 'text-dark' : 'text-light'}`} bg={searchModelStatusType}>
                <a href={hikvisionLink} className="search__relevance-link" target="_blank">Найти на Hikvion.com</a>
              </Badge>
              : ''
          }
        </Form.Group>
      </fieldset>
    </form>
  );
}