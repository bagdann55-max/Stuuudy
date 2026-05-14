let state = { lv: 1, xp: 0, coins: 0, currentQ: 0, score: 0, diff: 'easy', topic: 'algebra' };

// БАЗА ДАННЫХ ЗАДАЧ ПО ТЕМАМ
const taskDatabase = {
    algebra: {
        easy: () => {
            const a = Math.floor(Math.random() * 20);
            const b = Math.floor(Math.random() * 20);
            return { q: `Решите уравнение: x - ${a} = ${b}`, ans: a + b, options: [a+b, a-b, a+b+2, a+b-5] };
        },
        hard: () => {
            const a = Math.floor(Math.random() * 10) + 2;
            const b = Math.floor(Math.random() * 20);
            return { q: `Найдите x: ${a}x + ${b} = ${a*5 + b}`, ans: 5, options: [5, 2, 10, 4] };
        }
    },
    geometry: {
        easy: () => {
            const a = Math.floor(Math.random() * 10) + 2;
            const b = Math.floor(Math.random() * 10) + 2;
            return { q: `Площадь прямоугольника со сторонами ${a} и ${b} равна:`, ans: a * b, options: [a*b, a+b, (a+b)*2, a*b-1] };
        },
        hard: () => {
            const a = 3; const b = 4;
            return { q: `В прямоугольном треугольнике катеты 3 и 4. Чему равна гипотенуза?`, ans: 5, options: [5, 6, 7, 12] };
        }
    },
    trig: {
        easy: () => {
            return { q: `Чему равен sin(90°)?`, ans: 1, options: [1, 0, 0.5, -1] };
        },
        hard: () => {
            return { q: `Чему равен cos(π)?`, ans: -1, options: [-1, 0, 1, 0.5] };
        }
    }
};

let currentTask = null;

function startQuiz() {
    state.topic = document.getElementById('select-topic').value;
    state.currentQ = 0;
    state.score = 0;
    showSection('quiz');
    nextQuestion();
}

function nextQuestion() {
    if (state.currentQ >= 10) {
        finishQuiz();
        return;
    }
    
    // Генерируем задачу на основе выбранной темы и сложности
    const generator = taskDatabase[state.topic][state.diff];
    const data = generator();
    
    currentTask = {
        q: data.q,
        options: data.options.sort(() => Math.random() - 0.5),
        correctValue: data.ans
    };

    document.getElementById('q-text').innerText = currentTask.q;
    document.getElementById('q-progress').innerText = `Вопрос ${state.currentQ + 1}/10`;
    
    currentTask.options.forEach((opt, i) => {
        const btn = document.getElementById(`opt${i}`);
        btn.innerText = opt;
        btn.parentElement.onclick = () => checkAnswer(opt);
    });
}

function checkAnswer(selectedVal) {
    if (selectedVal === currentTask.correctValue) {
        state.score++;
        state.coins += 15;
        state.xp += 25;
        alert("Верно! +15💰");
    } else {
        alert(`Ошибка! Правильный ответ: ${currentTask.correctValue}`);
    }
    state.currentQ++;
    updateUI();
    nextQuestion();
}

// Остальные функции (showSection, updateUI, clickSphere) оставь без изменений
