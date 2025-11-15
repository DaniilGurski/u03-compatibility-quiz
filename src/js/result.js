/**
 * RESULT.JS
 * 
 * Responsible for: Results screen
 *
 * TODO:
 * - Calculate compatibility score (count matching answers)
 * - Display score and percentage
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

  const playAgainBtn = document.querySelector(".screen__button");



  function updateResultScreen() {

    const answers = gameState.answers;
    const playerOne = gameState.playerOne;
    const playerTwo = gameState.playerTwo;

    if (!answers || answers.length === 0) return;

    const totalQuestions = answers.length;
    
    let totalMatches = 0;
    for (let answer of answers) {
      if (answer.playerOne === answer.playerTwo) {
        totalMatches++
      }
    }

    const score = Math.round((totalMatches / totalQuestions) * 100);

    matchCountText.textContent = `${totalMatches} out of ${totalQuestions} questions`;
    scoreCountText.textContent = `${score}%`;


    const message = {
      
      5: ["Full match! You two are basically the same person. Seek help", 
           "A full sweep. Get a room", 
           "Perfect match. I’m annoyed at how well this worked for you"],
        
      4: ["Great match, but not flawless. Stay humble", 
           "Almost perfect… but someone had to ruin it", 
           "Almost perfect! One tiny disagreement keeps things spicy"],
        
      3: ["Pretty good! Compatible enough to hang out… or at least not block each other", 
           "Not bad! You’d survive a coffee date", 
           "Right in the middle. Could go cute or chaotic"],

      2: ["Hmm. You match, but only in the “we tried” kind of way", 
           "Barely compatible. Proceed with caution", 
           "Two out of five. Ehh… tolerable at best"],
      
      1: ["You’d make great strangers", 
           "A single match. Cute, but no", 
           "One match. A single pity point"],

      0: ["Perfect mismatch. Stunning work", 
          "Absolutely nothing in common. Impressive, honestly", 
          "Not a match. Not even accidentally"]
    }


    if (score === 0) {

    }
    else if (score === 20) {

    }
    else if (score === 40) {
      
    }
    else if (score === 60) {
      
    }
    else if (score === 80) {
      
    }
    else if (score === 100) {
      
    }












































  // Expose update function so navigation.js can call it automatically
  window.updateResultScreen = updateResultScreen;

  function updateResultScreen() {
    // STEP 2: Calculate matching answers
    // Count how many items in gameState.answers have matching answers
    // An answer matches if: playerOneAnswer === playerTwoAnswer
    // Get total: gameState.answers.length

    // STEP 3: Calculate percentage
    // Percentage = (matchingCount / totalAnswers) * 100
    // Use Math.round() to round to nearest whole number

    // STEP 4: Update score display
    // Set matchingAnswersText to: matchingCount + " out of " + totalAnswers + " questions"
    // Set compatibilityPercentageText to: percentage + "%"

    // STEP 5: Clear previous result cards
    // Set resultsCardsContainer.innerHTML to "" (empty string)

    // STEP 6: Create result card for each question
    // Loop through gameState.answers
    // For each answer, clone the template: resultCardTemplate.content.cloneNode(true)
    // Fill in the card content:
    //   - Question number (index + 1)
    //   - Question text
    //   - Player one name and answer
    //   - Player two name and answer
    // If answers match, add class "result-card--matching" to the card
    // Append card to resultsCardsContainer
  }

  // STEP 7: Set up play again button
  // Add "click" event listener to playAgainButton
  // Use event.preventDefault()
  // Reset gameState to initial values:
  //   - selectedCategoryId = null
  //   - playerOne = ""
  //   - playerTwo = ""
  //   - currentPlayerIndex = 0
  //   - currentQuestionIndex = 0
  //   - answers = []
  // Navigate back to category screen: showScreen("category")
}