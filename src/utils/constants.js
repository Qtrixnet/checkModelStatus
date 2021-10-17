export const templateWordsNoun = ['модель', 'модели', 'моделей'];
export const templateWords = ['модели', 'моделей', 'моделей'];
export const templateWordsVerb = ['Нашлась', 'Нашлись', 'Нашлось'];
export const templateWordsAdjective = ['похожая', 'похожие', 'похожих'];
export const modelsCount = 15;
export const successStatus = 'success';
export const dangerStatus = 'danger';
export const warningStatus = 'warning';

export const texts = {
  aboutTitle: 'Web приложение для проверки моделей оборудования',
  aboutFeatures: {
    relevance: 'Подсказывает актуальность моделей по брендам Hikvision / HiLook',
    replacement: 'Предлагает альтернативу снятому с производства оборудованию и аналоги на других брендах',
  },
  errorText: 'Не получилось загрузить данные, сообщите в отдел СВН',
  nothingError: {
    category: 'В этой категории ошибок нет',
    text: 'Отличная работа, так держать!'
  },
  preloader : 'Загружаю список моделей...',
  statisticsTabs: {
    relevanceAndReplacment: 'Актуальные и с заменой',
    relevanceSameModel: 'Заменены сами на себя',
    notActualReplacement: 'Невалидные замены',
    googleSheet: 'Перейти в Google таблицу'
  },
  statisticsTitles: {
    relevanceAndReplacment: 'Модели оборудования, которое доступно к заказу, но при этом заменено на другое',
    relevanceSameModel: 'Снятые с производства модели оборудования, которые заменены сами на себя',
    notActualReplacement: 'Модели оборудования, замены которых отсутствуют в основном списке',
  },
}

const spreadsheetId = "148wA9wWJro2mwng84-YKu4LvSgWLnoapIedAZmsk8Uw";
export const baseUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&sheet=models`;
export const faqUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&sheet=FAQ`
