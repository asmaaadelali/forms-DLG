
let timerInterval;
let timeRemaining = 600;

document.getElementById('start-btn').onclick = function () {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('instructions').classList.remove('hidden');
};

document.getElementById('exit-btn').onclick = function () {
    location.reload();
};

document.getElementById('continue-btn').onclick = function () {
    document.getElementById('instructions').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    startTimer();
};

function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
     if (timeRemaining <= 0) {
    clearInterval(timerInterval);
    
    // إخفاء زر الإرسال
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) submitBtn.style.display = 'none';

    // عرض رسالة انتهاء الوقت
    const message = document.getElementById('timeout-message');
    if (message) message.classList.remove('hidden');
}

    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60).toString().padStart(2, '0');
    const seconds = (timeRemaining % 60).toString().padStart(2, '0');
    document.getElementById('timer').textContent = `${minutes}:${seconds}`;
}

document.getElementById('quiz-form').onsubmit = function (e) {
    e.preventDefault();
    clearInterval(timerInterval);
    alert("تم إرسال الإجابات! سيتم تحويلك الآن.");
    // يمكنك هنا إرسال البيانات إلى Google Apps Script
    // مثال: fetch('SCRIPT_URL', { method: 'POST', body: new FormData(this) })
};
