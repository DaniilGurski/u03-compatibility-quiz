/**
 * DATA.JS
 *
 * Responsible for: Loading questions.json data
 * Person: Can be done by team lead or assigned to someone
 */

import { gameState } from "./main.js";

/**
 * Loads the questions data from questions.json
 */
export async function loadQuestions() {
  try {
    const response = await fetch("/src/data/questions.json");

    if (!response.ok) {
      throw new Error(`Failed to load questions: ${response.status}`);
    }

    const questionsData = await response.json();
    gameState.questionsData = questionsData;

    console.log(`Loaded ${questionsData.categories.length} categories`);
    return questionsData;
  } catch (error) {
    console.error("Error loading questions:", error);
    throw error;
  }
}

/**
 * Gets a random item from an array
 * Useful for picking random messages
 */
export function getRandomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}
