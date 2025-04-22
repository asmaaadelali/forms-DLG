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
    startTimer();
    quizStarted = true; // علشان نعرف إن الامتحان بدأ فعلاً
};

function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            endQuiz("انتهى الوقت!");
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
    // إرسال البيانات هنا إذا أردت
};

// دالة لإنهاء الامتحان
function endQuiz(message) {
    clearInterval(timerInterval);
    alert(message);

    // إخفاء محتوى الاختبار
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) quizContainer.classList.add('hidden');

    // إظهار رسالة انتهاء
    const timeoutMessage = document.getElementById('timeout-message');
    if (timeoutMessage) timeoutMessage.classList.remove('hidden');
}

// إذا المستخدم غادر التاب
document.addEventListener("visibilitychange", function () {
    if (document.hidden && quizStarted) {
        endQuiz("تم مغادرة الصفحة! تم إنهاء الامتحان.");
    }
});

