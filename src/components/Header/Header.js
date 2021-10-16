import "./Header.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Badge from 'react-bootstrap/Badge'

export default function Header({ relevanceAndReplacment = [], relevanceSameModelState = [], notActualReplacement = [] }) {

  const relevanceAndReplacmentLength = relevanceAndReplacment.length
  const relevanceSameModelStateLength = relevanceSameModelState.length
  const notActualReplacementLength = notActualReplacement.length

  let errorStatus;

  if (relevanceAndReplacmentLength !== 0 && relevanceSameModelStateLength !== 0 && notActualReplacementLength !== 0) {
    errorStatus = 'danger'
  } else {
    errorStatus = 'success';
  }

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
          <span className="header__indicator-container"><Badge className="header__indicator" bg={errorStatus}> </Badge></span>
        </NavLink>
      </nav>
    </header>
  );
}
