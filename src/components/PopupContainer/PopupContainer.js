import './PopupContainer.scss';
import {useContext, useEffect, useState} from "react";
import { templateWordsError } from '../../utils/constants';
import { formatWord } from '../../utils/wordFormatter';
import PopupMessage from '../PopupMessage/PopupMessage';
import RelevanceSameModelContext from '../../contexts/relevanceSameModelContext';
import RelevanceAndReplacmentContext from '../../contexts/relevanceAndReplacmentContext';
import NotValidReplacementContext from '../../contexts/notValidReplacementContext';
import DuplicatesContext from "../../contexts/duplicatesContext";

export default function PopupContainer() {
  const relevanceAndReplacment = useContext(RelevanceAndReplacmentContext);
  const relevanceSameModel = useContext(RelevanceSameModelContext);
  const notValidReplacement = useContext(NotValidReplacementContext);
  const duplicates = useContext(DuplicatesContext);

  const relevanceAndReplacmentText = `Нужно исправить ${relevanceAndReplacment.length} ${formatWord(relevanceAndReplacment.length, templateWordsError)}`;
  const relevanceAndReplacmentTitle = `Актуальные с заменой`;

  const relevanceSameModelText = `Нужно исправить ${relevanceSameModel.length} ${formatWord(relevanceSameModel.length, templateWordsError)}`;
  const relevanceSameModelTitle = `Заменены сами на себя`;

  const notValidreplacementModel = `Нужно исправить ${notValidReplacement.length} ${formatWord(notValidReplacement.length, templateWordsError)}`;
  const notValidReplacementTitle = `Невалидные замены`;
  
  const duplicatesModel = `Нужно исправить ${duplicates.length} ${formatWord(duplicates.length, templateWordsError)}`;
  const duplicatesTitle = `Дубликаты`;

  const [isErrors, setIsErrors] = useState(false)

  useEffect(() => {
    (relevanceAndReplacment.length === 0 && relevanceSameModel.length === 0 && notValidReplacement.length === 0 && duplicates.length === 0) ? setIsErrors(false) : setIsErrors(true)
  }, [relevanceAndReplacment, relevanceSameModel, notValidReplacement, duplicates])

  return (
    <section className="popup-container">

      {relevanceAndReplacment.length > 0 &&
        <PopupMessage
          title={relevanceAndReplacmentTitle}
          text={relevanceAndReplacmentText}
          link={'relevanceAndReplacment'}
          isErrors={isErrors}
        />}
      {
        relevanceSameModel.length > 0 &&
        <PopupMessage
          title={relevanceSameModelTitle}
          text={relevanceSameModelText}
          link={'relevanceSameModel'}
          isErrors={isErrors}
        />
      }
      {
        notValidReplacement.length > 0 &&
        <PopupMessage
          title={notValidReplacementTitle}
          text={notValidreplacementModel}
          link={'notValidReplacement'}
          isErrors={isErrors}
        />
      }
      {
        duplicates.length > 0 &&
        <PopupMessage
          title={duplicatesTitle}
          text={duplicatesModel}
          link={'duplicates'}
          isErrors={isErrors}
        />
      }
      {
        !isErrors && <PopupMessage isErrors={isErrors} />
      }
    </section>
  )
}