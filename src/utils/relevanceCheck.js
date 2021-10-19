export const relevanceCheck = (
  model,
  setSearchModelStatusText,
  setSearchModelStatusType,
  setHikvisionLink,
  setHikvisionLinkStatus,
  setReplacementText,
  setReplacementStatus,
  setHasSubstitute,
  setHikvisionSubstitute,
  setHilookSubstitute,
  setHiwatchSubstitute,
) => {
  if (model.relevance === 'yes') {
    setSearchModelStatusText(`Модель ${model.model} доступна к заказу`)
    setSearchModelStatusType('success')
    setHikvisionLinkStatus(true);
    setHikvisionLink(`https://www.hikvision.com/en/search/?q=${model.model}`);
  } else {
    setSearchModelStatusText(`Модель ${model.model} снята с производста`)
    setSearchModelStatusType('danger')
    if (model.replacement) {
      setReplacementText(model.replacement)
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