# Handoff screen

The handoff screen appears after a player answers a question. It confirms their answer was recorded and tells them to pass the device to the other player (or shows final completion if the game is done).

## What this screen does

This screen needs to:
1. Show a random acknowledgment message
2. Display the name of the player who just answered
3. Update the subtitle based on whether it's mid-game or the final handoff
4. Update the button text and destination based on game progress
5. Track which player goes next and which question is next

---

## Elements that need content

### 1. Acknowledgment Message
**Element:** `<span class="screen__title__text screen__title__text--greeting"></span>`

**What it should show:**
A random acknowledgment message.

**Format:**
The message followed by a comma.
Examples: "Nice choice," or "Bold move," or "Got it,"

**Where the data comes from:**
`responseMessages.handoffMessage` array in [questions.json](/src/data/questions.json)

**Available messages:**
"Nice choice", "Interesting", "Bold move", "Got it", "Noted", "Spicy take", "Straight up", "Love it", "Alright then", "From the horse's mouth"

**Special case - Final handoff:**
When it's the very last answer of the game, show "All done!" instead of a random message.

---

### 2. Player Name
**Element:** `<span class="screen__title__text screen__title__text--username"></span>`

**What it should show:**
The name of the player who JUST answered.

**Format:**
Just the player's name.
Examples: "Sarah" or "John"

**Where the data comes from:**
Your saved player names. Show the name of whichever player just submitted an answer.

**Special case - Final handoff:**
When it's the very last answer of the game, leave this blank (no player name shown).

**How it displays:**
The greeting and name combine to form the title:
- "Nice choice, Sarah"
- "Bold move, John"
- "All done!" (final handoff, no name)

---

## The Handoff Button (Conditional Navigation)

**Element:** `<button class="screen__button" data-type="navigation" data-to="result">`

**IMPORTANT:** This button needs to go to different screens depending on game progress.

### Three possible scenarios:

**Scenario 1: Player one just answered**
- **Where to go:** Ready screen
- **Why:** Player two needs to answer the same question
- **Button text:** "Hand it over"
- **Subtitle:** "Answer recorded. Now close your eyes and pass the device."

**Scenario 2: Player two just answered, more questions remain**
- **Where to go:** Ready screen
- **Why:** Move to the next question (player one goes first)
- **Button text:** "Hand it over"
- **Subtitle:** "Answer recorded. Now close your eyes and pass the device."

**Scenario 3: Player two just answered the final question**
- **Where to go:** Result screen
- **Why:** The game is complete!
- **Button text:** "See results"
- **Subtitle:** "You have both answered all the questions"

### Determining which scenario

You need to know:
- Which player just answered
- Which question you're on
- How many total questions there are

**Decision logic:**
- Player one answered → Always go to ready screen (player two's turn)
- Player two answered + more questions → Go to ready screen (next question)
- Player two answered + no more questions → Go to result screen (game over!)

---

## Dynamic Elements Summary

The handoff screen changes based on game state. Update ALL of these each time:

| Element | Normal Handoff | Final Handoff |
|---------|---------------|---------------|
| Greeting span | Random message + comma | "All done!" |
| Username span | Player name | (empty) |
| Subtitle | "Answer recorded..." | "You have both answered..." |
| Button text | "Hand it over" | "See results" |
| Button destination | "ready" | "result" |

## When This Screen Appears

The handoff screen appears after every answer is submitted.

**How often:** 2 times per question (once after each player answers)
**Example:** If there are 5 questions, this screen appears 10 times total.

**Game flow with 2 questions:**
```
Ready (P1) → Question (P1) → Handoff [Normal] →
Ready (P2) → Question (P2) → Handoff [Normal] →
Ready (P1) → Question (P1) → Handoff [Normal] →
Ready (P2) → Question (P2) → Handoff [FINAL] → Result
```

---

## Visual Examples

### Normal Handoff
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

### Final Handoff
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

---

## Implementation Notes

### Detecting Final Handoff

You're on the final handoff when:
- Player two just answered AND
- You're on the last question

### Updating State

Before showing the handoff screen, update:
- Which player answers next
- Which question is next (if moving to a new question)
- The button's destination attribute

---

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