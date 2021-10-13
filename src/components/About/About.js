import './About.css'

export default function About() {
  return (
    <section className="about__info">
      <h1 className="about__title">Web приложение для проверки моделей оборудования</h1>
      <ul className="about__list">
        <li className="about__list-item">Подсказывает актуальность моделей по брендам Hikvision / HiLook</li>
        <li className="about__list-item">Предлагает альтернативу снятому с производства оборудованию и аналоги на других брендах</li>
      </ul>
      <p className="about__subtitle">Введите интересующую модель</p>
    </section>
  )
}
