# Question screen
The questions screen handles showing each player a question and recording each answer. The questions all come from [questions.json](/src/data/questions.json). The players can choose to "Agree", "Disagree" or be "Neutral" to a question/statement.

If a quiz category contains 5 questions, the question screen will be displayed a total of 10 times (each user gets to see each question).

## Elements to be populated by JavaScript

### Player Turn Indicator
**Element:** `<span class="question-form__player-name"></span>`

- **What:** Shows whose turn it is to answer
- **Source:** From your game state - either playerOne or playerTwo (based on currentPlayerIndex)
- **Format:** Player name + apostrophe s + "turn". Example: "Sarah's turn" or "John's turn"
- **When:** Every time the question screen is shown
- **Logic:**
  - Check which player's turn it is (using currentPlayerIndex or similar)
  - If currentPlayerIndex is 0 → use playerOne name
  - If currentPlayerIndex is 1 → use playerTwo name
  - Format: `playerName + "'s turn"`

### Current Question Number
**Element:** `<span class="question-form__progress-current"></span>`

- **What:** Which question the player is currently on
- **Source:** From your game state - currentQuestionIndex
- **Format:** "Question " + number. Example: "Question 1", "Question 2", "Question 5"
- **When:** Every time the question screen is shown
- **Logic:**
  - Get currentQuestionIndex from game state (this is 0-based)
  - Add 1 to it (to convert from 0-based to 1-based for display)
  - Format: `"Question " + (currentQuestionIndex + 1)`

### Total Question Count
**Element:** `<span class="question-form__progress-total"></span>`

- **What:** The total number of questions in the selected category
- **Source:** `categories[selectedCategoryId].questions.length` from questions.json
- **Format:** "of " + number. Example: "of 5", "of 10"
- **When:** Every time the question screen is shown
- **Logic:**
  - Find the selected category in the categories array
  - Get the length of that category's questions array
  - Format: `"of " + questions.length`

### Question Text
**Element:** `<span class="question-form__fieldset-text"></span>`

- **What:** The actual question or statement the player needs to respond to
- **Source:** `categories[selectedCategoryId].questions[currentQuestionIndex].text` from questions.json
- **Format:** Exact text from JSON. Example: "I like romantic comedies."
- **When:** Every time the question screen is shown
- **Logic:**
  - Find the selected category in the categories array
  - Get the current question using currentQuestionIndex
  - Use the question's `text` property

### Answer Option Labels (3 elements)
**Element:** `<span class="answer-option__text"></span>` (there are THREE of these!)

- **What:** The labels for each answer option
- **Source:** `categories[selectedCategoryId].questions[currentQuestionIndex].options` array from questions.json
- **Available options:** Always ["Agree", "Disagree", "Neutral"] (in that order)
- **Format:** Exact text from the options array
- **When:** Every time the question screen is shown
- **Logic:**
  - Find the selected category in the categories array
  - Get the current question using currentQuestionIndex
  - Get the question's `options` array
  - Loop through all three `.answer-option__text` spans
  - Set span 1 to options[0] ("Agree")
  - Set span 2 to options[1] ("Disagree")
  - Set span 3 to options[2] ("Neutral")
  - If no choise is given/selected, show an error in this span `<span class="question-form__error" aria-live="assertive"></span>`

## How the answer options are structured

Each answer option has this HTML structure:
```html
<div class="answer-option" data-answer="agree">
  <label for="q1_a1" class="answer-option__label">
    <input type="radio" id="q1_a1" name="question1" value="agree" data-answer="agree" class="answer-option__input" />
    <span class="answer-option__text"></span> <!-- POPULATE THIS -->
  </label>
</div>
```

There are three of these:
1. First one: data-answer="agree", value="agree" → populate with "Agree"
2. Second one: data-answer="disagree", value="disagree" → populate with "Disagree"
3. Third one: data-answer="neutral", value="neutral" → populate with "Neutral"

## Capturing the answer

### Form submission
**Element:** `<form class="question-form">`

- **When:** Listen for the form's submit event (when "Lock in and continue" button is clicked)
- **What to do:**
  1. Prevent default form submission
  2. Check which radio button is selected
  3. If no radio selected → show error/alert "Please select an answer"
  4. If radio selected → save the answer and navigate to handoff screen

### Getting the selected answer
- **How:** Find which radio input has the `checked` property
- **What to save:** The radio's `value` attribute ("agree", "disagree", or "neutral")

### Where to save the answer

Save to your game state in an answers array. Each answer should include:
- **questionId:** The ID of the question (e.g., "movies-1")
- **questionText:** The question text (for displaying in results later)
- **playerOne:** Player one's answer ("agree", "disagree", "neutral", or null if not answered yet)
- **playerTwo:** Player two's answer ("agree", "disagree", "neutral", or null if not answered yet)

### Answer saving logic

When player answers:
1. Get the current question's ID
2. Check if an answer entry already exists for this questionId
3. If not, create new entry with both players set to null
4. Update the current player's answer in that entry
5. Save to game state

Example answer structure:
```javascript
// After player one answers question 1
{
  questionId: "movies-1",
  questionText: "I like romantic comedies.",
  playerOne: "agree",
  playerTwo: null  // hasn't answered yet
}

// After player two also answers question 1
{
  questionId: "movies-1",
  questionText: "I like romantic comedies.",
  playerOne: "agree",
  playerTwo: "disagree"
}
```

## Clear previous selection

**Important:** When showing a new question, make sure to clear any previously selected radio button!

- **What to do:** Set all radio inputs' `checked` property to false
- **When:** Before showing each question

## Example: How data flows for question 2 of "movies" category

1. **Game state says:**
   - selectedCategory: "movies"
   - currentPlayerIndex: 1 (player two)
   - currentQuestionIndex: 1 (second question, 0-based)

2. **Populate elements:**
   - Player name: "John's turn"
   - Progress current: "Question 2"
   - Progress total: "of 5"
   - Question text: "I like action movies"
   - Option 1: "Agree"
   - Option 2: "Disagree"
   - Option 3: "Neutral"

3. **Player selects:** "Agree" radio button

4. **On submit:**
   - Get value: "agree"
   - Find/create answer entry for "movies-2"
   - Set playerTwo: "agree" in that entry
   - Navigate to handoff screen

## CSS Considerations

**IMPORTANT:** The error span element has `display: none` in the CSS by default.

- **Problem:** Setting only `textContent` on the error span won't make it visible
- **Solution:** You must also set inline styles to override the CSS
- **How to display error:** `errorSpan.style.display = 'block'`
- **How to hide error:** `errorSpan.style.display = 'none'`

Example:
```javascript
// Show error when no answer selected
if (!selectedRadio) {
  if (errorSpan) {
    errorSpan.textContent = 'Please select an answer';
    errorSpan.style.display = 'block'; // Required to make it visible!
  }
  return;
}

// Hide error when answer is selected
if (errorSpan) {
  errorSpan.textContent = '';
  errorSpan.style.display = 'none';
}
```

## Form Submit Button Behavior

**IMPORTANT:** The "Lock in and continue" button has TWO attributes:
- `type="submit"` (implied by being inside a form)
- `data-type="navigation"` and `data-to="handoff"` - This is for navigation

**The JavaScript MUST:**
1. Let the form's submit event handler run FIRST (for validation)
2. Only navigate if validation passes (an answer is selected)
3. NOT let the navigation button's click handler bypass the form validation

The form submit handler should call `event.preventDefault()` to stop default behavior, check if an answer is selected, and only then manually trigger navigation if validation passes.

## When this screen appears

The question screen appears once per player per question.

Total appearances: 2 × number of questions
Example: If there are 5 questions, the question screen appears 10 times total.

## Question screen markup

```html
<section class="screen" data-screen="question">
    <div class="screen__content">
        <form class="question-form">
            <fieldset class="question-form__fieldset">
                <legend class="question-form__legend">
                    <span class="question-form__player-name"></span>
                    <div class="question-form__legendquestion-form__progress">
                        <span class="question-form__progress-current"></span>
                        <span class="question-form__progress-total"></span>
                    </div>
                    <span class="question-form__fieldset-text"></span>
                </legend>

                <div class="answer-option" data-answer="agree">
                    <label for="q1_a1" class="answer-option__label">
                        <input type="radio" id="q1_a1" name="question1" value="agree" data-answer="agree"
                            class="answer-option__input" />
                        <span class="answer-option__text"></span>
                    </label>
                </div>

                <div class="answer-option" data-answer="disagree">
                    <label for="q1_a2" class="answer-option__label">
                        <input type="radio" id="q1_a2" name="question1" value="disagree" data-answer="disagree"
                            class="answer-option__input" />
                        <span class="answer-option__text"></span>
                    </label>
                </div>

                <div class="answer-option" data-answer="neutral">
                    <label for="q1_a3" class="answer-option__label">
                        <input type="radio" id="q1_a3" name="question1" value="neutral" data-answer="neutral"
                            class="answer-option__input" />
                        <span class="answer-option__text"></span>
                    </label>
                </div>

                <button class="screen__button" data-type="navigation" data-to="handoff">Lock in and
                    continue</button>
            </fieldset>
        </form>
    </div>
</section>
```
