# Result screen

The result screen is where players see their compatibility score and review how they answered each question. This screen appears once at the end of the game, after both players have answered all questions.

## What this screen does

This screen needs to:
1. Calculate and display how many questions the players matched on
2. Show their compatibility percentage (the "sync-o-score")
3. Display a comment based on their score
4. Create a card for each question showing both players' answers
5. Allow players to start a new game

---

## Elements that need content

### 1. Match Count
**Element:** `<span class="screen__subtitle__match-count"></span>`

**What it should show:**
How many questions both players answered identically.

**Format:**
"X out of Y questions"
Examples: "2 out of 5 questions" or "4 out of 5 questions"

**Where the data comes from:**
Count how many questions have matching answers from your saved answers. Compare each answer pair and count the matches.

---

### 2. Sync-o-Score (Percentage)
**Element:** `<span class="screen__subtitle__score"></span>`

**What it should show:**
The compatibility percentage between the two players.

**Format:**
A whole number followed by a percent symbol.
Examples: "40%" or "80%" or "100%"

**Where the data comes from:**
Calculate: (number of matches ÷ total questions) × 100
Round to the nearest whole number.

**Example calculation:**
- 3 matches out of 5 questions
- (3 ÷ 5) × 100 = 60%

---

### 3. Score Comment
**Element:** `<span class="screen__subtitle__comment"></span>`

**What it should show:**
A random comment about their compatibility, based on their percentage.

**Where the data comes from:**
`responseMessages.syncoMessage` from [questions.json](/src/data/questions.json)

**Which comment to use:**
- **If percentage is greater than 80%** → Pick randomly from the "good" array
- **If percentage is between 40% and 80%** → Pick randomly from the "neutral" array
- **If percentage is less than 40%** → Pick randomly from the "bad" array

**Available comments:**
- **Good (>80%):** "Good job, very synced", "Perfect timing", "Nice sync", "Smooth coordination", "Well synchronized"
- **Neutral (40-80%):** "Synced up", "Coordination noted", "Timing recorded", "Sync acknowledged", "Registered"
- **Bad (<40%):** "Sync could be better", "Timing's off", "Not quite synced", "Coordination needs work", "Out of rhythm"

---

## Creating Result Cards (One per Question)

For **each question** in the game, you need to create one result card. The HTML includes a `<template>` element that contains the structure for a single card. You'll need to make a copy of this template for each question and fill in the data.

**Template location:** `<template id="result-card-template">`
**Where to insert cards:** Inside `<div class="screen__results">`

### Card elements to populate

#### Match Tag
**Element:** `<span class="result-card__tag" data-match="match"></span>` (inside template)

**What it should show:**
Whether the players matched on this specific question.

**Where the data comes from:**
`responseMessages.matchStatus` from [questions.json](/src/data/questions.json)

**What to display:**
- If both players gave the **same answer** → Show "You're in sync!" and set `data-match="match"`
- If players gave **different answers** → Show "Different takes" and set `data-match="mismatch"`

---

#### Question Title
**Element:** `<h2 class="result-card__question-title"></h2>` (inside template)

**What it should show:**
Which question number this card represents.

**Format:**
"Question " followed by the number.
Examples: "Question 1", "Question 2", "Question 5"

**Where the data comes from:**
The position of the question in the list (first question = 1, second = 2, etc.)

---

#### Question Description
**Element:** `<p class="result-card__question-description"></p>` (inside template)

**What it should show:**
The actual question text that was asked.

**Format:**
The exact text from the question.
Example: "I like romantic comedies."

**Where the data comes from:**
From your saved answers - each answer should have stored the question text.

---

#### Answer Summary
**Element:** `<p class="result-card__answer-summary"></p>` (inside template)

**What it should show:**
What each player answered for this question.

**Format depends on their answers:**

**If both players answered the same:**
- Both agree → "You both agree"
- Both disagree → "You both disagree"
- Both neutral → "You are both neutral"

**If players answered differently:**
Format: "PlayerName verb and PlayerName verb"

Examples:
- "Sarah agrees and John disagrees"
- "Sarah disagrees and John is neutral"
- "Sarah is neutral and John agrees"

**Converting answers to verbs:**
- "agree" becomes "agrees"
- "disagree" becomes "disagrees"
- "neutral" becomes "is neutral"

---

## Play Again Button

**Element:** `<button class="screen__button">Play again</button>`

**What it should do:**
Reset the game so players can play again with a new category.

**What should reset:**
- Selected category (clear it)
- Current question number (back to 0)
- Current player (back to player 1)
- All saved answers (clear them)

**What should stay:**
- Player names (keep them so they don't have to re-enter)
- The loaded questions data

**Where to go next:**
Navigate to the category selection screen.

---

## Complete Example

Let's say the game had 5 questions and the players matched on 3 of them (questions 1, 2, and 5):

**Summary section would show:**
- Match count: "3 out of 5 questions"
- Percentage: "60%"
- Comment: A random pick from the neutral array, like "Synced up"

**Result cards would show 5 cards:**

**Card 1:**
- Tag: "You're in sync!" (green styling)
- Title: "Question 1"
- Description: "I like romantic comedies."
- Summary: "You both agree"

**Card 2:**
- Tag: "You're in sync!" (green styling)
- Title: "Question 2"
- Description: "I like action movies"
- Summary: "You both disagree"

**Card 3:**
- Tag: "Different takes" (red styling)
- Title: "Question 3"
- Description: "I like thriller movies"
- Summary: "Sarah agrees and John is neutral"

**Card 4:**
- Tag: "Different takes" (red styling)
- Title: "Question 4"
- Description: "I like drama movies."
- Summary: "Sarah disagrees and John agrees"

**Card 5:**
- Tag: "You're in sync!" (green styling)
- Title: "Question 5"
- Description: "I simply don't like movies."
- Summary: "You are both neutral"

---

## Implementation Notes

### Working with Templates
The `<template>` element is a special HTML element that holds content but doesn't display it. To use it:
1. Find the template in the HTML
2. Make a copy of its contents
3. Fill in the copy with your data
4. Add the copy to the page

This is a standard web development pattern - look up "HTML template element" for more information.

### Clearing Old Cards
Before creating new cards, make sure the results container is empty. Otherwise, old cards from a previous game might still be visible.

### Answer Data Structure
Throughout the game, you should have been saving answers in a format that includes:
- The question ID (e.g., "movies-1")
- The question text (e.g., "I like romantic comedies.")
- Player one's answer ("agree", "disagree", or "neutral")
- Player two's answer ("agree", "disagree", or "neutral")

If you saved this information during the game, you'll have everything you need to populate the result screen.

---

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
