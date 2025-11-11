# Debug Mode

Debug mode allows you to skip directly to the results screen with pre-filled sample data. This is useful for testing the results screen without playing through the entire game.

## How to Enable Debug Mode

1. Open `game2.js` (or your main JavaScript file)
2. Find the `DEBUG_MODE` constant at the top of the file (around line 9)
3. Change it from `false` to `true`:

```javascript
// Before
const DEBUG_MODE = false;

// After
const DEBUG_MODE = true;
```

4. Save the file and refresh your browser

## What Happens in Debug Mode

When debug mode is enabled:

1. **Skips all screens** - Goes directly from initialization to results
2. **Uses sample data:**
   - Player 1: "Alice"
   - Player 2: "Bob"
   - Category: "movies" (first category in questions.json)
3. **Generates answers** - Creates a mix of matching and mismatching answers:
   - Questions 0, 3, 6, etc.: Both players agree (match)
   - Questions 1, 4, 7, etc.: Player 1 agrees, Player 2 disagrees (mismatch)
   - Questions 2, 5, 8, etc.: Both players are neutral (match)
4. **Shows console message** - Logs "🐛 DEBUG MODE ACTIVE - Skipping to results with sample data"

## Debug Data Structure

The debug mode creates answers in this pattern for all questions in the selected category:

```javascript
// Example for 5 questions
[
  { questionId: "movies-1", questionText: "...", playerOne: "agree", playerTwo: "agree" },      // Match
  { questionId: "movies-2", questionText: "...", playerOne: "agree", playerTwo: "disagree" },   // Mismatch
  { questionId: "movies-3", questionText: "...", playerOne: "neutral", playerTwo: "neutral" },  // Match
  { questionId: "movies-4", questionText: "...", playerOne: "agree", playerTwo: "agree" },      // Match
  { questionId: "movies-5", questionText: "...", playerOne: "agree", playerTwo: "disagree" }    // Mismatch
]
```

This creates approximately 60% matches and 40% mismatches (varies based on total questions).

## Use Cases

**Testing the results screen:**
- Verify the sync-o-score calculation
- Check result card rendering
- Test "Play again" button functionality
- Verify match/mismatch tag display
- Test answer summary formatting

**Design review:**
- Show stakeholders the results layout quickly
- Test different screen sizes
- Verify color schemes and styling

**Development workflow:**
- Test changes to results screen without playing through
- Debug result card template cloning
- Verify data binding

## Customizing Debug Data

You can modify the `initDebugMode()` function to test specific scenarios:

### Test all matches (100% sync)
```javascript
// In initDebugMode(), change the answer generation:
playerOneAnswer = 'agree';
playerTwoAnswer = 'agree';
```

### Test all mismatches (0% sync)
```javascript
// In initDebugMode(), change the answer generation:
playerOneAnswer = 'agree';
playerTwoAnswer = 'disagree';
```

### Test different category
```javascript
// Change this line:
gameState.selectedCategoryId = 'living'; // Instead of 'movies'
```

### Test different player names
```javascript
// Change these lines:
gameState.playerOne = 'Your Name';
gameState.playerTwo = 'Their Name';
```

## Important Notes

**ALWAYS DISABLE BEFORE PRODUCTION:**
- Debug mode should NEVER be enabled in production
- Always set `DEBUG_MODE = false` before deploying
- Consider adding a check to prevent debug mode in production environments

**Limitations:**
- Only works with the first category if you don't modify the code
- Doesn't test the actual game flow (questions, handoff, etc.)
- Doesn't test validation or error handling
- Doesn't test navigation between screens

## Disabling Debug Mode

1. Open `game2.js`
2. Change `DEBUG_MODE` back to `false`
3. Save and refresh

The game will now start normally from the welcome screen.

## Console Message

When debug mode is active, you'll see this message in the browser console:

```
🐛 DEBUG MODE ACTIVE - Skipping to results with sample data
```

If you don't see this message, debug mode is not active.
