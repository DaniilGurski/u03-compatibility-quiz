# Input screen

The input screen is where both players enter their names before starting the game. This screen validates that both names are filled in and that they're different from each other.

## What this screen does

This screen needs to:
1. Capture player one's name
2. Capture player two's name
3. Validate that both names are filled in
4. Validate that the names are different (case-insensitive)
5. Show error messages if validation fails
6. Save the names when validation passes
7. Navigate to the ready screen

---

## Form inputs to capture

### Player One Name
**Element:** `<input class="player-input__field" id="player-one" type="text" name="player-one">`

**What to capture:**
The first player's name.

**When to save:**
After validation passes (when the form is successfully submitted).

**Where to save:**
Store this as player one's name in your game data.

---

### Player Two Name
**Element:** `<input class="player-input__field" id="player-two" type="text" name="player-two">`

**What to capture:**
The second player's name.

**When to save:**
After validation passes (when the form is successfully submitted).

**Where to save:**
Store this as player two's name in your game data.

---

## Validation Rules

When the form is submitted, validate the names before saving:

### Rule 1: Both fields must be filled
Both names must have at least 1 character (ignoring spaces at the beginning or end).

**Error messages:**
- "Player 1 name cannot be empty"
- "Player 2 name cannot be empty"

### Rule 2: Names must be different
Player one's name cannot be the same as player two's name. The comparison should be case-insensitive (so "Sarah" and "sarah" are considered the same).

**Error message:**
- "Names must be different"

### Validation flow

When the "Start the game" button is clicked:
1. Get both name values
2. Remove extra spaces from the beginning and end
3. Check if either is empty
4. Check if they're the same (ignoring case)
5. If any check fails → show error and stay on this screen
6. If all checks pass → save names and go to the ready screen

---

## Where to show errors

### Player One Error
**Element:** `<span class="player-input__error" aria-live="assertive">` (after player-one input)

**When to show:**
When player one's name is empty or when both names are the same.

**When to clear:**
When the user starts typing in player one's input, or when validation passes.

---

### Player Two Error
**Element:** `<span class="player-input__error" aria-live="assertive">` (after player-two input)

**When to show:**
When player two's name is empty or when both names are the same.

**When to clear:**
When the user starts typing in player two's input, or when validation passes.

---

## Validation Examples

### Scenario 1: Both empty
- **Input 1:** "" (empty)
- **Input 2:** "" (empty)
- **Result:** Show "Player 1 name cannot be empty" and "Player 2 name cannot be empty"

### Scenario 2: One empty
- **Input 1:** "Sarah"
- **Input 2:** "" (empty)
- **Result:** Show "Player 2 name cannot be empty" only

### Scenario 3: Same names
- **Input 1:** "Sarah"
- **Input 2:** "Sarah"
- **Result:** Show "Names must be different" on both inputs

### Scenario 4: Same names, different case
- **Input 1:** "sarah"
- **Input 2:** "SARAH"
- **Result:** Show "Names must be different" on both inputs (case doesn't matter)

### Scenario 5: Valid
- **Input 1:** "Sarah"
- **Input 2:** "John"
- **Result:** Save names and navigate to ready screen

---

## What to Save

After successful validation, save:
- Player one's name (with spaces removed from beginning/end)
- Player two's name (with spaces removed from beginning/end)
- Set up initial game state (starting with player one on question one)

---

## Implementation Notes

### Error Display

The error spans have `display: none` in the CSS by default. To show an error:
1. Set the error text
2. Change the display style to make it visible

To hide an error:
1. Clear the text
2. Change the display style back to hidden

### Form Submission

The "Start the game" button is inside a form and has `type="submit"`. This means clicking it triggers form submission. Make sure:
- Form validation runs before navigation
- The page doesn't reload (prevent default form behavior)
- Navigation only happens if validation passes

### Trimming Whitespace

When checking if names are empty, ignore spaces at the beginning and end. "  Sarah  " should be treated as "Sarah", but "   " (only spaces) should be treated as empty.

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