import { useEffect, useState } from "react";
import './Statistics.css'
import Table from 'react-bootstrap/Table'

export default function Statistics({ relevanceAndReplacment, relevanceSameModelState }) {

  const [auth, setAuth] = useState(true);

  // useEffect(() => {
  //   const result = prompt("Введите пароль для получения доступа к статистике");
  //   result === '0000' ? setAuth(true) : setAuth(false)
  // }, []);

  return (
    auth ?
      <div className="statistics">
        <h2 className="statistics__title">Актуальные модели, у которых есть замена</h2>
        <Table className="table" striped bordered hover variant="dark">
          <thead className="table__head">
            <tr className="table__row">
              <th className="table__header-cell">#</th>
              <th className="table__header-cell">Модель</th>
              <th className="table__header-cell">Актуальность</th>
              <th className="table__header-cell">Замена</th>
            </tr>
          </thead>
          <tbody>
            {relevanceAndReplacment.map((model, idx) => {
              return <tr key={model.id} className="table__row">
                <td className="table__cell">{idx + 1}</td>
                <td className="table__cell table__cell_left">{model.model}</td>
                <td className="table__cell table__cell_relevance-yes">{model.relevance}</td>
                <td className="table__cell table__cell_left">{model.replacement}</td>
              </tr>
            })}
          </tbody>
        </Table>
        <h2 className="statistics__title">Не актуальные модели, которые заменены сами на себя</h2>
        <Table className="table" striped bordered hover variant="dark">
          <thead className="table__head">
            <tr className="table__row">
              <th className="table__header-cell">#</th>
              <th className="table__header-cell">Модель</th>
              <th className="table__header-cell">Актуальность</th>
              <th className="table__header-cell">Замена</th>
            </tr>
          </thead>
          <tbody>
            {relevanceSameModelState.map((model, idx) => {
              return <tr key={model.id} className="table__row">
                <td className="table__cell">{idx + 1}</td>
                <td className="table__cell table__cell_left">{model.model}</td>
                <td className="table__cell table__cell_relevance-no">{model.relevance}</td>
                <td className="table__cell table__cell_left">{model.replacement}</td>
              </tr>
            })}
          </tbody>
        </Table>
      </div>
      : <h1>Для доступа к этой странице нужно ввести пароль</h1>
  )
}