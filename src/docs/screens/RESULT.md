# Result screen
The result screen is where the players get to see how they answered, and if (and how) they've matched on the questions. The HTML is static, but the content will be populated by JavaScript.

We use the `<template>` element and `cloneNode()` method to create multiple result cards - one for each question.

## Score Summary Elements

### Match Count
**Element:** `<span class="screen__subtitle__match-count"></span>`

- **What:** How many questions both players answered the same way
- **Source:** Calculate from the answers array in your game state
- **Format:** "X out of Y questions". Example: "2 out of 5 questions" or "4 out of 5 questions"
- **When:** When the result screen is shown
- **Logic:**
  1. Loop through all answers
  2. Count how many have playerOne === playerTwo
  3. Get total number of questions (answers.length)
  4. Format: `matchCount + " out of " + totalQuestions + " questions"`

### Sync-o-Score (Percentage)
**Element:** `<span class="screen__subtitle__score"></span>`

- **What:** The compatibility percentage
- **Source:** Calculate from match count and total questions
- **Format:** Percentage with % symbol. Example: "40%" or "80%" or "100%"
- **When:** When the result screen is shown
- **Logic:**
  1. Get match count (how many matched)
  2. Get total questions
  3. Calculate: (matchCount ÷ totalQuestions) × 100
  4. Round to nearest whole number
  5. Format: `percentage + "%"`

### Score Comment
**Element:** `<span class="screen__subtitle__comment"></span>`

- **What:** A comment about their compatibility based on the percentage
- **Source:** `responseMessages.syncoMessage` from questions.json
- **When:** When the result screen is shown
- **Logic:**
  - If percentage > 80 → pick random from `syncoMessage.good` array
  - If percentage >= 40 and <= 80 → pick random from `syncoMessage.neutral` array
  - If percentage < 40 → pick random from `syncoMessage.bad` array

Available comments:
- **Good (>80%):** "Good job, very synced", "Perfect timing", "Nice sync", "Smooth coordination", "Well synchronized"
- **Neutral (40-80%):** "Synced up", "Coordination noted", "Timing recorded", "Sync acknowledged", "Registered"
- **Bad (<40%):** "Sync could be better", "Timing's off", "Not quite synced", "Coordination needs work", "Out of rhythm"

## Result Cards (Dynamic - Created for Each Question)

For each question in the game, create one result card using the template.

### Template Location
**Element:** `<template id="result-card-template">`

- This is a template element that contains the structure for one result card
- It is NOT visible on the page
- Clone it using `document.getElementById('result-card-template').content.cloneNode(true)`

### Where to Insert Cards
**Element:** `<div class="screen__results">`

- This is the container where all result cards get inserted
- Clear it first (set innerHTML to "")
- Then append each cloned card

### Match Tag
**Element:** `<span class="result-card__tag" data-match="match"></span>` (inside the template)

- **What:** Shows if the players matched on this question
- **Source:** `responseMessages.matchStatus` from questions.json
- **Text options:**
  - If matched → "You're in sync!"
  - If not matched → "Different takes"
- **Attribute:** Also update the `data-match` attribute:
  - If matched → `data-match="match"`
  - If not matched → `data-match="mismatch"`
- **Logic:**
  - Compare playerOne and playerTwo answers for this question
  - If they're the same → it's a match
  - If they're different → it's a mismatch

### Question Title
**Element:** `<h2 class="result-card__question-title"></h2>` (inside the template)

- **What:** Which question number this card is for
- **Source:** From the loop index when creating cards
- **Format:** "Question " + number. Example: "Question 1", "Question 2", "Question 5"
- **Logic:**
  - When looping through answers, use the index
  - Add 1 to convert from 0-based to 1-based
  - Format: `"Question " + (index + 1)`

### Question Description
**Element:** `<p class="result-card__question-description"></p>` (inside the template)

- **What:** The actual question text that was asked
- **Source:** From the answer object's `questionText` property
- **Format:** Exact text. Example: "I like romantic comedies."
- **When:** When creating each card

### Answer Title
**Element:** `<h3 class="result-card__answer-title"></h3>` (inside the template)

- **What:** A label for the answer section
- **Format:** Always "Breakdown"
- **This is already in the HTML, no need to populate it**

### Answer Summary
**Element:** `<p class="result-card__answer-summary"></p>` (inside the template)

- **What:** Shows what each player answered
- **Source:** From the answer object's playerOne and playerTwo properties
- **Format:** Depends on what they answered (see all scenarios below)
- **When:** When creating each card

## Answer Summary Scenarios

### Both players answered the same

1. **Both agree**
   - Format: "You both agree"

2. **Both disagree**
   - Format: "You both disagree"

3. **Both neutral**
   - Format: "You are both neutral"

### Players answered differently

Format: "PlayerName verb and PlayerName verb"

Examples:
- "Sarah agrees and John disagrees"
- "Sarah disagrees and John is neutral"
- "Sarah is neutral and John agrees"

**Logic:**
1. Convert answers to verbs:
   - "agree" → "agrees"
   - "disagree" → "disagrees"
   - "neutral" → "is neutral"
2. Use player names from game state
3. Format: `playerOneName + " " + verb1 + " and " + playerTwoName + " " + verb2`

Example implementation:
```javascript
const formatAnswer = (ans) => {
  if (ans === 'agree') return 'agrees';
  if (ans === 'disagree') return 'disagrees';
  if (ans === 'neutral') return 'is neutral';
  return ans;
};

summary.textContent = `${playerOneName} ${formatAnswer(answer.playerOne)} and ${playerTwoName} ${formatAnswer(answer.playerTwo)}`;
```

## Creating Result Cards - Step by Step

1. **Get the template**
   ```javascript
   const template = document.getElementById("result-card-template");
   ```

2. **Get the container**
   ```javascript
   const container = document.querySelector(".screen__results");
   ```

3. **Clear existing cards**
   ```javascript
   container.innerHTML = "";
   ```

4. **Loop through all answers**
   ```javascript
   // For each answer in gameState.answers
   ```

5. **For each answer:**
   - Clone the template: `template.content.cloneNode(true)`
   - Find elements within the clone (use querySelector on the clone)
   - Populate all the elements (tag, title, description, summary)
   - Append the clone to the container

6. **Example structure of one answer object:**
   ```javascript
   {
     questionId: "movies-1",
     questionText: "I like romantic comedies.",
     playerOne: "agree",
     playerTwo: "disagree"
   }
   ```

## Complete Example

If there are 5 questions, create 5 result cards.

**Example card 1:**
- Tag: "Different takes" (data-match="mismatch")
- Title: "Question 1"
- Description: "I like romantic comedies."
- Summary: "Sarah: Agree | John: Disagree"

**Example card 2:**
- Tag: "You're in sync!" (data-match="match")
- Title: "Question 2"
- Description: "I like action movies"
- Summary: "You both agree"

## Play Again Button

**Element:** `<button class="screen__button">Play again</button>`

- **What:** Resets the game so players can play again
- **When clicked:**
  1. Reset game state (clear answers, reset question index, reset player index)
  2. Keep player names (don't make them re-enter)
  3. Clear any selected category (or keep it - your choice)
  4. Navigate to category screen

### What to keep vs what to reset

**Keep:**
- playerOne name
- playerTwo name
- questionsData (the loaded JSON)

**Reset:**
- selectedCategory (set to null or keep current - your choice)
- currentPlayerIndex (set to 0)
- currentQuestionIndex (set to 0)
- answers (clear the array: set to [])

## When this screen appears

The result screen appears once per game, after all players have answered all questions.

## Full calculation example

**Game state:**
- 5 questions total
- answers array has 5 objects
- Matches: questions 1, 2, 5 (3 matches)

**Calculations:**
- Match count: 3
- Total questions: 5
- Match count text: "3 out of 5 questions"
- Percentage: (3 ÷ 5) × 100 = 60%
- Score text: "60%"
- Comment category: Neutral (because 60 is between 40 and 80)
- Comment: Random from neutral array, e.g., "Synced up"

## Result screen markup

```html
<section class="screen" data-screen="result">
    <div class="screen__content">
        <h1 class="screen__title">Results</h1>
        <p class="screen__subtitle">
            The results are in! Here's what's up: You matched on
            <span class="screen__subtitle__match-count"></span>. That gives you
            a sync-o-score of:
            <span class="screen__subtitle__score"></span>
            <span class="screen__subtitle__comment"></span>
        </p>

        <div class="screen__results">
            <!-- Result cards will be inserted here by JS -->
        </div>

        <template id="result-card-template">
            <div class="result-card">
                <span class="result-card__tag" data-match="match"></span>
                <h2 class="result-card__question-title"></h2>
                <p class="result-card__question-description"></p>
                <div class="result-card__answers">
                    <h3 class="result-card__answer-title">Breakdown</h3>
                    <p class="result-card__answer-summary"></p>
                </div>
            </div>
        </template>

        <button class="screen__button">Play again</button>
    </div>
</section>
```
