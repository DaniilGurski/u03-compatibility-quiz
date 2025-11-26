import {
    gameState
} from "./main.js";
import {
    getRandomFromArray
} from "./data.js";
let greetingText;
let playerName;
export function initReady() {
    greetingText = document.querySelector('[data-screen="ready"] .screen__title__text--greeting');
    playerName = document.querySelector('[data-screen="ready"] .screen__title__text--username');
    window.updateReadyScreen = updateReadyScreen
}

function updateReadyScreen() {
    console.log("updateReadyScreen running - start");
    if (gameState.questionsData === null) {
        console.error("No questions data");
        return
    }
    const maybeMessages = gameState.questionsData.responseMessages.readyMessage;
    if (maybeMessages) {
        const randomGreeting = getRandomFromArray(maybeMessages);
        const idx = gameState?.currentPlayerIndex;
        const currentPlayerName = idx === 0 ? gameState.playerOne : gameState.playerTwo;
        if (!greetingText || !playerName) {
            console.warn("One of DOM elements is null:", {
                greetingText: greetingText,
                playerName: playerName
            });
            return
        }
        greetingText.textContent = randomGreeting + ",";
        playerName.textContent = currentPlayerName
    }
}