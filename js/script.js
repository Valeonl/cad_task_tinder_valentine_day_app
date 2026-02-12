let currentCardIndex = 0;
let userStats = { teamwork: 0, analytics: 0, efficiency: 0, chaos: 0 };

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

    hamtime.on('panend', (ev) => {
        card.style.transition = '0.4s';
        if (Math.abs(ev.deltaX) > 120) {
            const side = ev.deltaX > 0 ? 'right' : 'left';
            swipeCard(card, side, data);
        } else {
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
    container.classList.add('hidden');
    resultsScreen.classList.remove('hidden');

    const top = Object.keys(userStats).reduce((a, b) => userStats[a] > userStats[b] ? a : b);
    
    const meta = {
        teamwork: ["Душа Офиса ❤️", "Вы — клей, на котором держится отдел!"],
        analytics: ["Мистер Логика 🧠", "Ваше сердце — это сводная таблица."],
        efficiency: ["Машина Продуктивности ⚡", "Валентинка? Сначала закрою таск!"],
        chaos: ["Агент Хаоса 🔥", "Вы свайпаете правила. Хаос — это лестница."]
    };

    document.getElementById('role-title').innerText = meta[top][0];
    document.getElementById('role-desc').innerText = meta[top][1];
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
