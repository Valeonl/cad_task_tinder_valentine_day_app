let currentCardIndex = 0;
let userStats = { teamwork: 0, analytics: 0, efficiency: 0, chaos: 0, it: 0, methodology: 0, soul: 0, bureaucracy: 0 };

const container = document.getElementById('game-container');
const resultsScreen = document.getElementById('results');

function startGame() {
    document.getElementById('intro').classList.add('hidden');
    renderCard(); // Теперь карточка рендерится только после нажатия кнопки
}

function renderCard() {
    if (currentCardIndex >= CardsData.length) {
        showResults();
        return;
    }

    const data = CardsData[currentCardIndex];
    const card = document.createElement('div');
    card.className = 'card';
    
    // Добавляем HTML для надписей внутрь карточки
    card.innerHTML = `
        <div class="card-label label-love">ДА!</div>
        <div class="card-label label-nope">Нет!</div>
        <div class="card-text">${data.text}</div>
    `;
    
    container.appendChild(card);
    const hamtime = new Hammer(card);

    // Находим эти надписи, чтобы менять их opacity
    const loveLabel = card.querySelector('.label-love');
    const nopeLabel = card.querySelector('.label-nope');

    // Внутри функции renderCard, в обработчике hamtime.on('pan', ...)
hamtime.on('pan', (ev) => {
    card.style.transition = 'none';
    const x = ev.deltaX;
    const y = ev.deltaY;
    const rotate = x / 15;
    
    card.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
    
    // Новая логика появления центральных надписей:
    if (x > 30) { 
        // Постепенно проявляем ДА! при движении вправо
        loveLabel.style.opacity = Math.min(x / 100, 1); 
        nopeLabel.style.opacity = 0; 
    } else if (x < -30) { 
        // Постепенно проявляем НЕТ! при движении влево
        nopeLabel.style.opacity = Math.min(-x / 100, 1); 
        loveLabel.style.opacity = 0; 
    } else {
        loveLabel.style.opacity = 0;
        nopeLabel.style.opacity = 0;
    }
});

    hamtime.on('pan', (ev) => {
    card.style.transition = 'none';
    let x = ev.deltaX;
    const y = ev.deltaY;

    // --- ЛОГИКА БЛОКИРОВКИ ---
    if (data.forceSide === 'right' && x < 0) x = x / 5; // Сопротивление при попытке уйти влево
    if (data.forceSide === 'left' && x > 0) x = x / 5;  // Сопротивление при попытке уйти вправо
    // -------------------------

    const rotate = x / 15;
    card.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
    
    // Появление надписей (учитываем блокировку)
    if (x > 30 && data.forceSide !== 'left') { 
        loveLabel.style.opacity = Math.min(x / 100, 1); 
        nopeLabel.style.opacity = 0; 
    } else if (x < -30 && data.forceSide !== 'right') { 
        nopeLabel.style.opacity = Math.min(-x / 100, 1); 
        loveLabel.style.opacity = 0; 
    } else {
        loveLabel.style.opacity = 0;
        nopeLabel.style.opacity = 0;
    }
});

hamtime.on('panend', (ev) => {
    card.style.transition = '0.4s';
    
    // Проверяем, достаточно ли далеко ушла карта и разрешено ли это направление
    const canSwipeRight = (ev.deltaX > 120 && data.forceSide !== 'left');
    const canSwipeLeft = (ev.deltaX < -120 && data.forceSide !== 'right');

    if (canSwipeRight) {
        swipeCard(card, 'right', data);
    } else if (canSwipeLeft) {
        swipeCard(card, 'left', data);
    } else {
        // Возвращаем на место, если свайп запрещен или слаб
        card.style.transform = '';
        loveLabel.style.opacity = 0;
        nopeLabel.style.opacity = 0;
    }
});
}

function swipeCard(card, side, data) {
    const outX = side === 'right' ? 1000 : -1000;
    card.style.transform = `translate(${outX}px, 0) rotate(${outX/20}deg)`;
    
    const scores = side === 'right' ? data.onSwipeRight : data.onSwipeLeft;
    for (let key in scores) { userStats[key] += scores[key]; }

    currentCardIndex++;
    setTimeout(() => {
        card.remove();
        updateProgress();
        renderCard();
    }, 200);
}

function updateProgress() {
    document.getElementById('progress').style.width = (currentCardIndex / CardsData.length * 100) + '%';
}

function showResults() {
    // 1. Скрываем игровое поле и показываем экран результатов
    container.classList.add('hidden');
    resultsScreen.classList.remove('hidden');

    // 2. Определяем основные категории для финала
    const mainTraits = ['it', 'methodology', 'soul', 'bureaucracy'];
    
    // Находим лидера и аутсайдера среди этих категорий
    const topTrait = mainTraits.reduce((a, b) => userStats[a] > userStats[b] ? a : b);
    const lowTrait = mainTraits.reduce((a, b) => userStats[a] < userStats[b] ? a : b);

    // 3. Берем данные из ResultsData (файл results.js)
    const resultInfo = ResultsData.roles[topTrait];
    let finalDesc = resultInfo.desc;

    // 4. Логика "Слабого звена": если в какой-то категории меньше 5 очков
    if (userStats[lowTrait] < 5) {
        const noteKey = "low" + lowTrait.charAt(0).toUpperCase() + lowTrait.slice(1);
        if (ResultsData.specialNotes[noteKey]) {
            finalDesc += " " + ResultsData.specialNotes[noteKey]; // Добавляем ироничную заметку
        }
    }

    // 5. Логика интенсивности (зависит от количества очков лидера)
    const totalScore = userStats[topTrait];
    if (totalScore > 40) {
        finalDesc += " " + ResultsData.intensity.high;
    } else if (totalScore > 20) {
        finalDesc += " " + ResultsData.intensity.medium;
    } else {
        finalDesc += " " + ResultsData.intensity.low;
    }

    // 6. Выводим результат на экран
    // Используем CategoriesData для красивого названия роли на русском
    const russianCategory = CategoriesData[topTrait] || topTrait;
    document.getElementById('role-title').innerText = `${russianCategory}: ${resultInfo.title}`;
    document.getElementById('role-desc').innerText = finalDesc;
}

function showStatsModal() {
    const list = document.getElementById('modal-stats-list');
    list.innerHTML = ''; 

    // Проходим по всем характеристикам в статистике
    for (let key in userStats) {
        // Показываем только те, где значение не 0
        if (userStats[key] !== 0) {
            const row = document.createElement('div');
            row.className = 'stat-row';
            
            // Берем перевод из CategoriesData (создайте этот файл или объект)
            const label = CategoriesData[key] || key;
            const val = userStats[key];
            const displayVal = val > 0 ? `+${val}` : val;

            row.innerHTML = `<span>${label}</span><strong>${displayVal}</strong>`;
            list.appendChild(row);
        }
    }
    
    // Если статистики еще нет
    if (list.innerHTML === '') {
        list.innerHTML = '<p style="color: #999; text-align: center;">Сначала сделай пару свайпов!</p>';
    }

    document.getElementById('statsModal').style.display = 'flex';
}


function takeScreenshot() {
    const element = document.getElementById('capture-area');
    const btn = document.querySelector('.btn-share');
    
    // Временно меняем текст кнопки
    btn.innerText = "Генерация...";
    btn.disabled = true;

    html2canvas(element, {
        backgroundColor: "#fce4ec", // Цвет фона на скриншоте
        scale: 2, // Повышаем качество (Retina)
    }).then(canvas => {
        // Создаем ссылку для скачивания
        const link = document.createElement('a');
        link.download = `my-valentine-status-${Date.now()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        
        btn.innerText = "📸 Сохранить результат";
        btn.disabled = false;
    }).catch(err => {
        console.error("Ошибка скриншота:", err);
        alert("Не удалось создать скриншот. Попробуй сделать его вручную!");
        btn.innerText = "📸 Сохранить результат";
        btn.disabled = false;
    });
}
