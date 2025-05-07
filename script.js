document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("start-button");
  const continueButton = document.getElementById("continue-button");
  const backButton = document.getElementById("back-button");
  const nextToForm = document.getElementById("next-to-form");
  const userForm = document.getElementById("user-form");
  const quizForm = document.getElementById("quiz-form");

  const mainPage = document.getElementById("main-page");
  const introPage = document.getElementById("intro-page");
  const instructionsPage = document.getElementById("instructions-page");
  const userFormPage = document.getElementById("user-form-page");
  const quizPage = document.getElementById("quiz-page");
  const resultPage = document.getElementById("result-page");
  const resultMessage = document.getElementById("result-message");
  const timerDisplay = document.getElementById("timer");
  const warningMessage = document.getElementById("warning-message");

  let timer;
  let timeLeft; // سيتم تعيينه عند بدء الاختبار
  let testEnded = false;

  startButton.onclick = () => {
    mainPage.classList.add("hidden");
    introPage.classList.remove("hidden");
  };

  backButton.onclick = () => {
    introPage.classList.add("hidden");
    mainPage.classList.remove("hidden");
  };

  continueButton.onclick = () => {
    introPage.classList.add("hidden");
    instructionsPage.classList.remove("hidden");
  };

  nextToForm.onclick = () => {
    instructionsPage.classList.add("hidden");
    userFormPage.classList.remove("hidden");
  };

  userForm.onsubmit = function (e) {
    e.preventDefault();
    const name = userForm.elements["name"].value;
    const email = userForm.elements["email"].value;
    const phone = userForm.elements["phone"].value;

    quizForm.elements["username"].value = name;
    quizForm.elements["useremail"].value = email;
    quizForm.elements["userphone"].value = phone;

    userFormPage.classList.add("hidden");
    quizPage.classList.remove("hidden");

    timeLeft = 180; // 3 دقائق = 180 ثانية
    startTimer();
  };

  function startTimer() {
    let warnedTwoMinutes = false;
    let warnedOneMinute = false;

    warningMessage.style.display = "none";

    timer = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(timer);
        endTest("انتهى الوقت وتم إرسال إجابتك وسوف يتم إرسال النتيجة عبر البريد الإلكتروني");
      } else {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `الوقت المتبقي: ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        if (timeLeft === 120 && !warnedTwoMinutes) {
          warnedTwoMinutes = true;
          showWarningMessage("تنبيه: تبقى دقيقتان فقط على انتهاء الوقت.");
        }
        if (timeLeft === 60 && !warnedOneMinute) {
          warnedOneMinute = true;
          showWarningMessage("تنبيه: تبقى دقيقة واحدة فقط على انتهاء الوقت.");
        }

        timeLeft--;
      }
    }, 1000);
  }

  function showWarningMessage(msg) {
    warningMessage.textContent = msg;
    warningMessage.style.display = "block";

    setTimeout(() => {
      warningMessage.style.display = "none";
    }, 5000);
  }

  function endTest(message) {
    if (testEnded) return;
    testEnded = true;

    clearInterval(timer);
    quizPage.classList.add("hidden");
    resultPage.classList.remove("hidden");
    resultMessage.textContent = message;

    quizForm.submit();
  }

  quizForm.onsubmit = function (e) {
    e.preventDefault();
    if (testEnded) return;
    endTest("تم إرسال إجابتك بنجاح وسوف يتم إرسال النتيجة عبر البريد الإلكتروني");
  };

  // منع الخروج أو تغيير التبويب
  document.addEventListener("visibilitychange", function () {
    if (document.hidden && !testEnded && !quizPage.classList.contains("hidden")) {
      endTest("تم إنهاء الاختبار نظرًا لمغادرة صفحة الاختبار أو فتح تبويب آخر. سيتم إرسال إجاباتك تلقائيًا للمراجعة.");
    }
  });

  window.addEventListener("blur", function () {
    if (!testEnded && !quizPage.classList.contains("hidden")) {
      endTest("تم إنهاء الاختبار نظرًا لمغادرة صفحة الاختبار أو فتح تبويب آخر. سيتم إرسال إجاباتك تلقائيًا للمراجعة.");
    }
  });

  window.addEventListener("beforeunload", function (e) {
    if (!testEnded && !quizPage.classList.contains("hidden")) {
      endTest("تم إنهاء الاختبار نظرًا لمغادرة صفحة الاختبار أو فتح تبويب آخر. سيتم إرسال إجاباتك تلقائيًا للمراجعة.");

      e.preventDefault();
      e.returnValue = "";
      return "";
    }
  });
});
