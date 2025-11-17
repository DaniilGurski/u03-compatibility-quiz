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

export function initResult() {


  const matchCountText = document.querySelector(".screen__subtitle__match-count");
  const scoreCountText = document.querySelector(".screen__subtitle__score");
  const commentText = document.querySelector(".screen__subtitle__match-count");
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


    // Different comments to display depending on how well the players matched

    const message = {
      
      100: ["Full match! You two are basically the same person. Seek help", 
           "A full sweep. Get a room", 
           "Perfect match. I’m annoyed at how well this worked for you"],
        
      80: ["Great match, but not flawless. Stay humble", 
           "Almost perfect… but someone had to ruin it", 
           "Almost perfect! One tiny disagreement keeps things spicy"],
        
      60: ["Pretty good! Compatible enough to hang out… or at least not block each other", 
           "Not bad! You’d survive a coffee date", 
           "Right in the middle. Could go cute or chaotic"],

      40: ["Hmm. You match, but only in the “we tried” kind of way", 
           "Barely compatible. Proceed with caution", 
           "Two out of five. Ehh… tolerable at best"],
      
      20: ["You’d make great strangers", 
           "A single match. Cute, but no", 
           "One match. A single pity point"],

      0: ["Perfect mismatch. Stunning work", 
          "Absolutely nothing in common. Impressive, honestly", 
          "Not a match. Not even accidentally"]
    }

    // Pick random message from the array

    function pickRandom(array) {
      return array[Math.floor(Math.random() * array.length)];
    }

    if (score === 0) {
      commentText.textContent = pickRandom(message[0])
    }
    else if (score === 20) {
      commentText.textContent = pickRandom(message[20]);
    }
    else if (score === 40) {
      commentText.textContent = pickRandom(message[40]);
    }
    else if (score === 60) {
      commentText.textContent = pickRandom(message[60]);
    }
    else if (score === 80) {
      commentText.textContent = pickRandom(message[80]);
    }
    else {
      commentText.textContent = pickRandom(message[100]);
    }

    // Clear old cards

    resultsContainer.innerHTML = "";

    answers.forEach((item, index) => {
      const card = template.content.cloneNode(true);

      const tag = card.querySelector(".result-card__tag");      
      const questitle = card.querySelector(".result-card__question-title");      
      const quesDescription = card.querySelector(".result-card__question-description");          
      const answerSummary = card.querySelector(".result-card__answer-summary");
      
      resultsContainer.appendChild(card);

      const isMatch = item.playerOneAnwer === item.playerTwoAnswer;
      
      if (isMatch) {
        tag.textContent = "Same take";
        tag.dataset.match = "match";
      } else {
        tag.textContent = "Different takes";
        tag.dataset.match = "mismatch";
      }

      questitle.textContent = `Question ${index + 1}`;
      quesDescription.textContent = item.questionText;

      answerSummary.textContent = `${playerOne}: ${item.playerOneAnwer} | ${playerTwo}: ${playerTwoAnswer}`;

      resultsContainer.appendChild(card);
    })


  }

  const playAgainBtn = document.querySelector(".screen__button");
  playAgainBtn.addEventListener("click", (event) => {
    event.preventDefault();
    
    gameState = {
      selectedCategoryId: null,
      playerOne: "",
      playerTwo: "",
      currentPlayerIndex: 0,
      currentQuestionIndex: 0, 
      answers: []
    };
    showScreen("category")
  })
}
