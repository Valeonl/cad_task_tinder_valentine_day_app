let currentCardIndex = 0;

// Автоматическое создание объекта статистики на основе категорий
let userStats = {
    rightCount: 0,
    leftCount: 0,
    collectedNotes: [] // Сюда будем складывать фразы
};

// Проходим по ключам из CategoriesData и создаем их в userStats со значением 0
Object.keys(CategoriesData).forEach(key => {
    userStats[key] = 0;
});

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playTone(freq, type, duration) {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = type; // 'sine', 'square', 'sawtooth', 'triangle'
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); // Громкость 10%
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
}

// Звуковые пресетs
const sounds = {
    swipeRight: () => {
        playTone(500, 'sine', 0.2);
        setTimeout(() => playTone(800, 'sine', 0.2), 50); // Победный "дзынь"
    },
    swipeLeft: () => {
        playTone(400, 'triangle', 0.3); // Более глухой звук для отказа
    },
    tick: () => {
        playTone(150, 'sine', 0.05); // Легкий щелчок при движении
    }
};

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
    
    card.innerHTML = `
        <div class="card-number">${currentCardIndex + 1}</div>
        <div class="card-label label-love">ДА!</div>
        <div class="card-label label-nope">Нет!</div>
        <div class="card-text">${data.text}</div>
        <div class="card-logo">
            <img src="cad_logo.svg" alt="Logo">
        </div>
    `;
    
    container.appendChild(card);

    // Добавь эти строки сразу после appendChild:
    requestAnimationFrame(() => {
        card.classList.add('visible');
    });
    
    // Инициализируем Hammer
    const hamtime = new Hammer(card);

    // Блокируем системный скролл браузера, чтобы карточка не "залипала"
    hamtime.get('pan').set({ direction: Hammer.DIRECTION_ALL, threshold: 0 });

    const loveLabel = card.querySelector('.label-love');
    const nopeLabel = card.querySelector('.label-nope');

    hamtime.on('pan', (ev) => {
        // Отменяем стандартное поведение браузера
        if (ev.pointerType === 'touch') {
            ev.srcEvent.preventDefault();
        }

        card.style.transition = 'none';
        let x = ev.deltaX;
        let y = ev.deltaY;

        // Логика блокировки (сопротивление), если свайп в эту сторону запрещен
        if (data.forceSide === 'right' && x < 0) x = x / 5; 
        if (data.forceSide === 'left' && x > 0) x = x / 5; 

        const rotate = x / 15;
        card.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
        
        // Появление надписей (с учетом блокировки)
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
        card.style.transition = '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        // Проверка: достаточно ли далеко ушла карта и разрешено ли направление
        const canSwipeRight = (ev.deltaX > 120 && data.forceSide !== 'left');
        const canSwipeLeft = (ev.deltaX < -120 && data.forceSide !== 'right');

        if (canSwipeRight) {
            swipeCard(card, 'right', data);
        } else if (canSwipeLeft) {
            swipeCard(card, 'left', data);
        } else {
            // Возврат в центр
            card.style.transform = '';
            loveLabel.style.opacity = 0;
            nopeLabel.style.opacity = 0;
        }
    });
}

function swipeCard(card, side, data) {
    // 1. Динамический расчет вылета (ширина экрана + запас)
    // Это лечит скроллы: карточка улетает ровно настолько, сколько нужно
    const flyDistance = window.innerWidth + 150;
    const outX = side === 'right' ? flyDistance : -flyDistance;
    
    // Принудительно убираем transition, чтобы анимация была под контролем
    card.style.transition = 'transform 0.4s ease-out, opacity 0.3s';
    card.style.transform = `translate(${outX}px, 0) rotate(${outX / 15}deg)`;
    card.style.opacity = '0'; // Плавно гасим карточку при вылете
    
    // 2. Звуки
    if (typeof sounds !== 'undefined') {
        if (side === 'right') sounds.swipeRight();
        else sounds.swipeLeft();
    }

    // 3. Статистика свайпов
    if (side === 'right') userStats.rightCount++;
    else userStats.leftCount++;
    
    // 4. Баллы и плавающие надписи
    const scores = side === 'right' ? data.onSwipeRight : data.onSwipeLeft;
    if (typeof showFloatingScores === 'function') {
        showFloatingScores(scores);
    }

    for (let key in scores) { 
        if (userStats.hasOwnProperty(key)) {
            userStats[key] += scores[key]; 
        }
    }

    // 5. Достижения (Notes)
    if (data.notes && data.notes[side]) {
        userStats.collectedNotes.push(data.notes[side]);
    }

    currentCardIndex++;

    // 6. Очистка и запуск следующей
    setTimeout(() => {
        card.remove();
        updateProgress();
        renderCard();
    }, 250); // Увеличил время, чтобы анимация успела доиграть
}

function updateProgress() {
    document.getElementById('progress').style.width = (currentCardIndex / CardsData.length * 100) + '%';
}

function showResults() {
    container.classList.add('hidden');
    resultsScreen.classList.remove('hidden');

    // 1. ПРОВЕРКА НА КРАЙНОСТИ
    if (userStats.rightCount === CardsData.length) {
        document.getElementById('role-title').innerText = "Человек-Да";
        document.getElementById('role-desc').innerHTML = ResultsData.extremes.allYes[0];
        renderNotes(); 
        return;
    }
    if (userStats.leftCount === CardsData.length) {
        document.getElementById('role-title').innerText = "Великий Отрицатель";
        document.getElementById('role-desc').innerHTML = ResultsData.extremes.allNo[0];
        renderNotes();
        return;
    }

    // 2. ПОДГОТОВКА ДАННЫХ
    const allStats = Object.keys(userStats)
        .filter(key => CategoriesData[key] && typeof userStats[key] === 'number')
        .map(key => ({
            id: key,
            name: CategoriesData[key],
            score: userStats[key]
        }));

    // Лидеры (те, кто в плюсе)
    const positiveScores = allStats.filter(s => s.score > 0).sort((a, b) => b.score - a.score);

    if (positiveScores.length === 0) {
        document.getElementById('role-title').innerText = "Мастер Нейтралитета";
        document.getElementById('role-desc').innerText = "Вы так аккуратно обходили все острые углы, что система не смогла приклеить вам ярлык.";
        renderNotes();
        return;
    }

    const leader = positiveScores[0];
    const runnerUp = positiveScores[1];
    
    let finalTitle = "";
    let finalDesc = "";

    // 3. ЗАГОЛОВОК
    if (runnerUp && (leader.score - runnerUp.score) < 4) {
        finalTitle = `${leader.name}-${runnerUp.name.toLowerCase()}`;
        finalDesc = `В Вас гармонично уживаются ${leader.name} и ${runnerUp.name}. <br><br>`;
    } else {
        finalTitle = leader.name;
    }

    // 4. ФРАЗА ЛИДЕРА
    const leaderPhrases = ResultsData.traits[leader.id];
    if (leaderPhrases) {
        const bestPhrase = leaderPhrases
            .filter(p => p.min !== undefined && p.min !== -99)
            .sort((a, b) => b.min - a.min)
            .find(p => leader.score >= p.min);
        
        if (bestPhrase) finalDesc += bestPhrase.text + "<br><br>";
    }

    // 5. ЛОГИКА "КСТАТИ" (Только 2 самых худших показателя)
    // Сортируем все минусы от самого плохого к менее плохому
    const negativeScores = allStats
        .filter(s => s.score < 0)
        .sort((a, b) => a.score - b.score) // Сначала самые большие минусы (-5, потом -3...)
        .slice(0, 2); // Берем только ПЕРВЫЕ ДВА

    if (negativeScores.length > 0) {
        finalDesc += `<div style="margin-top: 10px; border-top: 1px dashed rgba(0,0,0,0.1); padding-top: 5px;"></div>`;
        
        negativeScores.forEach(item => {
            const traitConfig = ResultsData.traits[item.id];
            if (traitConfig) {
                const lowConfig = traitConfig.find(p => p.min === -99);
                if (lowConfig && lowConfig.lowText) {
                    finalDesc += `<div class="low-score-note" style="font-size: 0.85em; opacity: 0.7; margin-bottom: 4px;">
                        💡 <i>Кстати: ${lowConfig.lowText}</i>
                    </div>`;
                }
            }
        });
    }

    // ВЫВОД
    document.getElementById('role-title').innerText = finalTitle;
    document.getElementById('role-desc').innerHTML = finalDesc;

    renderNotes();
}

// Функция для отрисовки подвигов (Notes)
function renderNotes() {
    const notesList = document.getElementById('notes-list');
    if (!notesList) return;
    
    notesList.innerHTML = ''; 
    if (userStats.collectedNotes && userStats.collectedNotes.length > 0) {
        const uniqueNotes = [...new Set(userStats.collectedNotes)];
        uniqueNotes.forEach(note => {
            const li = document.createElement('li');
            li.style.listStyle = "none";
            li.style.marginBottom = "5px";
            li.innerHTML = "🏆 " + note;
            notesList.appendChild(li);
        });
    }
}

function showStatsModal() {
    const list = document.getElementById('modal-stats-list');
    list.innerHTML = ''; 

    for (let key in userStats) {
        // Пропускаем технические счетчики свайпов, выведем их отдельно если нужно
        if (key === 'rightCount' || key === 'leftCount') continue;

        if (key === 'collectedNotes') {
            if (userStats[key].length > 0) {
                const notesRow = document.createElement('div');
                notesRow.className = 'stat-row achievements-row';
                const uniqueNotes = [...new Set(userStats[key])];
                
                notesRow.innerHTML = `
                    <div class="achievements-header" onclick="toggleAchievements(this)">
                        <span>🏆 Ваши подвиги (${uniqueNotes.length})</span>
                        <small>нажать, чтобы увидеть</small>
                    </div>
                    <div class="achievements-list hidden">
                        ${uniqueNotes.map(n => `• ${n}`).join('<br>')}
                    </div>
                `;
                list.appendChild(notesRow);
            }
            continue;
        }

        // Обычные показатели
        if (userStats[key] !== 0) {
            const row = document.createElement('div');
            row.className = 'stat-row';
            const label = CategoriesData[key] || key;
            const val = userStats[key];
            const displayVal = val > 0 ? `+${val}` : val;
            row.innerHTML = `<span>${label}</span><strong>${displayVal}</strong>`;
            list.appendChild(row);
        }
    }
    
    if (list.innerHTML === '') {
        list.innerHTML = '<p style="color: #999; text-align: center;">Сначала сделайте пару свайпов!</p>';
    }

    document.getElementById('statsModal').style.display = 'flex';
}

// Вспомогательная функция для открытия списка
function toggleAchievements(el) {
    const list = el.nextElementSibling;
    list.classList.toggle('hidden');
    el.querySelector('small').innerText = list.classList.contains('hidden') ? 'нажми, чтобы увидеть' : 'свернуть';
}


function takeScreenshot() {
    const element = document.getElementById('capture-area');
    const btn = document.querySelector('.btn-share');
    
    // Блокируем кнопку и меняем текст
    btn.innerText = "Генерация...";
    btn.disabled = true;

    // ФИКС СКРОЛЛА: Сохраняем текущую позицию и принудительно фиксируем body
    const scrollPos = window.scrollY;
    document.body.style.overflow = 'hidden';

    html2canvas(element, {
        backgroundColor: "#e3f2fd", 
        scale: 2,
        useCORS: true,         // Для корректной загрузки картинок/логотипов
        allowTaint: true,
        scrollX: 0,            // ВАЖНО: обнуляем сдвиги, чтобы не лезли белые полосы
        scrollY: 0,
        x: 0,
        y: 0,
        width: element.offsetWidth,   // Четко ограничиваем ширину
        height: element.offsetHeight  // Четко ограничиваем высоту
    }).then(canvas => {
        // Создаем ссылку для скачивания
        const link = document.createElement('a');
        link.download = `my-valentine-status-${Date.now()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        
        // Возвращаем всё как было
        btn.innerText = "📸 Сохранить";
        btn.disabled = false;
        
        // Убираем блокировку скролла и возвращаемся в точку (на всякий случай)
        document.body.style.overflow = '';
        window.scrollTo(0, scrollPos);

    }).catch(err => {
        console.error("Ошибка скриншота:", err);
        alert("Не удалось создать скриншот. Попробуй сделать его вручную!");
        btn.innerText = "📸 Сохранить";
        btn.disabled = false;
        document.body.style.overflow = '';
    });
}

function showFloatingScores(stats) {
    // Создаем временный контейнер
    const floatContainer = document.createElement('div');
    floatContainer.className = 'floating-score';
    document.body.appendChild(floatContainer);

    // Проходим по всем измененным статам в карточке
    Object.entries(stats).forEach(([key, value]) => {
        if (value === 0) return; // Ноли не показываем

        const categoryName = CategoriesData[key] || key;
        const scoreEl = document.createElement('div');
        
        const sign = value > 0 ? '+' : '';
        scoreEl.className = `score-item ${value > 0 ? 'score-plus' : 'score-minus'}`;
        scoreEl.innerText = `${categoryName} ${sign}${value}`;
        
        floatContainer.appendChild(scoreEl);
    });

    // Удаляем контейнер через секунду, когда анимация закончится
    setTimeout(() => {
        floatContainer.remove();
    }, 3000);
}