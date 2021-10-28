export const relevanceCheck = (
  model,
  setSearchModelStatusText,
  setSearchModelStatusType,
  setHikvisionLink,
  setHikvisionLinkStatus,
  setReplacementModel,
  setReplacementStatus,
  setHasSubstitute,
  setHikvisionSubstitute,
  setHilookSubstitute,
  setHiwatchSubstitute,
  setSearchInfoTitle
) => {
  if (model.relevance === 'yes') {
    setSearchInfoTitle(`Модель ${model.model} доступна к заказу`)
    setSearchModelStatusText(`Модель ${model.model} доступна к заказу`)
    setSearchModelStatusType('success')
    setHikvisionLinkStatus(true);
    setHikvisionLink(`https://www.hikvision.com/en/search/?q=${model.model}`);
  } else {
    setSearchInfoTitle(`Модель ${model.model} снята с производста`)
    setSearchModelStatusText(`Модель ${model.model} снята с производста`)
    setSearchModelStatusType('danger')
    if (model.replacement) {
      setReplacementModel(model)
    }
    setReplacementStatus(true)
  }

  if (
    model.hikvision || model.hilook || model.hiwatch
  ) {
    setHasSubstitute(true)
    if (model.hikvision) {
      setHikvisionSubstitute(model.hikvision)
    }

    if (model.hilook) {
      setHilookSubstitute(model.hilook)
    }

    if (model.hiwatch) {
      setHiwatchSubstitute(model.hiwatch)
    }
  }
}