import './ErrorMessage.scss'
import { texts } from '../../utils/constants'

export default function ErrorMessage() {
  return (
    <div className="error-message">
      <img
        src={`https://avatars.dicebear.com/api/bottts/${Date.now()}.svg?mood[]=sad}`}
        width="200"
        height="200"
        alt="Иконка робота"
      />
      <h1>{texts.errorText}</h1>
    </div>
  )
}