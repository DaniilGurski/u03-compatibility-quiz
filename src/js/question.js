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
export function initQuestion() {
    const questionForm = document.querySelector('[data-screen="question"] .question-form');
    const playerTurnText = document.querySelector(".question-form__player-name");
    const currentQuestionText = document.querySelector(".question-form__progress-current");
    const totalQuestionsText = document.querySelector(".question-form__progress-total");
    const questionText = document.querySelector(".question-form__fieldset-text");
    const answerLabels = document.querySelectorAll(".answer-option__text");
    const answerRadioButtons = document.querySelectorAll(".answer-option__input");
    const errorMessage = document.querySelector(".question-form__error");
    window.updateQuestionScreen = updateQuestionScreen;

    function updateQuestionScreen() {
        const category = gameState.questionsData.categories.find(cat => cat.id === gameState.selectedCategoryId);
        const question = category.questions[gameState.currentQuestionIndex];
        const currentPlayerName = gameState.currentPlayerIndex === 0 ? gameState.playerOne : gameState.playerTwo;
        playerTurnText.textContent = `${currentPlayerName}'s turn`;
        currentQuestionText.textContent = `Question ${gameState.currentQuestionIndex + 1}`;
        totalQuestionsText.textContent = `of ${category.questions.length}`;
        questionText.textContent = question.text;
        answerLabels[0].textContent = question.options[0];
        answerLabels[1].textContent = question.options[1];
        answerLabels[2].textContent = question.options[2];
        answerRadioButtons.forEach(radio => radio.checked = false)
    }
    questionForm.addEventListener("submit", event => {
        event.preventDefault();
        const selectedAnswer = questionForm.querySelector('input[type="radio"]:checked');
        if (!selectedAnswer) {
            showError(errorMessage, "Please select an answer");
            return
        }
        clearError(errorMessage);
        const answerValue = selectedAnswer.value;
        const category = gameState.questionsData.categories.find(cat => cat.id === gameState.selectedCategoryId);
        const question = category.questions[gameState.currentQuestionIndex];
        let existingAnswer = gameState.answers.find(a => a.questionId === question.id);
        if (!existingAnswer) {
            existingAnswer = {
                questionId: question.id,
                questionText: question.text,
                playerOneAnswer: null,
                playerTwoAnswer: null
            };
            gameState.answers.push(existingAnswer)
        }
        if (gameState.currentPlayerIndex === 0) {
            existingAnswer.playerOneAnswer = answerValue
        } else {
            existingAnswer.playerTwoAnswer = answerValue
        }
        showScreen("handoff")
    });
    answerRadioButtons.forEach(radio => {
        clearErrorOnInteraction(radio, errorMessage, "change")
    })
}