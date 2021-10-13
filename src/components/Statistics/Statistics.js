import { useEffect, useState } from "react";
import './Statistics.css'

export default function Statistics() {

  const [auth, setAuth] = useState();

  useEffect(() => {
    const result = prompt("Введите пароль для получения доступа к статистике");
    result === '0000' ? setAuth(true) : setAuth(false)
  }, []);

  return (
    auth ? <h1>Здесь будет статистика</h1> : <h1>Для доступа к этой нужно вести пароль</h1>
  )
}