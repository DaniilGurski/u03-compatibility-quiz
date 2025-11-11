/**
 * READY.JS
 *
 * Responsible for: Ready screen before each question
 * Person: [Assign to team member]
 *
 * TODO:
 * - Display random greeting message from questions.json
 * - Show current player's name
 * - This screen updates automatically when shown (see navigation.js)
 */

import { gameState } from './main.js';
import { getRandomFromArray } from './data.js';

export function initReady() {
  // STEP 1: Find the HTML elements you need
  // const greetingText = document.querySelector('[data-screen="ready"] .screen__title__text--greeting');
  // const playerNameText = document.querySelector('[data-screen="ready"] .screen__title__text--username');

  // Expose update function so navigation.js can call it automatically
  window.updateReadyScreen = updateReadyScreen;

  function updateReadyScreen() {
    // STEP 2: Get random greeting message
    // Get the array: gameState.questionsData.responseMessages.readyMessage
    // Use getRandomFromArray() to pick one random message

    // STEP 3: Get current player's name
    // If gameState.currentPlayerIndex is 0, use gameState.playerOne
    // If gameState.currentPlayerIndex is 1, use gameState.playerTwo

    // STEP 4: Update the screen
    // Set greetingText to: randomGreeting + ","
    // Set playerNameText to: currentPlayerName
  }
}
