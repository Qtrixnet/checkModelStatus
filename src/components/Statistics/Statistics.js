import { useEffect, useState } from "react";
import './Statistics.css'
import Table from 'react-bootstrap/Table'

export default function Statistics() {

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const result = prompt("Введите пароль для получения доступа к статистике");
    result === '0000' ? setAuth(true) : setAuth(false)
  }, []);

  return (
    auth ?
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table> : <h1>Для доступа к этой нужно вести пароль</h1>
  )
}