import Spinner from "react-bootstrap/Spinner";
import './Preloader.scss'
import {texts} from '../../utils/constants';

export default function Preloader() {
  return (
    <div className="preloader">
      <img
        src={`https://avatars.dicebear.com/api/bottts/${Date.now()}.svg?mood[]='sad'}`}
        className="toast__image rounded me-2"
        alt=""
        width="200"
        height="200"
      />
      <h1 className="preloader__title">{texts.preloader}</h1>
      <Spinner animation="border" variant="light" className="preloader__spinner" />
    </div>
  )
}