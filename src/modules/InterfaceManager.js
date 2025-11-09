export default class InterfaceManager {
  constructor() {
    this.selectedOption = "";
    this.questionScreen = document.querySelector("[data-screen='question']");
  }

  populateReadyScreen(currentPlayerName) {
    // Pick a random message
    const beforeMessages = [
      "Ready",
      "Prepare yourself",
      "Focus up",
      "Hey",
      "You're up",
    ];
    const randomIndex = Math.floor(Math.random() * beforeMessages.length);
    const randomMessage = beforeMessages[randomIndex];

    // Populate elements
    const messageSpan = document.querySelector(
      "[data-screen='ready'] #ready-message"
    );
    const playerNameSpan = document.querySelector(
      "[data-screen='ready'] #ready-player-name"
    );

    messageSpan.textContent = randomMessage + ",";
    playerNameSpan.textContent = currentPlayerName;
  }

  populateQuestionScreen(currentPlayer, progress, currentQuestion) {
    // Get elements
    const currentPlayerNameSpan = this.questionScreen.querySelector(
      "#question-player-name"
    );
    const progressSpan =
      this.questionScreen.querySelector("#question-progress");
    const questionText = this.questionScreen.querySelector("#question-text");

    // Populate
    currentPlayerNameSpan.textContent = `${currentPlayer}'s turn `;
    progressSpan.textContent = `Question ${progress + 1}`;
    questionText.textContent = currentQuestion.text;
  }

  onQuizContinue(callback) {
    const continueButton =
      this.questionScreen.querySelector("#question-continue");

    continueButton.addEventListener("click", callback);
  }

  onAnswerChange(callback) {
    const answerRadios = this.questionScreen.querySelectorAll(
      "input[type='radio']"
    );

    answerRadios.forEach((radio) => {
      radio.addEventListener("click", (e) => {
        callback(e.target.value);
      });
    });
  }

  onHandover(callback) {
    const handoverButton = document.querySelector(
      "[data-screen='blackout'] button"
    );

    handoverButton.addEventListener("click", callback);
  }

  displayQuizLength(questionsLength) {
    const totalSpan = this.questionScreen.querySelector("#question-total");
    totalSpan.textContent = `of ${questionsLength}`;
  }
}
