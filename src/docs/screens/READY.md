# Ready screen
The ready screen appears before each question to let the current player know it's their turn. It shows a random greeting message and the player's name.

## Flow Context

**When this screen appears:**
1. **After player input** - Very first time, after both players enter their names
2. **After handoff** - After the other player answers (switching between players)
3. **After handoff** - After both players answer a question (moving to next question)

**How many times:**
- Appears 2 times per question (once for each player)
- If there are 5 questions it appears 10 times total
- Always appears BEFORE the question screen

**Navigation:**
- Previous screen: Either "input" (first time) or "handoff" (all other times)
- Next screen: Always "question"

## Elements to be populated by JavaScript

### Player Greeting Message
**Element:** `<span class="screen__title__text screen__title__text--greeting"></span>`

- **What:** A random greeting message to get the player ready
- **Source:** `responseMessages.readyMessage` array from [questions.json](/src/data/questions.json)
- **Available options:** "Ready", "Prepare yourself", "Focus up", "Hey", "You're up"
- **Format:** The message text followed by a comma. Example: "Ready," or "Hey,"
- **When:** Every time the ready screen is shown (before each question)
- **Logic:** Pick a random message from the array each time

### Player Name
**Element:** `<span class="screen__title__text screen__title__text--username"></span>`

- **What:** The name of the player whose turn it is
- **Source:** From your game state - either playerOne or playerTwo
- **Format:** Just the player's name. Example: "Sarah" or "John"
- **When:** Every time the ready screen is shown (before each question)
- **Logic:** 
  - Check which player's turn it is (using a player index or turn counter)
  - If it's player one's turn, use playerOne name
  - If it's player two's turn, use playerTwo name

## How it displays to the user
The greeting and username combine to form the title. For example:
- "Ready, Sarah"
- "Hey, John"
- "Focus up, Sarah"

## When this screen appears
The ready screen appears:
1. After players submit their names (very first time)
2. After the handoff screen, when moving to the next question
3. After the handoff screen, when switching to the other player

Total appearances: 2 times per question (once for each player)
Example: If there are 5 questions, the ready screen appears 10 times total.

## Ready screen markup

``
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
``