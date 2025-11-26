import {
    gameState
} from "./main.js";
import {
    showScreen
} from "./navigation.js";
import {
    getRandomFromArray
} from "./data.js";
import {
    formatTime,
    stopTimer
} from "./timer.js";
export function initResult() {
    const matchCountText = document.querySelector(".screen__subtitle__match-count");
    const scoreCountText = document.querySelector(".screen__subtitle__score");
    const commentText = document.querySelector(".screen__subtitle__comment");
    const resultsContainer = document.querySelector(".screen__results");
    const completionTimeText = document.querySelector(".screen__completion-time > span");
    const template = document.getElementById("result-card-template");
    window.updateResultScreen = updateResultScreen;

    function updateResultScreen() {
        stopTimer();
        const answers = gameState.answers;
        const playerOne = gameState.playerOne;
        const playerTwo = gameState.playerTwo;
        const completionTimeSeconds = gameState.completionTimeSeconds;
        if (!answers || answers.length === 0) return;
        const totalQuestions = answers.length;
        let totalMatches = 0;
        for (let answer of answers) {
            if (answer.playerOneAnswer === answer.playerTwoAnswer) {
                totalMatches++
            }
        }
        const score = Math.round(totalMatches / totalQuestions * 100);
        matchCountText.textContent = `${totalMatches} out of ${totalQuestions} questions`;
        scoreCountText.textContent = `${score}%`;
        const syncoMessages = gameState.questionsData.responseMessages.syncoMessage;
        if (score === 0) {
            commentText.textContent = getRandomFromArray(syncoMessages.zero)
        } else if (score === 100) {
            commentText.textContent = getRandomFromArray(syncoMessages.full)
        } else if (score > 0 && score <= 30) {
            commentText.textContent = getRandomFromArray(syncoMessages.bad)
        } else if (score > 30 && score < 70) {
            commentText.textContent = getRandomFromArray(syncoMessages.neutral)
        } else if (score >= 70 && score < 100) {
            commentText.textContent = getRandomFromArray(syncoMessages.good)
        }
        completionTimeText.textContent = formatTime(completionTimeSeconds);
        resultsContainer.innerHTML = "";
        answers.forEach((item, index) => {
            const card = template.content.cloneNode(true);
            const tag = card.querySelector(".result-card__tag");
            const questitle = card.querySelector(".result-card__question-title");
            const quesDescription = card.querySelector(".result-card__question-description");
            const answerSummary = card.querySelector(".result-card__answer-summary");
            const isMatch = item.playerOneAnswer === item.playerTwoAnswer;
            if (isMatch) {
                tag.textContent = "Same take";
                tag.dataset.match = "match"
            } else {
                tag.textContent = "Different takes";
                tag.dataset.match = "mismatch"
            }
            questitle.textContent = `Question ${index+1}`;
            quesDescription.textContent = item.questionText;
            const capitalizeFirst = str => str.charAt(0).toUpperCase() + str.slice(1);
            answerSummary.textContent = `${playerOne}: ${capitalizeFirst(item.playerOneAnswer)}. ${playerTwo}: ${capitalizeFirst(item.playerTwoAnswer)}`;
            console.log(item);
            resultsContainer.appendChild(card)
        })
    }
    const playAgainBtn = document.querySelector(".play__again__button");
    playAgainBtn.addEventListener("click", event => {
        event.preventDefault();
        gameState.selectedCategoryId = null;
        gameState.currentPlayerIndex = 0;
        gameState.currentQuestionIndex = 0;
        gameState.answers = [];
        gameState.completionTimeSeconds = 0;
        showScreen("category")
    })
}