import Badge from 'react-bootstrap/Badge';
import './Indicator.css'

export default function Indicator({ errorStatus = 'warning' }) {

  return (
    <Badge className={`indicator indicator_${errorStatus}`}>{errorStatus === 'success' ? 'OK' : '!'}</Badge>
  )
}