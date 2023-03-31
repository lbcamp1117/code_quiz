var questions = [
    {
      text: "What is the highest heading?",
      choices: ["<h1>", "<h2>", "<h3>", "<h4>", "<h5>", "<h6>"],
      answer: "<h1>"
    },
    {
      text: "What is the lowest heading?",
      choices: ["<h1>", "<h2>", "<h3>", "<h4>", "<h5>", "<h6>"],
      answer: "<h6>"
    },
    {
      text: "What type of element is a div?",
      choices: ["inline-block", "block", "inline-table", "table"],
      answer: "block"
    },
    {
      text: "What does HTML stand for?",
      choices: ["Hyper Text Markup Language", "High Technology Markup Language", "Hyperloop Technology Markup Language", "High Traffic Markup Language"],
      answer: "Hyper Text Markup Language"
    },
    {
      text: "What is the correct HTML element for inserting a line break?",
      choices: ["<br>", "<lb>", "<break>", "<newline>"],
      answer: "<br>"
    }
  ];

  var questionIndex = 0;
  var score = 0;
  var quizEl = document.querySelector(".quiz");
  var endEl = document.querySelector(".end");
  var startButton = document.getElementById("start-btn");
  var timerEl = document.querySelector(".timer");

  function askQuestion() {
    var currentQuestion = questions[questionIndex];
    document.querySelector(".question-text").textContent = currentQuestion.text;
    document.querySelector(".button-box").innerHTML = "";
    currentQuestion.choices.forEach(function(choice) {
      var button = document.createElement("button");
      button.textContent = choice;
      button.setAttribute("value", choice);
      button.onclick = function(event) {
        if (this.value == currentQuestion.answer) {
          score++;
        } else {
          console.log("wrong");
        }
        questionIndex++;
        if (questionIndex < questions.length) {
          askQuestion();
        } else {
          endQuiz();
        }
      };
      document.querySelector(".button-box").appendChild(button);
    });
  }

  function startQuiz() {
    startButton.style.display = "none";
    quizEl.classList.remove("hide");
    quizEl.classList.add("show");
    askQuestion();
    startTimer();
  }

  function startTimer() {
    var timeLeft = 60;
    var timeInterval = setInterval(function() {
      timerEl.textContent = "Time: " + timeLeft;
      timeLeft--;

      if (timeLeft === 0 || questionIndex === questions.length) {
        clearInterval(timeInterval);
        endQuiz();
      }
    }, 1000);
  }

  function endQuiz() {
    quizEl.classList.add("hide");
    endEl.classList.remove("hide");
    endEl.classList.add("show");
    document.querySelector(".score").textContent = "Your score: " + score + " out of " + questions.length;
  }

  startButton.addEventListener("click", startQuiz);
