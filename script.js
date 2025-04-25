
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

  let timer;
  let timeLeft = 180;

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
    startTimer();
  };

  function startTimer() {
    timer = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(timer);
        quizForm.classList.add("hidden");
        resultPage.classList.remove("hidden");
        resultMessage.textContent = "انتهى الوقت وتم إرسال إجابتك وسوف يتم إرسال النتيجة عبر البريد الإلكتروني";
        quizForm.submit();
      } else {
        timeLeft--;
        const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
        const seconds = String(timeLeft % 60).padStart(2, "0");
        timerDisplay.textContent = `الوقت المتبقي: ${minutes}:${seconds}`;
      }
    }, 1000);
  }

  quizForm.onsubmit = function (e) {
    e.preventDefault();
    clearInterval(timer);
    quizPage.classList.add("hidden");
    resultPage.classList.remove("hidden");
    resultMessage.textContent = "تم إرسال إجابتك بنجاح وسوف يتم إرسال النتيجة عبر البريد الإلكتروني";
    quizForm.submit();
  };
});


 



