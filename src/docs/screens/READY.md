# Ready screen

The ready screen appears before each question to let the current player know it's their turn. It shows a random greeting message and the player's name.

## What this screen does

This screen needs to:
1. Display a random greeting message
2. Show the current player's name
3. Prepare the player for their question

---

## When This Screen Appears

The ready screen appears before every question.

**How often:** 2 times per question (once for each player)
**Example:** If there are 5 questions, this screen appears 10 times total.

**It appears:**
1. After players enter their names (very first time)
2. After the handoff screen when switching between players
3. After the handoff screen when moving to a new question

**Navigation:**
- Previous: Input screen (first time) or Handoff screen (all other times)
- Next: Always goes to Question screen

---

## Elements that need content

### 1. Greeting Message
**Element:** `<span class="screen__title__text screen__title__text--greeting"></span>`

**What it should show:**
A random greeting message.

**Format:**
The message followed by a comma.
Examples: "Ready," or "Hey," or "Focus up,"

**Where the data comes from:**
`responseMessages.readyMessage` array in [questions.json](/src/data/questions.json)

**Available messages:**
"Ready", "Prepare yourself", "Focus up", "Hey", "You're up"

---

### 2. Player Name
**Element:** `<span class="screen__title__text screen__title__text--username"></span>`

**What it should show:**
The name of the player whose turn it is to answer.

**Format:**
Just the player's name.
Examples: "Sarah" or "John"

**Where the data comes from:**
Your saved player names. Show whichever player is currently answering (player one or player two).

**How it displays:**
The greeting and name combine to form the title:
- "Ready, Sarah"
- "Hey, John"
- "Focus up, Sarah"

---

## Ready screen markup

```html
 <section class="screen" data-screen="ready">
            <div class="screen__content">
                <h1 class="screen__title">
                    <span class="screen__title__text screen__title__text--greeting"></span>
                    <span class="screen__title__text screen__title__text--username"></span>
                </h1>
                <p class="screen__subtitle">
                    Take a deep breath. Remember to answer honestly and make sure no
                    one's peeking!
                </p>
                <button class="screen__button" data-type="navigation" data-to="question">
                    I'm ready
                </button>
            </div>
        </section>
```