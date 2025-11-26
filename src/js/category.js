import {
    gameState
} from "./main.js";
import {
    showError,
    clearError,
    clearErrorOnInteraction
} from "./validation.js";
export function initCategory() {
    const categorySelect = document.getElementById("category-select");
    const categoryError = document.querySelector(".category-select__error");
    const navigationButton = document.querySelector('[data-screen="category"] [data-to="input"]');

    function createOptions(categories) {
        const defaultOption = document.createElement("option");
        defaultOption.textContent = "Please select a category";
        defaultOption.value = "";
        categorySelect.appendChild(defaultOption);
        categories.forEach(({
            id,
            title,
            questions
        }) => {
            const option = document.createElement("option");
            const questionCount = questions.length;
            option.textContent = `${title} (${questionCount} questions)`;
            option.value = id;
            categorySelect.appendChild(option)
        })
    }
    if (gameState.questionsData) {
        createOptions(gameState.questionsData.categories)
    }
    categorySelect.addEventListener("change", e => {
        gameState.selectedCategoryId = e.target.value
    });
    clearErrorOnInteraction(categorySelect, categoryError, "change");
    navigationButton.addEventListener("click", e => {
        if (!gameState.selectedCategoryId || gameState.selectedCategoryId === "") {
            e.stopImmediatePropagation();
            e.preventDefault();
            showError(categoryError, "Please select a category")
        } else {
            clearError(categoryError)
        }
    }, {
        capture: true
    })
}