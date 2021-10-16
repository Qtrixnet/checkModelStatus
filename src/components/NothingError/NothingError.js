import './NothingError.css'
import okLogo from '../../vendor/ok.png'

export default function NothingError({ }) {
  return (
    <div className="nothing-error">
      Здесь все отлично, ошибок нет
      <img src={okLogo} width="200" height="200" alt="" />
    </div>
  )
}