/**
 * READY.JS
 * Responsible for: Ready screen before each question
 */

import { gameState } from "./main.js";
import { getRandomFromArray } from "./data.js";

let greetingText;
let playerName;

export function initReady() {
  // Find the HTML elements you need

  greetingText = document.querySelector(
    '[data-screen="ready"] .screen__title__text--greeting'
  );
  playerName = document.querySelector(
    '[data-screen="ready"] .screen__title__text--username'
  );

  // Expose update function so navigation.js can call it automatically
  window.updateReadyScreen = updateReadyScreen;
}
function updateReadyScreen() {
  console.log("updateReadyScreen running - start");

  // Get random greeting message

  if (gameState.questionsData === null) {
    console.error("No questions data");
    return;
  }

  const maybeMessages = gameState.questionsData.responseMessages.readyMessage;

  if (maybeMessages) {
    const randomGreeting = getRandomFromArray(maybeMessages);

    // Get current player"s name

    const idx = gameState?.currentPlayerIndex;
    const currentPlayerName =
      idx === 0 ? gameState.playerOne : gameState.playerTwo;

    // Update the screen

    if (!greetingText || !playerName) {
      console.warn("One of DOM elements is null:", {
        greetingText,
        playerName,
      });
      return;
    }

    greetingText.textContent = randomGreeting + ",";
    playerName.textContent = currentPlayerName;
  }
}
