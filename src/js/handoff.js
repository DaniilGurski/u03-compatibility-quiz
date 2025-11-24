import { gameState } from "./main.js";
import { getRandomFromArray } from "./data.js";
import { showScreen } from "./navigation.js";

/**
 * HANDOFF.JS
 *
 * Responsible for: Handoff screen between players
 * Person: [Assign to team member]
 *
 * TODO:
 * - Show acknowledgment message (random) or "All done!" for final handoff
 * - Display player name or leave empty for final handoff
 * - Change subtitle based on normal/final handoff
 * - Update button text and destination (data-to attribute)
 * - Update game state: switch players, advance questions
 * - This screen updates automatically when shown (see navigation.js)
 */

export function initHandoff() {
  // STEP 0: Get DOM references
  const greetingSpan = document.querySelector('[data-screen="handoff"] .screen__title__text--greeting');
  const usernameSpan = document.querySelector('[data-screen="handoff"] .screen__title__text--username');
  const subtitleParagraph = document.querySelector('[data-screen="handoff"] .screen__subtitle');
  const continueButton = document.querySelector('[data-screen="handoff"] .screen__button');

  // STEP 1: Validate required DOM elements exist
  if (!greetingSpan || !usernameSpan || !subtitleParagraph || !continueButton) {
    console.error("Handoff screen elements missing");
    return;
  }

  // STEP 2: Expose update function so navigation.js can call it automatically
  window.updateHandoffScreen = updateHandoffScreen;

  // STEP 3: Function to update the handoff screen whenever shown
  function updateHandoffScreen() {
    // STEP 3a: Safety check for category
    const categories = gameState.questionsData?.categories || [];
    const category = categories.find(cat => cat.id === gameState.selectedCategoryId);

    if (!category) {
      console.warn(
        "Handoff screen: category is undefined. Did you select a category?",
        "selectedCategoryId:", gameState.selectedCategoryId,
        "categories:", categories
      );
      greetingSpan.textContent = "Oops!";
      usernameSpan.textContent = "";
      subtitleParagraph.textContent =
        "Something went wrong. Make sure a category is selected before proceeding.";
      continueButton.disabled = true;
      return;
    }

    const totalQuestions = category.questions.length;

    // STEP 4: Determine if this is the final handoff
    const isFinalHandoff =
      gameState.currentPlayerIndex === 1 &&
      gameState.currentQuestionIndex === totalQuestions - 1;

    // STEP 5: Determine next player name for normal handoff
    const nextPlayerName =
      gameState.currentPlayerIndex === 0 ? gameState.playerTwo : gameState.playerOne;

    // STEP 6a: Final handoff case
    if (isFinalHandoff) {
      greetingSpan.textContent = "All done!";
      usernameSpan.textContent = "";
      subtitleParagraph.textContent =
        "You have both answered all the questions. Let's see your results!";

      continueButton.textContent = "See results";
      continueButton.setAttribute("data-to", "result");
      continueButton.disabled = false;
      return;
    }

    // STEP 6b: Normal handoff case
    const randomAck = getRandomFromArray(
      gameState.questionsData.responseMessages?.handoffMessage || ["Nice!"]
    );

    greetingSpan.textContent = randomAck + ",";
    usernameSpan.textContent = nextPlayerName;
    subtitleParagraph.textContent =
      "Answer recorded. Hand over the device to the next player and make sure not to peek!";

    continueButton.textContent = "Hand it over";
    continueButton.setAttribute("data-to", "ready");
    continueButton.disabled = false;
  }

  // STEP 7: Set up handoff button click listener
  continueButton.addEventListener("click", (event) => {
    event.preventDefault();
    const to = continueButton.getAttribute("data-to");

    // STEP 8: Update game state when continuing to "ready"
    if (to === "ready") {
      if (gameState.currentPlayerIndex === 0) {
        // Switch from Player 1 → Player 2
        gameState.currentPlayerIndex = 1;
      } else {
        // Player 2 finished → Switch back to Player 1 AND move to next question
        gameState.currentPlayerIndex = 0;
        gameState.currentQuestionIndex++;
      }

      showScreen("ready");
      return;
    }

    // STEP 9: Navigate to results screen if final handoff
    if (to === "result") {
      showScreen("result");
      return;
    }
  });
}
