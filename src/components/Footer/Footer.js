import './Footer.css'
import { formatWord } from '../../utils/wordFormatter';
import { templateWordsNoun } from '../../utils/constants';

export default function Footer({ modelsData }) {
  return (
    <footer className="footer text-muted">
      <span>База данных поиска содержит <span className="text-warning">{modelsData.length}</span> {formatWord(modelsData.length, templateWordsNoun)}</span>
    </footer>
  )
}