import './App.css'
import Header from '../Header/Header';
import Main from '../Main/Main';
import Spinner from 'react-bootstrap/Spinner';
import { useEffect, useState } from "react";

export default function App() {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 3000)
  }, []);

  return (
    <div className="App">
      {
        loading ?
          <>
            <Header />
            <Main />
          </>
          :
          <div className="loading">
            <h1 class="loading__title">Загружаемся</h1>
            <Spinner animation="border" variant="success" />
          </div>
      }
    </div>
  )
}