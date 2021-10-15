import "./Header.css";
import { NavLink } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
// import FormControl from 'react-bootstrap/FormControl'

export default function Header() {
  const savedBackgroundColor = localStorage.getItem("bg-color");
  const savedTextColor = localStorage.getItem("text-color");
  const savedAccentColor = localStorage.getItem("accent-color");
  const appBlock = document.querySelector(".App");
  // const headerBlock = document.querySelector(".header");

  const property = appBlock.style.getPropertyValue("--accent");

  // console.log(property)

  const [initialBgColor, setInitialBgColor] = useState('')
  const [initialTextColor, setInitialTextColor] = useState('') 
  const [initialAccentColor, setInitialAccentColor] = useState('') 

  const [bgColor, setBgColor] = useState(savedBackgroundColor);
  const [textColor, setTextColor] = useState(savedTextColor);
  const [accentColor, setAccentColor] = useState(savedAccentColor);

  useEffect(() => {
    if (savedBackgroundColor && appBlock) {
      appBlock.style.backgroundColor = savedBackgroundColor;
      document.querySelector(".header").style.backgroundColor =
        savedBackgroundColor;
      setBgColor(savedBackgroundColor);
    }

    if (savedTextColor && appBlock) {
      appBlock.style.color = savedTextColor;
      setTextColor(savedTextColor);
    }

    if (savedAccentColor && appBlock) {
      appBlock.style.setProperty("--accent", savedAccentColor);
      setAccentColor(savedAccentColor);
    }
  }, []);

  const handleBgColor = (evt) => {
    const value = evt.target.value;
    appBlock.style.backgroundColor = value;
    document.querySelector(".header").style.backgroundColor = value;
    localStorage.setItem("bg-color", value);
  };

  const handleTextColor = (evt) => {
    const value = evt.target.value;
    appBlock.style.color = value;
    localStorage.setItem("text-color", value);
  };

  const handleAccentColor = (evt) => {
    const value = evt.target.value;
    // appBlock.style.color = value;
    appBlock.style.setProperty("--accent", value);
    localStorage.setItem("accent-color", value);
  };

  const handleRestoreColors = (evt) => {
    appBlock.style.backgroundColor = '#0b0129';
    appBlock.style.color = '#f5f5f5';
    appBlock.style.setProperty("--accent", '#199c63');
    document.querySelector(".header").style.backgroundColor = '#0b0129';
    localStorage.clear()
  }

  return (
    <header className="header">
      <div className="header__customizer-container">
        {/* <div className="header__customizer">
          <Form.Label htmlFor="exampleColorInput">Фон</Form.Label>
          <Form.Control
            className="header__color-button"
            type="color"
            id="exampleColorInput"
            defaultValue={bgColor}
            title="Выбери свой цвет страницы"
            onChange={handleBgColor}
          />
        </div> */}
        {/* <div className="header__customizer">
          <Form.Label htmlFor="exampleColorInput">Текст</Form.Label>
          <Form.Control
            className="header__color-button"
            type="color"
            id="exampleColorInput"
            defaultValue={textColor}
            title="Выбери свой цвет страницы"
            onChange={handleTextColor}
          />
        </div> */}
        {/* <div className="header__customizer">
          <Form.Label htmlFor="exampleColorInput">Акцент</Form.Label>
          <Form.Control
            className="header__color-button"
            type="color"
            id="exampleColorInput"
            defaultValue={accentColor}
            title="Выбери свой акцентный текст"
            onChange={handleAccentColor}
          />
        </div> */}
        {/* <div className="header__customizer">
          <Button onClick={handleRestoreColors} className="header__button" variant="outline-light">
            Стандартная тема
          </Button>
        </div> */}
      </div>

      <nav className="header__navigation">
        <NavLink
          exact
          to="/"
          activeClassName="header__link_active"
          className="header__link"
        >
          Поиск
        </NavLink>
        <NavLink
          to="/statistics"
          activeClassName="header__link_active"
          className="header__link"
        >
          Статистика
        </NavLink>
        {/* <NavLink
          to="/settings"
          activeClassName="header__link_active"
          className="header__link"
        >
          Персонализация
        </NavLink> */}
      </nav>
    </header>
  );
}
