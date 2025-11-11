/**
 * QUESTION.JS
 *
 * Responsible for: Question screen
 * Person: [Assign to team member]
 *
 * TODO:
 * - Display whose turn it is (player name + ""s turn")
 * - Show current question number and total
 * - Display question text and answer options
 * - Validate that an answer is selected
 * - Save player"s answer to gameState.answers array
 * - This screen updates automatically when shown (see navigation.js)
 */

import { gameState } from "./main.js";
import { showScreen } from "./navigation.js";

export function initQuestion() {
  // STEP 1: Find the HTML elements you need
  // const questionForm = document.querySelector("[data-screen="question"] .question-form");
  // const playerTurnText = document.querySelector(".question-form__player-name");
  // const currentQuestionText = document.querySelector(".question-form__progress-current");
  // const totalQuestionsText = document.querySelector(".question-form__progress-total");
  // const questionText = document.querySelector(".question-form__fieldset-text");
  // const answerLabels = document.querySelectorAll(".answer-option__text");
  // const answerRadioButtons = document.querySelectorAll(".answer-option__input");
  // const errorMessage = document.querySelector(".question-form__error");

  // Expose update function so navigation.js can call it automatically
  window.updateQuestionScreen = updateQuestionScreen;

  function updateQuestionScreen() {
    // STEP 2: Find the current category and question
    // Find category: gameState.questionsData.categories.find() where id matches gameState.selectedCategoryId
    // Get question: category.questions[gameState.currentQuestionIndex]

    // STEP 3: Determine whose turn it is
    // If gameState.currentPlayerIndex is 0, use gameState.playerOne
    // If gameState.currentPlayerIndex is 1, use gameState.playerTwo
    // Set playerTurnText to: currentPlayerName + ""s turn"

    // STEP 4: Update progress
    // Set currentQuestionText to: "Question " + (gameState.currentQuestionIndex + 1)
    // Set totalQuestionsText to: "of " + category.questions.length

    // STEP 5: Update question and answers
    // Set questionText to: question.text
    // Set answerLabels[0] to: question.options[0] (Agree)
    // Set answerLabels[1] to: question.options[1] (Disagree)
    // Set answerLabels[2] to: question.options[2] (Neutral)

    // STEP 6: Clear previous selection
    // Loop through answerRadioButtons and set each one"s .checked property to false
  }

  // STEP 7: Set up form submit listener
  // Add "submit" event listener to questionForm
  // Use event.preventDefault() to stop page reload
  // Find which radio button is checked (use querySelector with ":checked")
  // If no answer selected, show error: "Please select an answer"
  // If answer selected, save it and navigate to handoff screen

  // STEP 8: Save answer to gameState.answers
  // Check if this question already has an answer record in gameState.answers
  // If not, create new record with: questionId, questionText, playerOneAnswer: null, playerTwoAnswer: null
  // Update the appropriate player"s answer based on gameState.currentPlayerIndex
  // See QUESTION.md for complete answer record structure
}
