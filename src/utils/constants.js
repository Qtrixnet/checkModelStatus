export const templateWordsNoun = ['модель', 'модели', 'моделей'];
export const templateWords = ['модели', 'моделей', 'моделей'];
export const templateWordsVerb = ['Нашлась', 'Нашлись', 'Нашлось'];
export const templateWordsAdjective = ['похожая', 'похожие', 'похожих'];
export const templateWordsError = ['ошибку', 'ошибки', 'ошибок'];
export const modelsCount = 15;

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
    relevanceAndReplacment: 'Актуальные с заменой',
    relevanceSameModel: 'Заменены сами на себя',
    notValidReplacement: 'Невалидные замены',
    googleSheet: 'Перейти в Google таблицу'
  },
  statisticsTitles: {
    relevanceAndReplacment: 'В таблице список актуальных и доступных к заказу моделей (согласно текущему прайсу), но у которых указана рекомендуемая замена в Google таблице. Нужно проверить и указать правильный статус в столбце "relevance", либо убрать замену из поля "replacement".',
    relevanceSameModel: 'В таблице список снятых с производства моделей оборудования, которые указаны как рекомендуемая замена сами себе. Нужно проверить актуальность позиции из столбца "Модель" и указать правильную замену в столбце "replacement" Google таблицы, либо поменять статус актуальности (столбец "relevance").',
    notValidReplacement: 'В таблице список моделей оборудования, которые не будут найдены при поиске, так как их рекомендуемые замены отсутствуют в основном списке. Наименования из столбца "Замена" нужно поместить в столбец "model" в Google таблице, либо очистить поле "replacement" если замена не актуальна.',
  },
  pageNotFound: {
    title: '404 - страница не найдена',
    text: 'Ой, здесь ничего нет',
  }
}

const spreadsheetId = "148wA9wWJro2mwng84-YKu4LvSgWLnoapIedAZmsk8Uw";
export const baseUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&sheet=models`;
export const faqUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&sheet=FAQ`;
export const googleDocsUrl = `https://docs.google.com/spreadsheets/d/148wA9wWJro2mwng84-YKu4LvSgWLnoapIedAZmsk8Uw/edit#gid=0`;
