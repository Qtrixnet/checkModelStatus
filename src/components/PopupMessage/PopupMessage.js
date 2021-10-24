import './PopupMessage.scss';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function PopupMessage({ isErrors, title = 'Отлично!', text = 'Ни в одной категории нет ошибок', link = '' }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShow(false)
    }, 10000)
  })

  const handleClick = (evt) => {
    const popup = evt.target.closest('.popup-message');
    popup.style.transform = 'translate(300px, 0)';
    popup.style.opacity = '0';
  }

  return (
    show && <section className="popup-message">
      <header className={`${!isErrors && 'popup-message__header_ok'} popup-message__header`}>
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