import './Footer.css'

export default function Footer({ modelsData }) {
  return (
    <footer className="footer text-muted">
      <span>База данных поиска содержит <span className="text-warning">{modelsData.length}</span> моделей</span>
    </footer>
  )
}