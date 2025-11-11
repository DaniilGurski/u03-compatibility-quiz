/**
 * RESULT.JS
 *
 * Responsible for: Results screen
 * Person: [Assign to team member]
 *
 * TODO:
 * - Calculate compatibility score (count matching answers)
 * - Display score and percentage
 * - Generate result cards for each question showing both answers
 * - Handle "Play again" functionality (reset gameState)
 * - This screen updates automatically when shown (see navigation.js)
 */

import { gameState } from "./main.js";
import { showScreen } from "./navigation.js";

export function initResult() {
  // STEP 1: Find the HTML elements you need
  // const matchingAnswersText = document.querySelector(".result__score__matching-count");
  // const compatibilityPercentageText = document.querySelector(".result__score__compatibility-percent");
  // const resultsCardsContainer = document.querySelector(".result__results");
  // const resultCardTemplate = document.getElementById("result-card-template");
  // const playAgainButton = document.querySelector("[data-screen="result"] [data-type="navigation"]");

  // Expose update function so navigation.js can call it automatically
  window.updateResultScreen = updateResultScreen;

  function updateResultScreen() {
    // STEP 2: Calculate matching answers
    // Count how many items in gameState.answers have matching answers
    // An answer matches if: playerOneAnswer === playerTwoAnswer
    // Get total: gameState.answers.length

    // STEP 3: Calculate percentage
    // Percentage = (matchingCount / totalAnswers) * 100
    // Use Math.round() to round to nearest whole number

    // STEP 4: Update score display
    // Set matchingAnswersText to: matchingCount + " out of " + totalAnswers + " questions"
    // Set compatibilityPercentageText to: percentage + "%"

    // STEP 5: Clear previous result cards
    // Set resultsCardsContainer.innerHTML to "" (empty string)

    // STEP 6: Create result card for each question
    // Loop through gameState.answers
    // For each answer, clone the template: resultCardTemplate.content.cloneNode(true)
    // Fill in the card content:
    //   - Question number (index + 1)
    //   - Question text
    //   - Player one name and answer
    //   - Player two name and answer
    // If answers match, add class "result-card--matching" to the card
    // Append card to resultsCardsContainer
  }

  // STEP 7: Set up play again button
  // Add "click" event listener to playAgainButton
  // Use event.preventDefault()
  // Reset gameState to initial values:
  //   - selectedCategoryId = null
  //   - playerOne = ""
  //   - playerTwo = ""
  //   - currentPlayerIndex = 0
  //   - currentQuestionIndex = 0
  //   - answers = []
  // Navigate back to category screen: showScreen("category")
}
