import { useState } from "react";
import './Statistics.css';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Indicator from '../Indicator/Indicator';
import NothingError from '../NothingError/NothingError';
import { texts } from '../../utils/constants';

export default function Statistics({
  relevanceAndReplacment = [],
  //!
  relevanceSameModelState = [],
  notActualReplacement = [],
  relevanceAndReplacmentLength = 0,
  relevanceSameModelStateLength = 0,
  notActualReplacementLength = 0,
  errorStatus = 'warning',
  password = '',
}) {
  const [auth, setAuth] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useState(() => {
    localStorage.getItem('auth') === password ? setAuth(true) : setAuth(false)
  }, [])

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const inputValue = form.querySelector('.auth-form__password').value

    if (inputValue === password) {
      setAuth(true)
      setPasswordError(false)
      localStorage.setItem('auth', inputValue)
    } else {
      setPasswordError(true)
    }

  }

  return (
    auth ?
      <>
        <div className="statistics">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row className="statistics-container">
              <Col className="mb-3" sm={3}>
                <Nav variant="pills" className="statistics-nav flex-column">
                  <Nav.Item >
                    <Nav.Link className="statistics__tab-link" eventKey="first">
                      {texts.statisticsTabs.relevanceAndReplacment}
                      {relevanceAndReplacmentLength !== 0 ? <Indicator errorStatus={errorStatus} /> : ''}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="statistics__tab-link" eventKey="second">
                      {texts.statisticsTabs.relevanceSameModel}
                      {relevanceSameModelStateLength !== 0 ? <Indicator errorStatus={errorStatus} /> : ''}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="statistics__tab-link" eventKey="third">
                      {texts.statisticsTabs.notActualReplacement}
                      {notActualReplacementLength !== 0 ? <Indicator errorStatus={errorStatus} /> : ''}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <a className="statistics__link" rel="noreferrer" target="_blank" href="https://docs.google.com/spreadsheets/d/148wA9wWJro2mwng84-YKu4LvSgWLnoapIedAZmsk8Uw/edit#gid=124941712">{texts.statisticsTabs.googleSheet}</a>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <h2 className="statistics__title">
                      {
                        relevanceAndReplacmentLength !== 0 ? texts.statisticsTitles.relevanceAndReplacment : <NothingError />
                      }
                    </h2>
                    {
                      relevanceAndReplacmentLength !== 0 ?
                        <Table className="table" striped responsive bordered hover variant="dark">
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
                        texts.statisticsTitles.relevanceSameModel : <NothingError />
                      }
                    </h2>
                    {
                      relevanceSameModelStateLength !== 0 ?
                        <Table className="table-container" responsive striped bordered hover variant="dark">
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
                        texts.statisticsTitles.notActualReplacement : <NothingError />
                      }
                    </h2>
                    {
                      notActualReplacementLength !== 0 ?
                        <Table className="table" striped bordered responsive hover variant="dark">
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
      :
      <>
        <Form className="auth-form" onSubmit={handleSubmit}>
          <Form.Group className="auth-form__container" controlId="formBasicPassword">
            <Form.Label className="text-warning">Введите пароль</Form.Label>
            <Form.Control className="auth-form__password" type="password" placeholder="Пароль" />
            <Form.Text className="text-muted">
              Пароль будет сохранен для всех следующих сессий
            </Form.Text>
            <Form.Text className="text-muted">
              Пароль можно найти в Google таблице, в разделе FAQ
            </Form.Text>
          </Form.Group>
          <Button variant="warning" type="submit">
            Авторизоваться
          </Button>
        </Form>
        {
          passwordError ?
            <Form.Text className="text-danger">
              Пароль неверный, попробуйте еще раз
            </Form.Text> : ''
        }
      </>
  )
}