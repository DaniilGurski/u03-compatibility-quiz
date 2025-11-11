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

import { gameState } from "./main.js";
import { getRandomFromArray } from "./data.js";
import { showScreen } from "./navigation.js";

export function initHandoff() {
  // STEP 1: Find the HTML elements you need
  // const acknowledgmentText = document.querySelector("[data-screen="handoff"] .screen__title__text--greeting");
  // const playerNameText = document.querySelector("[data-screen="handoff"] .screen__title__text--username");
  // const subtitleText = document.querySelector("[data-screen="handoff"] .screen__subtitle");
  // const continueButton = document.querySelector("[data-screen="handoff"] [data-type="navigation"]");

  // Expose update function so navigation.js can call it automatically
  window.updateHandoffScreen = updateHandoffScreen;

  function updateHandoffScreen() {
    // STEP 2: Determine if this is the final handoff
    // Find selected category from gameState.questionsData.categories
    // Get total questions: category.questions.length
    // Check if: gameState.currentPlayerIndex is 1 AND gameState.currentQuestionIndex is (totalQuestions - 1)

    // STEP 3: Get current player name
    // If gameState.currentPlayerIndex is 0, use gameState.playerOne
    // If gameState.currentPlayerIndex is 1, use gameState.playerTwo

    // STEP 4a: If final handoff (both players answered all questions):
    //   - Set acknowledgmentText to: "All done!"
    //   - Set playerNameText to: "" (empty)
    //   - Set subtitleText to: "You have both answered all the questions. Let"s see your results!"
    //   - Set continueButton.textContent to: "See results"
    //   - Set continueButton data-to attribute to: "result"

    // STEP 4b: If normal handoff:
    //   - Get random ack from: gameState.questionsData.responseMessages.ackMessage (use getRandomFromArray)
    //   - Set acknowledgmentText to: randomAck + ","
    //   - Set playerNameText to: currentPlayerName
    //   - Set subtitleText to: "Answer recorded. Hand over the device to the next player and make sure not to peek!"
    //   - Set continueButton.textContent to: "Hand it over"
    //   - Set continueButton data-to attribute to: "ready"
  }

  // STEP 5: Set up button click listener
  // Add "click" event listener to continueButton
  // Use event.preventDefault()
  // Get the destination from continueButton.getAttribute("data-to")
  // If destination is "ready": update game state (see STEP 6)
  // If destination is "result": just call showScreen("result")

  // STEP 6: Update game state when continuing
  // If going to "ready" screen:
  //   - If currentPlayerIndex is 0: switch to player 2 (set currentPlayerIndex to 1)
  //   - If currentPlayerIndex is 1: switch to player 1 AND move to next question
  //     (set currentPlayerIndex to 0, add 1 to currentQuestionIndex)
  // Then call showScreen("ready")
  // See HANDOFF.md for complete logic diagram
}
