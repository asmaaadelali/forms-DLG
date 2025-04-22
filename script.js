let timerInterval;
let timeRemaining = 600;
let quizStarted = false;

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
    document.getElementById('timeout-message').classList.add('hidden'); // إخفاء الرسالة لو موجودة من قبل
    startTimer();
    quizStarted = true;
};

function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            endQuiz("⏰ انتهى الوقت!");
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
    alert("✅ تم إرسال الإجابات!");
};

// إنهاء الاختبار مع عرض رسالة
function endQuiz(message) {
    clearInterval(timerInterval);

    // إخفاء الفورم والمحتوى
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) quizContainer.classList.add('hidden');

    // عرض الرسالة
    const messageBox = document.getElementById('timeout-message');
    if (messageBox) {
        messageBox.textContent = message;
        messageBox.classList.remove('hidden');
    }
}

// اكتشاف مغادرة التاب
document.addEventListener("visibilitychange", function () {
    if (document.hidden && quizStarted) {
        endQuiz("🚫 تم إنهاء الاختبار بسبب مغادرتك الصفحة.");
    }
});


