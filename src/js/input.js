/**
 * INPUT.JS
 *
 * Responsible for: Player name input screen
 * Adapted from: game.js lines 127-148
 */

import { gameState } from "./main.js";
import { showScreen } from "./navigation.js";
import { showError, clearError, clearErrorOnInteraction } from "./validation.js";

export function initInput() {
  // ============================================================================
  // PLAYER INPUT
  // ============================================================================

  // Elements
  const playersForm = document.getElementById("players-form");
  const playerOneInput = playersForm.querySelector("#player-one");
  const playerTwoInput = playersForm.querySelector("#player-two");

  // We use nextElementSibling to avoid conflict, to get the correct span :)
  const playerOneError = playerOneInput.nextElementSibling;
  const playerTwoError = playerTwoInput.nextElementSibling;

  playersForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const trimmedPlayerOneValue = playerOneInput.value.trim();
    const trimmedPlayerTwoValue = playerTwoInput.value.trim();

    // If there were previous errors, clear them
    clearError(playerOneError);
    clearError(playerTwoError);


    let isInputValid = true;

    // Check if player 1 has entered a name
    if (trimmedPlayerOneValue === "") {
      showError(playerOneError, "Please enter a name.");
      isInputValid = false;
    }

    // Check if player 2 has entered a name
    if (trimmedPlayerTwoValue === "") {
      showError(playerTwoError, "Please enter a name.");
      // Set flag to false, keep validating..
      isInputValid = false;
    }
    // Check to see if the players have entered the same name
    if (trimmedPlayerOneValue && trimmedPlayerTwoValue &&
      trimmedPlayerOneValue.toLowerCase() === trimmedPlayerTwoValue.toLowerCase()) {
      showError(playerOneError, "Both players are not allowed to use the same name.");
      showError(playerTwoError, "Both players are not allowed to use the same name.");
      // Set flag to false, keep validating..
      isInputValid = false;
    }

    // If validation is successful, save the players names in the gameState object and proceed to the next screen.
    if (isInputValid === true) {
      gameState.playerOne = trimmedPlayerOneValue;
      gameState.playerTwo = trimmedPlayerTwoValue;
      showScreen("ready");
    }
  });

  // Clear errors after user interaction
  clearErrorOnInteraction(playerOneInput, playerOneError, "input");
  clearErrorOnInteraction(playerTwoInput, playerTwoError, "input");
}


