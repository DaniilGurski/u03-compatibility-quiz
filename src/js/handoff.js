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
  const greetingSpan = document.querySelector('#handoff-screen .acknowledgment-text');
  const usernameSpan = document.querySelector('#handoff-screen .player-name-text');
  const subtitleParagraph = document.querySelector('#handoff-screen .subtitle-paragraph');
  const continueButton = document.querySelector('#handoff-screen .continue-button');


  // STEP 1:
  // Validate required DOM elements exist
  if (!greetingSpan || !usernameSpan || !subtitleParagraph || !continueButton) {
    console.error("Handoff screen elements missing");
    return;
  }


  // Expose update function so navigation.js can call it automatically
  window.updateHandoffScreen = updateHandoffScreen;


  function updateHandoffScreen() {
    const category = gameState.questionsData.categories[gameState.selectedCategoryId];
    const totalQuestions = category.questions.length;


    // STEP 2:
    // Determine if this is the final handoff.
    // Final handoff happens ONLY when:
    // - Player 2 has just answered (currentPlayerIndex === 1)
    // - Current question is the last at index (totalQuestions - 1)
    const isFinalHandoff =
      gameState.currentPlayerIndex === 1 &&
      gameState.currentQuestionIndex === totalQuestions - 1;


    // STEP 3:
    // Determine next player name for normal handoff.
    const nextPlayerName =
      gameState.currentPlayerIndex === 0 ? gameState.playerTwo : gameState.playerOne;


    // STEP 4a: Final handoff case
    if (isFinalHandoff) {
      greetingSpan.textContent = "All done!";
      usernameSpan.textContent = "";
      subtitleParagraph.textContent =
        "You have both answered all the questions. Let's see your results!";


      continueButton.textContent = "See results";
      continueButton.setAttribute("data-to", "result");
      return;
    }


    // STEP 4b: Normal handoff case
    // Select a random acknowledgment message
    const randomAck = getRandomFromArray(
      gameState.questionsData.responseMessages?.handoffMessage || ["Nice!"]
    );


    greetingSpan.textContent = randomAck + ",";
    usernameSpan.textContent = nextPlayerName;
    subtitleParagraph.textContent =
      "Answer recorded. Hand over the device to the next player and make sure not to peek!";


    continueButton.textContent = "Hand it over";
    continueButton.setAttribute("data-to", "ready");
  }


  // STEP 5:
  // Set up handoff button click listener
  continueButton.addEventListener("click", (event) => {
    event.preventDefault();


    const to = continueButton.getAttribute("data-to");


    // STEP 6:
    // Update game state when continuing to "ready"
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
    }



    if (to === "result") {
      showScreen("result");
    }
  });
}


