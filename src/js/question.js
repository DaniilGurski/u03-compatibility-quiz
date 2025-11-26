/**
 * QUESTION.JS
 * Responsible for: Question screen
 */

import { gameState } from "./main.js";
import { showScreen } from "./navigation.js";
import {
  showError,
  clearError,
  clearErrorOnInteraction,
} from "./validation.js";

export function initQuestion() {
  // Find the HTML elements you need
  const questionForm = document.querySelector(
    '[data-screen="question"] .question-form'
  );
  const playerTurnText = document.querySelector(".question-form__player-name");
  const currentQuestionText = document.querySelector(
    ".question-form__progress-current"
  );
  const totalQuestionsText = document.querySelector(
    ".question-form__progress-total"
  );
  const questionText = document.querySelector(".question-form__fieldset-text");
  const answerLabels = document.querySelectorAll(".answer-option__text");
  const answerRadioButtons = document.querySelectorAll(".answer-option__input");
  const errorMessage = document.querySelector(".question-form__error");

  // Expose update function so navigation.js can call it automatically
  window.updateQuestionScreen = updateQuestionScreen;

  function updateQuestionScreen() {
    // Find the current category and question
    const category = gameState.questionsData.categories.find(
      (cat) => cat.id === gameState.selectedCategoryId
    );
    const question = category.questions[gameState.currentQuestionIndex];

    // Determine whose turn it is
    const currentPlayerName =
      gameState.currentPlayerIndex === 0
        ? gameState.playerOne
        : gameState.playerTwo;
    playerTurnText.textContent = `${currentPlayerName}'s turn`;

    // Update progress
    currentQuestionText.textContent = `Question ${
      gameState.currentQuestionIndex + 1
    }`;
    totalQuestionsText.textContent = `of ${category.questions.length}`;

    // Update question and answers
    questionText.textContent = question.text;
    answerLabels[0].textContent = question.options[0];
    answerLabels[1].textContent = question.options[1];
    answerLabels[2].textContent = question.options[2];

    // Clear previous selection
    answerRadioButtons.forEach((radio) => (radio.checked = false));
  }

  // Set up form submit listener
  questionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Find which answer the user selected using :checked selector (didn't use :checked before and returned null)
    const selectedAnswer = questionForm.querySelector(
      'input[type="radio"]:checked'
    );
    if (!selectedAnswer) {
      // We use our new showError insead.
      showError(errorMessage, "Please select an answer");
      return;
    }

    clearError(errorMessage);

    const answerValue = selectedAnswer.value; // agree/disagree/neutral

    const category = gameState.questionsData.categories.find(
      (cat) => cat.id === gameState.selectedCategoryId
    );
    const question = category.questions[gameState.currentQuestionIndex];

    //  Save answer to gameState.answers
    let existingAnswer = gameState.answers.find(
      (a) => a.questionId === question.id
    );
    if (!existingAnswer) {
      existingAnswer = {
        questionId: question.id,
        questionText: question.text,
        playerOneAnswer: null,
        playerTwoAnswer: null,
      };
      gameState.answers.push(existingAnswer);
    }

    if (gameState.currentPlayerIndex === 0) {
      existingAnswer.playerOneAnswer = answerValue;
    } else {
      existingAnswer.playerTwoAnswer = answerValue;
    }

    showScreen("handoff");
  });

  // Clear any error when the players selects any answer
  answerRadioButtons.forEach((radio) => {
    clearErrorOnInteraction(radio, errorMessage, "change");
  });
}
