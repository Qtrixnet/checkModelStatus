import './Header.css'
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <nav className="header__navigation">
        <NavLink exact to="/" activeClassName="header__logo_active" className="header__logo">Поиск</NavLink>
        <NavLink to="/statistics" activeClassName="header__logo_active" className="header__logo">Статистика</NavLink>
      </nav>
    </header>
  )
}