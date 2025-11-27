# Same Wave

The cool and quirky conversation starter or when you want to find out if you and your partner agrees on something.

Take turns answering quirky questions - are you on the same wavelength? A fun conversation starter for couples, friends, and anyone who wants to see how well they really know each other.

Same Wave is a game for anyone curious about compatibility. For life's big, small, deep, and delightfully weird questions!

## How to Play
Same Wave is a two-player game where you discover if you think alike on various topics. Both players share one device and take turns answering questions privately.

### Game Flow

1. **Choose a category** - Pick something you're both into (or think you are)
2. **Take turns answering** - Tap "Agree", "Disagree", or "Neutral" - no overthinking!
3. **Pass the device** - Hand off between rounds (trust us, it's part of the fun)
4. **See your results** - Find out if you're on the same wavelength

## Game Mechanics

The game works by having two players take turns answering questions separately, passing the device back and forth. The entire experience is broken down into screens that guide players through the journey:

### Screen Flow

1. **Welcome Screen** - Game title and description, button to continue
2. **Rules Screen** - How to play instructions, button to category selection
3. **Category Screen** - Dropdown menu populated with categories from the questions data, shows question count for each category
4. **Input Screen** - Both players enter their names (with validation), button to start
5. **Get Ready Screen** - Tells the current player it's their turn
6. **Question Screen** - Displays the question with "Agree", "Disagree", and "Neutral" options, shows player name and progress
7. **Handoff Screen** - Confirms answer was received, prompts to pass device to other player
8. **Result Screen** - Shows both players' answers in a fun way, option to restart

The HTML and CSS provide the static structure and styling, while JavaScript handles the dynamic content and user interactions.

## Project Structure

```
project/
├── index.html              Main HTML file
├── style.css               All styles
├── favicon.ico             Browser favicon (ICO format)
├── favicon.svg             Browser favicon (SVG format)
└── src/
    ├── js/                 JavaScript modules
    │   ├── main.js         Coordinator and shared gameState
    │   ├── navigation.js   Screen switching logic
    │   ├── data.js         Loads questions.json
    │   ├── validation.js   Input validation utilities
    │   ├── cookie-consent.js  Cookie consent banner
    │   ├── timer.js        Keeps track of how long a game takes
    │   ├── category.js     Category selection
    │   ├── input.js        Player name input
    │   ├── ready.js        Ready screen
    │   ├── question.js     Question screen
    │   ├── handoff.js      Handoff screen
    │   └── result.js       Results screen
    └── data/
        └── questions.json  Question data
```

## JavaScript Organization

The JavaScript is split into modular files to allow team members to work independently without merge conflicts. All screens exist as sections in the HTML, and JavaScript handles showing/hiding them and managing the dynamic content.

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

**validation.js** - Provides input validation utilities

**cookie-consent.js** - Handles cookie consent banner display and user preferences

### Screen Files

Each screen file exports an `init` function that sets up that screen's functionality:

- **category.js** - Populates dropdown, saves selection
- **input.js** - Captures player names, validates input
- **ready.js** - Shows greeting and player name
- **question.js** - Displays questions, captures answers
- **handoff.js** - Handles player switching logic
- **result.js** - Calculates and displays results

### How It Works

1. `main.js` loads questions data and initializes all screen modules
2. Each screen module imports `gameState` and `showScreen()` as needed
3. Screen modules read from and write to the shared `gameState`
4. Navigation between screens uses `showScreen('screenName')`

## SEO

The site is optimized for search engines with structured data and semantic markup. We've implemented JSON-LD VideoGame schema that tells search engines what the game is about, who can play it, and where to find it. The page uses proper heading hierarchy, descriptive meta tags, and a canonical URL. Accessibility features like ARIA labels and visually-hidden content help both screen readers and search crawlers understand the page structure. Performance optimizations include font-display swap for faster text rendering and modern CSS for better Core Web Vitals scores.

## Analytics

We use Google Analytics 4 with a privacy-first approach. The analytics script only loads after users accept cookies through the consent banner. User preferences are stored in localStorage and remembered across sessions. If users reject tracking, all Google Analytics cookies are removed and the script won't load. Users can change their preference anytime using the cookie settings button. During development, the system uses test cookies instead of real analytics.

Create by Group 2 (Team 2). Link to live version: [https://aquamarine-cascaron-d4bd3d.netlify.app](https://aquamarine-cascaron-d4bd3d.netlify.app).