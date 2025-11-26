import {
    initCookieConsent
} from "./cookie-consent.js";
import {
    initNavigation
} from "./navigation.js";
import {
    initCategory
} from "./category.js";
import {
    initInput
} from "./input.js";
import {
    initReady
} from "./ready.js";
import {
    initQuestion
} from "./question.js";
import {
    initHandoff
} from "./handoff.js";
import {
    initResult
} from "./result.js";
import {
    loadQuestions
} from "./data.js";
import {
    initTimer
} from "./timer.js";
export const gameState = {
    playerOne: "",
    playerTwo: "",
    selectedCategoryId: null,
    questionsData: null,
    currentPlayerIndex: 0,
    currentQuestionIndex: 0,
    answers: [],
    completionTimeSeconds: 0
};
async function initializeGame() {
    await initCookieConsent();
    console.log("Initializing Same Wave game...");
    try {
        await loadQuestions();
        console.log("Questions loaded");
        initNavigation();
        console.log("Navigation initialized");
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
        initTimer();
        console.log("Timer initialized");
        console.log("Game ready!")
    } catch (error) {
        console.error("Error initializing game:", error)
    }
}
document.addEventListener("DOMContentLoaded", initializeGame);