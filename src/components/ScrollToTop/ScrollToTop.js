import './ScrollToTop.scss';
import { useState } from "react";

export default function ScrollToTop() {
  const header = document.querySelector('.header');
  const [isShow, setIsShow] = useState(false);

  const handleClick = (evt) => {
    evt.preventDefault();
    header.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  window.addEventListener('scroll', () => {
    if(window.pageYOffset > 500) {
      setIsShow(true)
    } else {
      setIsShow(false)
    }
  })

  return (
    isShow && <button className="scroll-to-top" onClick={handleClick} type="button">Наверх</button>
  )
}