import './NothingError.css'
import { texts } from '../../utils/constants'

export default function NothingError() {
  return (
    <div className="nothing-error">
      <p>{texts.nothingError.category}</p>
      <p>{texts.nothingError.text}</p>
      <img src={`https://avatars.dicebear.com/api/bottts/${Date.now()}.svg?mood[]=happy`} className="nothing-error__image" width="200" height="200" alt="Иконка робота" />
    </div>
  )
}