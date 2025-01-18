import { quizData } from "./assets/quizData.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  let quizQuesIndex = 0;
  let score = 0;

  const startQuizBtn = document.getElementById("start-quiz-btn");
  const displayQuestion = document.getElementById("question");
  const displayOptions = document.getElementById("options");
  const displayNextQuesBtn = document.getElementById("next-ques-btn");
  const displayScore = document.getElementById("score");
  const displayRestartQuizBtn = document.getElementById("restart-quiz-btn");

  startQuizBtn.addEventListener("click", showQuizQuestion);

  function showQuizQuestion() {
    startQuizBtn.classList.add("hidden");
    displayQuestion.classList.remove("hidden");
    displayQuestion.innerText = quizData[quizQuesIndex].question;
    showOptions();
  }

  function showOptions() {
    displayOptions.classList.remove("hidden");
    quizData[quizQuesIndex].options.forEach((option) => {
      const li = document.createElement("li");
      li.classList.add("option");
      li.innerText = option;
      displayOptions.appendChild(li);
      li.addEventListener("click", () => optionSelected(li));
    });
  }

  function optionSelected(option) {
    const selectedAns = option.textContent;
    if (selectedAns === quizData[quizQuesIndex].correct_answer) {
      option.classList.add("right-answer");
      score++;
    } else {
      option.classList.add("wrong-answer");
    }
    displayOptions.classList.add("disabled");
    displayNextQuesBtn.classList.remove("hidden");
  }

  displayNextQuesBtn.addEventListener("click", () => {
    displayOptions.innerHTML = ``;
    displayOptions.classList.remove("disabled");
    if (quizQuesIndex < quizData.length - 1) {
      quizQuesIndex++;
      showQuizQuestion();
    } else {
      displayOptions.classList.add("hidden");
      displayQuestion.classList.add("hidden");
      displayNextQuesBtn.classList.add("hidden");

      displayScore.classList.remove("hidden");
      let text =
        score == 5
          ? `Excellent! Your score:${score} out of ${quizData.length}`
          : ` Your score:${score} out of ${quizData.length}`;
      displayScore.innerText = text;
      displayRestartQuizBtn.classList.remove("hidden");
    }
  });

  displayRestartQuizBtn.addEventListener("click", () => {
    quizQuesIndex = 0;
    score = 0;
    displayScore.classList.add("hidden");
    displayRestartQuizBtn.classList.add("hidden");
    showQuizQuestion();
  });
});
