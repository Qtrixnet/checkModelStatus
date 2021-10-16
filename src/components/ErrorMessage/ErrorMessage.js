import './ErrorMessage.css'

export default function ErrorMessage({ }) {
  return (
    <div className="error-message">
      <h1>Ошибка загрузки данных, сообщите в отдел СВН</h1>
      <img
        src={`https://avatars.dicebear.com/api/bottts/${Date.now()}.svg?mood[]=sad}`}
        width="300"
        height="300"
      />
    </div>
  )
}