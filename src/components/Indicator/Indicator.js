import './Indicator.scss';

export default function Indicator({ errorModels = [] }) {

  return (
    <span className={`
    indicator
    indicator_${errorModels.length > 0 ? 'danger' : 'success'}
    indicator_${errorModels.length > 0 && 'pulse'}
    `}>
      {errorModels.length > 0 ? '!' : 'OK'}
    </span>
  )
}