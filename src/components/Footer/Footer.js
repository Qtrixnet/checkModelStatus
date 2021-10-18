import './Footer.css'
import { formatWord } from '../../utils/wordFormatter';
import { templateWordsNoun } from '../../utils/constants';

export default function Footer({ modelsData }) {
  return (
    <footer className="footer text-muted">
      <span className="footer__text">База данных поиска содержит <span className="text-warning">{modelsData.length}</span> {formatWord(modelsData.length, templateWordsNoun)}</span>
      <span className="footer__text">Кирилл Шашичев <span class="text-warning">&diams;</span> ТД "Интант" &copy; {new Date().getFullYear()}</span>
    </footer>
  )
}