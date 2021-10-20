import "./Search.scss";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
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
import Button from "react-bootstrap/Button";

export default function Search({ modelsData }) {
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
            setHiwatchSubstitute
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
          setSearchModelStatusText(
            `${formatWord(foundModels.length, templateWordsVerb)} ${
              foundModels.length
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
    searchModel(targetValue, modelsData);
  };

  const handleBadgeClick = (evt) => {
    clearStatus();
    setValue(evt.target.textContent);
    document.querySelector(".search__input").value = evt.target.textContent;
    searchModel(evt.target.textContent, modelsData);
    setValue(evt.target.textContent);
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
    clearStatus();
    document.querySelector(".search__input").value = "";
  };

  return (
    <form className="search">
      <fieldset className="search__field">
        <Form.Group
          className="search__container"
          controlId="exampleForm.ControlInput1"
        >
          <div className="search__input-container">
            <Button
              onClick={handleClear}
              className="search__input-button"
              variant="light"
            >
              Очистить поле
            </Button>
            <Form.Control
              className="search__input"
              autoComplete="off"
              onChange={handleChange}
              defaultValue={value}
              type="text"
              placeholder="DS-2CD2023G2-I"
            />
          </div>

          {/* 
            //! Вывод информации о том, что ничего не найдено
          */}

          {foundModelsArr.length === 0 && value !== "" && !searchModelStatus && (
            <Badge as="div" className={`search__relevance`} bg={"danger"}>
              <h2 className="search__result-title">
                Ничего не найдено, обратитесь в отдел СВН
              </h2>
            </Badge>
          )}

          {/*
            //! Начальное сообщение
          */}

          {foundModelsArr.length === 0 && value === "" && (
            <Badge
              as="div"
              className={`search__relevance text-light`}
              bg={"dark"}
            >
              <h2 className="search__result-title">
                Введите интересующую модель в поле выше
              </h2>
            </Badge>
          )}

          {/* 
            //! Вывод баджиков с похожими моделями
          */}

          <Badge
            as="div"
            className={`search__relevance ${
              searchModelStatusType === "dark" && "text-light"
            }`}
            bg={searchModelStatusType}
          >
            <h2 className="search__result-title">{searchModelStatusText}</h2>
            {foundModelsArr.length > 0 &&
              foundModelsArr.length <= modelsCount &&
              !exactMatch && (
                <div className="search__similar-models">
                  {foundModelsArr && modelsTemplate(foundModelsArr)}
                </div>
              )}
          </Badge>

          {/* 
            //! Вывод замены
          */}

          {replacementStatus && (
            <Badge
              as="div"
              className={`search__relevance text-light`}
              bg="dark"
            >
              {replacementText ? (
                <div className="search__relevance-container">
                  <span className="search__result-title">
                    Рекомендуемая замена:
                  </span>
                  <Badge
                    onClick={handleBadgeClick}
                    className="search__badge text-dark"
                    bg="warning"
                  >
                    {replacementText}
                  </Badge>
                </div>
              ) : (
                "Рекомендуемой замены нет, обратитесь в отдел СВН"
              )}
            </Badge>
          )}

          {/* 
            //! Вывод ссылки на Hikvision
          */}

          {hikvisionLinkStatus && (
            <Badge
              as="div"
              className={`search__relevance ${
                searchModelStatusType === "warning" ? "text-dark" : "text-light"
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
            </Badge>
          )}

          {/* 
            //! Вывод cубститутов
          */}

          {hasSubstitute && (
            <Badge
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
                    <Badge
                      onClick={handleBadgeClick}
                      className="search__badge text-dark"
                      bg={"warning"}
                    >
                      {hikvisionSubstitute}
                    </Badge>
                  </div>
                )}
                {hilookSubstitute && (
                  <div className="search__substitute">
                    <span className="search__substitute-text">HiLook</span>
                    <Badge
                      onClick={handleBadgeClick}
                      className="search__badge text-dark"
                      bg={"warning"}
                    >
                      {hilookSubstitute}
                    </Badge>
                  </div>
                )}
                {hiwatchSubstitute && (
                  <div className="search__substitute">
                    <span className="search__substitute-text">HiWatch</span>
                    <Badge
                      onClick={handleBadgeClick}
                      className="search__badge text-dark"
                      bg={"warning"}
                    >
                      {hiwatchSubstitute}
                    </Badge>
                  </div>
                )}
              </div>
            </Badge>
          )}
        </Form.Group>
      </fieldset>
    </form>
  );
}
