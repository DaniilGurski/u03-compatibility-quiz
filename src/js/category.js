/**
 * CATEGORY.JS
 *
 * Responsible for: Category selection screen
 * Adapted from: game.js lines 84-120
 */

import { gameState } from "./main.js";
import { showError, clearError, clearErrorOnInteraction } from "./validation.js";

export function initCategory() {
  // ============================================================================
  // CATEGORY SELECTION
  // ============================================================================

  const categorySelect = document.getElementById("category-select");

  // The span tag for the error message
  const categoryError = document.querySelector(".category-select__error");

  // The navigation buttons
  const navigationButton = document.querySelector('[data-screen="category"] [data-to="input"]');

  // For each category in the categories array, create an option element and add it to the categorySelect element.
  function createOptions(categories) {
    // Add default "Please select" option
    const defaultOption = document.createElement("option");
    defaultOption.textContent = "Please select a category";
    defaultOption.value = "";
    categorySelect.appendChild(defaultOption);

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

  // Remove the error message when the players select a category
  clearErrorOnInteraction(categorySelect, categoryError, "change");

  navigationButton.addEventListener("click", (e) => {
    // Not null or indefined, not an empty string - we check that the players have chosen a category
    if (!gameState.selectedCategoryId || gameState.selectedCategoryId === "") {
      // Because navigation.js adds eventlistners, we need to make sure our triggers first.
      e.stopImmediatePropagation();
      e.preventDefault();
      showError(categoryError, "Please select a category");
    } else {
      clearError(categoryError);
    }
    // https://javascript.info/bubbling-and-capturing - I'm not really sure I completely understand this...
  }, { capture: true });
}


