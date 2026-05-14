let state = { lv: 1, xp: 0, coins: 0, currentQ: 0, score: 0, diff: 'easy' };

// Генератор простых задач для примера
function generateTask() {
    const a = Math.floor(Math.random() * 20);
    const b = Math.floor(Math.random() * 20);
    const correct = a + b;
    const options = [correct, correct + 2, correct - 1, correct + 5].sort(() => Math.random() - 0.5);
    return { q: `${a} + ${b} = ?`, options, correct: options.indexOf(correct) };
}

let currentTask = null;

function showSection(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(`section-${id}`).classList.remove('hidden');
}

function startQuiz() {
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
    currentTask = generateTask();
    document.getElementById('q-text').innerText = currentTask.q;
    document.getElementById('q-progress').innerText = `Вопрос ${state.currentQ + 1}/10`;
    currentTask.options.forEach((opt, i) => {
        document.getElementById(`opt${i}`).innerText = opt;
    });
}

function checkAnswer(idx) {
    if (idx === currentTask.correct) {
        state.score++;
        state.coins += 10;
        state.xp += 20;
    }
    state.currentQ++;
    updateUI();
    nextQuestion();
}

function finishQuiz() {
    alert(`Тест окончен! Твой результат: ${state.score}/10. Получено монет: ${state.score * 10}`);
    showSection('menu');
}

function clickSphere() {
    state.coins += 1;
    updateUI();
}

function updateUI() {
    if (state.xp >= 100) { state.lv++; state.xp = 0; alert("LEVEL UP!"); }
    document.getElementById('user-level').innerText = `LVL ${state.lv}`;
    document.getElementById('user-coins').innerText = `💰 ${state.coins}`;
    document.getElementById('xp-bar-fill').style.width = `${state.xp}%`;
}

// Переключение сложности
document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.diff = btn.dataset.diff;
    };
});
