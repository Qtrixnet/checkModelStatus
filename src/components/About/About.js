import "./About.css";
import { texts } from '../../utils/constants';

export default function About() {
  return (
    <section className="about__info">
      <h1 className="about__title">
        {texts.aboutTitle}
      </h1>
      <ul className="about__list">
        <li className="about__list-item">
          {texts.aboutFeatures.relevance}
        </li>
        <li className="about__list-item">
          {texts.aboutFeatures.replacement}
        </li>
      </ul>
    </section>
  );
}
