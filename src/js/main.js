/**
 * MAIN.JS - Game Coordinator
 *
 * This file coordinates all the different parts of the game.
 * Everyone imports from here and contributes to the shared gameState.
 */

// Import all screen modules
import { initCookieConsent } from "./cookie-consent.js";
import { initNavigation } from "./navigation.js";
import { initCategory } from "./category.js";
import { initInput } from "./input.js";
import { initReady } from "./ready.js";
import { initQuestion } from "./question.js";
import { initHandoff } from "./handoff.js";
import { initResult } from "./result.js";
import { loadQuestions } from "./data.js";

// ==========================================
// SHARED GAME STATE
// ==========================================
// Everyone can read and write to this object
export const gameState = {
  // Player information
  playerOne: "",
  playerTwo: "",

  // Category and questions
  selectedCategoryId: null,
  questionsData: null, // Will hold the loaded questions.json data

  // Game progress
  currentPlayerIndex: 0, // 0 = player one, 1 = player two
  currentQuestionIndex: 0, // Which question we're on (0-based)

  // Answers storage
  answers: [], // Array of answer objects
};

// ==========================================
// INITIALIZATION
// ==========================================
async function initializeGame() {

  // To block everything else and wait for the user to chose yes/no to cookie consent
  await initCookieConsent();

  console.log("Initializing Same Wave game...");

  try {
    // 1. Load the questions data first
    await loadQuestions();
    console.log("Questions loaded");

    // 2. Initialize navigation system
    initNavigation();
    console.log("Navigation initialized");

    // 3. Initialize all screens
    initCategory();
    console.log("Category screen initialized");

    initInput();
    console.log("Input screen initialized");

    initReady();
    console.log("Ready screen initialized");

    initQuestion();
    console.log("Question screen initialized");

    initHandoff();
    console.log("Handoff screen initialized");

    initResult();
    console.log("Result screen initialized");

    console.log("Game ready!");
  } catch (error) {
    console.error("Error initializing game:", error);
  }
}

// Start the game when the page loads
document.addEventListener("DOMContentLoaded", initializeGame);
