import "./Search.css";
import { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import { templateWordsNoun } from '../utils/constants';
import { formatWord } from '../utils/wordFormatter';

export default function Search({ modelsData }) {
  const statusTitle = "Здесь будет указан статус оборудования";
  const [status, setStatus] = useState(statusTitle);
  const [relevance, setRelevance] = useState("");
  const [statusModels, setStatusModels] = useState([]);
  const [value, setValue] = useState("");
  const [foundModelsArr, setFoundModelsArr] = useState([]);

  const handleChange = (evt) => {
    console.log("проверяем");
    const targetValue = evt.target.value;
    setValue(targetValue);

    const foundModels = [];

    modelsData.forEach((model) => {
      if (
        model.model.toLowerCase().includes(targetValue.toLowerCase()) ||
        targetValue.toLowerCase().includes(model.model.toLowerCase())
      ) {
        foundModels.push(model);
      }
    });

    setFoundModelsArr(foundModels);

    if (foundModels.length === 1) {
      setRelevance("точная модель найдена");
    } else if (foundModels.length > 15) {
      setStatus(`По такому запросу нашлось: ${foundModels.length} ${formatWord(foundModels.length, templateWordsNoun)}, укажите модель точнее`);
    } else {
      setStatus(false);
      setStatusModels(foundModels);
    }
  };

  const handleBadgeClick = (evt) => {
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
    evt.preventDefault();
    setValue("");
    setStatus(statusTitle);
  };

  return (
    <form className="search">
      <fieldset className="search__field">
        <input
          className="search__submit"
          onClick={handleClear}
          type="submit"
          value="Очистить"
        />
        <input
          className="search__input"
          onChange={handleChange}
          placeholder="DS-2CD2023G2-I"
          value={value}
          required
          type="text"
        />
      </fieldset>
      <span className="search__relevance">{relevance}</span>
      <div className="search__similar-models">
        {status ? status : modelsTemplate(statusModels)}
      </div>
      <span className="search__result-three"></span>
    </form>
  );
}
