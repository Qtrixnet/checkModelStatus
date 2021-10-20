import './Footer.scss'
import { formatWord } from '../../utils/wordFormatter';
import { templateWordsNoun } from '../../utils/constants';

export default function Footer({ modelsData }) {
  return (
    <footer className="footer">
      <span className="footer__text">База данных поиска содержит <span className="text-warning">{modelsData.length}</span> {formatWord(modelsData.length, templateWordsNoun)}</span>
      <span className="footer__text">Кирилл Шашичев <span className="text-warning">&#10007;</span> ТОО Торговый дом "Интант" &copy; {new Date().getFullYear()}</span>
    </footer>
  )
}