import './PopupMessage.scss';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function PopupMessage({ title, text, link }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShow(false)
    }, 10000)
  })



  const handleClick = (evt) => {
    // setShow(false)
    const popup = evt.target.closest('.popup-message');
    popup.style.transform = 'translate(0%, 1000px)';
    popup.style.opacity = '0'
  }

  return (
    show && <section className="popup-message">
      <header className="popup-message__header">
        <img
          src={`https://avatars.dicebear.com/api/bottts/${Date.now()}.svg?mood[]='sad'}`}
          className="popup-message__image"
          alt="изображение робота"
          width="36"
          height="36"
        />
        <h3 className="popup-message__title">{title}</h3>
        <button title="Закрыть сообщение" className="popup-message__close-button" onClick={handleClick}>&times;</button>
      </header>
      <p className="popup-message__text">{text}</p>
      <Link to={`/statistics/${link}`} className="popup-message__link">Посмотреть</Link>
    </section>
  )
}