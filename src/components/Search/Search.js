import "./Search.scss";
import { useState, useContext } from "react";
import {
  templateWordsNoun,
  templateWordsVerb,
  templateWordsAdjective,
} from "../../utils/constants";
import { formatWord } from "../../utils/wordFormatter";
import { relevanceCheck } from "../../utils/relevanceCheck";
import CurrentModelsContext from "../../contexts/currentModelsContext";
import SearchInfo from "./SearchInfo/SearchInfo";

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
  const [replacementModel, setReplacementModel] = useState("");
  const [replacementStatus, setReplacementStatus] = useState(false);

  const [foundModelsArr, setFoundModelsArr] = useState([]);

  const [value, setValue] = useState("");

  const [exactMatch, setExactMatch] = useState(false);

  const currentModels = useContext(CurrentModelsContext);

  //! начальное состояние
  const [searchInfoTitle, setSearchInfoTitle] = useState(
    "Введите интересующую модель в поле выше"
  );

  const clearStatus = () => {
    setSearchModelStatusText("");
    setSearchModelStatusType("");
    setHikvisionLinkStatus(false);
    setHikvisionLink("");
    setReplacementModel("");
    setReplacementStatus(false);
    setSearchModelStatus(false);
    setHasSubstitute(false);
    setHikvisionSubstitute("");
    setHilookSubstitute("");
    setHiwatchSubstitute("");
    setFoundModelsArr([]);
    setValue("");
    setExactMatch(false);
    setSearchInfoTitle("Введите интересующую модель в поле выше");
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
            setReplacementModel,
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
            `${formatWord(foundModels.length, templateWordsVerb)} ${
              foundModels.length
            } ${formatWord(
              foundModels.length,
              templateWordsAdjective
            )} ${formatWord(foundModels.length, templateWordsNoun)}`
          );

          setSearchModelStatusText(
            `${formatWord(foundModels.length, templateWordsVerb)} ${
              foundModels.length
            } ${formatWord(
              foundModels.length,
              templateWordsAdjective
            )} ${formatWord(foundModels.length, templateWordsNoun)}`
          );
          setSearchModelStatusType("dark");
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
  };

  const handleBadgeClick = (evt) => {
    clearStatus();
    setValue(evt.target.textContent);
    document.querySelector(".search__input").value = evt.target.textContent;
    searchModel(evt.target.textContent, currentModels);
  };

  const handleClear = (evt) => {
    clearStatus();
    document.querySelector(".search__input").value = "";
  };

  return (
    <form className="search">
      <fieldset className="search__field">
        <div className="search__container">
          <div className="search__input-container">
            <button
              onClick={handleClear}
              className="search__input-button"
              disabled={value === "" ? "disabled" : null}
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
           //* Информационное сообщщение о статусе поиска
          */}

          <SearchInfo
            value={value}
            foundModelsArr={foundModelsArr}
            title={searchInfoTitle}
            handleBadgeClick={handleBadgeClick}
            searchModelStatus={searchModelStatus}
            hikvisionLink={hikvisionLink}
            searchModelStatusType={searchModelStatusType}
            replacementModel={replacementModel}
            replacementStatus={replacementStatus}
            hasSubstitute={hasSubstitute}
            hikvisionSubstitute={hikvisionSubstitute}
            hilookSubstitute={hilookSubstitute}
            hiwatchSubstitute={hiwatchSubstitute}
            exactMatch={exactMatch}
          />
        </div>
      </fieldset>
    </form>
  );
}
