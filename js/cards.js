// Банк карточек (исходные данные)
const CardsBank = [
  // ========== IT-ЗАДАЧИ ==========
  {
    "text": "Написать парсер на Python для Airflow до обеда",
    "onSwipeRight": { "it": 2, "soul": -2, "bureaucracy": -2 },
    "onSwipeLeft": { "it": -1, "economy": 1, "soul": 0 }
  },
  {
    "text": "Настроить CI/CD пайплайн для нового сервиса",
    "onSwipeRight": { "it": 2, "methodology": 0, "soul": 0, "efficiency": 1 },
    "onSwipeLeft": { "it": -1, "bureaucracy": 0 }
  },
  {
    "text": "Оптимизировать запросы к базе данных",
    "onSwipeRight": { "it": 1, "methodology": 0, "soul": 0, "analytics": 1},
    "onSwipeLeft": { "it": -1, "bureaucracy": 0, "analytics": -1 }
  },
  {
    "text": "Разобрать все заявки на регистрацию пользователей в KeyCloak за 15 минут",
    "onSwipeRight": { "it": 1, "soul": 0, "analytics": 1 },
    "onSwipeLeft": { "it": -1, "soul": -1 }
  },
  {
    "text": "Написать скрипт для отслеживания появления пирогов/пицц в столовой",
    "onSwipeRight": { "it": 1, "bureaucracy": 0},
    "onSwipeLeft": { "it": -1, "methodology": 1, "soul": 0 },
  },
  {
    "text": "Перевести процесс на Loginom",
    "onSwipeRight": { "it": 1, "bureaucracy": -1, "methodology": 0, "analytics": 2 },
    "onSwipeLeft": { "it": -1, "soul": 0, "analytics": -1 },
    "notes": {
        "right": "Ещё Вы амбасадор Loginom!",
        "left": "Чтоб Вы знали - в Loginom данные считаются быстрее, чем в Excel"
    }
  },
  

  // ========== БЮРОКРАТИЯ ==========
  {
    "text": "Сдать вовремя лист самооценки!",
    "onSwipeRight": { "bureaucracy": 1, "methodology": 0 },
    "onSwipeLeft": { "bureaucracy": -1, "soul": 1, "it": 0 },
    "forceInclude": true,
    "forceSide": "right"
  },
  {
    "text": "Заполнить отчёт за день в Битрикс24",
    "onSwipeRight": { "bureaucracy": 1, "methodology": 1, "soul": -1 },
    "onSwipeLeft": { "soul": 1, "it": 0 }
  },
  {
    "text": "Собрать данные по гос.заданию с 52 учреждений за неделю",
    "onSwipeRight": { "methodology": 1, "bureaucracy": 1, "soul": -1 },
    "onSwipeLeft": { "analytics": -2, "economy": -1, "it": 0 }
  },
  {
    "text": "Перепроверить контрактацию 5 раз за день",
    "onSwipeRight": { "bureaucracy": 1, "soul": -1 },
    "onSwipeLeft": { "bureaucracy": -1}
  },
  {
    "text": "Провести длительное совещание по проекту",
    "onSwipeRight": { "bureaucracy": 1, "team_work": 1, "it": 0 },
    "onSwipeLeft": { "bureaucracy": -1, "team_work": -1, "methodology": 0 }
  },

  // ========== МЕТОДОЛОГИЯ ==========
  {
    "text": "Подготовить «Ручейки» по всем садам и школам города",
    "onSwipeRight": { "methodology": 1, "analytics": 1, "soul": 0 },
    "onSwipeLeft": { "methodology": -1, "it": 0, "soul": 0 }
  },
  {
    "text": "Обновить документацию в Gramax у какой-то старой инструкции",
    "onSwipeRight": { "methodology": 1, "bureaucracy": 1, "soul": -1, "analytics": 1},
    "onSwipeLeft": { "it": -1, "chaos": 1 }
  },
  {
    "text": "Провести аудит безопасности системы",
    "onSwipeRight": { "methodology": 0, "it": 1, "bureaucracy": 1 },
    "onSwipeLeft": { "it": -1, "soul": 0 }
  },
  {
    "text": "Выдать пропуск новому сотруднику",
    "onSwipeRight": { "methodology": 0, "it": 1, "bureaucracy": 1 },
    "onSwipeLeft": { "it": -1, "soul": 0, "bureaucracy": -1}
  },
  {
    "text": "Проверить вручную сайты образовательных учреждений на соответствие нормам",
    "onSwipeRight": { "methodology": 1, "soul": 0, "bureaucracy": 0 },
    "onSwipeLeft": { "methodology": -1 }
  },
  {
    "text": "Написать регламент на наименование папок на сетевом диске, который никто не будет читать",
    "onSwipeRight": { "methodology": 1, "bureaucracy": 1, "soul": -1 },
    "onSwipeLeft": { "methodology": -1, "it": 1, "soul": 0 }
  },

  // ========== ДУША И КОМФОРТ ==========
  {
    "text": "Уйти на удаленку, но забыть настроить VPN",
    "onSwipeRight": { "it": -1, "bureaucracy": 0 },
    "onSwipeLeft": { "it": 1, "bureaucracy": 1 }
  },
  {
    "text": "Попытаться обыграть кого-то из отдела МТО в настольный теннис",
    "onSwipeRight": { "soul": 1, "bureaucracy": 0 },
    "onSwipeLeft": { "soul": -1, "efficiency": 1 }
  },
  {
    "text": "Подняться на лифте, а не по лестнице",
    "onSwipeRight": { "efficiency": 1 },
    "onSwipeLeft": { "efficiency": -1, "it": -1 }
  },
  {
    "text": "Купить новую кофемашину в отдел",
    "onSwipeRight": { "soul": 2, "bureaucracy": -1, "mto": 2 },
    "onSwipeLeft": { "soul": -1, "team_work": -1},
    "notes": {
        "left": "Из-за Вашего решения отдел остался без кофемашины",
        "right": "Благодаря Вам кофе льётся рекой"
    }
  },
  {
    "text": "Корпоратив в честь праздника 14 февраля",
    "onSwipeRight": { "soul": 1, "bureaucracy": 0 },
    "onSwipeLeft": { "team_work": -1, "bureaucracy": 0 },
    "notes": {
        "left": "Вы обидели Святого Валентина!",
        "right": "Корпоративу быть - числа эдак 27!"
    }
  },
  {
    "text": "Взять отпуск только по будням, без учёта выходных",
    "forceSide": "left",
    "onSwipeRight": { "bureaucracy": -1 },
    "onSwipeLeft": { "bureaucracy": 1 },
    "notes": {
        "left": "Не жалеете отдел КДПО, зато как отдыхаете!",
        "right": "КДПО ставит Вам лайк за грамотную расстановку отпуска."
    }
  },
  {
    "text": "Сделать сводную таблицу в Excel и 20 минут ждать пока она обновится",
    "onSwipeRight": { "bureaucracy": 0, "analytics": 1, "economy": -1 },
    "onSwipeLeft": { "bureaucracy": 1 },
  },
  {
    "text": "Принести пирожки в отдел и поделиться ими с коллегами",
    "onSwipeRight": { "team_work": 1, "it": 0, "bureaucracy": 0 },
    "onSwipeLeft": { "team_work": -1, "it": 0, "bureaucracy": 0 }
  },
  {
    "text": "Устроить утреннее кофепитие с коллегами",
    "onSwipeRight": { "soul": 1, "team_work": 1, "methodology": 0 },
    "onSwipeLeft": { "team_work": -1, "it": 0, "bureaucracy": 0 }
  },

  // ========== АРХИВ ==========
  {
    "text": "Выполнить нумерацию 250 листов вручную",
    "onSwipeRight": { "archive": 1, "it": -1, "methodology": 0, "bureaucracy": -1 },
    "onSwipeLeft": { "archive": -1, "soul": 0 },
  },
  {
    "text": "Просканировать весь архив новым сканером",
    "onSwipeRight": { "archive": 3, "it": 1, "methodology": 0, "bureaucracy": -1 },
    "onSwipeLeft": { "archive": -1, "soul": 0 },
  },
  {
    "text": "Отремонтировать фасад ЦАД",
    "onSwipeRight": { "archive": 3, "it": 1, "methodology": 0, "bureaucracy": -1 },
    "onSwipeLeft": { "archive": -1, "soul": 0 },
    "forceSide": "left",
    "notes": {
        "left": "Вы решили - поэтому фасад теперь такой!",
        "right": "Жулики"
    }
  },
  {
    "text": "Найти справку о стаже за 1995 год за 5 минут",
    "onSwipeRight": { "archive": 1, "soul": 1, "methodology": 0 },
    "onSwipeLeft": { "archive": -1, "soul": -1, "it": 0 }
  },

  // ========== ЮРИСТЫ ==========
  {
    "text": "Провести правовую оценку чего-либо",
    "onSwipeRight": { "jurist": 2, "it": 0, "bureaucracy": 1 },
    "onSwipeLeft": { "jurist": -1 },
  },
  {
    "text": "Быть ведущим на мероприятии в ЦАД",
    "onSwipeRight": { "team_work": 1, "jurist": 1, "it": 0, },
    "onSwipeLeft": { "soul": -1, "jurist": -1 },
  },
  {
    "text": "Выложить новую статью на Портал ЦАД (portal.gkuoa.ru)",
    "onSwipeRight": { "bureaucracy": 1, "soul": 1, "methodology": 1 },
    "onSwipeLeft": { "bureaucracy": -1, "methodology": -1, "it": 0 }
  },
  {
    "text": "Провести мотивирующий тренинг личности для коллег",
    "onSwipeRight": { "bureaucracy": 0, "team_work": 1, "methodology": 1 },
    "onSwipeLeft": { "bureaucracy": 0, "methodology": -1, "it": 0 }
  },
  {
    "text": "Записать видеоподкаст для коллег",
    "onSwipeRight": { "bureaucracy": 0, "soul": 1, "methodology": 1 },
    "onSwipeLeft": { "bureaucracy": 0, "methodology": -1, "it": 0 }
  },

  // ========== МТО / ХОЗЯЙСТВО ==========
  {
    "text": "Помочь Виктору Валерьевичу разгрузить картриджи и бумагу",
    "onSwipeRight": { "mto": 1, "bureaucracy": 0, "team_work": 1  },
    "onSwipeLeft": { "mto": -1, "team_work": -1 }
  },
  {
    "text": "Закупить всем канцелярию",
    "onSwipeRight": { "economy": 1, "bureaucracy": 1, "mto": 3, "team_work": 1 },
    "onSwipeLeft": { "economy": -1, "mto": -1  }
  },

  // ========== ЭКОНОМИКА ==========
  {
    "text": "Перепроверить контрактацию 5 раз за день",
    "onSwipeRight": { "economy": 1, "bureaucracy": 1, "soul": -1, "analytics": 1 },
    "onSwipeLeft": { "economy": -1}
  },
  {
    "text": "Заполнять вручную информацию по образовательным учреждениям",
    "onSwipeRight": { "economy": 1, "bureaucracy": 0, "soul": -1 },
    "onSwipeLeft": { "economy": -1, "chaos": 1 }
  },
  {
    "text": "Так погрузиться в работу, что в конце дня пьёшь утренний холодный чай/кофе",
    "onSwipeRight": { "economy": 1, "bureaucracy": 0, "soul": -1 },
    "onSwipeLeft": { "economy": -1, "chaos": 1, "efficiency": 2},
    "notes": {
        "right": "Обязательно добавьте в свой вишлист на ДР термокружку!",
        "left": "Во время работы Вы не расстаётесь с чаем/кофе"
    }

  },
  {
    "text": "Скинуть коллегам смешной мем в чат во время трудной задачи",
    "onSwipeRight": { "economy": 1, "bureaucracy": 0, "soul": 1, "team_work": 1 },
    "onSwipeLeft": { "economy": -1, "soul": -1, "team_work": -1 },
    "notes": {
        "right": "Ваши мемы поддерживают в трудную минуту",
        "left": "Вам жалко скинуть мем..."
    }
  },
  {
    "text": "Пообедать вместе с коллегами",
    "onSwipeRight": { "economy": 0, "soul": 1, "bureaucracy": 0, "team_work": 1},
    "onSwipeLeft": { "soul": -2},
    "notes": {
        "right": "Все сплетни обсуждаете за обедами с коллегами ?",
        "left": "Вы предпочли обед в гордом одиночестве("
    }
  },

  // ========== ХАОС / ВНЕЗАПНО ==========
  {
    "text": "Сломать прод сборку Appsmith за 10 минут до сбора данных",
    "onSwipeRight": { "it": -1, "soul": -1, "chaos": 2,  "analytics": -2},
    "onSwipeLeft": { "it": 1, "methodology": 2 }
  },
  {
    "text": "Случайно почистил таблицу в боевой базе LsFusion",
    "onSwipeRight": { "it": 1, "chaos": 2, "soul": -2, "analytics": -1 },
    "onSwipeLeft": { "it": 1, "methodology": 2, "bureaucracy": 1 },
    "notes": {
        "right": "Весь сектор РИС теперь знает Вас в лицо (в плохом смысле).",
        "left": "Ваша выдержка спасла LsFusion от катастрофы. "
    }
  },
  {
    "text": "Отключать электричество в пятницу без бэкапа",
    "onSwipeRight": { "it": 1, "soul": -1, "chaos": 2, },
    "onSwipeLeft": { "it": 1, "soul": 0, "chaos": -1 }
  },
  {
    "text": "Склеить порванную опись дел 1950-х годов",
    "onSwipeRight": { "archive": 2, "methodology": 1, "soul": 0 },
    "onSwipeLeft": { "archive": -1, "chaos": 1 }
  },
  // --- IT / АНАЛИТИКА ---
  {
    "text": "Оставить несохранённый открытый Excel файл и уйти на обед",
    "onSwipeRight": { "chaos": 1, "soul": -1, "team_work": -1 },
    "onSwipeLeft": { "it": 0, "team_work": 1, "bureaucracy": 1 }
  },
  {
    "text": "Найти дубликаты в базе данных из 100 000 строк",
    "onSwipeRight": { "analytics": 2, "it": 1, "efficiency": 1 },
    "onSwipeLeft": { "analytics": -1, "chaos": 1 }
  },
  {
    "text": "Попробовать запустить Python-скрипт сканера сетевого диска на Гравитоне",
    "onSwipeRight": { "it": 2, "chaos": 1, "soul": -1 },
    "onSwipeLeft": { "it": -1, "bureaucracy": 1 }
  },
  // --- ЮРИСТЫ / МЕТОДОЛОГИЯ ---
  {
    "text": "Доказать проверке, что та запятая в регламенте стоит на законных основаниях",
    "onSwipeRight": { "jurist": 2, "bureaucracy": 1, "methodology": 1 },
    "onSwipeLeft": { "jurist": -1, "bureaucracy": -1 }
  },
  // --- ДУША / КОМАНДА ---
  {
    "text": "Тайком оставить шоколадку на столе грустного коллеги",
    "onSwipeRight": { "soul": 1, "team_work": 2 },
    "onSwipeLeft": { "soul": -1, "team_work": -1 },
    "notes": {
        "right": "Вы — тайный Валентин нашего офиса!",
        "left": "Шоколадка осталась у Вас. Ну, тоже неплохо."
    }
  },
  {
    "text": "Организовать сбор на подарок коллеге за 5 минут до конца рабочего дня",
    "onSwipeRight": { "team_work": 1, "soul": 1, "mto": 1 },
    "onSwipeLeft": { "team_work": -1, "soul": 0 }
  },
  {
    "text": "Принести из дома кактус и поставить его рядом с сервером 'на удачу'",
    "onSwipeRight": { "soul": 1, "chaos": 1, "it": -1 },
    "onSwipeLeft": { "it": 1, "soul": 0 }
  },
  {
    "text": "Найти на складе 5 запасных мышек, когда все говорят, что их нет",
    "onSwipeRight": { "mto": 1, "it": 1, "efficiency": 1 },
    "onSwipeLeft": { "mto": -1, "it": -1 }
  },
  {
    "text": "Объединить 8 Марта и 23 Февраля в один праздник",
    "onSwipeRight": { "economy": 2, "soul": 1, "team_work": 1 },
    "onSwipeLeft": { "economy": -1, "soul": -1 },
    "notes": {
        "right": "Вы мыслите как истинный руководитель",
        "left": "Сделаем вид, что Вы не спайпнули в 'Нет'"
    }
  },
  {
    "text": "Работать в наушниках, чтобы никто не отвлекал от важного отчета",
    "onSwipeRight": { "efficiency": 2, "analytics": 1, "team_work": -1 },
    "onSwipeLeft": { "team_work": 1, "efficiency": -1 }
  },
  {
    "text": "Попробовать обновить сервер прямо посреди рабочего дня",
    "onSwipeRight": { "chaos": 3, "it": 1, "efficiency": -2 },
    "onSwipeLeft": { "it": 1, "bureaucracy": 2 }
  },
  {
    "text": "Зайти в кабинет к начальству 'просто спросить' и остаться на 2 часа",
    "onSwipeRight": { "bureaucracy": 1, "soul": 0, "efficiency": -1 },
    "onSwipeLeft": { "efficiency": 1}
  },
  {
    "text": "Пересобрать дашборд в Superset, потому что 'цифры кажутся некрасивыми'",
    "onSwipeRight": { "analytics": 2, "it": 1, "efficiency": 1 },
    "onSwipeLeft": { "analytics": -1, "chaos": 1 }
  },
  {
    "text": "Написать формулу в Excel длиной в три строки и забыть закрыть скобку",
    "onSwipeRight": { "analytics": 1, "chaos": 1, "efficiency": -1 },
    "onSwipeLeft": { "it": 1, "efficiency": 1 }
  },
  {
    "text": "Перенести все данные из Яндекс.Таблиц в Excel, чтобы 'было надежнее'",
    "onSwipeRight": { "bureaucracy": 1, "analytics": 1, "it": -1 },
    "onSwipeLeft": { "it": 2, "efficiency": 1, "analytics": -1 }
  },
  {
    "text": "Создать идеальную визуализацию в Superset, которую никто не откроет",
    "onSwipeRight": { "analytics": 2, "it": 1, "soul": -1 },
    "onSwipeLeft": { "efficiency": 1, "analytics": -1 }
  },
  {
    "text": "Искать ответ на сложный вопрос в КонсультантПлюс дольше двух часов",
    "onSwipeRight": { "jurist": 2, "methodology": 1, "efficiency": -1 },
    "onSwipeLeft": { "efficiency": 2, "jurist": -1 }
  },
  {
    "text": "Обновить ссылки в Gramax, которые вели на несуществующие папки",
    "onSwipeRight": { "methodology": 1, "chaos": -1, "it": 0, "efficiency": 1 },
    "onSwipeLeft": { "it": 0, "methodology": -1, "chaos": 1}
  },
  {
    "text": "Придумать смешную шутку в Общем чате",
    "onSwipeRight": { "soul": 2, "team_work": 1, "methodology": 0, "efficiency": -1 },
    "onSwipeLeft": { "efficiency": 1, "soul": -1 }
  },
  {
    "text": "Предложить автоматизировать процесс, который делается раз в год",
    "onSwipeRight": { "it": 1, "efficiency": -1, "bureaucracy": 1 },
    "onSwipeLeft": { "efficiency": 1, "it": -1 }
  },
  {
    "text": "Удалить старые версии файлов 'Отчет_v2_исправлено_ВАЖНО.xlsx'",
    "onSwipeRight": { "archive": 2, "efficiency": 1, "it": 1 },
    "onSwipeLeft": { "chaos": 2, "archive": -1 }
  },
  {
    "text": "Объяснить коллеге, почему его чек из пятёрочки напротив нельзя провести как 'представительские расходы'",
    "onSwipeRight": { "economy": 1, "bureaucracy": 2, "jurist": 1 },
    "onSwipeLeft": {"economy": -1 }
  },
  {
    "text": "Сделать ER-диаграмму всей БД LsFusion",
    "onSwipeRight": { "soul": 1, "chaos": -2, "it": 2, "analytics": 2 },
    "onSwipeLeft": { "chaos": 1},
    "forceSide": "left"
  },
  {
    "text": "Загрузить в Gramax инструкцию по использованию Gramax",
    "onSwipeRight": { "methodology": 1, "bureaucracy": 1, "it": 1 },
    "onSwipeLeft": { "chaos": 1, "methodology": -1 }
  },
  {
    "text": "Заказать на 23 февраля столько пиццы, чтобы хватило и на 8 марта",
    "onSwipeRight": { "economy": 1, "soul": 1, "mto": 1 },
    "onSwipeLeft": { "economy": -1, "mto": -1 }
  },
  {
    "text": "Предложить переименовать все папки на сетевом диске согласно алфавиту и цвету радуги",
    "onSwipeRight": { "archive": 1, "bureaucracy": 1, "chaos": 1 },
    "onSwipeLeft": {"archive": -1 }
  },
  {
    "text": "Автоматизировать всё, что можно!",
    "onSwipeRight": { "it": 1, "chaos": -1, "efficiency": -2 },
    "onSwipeLeft": {"it": -1, "bureaucracy": 1}
  },
  {
    "text": "Пропустить совещание с начальством!",
    "onSwipeRight": { "chaos": 2, "efficiency": -1 },
    "onSwipeLeft": {"chaos": -1, "bureaucracy": 1}
  }
];

// Функция для получения случайных N карточек с обязательным включением forceInclude
const getRandomCards = (bank, count = 10) => {
    // Вспомогательная функция для честного перемешивания
    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    // 1. Отделяем обязательные
    const forceCards = bank.filter(card => card.forceInclude === true);
    // 2. Отделяем остальные
    const otherCards = bank.filter(card => !card.forceInclude);
    
    let selected;

    if (forceCards.length >= count) {
        // Если обязательных больше или столько же, сколько нужно в итоге
        selected = shuffle([...forceCards]).slice(0, count);
    } else {
        // Если нужно добрать случайными
        const remainingCount = count - forceCards.length;
        const shuffledOthers = shuffle([...otherCards]);
        const selectedOthers = shuffledOthers.slice(0, remainingCount);
        selected = [...forceCards, ...selectedOthers];
    }
  
    // 3. Финальное перемешивание (теперь точно случайное)
    const shuffledFinal = shuffle(selected);
  
    // 4. Добавляем ID
    return shuffledFinal.map((card, index) => ({
        id: index + 1,
        ...card
    }));
};

// Использование:
const CardsData = getRandomCards(CardsBank, 10);
console.log(CardsData);