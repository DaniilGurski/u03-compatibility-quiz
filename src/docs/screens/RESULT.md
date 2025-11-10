# Result screen
The result screen is where the players get to see how they answered, and if (and how) they've matched on the questions. As always, the HTML is static, but some of the content will be populated på JavaScript.

We will use "cloneNode() method" to show multiple/duplicate cards.

## Number of questions with the same answer aka "match count"
We check both players answers and show how many have the same result. Example "You matched on 2 out of 5 questions". This is populated inside ``<span class="screen__subtitle__match-count"></span>``

## Percentage of questions with the same answer aka "sync-o-score"
We convert the answers to percent (%). Example "That gives you a sync-o-score of: 20%". This is populated inside ``<span class="screen__subtitle__score"></span>``

## Fun comment based on procentage score
Based on how you scored, we show a comment (Good, Neutral or Bad"). That comment is populated inside ``<span class="screen__subtitle__comment"></span>``

- Good = score abobe 80%
- Neutral = score between 40-80%
- Bad = Below 40%

## Result cards with tags and detailed answers
Apart from "at a glance" information, we also provide the players with detailed answer cards for each question.

## Result screen markup

- We will populate ``<span class="result-card__tag" data-match="match"></span>`` with "matchStatus" from [questions.json](/src/data/questions.json) based on if the players answered the same of different
- We will populare ``<h2 class="result-card__question-title"></h2>`` with what questions, for exmaple "Question 1"
- We will populare ``<p class="result-card__question-description"></p>`` with the actual question from teh category the players chose
- ``<h3 class="result-card__answer-title"></h3>`` will simply say "Breakdown"

### Answer summary
- We will populate ``<p class="result-card__answer-summary"></p>`` with the following:

- If both players agree = "You both agree"
- If both players disagree = "You both disagree"
- If both players are neutral = "You are both neutral"
- If one player agrees and the other disagrees = "Player 1 agrees and Player 2 disagrees"
- If one player disagrees and the other agrees = "Player 1 disagrees and Player 2 agrees"
- If one player agrees and the other is neutral = "Player 1 agress and Player 2 is neutral"
- If one player disagrees and the other is neutral = "Player 1 disagress and Player 2 is neutral"

``
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
``

# Button retarts the game
The button here clears any localStorage and let's the user start playing again. The button here should take the user to the category select and their names should already be populated (from before).