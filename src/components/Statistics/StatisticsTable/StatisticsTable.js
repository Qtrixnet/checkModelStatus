import "./StatisticsTable.scss";

export default function StatisticsTable({ data, title }) {
  return (
    <div className="table-container">
      <h2 className="table__title">{title}</h2>
      <table className="table">
        <thead className="table__header">
          <tr className="table__header-row">
            <th className="table__header-cell">#</th>
            <th className="table__header-cell">Модель</th>
            <th className="table__header-cell">Замена</th>
            <th className="table__header-cell">Актуальность</th>
          </tr>
        </thead>
        <tbody className="table__body">
          {data.map((model, idx) => {
            return (
              <tr className="table__row" key={idx}>
                <th className="table__cell">{idx + 1}</th>
                <th className="table__cell">{model.model}</th>
                <th className="table__cell">{model.replacement}</th>
                <th className="table__cell">{model.relevance}</th>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
