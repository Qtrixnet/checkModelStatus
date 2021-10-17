import './ErrorMessage.css'

export default function ErrorMessage({ }) {
  return (
    <div className="error-message">
      <img
        src={`https://avatars.dicebear.com/api/bottts/${Date.now()}.svg?mood[]=sad}`}
        width="200"
        height="200"
      />
      <h1>Не получилось загрузить данные, сообщите в отдел СВН</h1>
    </div>
  )
}