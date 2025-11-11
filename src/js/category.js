/**
 * CATEGORY.JS
 *
 * Responsible for: Category selection screen
 * Adapted from: game.js lines 84-120
 */

import { gameState } from './main.js';

export function initCategory() {
  // ============================================================================
  // CATEGORY SELECTION
  // ============================================================================

  const categorySelect = document.getElementById("category-select");

  // For each category in the categories array, create an option element and add it to the categorySelect element.
  function createOptions(categories) {
    categories.forEach(({ id, title, questions }) => {
      const option = document.createElement("option");
      const questionCount = questions.length;

      option.textContent = `${title} (${questionCount} questions)`;
      option.value = id;
      categorySelect.appendChild(option);
    });
  }

  // Use the data that's already loaded in gameState instead of fetching again
  if (gameState.questionsData) {
    createOptions(gameState.questionsData.categories);
  }

  // When user selects new category, save it in the gameState object
  categorySelect.addEventListener("change", (e) => {
    gameState.selectedCategoryId = e.target.value;
  });
}
