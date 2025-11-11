# Question screen

The question screen shows each player a question and records their answer. The questions come from [questions.json](/src/data/questions.json). Players can choose to "Agree", "Disagree" or be "Neutral" to each statement.

## How often this screen appears

Each player sees each question once. If a category has 5 questions, the question screen appears 10 times total (5 questions × 2 players).

## What this screen does

This screen needs to:
1. Display whose turn it is
2. Show the current question number and total
3. Display the question text
4. Show three answer options with labels
5. Validate that an answer is selected
6. Save the player's answer
7. Clear any previous selection when showing a new question

---

## Elements that need content

### 1. Player Turn Indicator
**Element:** `<span class="question-form__player-name"></span>`

**What it should show:**
Whose turn it is to answer.

**Format:**
Player name + apostrophe s + "turn"
Examples: "Sarah's turn" or "John's turn"

**Where the data comes from:**
Your saved player names. Track which player is currently answering (player 1 or player 2).

---

### 2. Current Question Number
**Element:** `<span class="question-form__progress-current"></span>`

**What it should show:**
Which question the player is currently on.

**Format:**
"Question " followed by the number.
Examples: "Question 1", "Question 2", "Question 5"

**Where the data comes from:**
Track which question you're on. Note: If you're counting from 0, remember to add 1 for display (so question 0 shows as "Question 1").

---

### 3. Total Question Count
**Element:** `<span class="question-form__progress-total"></span>`

**What it should show:**
The total number of questions in the selected category.

**Format:**
"of " followed by the number.
Examples: "of 5", "of 10"

**Where the data comes from:**
From the selected category's questions array in [questions.json](/src/data/questions.json). Count how many questions are in the `questions` array.

---

### 4. Question Text
**Element:** `<span class="question-form__fieldset-text"></span>`

**What it should show:**
The actual question or statement the player needs to respond to.

**Format:**
Exact text from the questions file.
Example: "I like romantic comedies."

**Where the data comes from:**
From the current question's `text` property in [questions.json](/src/data/questions.json).

---

### 5. Answer Option Labels (3 spans)
**Element:** `<span class="answer-option__text"></span>` (there are **THREE** of these)

**What they should show:**
The labels for each answer choice.

**Format:**
The three options are always: "Agree", "Disagree", "Neutral" (in that order)

**Where the data comes from:**
From the current question's `options` array in [questions.json](/src/data/questions.json). The first span gets options[0], second gets options[1], third gets options[2].

---

## Understanding the Answer Options

The HTML has three answer options, each with this structure:
```html
<div class="answer-option" data-answer="agree">
  <label for="q1_a1" class="answer-option__label">
    <input type="radio" id="q1_a1" name="question1" value="agree" data-answer="agree" class="answer-option__input" />
    <span class="answer-option__text"></span> <!-- This is what you populate -->
  </label>
</div>
```

**The three options:**
1. First option: `data-answer="agree"`, `value="agree"` → populate span with "Agree"
2. Second option: `data-answer="disagree"`, `value="disagree"` → populate span with "Disagree"
3. Third option: `data-answer="neutral"`, `value="neutral"` → populate span with "Neutral"

---

## Capturing and Saving Answers

### When the form is submitted

**Element:** `<form class="question-form">`

When the player clicks "Lock in and continue", the form submits. You need to:
1. **Validate** - Check if a radio button is selected
2. **Show error if needed** - Display "Please select an answer" in `<span class="question-form__error">`
3. **Save the answer** - Record which option they chose
4. **Navigate** - Go to the handoff screen

### What to save

Each answer should be saved with this information:
- **Question ID** (e.g., "movies-1")
- **Question text** (e.g., "I like romantic comedies.") - needed for the results screen
- **Player one's answer** ("agree", "disagree", "neutral", or empty if they haven't answered yet)
- **Player two's answer** ("agree", "disagree", "neutral", or empty if they haven't answered yet)

### How answers build up

**After player one answers question 1:**
```
Question: "I like romantic comedies."
Player 1: "agree"
Player 2: (not answered yet)
```

**After player two also answers question 1:**
```
Question: "I like romantic comedies."
Player 1: "agree"
Player 2: "disagree"
```

Now both players have answered this question, and you can move to the next question.

---

## Important Behaviors

### Clearing previous selections

When showing a new question, **clear any previously selected radio button**. Otherwise, the previous answer might still appear selected.

### Validation

If no answer is selected when the form submits, show an error message and don't navigate to the next screen.

**Error element:** `<span class="question-form__error" aria-live="assertive"></span>`

**Error message:** "Please select an answer"

---

## Complete Example

Let's walk through what happens for **question 2** of the **"movies"** category when it's **player two's turn**:

**The screen should display:**
- Player turn: "John's turn"
- Progress: "Question 2"
- Total: "of 5"
- Question: "I like action movies"
- Options: "Agree", "Disagree", "Neutral"

**Player interaction:**
1. Player two (John) reads the question
2. Player two selects "Agree"
3. Player two clicks "Lock in and continue"

**What should happen:**
1. Form validates - an answer is selected ✓
2. Save the answer "agree" for player two on question "movies-2"
3. Navigate to the handoff screen

---

## Implementation Notes

### Error Display

The error span has `display: none` in the CSS by default. To show an error:
1. Set the error text content
2. Change the display style to make it visible

To hide the error:
1. Clear the text content
2. Change the display style back to hidden

### Form vs Navigation

The "Lock in and continue" button is inside a form, which means it triggers form submission. Make sure:
- Form validation runs before navigation
- Navigation only happens if validation passes
- The default form submission behavior is prevented (which would reload the page)

### Getting the Selected Answer

Radio buttons are grouped by their `name` attribute. When the user selects one:
- The selected radio has a special property indicating it's checked
- The radio's `value` attribute contains what to save ("agree", "disagree", or "neutral")

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
