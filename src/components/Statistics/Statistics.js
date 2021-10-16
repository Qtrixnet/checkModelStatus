import { useEffect, useState } from "react";
import './Statistics.css'
import Table from 'react-bootstrap/Table'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Indicator from '../Indicator/Indicator'
import NothingError from '../NothingError/NothingError'

export default function Statistics({
  relevanceAndReplacment = [],
  //!
  relevanceSameModelState = [],
  notActualReplacement = [],
  relevanceAndReplacmentLength = 0,
  relevanceSameModelStateLength = 0,
  notActualReplacementLength = 0,
  errorStatus,
}) {

  const [auth, setAuth] = useState(true);

  return (
    auth ?
      <>
        <div className="statistics">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row className="statistics-container">
              <Col sm={3}>
                <Nav variant="pills" className="statistics-nav flex-column">
                  <Nav.Item >
                    <Nav.Link className="statistics__tab-link" eventKey="first">
                      Актуальные и с заменой
                      {relevanceAndReplacmentLength !== 0 ? <Indicator errorStatus={errorStatus} /> : ''}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="statistics__tab-link" eventKey="second">
                      Заменены сами на себя
                      {relevanceSameModelStateLength !== 0 ? <Indicator errorStatus={errorStatus} /> : ''}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="statistics__tab-link" eventKey="third">
                      Невалидные замены
                      {notActualReplacementLength !== 0 ? <Indicator errorStatus={errorStatus} /> : ''}
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <h2 className="statistics__title">
                      {
                        relevanceAndReplacmentLength !== 0 ?
                          'Модели оборудования, которое доступно к заказу, но при этом заменено на другое' : <NothingError />
                      }
                    </h2>
                    {
                      relevanceAndReplacmentLength !== 0 ?
                        <Table className="table" striped bordered hover variant="dark">
                          <thead className="table__head">
                            <tr className="table__row">
                              <th className="table__header-cell">#</th>
                              <th className="table__header-cell">Модель</th>
                              <th className="table__header-cell">Замена</th>
                              <th className="table__header-cell">Актуальность</th>
                            </tr>
                          </thead>
                          <tbody>
                            {relevanceAndReplacment.map((model, idx) => {
                              return <tr key={model.id} className="table__row">
                                <td className="table__cell">{idx + 1}</td>
                                <td className="table__cell table__cell_left">{model.model}</td>
                                <td className="table__cell table__cell_left">{model.replacement}</td>
                                <td className="table__cell table__cell_relevance-yes">{model.relevance}</td>
                              </tr>
                            })}
                          </tbody>
                        </Table>
                        : ''
                    }

                  </Tab.Pane>

                  <Tab.Pane eventKey="second">
                    <h2 className="statistics__title">
                      {
                        relevanceSameModelStateLength !== 0 ?
                          'Снятые с производства модели оборудования, которые заменены сами на себя' : <NothingError />
                      }
                    </h2>
                    {
                      relevanceSameModelStateLength !== 0 ?
                        <Table className="table" striped bordered hover variant="dark">
                          <thead className="table__head">
                            <tr className="table__row">
                              <th className="table__header-cell">#</th>
                              <th className="table__header-cell">Модель</th>
                              <th className="table__header-cell">Замена</th>
                              <th className="table__header-cell">Актуальность</th>
                            </tr>
                          </thead>
                          <tbody>
                            {relevanceSameModelState.map((model, idx) => {
                              return <tr key={model.id} className="table__row">
                                <td className="table__cell">{idx + 1}</td>
                                <td className="table__cell table__cell_left">{model.model}</td>
                                <td className="table__cell table__cell_left">{model.replacement}</td>
                                <td className="table__cell table__cell_relevance-no">{model.relevance}</td>
                              </tr>
                            })}
                          </tbody>
                        </Table>
                        : ''
                    }
                  </Tab.Pane>

                  <Tab.Pane eventKey="third">
                    <h2 className="statistics__title">
                      {
                        notActualReplacementLength !== 0 ?
                          'Модели оборудования, замены которых отсутствуют в основном списке' : <NothingError />
                      }
                    </h2>
                    {
                      notActualReplacementLength !== 0 ?
                        <Table className="table" striped bordered hover variant="dark">
                          <thead className="table__head">
                            <tr className="table__row">
                              <th className="table__header-cell">#</th>
                              <th className="table__header-cell">Замена</th>
                              <th className="table__header-cell">Модель</th>
                              <th className="table__header-cell">Актуальность</th>
                            </tr>
                          </thead>
                          <tbody>
                            {notActualReplacement.map((model, idx) => {
                              return <tr key={model.id} className="table__row">
                                <td className="table__cell">{idx + 1}</td>
                                <td className="table__cell table__cell_left">{model.replacement}</td>
                                <td className="table__cell table__cell_left">{model.model}</td>
                                <td className="table__cell table__cell_relevance-no">{model.relevance}</td>
                              </tr>
                            })}
                          </tbody>
                        </Table>
                        : ''
                    }
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>


        </div>
      </>
      : <h1>Для доступа к этой странице нужно ввести пароль</h1>
  )
}