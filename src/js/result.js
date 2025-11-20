/**
 * RESULT.JS
 * 
 * Responsible for: Results screen
 *
 * TODO:
 * - Generate result cards for each question showing both answers
 * - Handle "Play again" functionality (reset gameState)
 * - This screen updates automatically when shown (see navigation.js)
 */

import { gameState } from "./main.js";
import { showScreen } from "./navigation.js";
import { getRandomFromArray } from "./data.js";

export function initResult() {

  const matchCountText = document.querySelector(".screen__subtitle__match-count");
  const scoreCountText = document.querySelector(".screen__subtitle__score");
  const commentText = document.querySelector(".screen__subtitle__comment");
  const resultsContainer = document.querySelector(".screen__results");
  const template = document.getElementById("result-card-template");

  window.updateResultScreen = updateResultScreen;

  function updateResultScreen() {

    const answers = gameState.answers;
    const playerOne = gameState.playerOne;
    const playerTwo = gameState.playerTwo;

    if (!answers || answers.length === 0) return;

    // Count how many answers match between the two players

    const totalQuestions = answers.length;

    let totalMatches = 0;
    for (let answer of answers) {
      if (answer.playerOne === answer.playerTwo) {
        totalMatches++
      }
    }

    // Convert match count into a percentage score

    const score = Math.round((totalMatches / totalQuestions) * 100);

    matchCountText.textContent = `${totalMatches} out of ${totalQuestions} questions`;
    scoreCountText.textContent = `${score}%`;

    // Get the sync messages from questions.json
    const syncoMessages = gameState.questionsData.responseMessages.syncoMessage;

    // Pick the appropriate message based on the score percentage
    if (score === 0) {
      commentText.textContent = getRandomFromArray(syncoMessages.zero);
    } else if (score === 100) {
      commentText.textContent = getRandomFromArray(syncoMessages.full);
    } else if (score > 0 && score <= 30) {
      commentText.textContent = getRandomFromArray(syncoMessages.bad);
    } else if (score > 30 && score < 70) {
      commentText.textContent = getRandomFromArray(syncoMessages.neutral);
    } else if (score >= 70 && score < 100) {
      commentText.textContent = getRandomFromArray(syncoMessages.good);
    }

    // Clear old cards

    resultsContainer.innerHTML = "";

    answers.forEach((item, index) => {
      const card = template.content.cloneNode(true);

      const tag = card.querySelector(".result-card__tag");
      const questitle = card.querySelector(".result-card__question-title");
      const quesDescription = card.querySelector(".result-card__question-description");
      const answerSummary = card.querySelector(".result-card__answer-summary");

      const isMatch = item.playerOne === item.playerTwo;

      if (isMatch) {
        tag.textContent = "Same take";
        tag.dataset.match = "match";
      } else {
        tag.textContent = "Different takes";
        tag.dataset.match = "mismatch";
      }

      questitle.textContent = `Question ${index + 1}`;
      quesDescription.textContent = item.questionText;

      answerSummary.textContent = `${playerOne}: ${item.playerOneAnswer} | ${playerTwo}: ${item.playerTwoAnswer}`;

      console.log(item)

      resultsContainer.appendChild(card);
    })

  }
  //This class does not exist, we need to fix this.
  const playAgainBtn = document.querySelector(".play__again__button");

  playAgainBtn.addEventListener("click", (event) => {
    event.preventDefault();

    gameState.selectedCategoryId = null;
    gameState.currentPlayerIndex = 0;
    gameState.currentQuestionIndex = 0;
    gameState.answers = [];

    showScreen("category");
  })
}