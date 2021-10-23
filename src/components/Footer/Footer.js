import './Footer.scss'
import { useContext } from "react";
import { formatWord } from '../../utils/wordFormatter';
import { templateWordsNoun } from '../../utils/constants';
import CurrentModelsContext from '../../contexts/currentModelsContext';

export default function Footer() {
  const currentModels = useContext(CurrentModelsContext);

  return (
    <footer className="footer">
      <span className="footer__text">База данных поиска содержит <span className="footer__accent">{currentModels.length}</span> {formatWord(currentModels.length, templateWordsNoun)}</span>
      <span className="footer__text">Кирилл Шашичев <span className="footer__accent">&#10007;</span> ТОО Торговый дом "Интант" &copy; {new Date().getFullYear()}</span>
    </footer>
  )
}