import "./Search.scss";
import { useState, useContext } from "react";
import {
  templateWordsNoun,
  templateWordsVerb,
  templateWordsAdjective,
} from "../../utils/constants";
import { formatWord } from "../../utils/wordFormatter";
import { relevanceCheck } from "../../utils/relevanceCheck";
import {
  modelsCount,
} from "../../utils/constants";
import CurrentModelsContext from '../../contexts/currentModelsContext';
import SearchInfo from './SearchInfo/SearchInfo';

export default function Search() {
  //! состояние субститутов модели

  const [hasSubstitute, setHasSubstitute] = useState(false);
  const [hikvisionSubstitute, setHikvisionSubstitute] = useState("");
  const [hilookSubstitute, setHilookSubstitute] = useState("");
  const [hiwatchSubstitute, setHiwatchSubstitute] = useState("");

  //! состояние поиска модели
  const [searchModelStatus, setSearchModelStatus] = useState(false);
  const [searchModelStatusText, setSearchModelStatusText] = useState("");
  const [searchModelStatusType, setSearchModelStatusType] = useState("");

  //! состояние ссылки на hikvision
  const [hikvisionLinkStatus, setHikvisionLinkStatus] = useState(false);
  const [hikvisionLink, setHikvisionLink] = useState("");

  //! состояние замены оборудования
  const [replacementText, setReplacementText] = useState("");
  const [replacementStatus, setReplacementStatus] = useState(false);

  const [foundModelsArr, setFoundModelsArr] = useState([]);

  const [value, setValue] = useState("");

  const [exactMatch, setExactMatch] = useState(false);

  const currentModels = useContext(CurrentModelsContext);


  //! начальное состояние
  const [searchInfoTitle, setSearchInfoTitle] = useState('Введите интересующую модель в поле выше')

  const clearStatus = () => {
    setSearchModelStatusText("");
    setSearchModelStatusType("");
    setHikvisionLinkStatus(false);
    setHikvisionLink("");
    setReplacementText("");
    setReplacementStatus(false);
    setSearchModelStatus(false);
    setHasSubstitute(false);
    setHikvisionSubstitute("");
    setHilookSubstitute("");
    setHiwatchSubstitute("");
    setFoundModelsArr([]);
    setValue("");
    setExactMatch(false);
    setSearchInfoTitle('Введите интересующую модель в поле выше')
  };

  const searchModel = (targetValue, modelsData) => {
    const foundModels = [];

    // цикл For для прерывания поиска
    for (let i = 0; i < modelsData.length; i++) {
      if (targetValue) {
        if (
          //! Кейс №1 - Если точная модель найдена
          modelsData[i].model.toLowerCase().trim() ===
          targetValue.toLowerCase().trim()
        ) {
          // Кейс №1.1 - Проверяем актуальность
          relevanceCheck(
            modelsData[i],
            setSearchModelStatusText,
            setSearchModelStatusType,
            setHikvisionLink,
            setHikvisionLinkStatus,
            setReplacementText,
            setReplacementStatus,
            setHasSubstitute,
            setHikvisionSubstitute,
            setHilookSubstitute,
            setHiwatchSubstitute,
            setSearchInfoTitle
          );
          setExactMatch(true);
          setSearchModelStatus(true);
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
          setSearchInfoTitle(
            `${formatWord(foundModels.length, templateWordsVerb)} ${foundModels.length
            } ${formatWord(
              foundModels.length,
              templateWordsAdjective
            )} ${formatWord(foundModels.length, templateWordsNoun)}`
          )

          setSearchModelStatusText(
            `${formatWord(foundModels.length, templateWordsVerb)} ${foundModels.length
            } ${formatWord(
              foundModels.length,
              templateWordsAdjective
            )} ${formatWord(foundModels.length, templateWordsNoun)}`
          );
          setSearchModelStatusType('dark');
        }
      }
    }
    setFoundModelsArr(foundModels);
  };

  const handleChange = (evt) => {
    clearStatus();
    const targetValue = evt.target.value;
    setValue(targetValue);
    searchModel(targetValue, currentModels);
    // targetValue === '' && setSearchInfoTitle('Введите интересующую модель в поле выше')
  };

  const handleBadgeClick = (evt) => {
    clearStatus();
    setValue(evt.target.textContent);
    document.querySelector(".search__input").value = evt.target.textContent;
    searchModel(evt.target.textContent, currentModels);
    setValue(evt.target.textContent);
  };

  const modelsTemplate = (models) => {
    return models.map((model, idx) => (
      <div
        key={idx}
        onClick={handleBadgeClick}
        className="search__badge"
        bg={model.relevance === "yes" ? "success" : "danger"}
      >
        {model.model}
      </div>
    ));
  };

  const handleClear = (evt) => {
    clearStatus();
    document.querySelector(".search__input").value = "";
  };

  return (
    <form className="search">
      <fieldset className="search__field">
        <div
          className="search__container"
        >
          <div className="search__input-container">
            <button
              onClick={handleClear}
              className="search__input-button"
              disabled={value === '' ? 'disabled' : null}
            >
              Очистить поле
            </button>
            <input
              className="search__input"
              autoComplete="off"
              onChange={handleChange}
              value={value}
              type="text"
              placeholder="Например: DS-2CD2023G2-I или 2023"
            />
          </div>

          {/*
            //! ТЕСТОВОЕ СООБЩЕНИЕ, ОДНО ДЛЯ ВСЕХ
          */}

          <SearchInfo
            value={value}
            foundModelsArr={foundModelsArr}
            title={searchInfoTitle}
            handleBadgeClick={handleBadgeClick}
            searchModelStatus={searchModelStatus}
            hikvisionLink={hikvisionLink}
            searchModelStatusType={searchModelStatusType}
          />

          {/* 
            //! Вывод информации о том, что ничего не найдено
          */}
          {console.log(searchModelStatus)}
          {foundModelsArr.length === 0 && value !== "" && !searchModelStatus && (
            <div as="div" className={`search__relevance`} bg={"danger"}>
              <h2 className="search__result-title">
                Ничего не найдено, обратитесь в отдел СВН
              </h2>
            </div>
          )}

          {/*
            //! Начальное сообщение
          */}

          {foundModelsArr.length === 0 && value === "" && (
            <div
              className='search__info'
            >
              <h2 className="search__result-title">
                Введите интересующую модель в поле выше
              </h2>
            </div>
          )}


          {/* 
            //! Вывод баджиков с похожими моделями
          */}

          {
            value !== '' && (<div
              className={`search__info`}
            >
              <h2 className="search__result-title">{searchModelStatusText}</h2>
              {foundModelsArr.length > 0 &&
                foundModelsArr.length <= modelsCount &&
                !exactMatch && (
                  <div className="search__similar-models">
                    {foundModelsArr && modelsTemplate(foundModelsArr)}
                  </div>
                )}
            </div>)
          }




          {/* 
            //! Вывод замены
          */}

          {replacementStatus && (
            <div
              as="div"
              className={`search__relevance text-light`}
              bg="dark"
            >
              {replacementText ? (
                <div className="search__relevance-container">
                  <span className="search__result-title">
                    Рекомендуемая замена:
                  </span>
                  <div
                    onClick={handleBadgeClick}
                    className="search__badge text-dark"
                    bg="warning"
                  >
                    {replacementText}
                  </div>
                </div>
              ) : (
                "Рекомендуемой замены нет, обратитесь в отдел СВН"
              )}
            </div>
          )}

          {/* 
            //! Вывод ссылки на Hikvision
          */}

          {hikvisionLinkStatus && (
            <div
              as="div"
              className={`search__relevance ${searchModelStatusType === "warning" ? "text-dark" : "text-light"
                }`}
              bg={searchModelStatusType}
            >
              <a
                href={hikvisionLink}
                rel="noreferrer"
                className="search__relevance-link"
                target="_blank"
              >
                Найти на Hikvision.com
              </a>
            </div>
          )}

          {/* 
            //! Вывод cубститутов
          */}

          {hasSubstitute && (
            <div
              as="div"
              className={`search__relevance text-light`}
              bg="dark"
            >
              <h2 className="search__result-title">
                У этой модели также есть аналоги на других брендах:
              </h2>
              <div className="search__substitute-container">
                {hikvisionSubstitute && (
                  <div className="search__substitute">
                    <span className="search__substitute-text">Hikvision</span>
                    <div
                      onClick={handleBadgeClick}
                      className="search__badge text-dark"
                      bg={"warning"}
                    >
                      {hikvisionSubstitute}
                    </div>
                  </div>
                )}
                {hilookSubstitute && (
                  <div className="search__substitute">
                    <span className="search__substitute-text">HiLook</span>
                    <div
                      onClick={handleBadgeClick}
                      className="search__badge text-dark"
                      bg={"warning"}
                    >
                      {hilookSubstitute}
                    </div>
                  </div>
                )}
                {hiwatchSubstitute && (
                  <div className="search__substitute">
                    <span className="search__substitute-text">HiWatch</span>
                    <div
                      onClick={handleBadgeClick}
                      className="search__badge text-dark"
                      bg={"warning"}
                    >
                      {hiwatchSubstitute}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </fieldset>
    </form>
  );
}
