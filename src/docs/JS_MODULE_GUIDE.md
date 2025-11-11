# JavaScript Module Guide

This guide explains how the JavaScript files are organized for the Same Wave compatibility quiz game.

## Why Modular Structure?

Instead of one big JavaScript file, we have multiple smaller files. This lets everyone work on different parts without causing merge conflicts. Each person works on one screen file.

## File Structure

```
src/js/
├── main.js         - Coordinator and shared data (DO NOT EDIT)
├── navigation.js   - Screen switching (DO NOT EDIT)
├── data.js         - Loading questions.json (DO NOT EDIT)
├── category.js     - Category selection screen
├── input.js        - Player name input screen
├── ready.js        - Ready screen before questions
├── question.js     - Question and answer screen
├── handoff.js      - Handoff screen between players
└── result.js       - Results and compatibility score
```

## The Three Core Files (Already Complete)

These files are already written and working. You will import from them but not edit them.

### main.js - The Coordinator

**What it does:**
- Starts the game when the page loads
- Loads the questions data from questions.json
- Initializes all the screen files
- Provides the shared `gameState` object

**The gameState object** is the most important part. Everyone reads from and writes to this object to share data.

```javascript
gameState = {
  playerOne: '',              // First player's name (string)
  playerTwo: '',              // Second player's name (string)
  selectedCategoryId: null,   // Which category was chosen (string like "movies")
  questionsData: null,        // All data from questions.json (object)
  currentPlayerIndex: 0,      // Whose turn: 0 = player one, 1 = player two
  currentQuestionIndex: 0,    // Which question number (starts at 0)
  answers: []                 // Array of answer objects
}
```

**How to use gameState in your file:**

```javascript
import { gameState } from './main.js';

// Read a value
const playerName = gameState.playerOne;

// Write a value
gameState.selectedCategoryId = 'movies';
```

### navigation.js - Screen Switching

**What it does:**
- Hides all screens except the one you want to show
- Automatically updates screens that need fresh data
- Sets up navigation buttons

**How to use it:**

```javascript
import { showScreen } from './navigation.js';

// Show a different screen
showScreen('ready');
```

### data.js - Loading Data

**What it does:**
- Loads questions.json on startup and saves it to `gameState.questionsData`
- Provides helper function to pick random items from arrays

**How to use it:**

```javascript
import { getRandomFromArray } from './data.js';

const greetings = ['Hello', 'Hi', 'Hey'];
const randomGreeting = getRandomFromArray(greetings);
// randomGreeting will be one of: 'Hello', 'Hi', or 'Hey'
```

## Screen Files

Each screen file exports an `init` function that sets up that screen's functionality:

### ready.js - Ready Screen

**Your job:**
- Show a random greeting message
- Show the current player's name

**HTML elements you'll work with:**
- `.screen__title__text--greeting` - Where greeting goes
- `.screen__title__text--username` - Where player name goes

**Special note:** This screen has an `updateReadyScreen()` function that runs automatically when the screen is shown. You don't need to call it yourself.

### question.js - Question Screen

**Your job:**
- Show whose turn it is ("Sarah's turn")
- Show question progress ("Question 2 of 5")
- Display the question text
- Display the three answer options (Agree, Disagree, Neutral)
- Make sure an answer is selected before continuing
- Save the answer to `gameState.answers`

**HTML elements you'll work with:**
- `.question-form` - The form
- `.question-form__player-name` - Turn indicator
- `.question-form__progress-current` - Current question number
- `.question-form__progress-total` - Total questions
- `.question-form__fieldset-text` - Question text
- `.answer-option__text` - Answer labels (there are 3)
- `.answer-option__input` - Radio buttons (there are 3)
- `.question-form__error` - Error message

**Answer structure:**
Each answer object in `gameState.answers` should look like this:
```javascript
{
  questionId: 'movies-1',
  questionText: 'I like romantic comedies.',
  playerOneAnswer: 'agree',     // or null if they haven't answered yet
  playerTwoAnswer: 'disagree'   // or null if they haven't answered yet
}
```

**Special note:** This screen has an `updateQuestionScreen()` function that runs automatically.

### handoff.js - Handoff Screen

**Your job:**
- Show acknowledgment message ("Nice", "Got it", etc.) or "All done!" if it's the final handoff
- Show the current player's name (or leave blank for final handoff)
- Update the subtitle text
- Change button text and destination
- Update `gameState.currentPlayerIndex` and `gameState.currentQuestionIndex` to move through the game

**HTML elements you'll work with:**
- `.screen__title__text--greeting` - Acknowledgment text
- `.screen__title__text--username` - Player name
- `.screen__subtitle` - Subtitle paragraph
- Button with `[data-type="navigation"]` - Continue button

**Game state logic:**
- If `currentPlayerIndex` is 0: switch to player 2 (set to 1)
- If `currentPlayerIndex` is 1: switch to player 1 (set to 0) AND move to next question (add 1 to `currentQuestionIndex`)

**Special note:** This screen has an `updateHandoffScreen()` function that runs automatically.

### result.js - Results Screen

**Your job:**
- Count how many answers match (where both players gave the same answer)
- Calculate compatibility percentage
- Display the score
- Create a result card for each question showing both answers
- Handle "Play again" button by resetting `gameState`

**HTML elements you'll work with:**
- `.result__score__matching-count` - Score text
- `.result__score__compatibility-percent` - Percentage text
- `.result__results` - Container where cards go
- `#result-card-template` - Template to clone for each card
- Button with `[data-type="navigation"]` - Play again button

**Cloning the template:**
```javascript
const cardCopy = resultCardTemplate.content.cloneNode(true);
// Now fill in the card content and append it to the container
```

**Special note:** This screen has an `updateResultScreen()` function that runs automatically.

## How To Work On Your Assigned File

### Step 1: Uncomment the example code

Each file has commented examples showing which HTML elements you need. Remove the `//` to uncomment them.

```javascript
// Before:
// const categoryDropdown = document.getElementById('category-select');

// After:
const categoryDropdown = document.getElementById('category-select');
```

### Step 2: Follow the STEP comments

Each file has STEP comments explaining what to do in order. Follow them one by one.

### Step 3: Test in the browser

1. Open index.html in your browser
2. Open the browser console (F12)
3. Look for console.log messages showing your screen initialized
4. Click through the game to test your screen

## Common Patterns You'll Use

### Pattern 1: Showing and hiding error messages

```javascript
// Show error
errorMessageElement.textContent = 'Please select a category';
errorMessageElement.style.display = 'block';

// Hide error
errorMessageElement.textContent = '';
errorMessageElement.style.display = 'none';
```

### Pattern 2: Preventing form reload

```javascript
formElement.addEventListener('submit', (event) => {
  event.preventDefault(); // This stops the page from reloading

  // Your validation and saving code here
});
```

### Pattern 3: Getting which player is current

```javascript
let currentPlayerName;
if (gameState.currentPlayerIndex === 0) {
  currentPlayerName = gameState.playerOne;
} else {
  currentPlayerName = gameState.playerTwo;
}

// Or using a ternary operator (shorter):
const currentPlayerName = gameState.currentPlayerIndex === 0
  ? gameState.playerOne
  : gameState.playerTwo;
```

### Pattern 4: Finding an item in an array

```javascript
const selectedCategory = gameState.questionsData.categories.find(
  category => category.id === gameState.selectedCategoryId
);
// This finds the category object where the id matches
```

### Pattern 5: Creating new HTML elements

```javascript
const newOption = document.createElement('option');
newOption.value = 'movies';
newOption.textContent = 'What movies do you prefer? (5 questions)';
dropdownElement.appendChild(newOption);
```

### Pattern 6: Checking if a radio button is selected

```javascript
const selectedRadio = document.querySelector('.answer-option__input:checked');
if (selectedRadio) {
  const answer = selectedRadio.value; // 'agree', 'disagree', or 'neutral'
} else {
  // No answer selected, show error
}
```

## Tips for Success

1. **Read the screen documentation first** - Check `/src/docs/screens/` for detailed requirements for your screen

2. **Use console.log often** - Add console.log statements to see what values your variables have

3. **Test frequently** - Don't write all the code at once. Test each step as you go.

4. **Ask for help** - If you're stuck on `gameState` or navigation, ask the team lead

5. **Don't edit core files** - Only edit your assigned screen file (category.js, input.js, etc.)

6. **Variable names matter** - Use clear, descriptive names like `categoryDropdown` not `dd`

7. **Check the browser console for errors** - Red error messages will tell you what's wrong

## Common Mistakes to Avoid

**Mistake 1:** Forgetting to import what you need
```javascript
// Wrong - showScreen not imported
export function initCategory() {
  showScreen('input'); // Error: showScreen is not defined
}

// Right
import { showScreen } from './navigation.js';
export function initCategory() {
  showScreen('input'); // Works!
}
```

**Mistake 2:** Not preventing form default behavior
```javascript
// Wrong - page will reload
form.addEventListener('submit', () => {
  gameState.playerOne = input.value;
});

// Right - use preventDefault
form.addEventListener('submit', (event) => {
  event.preventDefault();
  gameState.playerOne = input.value;
});
```

**Mistake 3:** Not checking if element exists
```javascript
// Wrong - might cause error if element not found
const dropdown = document.getElementById('wrong-id');
dropdown.value = 'something'; // Error if dropdown is null

// Right - check first
const dropdown = document.getElementById('category-select');
if (dropdown) {
  dropdown.value = 'something';
} else {
  console.error('Dropdown not found');
}
```

## Need Help?

- Check your screen's documentation in `/src/docs/screens/`
- Look at the STEP comments in your file
- Ask the team lead about `gameState` or screen navigation
- Check the browser console for error messages
