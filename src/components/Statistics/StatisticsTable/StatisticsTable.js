import "./StatisticsTable.scss";

export default function StatisticsTable({ data, title }) {
  return (
    <div className="table-container">
      <h2 className="table__title">{title}</h2>
      <table className="table">
        <thead className="table__header">
          <tr className="table__header-row">
            <th className="table__header-cell">#</th>
            {data[0].model && <th className="table__header-cell">Модель</th>}
            {data[0].replacement && <th className="table__header-cell">Замена</th>}
            {data[0].relevance && <th className="table__header-cell">Актуальность</th>}
            {data[0].count && <th className="table__header-cell">Количество</th>}
          </tr>
        </thead>
        <tbody className="table__body">
          {data.map((model, idx) => {
            return (
              <tr className="table__row" key={idx}>
                <th className="table__cell">{idx + 1}</th>
                {model.model && <th className="table__cell">{model.model}</th>}
                {model.replacement && <th className="table__cell">{model.replacement}</th>}
                {model.relevance && <th className="table__cell">{model.relevance}</th>}
                {model.count && <th className="table__cell">{model.count}</th>}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
