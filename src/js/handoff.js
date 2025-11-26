import {
    gameState
} from "./main.js";
import {
    getRandomFromArray
} from "./data.js";
import {
    showScreen
} from "./navigation.js";
export function initHandoff() {
    const greetingSpan = document.querySelector('[data-screen="handoff"] .screen__title__text--greeting');
    const usernameSpan = document.querySelector('[data-screen="handoff"] .screen__title__text--username');
    const subtitleParagraph = document.querySelector('[data-screen="handoff"] .screen__subtitle');
    const continueButton = document.querySelector('[data-screen="handoff"] .screen__button');
    if (!greetingSpan || !usernameSpan || !subtitleParagraph || !continueButton) {
        console.error("Handoff screen elements missing");
        return
    }
    window.updateHandoffScreen = updateHandoffScreen;

    function updateHandoffScreen() {
        const categories = gameState.questionsData?.categories || [];
        const category = categories.find(cat => cat.id === gameState.selectedCategoryId);
        if (!category) {
            console.warn("Handoff screen: category is undefined. Did you select a category?", "selectedCategoryId:", gameState.selectedCategoryId, "categories:", categories);
            greetingSpan.textContent = "Oops!";
            usernameSpan.textContent = "";
            subtitleParagraph.textContent = "Something went wrong. Make sure a category is selected before proceeding.";
            continueButton.disabled = true;
            return
        }
        const totalQuestions = category.questions.length;
        const isFinalHandoff = gameState.currentPlayerIndex === 1 && gameState.currentQuestionIndex === totalQuestions - 1;
        const currentPlayerName = gameState.currentPlayerIndex === 0 ? gameState.playerOne : gameState.playerTwo;
        if (isFinalHandoff) {
            greetingSpan.textContent = "All done!";
            usernameSpan.textContent = "";
            subtitleParagraph.textContent = "You have both answered all the questions. Let's see your results!";
            continueButton.textContent = "See results";
            continueButton.setAttribute("data-to", "result");
            continueButton.disabled = false;
            return
        }
        const randomAck = getRandomFromArray(gameState.questionsData.responseMessages?.handoffMessage || ["Nice!"]);
        greetingSpan.textContent = randomAck + ",";
        usernameSpan.textContent = currentPlayerName;
        subtitleParagraph.textContent = "Answer recorded. Hand over the device to the next player and make sure not to peek!";
        continueButton.textContent = "Hand it over";
        continueButton.setAttribute("data-to", "ready");
        continueButton.disabled = false
    }
    continueButton.addEventListener("click", event => {
        event.preventDefault();
        const to = continueButton.getAttribute("data-to");
        if (to === "ready") {
            if (gameState.currentPlayerIndex === 0) {
                gameState.currentPlayerIndex = 1
            } else {
                gameState.currentPlayerIndex = 0;
                gameState.currentQuestionIndex++
            }
            showScreen("ready");
            return
        }
        if (to === "result") {
            showScreen("result");
            return
        }
    })
}