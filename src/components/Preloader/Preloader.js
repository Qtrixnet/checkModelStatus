import Spinner from "react-bootstrap/Spinner";
import './Preloader.css'

export default function Preloader({ }) {
  return (
    <div className="preloader">
      <h1 className="preloader__title">Загрузка</h1>
      <Spinner animation="border" variant="light" className="preloader__spinner" />
    </div>
  )
}