import './PageNotFound.scss'
import { texts } from '../../utils/constants'

export default function PageNotFound() {
  return (
    <section className="not-found">
    <h2 className="not-found__title">{texts.pageNotFound.title}</h2>
    <img
      src={`https://avatars.dicebear.com/api/bottts/${Date.now()}.svg?mood[]='sad'}`}
      className="not-found__image"
      alt="изображение робота"
      width="200"
      height="200"
    />
    <p className="not-found__text">{texts.pageNotFound.text}</p>
  </section>
  )
}