// Same Wave - Quiz Game
// A two-player compatibility quiz game

// ============================================
// DEBUG MODE
// ============================================
// Set DEBUG_MODE to true to skip to results with pre-filled answers
// Set DEBUG_MODE to false for normal gameplay
const DEBUG_MODE = false;

// ============================================
// GAME STATE
// ============================================
const gameState = {
  questionsData: null,
  selectedCategoryId: null,
  playerOne: '',
  playerTwo: '',
  currentPlayerIndex: 0, // 0 = player one, 1 = player two
  currentQuestionIndex: 0,
  answers: []
};

// ============================================
// INITIALIZATION
// ============================================
async function init() {
  try {
    // Load questions data
    const response = await fetch('/src/data/questions.json');
    gameState.questionsData = await response.json();

    // Initialize navigation
    setupNavigation();

    // Populate category dropdown
    populateCategoryDropdown();

    // Setup form handlers
    setupCategorySelection();
    setupPlayerForm();
    setupQuestionForm();
    setupPlayAgainButton();

    // Debug mode - skip to results with pre-filled data
    if (DEBUG_MODE) {
      initDebugMode();
      return;
    }

    // Show first screen
    showScreen('welcome');

  } catch (error) {
    console.error('Failed to initialize game:', error);
  }
}

function initDebugMode() {
  console.log('🐛 DEBUG MODE ACTIVE - Skipping to results with sample data');

  // Set up debug data
  gameState.selectedCategoryId = 'movies';
  gameState.playerOne = 'Alice';
  gameState.playerTwo = 'Bob';

  // Get the category questions
  const category = gameState.questionsData.categories.find(cat => cat.id === 'movies');
  if (!category) return;

  // Create sample answers (mix of matches and mismatches)
  gameState.answers = category.questions.map((question, index) => {
    // Create some matches and some mismatches
    let playerOneAnswer, playerTwoAnswer;

    if (index % 3 === 0) {
      // Match - both agree
      playerOneAnswer = 'agree';
      playerTwoAnswer = 'agree';
    } else if (index % 3 === 1) {
      // Mismatch - different answers
      playerOneAnswer = 'agree';
      playerTwoAnswer = 'disagree';
    } else {
      // Match - both neutral
      playerOneAnswer = 'neutral';
      playerTwoAnswer = 'neutral';
    }

    return {
      questionId: question.id,
      questionText: question.text,
      playerOne: playerOneAnswer,
      playerTwo: playerTwoAnswer
    };
  });

  // Go straight to results
  updateResultScreen();
  showScreen('result');
}

// ============================================
// SCREEN NAVIGATION
// ============================================
function setupNavigation() {
  const navButtons = document.querySelectorAll('[data-type="navigation"]');

  navButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      // Check if this button is inside a form - if so, let form handle it
      const isInPlayerForm = button.closest('#players-form');
      const isInQuestionForm = button.closest('.question-form');

      if (isInPlayerForm || isInQuestionForm) {
        return; // Let the form's submit handler deal with it
      }

      const targetScreen = button.getAttribute('data-to');
      handleNavigation(targetScreen);
    });
  });
}

function handleNavigation(targetScreen) {
  // Special handling for certain screens
  if (targetScreen === 'input') {
    if (!validateCategorySelection()) {
      return; // Don't navigate if validation fails
    }
  }

  if (targetScreen === 'ready') {
    updateReadyScreen();
  }

  if (targetScreen === 'question') {
    updateQuestionScreen();
  }

  if (targetScreen === 'handoff') {
    updateHandoffScreen();
  }

  if (targetScreen === 'result') {
    updateResultScreen();
  }

  showScreen(targetScreen);
}

function showScreen(screenName) {
  const allScreens = document.querySelectorAll('.screen');
  const targetScreen = document.querySelector(`[data-screen="${screenName}"]`);

  if (!targetScreen) {
    console.error(`Screen "${screenName}" not found`);
    return;
  }

  // Hide all screens
  allScreens.forEach(screen => {
    screen.style.display = 'none';
  });

  // Show target screen
  targetScreen.style.display = 'grid';

  // Scroll to the screen
  targetScreen.scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// CATEGORY SELECTION
// ============================================
function populateCategoryDropdown() {
  const selectElement = document.getElementById('category-select');

  if (!selectElement || !gameState.questionsData) return;

  // Clear existing options
  selectElement.innerHTML = '';

  // Add default option
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Choose a category';
  selectElement.appendChild(defaultOption);

  // Add category options
  gameState.questionsData.categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category.id;
    option.textContent = `${category.title} (${category.questions.length} questions)`;
    selectElement.appendChild(option);
  });
}

function setupCategorySelection() {
  const selectElement = document.getElementById('category-select');
  const errorSpan = document.querySelector('.category-select__error');

  if (!selectElement) return;

  // Listen for changes
  selectElement.addEventListener('change', (e) => {
    gameState.selectedCategoryId = e.target.value;

    // Clear error when user selects something
    if (errorSpan && e.target.value) {
      errorSpan.textContent = '';
    }
  });
}

function validateCategorySelection() {
  const selectElement = document.getElementById('category-select');
  const errorSpan = document.querySelector('.category-select__error');

  if (!gameState.selectedCategoryId || gameState.selectedCategoryId === '') {
    if (errorSpan) {
      errorSpan.textContent = 'Please select a category';
    }
    return false;
  }

  if (errorSpan) {
    errorSpan.textContent = '';
  }

  return true;
}

// ============================================
// PLAYER INPUT FORM
// ============================================
function setupPlayerForm() {
  const form = document.getElementById('players-form');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validatePlayerInputs()) {
      // Save player names
      const playerOneInput = document.getElementById('player-one');
      const playerTwoInput = document.getElementById('player-two');

      gameState.playerOne = playerOneInput.value.trim();
      gameState.playerTwo = playerTwoInput.value.trim();

      // Reset game state for new game
      gameState.currentPlayerIndex = 0;
      gameState.currentQuestionIndex = 0;
      gameState.answers = [];

      // Navigate to ready screen
      handleNavigation('ready');
    }
  });

  // Clear errors when user types
  const inputs = form.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      const errorSpan = input.nextElementSibling;
      if (errorSpan && errorSpan.classList.contains('player-input__error')) {
        errorSpan.textContent = '';
        errorSpan.style.display = 'none';
      }
    });
  });
}

function validatePlayerInputs() {
  const playerOneInput = document.getElementById('player-one');
  const playerTwoInput = document.getElementById('player-two');

  const playerOneError = playerOneInput.nextElementSibling;
  const playerTwoError = playerTwoInput.nextElementSibling;

  const playerOneName = playerOneInput.value.trim();
  const playerTwoName = playerTwoInput.value.trim();

  let isValid = true;

  // Clear previous errors
  if (playerOneError) {
    playerOneError.textContent = '';
    playerOneError.style.display = 'none';
  }
  if (playerTwoError) {
    playerTwoError.textContent = '';
    playerTwoError.style.display = 'none';
  }

  // Check if empty
  if (!playerOneName) {
    if (playerOneError) {
      playerOneError.textContent = 'Player 1 name cannot be empty';
      playerOneError.style.display = 'block';
    }
    isValid = false;
  }

  if (!playerTwoName) {
    if (playerTwoError) {
      playerTwoError.textContent = 'Player 2 name cannot be empty';
      playerTwoError.style.display = 'block';
    }
    isValid = false;
  }

  // Check if identical (case-insensitive)
  if (playerOneName && playerTwoName && playerOneName.toLowerCase() === playerTwoName.toLowerCase()) {
    if (playerOneError) {
      playerOneError.textContent = 'Names must be different';
      playerOneError.style.display = 'block';
    }
    if (playerTwoError) {
      playerTwoError.textContent = 'Names must be different';
      playerTwoError.style.display = 'block';
    }
    isValid = false;
  }

  return isValid;
}

// ============================================
// READY SCREEN
// ============================================
function updateReadyScreen() {
  const greetingSpan = document.querySelector('[data-screen="ready"] .screen__title__text--greeting');
  const usernameSpan = document.querySelector('[data-screen="ready"] .screen__title__text--username');

  if (!greetingSpan || !usernameSpan || !gameState.questionsData) return;

  // Get random greeting message
  const readyMessages = gameState.questionsData.responseMessages.readyMessage;
  const randomGreeting = readyMessages[Math.floor(Math.random() * readyMessages.length)];

  // Get current player name
  const currentPlayerName = gameState.currentPlayerIndex === 0 ? gameState.playerOne : gameState.playerTwo;

  // Update elements
  greetingSpan.textContent = randomGreeting + ',';
  usernameSpan.textContent = currentPlayerName;
}

// ============================================
// QUESTION SCREEN
// ============================================
function updateQuestionScreen() {
  if (!gameState.questionsData || !gameState.selectedCategoryId) return;

  // Find selected category
  const category = gameState.questionsData.categories.find(cat => cat.id === gameState.selectedCategoryId);
  if (!category) return;

  const currentQuestion = category.questions[gameState.currentQuestionIndex];
  if (!currentQuestion) return;

  // Update player turn indicator
  const playerNameSpan = document.querySelector('.question-form__player-name');
  const currentPlayerName = gameState.currentPlayerIndex === 0 ? gameState.playerOne : gameState.playerTwo;
  if (playerNameSpan) {
    playerNameSpan.textContent = currentPlayerName + "'s turn";
  }

  // Update progress
  const progressCurrentSpan = document.querySelector('.question-form__progress-current');
  const progressTotalSpan = document.querySelector('.question-form__progress-total');
  if (progressCurrentSpan) {
    progressCurrentSpan.textContent = 'Question ' + (gameState.currentQuestionIndex + 1);
  }
  if (progressTotalSpan) {
    progressTotalSpan.textContent = 'of ' + category.questions.length;
  }

  // Update question text
  const questionTextSpan = document.querySelector('.question-form__fieldset-text');
  if (questionTextSpan) {
    questionTextSpan.textContent = currentQuestion.text;
  }

  // Update answer option labels
  const answerTextSpans = document.querySelectorAll('.answer-option__text');
  currentQuestion.options.forEach((option, index) => {
    if (answerTextSpans[index]) {
      answerTextSpans[index].textContent = option;
    }
  });

  // Clear any previously selected radio button
  const radioInputs = document.querySelectorAll('.answer-option__input');
  radioInputs.forEach(radio => {
    radio.checked = false;
  });

  // Clear error message
  const errorSpan = document.querySelector('.question-form__error');
  if (errorSpan) {
    errorSpan.textContent = '';
    errorSpan.style.display = 'none';
  }
}

function setupQuestionForm() {
  const form = document.querySelector('.question-form');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get selected answer
    const selectedRadio = form.querySelector('input[type="radio"]:checked');
    const errorSpan = document.querySelector('.question-form__error');

    if (!selectedRadio) {
      if (errorSpan) {
        errorSpan.textContent = 'Please select an answer';
        errorSpan.style.display = 'block';
      }
      return;
    }

    // Clear error
    if (errorSpan) {
      errorSpan.textContent = '';
      errorSpan.style.display = 'none';
    }

    // Save the answer
    saveAnswer(selectedRadio.value);

    // Navigate to handoff
    handleNavigation('handoff');
  });

  // Clear error when user selects an answer
  const radioInputs = form.querySelectorAll('input[type="radio"]');
  radioInputs.forEach(radio => {
    radio.addEventListener('change', () => {
      const errorSpan = document.querySelector('.question-form__error');
      if (errorSpan) {
        errorSpan.textContent = '';
        errorSpan.style.display = 'none';
      }
    });
  });
}

function saveAnswer(answer) {
  if (!gameState.selectedCategoryId) return;

  const category = gameState.questionsData.categories.find(cat => cat.id === gameState.selectedCategoryId);
  if (!category) return;

  const currentQuestion = category.questions[gameState.currentQuestionIndex];
  if (!currentQuestion) return;

  // Find existing answer entry for this question
  let answerEntry = gameState.answers.find(a => a.questionId === currentQuestion.id);

  // If not found, create new entry
  if (!answerEntry) {
    answerEntry = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.text,
      playerOne: null,
      playerTwo: null
    };
    gameState.answers.push(answerEntry);
  }

  // Update the current player's answer
  if (gameState.currentPlayerIndex === 0) {
    answerEntry.playerOne = answer;
  } else {
    answerEntry.playerTwo = answer;
  }
}

// ============================================
// HANDOFF SCREEN
// ============================================
function updateHandoffScreen() {
  const greetingSpan = document.querySelector('[data-screen="handoff"] .screen__title__text--greeting');
  const usernameSpan = document.querySelector('[data-screen="handoff"] .screen__title__text--username');
  const subtitleParagraph = document.querySelector('[data-screen="handoff"] .screen__subtitle');
  const handoffButton = document.querySelector('[data-screen="handoff"] .screen__button');

  if (!greetingSpan || !usernameSpan || !gameState.questionsData) return;

  // Determine next navigation
  const category = gameState.questionsData.categories.find(cat => cat.id === gameState.selectedCategoryId);
  const totalQuestions = category ? category.questions.length : 0;

  // Check if this is the final handoff (player 2 just answered the last question)
  const isFinalHandoff = (
    gameState.currentPlayerIndex === 1 &&
    gameState.currentQuestionIndex === totalQuestions - 1
  );

  if (isFinalHandoff) {
    // STATE 2: Final Handoff - Show completion message
    greetingSpan.textContent = 'All done!';
    usernameSpan.textContent = '';
    if (subtitleParagraph) {
      subtitleParagraph.textContent = 'You have both answered all the questions';
    }
    if (handoffButton) {
      handoffButton.textContent = 'See results';
    }
  } else {
    // STATE 1: Normal Handoff - Show acknowledgment message
    const handoffMessages = gameState.questionsData.responseMessages.handoffMessage;
    const randomMessage = handoffMessages[Math.floor(Math.random() * handoffMessages.length)];
    const currentPlayerName = gameState.currentPlayerIndex === 0 ? gameState.playerOne : gameState.playerTwo;

    greetingSpan.textContent = randomMessage + ',';
    usernameSpan.textContent = currentPlayerName;
    if (subtitleParagraph) {
      subtitleParagraph.textContent = 'Answer recorded. Now close your eyes and pass the device.';
    }
    if (handoffButton) {
      handoffButton.textContent = 'Hand it over';
    }
  }

  // Determine next screen and update game state
  let nextScreen = 'ready';

  if (gameState.currentPlayerIndex === 0) {
    // Player one just answered, player two needs to answer the same question
    gameState.currentPlayerIndex = 1;
    nextScreen = 'ready';
  } else {
    // Player two just answered
    gameState.currentPlayerIndex = 0;

    // Check if there are more questions
    if (gameState.currentQuestionIndex + 1 < totalQuestions) {
      // Move to next question
      gameState.currentQuestionIndex++;
      nextScreen = 'ready';
    } else {
      // No more questions, go to results
      nextScreen = 'result';
    }
  }

  // Update button's data-to attribute
  if (handoffButton) {
    handoffButton.setAttribute('data-to', nextScreen);
  }
}

// ============================================
// RESULT SCREEN
// ============================================
function updateResultScreen() {
  if (!gameState.questionsData) return;

  // Calculate matches
  let matchCount = 0;
  const totalQuestions = gameState.answers.length;

  gameState.answers.forEach(answer => {
    if (answer.playerOne === answer.playerTwo) {
      matchCount++;
    }
  });

  // Update match count
  const matchCountSpan = document.querySelector('.screen__subtitle__match-count');
  if (matchCountSpan) {
    matchCountSpan.textContent = `${matchCount} out of ${totalQuestions} questions`;
  }

  // Calculate and update percentage
  const percentage = Math.round((matchCount / totalQuestions) * 100);
  const scoreSpan = document.querySelector('.screen__subtitle__score');
  if (scoreSpan) {
    scoreSpan.textContent = percentage + '%';
  }

  // Update comment
  const commentSpan = document.querySelector('.screen__subtitle__comment');
  if (commentSpan) {
    let commentArray;
    if (percentage > 80) {
      commentArray = gameState.questionsData.responseMessages.syncoMessage.good;
    } else if (percentage >= 40) {
      commentArray = gameState.questionsData.responseMessages.syncoMessage.neutral;
    } else {
      commentArray = gameState.questionsData.responseMessages.syncoMessage.bad;
    }

    const randomComment = commentArray[Math.floor(Math.random() * commentArray.length)];
    commentSpan.textContent = randomComment;
  }

  // Create result cards
  createResultCards();
}

function createResultCards() {
  const template = document.getElementById('result-card-template');
  const container = document.querySelector('.screen__results');

  if (!template || !container) return;

  // Clear existing cards
  container.innerHTML = '';

  // Create a card for each answer
  gameState.answers.forEach((answer, index) => {
    const clone = template.content.cloneNode(true);

    // Get elements within the clone
    const tag = clone.querySelector('.result-card__tag');
    const title = clone.querySelector('.result-card__question-title');
    const description = clone.querySelector('.result-card__question-description');
    const summary = clone.querySelector('.result-card__answer-summary');

    // Check if answers match
    const isMatch = answer.playerOne === answer.playerTwo;

    // Update tag
    if (tag) {
      if (isMatch) {
        tag.textContent = gameState.questionsData.responseMessages.matchStatus.match;
        tag.setAttribute('data-match', 'match');
      } else {
        tag.textContent = gameState.questionsData.responseMessages.matchStatus.mismatch;
        tag.setAttribute('data-match', 'mismatch');
      }
    }

    // Update title
    if (title) {
      title.textContent = 'Question ' + (index + 1);
    }

    // Update description
    if (description) {
      description.textContent = answer.questionText;
    }

    // Update summary
    if (summary) {
      if (isMatch) {
        // Both answered the same
        if (answer.playerOne === 'agree') {
          summary.textContent = 'You both agree';
        } else if (answer.playerOne === 'disagree') {
          summary.textContent = 'You both disagree';
        } else if (answer.playerOne === 'neutral') {
          summary.textContent = 'You are both neutral';
        }
      } else {
        // Different answers - format as "Player1 agrees and Player2 disagrees"
        const formatAnswer = (ans) => {
          if (ans === 'agree') return 'agrees';
          if (ans === 'disagree') return 'disagrees';
          if (ans === 'neutral') return 'is neutral';
          return ans;
        };

        summary.textContent = `${gameState.playerOne} ${formatAnswer(answer.playerOne)} and ${gameState.playerTwo} ${formatAnswer(answer.playerTwo)}`;
      }
    }

    // Append to container
    container.appendChild(clone);
  });
}

function setupPlayAgainButton() {
  const playAgainButton = document.querySelector('[data-screen="result"] .screen__button');

  if (!playAgainButton) return;

  playAgainButton.addEventListener('click', () => {
    // Reset game state but keep player names
    gameState.selectedCategoryId = null;
    gameState.currentPlayerIndex = 0;
    gameState.currentQuestionIndex = 0;
    gameState.answers = [];

    // Reset category dropdown
    const selectElement = document.getElementById('category-select');
    if (selectElement) {
      selectElement.value = '';
    }

    // Navigate to category screen
    showScreen('category');
  });
}

// ============================================
// START THE GAME
// ============================================
document.addEventListener('DOMContentLoaded', init);
