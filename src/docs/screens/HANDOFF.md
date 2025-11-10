# Handoff screen
The handoff screen appears after a player has answered a question. It confirms their answer was recorded and instructs them to pass the device to the other player. This screen shows a random acknowledgment message and the name of the player who just answered.

## Elements to be populated by JavaScript

### Acknowledgment Message
**Element:** `<span class="screen__title__text screen__title__text--greeting"></span>`

- **What:** A random message acknowledging the player's answer
- **Source:** `responseMessages.handoffMessage` array from [questions.json](/src/data/questions.json)
- **Available options:** "Nice choice", "Interesting", "Bold move", "Got it", "Noted", "Spicy take", "Straight up", "Love it", "Alright then", "From the horse's mouth"
- **Format:** The message text followed by a comma. Example: "Nice choice," or "Bold move,"
- **When:** Every time the handoff screen is shown (after each player answers)
- **Logic:** Pick a random message from the array each time

### Player Name
**Element:** `<span class="screen__title__text screen__title__text--username"></span>`

- **What:** The name of the player who JUST answered the question
- **Source:** From your game state - either playerOne or playerTwo
- **Format:** Just the player's name. Example: "Sarah" or "John"
- **When:** Every time the handoff screen is shown (after each player answers)
- **Logic:** 
  - Check which player just answered (the CURRENT player, before switching)
  - If player one just answered, show playerOne name
  - If player two just answered, show playerTwo name

## How it displays to the user
The acknowledgment and username combine to form the title. For example:
- "Nice choice, Sarah"
- "Bold move, John"
- "Got it, Sarah"

## The handoff button - IMPORTANT!
The "Hand it over" button has **conditional navigation** - it goes to different screens depending on the game state.

### Button destination logic
**Element:** `<button class="screen__button" data-type="navigation" data-to="result">`

The button's `data-to` attribute needs to be updated dynamically based on:

**Scenario 1: Only one player has answered the current question**
- **Where to go:** Ready screen
- **Why:** The other player still needs to answer the same question
- **What happens next:** The other player sees the ready screen, then answers the same question

**Scenario 2: Both players have answered the current question, and more questions remain**
- **Where to go:** Ready screen
- **Why:** Move to the next question
- **What happens next:** Player one sees the ready screen for the next question

**Scenario 3: Both players have answered the current question, and no more questions remain**
- **Where to go:** Result screen
- **Why:** The game is complete
- **What happens next:** Players see their compatibility score and results

### How to determine which scenario
You need to track:
1. **Which player just answered** (player one or player two)
2. **Which question you're on** (question index or number)
3. **How many total questions exist** in the selected category

Logic steps:
- If player one just answered → player two still needs to answer → go to "ready"
- If player two just answered:
  - Check if this was the last question
  - If yes → go to "result"
  - If no → go to "ready" (for next question with player one)

### What to update in game state
Before the button is clicked, update:
- **Next player index/flag** - Who will answer next
- **Next question index** - Which question is next (if both players finished current question)
- **Button's data-to attribute** - Set to "ready" or "result" based on logic above

## Dynamic Content Updates

**CRITICAL:** The handoff screen has multiple elements that change dynamically:

### Elements that change:
1. **Greeting span** - Random message OR "All done!"
2. **Username span** - Player name OR empty
3. **Subtitle paragraph** - "Answer recorded..." OR "You have both answered..."
4. **Button text** - "Hand it over" OR "See results"
5. **Button data-to** - "ready" OR "result"

### When to update:
Update ALL these elements every time the handoff screen is shown (before navigating to it).

## When this screen appears
The handoff screen appears after every answer is submitted.

**Total appearances:** 2 times per question (once after each player answers)
**Example:** If there are 5 questions, the handoff screen appears 10 times total.

## Flow example with 2 questions

**Complete flow showing both handoff states:**

```
Ready (P1) → Question (P1) → Handoff [Normal] →
Ready (P2) → Question (P2) → Handoff [Normal] →
Ready (P1) → Question (P1) → Handoff [Normal] →
Ready (P2) → Question (P2) → Handoff [FINAL] → Result
```

**State breakdown:**
- Handoff 1-3: Normal state (show player name, "Hand it over")
- Handoff 4: Final state (show "All done!", "See results")

## Visual Examples

### State 1: Normal Handoff
```
┌─────────────────────────────────────┐
│                                     │
│     Nice choice, Sarah              │
│                                     │
│  Answer recorded. Now close your    │
│  eyes and pass the device.          │
│                                     │
│     ┌──────────────────┐            │
│     │  Hand it over    │            │
│     └──────────────────┘            │
│                                     │
└─────────────────────────────────────┘
```

### State 2: Final Handoff
```
┌─────────────────────────────────────┐
│                                     │
│     All done!                       │
│                                     │
│  You have both answered all the     │
│  questions                          │
│                                     │
│     ┌──────────────────┐            │
│     │  See results     │            │
│     └──────────────────┘            │
│                                     │
└─────────────────────────────────────┘
```

## Implementation Checklist

When implementing the handoff screen update function:

✅ Check if it's the final handoff (player 2, last question)
✅ Update greeting text based on state
✅ Update username text based on state
✅ Update subtitle text based on state
✅ Update button text based on state
✅ Update button data-to attribute for navigation
✅ Update game state (player index, question index)
✅ Determine correct next screen

## Handoff screen markup

```html
 <section class="screen" data-screen="handoff">
            <div class="screen__content">
                <h1 class="screen__title">
                    <span class="screen__title__text screen__title__text--greeting"></span>
                    <span class="screen__title__text screen__title__text--username"></span>
                </h1>
                <p class="screen__subtitle">
                    Answer recorded. Now close your eyes and pass the device.
                </p>
                <button class="screen__button" data-type="navigation" data-to="result">Hand it over</button>
            </div>
        </section>
```