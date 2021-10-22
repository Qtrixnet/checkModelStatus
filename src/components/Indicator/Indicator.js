import './Indicator.scss'

export default function Indicator({ errorStatus = 'warning' }) {

  console.log(errorStatus)

  return (
    <span className={`indicator indicator_${errorStatus} ${errorStatus === 'danger' && 'indicator_pulse'}`}>{errorStatus === 'success' ? 'OK' : '!'}</span>
  )
}