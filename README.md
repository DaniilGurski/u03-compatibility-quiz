# Same Wave

The cool and quirky conversation starter or when you want to find out if you and your partner agrees on something.

Take turns answering quirky questions - are you on the same wavelength? A fun conversation starter for couples, friends, and anyone who wants to see how well they really know each other.

Same Wave is a game for anyone curious about compatibility. For life's big, small, deep, and delightfully weird questions!

## How to Play
Same Wave is a two-player game where you discover if you think alike on various topics. Both players share one device and take turns answering questions privately.

### Game flow

1. **Choose a category** - Pick something you're both into (or think you are)
2. **Take turns answering** - Tap "Agree", "Disagree", or "Neutral" - no overthinking!
3. **Pass the device** - Hand off between rounds (trust us, it's part of the fun)
4. **See your results** - Find out if you're on the same wavelength

## Project Structure

```
project/
├── index.html              Main HTML file
├── style.css               All styles
├── src/
│   ├── js/                 JavaScript modules
│   │   ├── main.js         Coordinator and shared gameState
│   │   ├── navigation.js   Screen switching logic
│   │   ├── data.js         Loads questions.json
│   │   ├── category.js     Category selection 
│   │   ├── input.js        Player name input
│   │   ├── ready.js        Ready screen
│   │   ├── question.js     Question screen
│   │   ├── handoff.js      Handoff screen
│   │   └── result.js       Results screen
│   ├── data/
│   │   └── questions.json  Question data
│   └── docs/               Documentation
└── demo.js                 Complete working demo
```

## JavaScript Organization

The JavaScript is split into modular files to allow team members to work independently without merge conflicts.

### Core Files (Do Not Edit)

**main.js** - Initializes the game and provides shared `gameState`:
```javascript
export const gameState = {
  playerOne: '',
  playerTwo: '',
  selectedCategoryId: null,
  questionsData: null,
  currentPlayerIndex: 0,
  currentQuestionIndex: 0,
  answers: []
};
```

**navigation.js** - Handles screen transitions via `showScreen(screenName)`

**data.js** - Loads questions.json and provides `getRandomFromArray()` helper

### Screen Files

Each screen file exports an `init` function that sets up that screen's functionality:

- **category.js** - Populates dropdown, saves selection (COMPLETED - adapted from game.js)
- **input.js** - Captures player names, validates input (COMPLETED - adapted from game.js)
- **ready.js** - Shows greeting and player name
- **question.js** - Displays questions, captures answers
- **handoff.js** - Handles player switching logic
- **result.js** - Calculates and displays results

### How It Works

1. `main.js` loads questions data and initializes all screen modules
2. Each screen module imports `gameState` and `showScreen()` as needed
3. Screen modules read from and write to the shared `gameState`
4. Navigation between screens uses `showScreen('screenName')`

### Working Demo

To see the complete working game, switch to demo mode in `index.html`:

```html
<!-- Comment out main.js -->
<!-- <script type="module" src="src/js/main.js"></script> -->

<!-- Uncomment demo.js -->
<script type="module" src="demo.js"></script>
```

## Git stuff

### See available branches
git branch --all

### Create a branch and switch to it
git checkout -b yournewbranchname

### Switch to an existing branch that you know the name of
git swith branchtoswitchto

### Switch to main (in order to delete another branch)
git checkout main

### Multi kill (delete local and remote branches)
git branch -D yourbranchname && git push origin --delete yourbranchname

### Stage (add to index)
git add . (to add everything) or git add thefileyouwanttostage to stage files individually

### Commit (create a point in time)
git commit -m "Your commit message"

### Push (send your branch to GitHub)
git push -u orgin yourbranchname