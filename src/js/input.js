import {
    gameState
} from "./main.js";
import {
    showScreen
} from "./navigation.js";
import {
    showError,
    clearError,
    clearErrorOnInteraction
} from "./validation.js";
export function initInput() {
    const playersForm = document.getElementById("players-form");
    const playerOneInput = playersForm.querySelector("#player-one");
    const playerTwoInput = playersForm.querySelector("#player-two");
    const playerOneError = playerOneInput.nextElementSibling;
    const playerTwoError = playerTwoInput.nextElementSibling;
    playersForm.addEventListener("submit", e => {
        e.preventDefault();
        const trimmedPlayerOneValue = playerOneInput.value.trim();
        const trimmedPlayerTwoValue = playerTwoInput.value.trim();
        clearError(playerOneError);
        clearError(playerTwoError);
        let isInputValid = true;
        if (trimmedPlayerOneValue === "") {
            showError(playerOneError, "Please enter a name.");
            isInputValid = false
        }
        if (trimmedPlayerTwoValue === "") {
            showError(playerTwoError, "Please enter a name.");
            isInputValid = false
        }
        if (trimmedPlayerOneValue && trimmedPlayerTwoValue && trimmedPlayerOneValue.toLowerCase() === trimmedPlayerTwoValue.toLowerCase()) {
            showError(playerOneError, "Both players are not allowed to use the same name.");
            showError(playerTwoError, "Both players are not allowed to use the same name.");
            isInputValid = false
        }
        if (isInputValid === true) {
            gameState.playerOne = trimmedPlayerOneValue;
            gameState.playerTwo = trimmedPlayerTwoValue;
            showScreen("ready")
        }
    });
    clearErrorOnInteraction(playerOneInput, playerOneError, "input");
    clearErrorOnInteraction(playerTwoInput, playerTwoError, "input")
}