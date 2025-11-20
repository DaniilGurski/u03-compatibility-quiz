/**
 * READY.JS
 *
 * Responsible for: Ready screen before each question
 * Person: [Assign to team member]
 *
 * TODO:
 * - Display random greeting message from questions.json
 * - Show current player"s name
 * - This screen updates automatically when shown (see navigation.js)
 */

import { gameState } from "./main.js";
import { getRandomFromArray } from "./data.js";

let greetingText;
let playerName;

export function initReady() {
  // STEP 1: Find the HTML elements you need
  //  const greetingText = document.querySelector("[data-screen="ready"] .screen__title__text--greeting");
  //  const playerNameText = document.querySelector("[data-screen="ready"] .screen__title__text--username");

  greetingText = document.querySelector(
    '[data-screen="ready"] .screen__title__text--greeting'
  );
  playerName = document.querySelector(
    '[data-screen="ready"] .screen__title__text--username'
  );

  console.log("initReady: greetingText, playerName:", greetingText, playerName);

  // Expose update function so navigation.js can call it automatically
  window.updateReadyScreen = updateReadyScreen;
}
function updateReadyScreen() {
  console.log("updateReadyScreen running - start");

  // STEP 2: Get random greeting message
  // Get the array: gameState.questionsData.responseMessages.readyMessage
  // Use getRandomFromArray() to pick one random message
  if (gameState.questionsData === null) return;

  const maybeMessages = gameState.questionsData.responseMessages.readyMessage;

  if (maybeMessages) {
    console.warn(
      "Ready messages not found in gameState.guestionsData.responseMessages.readyMessage - using fallback"
    );

    const randomGreeting = getRandomFromArray(maybeMessages);

    // STEP 3: Get current player"s name
    // If gameState.currentPlayerIndex is 0, use gameState.playerOne
    // If gameState.currentPlayerIndex is 1, use gameState.playerTwo
    const idx = gameState?.currentPlayerIndex;
    const currentPlayerName =
      idx === 0
        ? gameState?.playerOne || "Player 1"
        : gameState?.playerTwo || "Player 2";
    console.log(
      "updateReadyScreen: idx =",
      idx,
      ", currentPlayer =",
      currentPlayerName
    );

    // STEP 4: Update the screen
    // Set greetingText to: randomGreeting + ","
    // Set playerNameText to: currentPlayerName
    if (!greetingText || !playerName) {
      console.warn("One of DOM elements is null:", {
        greetingText,
        playerName,
      });
      return;
    }

    greetingText.textContent = randomGreeting + ",";
    playerName.textContent = currentPlayerName;

    console.log("ready screen updated:", { randomGreeting, currentPlayerName });
  } else {
    console.log("no maybe messages");
  }
}
