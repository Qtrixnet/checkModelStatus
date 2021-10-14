import './Header.css'
import { NavLink } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button'
// import FormControl from 'react-bootstrap/FormControl'

export default function Header() {

  const [bgColor, setBgColor] = useState('#ffffff')
  const [textColor, setTextColor] = useState('#000000')

  const savedBackgroundColor = localStorage.getItem('bg-color');
  const savedTextColor = localStorage.getItem('text-color');

  useEffect(() => {
    if (savedBackgroundColor) {
      document.querySelector('.App').style.backgroundColor = savedBackgroundColor
      setBgColor(savedBackgroundColor)
    }

    if (savedTextColor) {
      document.querySelector('.App').style.color = savedTextColor
      setTextColor(savedTextColor)
    }
  }, [savedTextColor, savedBackgroundColor]);

  const handleBgColor = (evt) => {
    const value = evt.target.value;
    document.body.style.setProperty('--dark', value);
    localStorage.setItem('bg-color', value);
  }

  const handleTextColor = (evt) => {
    const value = evt.target.value;
    document.body.style.setProperty('--light', value);
    localStorage.setItem('text-color', value);
  }

  return (
    <header className="header">
      <div className="header__customizer-container">
        <div className="header__customizer">
          <Form.Label htmlFor="exampleColorInput">Цвет страницы</Form.Label>
          <Form.Control
            type="color"
            id="exampleColorInput"
            defaultValue={bgColor}
            title="Выбери свой цвет страницы"
            onChange={handleBgColor}
          />
        </div>
        <div className="header__customizer">
          <Form.Label htmlFor="exampleColorInput">Цвет текста</Form.Label>
          <Form.Control
            type="color"
            id="exampleColorInput"
            defaultValue={textColor}
            title="Выбери свой цвет страницы"
            onChange={handleTextColor}
          />
        </div>
        <div className="header__customizer">
          <Button className="header__button" variant="outline-light">Стандартная тема</Button>
        </div>
      </div>

      <nav className="header__navigation">
        <NavLink exact to="/" activeClassName="header__link_active" className="header__link">Поиск</NavLink>
        <NavLink to="/statistics" activeClassName="header__link_active" className="header__link">Статистика</NavLink>
      </nav>
    </header>
  )
}