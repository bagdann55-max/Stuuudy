let player = { xp: 0, lvl: 1, coins: 0 };
let quiz = { active: false, current: 0, score: 0, topic: 'algebra', diff: 'easy' };

const engine = {
    algebra: (d) => {
        const a = Math.floor(Math.random() * (d === 'hard' ? 50 : 15)) + 5;
        const b = Math.floor(Math.random() * (d === 'hard' ? 30 : 10));
        return { q: `x + ${a} = ${a + b}`, ans: b, opt: [b, b+2, b-1, b+5] };
    },
    geometry: (d) => {
        const w = Math.floor(Math.random() * 10) + 2;
        const h = Math.floor(Math.random() * 10) + 2;
        return { q: `S прямоугольника (${w}x${h}) = ?`, ans: w*h, opt: [w*h, w+h, (w+h)*2, w*h-4] };
    },
    trig: (d) => {
        const types = [{q: 'sin(90°)', a: 1}, {q: 'cos(0°)', a: 1}, {q: 'tg(45°)', a: 1}, {q: 'sin(30°)', a: 0.5}];
        const pick = types[Math.floor(Math.random() * types.length)];
        return { q: pick.q, ans: pick.a, opt: [pick.a, 0, -1, 0.5] };
    }
};

function startEngine() {
    quiz.topic = document.getElementById('topic-select').value;
    quiz.current = 0;
    quiz.score = 0;
    toggleScreen('quiz');
    renderQuestion();
}

function renderQuestion() {
    if(quiz.current >= 10) return finish();
    
    const data = engine[quiz.topic](quiz.diff);
    document.getElementById('math-display').innerText = data.q;
    document.getElementById('q-num').innerText = `Вопрос ${quiz.current + 1}/10`;
    
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    
    data.opt.sort(() => Math.random() - 0.5).forEach(val => {
        const btn = document.createElement('button');
        btn.className = 'ans-btn';
        btn.innerText = val;
        btn.onclick = () => processAnswer(val, data.ans, btn);
        optionsDiv.appendChild(btn);
    });
}

function processAnswer(selected, correct, btn) {
    if(selected === correct) {
        btn.classList.add('correct');
        quiz.score++;
        addReward(20, 10);
    } else {
        btn.classList.add('wrong');
    }
    
    setTimeout(() => {
        quiz.current++;
        renderQuestion();
    }, 600);
}

function addReward(xp, coins) {
    player.xp += xp;
    player.coins += coins;
    if(player.xp >= 100) { player.lvl++; player.xp = 0; }
    updateUI();
}

function updateUI() {
    document.getElementById('lvl').innerText = player.lvl;
    document.getElementById('coins').innerText = player.coins;
    document.getElementById('xp-fill').style.width = player.xp + '%';
}

function toggleScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById('screen-' + id).classList.remove('hidden');
}

function finish() {
    alert(`Результат: ${quiz.score}/10. Ты заработал ${quiz.score * 10} монет!`);
    toggleScreen('menu');
}

// Сложность
document.querySelectorAll('.d-btn').forEach(b => {
    b.onclick = () => {
        document.querySelectorAll('.d-btn').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        quiz.diff = b.dataset.v;
    }
});
