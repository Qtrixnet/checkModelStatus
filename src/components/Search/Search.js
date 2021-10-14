import "./Search.css";
import { useState } from "react";
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Badge from "react-bootstrap/Badge";
import { templateWordsNoun } from '../utils/constants';
import { formatWord } from '../utils/wordFormatter';
import Alert from 'react-bootstrap/Alert';

export default function Search({ modelsData }) {

  

  const [status, setStatus] = useState('');

  const [relevance, setRelevance] = useState('');
  const [relevanceStatus, setRelevanceStatus] = useState('')
  const [hikvisionLink, setHikvisionLink] = useState(true);

  const [statusModels, setStatusModels] = useState([]);
  const [value, setValue] = useState("");
  const [foundModelsArr, setFoundModelsArr] = useState([]);

  const handleChange = (evt) => {
    // console.log(evt.target.value)
    const targetValue = evt.target.value;
    setValue(targetValue);
    setRelevance('')
    setRelevanceStatus('')
    // if (value === "") {
    //   setStatus('')
    //   console.log('пустое поле')
    // }
    // DS-2CD2023G2-IU
    const foundModels = [];


    modelsData.forEach((model) => {
      if (targetValue.toLowerCase() === model.model.toLowerCase()) {
        if (model.relevance === 'yes') {
          setRelevance(`Модель ${model.model} доступна к заказу`)
          setRelevanceStatus('success')
          setHikvisionLink(`https://www.hikvision.com/en/search/?q=${model.model}`)
        } else if (model.relevance === 'no') {
          setRelevance(`Модель ${model.model} не доступна к заказу`)
          setRelevanceStatus('danger')
        }
        return
      } else if (
        model.model.toLowerCase().includes(targetValue.toLowerCase()) ||
        targetValue.toLowerCase().includes(model.model.toLowerCase())
      ) {
        foundModels.push(model);
        return
      } else {
        setStatus('Ничего не нашлось')
      }
    });

    console.log(foundModels)

    setFoundModelsArr(foundModels);

    // if (foundModels.length === 1) {
    //   // setRelevance("точная модель найдена");
    // } else if (foundModels.length > 15) {
    //   setStatus(`По такому запросу нашлось: ${foundModels.length} ${formatWord(foundModels.length, templateWordsNoun)}, пишите точнее`);
    // } else {
    //   setStatus(false);
    //   setStatusModels(foundModels);
    // }
  };

  const handleBadgeClick = (evt) => {
    document.querySelector('.search__input').value = evt.target.textContent;
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
          <Form.Label className="mb-3 search__title">Введите интересующую модель</Form.Label>
          <Form.Control className="search__input" onChange={handleChange} value={value} type="text" placeholder="DS-2CD2023G2-I" />
        </Form.Group>
      </fieldset>



      {/* {foundModelsArr.length >= 2 ?
        <div className="search__similar-models">
          {status ? modelsTemplate(statusModels) : ''}
        </div> : ''} */}



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
{/* <Alert className="search__relevance" variant={relevanceStatus}>
  {relevance}
</Alert> */}

// Ссылка на хиквижн
{/* <Link target="_blank" className="search__link" to={hikvisionLink}>Искать на Hikvision.com</Link> */ }

// Аналог на другом бренде


