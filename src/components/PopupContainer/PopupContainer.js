import './PopupContainer.scss';
import { useContext } from "react";
import { templateWordsError } from '../../utils/constants';
import { formatWord } from '../../utils/wordFormatter';
import PopupMessage from '../PopupMessage/PopupMessage';
import RelevanceSameModelContext from '../../contexts/relevanceSameModelContext';
import RelevanceAndReplacmentContext from '../../contexts/relevanceAndReplacmentContext';
import NotValidReplacementContext from '../../contexts/notValidReplacementContext';

export default function PopupContainer() {
  const relevanceAndReplacment = useContext(RelevanceAndReplacmentContext);
  const relevanceSameModel = useContext(RelevanceSameModelContext);
  const notValidReplacement = useContext(NotValidReplacementContext);

  console.log(relevanceAndReplacment)

  const relevanceAndReplacmentText = `Нужно исправить ${relevanceAndReplacment.length} ${formatWord(relevanceAndReplacment.length, templateWordsError)}`
  const relevanceAndReplacmentTitle = `Актуальные с заменой`

  const relevanceSameModelText = `Нужно исправить ${relevanceSameModel.length} ${formatWord(relevanceSameModel.length, templateWordsError)}`
  const relevanceSameModelTitle = `Заменены сами на себя`

  const notValidReplacementText = `Нужно исправить ${notValidReplacement.length} ${formatWord(notValidReplacement.length, templateWordsError)}`
  const notValidReplacementTitle = `Невалидные замены`

  return (
    <section className="popup-container">
      <PopupMessage
        title={relevanceAndReplacmentTitle}
        text={relevanceAndReplacmentText}
        link={'relevanceAndReplacment'}
      />
      <PopupMessage
        title={relevanceSameModelTitle}
        text={relevanceSameModelText}
        link={'relevanceSameModel'}
      />

      <PopupMessage
        title={notValidReplacementTitle}
        text={notValidReplacementText}
        link={'notValidReplacement'}
      />
    </section>
  )
}