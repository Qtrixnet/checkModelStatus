import "./SearchInfo.scss";

export default function SearchInfo({
  searchModelStatusType,
  hikvisionLink,
  value,
  searchModelStatus,
  title,
  foundModelsArr,
  handleBadgeClick,
  replacementModel,
  replacementStatus,
  hasSubstitute,
  hikvisionSubstitute,
  hilookSubstitute,
  hiwatchSubstitute,
  exactMatch,
}) {
  const notActual =
    foundModelsArr.length === 0 && value !== "" && !searchModelStatus;

  const modelsTemplate = (models) => {
    return models.map((model, idx) => (
      <div
        key={idx}
        onClick={handleBadgeClick}
        className={`search-info__badge ${
          model.relevance === "yes"
            ? "search-info__badge_success"
            : "search-info__badge_danger"
        }`}
      >
        {model.model}
      </div>
    ));
  };

  const replacementModelsTemplate = (models) => {
    return models.map((model, idx) => (
      <div
        key={idx}
        onClick={handleBadgeClick}
        className={`search-info__badge`}
      >
        {model.replacement}
      </div>
    ));
  };

  const generateSubstituteTemplate = (title, substitute) => {
    return (
      <div className="search-info__substitute">
        <h3 className={`search-info__title`}>{title}:</h3>
        <div onClick={handleBadgeClick} className={`search-info__badge`}>
          {substitute}
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className={`search-info 
          ${searchModelStatusType === "success" && "search-info_success"} 
          ${searchModelStatusType === "danger" && "search-info_danger"} 
          ${notActual && "search-info_danger"}
        `}
      >
        <h2 className={`search-info__title`}>
          {notActual ? "Ничего не найдено, обратитесь в отдел СВН" : title}
        </h2>
        {hikvisionLink === "" &&
          !exactMatch &&
          foundModelsArr.length <= 15 &&
          foundModelsArr.length > 0 && (
            <h2 className="search-info__title">
              <div className="search-info__badge-container">
                {modelsTemplate(foundModelsArr)}
              </div>
            </h2>
          )}
      </div>
      {(replacementStatus || hikvisionLink !== "") && (
        <div
          className={`search-info 
        ${hikvisionLink !== "" && "search-info_success"}
        `}
        >
          {hikvisionLink !== "" && (
            <h2 className={`search-info__title`}>
              <a
                className="search-info__link"
                target="_blank"
                rel="noreferrer"
                href={hikvisionLink}
              >
                Найти на Hikvision.com
              </a>
            </h2>
          )}
          {replacementStatus && (
            <>
              <h2 className={`search-info__title`}>
                {replacementModel
                  ? "Рекомендуемая замена:"
                  : "Рекомендуемая замена не предусмотрена, обратитесь в отдел СВН"}
              </h2>
              {replacementModel &&
                replacementModelsTemplate([replacementModel])}
            </>
          )}
        </div>
      )}
      {hasSubstitute && (
        <div className={`search-info`}>
          <h2 className={`search-info__title`}>
            У этой модели также есть аналоги на других брендах:
          </h2>
          <div className="search-info__substitute-container">
            {hikvisionSubstitute &&
              generateSubstituteTemplate("Hikvision", hikvisionSubstitute)}

            {hilookSubstitute &&
              generateSubstituteTemplate("HiLook", hilookSubstitute)}

            {hiwatchSubstitute &&
              generateSubstituteTemplate("HiWatch", hiwatchSubstitute)}
          </div>
        </div>
      )}
    </>
  );
}
