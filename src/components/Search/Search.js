import "./Search.css";
import { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";

export default function Search({ modelsData }) {
  const statusTitle = "Здесь будет указан статус оборудования";
  const [status, setStatus] = useState(statusTitle);
  const [statusModels, setStatusModels] = useState([]);
  const [value, setValue] = useState("");
  const [foundModelsArr, setFoundModelsArr] = useState([]);

  const handleChange = (evt) => {
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

    if (foundModels.length > 5) {
      setStatus(`Моделей найдено: ${foundModels.length}`);
    } else {
      setStatus(false);
      setStatusModels(foundModels);
    }
  };

  const modelsTemplate = (models) => {
    console.log(models);

    const markup = models.map((model, idx) => (
      <Badge key={idx} className="search__badge" bg={model.relevance === 'yes' ? 'success' : 'danger'}>
        {model.model}
      </Badge>
    ));

    return markup;
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
      <div className="search__result-one">
        {status ? status : modelsTemplate(statusModels)}
      </div>
      <span className="search__result-two"></span>
      <span className="search__result-three"></span>
    </form>
  );
}
