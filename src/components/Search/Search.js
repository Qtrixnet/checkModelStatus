import './Search.css'

export default function About() {
  return (
    <form className="search">
      <fieldset className="search__field">
        <input className="search__submit" type="submit" value="Очистить" />
        <input className="search__input" placeholder="DS-2CD2023G2-I" required type="text" />
      </fieldset>
      <span className="search__result-one"></span>
      <span className="search__result-two"></span>
      <span className="search__result-three"></span>
    </form>
  )
}