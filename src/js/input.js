/**
 * INPUT.JS
 *
 * Responsible for: Player name input screen
 * Adapted from: game.js lines 127-148
 */

import { gameState } from "./main.js";
import { showScreen } from "./navigation.js";

export function initInput() {
  // ============================================================================
  // PLAYER INPUT
  // ============================================================================

  // Elements
  const playersForm = document.getElementById("players-form");
  const playerOneInput = playersForm.querySelector("#player-one");
  const playerTwoInput = playersForm.querySelector("#player-two");

  playersForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const trimmedPlayerOneValue = playerOneInput.value.trim(" ");
    const trimmedPlayerTwoValue = playerTwoInput.value.trim(" ");

    /* TODO: Use .player-input__error to display errors ? */
    if (trimmedPlayerOneValue === "" || trimmedPlayerTwoValue === "") {
      return alert("All inputs must be filled !");
    }

    // If validation is successful, save the players names in the gameState object and proceed to the next screen.
    gameState.playerOne = trimmedPlayerOneValue;
    gameState.playerTwo = trimmedPlayerTwoValue;

    showScreen("ready");
  });
}
