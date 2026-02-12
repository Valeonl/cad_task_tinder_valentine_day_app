// Банк карточек (исходные данные)
const CardsBank = [
  {
    "text": "Написать парсер на Python для Airflow до обеда",
    "onSwipeRight": { "it": 15, "bureaucracy": -5, "soul": 5 },
    "onSwipeLeft": { "it": -10, "methodology": 10, "soul": 5 }
  },
  {
    "text": "Листы самооценки! Заполняем все прямо сейчас",
    "onSwipeRight": { "bureaucracy": 20, "soul": -10, "methodology": 5 },
    "onSwipeLeft": { "bureaucracy": -15, "soul": 15, "it": 5 },
    "forceInclude": true, // обязательно будет в выборке
    "forceSide": "right",
  },
  {
    "text": "Подготовить «Ручейки» по всем садам и школам города",
    "onSwipeRight": { "methodology": 20, "it": -5, "soul": 5 },
    "onSwipeLeft": { "methodology": -10, "it": 10, "soul": 5 }
  },
  {
    "text": "Уйти на удаленку, но забыть настроить VPN",
    "onSwipeRight": { "soul": 15, "it": -10, "bureaucracy": -5 },
    "onSwipeLeft": { "it": 10, "soul": -5, "bureaucracy": 10 }
  },
  {
    "text": "Перевести процесс на Loginom",
    "onSwipeRight": { "it": 15, "bureaucracy": 10, "methodology": 5 },
    "onSwipeLeft": { "it": -10, "soul": 10 },
    "forceInclude": true
  },
  {
    "text": "Попытаться обыграть кого-то из отдела МТО в настольный тенис",
    "onSwipeRight": { "soul": 15, "bureaucracy": 10 },
    "onSwipeLeft": { "soul": -5, "it": 15 }
  },
  {
    "text": "Выполнить нумерацию 250 листов вручную",
    "onSwipeRight": { "bureaucracy": 20, "it": -10, "methodology": 5 },
    "onSwipeLeft": { "bureaucracy": -15, "soul": 10 },
    "forceInclude": true
  },
  {
    "text": "Провести правовую оценку чего-либо",
    "onSwipeRight": { "methodology": 15, "it": 5, "bureaucracy": 10 },
    "onSwipeLeft": { "soul": 10, "methodology": -5 },
    "forceInclude": true // обязательно будет в выборке
  },
  {
    "text": "Взять отпуск только по будням, без учёта выходных",
    "forceSide": "left",
    "forceInclude": true,
    "onSwipeRight": { "soul": -20 },
    "onSwipeLeft": { "soul": 20 },
  },
  // Добавляем новые карточки для разнообразия в банке
  {
    "text": "Обновить документацию в Gramax у какой-то старой инструкции",
    "onSwipeRight": { "methodology": 15, "bureaucracy": 10, "soul": -5 },
    "onSwipeLeft": { "it": 10, "soul": 5 }
  },
  {
    "text": "Настроить CI/CD пайплайн для нового сервиса",
    "onSwipeRight": { "it": 20, "methodology": 10, "soul": 5 },
    "onSwipeLeft": { "it": -10, "bureaucracy": 5 }
  },
  {
    "text": "Собрать данные по гос.заданию с 52 учреждений за неделю",
    "onSwipeRight": { "methodology": 15, "bureaucracy": 10, "soul": -5 },
    "onSwipeLeft": { "soul": 10, "it": 5 }
  },
  {
    "text": "Оптимизировать запросы к базе данных",
    "onSwipeRight": { "it": 20, "methodology": 5, "soul": 10 },
    "onSwipeLeft": { "it": -10, "bureaucracy": 5 }
  },
  {
    "text": "Подготовить отчет для руководства за квартал",
    "onSwipeRight": { "bureaucracy": 20, "methodology": 10, "soul": -10 },
    "onSwipeLeft": { "soul": 15, "it": 5 }
  },
  {
    "text": "Купить новую кофемашину в отдел",
    "forceSide": "right",
    "onSwipeRight": { "soul": 30, "bureaucracy": -10 },
    "onSwipeLeft": {}
  },
  {
    "text": "Написать скрипт для мониторинга пирогов/пицц в столовой",
    "onSwipeRight": { "it": 20, "bureaucracy": 5, "soul": 5 },
    "onSwipeLeft": { "it": -10, "methodology": 10 },
    "forceInclude": true,
  },
  {
    "text": "Принять участие в профориентации от ЦАД",
    "onSwipeRight": { "it": 20, "soul": 15, "methodology": 5 },
    "onSwipeLeft": { "bureaucracy": 10, "soul": -5 }
  },
  {
    "text": "Разобрать все заявки на регистрацию пользователей в KeyClock за 15 минут",
    "onSwipeRight": { "it": 10, "soul": 10, "bureaucracy": 5 },
    "onSwipeLeft": { "it": -15, "soul": -5 }
  },
  {
    "text": "Провести аудит безопасности системы",
    "onSwipeRight": { "methodology": 20, "it": 15, "bureaucracy": 10 },
    "onSwipeLeft": { "it": -10, "soul": 5 }
  },
  {
    "text": "Корпоратив в честь праздника 14 февраля",
    "forceSide": "right",
    "forceInclude": true,
    "onSwipeRight": { "soul": 40, "bureaucracy": -15 },
    "onSwipeLeft": {}
  }
];

// Функция для получения случайных N карточек с обязательным включением forceInclude
const getRandomCards = (bank, count = 5) => {
  // Отделяем карточки, которые обязательно должны быть в выборке
  const forceCards = bank.filter(card => card.forceInclude === true);
  
  // Остальные карточки (без forceInclude)
  const otherCards = bank.filter(card => !card.forceInclude);
  
  // Проверяем: если обязательных карточек больше чем count, берём только первые count
  if (forceCards.length >= count) {
    const selectedForce = forceCards.slice(0, count);
    return selectedForce.map((card, index) => ({
      id: index + 1,
      ...card
    }));
  }
  
  // Сколько ещё нужно добавить случайных карточек
  const remainingCount = count - forceCards.length;
  
  // Перемешиваем остальные карточки
  const shuffledOthers = [...otherCards].sort(() => Math.random() - 0.5);
  
  // Берём нужное количество из перемешанных остальных
  const selectedOthers = shuffledOthers.slice(0, remainingCount);
  
  // Объединяем обязательные и случайные карточки
  const selected = [...forceCards, ...selectedOthers];
  
  // Перемешиваем финальный массив, чтобы обязательные карточки не всегда были первыми
  const shuffledFinal = selected.sort(() => Math.random() - 0.5);
  
  // Добавляем ID для каждой карточки (от 1 до count)
  return shuffledFinal.map((card, index) => ({
    id: index + 1,
    ...card
  }));
};

// Использование:
// Получаем 10 случайных карточек из банка, но карточки с forceInclude: true всегда в выборке
const CardsData = getRandomCards(CardsBank, 10);

// Проверяем результат
console.log(CardsData);