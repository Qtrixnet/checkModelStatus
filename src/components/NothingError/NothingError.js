import './NothingError.css'

export default function NothingError({ }) {
  return (
    <div className="nothing-error">
      <p>В этой категории ошибок нет</p>
      <p>Отличная работа, так держать!</p>
      <img src={`https://avatars.dicebear.com/api/bottts/${Date.now()}.svg?mood[]=happy`} className="nothing-error__image" width="200" height="200" alt="" />
    </div>
  )
}