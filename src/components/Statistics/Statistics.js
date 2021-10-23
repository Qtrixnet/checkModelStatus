import "./Statistics.scss";
import { useState, useContext } from "react";
import { Route, NavLink, useRouteMatch, Redirect } from "react-router-dom";
import Indicator from "../Indicator/Indicator";
import NothingError from "../NothingError/NothingError";
import Auth from "../Auth/Auth";
import StatisticsNav from "./StatisticsNav/StatisticsNav";
import { texts } from "../../utils/constants";
import StatisticsTable from './StatisticsTable/StatisticsTable';
import RelevanceSameModelContext from '../../contexts/relevanceSameModelContext';
import RelevanceAndReplacmentContext from '../../contexts/relevanceAndReplacmentContext';
import NotValidReplacementContext from '../../contexts/notValidReplacementContext';

export default function Statistics({
  password = "",
}) {
  const [auth, setAuth] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { path, url } = useRouteMatch();
  const relevanceAndReplacment = useContext(RelevanceAndReplacmentContext);
  const relevanceSameModel = useContext(RelevanceSameModelContext);
  const notValidReplacement = useContext(NotValidReplacementContext);

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

  return auth ? (
    <>
      <section className="statistics">
        <StatisticsNav />
        
        <Route path="/statistics">
          <Redirect to={`${path}/relevanceAndReplacment`} />
        </Route>
        <Route path={`${path}/relevanceAndReplacment`}>
          {relevanceAndReplacment.length > 0 ? <StatisticsTable title={texts.statisticsTitles.relevanceAndReplacment} data={relevanceAndReplacment} /> : <NothingError />}
        </Route>
        <Route path={`${path}/relevanceSameModel`}>
          {relevanceSameModel.length > 0 ? <StatisticsTable title={texts.statisticsTitles.relevanceSameModel} data={relevanceSameModel} /> : <NothingError />}
        </Route>
        <Route path={`${path}/notValidReplacement`}>
          {notValidReplacement.length > 0 ? <StatisticsTable title={texts.statisticsTitles.notValidReplacement} data={notValidReplacement} /> : <NothingError />}
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
        <p>Пароль неверный</p>
        // <Form.Text className="text-danger">
        //   Пароль неверный, попробуйте еще раз
        // </Form.Text>
      ) : (
        ""
      )}
    </>
  );
}
