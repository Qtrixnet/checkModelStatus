import "./Statistics.scss";
import { useState } from "react";
import { Route, NavLink, useRouteMatch } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Indicator from "../Indicator/Indicator";
import NothingError from "../NothingError/NothingError";
import Auth from "../Auth/Auth";
import StatisticsNav from "./StatisticsNav/StatisticsNav";
import { texts } from "../../utils/constants";

export default function Statistics({
  relevanceAndReplacment = [],
  //!
  relevanceSameModel = [],
  notValidReplacement = [],
  relevanceAndReplacmentLength = 0,
  relevanceSameModelLength = 0,
  notValidReplacementLength = 0,
  errorStatus = "warning",
  password = "",
}) {
  const [auth, setAuth] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { path, url } = useRouteMatch();

  useState(() => {
    localStorage.getItem("auth-password") === password
      ? setAuth(true)
      : setAuth(false);
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const inputValue = form.querySelector(".auth-form__password").value;

    if (inputValue === password) {
      setAuth(true);
      setPasswordError(false);
      localStorage.setItem("auth-password", inputValue);
    } else {
      setPasswordError(true);
    }
  };

  return !auth ? (
    <>
      <section className="statistics">
        <StatisticsNav />
        <Route path={`${path}/relevanceAndReplacment`}>
          {texts.statisticsTitles.relevanceAndReplacment}
        </Route>
        <Route path={`${path}/relevanceSameModel`}>
          {texts.statisticsTitles.relevanceSameModel}
        </Route>
        <Route path={`${path}/notValidReplacement`}>
          {texts.statisticsTitles.notValidReplacement}
        </Route>
      </section>

      {/* <div className="statistics">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className="statistics-container">
            <Col className="mb-3" sm={3}>
              <Nav variant="pills" className="statistics-nav flex-column">
                <Nav.Item>
                  <Nav.Link className="statistics__tab-link" eventKey="first">
                    {texts.statisticsTabs.relevanceAndReplacment}
                    {relevanceAndReplacmentLength !== 0 && (
                      <Indicator errorStatus={errorStatus} />
                    )}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="statistics__tab-link" eventKey="second">
                    {texts.statisticsTabs.relevanceSameModel}
                    {relevanceSameModelLength !== 0 && (
                      <Indicator errorStatus={errorStatus} />
                    )}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="statistics__tab-link" eventKey="third">
                    {texts.statisticsTabs.notValidReplacement}
                    {notValidReplacementLength !== 0 && (
                      <Indicator errorStatus={errorStatus} />
                    )}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <a
                    className="statistics__link"
                    rel="noreferrer"
                    target="_blank"
                    href="https://docs.google.com/spreadsheets/d/148wA9wWJro2mwng84-YKu4LvSgWLnoapIedAZmsk8Uw/edit#gid=124941712"
                  >
                    {texts.statisticsTabs.googleSheet}
                  </a>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <h2 className="statistics__title">
                    {relevanceAndReplacmentLength !== 0 ? (
                      texts.statisticsTitles.relevanceAndReplacment
                    ) : (
                      <NothingError />
                    )}
                  </h2>
                  {relevanceAndReplacmentLength !== 0 && (
                    <Table
                      className="statistics-table"
                      striped
                      responsive
                      bordered
                      hover
                      variant="dark"
                    >
                      <thead className="statistics-table__head">
                        <tr className="statistics-table__row">
                          <th className="statistics-table__header-cell">#</th>
                          <th className="statistics-table__header-cell">
                            Модель
                          </th>
                          <th className="statistics-table__header-cell">
                            Замена
                          </th>
                          <th className="statistics-table__header-cell">
                            Актуальность
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {relevanceAndReplacment.map((model, idx) => {
                          return (
                            <tr key={model.id} className="table__row">
                              <td className="statistics-table__cell">
                                {idx + 1}
                              </td>
                              <td className="statistics-table__cell statistics-table__cell_left">
                                {model.model}
                              </td>
                              <td className="statistics-table__cell statistics-table__cell_left">
                                {model.replacement}
                              </td>
                              <td className="statistics-table__cell statistics-table__cell_relevance-yes">
                                {model.relevance}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  )}
                </Tab.Pane>

                <Tab.Pane eventKey="second">
                  <h2 className="statistics__title">
                    {relevanceSameModelLength !== 0 ? (
                      texts.statisticsTitles.relevanceSameModel
                    ) : (
                      <NothingError />
                    )}
                  </h2>
                  {relevanceSameModelLength !== 0 && (
                    <Table
                      className="statistics-table-container"
                      responsive
                      striped
                      bordered
                      hover
                      variant="dark"
                    >
                      <thead className="statistics-table__head">
                        <tr className="statistics-table__row">
                          <th className="statistics-table__header-cell">#</th>
                          <th className="statistics-table__header-cell">
                            Модель
                          </th>
                          <th className="statistics-table__header-cell">
                            Замена
                          </th>
                          <th className="statistics-table__header-cell">
                            Актуальность
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {relevanceSameModel.map((model, idx) => {
                          return (
                            <tr key={model.id} className="table__row">
                              <td className="statistics-table__cell">
                                {idx + 1}
                              </td>
                              <td className="statistics-table__cell statistics-table__cell_left">
                                {model.model}
                              </td>
                              <td className="statistics-table__cell statistics-table__cell_left">
                                {model.replacement}
                              </td>
                              <td className="statistics-table__cell statistics-table__cell_relevance-no">
                                {model.relevance}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  )}
                </Tab.Pane>

                <Tab.Pane eventKey="third">
                  <h2 className="statistics__title">
                    {notValidReplacementLength !== 0 ? (
                      texts.statisticsTitles.notValidReplacement
                    ) : (
                      <NothingError />
                    )}
                  </h2>
                  {notValidReplacementLength !== 0 && (
                    <Table
                      className="statistics-table"
                      striped
                      bordered
                      responsive
                      hover
                      variant="dark"
                    >
                      <thead className="statistics-table__head">
                        <tr className="statistics-table__row">
                          <th className="statistics-table__header-cell">#</th>
                          <th className="statistics-table__header-cell">
                            Замена
                          </th>
                          <th className="statistics-table__header-cell">
                            Модель
                          </th>
                          <th className="statistics-table__header-cell">
                            Актуальность
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {notValidReplacement.map((model, idx) => {
                          return (
                            <tr key={model.id} className="table__row">
                              <td className="statistics-table__cell">
                                {idx + 1}
                              </td>
                              <td className="statistics-table__cell statistics-table__cell_left">
                                {model.replacement}
                              </td>
                              <td className="statistics-table__cell statistics-table__cell_left">
                                {model.model}
                              </td>
                              <td className="statistics-table__cell statistics-table__cell_relevance-no">
                                {model.relevance}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  )}
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div> */}
    </>
  ) : (
    <>
      <Auth />
      {passwordError ? (
        <Form.Text className="text-danger">
          Пароль неверный, попробуйте еще раз
        </Form.Text>
      ) : (
        ""
      )}
    </>
  );
}
