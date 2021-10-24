import './SearchInfo.scss';
import { useState } from "react";

export default function SearchInfo({ searchModelStatusType, hikvisionLink, value, searchModelStatus, title, foundModelsArr, handleBadgeClick }) {
  const notActual = foundModelsArr.length === 0 && value !== "" && !searchModelStatus;

  const modelsTemplate = (models) => {
    return models.map((model, idx) => (
      <div
        key={idx}
        onClick={handleBadgeClick}
        className={`search-info__badge ${model.relevance === 'yes' && 'search-info__badge_relevance'}`}
      >
        {model.model}
      </div>
    ));
  };

  return (
    <div
      className={`
      search-info 
      ${searchModelStatusType === 'success' && 'search-info_success'} 
      ${searchModelStatusType === 'danger' && 'search-info_danger'} 
      ${notActual && 'search-info_danger'}
      `}
    >
      <h2 className={`search-info__title`}>
        {notActual ? 'Ничего не найдено, обратитесь в отдел СВН' : title}
      </h2>
      {
        (foundModelsArr.length <= 15 && foundModelsArr.length > 0) &&
        <h2 className="search-info__title">
          <div className="search-info__badge-container">
            {modelsTemplate(foundModelsArr)}
          </div>
        </h2>
      }
      {
        hikvisionLink !== '' &&
        <h2 className={`search-info__title`}>
          <a className="search-info__link" href={hikvisionLink}>Найти на Hikvision.com</a>
        </h2>
      }
    </div>
  )
}