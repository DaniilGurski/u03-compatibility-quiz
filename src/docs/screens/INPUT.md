# Input screen
The input screen is where both players enter their names before starting the game. This screen includes form validation to ensure both names are filled in and that they are different from each other.

## Elements to be populated by JavaScript

This screen doesn't populate elements with dynamic content - instead, it **captures** user input and **validates** it before saving.

## Form inputs to capture

### Player One Name
**Element:** `<input class="player-input__field" id="player-one" type="text" name="player-one">`

- **What:** The first player's name
- **Where to save:** In your game state (as playerOne or similar)
- **When to save:** When the form is successfully submitted (after validation passes)

### Player Two Name
**Element:** `<input class="player-input__field" id="player-two" type="text" name="player-two">`

- **What:** The second player's name
- **Where to save:** In your game state (as playerTwo or similar)
- **When to save:** When the form is successfully submitted (after validation passes)

## Validation requirements

### Rule 1: Both fields must be filled
- **Check:** Both input values must have at least 1 character (after trimming whitespace)
- **If fails:** Display error message and prevent form submission
- **Error message location:** `<span class="player-input__error">` (the span directly after each input)

### Rule 2: Names must be different
- **Check:** Player one's name cannot be the same as player two's name
- **Comparison:** Case-insensitive (so "Sarah" and "sarah" should be considered the same)
- **If fails:** Display error message and prevent form submission
- **Error message location:** `<span class="player-input__error">` (show error on one or both inputs)

### Validation logic
When the form is submitted:

1. **Get the values**
   - Get value from player-one input
   - Get value from player-two input
   - Remove extra whitespace from both (trim)

2. **Check if empty**
   - If player one is empty → show error "Player 1 name cannot be empty"
   - If player two is empty → show error "Player 2 name cannot be empty"

3. **Check if identical**
   - Convert both names to lowercase
   - If they match → show error "Names must be different"

4. **If all validation passes**
   - Save both names to game state
   - Clear any error messages
   - Navigate to the ready screen

## Error display elements

### Player One Error
**Element:** `<span class="player-input__error" aria-live="assertive">` (after player-one input)

- **What:** Error message for player one's input
- **When to show:** When validation fails
- **When to clear:** When validation passes or when user starts typing again
- **Example messages:** 
  - "Player 1 name cannot be empty"
  - "Names must be different"

### Player Two Error
**Element:** `<span class="player-input__error" aria-live="assertive">` (after player-two input)

- **What:** Error message for player two's input
- **When to show:** When validation fails
- **When to clear:** When validation passes or when user starts typing again
- **Example messages:** 
  - "Player 2 name cannot be empty"
  - "Names must be different"

## Form submission handling

**Element:** `<form id="players-form">`

- **When:** Listen for the form's submit event
- **What to do:** 
  1. Prevent default form submission (which would reload the page)
  2. Run validation
  3. If validation passes → save names and navigate to next screen
  4. If validation fails → display errors and stay on current screen

## What to save in game state

After successful validation, save:
- **playerOne:** The first player's name (trimmed)
- **playerTwo:** The second player's name (trimmed)
- **currentPlayerIndex:** Set to 0 (to start with player one)
- **currentQuestionIndex:** Set to 0 (to start with first question)

## User flow

1. Players land on the input screen
2. Player one types their name
3. Player two types their name
4. They click "Start the game" button
5. Form submits and validation runs
6. If errors → error messages appear, form doesn't submit
7. If valid → names are saved, navigate to ready screen

## Validation examples

### Example 1: Both empty
- Input 1: "" (empty)
- Input 2: "" (empty)
- Result: Show errors on both inputs

### Example 2: One empty
- Input 1: "Sarah"
- Input 2: "" (empty)
- Result: Show error only on input 2

### Example 3: Same names
- Input 1: "Sarah"
- Input 2: "Sarah"
- Result: Show error on both inputs (names must be different)

### Example 4: Same names, different case
- Input 1: "sarah"
- Input 2: "SARAH"
- Result: Show error on both inputs (case-insensitive comparison)

### Example 5: Valid
- Input 1: "Sarah"
- Input 2: "John"
- Result: Save names, navigate to ready screen

## IMPORTANT: Form Submit Button Behavior

The "Start the game" button has TWO attributes:
- `type="submit"` - This makes it submit the form
- `data-type="navigation"` and `data-to="ready"` - This is for navigation

**The JavaScript MUST:**
1. Let the form's submit event handler run FIRST (for validation)
2. Only navigate if validation passes
3. NOT let the navigation button's click handler bypass the form validation

The form submit handler should call `event.preventDefault()` to stop the default form submission, run validation, and only then manually trigger navigation if validation passes.

## CSS Considerations

**IMPORTANT:** The error span elements have `display: none` in the CSS by default.

- **Problem:** Setting only `textContent` on error spans won't make them visible
- **Solution:** You must also set inline styles to override the CSS
- **How to display errors:** `errorSpan.style.display = 'block'`
- **How to hide errors:** `errorSpan.style.display = 'none'`

Example:
```javascript
// Show error
if (errorSpan) {
  errorSpan.textContent = 'Player 1 name cannot be empty';
  errorSpan.style.display = 'block'; // Required to make it visible!
}

// Hide error
if (errorSpan) {
  errorSpan.textContent = '';
  errorSpan.style.display = 'none';
}
```

## Input screen markup

```html
        <section class="screen" data-screen="input">
            <div class="screen__content">
                <h1 class="screen__title">Who's playing?</h1>
                <p class="screen__subtitle">
                    Please remember to answer honestly. No screen-peeking! Press play to
                    start the game when you're ready. Good luck!
                </p>

                <form id="players-form">
                    <div class="screen__players">
                        <div class="player-input">
                            <label class="player-input__label" for="player-one">Player 1</label>
                            <input class="player-input__field" id="player-one" type="text" name="player-one"
                                minlength="1" placeholder="Daty McDate" />
                            <span class="player-input__error" aria-live="assertive"></span>
                        </div>
                        <div class="player-input">
                            <label class="player-input__label" for="player-two">Player 2</label>
                            <input class="player-input__field" id="player-two" type="text" name="player-two"
                                minlength="1" placeholder="Friendy McFriend" />
                            <span class="player-input__error" aria-live="assertive"></span>
                        </div>
                    </div>

                    <button class="screen__button" type="submit" data-type="navigation" data-to="ready">Start the game</button>
                </form>
            </div>
        </section>
```